'use client'

import { BarChart3, LogIn, LogOut, Settings, ShoppingBag, Store, } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { logout } from '@/service/logout'
import { toast } from 'sonner'
import { IUser } from '@/types/gear'







type ProfileMenuProps = {
     user: IUser | null
     open: boolean
     setOpen: (v: boolean) => void
}

export function ProfileMenu({ open, setOpen, user }: ProfileMenuProps) {
     const userData = user?.data?.profile


     if (!userData) {
          return (
               <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-95"
               >
                    <LogIn className="size-4" />
                    <span>Log In</span>
               </Link>
          )
     }

     const handleUserMenuAction = async (action: string) => {
          if (action === "logout") {
               await logout();
               toast.success("User Logged Out Successfully!");
          }
     };

     const name = userData?.name || "User"
     const email = userData?.email || ""
     const role = userData?.role?.toLowerCase() || "customer"
     const photo = userData?.profileImage


     const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()


     const getDashboardLink = () => {
          switch (role) {
               case "admin":
                    return "/dashboard/admin"
               case "provider":
                    return "/dashboard/provider"
               default:
                    return "/dashboard/customer"
          }
     }

     return (
          <div className="relative">

               <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-foreground text-xs font-bold text-background ring-2 ring-background transition-transform hover:scale-105"
               >
                    {photo ? (
                         <Image
                              src={photo}
                              alt={name}
                              fill
                              className="object-cover"
                         />
                    ) : (
                         initials
                    )}
                    <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
               </button>


               {open && (
                    <div className="absolute right-0 top-[calc(100%+16px)] z-30 w-64 rounded-2xl border border-border/70 bg-card p-2 shadow-2xl">
                         <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                              <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground text-xs font-bold text-background">
                                   {photo ? (
                                        <Image src={photo} alt={name} fill className="object-cover" />
                                   ) : (
                                        initials
                                   )}
                              </div>
                              <div className="truncate">
                                   <p className="truncate text-sm font-bold text-foreground">{name}</p>
                                   <p className="truncate text-xs text-muted-foreground">{email}</p>
                              </div>
                         </div>

                         <div className="my-2 h-px bg-border" />


                         <Link
                              href={getDashboardLink()}
                              onClick={() => setOpen(false)}
                              className="menu-item flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                         >
                              <BarChart3 className="size-4" /> Dashboard
                              <span className="ml-auto uppercase rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                                   {role}
                              </span>
                         </Link>

                         {role === "customer" && (
                              <Link
                                   href="/dashboard/customer/orders"
                                   onClick={() => setOpen(false)}
                                   className="menu-item flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                              >
                                   <ShoppingBag className="size-4" /> My Orders
                              </Link>
                         )}

                         {role === "provider" && (
                              <Link
                                   href="/dashboard/provider/orders"
                                   onClick={() => setOpen(false)}
                                   className="menu-item flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                              >
                                   <Store className="size-4" /> Manage Orders
                              </Link>
                         )}

                         <Link
                              href="/profile"
                              onClick={() => setOpen(false)}
                              className="menu-item flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                         >
                              <Settings className="size-4" /> Settings
                         </Link>

                         <button
                              type="button"
                              onClick={() => {
                                   setOpen(false)
                                   handleUserMenuAction("logout")
                              }}
                              className="menu-item flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                         >
                              <LogOut className="size-4" /> Log out
                         </button>
                    </div>
               )}
          </div>
     )
}