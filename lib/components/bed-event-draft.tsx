"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { BedEvent } from "@/lib/data/planning/types"

export interface BedEventDraft {
  id: string
  bed: string
  patientId: string
  start: string
  end: string
}

interface BedEventDraftCtx {
  draft: BedEventDraft | null
  setDraft: (d: BedEventDraft | null) => void
}

const Ctx = createContext<BedEventDraftCtx | null>(null)

export function useBedEventDraft(): BedEventDraftCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("<BedEventDraftProvider> is missing from the tree")
  return ctx
}

export function BedEventDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<BedEventDraft | null>(null)
  return <Ctx.Provider value={{ draft, setDraft }}>{children}</Ctx.Provider>
}
