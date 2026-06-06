const colors = {
  yellow: "#eab308",
  red: "#ef4444",
  sky: "#0ea5e9",
  lime: "#84cc16",
  green: "#22c55e",
  gray: "#6b7280",
  orange: "#f97316",
  pink: "#ec4899",
  fuchsia: "#d946ef",
}

export const locations = [
  { id: "01" as const, color: colors.yellow, beds: 1 },
  { id: "02" as const, color: colors.yellow, beds: 1 },
  { id: "03" as const, color: colors.yellow, beds: 2 },
  { id: "04" as const, color: colors.yellow, beds: 3 },
  { id: "05" as const, color: colors.yellow, beds: 3 },
  { id: "06" as const, color: colors.yellow, beds: 4 },
  { id: "07" as const, color: colors.yellow, beds: 4 },
  { id: "08" as const, color: colors.yellow, beds: 4 },
  { id: "10" as const, color: colors.orange, beds: 5 },
  { id: "11" as const, color: colors.orange, beds: 5 },
  { id: "EXTR" as const, color: colors.lime, beds: 10 },
  { id: "IVA" as const, color: colors.pink, beds: 16 },
  { id: "NIV1" as const, color: colors.fuchsia, beds: 2 },
  { id: "NIV2" as const, color: colors.fuchsia, beds: 2 },
  { id: "NIV3" as const, color: colors.fuchsia, beds: 2 },
  { id: "NIV4" as const, color: colors.fuchsia, beds: 2 },
  { id: "NIV5" as const, color: colors.fuchsia, beds: 2 },
  { id: "Op" as const, color: colors.sky, beds: 5 },
  { id: "PERM" as const, color: colors.green, beds: 15 },
  { id: "UTL" as const, color: colors.gray, beds: 5 },
]

import { z } from "zod"

const roomIds = locations.map((l) => l.id) as [string, ...string[]]
export const RoomSchema = z.enum(roomIds)
export type Room = z.infer<typeof RoomSchema>
