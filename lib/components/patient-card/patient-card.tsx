"use client"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/base-ui/card"
import { Button } from "@/lib/base-ui/button"
import { InfoItem } from "./info-item"
import {
  IconArrowsExchange,
  IconInfoCircle,
} from "@tabler/icons-react"
import { type Patient } from "@/lib/data/patients"
import { type PatientLocation } from "@/lib/data/patients/types"
import { locations } from "@/lib/constants/locations"
import { calculateAge } from "@/lib/utils"
import { MoveDialog } from "../move-dialog"

function LocationBadge({ location }: { location: PatientLocation }) {
  const color =
    locations.find((l) => l.id === location.room)?.color ?? "#6b7280"
  return (
    <span
      className="rounded-md border px-2 py-1 text-xs font-semibold tracking-wide"
      style={{
        backgroundColor: `${color}0d`,
        borderColor: color,
        color,
      }}
    >
      {location.room}:{location.bed}
    </span>
  )
}

interface PatientCardProps {
  patient: Patient
  occupiedBeds: Set<string>
  selected?: boolean
  onSelect: () => void
}

export function PatientCard({
  patient,
  occupiedBeds,
  selected,
  onSelect,
}: PatientCardProps) {
  const { name, note, location, personalNumber } = patient
  const birthYear = personalNumber?.substring(0, 4)
  const age = calculateAge(personalNumber)
  const description = birthYear
    ? age !== null
      ? `${birthYear} · ${age} yrs`
      : birthYear
    : undefined

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      data-selected={selected}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelect()
        }
      }}
      className="cursor-pointer outline-none transition hover:ring-ring/50 focus-visible:ring-2 focus-visible:ring-ring data-[selected=true]:ring-2 data-[selected=true]:ring-primary"
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {location && (
          <CardAction>
            <LocationBadge location={location} />
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        {note && <InfoItem icon={<IconInfoCircle />}>{note}</InfoItem>}
      </CardContent>
      <CardFooter className="mt-auto">
        <MoveDialog
          patient={patient}
          occupiedBeds={occupiedBeds}
          trigger={
            <Button
              variant="outline"
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <IconArrowsExchange data-icon="inline-start" />
              Move
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
}
