'use client';

import { useEffect } from 'react';

interface ErrorProps {
     error: Error & { digest?: string };
     reset: () => void;
}

export default function OrdersError({ error, reset }: ErrorProps) {
     useEffect(() => {
          console.error('Orders Page Error:', error);
     }, [error]);

     return (
          <div className="mx-auto max-w-7xl px-4 py-16">
               <div className="glass-panel flex flex-col items-center justify-center rounded-2xl p-8 text-center border border-border">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                         </svg>
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Failed to Load Orders</h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                         {error.message || 'An unexpected error occurred while fetching your rental orders.'}
                    </p>
                    <button
                         onClick={() => reset()}
                         className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                         Try Again
                    </button>
               </div>
          </div>
     );
}