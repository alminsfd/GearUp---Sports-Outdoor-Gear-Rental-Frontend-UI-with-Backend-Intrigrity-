'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, ArrowLeft, LifeBuoy } from 'lucide-react'
import Link from 'next/link'

export default function PaymentError({
     error,
     reset,
}: {
     error: Error & { digest?: string }
     reset: () => void
}) {
     useEffect(() => {
          console.error('Payment Error Boundary:', error)
     }, [error])

     return (
          <div className="container max-w-lg mx-auto min-h-[85vh] flex items-center justify-center p-4">
               <Card className="w-full border-destructive/20 shadow-xl rounded-3xl overflow-hidden text-center">
                    <CardHeader className="space-y-4 pt-8 pb-4 bg-destructive/5 border-b border-destructive/10">
                         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                              <AlertTriangle className="h-8 w-8" />
                         </div>
                         <div>
                              <CardTitle className="text-xl font-black text-foreground">
                                   Payment Error
                              </CardTitle>
                              <p className="text-xs font-medium text-muted-foreground mt-1">
                                   Something went wrong while processing your payment.
                              </p>
                         </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-4">
                         <div className="rounded-2xl bg-muted/50 p-4 text-xs font-mono text-muted-foreground break-all text-left border border-border/50">
                              <p className="font-bold text-foreground mb-1 font-sans">Error Details:</p>
                              {error.message || 'An unexpected transaction error occurred. Please try again.'}
                         </div>

                         <p className="text-xs text-muted-foreground leading-relaxed">
                              Your card has not been charged for this failed transaction. If the amount was deducted, it will be automatically refunded.
                         </p>
                    </CardContent>

                    <CardFooter className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
                         <Button
                              onClick={() => reset()}
                              className="w-full rounded-2xl font-bold py-5 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                         >
                              <RefreshCw className="h-4 w-4" />
                              Try Again
                         </Button>

                         <Button
                              variant="outline"
                              asChild
                              className="w-full rounded-2xl font-bold py-5 gap-2 border-border/60"
                         >
                              <Link href="/">
                                   <ArrowLeft className="h-4 w-4" />
                                   Return Home
                              </Link>
                         </Button>
                    </CardFooter>

                    <div className="pb-6 text-center">
                         <a
                              href="/support"
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                         >
                              <LifeBuoy className="h-3.5 w-3.5" />
                              Need help with this order? Contact Support
                         </a>
                    </div>
               </Card>
          </div>
     )
}