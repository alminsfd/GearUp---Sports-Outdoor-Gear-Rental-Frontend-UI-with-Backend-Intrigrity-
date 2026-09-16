import { Loader2, Sparkles, Cpu } from 'lucide-react';

export default function Loading() {
     return (
          <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-6">
               <div className="glass-panel relative flex flex-col items-center justify-center rounded-3xl p-10 shadow-2xl max-w-sm w-full text-center border border-border/60">

                    {/* Glow & Spinner Effect */}
                    <div className="relative flex items-center justify-center mb-6">
                         <div className="absolute h-16 w-16 rounded-full bg-primary/20 animate-ping opacity-75" />
                         <div className="relative h-14 w-14 rounded-2xl bg-muted/80 border border-primary/30 flex items-center justify-center shadow-lg backdrop-blur-md">
                              <Loader2 className="h-7 w-7 animate-spin text-primary" />
                         </div>
                    </div>

                    {/* Loading Text */}
                    <div className="space-y-2">
                         <h3 className="text-lg font-bold text-foreground flex items-center justify-center gap-2">
                              <span>Loading Content</span>
                              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                         </h3>
                         <p className="text-xs text-muted-foreground">
                              Fetching the latest equipment & orders data...
                         </p>
                    </div>

                    {/* Skeleton Progress Indicator */}
                    <div className="mt-6 w-full bg-muted/50 rounded-full h-1.5 overflow-hidden">
                         <div className=" bg-linear-to-r from-primary to-secondary h-full w-2/3 animate-pulse rounded-full" />
                    </div>

                    {/* Footer Badge */}
                    <div className="mt-6 flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/80">
                         <Cpu className="h-3 w-3 text-primary" />
                         <span>GEARUP ENGINE</span>
                    </div>
               </div>
          </div>
     );
}