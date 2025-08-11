
// This file acts as a mock database, structured according to the provided ERD.

// --- ENUMS & TYPES ---

export type ApplicationStatus = 'Diajukan' | 'Diverifikasi' | 'Diproses' | 'Ditolak' | 'Siap Diambil' | 'Selesai';
export type AparatJabatan = 'Admin' | 'Sekretaris' | 'Kepala Desa' | 'Super Admin';
export type MetodeCetak = 'Full Print' | 'TTD Basah' | 'Nomor Basah';

// --- INTERFACES / TABLE DEFINITIONS ---

export interface Masyarakat {
  id_masyarakat: number;
  nik: string;
  no_kk: string;
  nama_lengkap: string;
  alamat: string;
  no_telepon: string;
  password_hash: string;
}

export interface JenisSurat {
  id_jenis_surat: number;
  kode_surat: string;
  nama_surat: string;
  deskripsi: string;
  template_path: string; // Path to a .docx or .pdf template
  icon?: string;
}

export interface AparatDesa {
    id_aparat: number;
    nip: string;
    nama_lengkap: string;
    jabatan: AparatJabatan;
    username: string;
    password_hash: string;
}

export interface PermohonanSurat {
  id_permohonan: number;
  id_masyarakat: number;
  id_jenis_surat: number;
  tanggal_permohonan: string;
  alasan_permohonan: string;
  status: ApplicationStatus;
  catatan_admin?: string;
}

export interface SuratKeluar {
    id_surat_keluar: number;
    id_permohonan: number;
    nomor_surat: string;
    tanggal_surat: string;
    id_penandatangan: number;
    metode_cetak: MetodeCetak;
    file_final_path?: string;
}

export interface LogAktivitas {
    id_log: number;
    id_permohonan: number;
    id_aparat: number;
    waktu: string;
    aktivitas: string;
}


// --- DATABASE TABLES (Mock Data) ---

// MASYARAKAT Table
export const users: Masyarakat[] = [
  { id_masyarakat: 1, nik: '3201012345670001', no_kk: '3201012345670000', nama_lengkap: 'Budi Santoso', alamat: 'Jl. Merdeka No. 1, Desa Sukamaju', no_telepon: '081234567890', password_hash: 'hashed_password_budi' },
  { id_masyarakat: 2, nik: '3201019876540002', no_kk: '3201019876540000', nama_lengkap: 'Citra Lestari', alamat: 'Jl. Pahlawan No. 10, Desa Sukamaju', no_telepon: '082345678901', password_hash: 'hashed_password_citra' },
  { id_masyarakat: 3, nik: '3201015555550003', no_kk: '3201015555550000', nama_lengkap: 'Agus Wijaya', alamat: 'Dusun Makmur RT 01 RW 02, Desa Sukamaju', no_telepon: '083456789012', password_hash: 'hashed_password_agus' },
];

// JENIS_SURAT Table
export const letterTypes: JenisSurat[] = [
    { id_jenis_surat: 1, kode_surat: "474.1", nama_surat: "Surat Keterangan Domisili", deskripsi: "Untuk keperluan administrasi perbankan, pekerjaan, dll.", template_path: "/templates/surat_domisili.docx", icon: 'Home' },
    { id_jenis_surat: 2, kode_surat: "474.2", nama_surat: "Surat Pengantar Nikah", deskripsi: "Sebagai salah satu syarat pengurusan pernikahan di KUA.", template_path: "/templates/surat_nikah.docx", icon: 'FileText' },
    { id_jenis_surat: 3, kode_surat: "503", nama_surat: "Surat Keterangan Usaha", deskripsi: "Untuk mengajukan pinjaman atau izin terkait usaha.", template_path: "/templates/surat_usaha.docx", icon: 'FileUp' },
    { id_jenis_surat: 4, kode_surat: "300", nama_surat: "Surat Pengantar SKCK", deskripsi: "Untuk pembuatan Surat Keterangan Catatan Kepolisian.", template_path: "", icon: 'Shield' }
];

// APARAT_DESA Table
export const aparatur: AparatDesa[] = [
  { id_aparat: 1, nip: '198001012010011001', nama_lengkap: 'Admin Desa', jabatan: 'Admin', username: 'admin@desa.com', password_hash: 'hashed_password_admin' },
  { id_aparat: 2, nip: '198502022012022002', nama_lengkap: 'Sekretaris Desa', jabatan: 'Sekretaris', username: 'sekdes@desa.com', password_hash: 'hashed_password_sekdes' },
  { id_aparat: 3, nip: '197503032008031003', nama_lengkap: 'Kepala Desa', jabatan: 'Kepala Desa', username: 'kades@desa.com', password_hash: 'hashed_password_kades' },
  { id_aparat: 4, nip: '000000000000000000', nama_lengkap: 'Super Admin', jabatan: 'Super Admin', username: 'superadmin@desa.com', password_hash: 'hashed_password_superadmin' },
];

// PERMOHONAN_SURAT Table
export const applications: PermohonanSurat[] = [
  { id_permohonan: 1, id_masyarakat: 1, id_jenis_surat: 1, tanggal_permohonan: new Date(2024, 4, 1, 10, 30).toISOString(), alasan_permohonan: 'Saya memerlukan surat keterangan domisili untuk keperluan pembukaan rekening bank baru di Bank ABC.', status: 'Selesai' },
  { id_permohonan: 2, id_masyarakat: 2, id_jenis_surat: 3, tanggal_permohonan: new Date(2024, 4, 3, 14, 0).toISOString(), alasan_permohonan: 'Sebagai syarat untuk mengajukan Kredit Usaha Rakyat (KUR) untuk pengembangan warung kelontong saya.', status: 'Diproses' },
  { id_permohonan: 3, id_masyarakat: 3, id_jenis_surat: 4, tanggal_permohonan: new Date(2024, 4, 4, 16, 0).toISOString(), alasan_permohonan: 'Dibutuhkan untuk melamar pekerjaan sebagai satpam di PT. Aman Sentosa.', status: 'Diajukan' },
  { id_permohonan: 4, id_masyarakat: 1, id_jenis_surat: 2, tanggal_permohonan: new Date(2024, 3, 20).toISOString(), alasan_permohonan: 'Untuk menikah.', status: 'Ditolak', catatan_admin: 'Data wali nikah tidak lengkap. Mohon perbarui dan ajukan kembali.' },
   { id_permohonan: 5, id_masyarakat: 1, id_jenis_surat: 3, tanggal_permohonan: new Date(2024, 4, 5, 9, 0).toISOString(), alasan_permohonan: 'Butuh surat keterangan usaha untuk pinjaman modal.', status: 'Diproses' },
];

// SURAT_KELUAR Table
export const suratKeluar: SuratKeluar[] = [
    { id_surat_keluar: 1, id_permohonan: 1, nomor_surat: "474.1/001/V/2024", tanggal_surat: new Date(2024, 4, 1).toISOString(), id_penandatangan: 3, metode_cetak: "Full Print", file_final_path: "/arsip/SKD-001.pdf" }
];

// LOG_AKTIVITAS Table
export const logs: LogAktivitas[] = [
    { id_log: 1, id_permohonan: 1, id_aparat: 1, waktu: new Date(2024, 4, 1, 10, 35).toISOString(), aktivitas: 'Verifikasi Data Pemohon' },
    { id_log: 2, id_permohonan: 1, id_aparat: 2, waktu: new Date(2024, 4, 1, 11, 0).toISOString(), aktivitas: 'Verifikasi Penomoran & Proses Surat' },
    { id_log: 3, id_permohonan: 1, id_aparat: 1, waktu: new Date(2024, 4, 1, 15, 0).toISOString(), aktivitas: 'Update Status: Siap Diambil' },
    { id_log: 4, id_permohonan: 1, id_aparat: 1, waktu: new Date(2024, 4, 2, 9, 0).toISOString(), aktivitas: 'Update Status: Selesai' },
    { id_log: 5, id_permohonan: 2, id_aparat: 1, waktu: new Date(2024, 4, 3, 14, 5).toISOString(), aktivitas: 'Verifikasi Data Pemohon' },
    { id_log: 6, id_permohonan: 2, id_aparat: 1, waktu: new Date(2024, 4, 4, 9, 30).toISOString(), aktivitas: 'Update Status: Diproses' },
    { id_log: 7, id_permohonan: 4, id_aparat: 1, waktu: new Date(2024, 3, 21, 10, 0).toISOString(), aktivitas: 'Update Status: Ditolak. Catatan: Data wali nikah tidak lengkap.' },
];
