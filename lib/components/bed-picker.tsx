"use client"

import { useState, useSyncExternalStore } from "react"
import { IconChevronDown } from "@tabler/icons-react"
import { Button } from "@/lib/base-ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/base-ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/lib/base-ui/sheet"
import { BedGrid } from "./bed-grid"

function useIsMobile(breakpoint = 640) {
  const query = `(max-width: ${breakpoint - 1}px)`
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

interface BedPickerProps {
  occupiedBeds: Set<string>
  value: string
  onChange: (value: string) => void
  "aria-invalid"?: boolean
  id?: string
}

export function BedPicker({
  occupiedBeds,
  value,
  onChange,
  id,
  "aria-invalid": ariaInvalid,
}: BedPickerProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  function handleSelect(next: string) {
    onChange(next === value ? "" : next)
    setOpen(false)
  }

  const trigger = (
    <Button
      id={id}
      type="button"
      variant="outline"
      aria-invalid={ariaInvalid}
      className="w-full justify-between"
    >
      {value ? (
        <span className="font-mono text-sm tracking-tighter">{value}</span>
      ) : (
        <span className="text-muted-foreground">Select bed…</span>
      )}
      <IconChevronDown data-icon="inline-end" />
    </Button>
  )

  const grid = (
    <BedGrid
      occupiedBeds={occupiedBeds}
      selectedValue={value || null}
      onSelect={handleSelect}
    />
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent side="bottom" className="max-h-[85svh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Select bed</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-4">{grid}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select bed</DialogTitle>
        </DialogHeader>
        {grid}
      </DialogContent>
    </Dialog>
  )
}
