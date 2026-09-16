'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
     error: Error & { digest?: string };
     reset: () => void;
}

export default function GearManagementError({ error, reset }: ErrorProps) {
     useEffect(() => {
          console.error('Gear Management Error:', error);
     }, [error]);

     return (
          <div className="glass-panel flex min-h-105 flex-col items-center justify-center rounded-3xl border border-border/60 p-8 text-center shadow-xl">
               {/* Icon */}
               <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-500">
                    <AlertTriangle className="h-8 w-8" />
               </div>

               {/* Heading */}
               <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    Failed to load gear listings
               </h2>

               {/* Error Details */}
               <p className="mt-2 max-w-md text-xs text-muted-foreground leading-relaxed sm:text-sm">
                    {error.message || 'An unexpected error occurred while retrieving gear management data. Please try refreshing.'}
               </p>

               {error.digest && (
                    <span className="mt-2 rounded-md bg-muted/60 px-2 py-1 font-mono text-[10px] text-muted-foreground">
                         Digest ID: {error.digest}
                    </span>
               )}

               {/* Actions */}
               <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                         onClick={() => reset()}
                         className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-95 cursor-pointer"
                    >
                         <RefreshCw className="h-4 w-4" /> Try Again
                    </button>

                    <Link
                         href="/dashboard"
                         className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-4 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted active:scale-95"
                    >
                         <Home className="h-4 w-4" /> Back to Dashboard
                    </Link>
               </div>
          </div>
     );
}