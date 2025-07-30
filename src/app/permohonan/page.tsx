import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ChevronRight, Building2, Shield, Home, Briefcase, Users, HeartHandshake, UserCheck, UserX, Plane, GraduationCap, Building, HelpCircle, FileQuestion, BookUser, FileHeart, FileSearch, LandPlot, Car, ShieldCheck } from "lucide-react";
import Link from "next/link";

const letterTypes = [
  {
    name: "Surat Pengantar Keterangan Catatan Kepolisian",
    description: "Untuk pembuatan SKCK.",
    icon: <Shield className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=skck"
  },
  {
    name: "Surat Keterangan Usaha (SKU)",
    description: "Untuk keperluan membuka atau menjalankan usaha.",
    icon: <Building2 className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=usaha"
  },
  {
    name: "Surat Keterangan Domisili Perusahaan/Yayasan",
    description: "Menyatakan domisili untuk badan usaha atau organisasi.",
    icon: <Building className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=domisili-perusahaan"
  },
  {
    name: "Surat Keterangan Laporan Kehilangan",
    description: "Untuk melaporkan kehilangan dokumen atau barang.",
    icon: <FileSearch className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=kehilangan"
  },
  {
    name: "Surat Keterangan Kepemilikan Rumah",
    description: "Menyatakan bukti kepemilikan properti rumah.",
    icon: <Home className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=kepemilikan-rumah"
  },
  {
    name: "Surat Keterangan Laporan Kematian (Ahli Waris)",
    description: "Diperlukan untuk urusan pembagian waris.",
    icon: <Users className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=kematian-waris"
  },
  {
    name: "Surat Keterangan Kematian (Akta Kematian)",
    description: "Sebagai pengantar untuk pembuatan akta kematian.",
    icon: <FileText className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=kematian-akta"
  },
  {
    name: "Surat Keterangan Status Perkawinan",
    description: "Menyatakan status perkawinan seseorang.",
    icon: <FileHeart className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=status-perkawinan"
  },
  {
    name: "Surat Keterangan Beda Data Kependudukan",
    description: "Untuk memperbaiki perbedaan data pada dokumen.",
    icon: <UserCheck className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=beda-data"
  },
  {
    name: "Surat Keterangan Domisili Calon Jemaah Haji",
    description: "Persyaratan untuk pendaftaran ibadah haji.",
    icon: <Plane className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=domisili-haji"
  },
  {
    name: "Surat Keterangan Pindah Domisili",
    description: "Pengantar untuk mengurus pindah alamat tinggal.",
    icon: <Car className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=pindah-domisili"
  },
  {
    name: "Surat Keterangan Kepemilikan Tanah",
    description: "Menyatakan bukti kepemilikan properti tanah.",
    icon: <LandPlot className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=kepemilikan-tanah"
  },
  {
    name: "Surat Keterangan Jalan",
    description: "Izin untuk melakukan perjalanan ke luar daerah.",
    icon: <Briefcase className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=jalan"
  },
  {
    name: "Surat Keterangan JPK-KS",
    description: "Untuk Jaminan Pemeliharaan Kesehatan Kota Sukabumi.",
    icon: <HeartHandshake className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=jpk-ks"
  },
  {
    name: "Surat Keterangan Tidak Mampu (SKTM)",
    description: "Untuk mendapatkan bantuan atau keringanan biaya.",
    icon: <UserX className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=tidak-mampu"
  },
  {
    name: "Surat Keterangan Untuk Nikah",
    description: "Pengantar untuk mengurus pernikahan di KUA.",
    icon: <FileHeart className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=untuk-nikah"
  },
  {
    name: "Surat Keterangan Bekerja di Luar Negeri",
    description: "Diperlukan untuk TKI/TKW.",
    icon: <Plane className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=kerja-luar-negeri"
  },
  {
    name: "Surat Keterangan Orang Tua",
    description: "Menyatakan hubungan antara anak dan orang tua.",
    icon: <Users className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=orang-tua"
  },
  {
    name: "Surat Keterangan Ahli Waris",
    description: "Menetapkan siapa saja yang berhak menjadi ahli waris.",
    icon: <BookUser className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=ahli-waris"
  },
   {
    name: "Surat Lainnya",
    description: "Untuk jenis permohonan surat lainnya.",
    icon: <FileQuestion className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=lainnya"
  },
];

export default function PermohonanPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Pilih Jenis Surat</h1>
        <p className="text-muted-foreground">
          Pilih jenis surat yang ingin Anda ajukan dari daftar di bawah ini.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {letterTypes.map((letter) => (
          <Link href={letter.href} key={letter.name} className="group">
            <Card className="flex h-full flex-col justify-between transition-all group-hover:shadow-lg group-hover:border-accent">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                            {letter.icon}
                        </div>
                        <div>
                            <CardTitle className="text-base">{letter.name}</CardTitle>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{letter.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
