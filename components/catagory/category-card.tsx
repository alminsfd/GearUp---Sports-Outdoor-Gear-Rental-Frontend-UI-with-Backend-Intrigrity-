import { ICategoryListItem } from '@/types/catagory';
import Link from 'next/link';

interface CategoryCardProps {
     category: ICategoryListItem;
}

const getCategoryIcon = (name: string) => {
     const normalizedName = name.toLowerCase().trim();

     switch (normalizedName) {
          case 'camping':
               return (
                    <svg className="h-7 w-7 text-primary transition-colors group-hover:text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3l9 16.5M19.5 3l-9 16.5M12 14.25l-3 5.25h6l-3-5.25z" />
                    </svg>
               );
          case 'hiking':
               return (
                    <svg className="h-7 w-7 text-primary transition-colors group-hover:text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 7.5l3 4.5 4.5-6.75L21.75 18H2.25z" />
                    </svg>
               );
          case 'cameras':
               return (
                    <svg className="h-7 w-7 text-primary transition-colors group-hover:text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316A2.192 2.192 0 0014.49 3.75h-4.98a2.192 2.192 0 00-1.862 1.056l-.821 1.316z" />
                         <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
               );
          case 'cycling':
               return (
                    <svg className="h-7 w-7 text-primary transition-colors group-hover:text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                         <circle cx="5.5" cy="17.5" r="3.5" strokeLinecap="round" strokeLinejoin="round" />
                         <circle cx="18.5" cy="17.5" r="3.5" strokeLinecap="round" strokeLinejoin="round" />
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5L8.5 11l3-5.5h4.5M12 11.5h6.5l-3 6" />
                    </svg>
               );
          case 'water-sports':
               return (
                    <svg className="h-7 w-7 text-primary transition-colors group-hover:text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c2.25 0 3.75 1.5 6 1.5s3.75-1.5 6-1.5 3.75 1.5 6 1.5M2.25 16.5c2.25 0 3.75 1.5 6 1.5s3.75-1.5 6-1.5 3.75 1.5 6 1.5M2.25 7.5c2.25 0 3.75 1.5 6 1.5s3.75-1.5 6-1.5 3.75 1.5 6 1.5" />
                    </svg>
               );
          case 'gyms-sports':
          default:
               return (
                    <svg className="h-7 w-7 text-primary transition-colors group-hover:text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l-2.25 2.25m0 4.5l2.25 2.25m10.5-9l2.25 2.25m0 4.5l-2.25 2.25M3 10.5h18M3 13.5h18M7.5 4.5v15M16.5 4.5v15" />
                    </svg>
               );
     }
};

export default function CategoryCard({ category }: CategoryCardProps) {
     const gearCount = category._count?.gears ?? 0;

     return (
          <Link
               href={`/catagory/${category.id}`}
               className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
          >
               <div>
                    {/* Top Header: Icon & Gear Count Badge */}
                    <div className="flex items-center justify-between pb-5">
                         <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent ring-1 ring-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/80">
                              {getCategoryIcon(category.name)}
                         </div>
                         <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {gearCount} {gearCount === 1 ? 'Gear' : 'Gears'}
                         </span>
                    </div>

                    {/* Category Info */}
                    <h3 className="text-xl font-bold capitalize text-foreground transition-colors group-hover:text-primary">
                         {category.name.replace('-', ' ')}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                         {category.description}
                    </p>
               </div>

               {/* Action Footer */}
               <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary transition-all group-hover:translate-x-1">
                    <span>Browse Products</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
               </div>
          </Link>
     );
}
