import PlanningBoard from "@/lib/components/planning-board"
import { createClient } from "@/lib/supabase/server"
import { mapPatientRow } from "@/lib/supabase/patients"
import { fetchBoardData } from "@/lib/supabase/planning"

export default async function PlanningPage() {
  const supabase = await createClient()
  const [{ data: patientRows }, boardData] = await Promise.all([
    supabase.from("patients").select("*"),
    fetchBoardData(supabase),
  ])
  const patients = (patientRows ?? []).map(mapPatientRow)
  const today = new Date().toISOString().slice(0, 10)
  return <PlanningBoard initialData={boardData} patients={patients} today={today} />
}
