import GearManagement from "@/components/dashboard/admin/GearManagement";
import { getAllAdminGears } from "../../_action/admin_action";


interface PageProps {
     searchParams: Promise<{
          page?: string;
          limit?: string;
     }>;
}

export default async function AdminGearPage({ searchParams }: PageProps) {
     const filters = await searchParams;

     const res = await getAllAdminGears({
          page: filters.page ? parseInt(filters.page) : 1,
          limit: filters.limit ? parseInt(filters.limit) : 10,
     });

     return (
          <div className="space-y-6 p-6">
               <div>
                    <h1 className="text-2xl font-black tracking-tight text-foreground">
                         Gear Listings & Moderation
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground">
                         Inspect, manage, and monitor all equipment listings submitted across the platform.
                    </p>
               </div>

               <GearManagement
                    initialGears={res.data || []}
                    meta={res.meta}
               />
          </div>
     );
}