"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Megaphone, Users, FileText, ListChecks, UserCircle, LayoutDashboard, UserPlus, FileCheck, FilePlus2 } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const navItems = [
  { href: "/", label: "Pengumuman", icon: Megaphone },
  { href: "/permohonan", label: "Permohonan Surat", icon: FileText },
  { href: "/lacak", label: "Lacak Permohonan", icon: ListChecks },
  { href: "/kontak", label: "Kontak Penting", icon: Users },
  { href: "/profil", label: "Profil Saya", icon: UserCircle },
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/permohonan", label: "Manajemen Permohonan", icon: FileCheck },
  { href: "/admin/jenis-surat", label: "Manajemen Surat", icon: FilePlus2 },
  { href: "/admin/users", label: "Manajemen Pengguna", icon: UserPlus },
];


export function SidebarNav() {
  const pathname = usePathname();

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
