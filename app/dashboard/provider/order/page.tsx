import MyOrdersClient from "@/components/dashboard/provider/MyOrdersClient";
import { getRentalOrders } from "../../_action/customar_action";

export default async function OrdersPage() {
     const response = await getRentalOrders();
     const initialOrders = response?.success && Array.isArray(response.data) ? response.data : [];

     return (
          <main className="min-h-screen bg-background p-4 md:p-8">
               <div className="mx-auto max-w-7xl space-y-6">
                    <div>
                         <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                              Order Management
                         </h1>
                         <p className="text-sm text-muted-foreground">
                              Track customer rental requests, manage fulfillment status, and view payment details.
                         </p>
                    </div>

                    <MyOrdersClient initialOrders={initialOrders} />
               </div>
          </main>
     );
}