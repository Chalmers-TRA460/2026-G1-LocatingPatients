"use client"

import { cn } from "@/lib/utils"
import { quickIconDefs, type QuickIconId } from "@/lib/constants/quick-icons"

interface QuickIconsPickerProps {
  value: QuickIconId[]
  onChange: (value: QuickIconId[]) => void
}

export function QuickIconsPicker({ value, onChange }: QuickIconsPickerProps) {
  function toggle(id: QuickIconId) {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id))
    } else {
      onChange([...value, id])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {quickIconDefs.map((def) => {
        const Icon = def.icon
        const isOn = value.includes(def.id)
        return (
          <button
            key={def.id}
            type="button"
            onClick={() => toggle(def.id)}
            className={cn(
              "flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 cursor-pointer",
              isOn
                ? cn(def.bgClass, def.textClass, "border-current/30")
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded",
                isOn ? cn(def.bgClass, def.textClass) : "text-muted-foreground",
              )}
            >
              <Icon size={14} strokeWidth={2} />
            </span>
            {def.label}
          </button>
        )
      })}
    </div>
  )
}
