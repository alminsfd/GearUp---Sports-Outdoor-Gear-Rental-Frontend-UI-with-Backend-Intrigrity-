import { Navbar } from '@/components/navbar/Navbar'
import { getMe } from '@/service/getMe'
import { ReactNode } from 'react'
import { AmbientGlow } from '@/components/common/ambient-glow'
import { Toaster } from 'sonner'

export default async function PublicLayout({ children }: { children: ReactNode }) {
     const user = await getMe()

     return (
          <div className="relative min-h-screen overflow-x-hidden bg-background">
               {/* Background Green Ambient Layer */}
               <AmbientGlow />

               {/* Foreground Content */}
               <div className="relative z-10 flex min-h-screen flex-col">
                    <Navbar user={user} />
                    <Toaster />
                    <main className="flex-1">{children}</main>

                    {/* <Footer /> */}
               </div>
          </div>
     )
}