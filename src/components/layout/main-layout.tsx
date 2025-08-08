"use client";

import type { ReactNode } from "react";
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarTrigger, SidebarFooter } from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import { Leaf, LogOut } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you would clear the session/token here
    router.push('/login');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">DesaConnect</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Separator className="my-2 bg-sidebar-border" />
           <p className="p-2 text-xs text-muted-foreground">
            © 2024 DesaConnect
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 md:hidden">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">DesaConnect</h1>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
