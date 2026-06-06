import type { BoardData } from "./types"

export const initialBoardData: BoardData = {
  beds: [
    "01:1", "02:1", "03:1", "03:2", "04:1", "04:2", "04:3",
    "05:1", "05:2", "05:3", "06:1", "06:2", "06:3", "06:4",
    "07:1", "07:2", "07:3", "07:4", "08:1", "08:2", "08:3", "08:4",
    "10:1", "10:2", "10:3", "10:4", "10:5", "11:1", "11:2", "11:3", "11:4", "11:5",
    "Op:1", "Op:2", "Op:3", "Op:4", "Op:5",
  ],
  plan: [
    { id: "p1", time: "08:30", text: "X-ray – Joel Persson (04:1)" },
    { id: "p2", time: "09:30", text: "ICU round" },
    { id: "p3", time: "10:30", text: "Surgery – Anna-Karin" },
    { id: "p4", time: "11:00", text: "Team RED briefing" },
    { id: "p5", time: "13:30", text: "Discharge planning – Marcus Lund (06:1)" },
  ],
  events: [
    // patientIds reference the UUIDs in lib/data/patients/seed.ts
    { id: "e2", bed: "04:1", patientId: "00000000-0000-4000-8000-000000000007", start: "00:00", end: "20:00" },  // Joel Ström
    { id: "e4", bed: "05:1", patientId: "00000000-0000-4000-8000-000000000004", start: "00:00", end: "09:45" },  // Saga Pettersson
    { id: "e5", bed: "05:2", patientId: "00000000-0000-4000-8000-000000000016", start: "00:00", end: "09:15" },  // Ulla Sjögren
    { id: "e6", bed: "06:2", patientId: "00000000-0000-4000-8000-000000000001", start: "00:00", end: "12:00" },  // Gunnar Eriksson
    { id: "e7", bed: "10:2", patientId: "00000000-0000-4000-8000-000000000008", start: "00:00", end: "14:00" },  // Margareta Åkerlund
    { id: "e8", bed: "11:1", patientId: "00000000-0000-4000-8000-000000000014", start: "00:00", end: "16:00" },  // Karin Dahlgren
  ],
  permissions: [
    { id: "perm1", patientId: "00000000-0000-4000-8000-000000000009", from: "2026-05-11", to: "2026-05-13" },
    { id: "perm2", patientId: "00000000-0000-4000-8000-000000000014", from: "2026-05-11", to: "2026-05-12" },
  ],
  ivaPatients: [],
  nivaPatients: [],
}
