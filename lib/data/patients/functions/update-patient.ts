import { patientStore } from "@/lib/data/patients/store"
import { UpdatePatientInputSchema } from "@/lib/data/patients/types"
import type { Patient, UpdatePatientInput } from "@/lib/data/patients/types"

/**
 * Applies a partial update to an existing patient.
 * Only the fields present in `input` are overwritten; absent fields keep their
 * current values. Input is validated and transformed through
 * {@link UpdatePatientInputSchema} before merging.
 * @throws If no patient with the given `id` exists.
 * @throws {ZodError} If the input fails schema validation.
 */
export function updatePatient(id: string, input: UpdatePatientInput): Patient {
  const existing = patientStore.get(id)
  if (!existing) throw new Error(`Patient not found: ${id}`)

  const parsed = UpdatePatientInputSchema.parse(input)

  // Only spread fields that were explicitly provided (not undefined),
  // so absent fields don't overwrite existing data.
  const delta = Object.fromEntries(
    Object.entries(parsed).filter(([, v]) => v !== undefined),
  ) as Partial<Patient>

  const updated: Patient = { ...existing, ...delta }
  patientStore.set(id, updated)
  return updated
}
