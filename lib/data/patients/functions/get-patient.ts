import { patientStore } from "../store"
import { Patient } from "../types"

export function getPatientById(id: string): Patient | undefined {
  return patientStore.get(id)
}
