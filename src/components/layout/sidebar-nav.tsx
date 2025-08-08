
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, FilePlus, Users } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/permohonan", label: "Manajemen Permohonan", icon: FileText },
    { href: "/admin/jenis-surat", label: "Manajemen Surat", icon: FilePlus },
    { href: "/admin/users", label: "Manajemen Pengguna", icon: Users },
]

const wargaNavItems = [
    { href: "/warga/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/warga/permohonan/baru", label: "Permohonan Baru", icon: FilePlus },
]


export function SidebarNav() {
  const pathname = usePathname();

  const navItems = pathname.startsWith('/admin') ? adminNavItems : wargaNavItems;

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton 
            asChild
            isActive={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin/dashboard' && item.href !== '/warga/dashboard')}
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
