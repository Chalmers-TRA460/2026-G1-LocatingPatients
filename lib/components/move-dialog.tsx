"use client"

import {
  useState,
  useTransition,
  useSyncExternalStore,
  type ReactNode,
} from "react"
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
import type { Patient, PatientLocation } from "@/lib/data/patients"
import { setPatientLocation } from "@/lib/actions/patients"
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

interface MoveDialogProps {
  patient: Patient
  occupiedBeds: Set<string>
  trigger: ReactNode
}

export function MoveDialog({ patient, occupiedBeds, trigger }: MoveDialogProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const currentValue = patient.location
    ? `${patient.location.room}:${patient.location.bed}`
    : null

  function handleSelect(value: string) {
    const [room, bedStr] = [value.slice(0, value.lastIndexOf(":")), value.slice(value.lastIndexOf(":") + 1)]
    const bed = parseInt(bedStr, 10)
    startTransition(async () => {
      await setPatientLocation(patient.id, { room: room as PatientLocation["room"], bed })
      setOpen(false)
    })
  }

  const grid = (
    <BedGrid
      occupiedBeds={occupiedBeds}
      selectedValue={currentValue}
      onSelect={handleSelect}
      disabled={isPending}
    />
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side="bottom"
          className="max-h-[85svh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <SheetHeader>
            <SheetTitle>Move {patient.name}</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-4">{grid}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="max-h-[85svh] overflow-y-auto sm:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Move {patient.name}</DialogTitle>
        </DialogHeader>
        {grid}
      </DialogContent>
    </Dialog>
  )
}
