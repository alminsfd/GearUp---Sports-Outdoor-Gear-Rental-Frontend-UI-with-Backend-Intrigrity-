'use client'

import { useState } from 'react'
import { IUser } from '@/types/user'
import DashboardSidebar from './DashboardSidebar'
import DashboardHeader from './DashboardHeader'

interface DashboardShellProps {
     children: React.ReactNode
     user: IUser
}

export default function DashboardShell({ children, user }: DashboardShellProps) {
     const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
     const userRole = user?.data?.profile?.role || 'CUSTOMER'

     return (
          <div className="min-h-screen bg-background text-foreground flex">
               {/* Sidebar with Role & Mobile State */}
               <DashboardSidebar
                    userRole={userRole}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
               />

               <div className="flex-1 flex flex-col min-w-0">
                    {/* Header with User Info & Mobile Menu Toggle */}
                    <DashboardHeader
                         user={user}
                         onMobileMenuToggle={() => setIsMobileSidebarOpen((prev) => !prev)}
                    />

                    {/* Dynamic Page Content */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                         {children}
                    </main>
               </div>
          </div>
     )
}