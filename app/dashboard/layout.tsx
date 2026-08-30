import React from "react";

const DashboardLayout = async ({
     children,
}: {
     children: React.ReactNode;
}) => {
     // const user = await getMe();

     return (
          <div className="min-h-screen flex flex-col">
               {/* 🔹 হেডার বা সাধারণ ড্যাশবোর্ড বার */}
               <header className="bg-slate-900 text-white p-4">
                    <h1 className="text-xl font-bold">Dashboard</h1>
               </header>

               <div className="flex flex-1">
                    {/* 🔹 সাইডবার (যদি থাকে) */}
                    <aside className="w-64 bg-slate-100 p-4 border-r border-slate-200 hidden md:block">
                         <p className="font-semibold text-slate-700">Navigation</p>
                    </aside>

                    {/* 🔹 চাইল্ড পেজগুলো (যেমন: /dashboard/admin) এখানে রেন্ডার হবে */}
                    <main className="flex-1 p-6">
                         {children}
                    </main>
               </div>
          </div>
     );
};

export default DashboardLayout;