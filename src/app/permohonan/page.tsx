import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ChevronRight, Building2, UserMinus, FileQuestion } from "lucide-react";
import Link from "next/link";

const letterTypes = [
  {
    name: "Surat Keterangan Usaha",
    description: "Untuk keperluan membuka atau menjalankan usaha.",
    icon: <Building2 className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=usaha"
  },
  {
    name: "Surat Keterangan Domisili",
    description: "Menyatakan tempat tinggal Anda saat ini.",
    icon: <FileText className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=domisili"
  },
  {
    name: "Surat Keterangan Tidak Mampu",
    description: "Untuk mendapatkan bantuan atau keringanan biaya.",
    icon: <UserMinus className="h-6 w-6 text-accent" />,
    href: "/permohonan/baru?jenis=tidak-mampu"
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
      <div className="grid gap-6 md:grid-cols-2">
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
                            <CardTitle>{letter.name}</CardTitle>
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
