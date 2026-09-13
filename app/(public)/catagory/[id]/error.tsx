'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
     error: Error & { digest?: string };
     reset: () => void;
}

export default function CategoryError({ error, reset }: ErrorProps) {
     useEffect(() => {
          console.error('Category page rendering error:', error);
     }, [error]);

     return (
          <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
               {/* Error Card Container */}
               <div className="glass-panel w-full max-w-lg rounded-2xl p-8 shadow-xl backdrop-blur-md">

                    {/* Visual Icon with Theme Color */}
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive ring-8 ring-destructive/10">
                         <svg
                              className="h-8 w-8"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.75}
                         >
                              <path
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                              />
                         </svg>
                    </div>

                    {/* Text Info & Meaningful Message */}
                    <span className="text-xs font-bold uppercase tracking-widest text-destructive">
                         Oops! Connection Issue
                    </span>

                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                         {/*  eslint-disable-next-line react/no-unescaped-entities */}
                         We couldn't load this category
                    </h1>

                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                         {/*  eslint-disable-next-line react/no-unescaped-entities */}
                         Don't worry, our team is always on top of things! It might just be a temporary network glitch. Please try refreshing the page or head back home.
                    </p>

                    {/* Action Buttons using Global Theme Classes */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                         <button
                              onClick={() => reset()}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring active:scale-95 cursor-pointer"
                         >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Try Again
                         </button>

                         <Link
                              href="/"
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring active:scale-95"
                         >
                              Back to Home
                         </Link>
                    </div>

                    {/* Dev Debug Info (Only in local development) */}
                    {process.env.NODE_ENV === 'development' && error?.message && (
                         <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-left font-mono text-xs text-destructive">
                              <p className="font-bold underline mb-1">Dev Debug Info:</p>
                              <p className="break-all">{error.message}</p>
                              {error.digest && <p className="mt-1 opacity-80">Digest: {error.digest}</p>}
                         </div>
                    )}

               </div>
          </div>
     );
}