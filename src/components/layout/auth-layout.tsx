"use client";

import { usePathname } from "next/navigation";
import { MainLayout } from "./main-layout";
import { ReactNode } from "react";

const publicRoutes = ["/login", "/register"];

export function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname);
  
  // For now, we assume user is logged in if not on a public route.
  // In a real app, you'd have a proper auth check here (e.g., checking for a token).
  const isAuthenticated = !isPublicRoute;

  if (isAuthenticated) {
    return <MainLayout>{children}</MainLayout>;
  }

  return <>{children}</>;
}
