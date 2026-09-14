export default function Loading() {
     return (
          <div className="space-y-6 p-6 animate-pulse">
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                         <div key={i} className="h-24 rounded-2xl bg-muted/60" />
                    ))}
               </div>
               <div className="h-64 rounded-3xl bg-muted/60" />
               <div className="h-48 rounded-3xl bg-muted/60" />
          </div>
     )
}