'use client'

import { IUser } from '@/types/user'
import { Menu } from 'lucide-react'

interface DashboardHeaderProps {
     user: IUser
     onMobileMenuToggle: () => void
}

export default function DashboardHeader({ user, onMobileMenuToggle }: DashboardHeaderProps) {
     const Userdata = user?.data?.profile

     return (
          <header className="h-16 border-b border-border/60 bg-card/40 glass-panel sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between">
               <div className="flex items-center gap-3">
                    {/* Mobile & Tablet Hamburger Button */}
                    <button
                         onClick={onMobileMenuToggle}
                         className="flex lg:hidden items-center justify-center p-2 rounded-xl border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                         aria-label="Toggle Navigation Menu"
                    >
                         <Menu className="size-5" />
                    </button>

                    <h1 className="text-sm font-bold text-foreground capitalize">
                         {Userdata?.role?.toLowerCase()} Control Panel
                    </h1>
               </div>

               <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 pl-2 border-l border-border/60">
                         <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs uppercase">
                              {Userdata?.name ? Userdata.name.substring(0, 2) : 'GU'}
                         </div>
                         <div className="hidden sm:block text-left">
                              <p className="text-xs font-bold leading-none">{Userdata?.name || 'User'}</p>
                              <p className="text-[10px] text-muted-foreground capitalize">
                                   {Userdata?.role?.toLowerCase()}
                              </p>
                         </div>
                    </div>
               </div>
          </header>
     )
}