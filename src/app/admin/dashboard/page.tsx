import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowRight, Check, X, FileEdit, Mail, Signature, Printer, UserCheck } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Alur Proses Aplikasi DesaConnect</h1>
        <p className="text-muted-foreground">
          Visualisasi alur kerja untuk pemohon (warga) dan admin (aparat desa).
        </p>
      </header>
      
      <div className="grid gap-8 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>1. Flowchart Alur Pemohon (Warga)</CardTitle>
            <CardDescription>
              Diagram ini menggambarkan langkah-langkah yang dilakukan oleh warga dari awal hingga surat diterima.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono whitespace-pre">
{`graph TD
    A[Mulai] --> B{Sudah punya akun?};
    B -- Ya --> D[Login ke Aplikasi];
    B -- Tidak --> C[Registrasi / Isi Data Diri];
    C --> D;
    D --> E[Pilih Layanan Persuratan];
    E --> F[/Pilih Jenis Surat & Isi Alasan Permohonan/];
    F --> G[Kirim Permohonan];
    G --> H((Menunggu Proses dari Desa));
    H --> I[Menerima Notifikasi Surat Siap Diambil];
    I --> J[Datang ke Kantor Desa/Kelurahan];
    J --> K[/Mengambil Surat Jadi/];
    K --> L[Selesai];`}
              </pre>
            </div>
             <div>
                <h3 className="font-semibold mb-2">Penjelasan Flowchart Pemohon:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Mulai:</strong> Pemohon mengakses aplikasi.</li>
                    <li><strong className="text-foreground">Sudah punya akun?:</strong> Sistem memeriksa apakah pemohon perlu login atau registrasi terlebih dahulu.</li>
                    <li><strong className="text-foreground">Login/Registrasi:</strong> Pemohon masuk ke dalam sistem.</li>
                    <li><strong className="text-foreground">Pilih Layanan & Jenis Surat:</strong> Pemohon menavigasi menu untuk memilih surat yang dibutuhkan dan mengisi formulir alasan.</li>
                    <li><strong className="text-foreground">Kirim Permohonan:</strong> Data permohonan dikirim ke sistem.</li>
                    <li><strong className="text-foreground">Menunggu:</strong> Ini adalah fase pasif di mana pemohon menunggu proses internal dari pihak desa.</li>
                    <li><strong className="text-foreground">Menerima Notifikasi:</strong> Pemohon mendapatkan pemberitahuan (via aplikasi atau WhatsApp) bahwa surat sudah selesai.</li>
                    <li><strong className="text-foreground">Mengambil Surat:</strong> Pemohon datang ke kantor desa untuk mengambil dokumen fisik.</li>
                    <li><strong className="text-foreground">Selesai:</strong> Proses dari sisi pemohon berakhir.</li>
                </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Flowchart Alur Admin (Aparat Desa)</CardTitle>
            <CardDescription>
              Diagram ini menggunakan swimlane untuk menunjukkan siapa yang bertanggung jawab atas setiap langkah proses internal desa.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono whitespace-pre">
{`flowchart TD
    subgraph Alur Proses Internal Desa
        direction LR
        subgraph Pemohon
            A_Start(Permohonan Masuk dari Pemohon)
        end

        subgraph Admin
            A_Start --> B[Menerima & Memeriksa Data/Alasan]
            B --> C{Data & Alasan Valid?}
            C -- Tidak --> D[Tolak Permohonan & Beri Catatan] --> D_Notif[Notifikasi Penolakan ke Pemohon]
            C -- Ya --> E[Proses Surat: Masukkan Data ke Template]
        end

        subgraph Sekretaris
            E --> F[Verifikasi Ulang & Penomoran Surat Resmi]
            F --> G{Persetujuan Sekretaris?}
            G -- Tidak --> H(Revisi ke Admin)
            H --> E
            G -- Ya --> I{Pilih Metode Cetak}
        end

        subgraph "Pencetakan & Tanda Tangan"
            direction TB
            I -- "Full Print (TTD Digital)" --> J1[Cetak Surat Lengkap dengan TTD & Stempel Digital] --> K_Final
            I -- "TTD Basah" --> J2[Cetak Surat (Tanpa TTD)] --> L[Diserahkan ke Kepala Desa]
            I -- "Nomor Basah" --> J3[Cetak Template Kosong] --> M[Isi Nomor & TTD Manual oleh Aparat] --> K_Final

            subgraph "Kepala Desa"
                L --> N[Menandatangani Surat (TTD Basah)]
            end
            
            N --> K_Final[Surat Final Siap Diberikan]
        end
        
        subgraph Admin
             K_Final --> P[Update Status "Siap Diambil"]
             P --> Q[Kirim Notifikasi ke Pemohon]
             Q --> R[/Menyerahkan Surat ke Pemohon & Arsipkan/] --> S(Selesai)
        end
    end`}
              </pre>
            </div>
             <div>
                <h3 className="font-semibold mb-2">Penjelasan Flowchart Admin:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Pemohon:</strong> Proses dimulai ketika sebuah Permohonan Masuk.</li>
                    <li><strong className="text-foreground">Admin (Tahap Awal):</strong> Menerima, memverifikasi data, dan menolak atau melanjutkan ke proses pembuatan draf surat.</li>
                    <li><strong className="text-foreground">Sekretaris:</strong> Melakukan verifikasi kedua, memberikan nomor surat, dan menyetujui atau meminta revisi.</li>
                    <li><strong className="text-foreground">Pencetakan & Tanda Tangan:</strong> Tahap kritis dengan tiga jalur (Full Print Digital, TTD Basah, Nomor Basah) untuk menghasilkan surat final.</li>
                    <li><strong className="text-foreground">Kepala Desa:</strong> Hanya terlibat jika diperlukan Tanda Tangan basah.</li>
                    <li><strong className="text-foreground">Admin (Tahap Akhir):</strong> Mengubah status, mengirim notifikasi, menyerahkan surat, dan mengarsipkan.</li>
                </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
