
import ProviderOverviewClient from "@/components/dashboard/provider/ProviderOverviewClient";
import { getRentalOrders } from "../_action/customar_action";
import { getAllgears } from "../_action/provider_action";
import { getMe } from "@/service/getMe";
import { IGear } from "@/types/gear";
import { IUserProfile } from "@/types/user";

export default async function ProviderPage() {
     const [gearsResponse, ordersResponse, userResponse] = await Promise.all([
          getAllgears(),
          getRentalOrders(),
          getMe(),
     ]);

     const user: IUserProfile = userResponse?.success ? userResponse.data?.profile || userResponse.data : null;

     const allGears = gearsResponse?.success ? gearsResponse.data : [];
     const allOrders = ordersResponse?.success ? ordersResponse.data : [];


     const providerGears = allGears.filter((gear: IGear) =>
          gear.providerId === user?.id || gear.id === user?.id
     );

     return (
          <div className="mx-auto max-w-7xl px-4 py-8">
               <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                         Welcome back, {user?.name || "Provider"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                         Monitor your listed gear, active rentals, and earnings at a glance
                    </p>
               </div>

               <ProviderOverviewClient
                    initialGears={providerGears}
                    initialOrders={allOrders}
               />
          </div>
     );
}