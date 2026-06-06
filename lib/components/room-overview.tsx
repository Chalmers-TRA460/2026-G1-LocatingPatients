"use client"

import { cn } from "@/lib/utils"
import { type Patient } from "@/lib/data/patients"
import { locations } from "@/lib/constants/locations"

type RoomEntry = string | { id: string; bedStart: number; bedEnd: number }
type SectionColumn = RoomEntry[]
type Section = SectionColumn[]

const sections: Section[] = [
  // Normal ward rooms — 3 explicit columns
  [
    ["01", "02", "03", "04", "05"],
    ["06", "07", "08"],
    ["10", "11"],
  ],
  // NIVA
  [["NIV1", "NIV2", "NIV3", "NIV4", "NIV5"]],
  // IVA — split into 2 columns of 8 beds
  [
    [{ id: "IVA", bedStart: 1, bedEnd: 8 }],
    [{ id: "IVA", bedStart: 9, bedEnd: 16 }],
  ],
  // OP
  [["Op"]],
]

interface RoomOverviewProps {
  patients: Patient[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function RoomOverview({
  patients,
  selectedId,
  onSelect,
}: RoomOverviewProps) {
  const bedMap = new Map<string, Patient>()
  for (const p of patients) {
    if (p.location) {
      bedMap.set(`${p.location.room}:${p.location.bed}`, p)
    }
  }

  return (
    <div className="flex w-full px-1.5 bg-muted">
      {sections.map((section, si) => (
        <div
          key={si}
          className="flex min-w-0 items-start gap-2 px-1 py-2"
          style={{ flex: section.length }}
        >
          {section.map((column, ci) => (
            <div
              key={ci}
              className="flex flex-1 min-w-0 flex-col gap-2 *:divide-y"
            >
              {column.map((entry) => {
                const roomId = typeof entry === "string" ? entry : entry.id
                const loc = locations.find((l) => l.id === roomId)
                if (!loc) return null

                const bedStart = typeof entry === "string" ? 1 : entry.bedStart
                const bedEnd =
                  typeof entry === "string" ? loc.beds : entry.bedEnd
                const beds = Array.from(
                  { length: bedEnd - bedStart + 1 },
                  (_, i) => bedStart + i,
                )
                const cardKey =
                  typeof entry === "string"
                    ? roomId
                    : `${roomId}-${bedStart}-${bedEnd}`

                return (
                  <div
                    key={cardKey}
                    className="w-full min-w-0 rounded-md bg-background flex flex-col overflow-hidden"
                  >
                    {beds.map((bed) => {
                      const key = `${roomId}:${bed}`
                      const patient = bedMap.get(key)
                      const isSelected = patient?.id === selectedId
                      const firstName = patient?.name.split(" ")[0]

                      if (patient) {
                        return (
                          <button
                            key={bed}
                            onClick={() => onSelect(patient.id)}
                            className={cn(
                              "flex w-full items-center gap-2 px-2 py-1 text-left text-sm transition-colors border-l-3",
                              isSelected
                                ? "bg-primary/5 border-l-primary hover:bg-primary/10"
                                : "bg-background border-l-transparent hover:bg-muted",
                            )}
                          >
                            <span className="shrink-0 font-mono tracking-tighter text-sm">
                              {key}
                            </span>
                            <span className="truncate text-muted-foreground">
                              {firstName}
                            </span>
                          </button>
                        )
                      }

                      return (
                        <div
                          key={bed}
                          className="flex w-full items-center px-2 py-1 text-sm bg-background border-l-3 border-l-transparent"
                        >
                          <span className="font-mono tracking-tighter text-sm">
                            {key}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
