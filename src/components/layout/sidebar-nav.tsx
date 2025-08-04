"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Megaphone, Users, FileText, ListChecks, UserCircle, LayoutDashboard, UserPlus, FileCheck, FilePlus2 } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";

const userNavItems = [
  { href: "/", label: "Pengumuman", icon: Megaphone },
  { href: "/permohonan", label: "Permohonan Surat", icon: FileText },
  { href: "/lacak", label: "Lacak Permohonan", icon: ListChecks },
  { href: "/kontak", label: "Kontak Penting", icon: Users },
  { href: "/profil", label: "Profil Saya", icon: UserCircle },
];

const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/permohonan", label: "Manajemen Permohonan", icon: FileCheck },
    { href: "/admin/jenis-surat", label: "Manajemen Surat", icon: FilePlus2 },
    { href: "/admin/users", label: "Manajemen Pengguna", icon: UserPlus },
]


export function SidebarNav() {
  const pathname = usePathname();
  
  const isAdminRoute = pathname.startsWith('/admin');

  const navItems = isAdminRoute ? adminNavItems : userNavItems;
  const otherNavItems = isAdminRoute ? userNavItems : adminNavItems;


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
      <Separator className="my-2" />
       {otherNavItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton 
            asChild
            variant="ghost"
            className="font-medium text-muted-foreground hover:text-foreground"
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
