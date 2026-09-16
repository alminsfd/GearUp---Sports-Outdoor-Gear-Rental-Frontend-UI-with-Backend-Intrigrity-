'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
     Users,
     Package,
     ShoppingBag,
     TrendingUp,
     Activity,
     ArrowUpRight,
     ShieldCheck,
     Server,
     DollarSign,
     Download,
     CheckCircle2,
} from 'lucide-react';

interface MetricData {
     totalUsers: number;
     activeGears: number;
     totalRentals: number;
     totalRevenue?: number;
}

interface AdminOverviewProps {
     metrics?: MetricData;
}

export default function AdminOverview({
     metrics = {
          totalUsers: 0,
          activeGears: 0,
          totalRentals: 0,
          totalRevenue: 0,
     },
}: AdminOverviewProps) {
     const [isGeneratingReport, setIsGeneratingReport] = useState(false);
     const [reportGenerated, setReportGenerated] = useState(false);

     // Generate System Report Handler
     const handleGenerateReport = () => {
          setIsGeneratingReport(true);
          setReportGenerated(false);

          // Simulated Report Generation process
          setTimeout(() => {
               setIsGeneratingReport(false);
               setReportGenerated(true);

               // Reset success status after 3 seconds
               setTimeout(() => setReportGenerated(false), 3000);
          }, 1500);
     };

     const stats = [
          {
               title: 'Total Users',
               value: (metrics.totalUsers || 0).toLocaleString(),
               change: '+12.5%',
               icon: Users,
               badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
               description: 'Active platform members',
          },
          {
               title: 'Active Gear',
               value: (metrics.activeGears || 0).toLocaleString(),
               change: '+8.2%',
               icon: Package,
               badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
               description: 'Equipment listed for rent',
          },
          {
               title: 'Total Rentals',
               value: (metrics.totalRentals || 0).toLocaleString(),
               change: '+23.1%',
               icon: ShoppingBag,
               badgeColor: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
               description: 'Completed & active orders',
          },
          {
               title: 'Platform Volume',
               value: `$${(metrics.totalRevenue || 0).toLocaleString()}`,
               change: '+15.4%',
               icon: DollarSign,
               badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
               description: 'Total processed value',
          },
     ];

     return (
          <div className="space-y-8">
               {/* Top Action Bar */}
               <div className="flex justify-end">
                    <button
                         onClick={handleGenerateReport}
                         disabled={isGeneratingReport}
                         className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-70 cursor-pointer"
                    >
                         {isGeneratingReport ? (
                              <>
                                   <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                   Generating Report...
                              </>
                         ) : reportGenerated ? (
                              <>
                                   <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                                   Report Ready!
                              </>
                         ) : (
                              <>
                                   <Download className="h-4 w-4" />
                                   Generate System Report
                              </>
                         )}
                    </button>
               </div>

               {/* Metrics Cards Grid */}
               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => {
                         const Icon = stat.icon;
                         return (
                              <div
                                   key={index}
                                   className="glass-panel gear-card-glow relative overflow-hidden rounded-3xl p-6 transition-all hover:scale-[1.01]"
                              >
                                   <div className="flex items-center justify-between">
                                        <span
                                             className={`flex size-12 items-center justify-center rounded-2xl border ${stat.badgeColor}`}
                                        >
                                             <Icon className="h-6 w-6" />
                                        </span>
                                        <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                             <TrendingUp className="h-3 w-3" />
                                             {stat.change}
                                        </span>
                                   </div>

                                   <div className="mt-5">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                             {stat.title}
                                        </h3>
                                        <p className="mt-1 text-3xl font-extrabold tracking-tight text-foreground">
                                             {stat.value}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                             {stat.description}
                                        </p>
                                   </div>
                              </div>
                         );
                    })}
               </div>

               {/* Health & Live Activity Banner */}
               <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* System Health Card */}
                    <div className="glass-panel rounded-3xl p-6 lg:col-span-2">
                         <div className="flex items-center justify-between border-b border-border/60 pb-4">
                              <div className="flex items-center gap-2.5">
                                   <span className="flex size-3 rounded-full bg-emerald-500 animate-pulse" />
                                   <h2 className="text-lg font-bold text-foreground">
                                        Platform Operational Status
                                   </h2>
                              </div>
                              <span className="text-xs font-mono text-muted-foreground">
                                   v2.4.0 • Live
                              </span>
                         </div>

                         <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                              <div className="rounded-2xl border border-border/50 bg-card/40 p-4 backdrop-blur-md">
                                   <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                        <Server className="h-4 w-4 text-primary" /> API Health
                                   </div>
                                   <p className="mt-2 text-xl font-bold text-foreground">99.98%</p>
                                   <p className="text-[11px] text-primary">Optimal latency</p>
                              </div>

                              <div className="rounded-2xl border border-border/50 bg-card/40 p-4 backdrop-blur-md">
                                   <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                        <ShieldCheck className="h-4 w-4 text-emerald-500" /> Database Sync
                                   </div>
                                   <p className="mt-2 text-xl font-bold text-foreground">Healthy</p>
                                   <p className="text-[11px] text-emerald-500">No replication lag</p>
                              </div>

                              <div className="rounded-2xl border border-border/50 bg-card/40 p-4 backdrop-blur-md">
                                   <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                        <Activity className="h-4 w-4 text-secondary" /> Active Sessions
                                   </div>
                                   <p className="mt-2 text-xl font-bold text-foreground">
                                        {Math.max(12, Math.floor((metrics.totalUsers || 100) * 0.15))}
                                   </p>
                                   <p className="text-[11px] text-secondary">Real-time users</p>
                              </div>
                         </div>
                    </div>

                    {/* Dynamic Quick Management Navigation */}
                    <div className="glass-panel flex flex-col justify-between rounded-3xl p-6">
                         <div>
                              <h2 className="text-lg font-bold text-foreground">Quick Management</h2>
                              <p className="mt-1 text-xs text-muted-foreground">
                                   Direct administrative access controls
                              </p>
                         </div>

                         <div className="mt-4 space-y-2.5">
                              <Link
                                   href="/dashboard/admin/customer"
                                   className="flex w-full items-center justify-between rounded-xl border border-border bg-card/60 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-muted group"
                              >
                                   <span>View User Directory</span>
                                   <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </Link>

                              <Link
                                   href="/dashboard/admin/gear"
                                   className="flex w-full items-center justify-between rounded-xl border border-border bg-card/60 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-muted group"
                              >
                                   <span>Inspect Gear Inventory</span>
                                   <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </Link>

                              <Link
                                   href="/dashboard/admin/orders"
                                   className="flex w-full items-center justify-between rounded-xl border border-border bg-card/60 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-muted group"
                              >
                                   <span>Rental Order Log</span>
                                   <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </Link>
                         </div>
                    </div>
               </div>
          </div>
     );
}