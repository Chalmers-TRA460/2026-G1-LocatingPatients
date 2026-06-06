import { cn } from "@/lib/utils"

const medicineColorMap: Record<string, string> = {
  A: "bg-green-500/15 text-green-700 dark:text-green-400",
  B: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  C: "bg-red-500/15 text-red-700 dark:text-red-400",
}

const nursingColorMap: Record<number | string, string> = {
  1: "bg-green-500/15 text-green-700 dark:text-green-400",
  2: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  3: "bg-red-500/15 text-red-700 dark:text-red-400",
}

export function careLevelColor(
  value: string | number,
  type: "medicine" | "nursing",
): string {
  return type === "medicine"
    ? (medicineColorMap[value] ?? "")
    : (nursingColorMap[value] ?? "")
}

export function careLevelLabel(medicine: string, nursing: number): string {
  return `${medicine}${nursing}`
}

interface CareLevelBadgeProps {
  medicine: string
  nursing: number
  className?: string
  size?: "sm" | "md"
}

export function CareLevelBadge({
  medicine,
  nursing,
  className,
  size = "md",
}: CareLevelBadgeProps) {
  const cell = size === "sm" ? "h-4 w-4 text-[10px]" : "h-5 w-5"
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-semibold divide-x divide-background",
        size === "sm" ? "text-[10px]" : "text-xs",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-l rounded-r-none",
          cell,
          careLevelColor(medicine, "medicine"),
        )}
      >
        {medicine}
      </span>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-r rounded-l-none",
          cell,
          careLevelColor(nursing, "nursing"),
        )}
      >
        {nursing}
      </span>
    </span>
  )
}
