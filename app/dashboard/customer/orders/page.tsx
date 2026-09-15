import OrdersTableClient from "@/components/dashboard/customer/OrdersTableClient";
import { getRentalOrders } from "../../_action/customar_action";


export default async function OrdersPage() {
     const response = await getRentalOrders();
     const orders = response?.success ? response.data : [];

     return (
          <div className="mx-auto max-w-7xl px-4 py-8">
               <div className="mb-6 flex items-center justify-between">
                    <div>
                         <h1 className="text-2xl font-bold tracking-tight text-foreground">
                              Rental Orders Dashboard
                         </h1>
                         <p className="text-sm text-muted-foreground">
                              Manage your gear rentals and track order statuses
                         </p>
                    </div>
               </div>

               <OrdersTableClient initialOrders={orders} />
          </div>
     );
}