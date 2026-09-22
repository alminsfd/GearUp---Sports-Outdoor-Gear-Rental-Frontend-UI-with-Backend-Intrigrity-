
import Image from 'next/image';
import Link from 'next/link';

interface GearItem {
     id: string;
     title: string;
     brand: string;
     pricePerDay: number;
     stock: number;
     isAvailable: boolean;
     images: string[];
     createdAt: string;
     category?: { name: string };
}

interface RentalOrder {
     id: string;
     startDate: string;
     endDate: string;
     totalDays: number;
     totalAmount: number;
     status: 'PLACED' | 'CONFIRMED' | 'PAID' | 'PICKED_UP' | 'RETURNED' | 'CANCELLED';
     createdAt: string;
     gearItem: {
          id: string;
          title: string;
          images: string[];
     };
}

interface ProviderOverviewClientProps {
     initialGears: GearItem[];
     initialOrders: RentalOrder[];
}

export default function ProviderOverviewClient({
     initialGears,
     initialOrders,
}: ProviderOverviewClientProps) {
     // Stats Calculation
     const totalGears = initialGears.length;
     const activeRentals = initialOrders.filter((o) => o.status === 'CONFIRMED' || o.status === 'PICKED_UP').length;
     const pendingOrders = initialOrders.filter((o) => o.status === 'PLACED' || o.status === 'PAID').length;
     const totalEarnings = initialOrders
          .filter((o) => o.status !== 'CANCELLED')
          .reduce((sum, order) => sum + order.totalAmount, 0);

     const formatDate = (dateString: string) => {
          return new Date(dateString).toLocaleDateString('en-US', {
               year: 'numeric',
               month: 'short',
               day: 'numeric',
               timeZone: 'UTC',
          });
     };

     const getStatusBadge = (status: RentalOrder['status']) => {
          const statusMap = {
               PLACED: 'bg-[hsl(var(--status-placed-bg))] text-[hsl(var(--status-placed-text))] border-[hsl(var(--status-placed-border))]',
               CONFIRMED: 'bg-[hsl(var(--status-confirmed-bg))] text-[hsl(var(--status-confirmed-text))] border-[hsl(var(--status-confirmed-border))]',
               PAID: 'bg-[hsl(var(--status-paid-bg))] text-[hsl(var(--status-paid-text))] border-[hsl(var(--status-paid-border))]',
               PICKED_UP: 'bg-[hsl(var(--status-picked-bg))] text-[hsl(var(--status-picked-text))] border-[hsl(var(--status-picked-border))]',
               RETURNED: 'bg-[hsl(var(--status-returned-bg))] text-[hsl(var(--status-returned-text))] border-[hsl(var(--status-returned-border))]',
               CANCELLED: 'bg-[hsl(var(--status-cancelled-bg))] text-[hsl(var(--status-cancelled-text))] border-[hsl(var(--status-cancelled-border))]',
          };

          return (
               <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusMap[status] || ''}`}>
                    {status}
               </span>
          );
     };

     return (
          <div className="space-y-8">
               {/* 1. Key Metrics Overview Cards */}
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="glass-panel rounded-xl p-5 border border-border">
                         <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Gear Listed</p>
                         <p className="mt-2 text-3xl font-extrabold text-foreground">{totalGears}</p>
                    </div>

                    <div className="glass-panel rounded-xl p-5 border border-border">
                         <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Active Rentals</p>
                         <p className="mt-2 text-3xl font-extrabold text-primary">{activeRentals}</p>
                    </div>

                    <div className="glass-panel rounded-xl p-5 border border-border">
                         <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pending Orders</p>
                         <p className="mt-2 text-3xl font-extrabold text-amber-500">{pendingOrders}</p>
                    </div>

                    <div className="glass-panel rounded-xl p-5 border border-border">
                         <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Revenue</p>
                         <p className="mt-2 text-3xl font-extrabold text-emerald-500">${totalEarnings}</p>
                    </div>
               </div>

               {/* 2. Provider Listed Gear Section */}
               <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <h2 className="text-lg font-semibold text-foreground">Your Listed Gear</h2>
                         <span className="text-xs text-muted-foreground">{initialGears.length} Items</span>
                    </div>

                    <div className="glass-panel overflow-hidden rounded-xl border border-border">
                         <div className="overflow-x-auto">
                              <table className="w-full text-left text-sm">
                                   <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
                                        <tr>
                                             <th className="px-6 py-4 font-semibold">Gear</th>
                                             <th className="px-6 py-4 font-semibold">Brand</th>
                                             <th className="px-6 py-4 font-semibold">Daily Rate</th>
                                             <th className="px-6 py-4 font-semibold">Stock</th>
                                             <th className="px-6 py-4 font-semibold">Availability</th>
                                             <th className="px-6 py-4 font-semibold">Added On</th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-border">
                                        {initialGears.length === 0 ? (
                                             <tr>
                                                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                                       No gear items listed yet.
                                                  </td>
                                             </tr>
                                        ) : (
                                             initialGears.slice(0, 5).map((item) => (
                                                  <tr key={item.id} className="transition-colors hover:bg-muted/30">
                                                       <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                 {item.images?.[0] && (
                                                                      <Image
                                                                           src={item.images[0]}
                                                                           alt={item.title}
                                                                           width={40}
                                                                           height={40}
                                                                           className="rounded-lg object-cover"
                                                                      />
                                                                 )}
                                                                 <span className="font-semibold text-foreground">{item.title}</span>
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-4 text-muted-foreground">{item.brand}</td>
                                                       <td className="px-6 py-4 font-medium text-foreground">${item.pricePerDay}/day</td>
                                                       <td className="px-6 py-4 text-muted-foreground">{item.stock} Units</td>
                                                       <td className="px-6 py-4">
                                                            <span
                                                                 className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${item.isAvailable
                                                                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                                      : 'bg-destructive/10 text-destructive border border-destructive/20'
                                                                      }`}
                                                            >
                                                                 {item.isAvailable ? 'Available' : 'Out of Stock'}
                                                            </span>
                                                       </td>
                                                       <td className="px-6 py-4 text-muted-foreground">{formatDate(item.createdAt)}</td>
                                                  </tr>
                                             ))
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>

               {/* 3. Recent Rental Orders Section */}
               <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <h2 className="text-lg font-semibold text-foreground">Recent Rental Orders</h2>
                         <Link href="/orders" className="text-xs font-medium text-primary hover:underline">
                              View All Orders →
                         </Link>
                    </div>

                    <div className="glass-panel overflow-hidden rounded-xl border border-border">
                         <div className="overflow-x-auto">
                              <table className="w-full text-left text-sm">
                                   <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
                                        <tr>
                                             <th className="px-6 py-4 font-semibold">Gear Item</th>
                                             <th className="px-6 py-4 font-semibold">Duration</th>
                                             <th className="px-6 py-4 font-semibold">Total Amount</th>
                                             <th className="px-6 py-4 font-semibold">Status</th>
                                             <th className="px-6 py-4 font-semibold">Ordered Date</th>
                                             <th className="px-6 py-4 text-right font-semibold">Action</th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-border">
                                        {initialOrders.length === 0 ? (
                                             <tr>
                                                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                                       No rental orders received yet.
                                                  </td>
                                             </tr>
                                        ) : (
                                             initialOrders.slice(0, 5).map((order) => (
                                                  <tr key={order.id} className="transition-colors hover:bg-muted/30">
                                                       <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                 {order.gearItem?.images?.[0] && (
                                                                      <Image
                                                                           src={order.gearItem.images[0]}
                                                                           alt={order.gearItem.title}
                                                                           width={40}
                                                                           height={40}
                                                                           className="rounded-lg object-cover"
                                                                      />
                                                                 )}
                                                                 <span className="font-semibold text-foreground">
                                                                      {order.gearItem?.title || 'N/A'}
                                                                 </span>
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-4 text-muted-foreground">{order.totalDays} Days</td>
                                                       <td className="px-6 py-4 font-medium text-foreground">${order.totalAmount}</td>
                                                       <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                                                       <td className="px-6 py-4 text-muted-foreground">{formatDate(order.createdAt)}</td>
                                                       <td className="px-6 py-4 text-right">
                                                            <Link
                                                                 href={`/dashboard/provider/order`}
                                                                 className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                                                            >
                                                                 Details
                                                            </Link>
                                                       </td>
                                                  </tr>
                                             ))
                                        )}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>
          </div>
     );
}