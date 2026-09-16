

import { Shield, } from 'lucide-react';
import { getAllAdminGears, getAllAdminRentals, getALLUsers } from '../_action/admin_action';
import AdminOverview from '@/components/dashboard/admin/AdminOverviewClient';


export default async function AdminOverviewPage() {
     const [usersRes, gearsRes, rentalsRes] = await Promise.all([
          getALLUsers(),
          getAllAdminGears(),
          getAllAdminRentals(),
     ]);


     const totalUsers = usersRes?.data?.length ?? 0;
     const activeGears = gearsRes?.data?.length ?? 0;
     const totalRentals = rentalsRes?.data?.length ?? 0;

     console.log("Totals", totalRentals, activeGears, totalRentals);


     const totalRevenue = rentalsRes?.data?.reduce((acc, order) => {
          return acc + (order.totalAmount || 0);
     }, 0) ?? 0;

     const platformMetrics = {
          totalUsers,
          activeGears,
          totalRentals,
          totalRevenue,
     };

     return (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
               {/* Header Banner */}
               <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                         <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-3">
                              <Shield className="h-3.5 w-3.5" />
                              System Administration
                         </div>
                         <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                              Platform <span className="text-gradient-kinetic">Health & Overview</span>
                         </h1>
                         <p className="mt-1.5 text-sm text-muted-foreground">
                              Real-time telemetry and core infrastructure metrics for GearUp platform.
                         </p>
                    </div>
               </div>

               {/* Main Overview Dashboard Component */}
               <AdminOverview metrics={platformMetrics} />
          </div>
     );
}