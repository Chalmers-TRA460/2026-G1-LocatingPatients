import { patientStore } from "../store"
import { Patient } from "../types"

export function getPatients(): Patient[] {
  return Array.from(patientStore.values())
}
