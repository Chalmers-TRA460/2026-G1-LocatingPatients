"use client"

import { ToggleGroup } from "radix-ui"
import { cn } from "@/lib/utils"

const medicineColors: Record<string, string> = {
  A: "data-[state=on]:bg-green-500/20 data-[state=on]:text-green-700 data-[state=on]:border-green-500/40 dark:data-[state=on]:text-green-400",
  B: "data-[state=on]:bg-yellow-500/20 data-[state=on]:text-yellow-700 data-[state=on]:border-yellow-500/40 dark:data-[state=on]:text-yellow-400",
  C: "data-[state=on]:bg-red-500/20 data-[state=on]:text-red-700 data-[state=on]:border-red-500/40 dark:data-[state=on]:text-red-400",
}

const nursingColors: Record<string, string> = {
  "1": "data-[state=on]:bg-green-500/20 data-[state=on]:text-green-700 data-[state=on]:border-green-500/40 dark:data-[state=on]:text-green-400",
  "2": "data-[state=on]:bg-yellow-500/20 data-[state=on]:text-yellow-700 data-[state=on]:border-yellow-500/40 dark:data-[state=on]:text-yellow-400",
  "3": "data-[state=on]:bg-red-500/20 data-[state=on]:text-red-700 data-[state=on]:border-red-500/40 dark:data-[state=on]:text-red-400",
}

const itemClass = cn(
  "h-8 w-8 border border-border text-sm font-medium transition-colors outline-none",
  "-ml-px first:ml-0",
  "hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
  "cursor-pointer",
)

function cornerClass(i: number, len: number) {
  if (i === 0) return "rounded-l-md rounded-r-none"
  if (i === len - 1) return "rounded-l-none rounded-r-md"
  return "rounded-none"
}

interface CareLevelPickerProps {
  medicine: string
  nursing: string
  onMedicineChange: (val: string) => void
  onNursingChange: (val: string) => void
}

export function CareLevelPicker({
  medicine,
  nursing,
  onMedicineChange,
  onNursingChange,
}: CareLevelPickerProps) {
  const medicineOptions = ["A", "B", "C"] as const
  const nursingOptions = ["1", "2", "3"] as const

  return (
    <div className="flex gap-3">
      <ToggleGroup.Root
        type="single"
        value={medicine}
        onValueChange={onMedicineChange}
        className="flex"
      >
        {medicineOptions.map((val, i) => (
          <ToggleGroup.Item
            key={val}
            value={val}
            className={cn(itemClass, cornerClass(i, medicineOptions.length), medicineColors[val])}
          >
            {val}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>

      <ToggleGroup.Root
        type="single"
        value={nursing}
        onValueChange={onNursingChange}
        className="flex"
      >
        {nursingOptions.map((val, i) => (
          <ToggleGroup.Item
            key={val}
            value={val}
            className={cn(itemClass, cornerClass(i, nursingOptions.length), nursingColors[val])}
          >
            {val}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  )
}
