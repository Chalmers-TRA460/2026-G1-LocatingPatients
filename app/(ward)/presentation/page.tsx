import { WardBoard } from "@/lib/components/ward-board"
import { createClient } from "@/lib/supabase/server"
import { mapPatientRow } from "@/lib/supabase/patients"

export default async function PresentationPage() {
  const supabase = await createClient()
  const { data } = await supabase.from("patients").select("*")
  const patients = (data ?? []).map(mapPatientRow)
  return <WardBoard patients={patients} />
}
