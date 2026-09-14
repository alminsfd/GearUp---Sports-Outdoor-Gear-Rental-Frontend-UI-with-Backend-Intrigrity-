import { getMe } from "@/service/getMe"
import CustomerOverviewClient from "./CustomerOverviewClient"

export default async function CustomerDashboardPage() {
     const userResponse = await getMe()
     const user = userResponse?.data

     // Customer Stats & Initial Data (Server-side dynamic data fetching)
     const stats = {
          totalRentals: 4,
          activeRentals: 1,
          totalSpent: 495,
     }

     return <CustomerOverviewClient user={user} stats={stats} />
}