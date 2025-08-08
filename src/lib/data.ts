
import React from 'react';
import { FileText, FileUp, Home, Shield } from 'lucide-react';

// Interfaces
export interface User {
  id: string;
  name: string;
  nik: string;
  email: string;
  phoneNumber: string;
  role: 'warga' | 'admin';
}

export interface LetterType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  templateUrl?: string; // Optional: path to the PDF template
}

export type ApplicationStatus = 'Pending' | 'Diproses' | 'Siap Diambil' | 'Selesai' | 'Ditolak';

export interface Application {
  id: string;
  userId: string;
  letterTypeId: string;
  date: string;
  status: ApplicationStatus;
  reason: string;
  notes?: string;
  history: {
    status: ApplicationStatus;
    date: string;
    notes?: string;
  }[];
}


// --- DATABASE TABLES ---

// Users Table
export const users: User[] = [
  { id: 'user-1', name: 'Budi Santoso', nik: '3201012345670001', email: 'budi.s@example.com', phoneNumber: '081234567890', role: 'warga' },
  { id: 'user-2', name: 'Citra Lestari', nik: '3201019876540002', email: 'citra.l@example.com', phoneNumber: '082345678901', role: 'warga' },
  { id: 'user-3', name: 'Agus Wijaya', nik: '3201015555550003', email: 'agus.w@example.com', phoneNumber: '083456789012', role: 'warga' },
  { id: 'admin-1', name: 'Admin Desa', nik: '0000000000000000', email: 'admin@desa.com', phoneNumber: '081111111111', role: 'admin' },
];

// Letter Types Table
export const letterTypes: LetterType[] = [
    {
        id: 'lt-1',
        name: "Surat Keterangan Domisili",
        description: "Untuk keperluan administrasi perbankan, pekerjaan, dll.",
        icon: React.createElement(Home, { className: "h-6 w-6 text-accent" }),
        templateUrl: '/templates/surat_domisili.pdf'
    },
    {
        id: 'lt-2',
        name: "Surat Pengantar Nikah",
        description: "Sebagai salah satu syarat pengurusan pernikahan di KUA.",
        icon: React.createElement(FileText, { className: "h-6 w-6 text-accent" }),
        templateUrl: '/templates/surat_nikah.pdf'
    },
    {
        id: 'lt-3',
        name: "Surat Keterangan Usaha",
        description: "Untuk mengajukan pinjaman atau izin terkait usaha.",
        icon: React.createElement(FileUp, { className: "h-6 w-6 text-accent" }),
        templateUrl: '/templates/surat_usaha.pdf'
    },
    {
        id: 'lt-4',
        name: "Surat Pengantar SKCK",
        description: "Untuk pembuatan Surat Keterangan Catatan Kepolisian.",
        icon: React.createElement(Shield, { className: "h-6 w-6 text-accent" }),
        templateUrl: '/templates/surat_skck.pdf'
    }
];

// Applications Table
export const applications: Application[] = [
  {
    id: 'app-1',
    userId: 'user-1',
    letterTypeId: 'lt-1',
    date: new Date(2024, 4, 1, 10, 30).toISOString(),
    status: 'Selesai',
    reason: 'Saya memerlukan surat keterangan domisili untuk keperluan pembukaan rekening bank baru di Bank ABC.',
    history: [
      { status: 'Pending', date: new Date(2024, 4, 1, 10, 30).toISOString() },
      { status: 'Diproses', date: new Date(2024, 4, 1, 11, 0).toISOString() },
      { status: 'Siap Diambil', date: new Date(2024, 4, 1, 15, 0).toISOString() },
      { status: 'Selesai', date: new Date(2024, 4, 2, 9, 0).toISOString() },
    ],
  },
  {
    id: 'app-2',
    userId: 'user-2',
    letterTypeId: 'lt-3',
    date: new Date(2024, 4, 3, 14, 0).toISOString(),
    status: 'Diproses',
    reason: 'Sebagai syarat untuk mengajukan Kredit Usaha Rakyat (KUR) untuk pengembangan warung kelontong saya.',
    history: [
      { status: 'Pending', date: new Date(2024, 4, 3, 14, 0).toISOString() },
      { status: 'Diproses', date: new Date(2024, 4, 4, 9, 30).toISOString() },
    ],
  },
  {
    id: 'app-3',
    userId: 'user-3',
    letterTypeId: 'lt-4',
    date: new Date(2024, 4, 4, 16, 0).toISOString(),
    status: 'Pending',
    reason: 'Dibutuhkan untuk melamar pekerjaan sebagai satpam di PT. Aman Sentosa.',
    history: [{ status: 'Pending', date: new Date(2024, 4, 4, 16, 0).toISOString() }],
  },
   {
    id: 'app-4',
    userId: 'user-1',
    letterTypeId: 'lt-2',
    date: new Date(2024, 3, 20).toISOString(),
    status: 'Ditolak',
    reason: 'Untuk menikah.',
    notes: 'Data wali nikah tidak lengkap. Mohon perbarui dan ajukan kembali.',
    history: [
        { status: 'Pending', date: new Date(2024, 3, 20).toISOString() },
        { status: 'Ditolak', date: new Date(2024, 3, 21).toISOString(), notes: 'Data wali nikah tidak lengkap.' },
    ],
  },
];
