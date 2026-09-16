'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function Error({
     error,
     reset,
}: {
     error: Error & { digest?: string };
     reset: () => void;
}) {
     useEffect(() => {
          console.error('Unhandled Application Error:', error);
     }, [error]);

     return (
          <div className="min-h-[75vh] w-full flex items-center justify-center p-4">
               <div className="glass-panel relative max-w-md w-full rounded-3xl p-8 shadow-2xl border border-destructive/20 text-center overflow-hidden">

                    {/* Top Decorative Background Glow */}
                    <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-destructive/10 blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

                    {/* Error Icon */}
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive shadow-inner">
                         <AlertTriangle className="h-8 w-8" />
                    </div>

                    {/* Error Message */}
                    <div className="space-y-2 mb-6">
                         <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-[11px] font-bold text-destructive border border-destructive/20">
                              <ShieldAlert className="h-3 w-3" /> System Error
                         </span>
                         <h2 className="text-2xl font-black text-foreground">Something went wrong!</h2>
                         <p className="text-xs text-muted-foreground leading-relaxed">
                              {error.message || 'An unexpected error occurred while processing your request. Please try again or return home.'}
                         </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                         <button
                              onClick={() => reset()}
                              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95 cursor-pointer"
                         >
                              <RotateCcw className="h-4 w-4" /> Try Again
                         </button>

                         <Link
                              href="/dashboard"
                              className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-5 py-3 text-xs font-bold text-foreground transition-all hover:bg-muted active:scale-95"
                         >
                              <Home className="h-4 w-4 text-muted-foreground" /> Dashboard
                         </Link>
                    </div>

                    {/* Digest Info */}
                    {error.digest && (
                         <p className="mt-6 text-[10px] font-mono text-muted-foreground/60">
                              Error ID: {error.digest}
                         </p>
                    )}
               </div>
          </div>
     );
}