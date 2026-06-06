import { createClient } from './client'
import type { Patient, CreatePatientInput, UpdatePatientInput, PatientLocation } from '@/lib/data/patients/types'
import { CreatePatientInputSchema, UpdatePatientInputSchema } from '@/lib/data/patients/types'
import type { Tables, TablesUpdate } from './types'

type PatientRow = Tables<'patients'>

export function mapPatientRow(row: PatientRow): Patient {
  return {
    id: row.id,
    name: row.name,
    note: row.note,
    plannedOperation: row.planned_operation,
    plannedCheckIn: row.planned_check_in,
    plannedCheckOut: row.planned_check_out,
    location:
      row.location_room != null && row.location_bed != null
        ? { room: row.location_room as PatientLocation['room'], bed: row.location_bed }
        : null,
    personalNumber: row.personal_number,
    careLevel:
      row.care_level_medicine != null && row.care_level_nursing != null
        ? {
            medicine: row.care_level_medicine as 'A' | 'B' | 'C',
            nursing: row.care_level_nursing as 1 | 2 | 3,
          }
        : null,
    quickIcons: (row.quick_icons ?? []) as Patient['quickIcons'],
  }
}

export async function addPatient(input: CreatePatientInput): Promise<string> {
  const parsed = CreatePatientInputSchema.parse(input)
  const supabase = createClient()
  const { data, error } = await supabase
    .from('patients')
    .insert({
      name: parsed.name,
      note: parsed.note ?? null,
      planned_operation: parsed.plannedOperation ?? null,
      planned_check_in: parsed.plannedCheckIn ?? null,
      planned_check_out: parsed.plannedCheckOut ?? null,
      location_room: parsed.location?.room ?? null,
      location_bed: parsed.location?.bed ?? null,
      personal_number: parsed.personalNumber ?? null,
      care_level_medicine: parsed.careLevel?.medicine ?? null,
      care_level_nursing: parsed.careLevel?.nursing ?? null,
      quick_icons: parsed.quickIcons ?? [],
    })
    .select('id')
    .single()
  if (error) throw error
  return data.id
}

export async function setPatientLocation(
  patientId: string,
  location: PatientLocation | null,
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('patients')
    .update({
      location_room: location?.room ?? null,
      location_bed: location?.bed ?? null,
    })
    .eq('id', patientId)
  if (error) throw error
}

export async function editPatient(
  patientId: string,
  input: UpdatePatientInput,
): Promise<void> {
  const parsed = UpdatePatientInputSchema.parse(input)
  const update: TablesUpdate<'patients'> = {}

  if (parsed.name !== undefined) update.name = parsed.name
  if (parsed.note !== undefined) update.note = parsed.note
  if (parsed.plannedOperation !== undefined) update.planned_operation = parsed.plannedOperation
  if (parsed.plannedCheckIn !== undefined) update.planned_check_in = parsed.plannedCheckIn
  if (parsed.plannedCheckOut !== undefined) update.planned_check_out = parsed.plannedCheckOut
  if (parsed.location !== undefined) {
    update.location_room = parsed.location?.room ?? null
    update.location_bed = parsed.location?.bed ?? null
  }
  if (parsed.personalNumber !== undefined) update.personal_number = parsed.personalNumber
  if (parsed.careLevel !== undefined) {
    update.care_level_medicine = parsed.careLevel?.medicine ?? null
    update.care_level_nursing = parsed.careLevel?.nursing ?? null
  }
  if (parsed.quickIcons !== undefined) update.quick_icons = parsed.quickIcons

  if (Object.keys(update).length === 0) return

  const supabase = createClient()
  const { error } = await supabase.from('patients').update(update).eq('id', patientId)
  if (error) throw error
}

export async function deletePatient(patientId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('patients').delete().eq('id', patientId)
  if (error) throw error
}
