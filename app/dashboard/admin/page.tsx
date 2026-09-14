import AdminOverviewClient from "@/components/dashboard/admin/AdminOverviewClient"
import { getMe } from "@/service/getMe"
import { IUser } from "@/types/user"


export default async function AdminDashboardPage() {
     const user: IUser = await getMe()

     // Server Side Data Fetching required for Admin Stats
     const stats = {
          totalUsers: 1420,
          activeGear: 380,
          totalRentals: 950,
     }

     return <AdminOverviewClient stats={stats} />
}