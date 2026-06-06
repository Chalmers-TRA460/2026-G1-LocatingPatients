import { Patient } from "./types"

// Pinned to globalThis so the Map survives Next.js dev-mode module reloads
// and is shared across RSC / Server Action bundles.
const globalForPatients = globalThis as unknown as {
  patientStore?: Map<string, Patient>
}

export const patientStore =
  globalForPatients.patientStore ?? new Map<string, Patient>()

if (!globalForPatients.patientStore) {
  globalForPatients.patientStore = patientStore
}
