'use client'

import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail, User, Phone, MapPin, Image as ImageIcon, Loader2 } from 'lucide-react'
import { RegisterState, registerUser } from '@/app/(auth)/_actions/registeractions'
import { toast } from 'sonner'


function SubmitButton() {
     const { pending } = useFormStatus()

     return (
          <button
               type="submit"
               disabled={pending}
               className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
               {pending ? (
                    <>
                         <Loader2 className="size-4 animate-spin" />
                         <span>Creating Account...</span>
                    </>
               ) : (
                    <span>Create Account</span>
               )}
          </button>
     )
}

const initialState: RegisterState = {
     success: false,
     message: '',
}

export function RegisterForm() {
     const [state, formAction] = useActionState(registerUser, initialState)
     const [showPassword, setShowPassword] = useState(false)


     useEffect(() => {
          if (!state.message) return

          if (state.success) {
               toast.success(state.message)
          } else {
               toast.error(state.message)
          }
     }, [state])

     return (
          <form action={formAction} className="space-y-3.5">

               {/* Full Name */}
               <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Full Name *</label>
                    <div className="relative">
                         <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                         <input
                              type="text"
                              name="name"
                              required
                              placeholder="Md. Al Amin Hossain Tanvir"
                              className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-3 text-sm transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                         />
                    </div>
               </div>

               {/* Email */}
               <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Email *</label>
                    <div className="relative">
                         <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                         <input
                              type="email"
                              name="email"
                              required
                              placeholder="tanvir@example.com"
                              className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-3 text-sm transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                         />
                    </div>
               </div>

               {/* Password */}
               <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Password *</label>
                    <div className="relative">
                         <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                         <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              required
                              placeholder="••••••••"
                              className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-10 text-sm transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                         />
                         <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                         >
                              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                         </button>
                    </div>
               </div>

               {/* Phone & Image URL */}
               <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                         <label className="text-xs font-semibold text-foreground">Phone Number</label>
                         <div className="relative">
                              <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                              <input
                                   type="tel"
                                   name="phone"
                                   placeholder="+880 1700-000000"
                                   className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-3 text-sm transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                              />
                         </div>
                    </div>

                    <div className="space-y-1">
                         <label className="text-xs font-semibold text-foreground">Profile Image URL</label>
                         <div className="relative">
                              <ImageIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                              <input
                                   type="url"
                                   name="profileImage"
                                   placeholder="https://example.com/avatar.jpg"
                                   className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-3 text-sm transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                              />
                         </div>
                    </div>
               </div>

               {/* Address */}
               <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Address</label>
                    <div className="relative">
                         <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                         <input
                              type="text"
                              name="address"
                              placeholder="Dhaka, Bangladesh"
                              className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-3 text-sm transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                         />
                    </div>
               </div>

               {/* Submit Button Component */}
               <SubmitButton />

               {/* Sign In Link */}
               <p className="pt-1 text-center text-xs text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                         Sign In
                    </Link>
               </p>
          </form>
     )
}