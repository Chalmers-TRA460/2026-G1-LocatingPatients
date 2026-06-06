"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { Button } from "@/lib/base-ui/button"
import { IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

interface PanelDef {
  title: string
  content: ReactNode
  onClose?: () => void
}

interface FloatingPanelCtx {
  open: (panel: PanelDef) => void
  close: () => void
}

// ── Context ───────────────────────────────────────────────────────────────────

const Ctx = createContext<FloatingPanelCtx | null>(null)

export function useFloatingPanel(): FloatingPanelCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("<FloatingPanelProvider> is missing from the tree")
  return ctx
}

// ── Provider ──────────────────────────────────────────────────────────────────

const PANEL_WIDTH = 400
const CLOSE_DURATION = 100 // ms — keep in sync with animate-out duration below

/** Mount once in the layout that should host the panel (e.g. the ward layout). */
export function FloatingPanelProvider({ children }: { children: ReactNode }) {
  const [panels, setPanels] = useState<(PanelDef & { key: number })[]>([])
  const [isClosing, setIsClosing] = useState(false)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dragRef = useRef<{
    sx: number
    sy: number
    ox: number
    oy: number
  } | null>(null)
  const topPanel = panels[panels.length - 1] ?? null

  function cancelCloseTimer() {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const open = useCallback((def: PanelDef) => {
    cancelCloseTimer()
    setIsClosing(false)
    setPanels((prev) => {
      const nextKey = (prev[prev.length - 1]?.key ?? 0) + 1
      return [...prev, { ...def, key: nextKey }]
    })
    setPos((prev) => {
      if (prev) return prev
      const x =
        typeof window !== "undefined"
          ? Math.max(16, window.innerWidth - PANEL_WIDTH - 24)
          : 600
      return { x, y: 88 }
    })
  }, [])

  const close = useCallback(() => {
    const panel = panels[panels.length - 1]
    if (!panel) return
    panel.onClose?.()
    setIsClosing(true)
    cancelCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      setPanels((prev) => prev.slice(0, -1))
      setIsClosing(false)
      closeTimerRef.current = null
    }, CLOSE_DURATION)
  }, [panels])

  // Cleanup timer on unmount
  useEffect(() => () => cancelCloseTimer(), [])

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [close])

  // ── Drag ───────────────────────────────────────────────────────────────────

  function onTitleBarPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return
    e.preventDefault()
    const el = panelRef.current
    if (!el || !pos) return
    el.setPointerCapture(e.pointerId)
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return
    const { sx, sy, ox, oy } = dragRef.current
    const el = panelRef.current
    const maxX =
      typeof window !== "undefined"
        ? window.innerWidth - (el?.offsetWidth ?? PANEL_WIDTH)
        : 9999
    const maxY = typeof window !== "undefined" ? window.innerHeight - 60 : 9999
    setPos({
      x: Math.max(0, Math.min(maxX, ox + e.clientX - sx)),
      y: Math.max(0, Math.min(maxY, oy + e.clientY - sy)),
    })
  }

  function onPointerUp() {
    dragRef.current = null
  }

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      {topPanel && pos && (
        <div
          ref={panelRef}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className={cn(
            "fixed z-50 flex flex-col",
            "rounded-xl bg-popover text-sm text-popover-foreground",
            "ring-1 ring-foreground/10 shadow-xl",
            "overflow-hidden",
            "origin-top transition-[opacity,transform]",
            // Animate in on mount, animate out while isClosing
            isClosing
              ? "animate-out fade-out-0 zoom-out-95 duration-100"
              : "animate-in fade-in-0 zoom-in-95 duration-100",
          )}
          style={{
            left: pos.x,
            top: pos.y,
            width: PANEL_WIDTH,
            maxHeight: "80svh",
          }}
        >
          {/* Title bar — drag handle */}
          <div
            className="flex shrink-0 items-center justify-between gap-2 border-b px-4 py-3 cursor-move select-none"
            onPointerDown={onTitleBarPointerDown}
          >
            <span className="font-heading text-base font-medium leading-none">
              {topPanel.title}
            </span>
            <Button
              size="icon-sm"
              variant="ghost"
              className="-mr-1"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={close}
            >
              <IconX />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Scrollable content — key forces full remount between opens */}
          {panels.map((panel, index) => {
            const isTop = index === panels.length - 1
            return (
              <div
                key={panel.key}
                hidden={!isTop}
                className="flex-1 overflow-y-auto px-4 pt-4"
              >
                {panel.content}
              </div>
            )
          })}
        </div>
      )}
    </Ctx.Provider>
  )
}

// ── FloatingPanelFooter ───────────────────────────────────────────────────────

export function FloatingPanelFooter({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "sticky bottom-0 -mx-4 mt-4",
        "flex items-center justify-end gap-2",
        "border-t bg-muted px-4 py-3",
        className,
      )}
    >
      {children}
    </div>
  )
}
