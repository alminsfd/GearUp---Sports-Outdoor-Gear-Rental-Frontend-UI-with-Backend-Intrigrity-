import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
     title: "GearUp - Login",
};

export default function AuthLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     return (
          <>
               {children}
               <Toaster position="top-right" richColors />
          </>
     );
}