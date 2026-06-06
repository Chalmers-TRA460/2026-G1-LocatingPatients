import { patientStore } from "../store"

/**
 * Permanently removes a patient from the store.
 * @throws If no patient with the given `id` exists.
 */
export function removePatient(id: string): void {
  if (!patientStore.has(id)) throw new Error(`Patient not found: ${id}`)
  patientStore.delete(id)
}
