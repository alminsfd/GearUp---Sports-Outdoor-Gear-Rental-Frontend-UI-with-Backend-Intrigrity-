import MyGearClient from "@/components/dashboard/provider/providerGear";
import { getAllgears } from "../../_action/provider_action";
import { getMe } from "@/service/getMe";
import { IUserProfile } from "@/types/user";
import { IGear } from "@/types/gear";


export default async function ProviderGearPage() {
     const [gearsResponse, userResponse] = await Promise.all([
          getAllgears(),
          getMe(),
     ]);

     const user: IUserProfile = userResponse?.success ? userResponse.data?.profile || userResponse.data : null;


     const allGears = gearsResponse?.success ? gearsResponse.data : [];



     const providerGears = allGears.filter((gear: IGear) =>
          gear.providerId === user?.id || gear.id === user?.id
     );
     return (
          <div className="mx-auto max-w-7xl px-4 py-8">
               <div className="mb-6 flex items-center justify-between">
                    <div>
                         <h1 className="text-2xl font-bold tracking-tight text-foreground">
                              Gear Inventory Management
                         </h1>
                         <p className="text-sm text-muted-foreground">
                              Manage your listed items, update daily pricing, stock, and availability status.
                         </p>
                    </div>
               </div>

               <MyGearClient initialGears={providerGears} />
          </div>
     );
}