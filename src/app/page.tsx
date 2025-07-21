import { Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const announcements = [
  {
    title: "Kerja Bakti Membersihkan Lingkungan Desa",
    date: "15 Juli 2024",
    content: "Diberitahukan kepada seluruh warga desa untuk mengikuti kegiatan kerja bakti pembersihan lingkungan yang akan dilaksanakan pada hari Minggu, 21 Juli 2024 pukul 07:00 WIB. Diharapkan partisipasi aktif dari seluruh warga."
  },
  {
    title: "Vaksinasi COVID-19 Dosis Ke-3 (Booster)",
    date: "10 Juli 2024",
    content: "Program vaksinasi booster akan kembali diadakan di balai desa pada tanggal 25-27 Juli 2024. Warga yang belum menerima vaksin booster dapat mendaftar melalui aplikasi ini atau datang langsung ke lokasi."
  },
  {
    title: "Pembayaran PBB Tahun 2024",
    date: "1 Juli 2024",
    content: "Batas akhir pembayaran Pajak Bumi dan Bangunan (PBB) tahun 2024 adalah tanggal 31 Agustus 2024. Segera lakukan pembayaran untuk menghindari denda. Pembayaran dapat dilakukan di kantor pos atau secara online."
  },
   {
    title: "Lomba 17 Agustus-an",
    date: "25 Juni 2024",
    content: "Dalam rangka memeriahkan HUT RI, akan diadakan berbagai macam lomba untuk anak-anak dan dewasa. Pendaftaran dibuka mulai tanggal 1 Agustus 2024 di kantor desa. Mari ramaikan!"
  }
];

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Pengumuman Desa</h1>
        <p className="text-muted-foreground">Informasi terbaru dan penting dari pemerintah desa.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {announcements.map((announcement, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {announcement.title}
              </CardTitle>
              <Megaphone className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs mb-4">{announcement.date}</CardDescription>
              <p className="text-sm text-foreground/90">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
