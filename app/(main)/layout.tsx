import { Navbar } from "@/components/navbar/Navbar";
import { getMe } from "@/service/getMe";
import { Toaster } from "sonner";


export default async function MainLayout({ children }: { children: React.ReactNode }) {
     const user = await getMe()

     return (
          <>
               <Navbar user={user} />
               <main>{children}</main>
               <Toaster position="top-right" richColors />
          </>
     );
}