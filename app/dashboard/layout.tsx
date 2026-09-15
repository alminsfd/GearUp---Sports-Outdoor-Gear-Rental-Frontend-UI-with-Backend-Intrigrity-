import { redirect } from 'next/navigation'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { getMe } from '@/service/getMe'
import { AmbientGlow } from '@/components/common/ambient-glow'
import { Toaster } from 'sonner'

export default async function DashboardLayout({
     children,
}: {
     children: React.ReactNode
}) {
     // Server-side user data fetch
     const userResponse = await getMe()

     if (!userResponse?.success || !userResponse?.data) {
          redirect('/login')
     }

     return <>
          <AmbientGlow />
          <Toaster position="top-right" richColors />
          <DashboardShell user={userResponse}>{children}</DashboardShell>
     </>
}