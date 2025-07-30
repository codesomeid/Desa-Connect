"use client"
import { ApplicationForm } from "../application-form";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PermohonanBaruContent() {
    const searchParams = useSearchParams();
    const letterTypeParam = searchParams.get('jenis');

    const letterTypeMap: {[key: string]: string} = {
        'usaha': 'Surat Keterangan Usaha',
        'domisili': 'Surat Keterangan Domisili',
        'tidak-mampu': 'Surat Keterangan Tidak Mampu',
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
