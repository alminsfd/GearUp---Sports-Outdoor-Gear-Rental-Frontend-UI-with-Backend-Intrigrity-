import UserManagement from "@/components/dashboard/admin/UserManagement";
import { getALLUsers } from "../../_action/admin_action";

interface PageProps {
     searchParams: Promise<{
          searchTerm?: string;
          role?: string;
          status?: string;
          page?: string;
          limit?: string;
     }>;
}

export default async function AdminCustomerPage({ searchParams }: PageProps) {
     const filters = await searchParams;

     const res = await getALLUsers({
          searchTerm: filters.searchTerm,
          role: filters.role,
          status: filters.status,
          page: filters.page ? parseInt(filters.page) : 1,
          limit: filters.limit ? parseInt(filters.limit) : 10,
     });

     return (
          <div className="space-y-6 p-6">
               <div>
                    <h1 className="text-2xl font-black tracking-tight text-foreground">
                         User Directory & Access Control
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground">
                         Manage system users, adjust account statuses, and monitor permissions.
                    </p>
               </div>

               <UserManagement
                    initialUsers={res.data || []}
                    meta={res.meta}
               />
          </div>
     );
}