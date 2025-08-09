
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, FilePlus, Users, Combine } from "lucide-react";
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

const superAdminNavItems = [
    { href: "/admin/dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
    { href: "/admin/permohonan", label: "Manajemen Permohonan", icon: FileText },
    { href: "/admin/jenis-surat", label: "Manajemen Surat", icon: FilePlus },
    { href: "/admin/users", label: "Manajemen Pengguna", icon: Users },
    { href: "/warga/dashboard", label: "Warga Dashboard", icon: Combine },
]


export function SidebarNav() {
  const pathname = usePathname();

  // In a real app, you would get the user's role from a session or context.
  // Here, we simulate it based on a hardcoded path segment for demo purposes.
  let navItems = [];
  if (pathname.startsWith('/admin/super')) {
      navItems = superAdminNavItems;
  } else if (pathname.startsWith('/admin')) {
      navItems = adminNavItems;
  } else {
      navItems = wargaNavItems;
  }
  
  // A special case for the super admin to see all modules under a unified path
  if (pathname.startsWith('/admin/super')) {
    navItems = superAdminNavItems.map(item => ({...item, href: item.href.replace('/admin/', '/admin/super/')}));
  }

  const getNavItems = () => {
    // This is a simulation. In a real app, user role would be determined from auth context.
    const userRole = localStorage.getItem('userRole'); // example: 'Super Admin', 'Admin', 'Warga'
    if (userRole === 'Super Admin') return superAdminNavItems;
    if (userRole === 'Admin') return adminNavItems;
    if (userRole === 'Warga') return wargaNavItems;
    
    // Fallback based on URL path if role is not in localStorage
    if (pathname.startsWith('/admin')) {
      return adminNavItems;
    }
    return wargaNavItems;
  }

  navItems = getNavItems();


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
