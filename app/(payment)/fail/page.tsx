import Link from 'next/link'
import { XCircle, RefreshCw, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FailPageProps {
     searchParams: Promise<{
          txnId?: string
     }>
}

export default async function PaymentFailPage({ searchParams }: FailPageProps) {
     const { txnId } = await searchParams

     return (
          <div className="min-h-[80vh] flex items-center justify-center p-4">
               <div className="max-w-md w-full glass-panel rounded-3xl p-8 space-y-6 text-center border border-border/60 shadow-xl relative overflow-hidden">
                    {/* Top Glow Accent */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-destructive/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Icon Container */}
                    <div className="relative mx-auto size-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive ring-8 ring-destructive/5">
                         <XCircle className="size-10 stroke-[2.5]" />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2">
                         <h1 className="text-2xl font-black tracking-tight text-foreground">
                              Payment Failed
                         </h1>
                         <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                              Something went wrong while processing your transaction. No money was deducted from your account.
                         </p>
                    </div>

                    {/* Transaction Details Box */}
                    {txnId && (
                         <div className="bg-muted/40 rounded-2xl p-4 border border-border/40 space-y-1.5 text-left">
                              <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground block">
                                   Reference Transaction ID
                              </span>
                              <code className="text-xs font-mono font-bold text-foreground tracking-wide block select-all">
                                   {txnId}
                              </code>
                         </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-2 space-y-3">
                         <Button
                              asChild
                              className="w-full rounded-2xl py-6 font-bold text-xs uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 transition-all shadow-md active:scale-[0.99]"
                         >
                              <Link href="/checkout" className="flex items-center justify-center gap-2">
                                   <RefreshCw className="size-4" />
                                   Try Again
                              </Link>
                         </Button>

                         <Button
                              asChild
                              variant="ghost"
                              className="w-full rounded-2xl py-5 font-bold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
                         >
                              <Link href="/support" className="flex items-center justify-center gap-2">
                                   <HelpCircle className="size-4" />
                                   Contact Support
                              </Link>
                         </Button>
                    </div>
               </div>
          </div>
     )
}