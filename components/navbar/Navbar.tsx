'use client'

import { useState } from 'react'
import { BookOpen, Compass, Home, Menu, Moon, Search, X, ChevronRight } from 'lucide-react'
import { Logo } from './Logo'
import { CategoryMenu } from './CategoryMenu'
import { ProfileMenu } from './ProfileMenu'
import Link from 'next/link'

const navItems = [
     { title: 'Home', href: '/', icon: Home },
     { title: 'Browse Gear', href: '/browse', icon: Compass },
     { title: 'Categories', href: '/categories', children: true },
     { title: 'How It Works', href: '/how-it-works', icon: BookOpen },
]


export type IUser = {
     success: boolean
     message: string
     data: {
          profile: {
               id: string,
               name: string,
               email: string,
               phone: string,
               activeStatus: string,
               role: "CUSTOMER" | "PROVIDER" | "ADMIN",
               createdAt: string,
               profileImage: string,
               status: "ACTIVE" | "SUSPENDED",
               updatedAt: string
          }
     }
}
type NavbarProps = {
     user: IUser
}

export function Navbar({ user }: NavbarProps) {
     const [categoriesOpen, setCategoriesOpen] = useState(false)
     const [profileOpen, setProfileOpen] = useState(false)
     const [searchOpen, setSearchOpen] = useState(false)
     const [mobileOpen, setMobileOpen] = useState(false)

     return (
          <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
               <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-border/70 bg-card/85 px-3 py-2.5 shadow-xl backdrop-blur-xl sm:px-4">
                    <Logo />

                    {/* Desktop Nav */}
                    <div className="hidden items-center gap-1 lg:flex">
                         {navItems.map((item) => {
                              if (item.children) {
                                   return (
                                        <CategoryMenu
                                             key={item.title}
                                             open={categoriesOpen}
                                             setOpen={(v) => {
                                                  setCategoriesOpen(v)
                                                  setProfileOpen(false)
                                             }}
                                        />
                                   )
                              }

                              const IconComponent = item.icon

                              return (
                                   <Link key={item.title} href={item.href} className="nav-link">
                                        {IconComponent && <IconComponent className="size-4" />}
                                        {item.title}
                                   </Link>
                              )
                         })}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1.5">
                         <div className="relative flex items-center">
                              <button type="button" onClick={() => setSearchOpen(!searchOpen)} className="icon-button">
                                   <Search className="size-4.25" />
                              </button>
                              {searchOpen && (
                                   <input autoFocus placeholder="Search gear..." className="ml-2 rounded-xl border border-border bg-muted px-3 py-1.5 text-xs focus:outline-none" />
                              )}
                         </div>

                         <button type="button" className="icon-button hidden sm:flex"><Moon className="size-4.25" /></button>
                         <div className="hidden h-5 w-px bg-border sm:block" />
                         <div className="hidden sm:block">
                              <ProfileMenu user={user} open={profileOpen} setOpen={(v) => { setProfileOpen(v); setCategoriesOpen(false) }} />
                         </div>

                         {/* Mobile Menu Toggle */}
                         <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="icon-button lg:hidden">
                              {mobileOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
                         </button>
                    </div>
               </nav>

               {/* Mobile Drawer */}
               {mobileOpen && (
                    <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border/70 bg-card p-3 shadow-xl lg:hidden">
                         <div className="flex flex-col gap-1">
                              {navItems.map((item) => (
                                   <Link key={item.title} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted">
                                        {item.title}
                                        <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                                   </Link>
                              ))}
                         </div>
                    </div>
               )}
          </header>
     )
}