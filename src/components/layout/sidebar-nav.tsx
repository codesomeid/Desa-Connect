
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, FilePlus, Users, Combine } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";

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

const superAdminNavItems = [
    { href: "/admin/dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
    { href: "/admin/permohonan", label: "Manajemen Permohonan", icon: FileText },
    { href: "/admin/jenis-surat", label: "Manajemen Surat", icon: FilePlus },
    { href: "/admin/users", label: "Manajemen Pengguna", icon: Users },
    { href: "/warga/dashboard", label: "Warga Dashboard", icon: Combine },
]

type NavItem = {
    href: string;
    label: string;
    icon: React.ElementType;
};


export function SidebarNav() {
  const pathname = usePathname();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  
  useEffect(() => {
    // This is a simulation. In a real app, user role would be determined from auth context.
    const userRole = localStorage.getItem('userRole'); // example: 'Super Admin', 'Admin', 'Warga'
    if (userRole === 'Super Admin') {
        setNavItems(superAdminNavItems);
    } else if (userRole === 'Admin') {
        setNavItems(adminNavItems);
    } else if (userRole === 'Warga') {
        setNavItems(wargaNavItems);
    } else {
        // Fallback based on URL path if role is not in localStorage
        if (pathname.startsWith('/admin')) {
          setNavItems(adminNavItems);
        } else {
          setNavItems(wargaNavItems);
        }
    }
  }, [pathname]);


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
