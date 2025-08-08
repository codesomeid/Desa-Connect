
"use client";

import { usePathname } from "next/navigation";
import { MainLayout } from "./main-layout";
import { ReactNode } from "react";

// For this simplified version, we only have the login and dashboard.
// All dashboard routes are considered private.
const publicRoutes = ["/login"];

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // A simple check to see if the current path is the login page.
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If we are on a "private" route (anything under /admin), show the main layout.
  if (!isPublicRoute) {
    return <MainLayout>{children}</MainLayout>;
  }

  // Otherwise, just render the children (which will be the login page).
  return <>{children}</>;
}
