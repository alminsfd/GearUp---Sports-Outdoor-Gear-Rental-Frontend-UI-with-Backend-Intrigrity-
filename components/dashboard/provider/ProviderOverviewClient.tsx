'use client'

import { Package, Clock, AlertCircle } from 'lucide-react'

export default function ProviderOverviewClient({ stats }: { stats: any }) {
     return (
          <div className="space-y-6">
               <h2 className="text-xl font-bold">Provider Overview</h2>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="glass-panel rounded-2xl p-5 border flex items-center gap-4">
                         <div className="p-3 bg-primary/10 text-primary rounded-xl">
                              <Package className="size-6" />
                         </div>
                         <div>
                              <p className="text-xs text-muted-foreground uppercase font-bold">Total Gear Listed</p>
                              <h3 className="text-2xl font-bold">{stats.totalGear}</h3>
                         </div>
                    </div>

                    <div className="glass-panel rounded-2xl p-5 border flex items-center gap-4">
                         <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                              <Clock className="size-6" />
                         </div>
                         <div>
                              <p className="text-xs text-muted-foreground uppercase font-bold">Active Rentals</p>
                              <h3 className="text-2xl font-bold">{stats.activeRentals}</h3>
                         </div>
                    </div>

                    <div className="glass-panel rounded-2xl p-5 border flex items-center gap-4">
                         <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                              <AlertCircle className="size-6" />
                         </div>
                         <div>
                              <p className="text-xs text-muted-foreground uppercase font-bold">Pending Orders</p>
                              <h3 className="text-2xl font-bold">{stats.pendingOrders}</h3>
                         </div>
                    </div>
               </div>
          </div>
     )
}