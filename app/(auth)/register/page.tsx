
import { HomeBackButton } from "@/components/auth/HomeBackButton";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
     return (
          <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

               <div className="relative hidden flex-col justify-between bg-emerald-600 p-10 text-white lg:flex dark:bg-emerald-950">
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/30 to-black/40 pointer-events-none" />

                    {/* Logo */}
                    <div className="relative z-10 flex items-center gap-2">
                         <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                              <Sparkles className="size-5 text-white" />
                         </div>
                         <span className="text-xl font-bold tracking-tight">GearUp</span>
                    </div>

                    {/* Features / Benefits */}
                    <div className="relative z-10 my-auto max-w-lg space-y-6">
                         <h2 className="text-4xl font-extrabold leading-tight">
                              Start your journey with GearUp today.
                         </h2>
                         <p className="text-emerald-100 text-sm leading-relaxed">
                              Create an account to browse equipment, post rentals, and connect with outdoor enthusiasts.
                         </p>

                         <div className="space-y-3 pt-2">
                              {[
                                   "Easy setup in less than 2 minutes",
                                   "Access to top-quality gear & equipment",
                                   "Verified users & secure transactions",
                              ].map((text, index) => (
                                   <div key={index} className="flex items-center gap-3 text-sm font-medium">
                                        <CheckCircle2 className="size-5 text-emerald-300 shrink-0" />
                                        <span>{text}</span>
                                   </div>
                              ))}
                         </div>
                    </div>

                    <div className="relative z-10 text-xs text-emerald-200">
                         © {new Date().getFullYear()} GearUp Inc. All rights reserved.
                    </div>
               </div>
               <div className="relative flex items-center justify-center p-6 sm:p-12">
                    <div className="absolute top-6 left-6 z-20">
                         <HomeBackButton />
                    </div>

                    {/* Form Container */}
                    <div className="w-full max-w-md space-y-6 pt-10 sm:pt-0">
                         <div className="space-y-2 text-center">
                              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                   Create an Account
                              </h1>
                              <p className="text-sm text-muted-foreground">
                                   Enter your details to register a new account
                              </p>
                         </div>

                         {/* REGISTER FORM */}
                         <RegisterForm />
                    </div>
               </div>

          </div>
     );
}