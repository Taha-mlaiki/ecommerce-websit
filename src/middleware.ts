import { auth } from "@/auth";
import {
  apiAuthPrefix,
  publicRoutes,
  privateRoutes,
  authRoutes,
  adminRoute,
} from "./lib/pages";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const url = req.nextUrl.pathname;

  if (req.nextUrl.pathname.startsWith(apiAuthPrefix)) return;
  
  // protect these pages from auth users
  if (authRoutes.includes(url) && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  // protect the "store" and "createstore" routes from non admin users
  if (
    req.nextUrl.pathname.startsWith(adminRoute[0]) &&
    //@ts-ignore
    req.auth?.user!.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/denied", req.nextUrl));
  }
  if (
    req.nextUrl.pathname.startsWith(adminRoute[1]) &&
    //@ts-ignore
    req.auth?.user!.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/denied", req.nextUrl));
  }
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
