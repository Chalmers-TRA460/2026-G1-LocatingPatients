import { patientStore } from "@/lib/data/patients/store"
import type { CreatePatientInput, Patient } from "@/lib/data/patients/types"
import { CreatePatientInputSchema } from "@/lib/data/patients/types"

/**
 * Creates a new patient with an auto-assigned UUID.
 * Input is validated and transformed through {@link CreatePatientInputSchema}
 * before storage — including personal number normalisation.
 * @returns The stored patient, including its generated `id`.
 * @throws {ZodError} If the input fails schema validation.
 */
export function createPatient(input: CreatePatientInput): Patient {
  const parsed = CreatePatientInputSchema.parse(input)
  const patient: Patient = {
    id: globalThis.crypto.randomUUID(),
    name: parsed.name,
    note: parsed.note ?? null,
    plannedOperation: parsed.plannedOperation ?? null,
    plannedCheckIn: parsed.plannedCheckIn ?? null,
    plannedCheckOut: parsed.plannedCheckOut ?? null,
    location: parsed.location ?? null,
    personalNumber: parsed.personalNumber ?? null,
    careLevel: parsed.careLevel ?? null,
    quickIcons: parsed.quickIcons ?? [],
  }
  patientStore.set(patient.id, patient)
  return patient
}
