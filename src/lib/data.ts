
import type { Status } from "@/app/lacak/status-timeline";
import { Building2, FileText, Shield, Home, Briefcase, Users, HeartHandshake, UserCheck, UserX, Plane, GraduationCap, Building, HelpCircle, FileQuestion, BookUser, FileHeart, FileSearch, LandPlot, Car } from "lucide-react";
import React from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  nik: string;
  phone: string;
  avatar: string;
  role: "Warga" | "Aparatur Desa";
}

export interface LetterType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  templateUrl?: string; // Optional: if you have templates
  href: string;
}

export interface Application {
  id: string;
  applicantId: string; // Foreign key to User
  letterTypeId: string; // Foreign key to LetterType
  submissionDate: string;
  status: Status;
  purpose: string;
  data?: Record<string, any>; // For extra form data
  history: { status: Status; date: string; actor: string }[];
}

// --- DATABASE TABLES ---

export const users: User[] = [
  {
    id: "user-001",
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    nik: "3501234567890001",
    phone: "0812-3456-7890",
    avatar: "https://placehold.co/100x100.png",
    role: "Warga",
  },
  {
    id: "user-002",
    name: "Siti Aminah",
    email: "siti.aminah@email.com",
    nik: "3501234567890002",
    phone: "0812-3456-7891",
    avatar: "https://placehold.co/100x100.png",
    role: "Warga",
  },
  {
    id: "user-003",
    name: "Ahmad Dahlan",
    email: "ahmad.dahlan@email.com",
    nik: "3501234567890003",
    phone: "0812-3456-7892",
    avatar: "https://placehold.co/100x100.png",
    role: "Warga",
  },
  {
    id: "user-004",
    name: "Rina Fitriani",
    email: "rina.fitriani@email.com",
    nik: "3501234567890004",
    phone: "0812-3456-7893",
    avatar: "https://placehold.co/100x100.png",
    role: "Warga",
  },
  {
    id: "user-005",
    name: "Joko Susilo",
    email: "joko.susilo@email.com",
    nik: "3501234567890005",
    phone: "0812-3456-7894",
    avatar: "https://placehold.co/100x100.png",
    role: "Warga",
  },
    {
    id: "user-006",
    name: "Dewi Lestari",
    email: "dewi.lestari@email.com",
    nik: "3501234567890006",
    phone: "0812-3456-7895",
    avatar: "https://placehold.co/100x100.png",
    role: "Warga",
  },
   {
    id: "user-007",
    name: "Bambang Pamungkas",
    email: "bambang.p@email.com",
    nik: "3501234567890007",
    phone: "0812-3456-7896",
    avatar: "https://placehold.co/100x100.png",
    role: "Warga",
  },
  {
    id: "admin-001",
    name: "Admin Desa",
    email: "admin@desa.com",
    nik: "0000000000000000",
    phone: "0812-0000-0000",
    avatar: "https://placehold.co/100x100.png",
    role: "Aparatur Desa",
  },
];

const iconProps = { className: "h-6 w-6 text-accent" };

export const letterTypes: LetterType[] = [
    {
        id: "lt-001",
        name: "Surat Pengantar Keterangan Catatan Kepolisian",
        description: "Untuk pembuatan SKCK.",
        icon: React.createElement(Shield, iconProps),
        href: "/permohonan/baru?jenis=skck"
    },
    {
        id: "lt-002",
        name: "Surat Keterangan Usaha (SKU)",
        description: "Untuk keperluan membuka atau menjalankan usaha.",
        icon: React.createElement(Building2, iconProps),
        href: "/permohonan/baru?jenis=usaha"
    },
    {
        id: "lt-003",
        name: "Surat Keterangan Domisili Perusahaan/Yayasan",
        description: "Menyatakan domisili untuk badan usaha atau organisasi.",
        icon: React.createElement(Building, iconProps),
        href: "/permohonan/baru?jenis=domisili-perusahaan"
    },
    {
        id: "lt-004",
        name: "Surat Keterangan Laporan Kehilangan",
        description: "Untuk melaporkan kehilangan dokumen atau barang.",
        icon: React.createElement(FileSearch, iconProps),
        href: "/permohonan/baru?jenis=kehilangan"
    },
    {
        id: "lt-005",
        name: "Surat Keterangan Kepemilikan Rumah",
        description: "Menyatakan bukti kepemilikan properti rumah.",
        icon: React.createElement(Home, iconProps),
        href: "/permohonan/baru?jenis=kepemilikan-rumah"
    },
    {
        id: "lt-006",
        name: "Surat Keterangan Laporan Kematian (Ahli Waris)",
        description: "Diperlukan untuk urusan pembagian waris.",
        icon: React.createElement(Users, iconProps),
        href: "/permohonan/baru?jenis=kematian-waris"
    },
    {
        id: "lt-007",
        name: "Surat Keterangan Kematian (Akta Kematian)",
        description: "Sebagai pengantar untuk pembuatan akta kematian.",
        icon: React.createElement(FileText, iconProps),
        href: "/permohonan/baru?jenis=kematian-akta"
    },
    {
        id: "lt-008",
        name: "Surat Keterangan Status Perkawinan",
        description: "Menyatakan status perkawinan seseorang.",
        icon: React.createElement(FileHeart, iconProps),
        href: "/permohonan/baru?jenis=status-perkawinan"
    },
    {
        id: "lt-009",
        name: "Surat Keterangan Beda Data Kependudukan",
        description: "Untuk memperbaiki perbedaan data pada dokumen.",
        icon: React.createElement(UserCheck, iconProps),
        href: "/permohonan/baru?jenis=beda-data"
    },
    {
        id: "lt-010",
        name: "Surat Keterangan Domisili Calon Jemaah Haji",
        description: "Persyaratan untuk pendaftaran ibadah haji.",
        icon: React.createElement(Plane, iconProps),
        href: "/permohonan/baru?jenis=domisili-haji"
    },
    {
        id: "lt-011",
        name: "Surat Keterangan Pindah Domisili",
        description: "Pengantar untuk mengurus pindah alamat tinggal.",
        icon: React.createElement(Car, iconProps),
        href: "/permohonan/baru?jenis=pindah-domisili"
    },
    {
        id: "lt-012",
        name: "Surat Keterangan Kepemilikan Tanah",
        description: "Menyatakan bukti kepemilikan properti tanah.",
        icon: React.createElement(LandPlot, iconProps),
        href: "/permohonan/baru?jenis=kepemilikan-tanah"
    },
    {
        id: "lt-013",
        name: "Surat Keterangan Jalan",
        description: "Izin untuk melakukan perjalanan ke luar daerah.",
        icon: React.createElement(Briefcase, iconProps),
        href: "/permohonan/baru?jenis=jalan"
    },
    {
        id: "lt-014",
        name: "Surat Keterangan JPK-KS",
        description: "Untuk Jaminan Pemeliharaan Kesehatan Kota Sukabumi.",
        icon: React.createElement(HeartHandshake, iconProps),
        href: "/permohonan/baru?jenis=jpk-ks"
    },
    {
        id: "lt-015",
        name: "Surat Keterangan Tidak Mampu (SKTM)",
        description: "Untuk mendapatkan bantuan atau keringanan biaya.",
        icon: React.createElement(UserX, iconProps),
        href: "/permohonan/baru?jenis=tidak-mampu"
    },
    {
        id: "lt-016",
        name: "Surat Keterangan Untuk Nikah",
        description: "Pengantar untuk mengurus pernikahan di KUA.",
        icon: React.createElement(FileHeart, iconProps),
        href: "/permohonan/baru?jenis=untuk-nikah"
    },
    {
        id: "lt-017",
        name: "Surat Keterangan Bekerja di Luar Negeri",
        description: "Diperlukan untuk TKI/TKW.",
        icon: React.createElement(Plane, iconProps),
        href: "/permohonan/baru?jenis=kerja-luar-negeri"
    },
    {
        id: "lt-018",
        name: "Surat Keterangan Orang Tua",
        description: "Menyatakan hubungan antara anak dan orang tua.",
        icon: React.createElement(Users, iconProps),
        href: "/permohonan/baru?jenis=orang-tua"
    },
    {
        id: "lt-019",
        name: "Surat Keterangan Ahli Waris",
        description: "Menetapkan siapa saja yang berhak menjadi ahli waris.",
        icon: React.createElement(BookUser, iconProps),
        href: "/permohonan/baru?jenis=ahli-waris"
    },
    {
        id: "lt-020",
        name: "Surat Lainnya",
        description: "Untuk jenis permohonan surat lainnya.",
        icon: React.createElement(FileQuestion, iconProps),
        href: "/permohonan/baru?jenis=lainnya"
    },
];


export const applications: Application[] = [
  {
    id: "DS-CNCT-1689340",
    applicantId: "user-002",
    letterTypeId: "lt-002",
    submissionDate: "2024-07-20",
    status: "Baru Masuk",
    purpose: "Untuk mengajukan pinjaman KUR di Bank BRI sebagai modal tambahan untuk usaha warung kelontong yang sudah berjalan selama 2 tahun.",
    history: [{ status: "Baru Masuk", date: "2024-07-20", actor: "Siti Aminah" }]
  },
  {
    id: "DS-CNCT-1689339",
    applicantId: "user-003",
    letterTypeId: "lt-015",
    submissionDate: "2024-07-20",
    status: "Diproses Staf",
    purpose: "Untuk mendapatkan beasiswa pendidikan bagi anak saya.",
    history: [
        { status: "Baru Masuk", date: "2024-07-20", actor: "Ahmad Dahlan" },
        { status: "Diproses Staf", date: "2024-07-21", actor: "Admin Desa" },
    ]
  },
  {
    id: "DS-CNCT-1689338",
    applicantId: "user-004",
    letterTypeId: "lt-001",
    submissionDate: "2024-07-19",
    status: "Verifikasi Kasi",
    purpose: "Sebagai syarat untuk melamar pekerjaan di instansi pemerintah.",
     history: [
        { status: "Baru Masuk", date: "2024-07-19", actor: "Rina Fitriani" },
        { status: "Diproses Staf", date: "2024-07-20", actor: "Admin Desa" },
        { status: "Verifikasi Kasi", date: "2024-07-21", actor: "Admin Desa" },
    ]
  },
  {
    id: "DS-CNCT-1689337",
    applicantId: "user-005",
    letterTypeId: "lt-007",
    submissionDate: "2024-07-18",
    status: "Persetujuan Sekdes",
    purpose: "Untuk mengurus administrasi di kantor catatan sipil.",
    history: [
        { status: "Baru Masuk", date: "2024-07-18", actor: "Joko Susilo" },
        { status: "Diproses Staf", date: "2024-07-19", actor: "Admin Desa" },
        { status: "Verifikasi Kasi", date: "2024-07-20", actor: "Admin Desa" },
        { status: "Persetujuan Sekdes", date: "2024-07-21", actor: "Admin Desa" },
    ]
  },
  {
    id: "DS-CNCT-1689336",
    applicantId: "user-006",
    letterTypeId: "lt-011",
    submissionDate: "2024-07-18",
    status: "Selesai & Dapat Diambil",
    purpose: "Untuk memperbarui data kependudukan di alamat yang baru.",
     history: [
        { status: "Baru Masuk", date: "2024-07-18", actor: "Dewi Lestari" },
        { status: "Diproses Staf", date: "2024-07-19", actor: "Admin Desa" },
        { status: "Verifikasi Kasi", date: "2024-07-19", actor: "Admin Desa" },
        { status: "Persetujuan Sekdes", date: "2024-07-20", actor: "Admin Desa" },
        { status: "Menunggu TTE Kades", date: "2024-07-20", actor: "Admin Desa" },
        { status: "Selesai & Dapat Diambil", date: "2024-07-21", actor: "Admin Desa" },
    ]
  },
   {
    id: "DS-CNCT-1689335",
    applicantId: "user-007",
    letterTypeId: "lt-002",
    submissionDate: "2024-07-17",
    status: "Menunggu TTE Kades",
    purpose: "Pengajuan modal untuk perluasan lahan pertanian.",
     history: [
        { status: "Baru Masuk", date: "2024-07-17", actor: "Bambang Pamungkas" },
        { status: "Diproses Staf", date: "2024-07-18", actor: "Admin Desa" },
        { status: "Verifikasi Kasi", date: "2024-07-18", actor: "Admin Desa" },
        { status: "Persetujuan Sekdes", date: "2024-07-19", actor: "Admin Desa" },
        { status: "Menunggu TTE Kades", date: "2024-07-20", actor: "Admin Desa" },
    ]
  },
];
