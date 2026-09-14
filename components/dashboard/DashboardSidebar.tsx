'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
     LayoutDashboard,
     ShoppingBag,
     Package,
     Users,
     PlusCircle,
     LogOut,
     X,
     Compass,
     Zap,
     User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout } from '@/service/logout'
import { toast } from 'sonner'

// Role-based Navigation Configuration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const navConfig: Record<string, Array<{ title: string; href: string; icon: any }>> = {
     ADMIN: [
          { title: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
          { title: 'Users Management', href: '/dashboard/admin/customer', icon: Users },
          { title: 'Gear Moderation', href: '/dashboard/admin/gear', icon: Package },
          { title: 'All Orders', href: '/dashboard/admin/orders', icon: ShoppingBag },
          { title: 'Profile', href: '/dashboard/profile', icon: User },
     ],
     PROVIDER: [
          { title: 'Provider Overview', href: '/dashboard/provider', icon: LayoutDashboard },
          { title: 'My Inventory', href: '/dashboard/provider/gear', icon: Package },
          { title: 'Add New Gear', href: '/dashboard/provider/gear/new', icon: PlusCircle },
          { title: 'Incoming Orders', href: '/dashboard/provider/orders', icon: ShoppingBag },
          { title: 'Profile', href: '/dashboard/profile', icon: User },
     ],
     CUSTOMER: [
          { title: 'Customer Dashboard', href: '/dashboard/customer', icon: LayoutDashboard },
          { title: 'My Rental Orders', href: '/dashboard/customer/orders', icon: ShoppingBag },
          { title: 'Explore Gear', href: '/gear', icon: Compass },
          { title: 'Profile', href: '/dashboard/profile', icon: User },
     ],
}

interface DashboardSidebarProps {
     userRole: string
     isMobileSidebarOpen: boolean
     setIsMobileSidebarOpen: (open: boolean) => void
}

export default function DashboardSidebar({
     userRole,
     isMobileSidebarOpen,
     setIsMobileSidebarOpen,
}: DashboardSidebarProps) {
     const pathname = usePathname()
     const currentNavItems = navConfig[userRole] || navConfig.CUSTOMER

     const handleUserMenuAction = async (action: string) => {
          if (action === 'logout') {
               await logout()
               toast.success('User Logged Out Successfully!')
          }
     }

     const renderNavLinks = () => (
          <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
               <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                    {userRole} Navigation
               </p>
               {currentNavItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                         <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsMobileSidebarOpen(false)}
                              className={cn(
                                   'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all',
                                   isActive
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              )}
                         >
                              <Icon className="size-4" />
                              <span>{item.title}</span>
                         </Link>
                    )
               })}
          </div>
     )

     const renderLogoutButton = () => (
          <div className="p-4 border-t border-border/40  ">
               <button
                    type="button"
                    onClick={() => {
                         setIsMobileSidebarOpen(false)
                         handleUserMenuAction('logout')
                    }}
                    className="menu-item flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 hover:cursor-pointer"
               >
                    <LogOut className="size-4" /> Log out
               </button>
          </div>
     )

     return (
          <>
               {/* Desktop Sidebar */}
               <aside className="hidden lg:flex w-64 flex-col border-r border-border/60 bg-card/50 glass-panel sticky top-0 h-screen z-30">
                    <div className="h-16 flex items-center px-6 border-b border-border/40">
                         <Link href="/" className="flex items-center gap-2">
                              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                                   <Zap className="size-5 fill-current" strokeWidth={2.5} />
                              </span>
                              <span className="text-xl font-extrabold tracking-tight">
                                   Gear<span className="text-primary">Up</span>
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase">
                                   {userRole.toLowerCase()}
                              </span>
                         </Link>
                    </div>

                    {renderNavLinks()}
                    {renderLogoutButton()}
               </aside>

               {/* Mobile Backdrop Overlay */}
               {isMobileSidebarOpen && (
                    <div
                         className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
                         onClick={() => setIsMobileSidebarOpen(false)}
                    />
               )}

               {/* Mobile & Tablet Drawer */}
               <aside
                    className={cn(
                         'fixed inset-y-0 left-0 w-64 bg-card border-r border-border z-50 flex flex-col transition-transform duration-300 ease-in-out lg:hidden',
                         isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    )}
               >
                    <div className="h-16 flex items-center justify-between px-6 border-b border-border">
                         <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileSidebarOpen(false)}>
                              <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                   <Zap className="size-4 fill-current" strokeWidth={2.5} />
                              </span>
                              <span className="text-lg font-extrabold">
                                   Gear<span className="text-primary">Up</span>
                              </span>
                         </Link>
                         <button
                              onClick={() => setIsMobileSidebarOpen(false)}
                              className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted"
                         >
                              <X className="size-5" />
                         </button>
                    </div>

                    {renderNavLinks()}
                    {renderLogoutButton()}
               </aside>
          </>
     )
}