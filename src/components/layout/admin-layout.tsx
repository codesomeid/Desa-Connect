
"use client";

import { usePathname } from "next/navigation";
import { MainLayout } from "./main-layout";
import { ReactNode } from "react";

// For this simplified version, we have role-based pages.
// All pages under /admin or /warga are considered private and require the layout.
// Public pages like login, register, and the root role selection do not get the main layout.
const publicRoutes = ["/login", "/register", "/"];

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // A simple check to see if the current path is one of the public-facing pages.
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/login');

  // If we are on a "private" route (anything under /admin or /warga), show the main layout.
  if (!isPublicRoute) {
    return <MainLayout>{children}</MainLayout>;
  }

  // Otherwise, just render the children (which will be the login/register/role selection pages).
  return <>{children}</>;
}
