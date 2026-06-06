"use client"

import { cn } from "@/lib/utils"
import { locations } from "@/lib/constants/locations"

const leftSection = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "10",
  "11",
  "PERM",
]
const rightSection = ["NIV1", "NIV2", "NIV3", "NIV4", "NIV5", "IVA", "Op", "EXTR", "UTL"]

interface BedGridProps {
  occupiedBeds: Set<string>
  selectedValue?: string | null
  onSelect: (value: string) => void
  disabled?: boolean
}

export function BedGrid({
  occupiedBeds,
  selectedValue,
  onSelect,
  disabled = false,
}: BedGridProps) {
  function renderRoomRow(roomId: string) {
    const loc = locations.find((l) => l.id === roomId)
    if (!loc) return null
    return (
      <div key={roomId} className="flex items-center gap-3 py-1.5">
        <span className="w-12 shrink-0 font-mono text-sm font-medium">
          {roomId}
        </span>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: loc.beds }, (_, i) => i + 1).map((bed) => {
            const value = `${roomId}:${bed}`
            const isSelected = value === selectedValue
            const isOccupied = occupiedBeds.has(value) && !isSelected
            const isDisabled = isOccupied || disabled
            return (
              <button
                key={bed}
                type="button"
                disabled={isDisabled}
                aria-label={`${roomId} bed ${bed}${isOccupied ? " (occupied)" : ""}`}
                onClick={() => onSelect(value)}
                className={cn(
                  "h-7 min-w-8 rounded-md px-2 text-xs font-medium outline-none transition",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : isDisabled
                      ? "bg-muted/40 text-muted-foreground/40 cursor-not-allowed"
                      : "bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer",
                )}
              >
                {bed}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 divide-y">
        {leftSection.map(renderRoomRow)}
      </div>
      <div className="flex-1 divide-y">
        {rightSection.map(renderRoomRow)}
      </div>
    </div>
  )
}
