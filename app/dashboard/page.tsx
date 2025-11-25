import { redirect } from "next/navigation"
import { getCurrentUserWithProfile } from "@/lib/auth"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const user = await getCurrentUserWithProfile()

  if (!user) {
    redirect("/")
  }

  return <DashboardContent user={user} />
}
