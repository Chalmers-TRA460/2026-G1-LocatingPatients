"use client"

import { useEffect, useState } from "react"
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

type Status = "connecting" | "good" | "degraded" | "lost"

export function ConnectionStatus() {
  const [status, setStatus] = useState<Status>("connecting")
  const [disconnectedAt, setDisconnectedAt] = useState<number | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const supabase = createClient()

    // Use a presence channel as a lightweight connectivity probe
    const channel = supabase.channel("connection-probe")
    channel.subscribe((state) => {
      if (state === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
        setStatus("good")
        setDisconnectedAt(null)
      } else if (
        state === REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR ||
        state === REALTIME_SUBSCRIBE_STATES.TIMED_OUT
      ) {
        setDisconnectedAt((prev) => prev ?? Date.now())
        setStatus("lost")
      } else if (state === REALTIME_SUBSCRIBE_STATES.CLOSED) {
        setDisconnectedAt((prev) => prev ?? Date.now())
        setStatus("degraded")
      }
    })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Tick every 250 ms so the age text stays current when degraded/lost
  useEffect(() => {
    if (status === "good" || status === "connecting") return
    const id = setInterval(() => setTick((t) => t + 1), 250)
    return () => clearInterval(id)
  }, [status])

  // Keep tick reference used so linter doesn't complain
  void tick

  const age =
    disconnectedAt !== null
      ? Math.floor((Date.now() - disconnectedAt) / 1000)
      : null

  const label =
    status === "connecting"
      ? "Connecting…"
      : status === "good"
        ? "Connected"
        : status === "degraded"
          ? age !== null
            ? `Reconnecting · disconnected ${age}s ago`
            : "Reconnecting…"
          : age !== null
            ? `Disconnected · ${age}s ago`
            : "Disconnected"

  return (
    <div className="group relative flex items-center" aria-label={label}>
      {status === "good" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />
      )}

      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          status === "good" && "bg-green-500",
          status === "degraded" && "bg-yellow-400",
          status === "lost" && "bg-red-500",
          status === "connecting" && "bg-muted-foreground/40",
        )}
      />

      <div
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-0 top-full z-50 mt-2",
          "rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md",
          "whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100",
        )}
      >
        {label}
      </div>
    </div>
  )
}
