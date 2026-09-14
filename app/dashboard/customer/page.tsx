import { getMe } from "@/service/getMe"
import { getPaymentHistory, getRentalOrders } from "@/components/dashboard/_action/customar_action"
import CustomerOverviewClient from "@/components/dashboard/customer/CustomerOverviewClient"
import { Payment, RentalOrder } from "@/types/order"

export default async function CustomerDashboardPage() {
     // Parallel Fetching for performance
     const [userResponse, ordersResponse, paymentsResponse] = await Promise.all([
          getMe(),
          getRentalOrders(),
          getPaymentHistory(),
     ])

     const orders: RentalOrder[] = ordersResponse?.success ? ordersResponse.data : []
     const payments: Payment[] = paymentsResponse?.success ? paymentsResponse.data : []


     // Calculate dynamic stats from real API data
     const stats = {
          totalRentals: orders.length,
          activeRentals: orders.filter((o: RentalOrder) => o.status === 'CONFIRMED' || o.status === 'PAID').length,
          totalSpent: payments.reduce((acc: number, p: Payment) => acc + (p.amount || 0), 0),
     }

     return (
          <CustomerOverviewClient
               user={userResponse}
               stats={stats}
               orders={orders}
               payments={payments}
          />
     )
}