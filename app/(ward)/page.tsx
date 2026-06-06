import { PatientList } from "@/lib/components/patient-list"
import { createClient } from "@/lib/supabase/server"
import { mapPatientRow } from "@/lib/supabase/patients"

export default async function RoundPage() {
  const supabase = await createClient()
  const { data } = await supabase.from("patients").select("*")
  const patients = (data ?? []).map(mapPatientRow)
  return <PatientList patients={patients} />
}
