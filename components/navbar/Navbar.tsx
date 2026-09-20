'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { BookOpen, Compass, Home, Menu, Moon, Sun, Search, X, ChevronRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Logo } from './Logo'
import { CategoryMenu } from './CategoryMenu'
import { ProfileMenu } from './ProfileMenu'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { IUser } from '@/types/user'

const navItems = [
     { title: 'Home', href: '/', icon: Home },
     { title: 'Browse Gear', href: '/gear', icon: Compass },
     { title: 'Catagory', href: '/catagory', children: true },
     { title: 'How It Works', href: '/how-it-works', icon: BookOpen },
]

type NavbarProps = {
     user: IUser
}

export function Navbar({ user }: NavbarProps) {
     const pathname = usePathname()
     const router = useRouter()
     const { theme, setTheme } = useTheme()
     const [mounted, setMounted] = useState(false)

     const [categoriesOpen, setCategoriesOpen] = useState(false)
     const [profileOpen, setProfileOpen] = useState(false)
     const [searchOpen, setSearchOpen] = useState(false)
     const [mobileOpen, setMobileOpen] = useState(false)

     // Search Input State
     const [searchQuery, setSearchQuery] = useState('')

     // Avoid hydration mismatch — only render theme icon after mount
     useEffect(() => { setMounted(true) }, [])

     const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

     // Search Action Handler
     const handleSearchSubmit = (e: React.FormEvent) => {
          e.preventDefault()
          if (!searchQuery.trim()) return

          router.push(`/gear?searchTerm=${encodeURIComponent(searchQuery.trim())}`)
          setSearchOpen(false)
          setMobileOpen(false)
          setSearchQuery('')
     }

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
                              const isActive =
                                   item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

                              return (
                                   <Link
                                        key={item.title}
                                        href={item.href}
                                        className={cn(
                                             'nav-link flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all',
                                             isActive
                                                  ? 'bg-primary/10 text-primary font-bold'
                                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        )}
                                   >
                                        {IconComponent && <IconComponent className="size-4" />}
                                        {item.title}
                                   </Link>
                              )
                         })}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1.5">
                         {/* Desktop & Tablet Search Form */}
                         <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                              <button
                                   type="button"
                                   onClick={() => setSearchOpen(!searchOpen)}
                                   className="icon-button"
                                   aria-label="Toggle Search"
                              >
                                   <Search className="size-4.25" />
                              </button>
                              {searchOpen && (
                                   <div className="ml-2 flex items-center gap-1">
                                        <input
                                             autoFocus
                                             type="text"
                                             value={searchQuery}
                                             onChange={(e) => setSearchQuery(e.target.value)}
                                             placeholder="Search gear..."
                                             className="w-36 rounded-xl border border-border bg-muted px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary sm:w-48 transition-all"
                                        />
                                        <button
                                             type="submit"
                                             className="rounded-xl bg-primary px-2.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all"
                                        >
                                             Search
                                        </button>
                                   </div>
                              )}
                         </form>

                         <button type="button" onClick={toggleTheme} className="icon-button hidden sm:flex" aria-label="Toggle Theme">
                              {mounted && theme === 'dark' ? (
                                   <Sun className="size-4.25" />
                              ) : (
                                   <Moon className="size-4.25" />
                              )}
                         </button>
                         <div className="hidden h-5 w-px bg-border sm:block" />
                         <div className="hidden sm:block">
                              <ProfileMenu
                                   user={user}
                                   open={profileOpen}
                                   setOpen={(v) => {
                                        setProfileOpen(v)
                                        setCategoriesOpen(false)
                                   }}
                              />
                         </div>

                         {/* Mobile Menu Toggle */}
                         <button
                              type="button"
                              onClick={() => setMobileOpen(!mobileOpen)}
                              className="icon-button lg:hidden"
                              aria-label="Toggle Navigation"
                         >
                              {mobileOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
                         </button>
                    </div>
               </nav>

               {/* Mobile Drawer */}
               {mobileOpen && (
                    <div className="mx-auto mt-2 max-w-6xl space-y-3 rounded-2xl border border-border/70 bg-card p-3 shadow-xl lg:hidden">
                         {/* Mobile Search Bar */}
                         <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                              <div className="relative flex-1">
                                   <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                   <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search gear..."
                                        className="w-full rounded-xl border border-border bg-muted pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                                   />
                              </div>
                              <button
                                   type="submit"
                                   className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                              >
                                   Search
                              </button>
                         </form>

                         <div className="flex flex-col gap-1">
                              {navItems.map((item) => {
                                   const isActive =
                                        item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

                                   return (
                                        <Link
                                             key={item.title}
                                             href={item.href}
                                             onClick={() => setMobileOpen(false)}
                                             className={cn(
                                                  'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all',
                                                  isActive
                                                       ? 'bg-primary/10 text-primary font-bold'
                                                       : 'text-foreground hover:bg-muted'
                                             )}
                                        >
                                             {item.title}
                                             <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                                        </Link>
                                   )
                              })}
                         </div>

                         {/* Mobile Bottom Row — Theme + Profile */}
                         <div className="flex items-center justify-between border-t border-border pt-3">
                              <button
                                   type="button"
                                   onClick={toggleTheme}
                                   className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                                   aria-label="Toggle Theme"
                              >
                                   {mounted && theme === 'dark' ? (
                                        <>
                                             <Sun className="size-4" />
                                             <span>Light Mode</span>
                                        </>
                                   ) : (
                                        <>
                                             <Moon className="size-4" />
                                             <span>Dark Mode</span>
                                        </>
                                   )}
                              </button>
                              <ProfileMenu
                                   user={user}
                                   open={profileOpen}
                                   setOpen={(v) => {
                                        setProfileOpen(v)
                                        setCategoriesOpen(false)
                                   }}
                              />
                         </div>
                    </div>
               )}
          </header>
     )
}