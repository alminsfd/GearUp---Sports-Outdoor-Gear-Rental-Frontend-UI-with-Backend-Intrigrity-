import Link from 'next/link'
import { CheckCircle2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SuccessPageProps {
     searchParams: Promise<{
          txnId?: string
     }>
}

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
     const { txnId } = await searchParams

     return (
          <div className="min-h-[80vh] flex items-center justify-center p-4">
               <div className="max-w-md w-full glass-panel rounded-3xl p-8 space-y-6 text-center border border-border/60 shadow-xl relative overflow-hidden">
                    {/* Top Glow Accent */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Animated Icon Container */}
                    <div className="relative mx-auto size-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 ring-8 ring-emerald-500/5">
                         <CheckCircle2 className="size-10 stroke-[2.5]" />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2">
                         <h1 className="text-2xl font-black tracking-tight text-foreground">
                              Payment Successful!
                         </h1>
                         <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                              Thank you for your order. We have received your payment and your rental process has been initialized.
                         </p>
                    </div>

                    {/* Transaction Details Box */}
                    {txnId && (
                         <div className="bg-muted/40 rounded-2xl p-4 border border-border/40 space-y-1.5 text-left">
                              <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground block">
                                   Transaction ID
                              </span>
                              <div className="flex items-center justify-between">
                                   <code className="text-xs font-mono font-bold text-foreground tracking-wide select-all">
                                        {txnId}
                                   </code>
                                   <ShieldCheck className="size-4 text-emerald-500" />
                              </div>
                         </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-2 space-y-3">
                         <Button
                              asChild
                              className="w-full rounded-2xl py-6 font-bold text-xs uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 transition-all shadow-md active:scale-[0.99]"
                         >
                              <Link href="/dashboard/customer/orders" className="flex items-center justify-center gap-2">
                                   <ShoppingBag className="size-4" />
                                   View Your Orders
                              </Link>
                         </Button>

                         <Button
                              asChild
                              variant="ghost"
                              className="w-full rounded-2xl py-5 font-bold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
                         >
                              <Link href="/" className="flex items-center justify-center gap-2">
                                   Back to Home
                                   <ArrowRight className="size-3.5" />
                              </Link>
                         </Button>
                    </div>
               </div>
          </div>
     )
}