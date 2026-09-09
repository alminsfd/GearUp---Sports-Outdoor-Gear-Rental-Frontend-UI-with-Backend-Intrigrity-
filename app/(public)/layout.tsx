import { Navbar } from '@/components/navbar/Navbar'
import { getMe } from '@/service/getMe'
import { ReactNode } from 'react'


export default async function PublicLayout({ children }: { children: ReactNode }) {
     const user = await getMe()

     return (
          <div className="relative flex min-h-screen flex-col">

               <Navbar user={user} />
               <main className="flex-1">{children}</main>
               {/* <Footer /> */}
          </div>
     )
}