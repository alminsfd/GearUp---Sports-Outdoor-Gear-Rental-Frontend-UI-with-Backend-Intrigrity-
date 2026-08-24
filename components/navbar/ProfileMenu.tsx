'use client'

import { BarChart3, LogOut, ShoppingBag } from 'lucide-react'
import Link from 'next/link';

export function ProfileMenu({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
     return (
          <div className="relative">
               <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="relative flex size-9 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background ring-2 ring-background transition-transform hover:scale-105"
               >
                    JD<span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
               </button>

               {open && (
                    <div className="absolute right-0 top-[calc(100%+16px)] z-30 w-64 rounded-2xl border border-border/70 bg-card p-2 shadow-2xl">
                         <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                              <div className="flex size-9 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">JD</div>
                              <div>
                                   <p className="text-sm font-bold text-foreground">Jordan Davis</p>
                                   <p className="text-xs text-muted-foreground">jordan@gearup.co</p>
                              </div>
                         </div>
                         <div className="my-2 h-px bg-border" />
                         <Link href="/dashboard" onClick={() => setOpen(false)} className="menu-item">
                              <BarChart3 className="size-4" /> Dashboard
                              <span className="ml-auto rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold text-primary">PRO</span>
                         </Link>
                         <Link href="/orders" onClick={() => setOpen(false)} className="menu-item">
                              <ShoppingBag className="size-4" /> My Orders
                         </Link>
                         <button type="button" className="menu-item w-full text-destructive hover:bg-destructive/10">
                              <LogOut className="size-4" /> Log out
                         </button>
                    </div>
               )}
          </div>
     )
}