import ProviderOverviewClient from "@/components/dashboard/provider/ProviderOverviewClient";
import { getRentalOrders } from "../_action/customar_action";
import { getAllgears } from "../_action/provider_action";

export default async function ProviderPage() {
     const [gearsResponse, ordersResponse] = await Promise.all([
          getAllgears(),
          getRentalOrders(),
     ]);

     const gears = gearsResponse?.success ? gearsResponse.data : [];
     const orders = ordersResponse?.success ? ordersResponse.data : [];

     return (
          <div className="mx-auto max-w-7xl px-4 py-8">
               <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                         Provider Dashboard Overview
                    </h1>
                    <p className="text-sm text-muted-foreground">
                         Monitor your listed gear, active rentals, and earnings at a glance
                    </p>
               </div>

               <ProviderOverviewClient initialGears={gears} initialOrders={orders} />
          </div>
     );
}