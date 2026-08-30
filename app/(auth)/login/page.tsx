import { LoginForm } from "@/components/auth/LoginForm";
import { ShieldCheck, Sparkles } from "lucide-react";
import { HomeBackButton } from "@/components/auth/HomeBackButton";

export default function LoginPage() {
     return (
          <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

               <div className="relative hidden flex-col justify-between bg-emerald-600 p-10 text-white lg:flex dark:bg-emerald-950">
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/30 to-black/40 pointer-events-none" />

                    {/* Top Header / Logo Area */}
                    <div className="relative z-10 flex items-center gap-2">
                         <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                              <Sparkles className="size-5 text-white" />
                         </div>
                         <span className="text-xl font-bold tracking-tight">GearUp</span>
                    </div>

                    {/* Center Banner Content */}
                    <div className="relative z-10 my-auto max-w-lg space-y-4">
                         <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                              <ShieldCheck className="size-4" /> Secure & Reliable Platform
                         </div>
                         <h2 className="text-4xl font-extrabold leading-tight">
                              Manage your gear & orders seamlessly.
                         </h2>
                         <p className="text-emerald-100 text-sm leading-relaxed">
                              Join thousands of users managing their items and rentals in one unified workspace.
                         </p>
                    </div>

                    {/* Bottom Footer Info */}
                    <div className="relative z-10 text-xs text-emerald-200">
                         © {new Date().getFullYear()} GearUp Inc. All rights reserved.
                    </div>
               </div>

               {/* Right side: Login form and back button*/}
               <div className="relative flex items-center justify-center p-6 sm:p-12">
                    {/* Back button to return to the home page */}

                    <div className="absolute top-6 left-6 z-20">
                         <HomeBackButton />
                    </div>

                    {/* Form Container */}
                    <div className="w-full max-w-md space-y-8">
                         <div className="space-y-2 text-center">
                              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                   Welcome Back!
                              </h1>
                              <p className="text-sm text-muted-foreground">
                                   Enter your credentials to access your account
                              </p>
                         </div>

                         {/* LOGIN FORM */}
                         <LoginForm />
                    </div>
               </div>

          </div>
     );
}