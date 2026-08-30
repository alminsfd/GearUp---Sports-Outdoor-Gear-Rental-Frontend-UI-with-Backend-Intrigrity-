/* eslint-disable react/no-unescaped-entities */
'use client'

import { loginAction } from "@/app/(auth)/_actions/loginactions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

export function LoginForm() {
     const [state, action, pending] = useActionState(loginAction, null)
     const router = useRouter()

     useEffect(() => {
          if (!state) return

          if (state.success) {
               toast.success(state.message || "Login successful!")
               if (state.redirectTo) {
                    setTimeout(() => {
                         router.push(state.redirectTo!)
                         router.refresh()
                    }, 1000)
               }
          } else {
               toast.error(state.message || "Login failed")
          }
     }, [state, router])

     return (
          <Card className="w-full max-w-sm">
               <form action={action}>
                    <CardContent className="pt-6">
                         <div className="flex flex-col gap-6">
                              <div className="grid gap-2">
                                   <Label htmlFor="email">Email</Label>
                                   <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                   />
                              </div>
                              <div className="grid gap-2">
                                   <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                             href="#"
                                             className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                             Forgot your password?
                                        </a>
                                   </div>
                                   <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="enter your password"
                                        required
                                   />
                              </div>
                         </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                         <Button type="submit" disabled={pending} className="w-full">
                              {pending ? "Submitting..." : "Log In"}
                         </Button>
                    </CardFooter>
                    <p className="pb-3 pt-1 text-center text-xs text-muted-foreground">
                         Don't have an account?{' '}
                         <Link href="/register" className="font-semibold text-primary hover:underline">
                              Sign Up
                         </Link>
                    </p>
               </form>
          </Card>
     )
}