import { Zap } from "lucide-react"
import Link from "next/link"

export function Logo() {
     return (
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="GearUp home">
               <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                    <Zap className="size-5 fill-current" strokeWidth={2.5} />
               </span>
               <span className="text-[17px] font-bold tracking-[-0.04em] text-foreground">
                    Gear<span className="text-primary">Up</span>
               </span>
          </Link>
     )
}