"use client"
import { ApplicationForm } from "../application-form";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PermohonanBaruContent() {
    const searchParams = useSearchParams();
    const letterTypeParam = searchParams.get('jenis');

    const letterTypeMap: {[key: string]: string} = {
        'skck': 'Surat Pengantar Keterangan Catatan Kepolisian',
        'usaha': 'Surat Keterangan Usaha (SKU)',
        'domisili-perusahaan': 'Surat Keterangan Domisili Perusahaan/Yayasan',
        'kehilangan': 'Surat Keterangan Laporan Kehilangan',
        'kepemilikan-rumah': 'Surat Keterangan Kepemilikan Rumah',
        'kematian-waris': 'Surat Keterangan Laporan Kematian (Ahli Waris)',
        'kematian-akta': 'Surat Keterangan Kematian (Akta Kematian)',
        'status-perkawinan': 'Surat Keterangan Status Perkawinan',
        'beda-data': 'Surat Keterangan Beda Data Kependudukan',
        'domisili-haji': 'Surat Keterangan Domisili Calon Jemaah Haji',
        'pindah-domisili': 'Surat Keterangan Pindah Domisili',
        'kepemilikan-tanah': 'Surat Keterangan Kepemilikan Tanah',
        'jalan': 'Surat Keterangan Jalan',
        'jpk-ks': 'Surat Keterangan JPK-KS',
        'tidak-mampu': 'Surat Keterangan Tidak Mampu (SKTM)',
        'untuk-nikah': 'Surat Keterangan Untuk Nikah',
        'kerja-luar-negeri': 'Surat Keterangan Bekerja di Luar Negeri',
        'orang-tua': 'Surat Keterangan Orang Tua',
        'ahli-waris': 'Surat Keterangan Ahli Waris',
        'lainnya': 'Lainnya'
    }

    const selectedLetterType = letterTypeParam ? letterTypeMap[letterTypeParam] : undefined;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Permohonan Surat Online</h1>
        <p className="text-muted-foreground">
          Isi formulir di bawah ini untuk mengajukan permohonan surat keterangan. Pastikan semua data diisi dengan benar.
        </p>
      </header>
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <ApplicationForm selectedLetterType={selectedLetterType} />
        </CardContent>
      </Card>
    </div>
  );
}


export default function PermohonanBaruPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PermohonanBaruContent />
        </Suspense>
    )
}
