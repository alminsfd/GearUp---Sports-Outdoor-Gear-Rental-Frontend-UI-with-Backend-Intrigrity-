'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
     error: Error & { digest?: string };
     reset: () => void;
}

export default function OrderDetailsError({ error, reset }: ErrorProps) {
     useEffect(() => {
          console.error('Order Details Error:', error);
     }, [error]);

     return (
          <div className="mx-auto max-w-4xl px-4 py-16">
               <div className="glass-panel flex flex-col items-center justify-center rounded-2xl p-8 text-center border border-border">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                         </svg>
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Order Not Found or Failed to Load</h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                         {error.message || 'We could not retrieve the details for this specific rental order.'}
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                         <button
                              onClick={() => reset()}
                              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                         >
                              Try Again
                         </button>
                         <Link
                              href="/orders"
                              className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
                         >
                              Back to Orders
                         </Link>
                    </div>
               </div>
          </div>
     );
}