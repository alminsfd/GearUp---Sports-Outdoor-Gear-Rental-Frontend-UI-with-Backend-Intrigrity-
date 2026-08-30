import Link from 'next/link';


export default function AuthLayout({ children }: { children: React.ReactNode }) {
     return (
          <div className="min-h-screen bg-background relative flex flex-col justify-center items-center">


               {children}
          </div>
     );
}