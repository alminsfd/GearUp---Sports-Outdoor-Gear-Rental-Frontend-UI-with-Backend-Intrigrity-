'use client';

import { useState } from 'react';
import CategoryCard from './category-card';
import { ICategoryListItem } from '@/types/catagory';

interface CategoryListClientProps {
     categories: ICategoryListItem[];
}

export default function CategoryListClient({ categories }: CategoryListClientProps) {
     const [searchQuery, setSearchQuery] = useState('');

     const filteredCategories = categories.filter((cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchQuery.toLowerCase())
     );

     return (
          <div className="space-y-8">
               {/* Action Bar: Search Input */}
               <div className="relative max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                         <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                         </svg>
                    </div>
                    <input
                         type="text"
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         placeholder="Search categories..."
                         className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 shadow-sm"
                    />
               </div>

               {/* Grid List */}
               {filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                         {filteredCategories.map((category) => (
                              <CategoryCard key={category.id} category={category} />
                         ))}
                    </div>
               ) : (
                    <div className="rounded-2xl border border-dashed border-border bg-card py-12 text-center">
                         {/*  eslint-disable-next-line react/no-unescaped-entities */}
                         <p className="text-base font-medium text-muted-foreground">No categories found matching &quot;{searchQuery}&quot;</p>
                         <button
                              onClick={() => setSearchQuery('')}
                              className="mt-3 text-sm font-semibold text-primary hover:underline"
                         >
                              Clear Search Filter
                         </button>
                    </div>
               )}
          </div>
     );
}
