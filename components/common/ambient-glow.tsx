export function AmbientGlow() {
     return (
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none" aria-hidden="true">
               {/* 1. Top sweeping ambient emerald radiant wash */}
               <div className="absolute inset-x-0 top-0 h-120 bg-linear-to-b from-emerald-500/15 via-emerald-400/5 to-transparent blur-3xl" />

               {/* 2. Top-left prominent emerald orb */}
               <div className="absolute -top-20 -left-24 size-150 rounded-full bg-emerald-400/25 blur-[100px] mix-blend-multiply dark:bg-emerald-500/20 dark:mix-blend-screen" />

               {/* 3. Top-right mint/teal accent orb */}
               <div className="absolute top-10 -right-28 size-162.5 rounded-full bg-teal-400/20 blur-[110px] mix-blend-multiply dark:bg-teal-500/20 dark:mix-blend-screen" />

               {/* 4. Mid-page ambient glow orb */}
               <div className="absolute top-[38%] left-[15%] size-137.5 rounded-full bg-emerald-500/15 blur-[120px] mix-blend-multiply dark:bg-emerald-600/15 dark:mix-blend-screen" />

               {/* 5. Bottom-right subtle counter-glow */}
               <div className="absolute -bottom-24 -right-12 size-130 rounded-full bg-emerald-400/20 blur-[110px] mix-blend-multiply dark:bg-emerald-500/15 dark:mix-blend-screen" />

               {/* 6. Subtle tech dot matrix grid texture */}
               <div className="absolute inset-0 bg-[radial-gradient(#059669_1.5px,transparent_1.5px)] bg-size-[28px_28px] opacity-[0.07] dark:opacity-[0.10]" />
          </div>
     )
}
