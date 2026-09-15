import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getRentalOrdersDetails } from '@/app/dashboard/_action/customar_action';
import { RentalOrder } from '@/types/orderDetails';

interface PageProps {
     params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: PageProps) {
     const { id } = await params;
     const response = await getRentalOrdersDetails(id);

     if (!response?.success || !response.data) {
          notFound();
     }

     const order: RentalOrder = response.data;

     return (
          <div className="mx-auto max-w-4xl px-4 py-8">
               <div className="mb-6 flex items-center justify-between">
                    <Link
                         href="/dashboard/customer/orders"
                         className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                         ← Back to Orders
                    </Link>
                    <span className="text-xs text-muted-foreground">Order ID: {order.id}</span>
               </div>

               <div className="glass-panel space-y-6 rounded-2xl p-6">
                    <div className="flex items-start justify-between border-b pb-4">
                         <div>
                              <h1 className="text-xl font-bold text-foreground">{order.gearItem?.title}</h1>
                              <p className="text-sm text-muted-foreground">{order.gearItem?.brand}</p>
                         </div>
                         <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                              {order.status}
                         </span>
                    </div>

                    {order.gearItem?.images?.[0] && (
                         <div className="relative h-64 w-full overflow-hidden rounded-xl">
                              <Image
                                   src={order.gearItem.images[0]}
                                   alt={order.gearItem.title}
                                   fill
                                   className="object-cover"
                              />
                         </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                         {/* Order Summary */}
                         <div className="space-y-3 rounded-xl bg-muted/40 p-4">
                              <h3 className="font-semibold text-foreground">Rental Info</h3>
                              <div className="text-sm space-y-1 text-muted-foreground">
                                   <p><strong className="text-foreground">Start:</strong> {new Date(order.startDate).toLocaleString()}</p>
                                   <p><strong className="text-foreground">End:</strong> {new Date(order.endDate).toLocaleString()}</p>
                                   <p><strong className="text-foreground">Duration:</strong> {order.totalDays} Days</p>
                                   <p><strong className="text-foreground">Total Amount:</strong> ${order.totalAmount}</p>
                              </div>
                         </div>

                         {/* Customer & Provider Info */}
                         <div className="space-y-3 rounded-xl bg-muted/40 p-4">
                              <h3 className="font-semibold text-foreground">Contacts</h3>
                              <div className="text-sm space-y-1 text-muted-foreground">
                                   <p><strong className="text-foreground">Customer:</strong> {order.customer?.name} ({order.customer?.email})</p>
                                   <p><strong className="text-foreground">Provider:</strong> {order.gearItem?.provider?.name} ({order.gearItem?.provider?.email})</p>
                                   <p><strong className="text-foreground">Provider Phone:</strong> {order.gearItem?.provider?.phone}</p>
                              </div>
                         </div>
                    </div>

                    {/* Payment Information */}
                    {order.payment && (
                         <div className="rounded-xl bg-muted/40 p-4">
                              <h3 className="font-semibold text-foreground mb-2">Payment Details</h3>
                              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                   <p><strong className="text-foreground">Method:</strong> {order.payment.paymentMethod}</p>
                                   <p><strong className="text-foreground">Status:</strong> {order.payment.status}</p>
                                   <p className="col-span-2"><strong className="text-foreground">Transaction ID:</strong> {order.payment.transactionId}</p>
                              </div>
                         </div>
                    )}
               </div>
          </div>
     );
}