import { Navbar } from "@/components/navbar/Navbar";
import { getMe } from "@/service/getMe";


export default async function MainLayout({ children }: { children: React.ReactNode }) {
     const user = await getMe()

     return (
          <>
               <Navbar user={user} />
               <main>{children}</main>
          </>
     );
}