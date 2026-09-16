import OrderManagement from "@/components/dashboard/admin/OrderManagement";
import { getAllAdminRentals } from "../../_action/admin_action";


interface PageProps {
     searchParams: Promise<{
          page?: string;
          limit?: string;
     }>;
}

export default async function AdminOrderPage({ searchParams }: PageProps) {
     const filters = await searchParams;

     const res = await getAllAdminRentals({
          page: filters.page ? parseInt(filters.page) : 1,
          limit: filters.limit ? parseInt(filters.limit) : 10,
     });

     return (
          <div className="space-y-6 p-6">
               <div>
                    <h1 className="text-2xl font-black tracking-tight text-foreground">
                         Platform Rental Orders
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground">
                         Inspect rental requests, monitor payment verification statuses, and review active user transactions.
                    </p>
               </div>

               <OrderManagement
                    initialOrders={res.data || []}
                    meta={res.meta}
               />
          </div>
     );
}