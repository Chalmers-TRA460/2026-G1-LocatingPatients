import {
  IconAlertCircle,
  IconAlertTriangle,
  IconHeartOff,
  IconShieldLock,
  IconVirus,
} from "@tabler/icons-react"
import type { ComponentType } from "react"

export const QUICK_ICON_IDS = [
  "sekretess",
  "fallrisk",
  "obs",
  "contamination",
  "dnr",
] as const

export type QuickIconId = (typeof QUICK_ICON_IDS)[number]

export interface QuickIconDef {
  id: QuickIconId
  label: string
  icon: ComponentType<{
    size?: number
    strokeWidth?: number
    className?: string
  }>
  bgClass: string
  textClass: string
}

export const quickIconDefs: QuickIconDef[] = [
  {
    id: "sekretess",
    label: "Confidential",
    icon: IconShieldLock,
    bgClass: "bg-blue-500/15",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "fallrisk",
    label: "Fall risk",
    icon: IconAlertTriangle,
    bgClass: "bg-amber-500/15",
    textClass: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "obs",
    label: "Alert",
    icon: IconAlertCircle,
    bgClass: "bg-red-500/15",
    textClass: "text-red-600 dark:text-red-400",
  },
  {
    id: "contamination",
    label: "Infection",
    icon: IconVirus,
    bgClass: "bg-amber-500/15",
    textClass: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "dnr",
    label: "DNR",
    icon: IconHeartOff,
    bgClass: "bg-red-500/15",
    textClass: "text-red-600 dark:text-red-400",
  },
]

export const quickIconById = Object.fromEntries(
  quickIconDefs.map((d) => [d.id, d]),
) as Record<QuickIconId, QuickIconDef>
