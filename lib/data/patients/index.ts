// Automatically seed the in-memory store on server startup
import "@/lib/data/patients/seed"

// Import and re-export all utilities
export { createPatient } from "@/lib/data/patients/functions/create-patient"
export { getPatientById } from "@/lib/data/patients/functions/get-patient"
export { getPatients } from "@/lib/data/patients/functions/get-patients"
export { removePatient } from "@/lib/data/patients/functions/remove-patient"
export { updatePatient } from "@/lib/data/patients/functions/update-patient"
export type {
  CareLevel,
  CreatePatientInput,
  Patient,
  PatientLocation,
  UpdatePatientInput,
} from "@/lib/data/patients/types"
export {
  CareLevelSchema,
  CreatePatientInputSchema,
  PatientLocationSchema,
  PatientSchema,
  PersonalNumberSchema,
  QuickIconSchema,
  UpdatePatientInputSchema,
} from "@/lib/data/patients/types"
