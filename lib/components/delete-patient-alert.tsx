"use client"

import { useState, useTransition, type ReactNode } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/lib/base-ui/alert-dialog"
import { deletePatient } from "@/lib/actions/patients"

interface DeletePatientAlertProps {
  patientId: string
  patientName: string
  trigger: ReactNode
  onDeleted?: () => void
}

export function DeletePatientAlert({
  patientId,
  patientName,
  trigger,
  onDeleted,
}: DeletePatientAlertProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleConfirm(event: React.MouseEvent) {
    event.preventDefault()
    startTransition(async () => {
      await deletePatient(patientId)
      setOpen(false)
      onDeleted?.()
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete patient?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove {patientName}. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
