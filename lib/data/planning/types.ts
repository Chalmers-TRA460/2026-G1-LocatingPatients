export interface PlanPatient {
  id: string
  name: string
  sex: string
  age?: number | string
  reason?: string
  bed?: string
  eta?: string
  time?: string
  note?: string
  badges: string[]
}

export interface BedEvent {
  id: string
  bed: string
  patientId: string
  start: string
  end: string
}

/** Generic entry for permission/IVA/NIVA lists — a patient linked to a date range. */
export interface PatientListEntry {
  id: string
  patientId: string
  from: string
  to: string
}

/** @deprecated Use PatientListEntry */
export type Permission = PatientListEntry

export interface BoardData {
  beds: string[]
  plan: { id: string; time: string; text: string }[]
  events: BedEvent[]
  permissions: PatientListEntry[]
  ivaPatients: PatientListEntry[]
  nivaPatients: PatientListEntry[]
}
