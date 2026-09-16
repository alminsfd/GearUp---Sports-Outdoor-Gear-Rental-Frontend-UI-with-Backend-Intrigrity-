'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
     error: Error & { digest?: string };
     reset: () => void;
}

export default function UserManagementError({ error, reset }: ErrorProps) {
     useEffect(() => {
          console.error('User Management Error:', error);
     }, [error]);

     return (
          <div className="glass-panel flex min-h-112.5 flex-col items-center justify-center rounded-3xl border border-border/60 p-8 text-center shadow-xl">
               <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-500 mb-4">
                    <AlertTriangle className="h-8 w-8" />
               </div>

               <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    Failed to load users
               </h2>

               <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    {error.message || 'An unexpected error occurred while fetching user data. Please try again.'}
               </p>

               {error.digest && (
                    <span className="mt-2 rounded-md bg-muted/50 px-2 py-1 font-mono text-[10px] text-muted-foreground">
                         Digest ID: {error.digest}
                    </span>
               )}

               <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                         onClick={() => reset()}
                         className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
                    >
                         <RefreshCw className="h-4 w-4" /> Try Again
                    </button>

                    <Link
                         href="/dashboard"
                         className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-4 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted active:scale-95"
                    >
                         <Home className="h-4 w-4" /> Go to Dashboard
                    </Link>
               </div>
          </div>
     );
}