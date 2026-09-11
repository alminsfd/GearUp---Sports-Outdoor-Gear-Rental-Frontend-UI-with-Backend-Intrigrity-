import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2, ShieldCheck } from 'lucide-react'

export default function PaymentLoading() {
     return (
          <div className="container max-w-4xl mx-auto py-12 px-4 space-y-8 min-h-[80vh] flex flex-col justify-center">
               {/* Top Banner Loader */}
               <div className="flex flex-col items-center justify-center space-y-3 text-center">
                    <div className="flex items-center gap-2 text-primary">
                         <Loader2 className="h-6 w-6 animate-spin" />
                         <span className="font-semibold text-sm tracking-wide uppercase">Securing Session</span>
                    </div>
                    <Skeleton className="h-8 w-64 rounded-xl" />
                    <Skeleton className="h-4 w-80 rounded-lg" />
               </div>

               {/* Main Grid Structure */}
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Order Details Skeleton */}
                    <Card className="md:col-span-7 border-border/50 shadow-sm rounded-3xl overflow-hidden">
                         <CardHeader className="space-y-2 border-b border-border/40 bg-muted/20 p-6">
                              <Skeleton className="h-6 w-1/3 rounded-lg" />
                              <Skeleton className="h-4 w-1/2 rounded-md" />
                         </CardHeader>
                         <CardContent className="p-6 space-y-6">
                              <div className="flex items-center gap-4">
                                   <Skeleton className="h-20 w-20 rounded-2xl shrink-0" />
                                   <div className="space-y-2 w-full">
                                        <Skeleton className="h-5 w-3/4 rounded-md" />
                                        <Skeleton className="h-4 w-1/2 rounded-md" />
                                        <Skeleton className="h-4 w-1/4 rounded-md" />
                                   </div>
                              </div>

                              <div className="border-t border-border/40 pt-4 space-y-3">
                                   <div className="flex justify-between">
                                        <Skeleton className="h-4 w-24 rounded" />
                                        <Skeleton className="h-4 w-16 rounded" />
                                   </div>
                                   <div className="flex justify-between">
                                        <Skeleton className="h-4 w-28 rounded" />
                                        <Skeleton className="h-4 w-12 rounded" />
                                   </div>
                                   <div className="flex justify-between pt-2 border-t border-border/40">
                                        <Skeleton className="h-6 w-20 rounded" />
                                        <Skeleton className="h-6 w-24 rounded" />
                                   </div>
                              </div>
                         </CardContent>
                    </Card>

                    {/* Payment Form Skeleton */}
                    <Card className="md:col-span-5 border-border/50 shadow-sm rounded-3xl overflow-hidden">
                         <CardHeader className="space-y-2 border-b border-border/40 bg-muted/20 p-6">
                              <Skeleton className="h-6 w-1/2 rounded-lg" />
                         </CardHeader>
                         <CardContent className="p-6 space-y-5">
                              <div className="space-y-2">
                                   <Skeleton className="h-4 w-1/3 rounded" />
                                   <Skeleton className="h-12 w-full rounded-2xl" />
                              </div>
                              <div className="space-y-2">
                                   <Skeleton className="h-4 w-1/3 rounded" />
                                   <Skeleton className="h-12 w-full rounded-2xl" />
                              </div>
                              <Skeleton className="h-12 w-full rounded-2xl mt-4" />

                              <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
                                   <ShieldCheck className="h-4 w-4 opacity-50" />
                                   <span>256-bit Encrypted Checkout</span>
                              </div>
                         </CardContent>
                    </Card>
               </div>
          </div>
     )
}