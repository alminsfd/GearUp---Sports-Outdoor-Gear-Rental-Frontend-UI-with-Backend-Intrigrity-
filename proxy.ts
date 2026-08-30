import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { jwtUtils } from "./lib/auth/jwt";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/register", "/login"];
const PUBLIC_ROUTES = ["/news"]; // root path (/) 

export async function proxy(request: NextRequest) {
     const pathname = request.nextUrl.pathname;
     const cookieStore = await cookies();

     let accessToken = request.cookies.get("accessToken")?.value;
     const refreshToken = request.cookies.get("refreshToken")?.value;

     let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
     const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

     // If the Access token is expired but the Refresh token is valid, a new Access token is created.
     if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
          const result = await getNewAccessToken();

          if (result.success) {
               const newAccessToken = result.data.accessToken;

               cookieStore.set("accessToken", newAccessToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24,
                    sameSite: "lax",
               });

               accessToken = newAccessToken;
               decodedAccessToken = jwtUtils.verifyToken(accessToken as string, process.env.JWT_ACCESS_SECRET as string);
          }
     }

     //  Only clean old invalid cookies if none of the tokens are valid.
     if (!decodedAccessToken?.success && accessToken) {
          cookieStore.delete("accessToken");
          accessToken = undefined; // After deleting the token, the variable is also cleared.
     }

     let userRole: string | null = null;
     if (decodedAccessToken?.success && decodedAccessToken.data) {
          userRole = (decodedAccessToken.data as JwtPayload).role;
     }

     //  Redirect to Dashboard when Authenticated User goes to Login/Register page
     if (accessToken && AUTH_ROUTES.includes(pathname)) {
          if (userRole === "USER") return NextResponse.redirect(new URL('/dashboard', request.url));
          if (userRole === "ADMIN") return NextResponse.redirect(new URL('/dashboard/provider', request.url));
          if (userRole === "PROVIDER") return NextResponse.redirect(new URL('/dashboard/customer', request.url));
          return NextResponse.redirect(new URL('/', request.url));
     }

     //  Public Root Check
     const isPublicRoute =
          pathname === "/" ||
          PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

     const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

     //  Protected route protection
     if (!accessToken && !isPublicRoute && !isAuthRoute) {
          return NextResponse.redirect(new URL('/login', request.url));
     }

     // Role Based Access Control (RBAC)
     if (pathname.startsWith("/dashboard") && userRole !== "USER") {
          return NextResponse.redirect(new URL('/not-found', request.url));
     } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
          return NextResponse.redirect(new URL('/not-found', request.url));
     } else if (pathname.startsWith("/author-dashboard") && userRole !== "AUTHOR") {
          return NextResponse.redirect(new URL('/not-found', request.url));
     }

     return NextResponse.next();
}

export const config = {
     matcher: [
          '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
     ],
};