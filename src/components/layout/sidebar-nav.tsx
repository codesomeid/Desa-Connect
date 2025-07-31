"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Megaphone, Users, FileText, ListChecks, UserCircle, LayoutDashboard, UserPlus, FileCheck } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

const citizenNavItems = [
  { href: "/", label: "Pengumuman", icon: Megaphone },
  { href: "/permohonan", label: "Permohonan Surat", icon: FileText },
  { href: "/lacak", label: "Lacak Permohonan", icon: ListChecks },
  { href: "/kontak", label: "Kontak Penting", icon: Users },
  { href: "/profil", label: "Profil Saya", icon: UserCircle },
];

const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/permohonan", label: "Manajemen Permohonan", icon: FileCheck },
    { href: "/admin/users", label: "Manajemen Pengguna", icon: UserPlus },
];


export function SidebarNav() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false)
  
  // This is a simple role detection based on the URL.
  // In a real app, this would come from a proper auth context.
  const isAdmin = pathname.startsWith('/admin');
  
  // To avoid hydration mismatch, we only render based on path on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Admin sees their own nav items plus all citizen nav items
  const navItems = isClient && isAdmin ? [...adminNavItems, ...citizenNavItems] : citizenNavItems;

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton 
            asChild
            isActive={pathname === item.href}
            className="font-medium"
            tooltip={{ children: item.label }}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
