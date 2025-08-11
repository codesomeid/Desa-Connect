
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, FileText, User, Calendar, Printer, Signature, Check, Loader2 } from 'lucide-react';
import { applications, users, letterTypes, aparatur, MetodeCetak, AparatJabatan } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound, useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// This function simulates fetching data from a database.
// In a real app, this would be a proper async function fetching from an API.
function getApplicationDetails(id: string) {
  const application = applications.find(app => app.id_permohonan === parseInt(id));
  if (!application) {
    return null;
  }

  const user = users.find(u => u.id_masyarakat === application.id_masyarakat);
  const letterType = letterTypes.find(lt => lt.id_jenis_surat === application.id_jenis_surat);
  
  if (!user || !letterType || application.status !== 'Diproses') return null;

  return {
    ...application,
    pemohon: user,
    jenisSurat: letterType,
  };
}

const signatories = aparatur.filter(a => a.jabatan === 'Sekretaris' || a.jabatan === 'Kepala Desa');
const printMethods: MetodeCetak[] = ['Full Print', 'TTD Basah', 'Nomor Basah', 'TTD & Nomor Basah'];

export default function FinalizeApplicationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [printMethod, setPrintMethod] = useState<MetodeCetak>('Full Print');
  
  // Since this is a client component, we fetch data in useEffect or use a library like SWR/React Query
  // For this mock, we'll just call it directly.
  const application = getApplicationDetails(params.id);

  if (!application) {
    // In a real client component, you might show a loading state first
    // and then call notFound() if the fetch returns null.
    // For simplicity, we call it directly.
    return notFound();
  }
  
  const handleFinalize = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // --- In a real app, this would be a server action or API call ---
    console.log("Finalizing application with data:", {
        id_permohonan: application.id_permohonan,
        ...data,
    });
    // 1. Create a new record in `Surat_Keluar` table.
    // 2. Update the status of `Permohonan_Surat` to 'Siap Diambil'.
    // 3. Generate the final PDF with the official number and store it if needed.
    // 4. Create a log entry in `Log_Aktivitas`.
    // --- End of real app logic ---

    setTimeout(() => {
        setIsLoading(false);
        toast({
            title: "Surat Selesai Diproses",
            description: `Surat untuk ${application.pemohon.nama_lengkap} telah difinalisasi dan siap diambil.`,
        });
        router.push('/admin/sekretaris');
    }, 1500);
  }

  const showDigitalFields = printMethod === 'Full Print';

  return (
    <main className="space-y-8">
       <header className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin/sekretaris">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Kembali</span>
          </Link>
        </Button>
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Finalisasi: {application.jenisSurat.nama_surat}</h1>
            <p className="text-muted-foreground">
                Pemohon: {application.pemohon.nama_lengkap} (NIK: {application.pemohon.nik})
            </p>
        </div>
      </header>
      
      <div className="grid gap-8 md:grid-cols-3">
        {/* Document Preview */}
        <div className="md:col-span-2">
            <Card className="h-full sticky top-4">
                 <CardHeader>
                    <CardTitle>Pratinjau Draf Surat</CardTitle>
                    <CardDescription>
                        Ini adalah pratinjau surat yang telah diisi. Pastikan semua data benar sebelum finalisasi.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 border rounded-md bg-muted/50 h-[80vh] overflow-y-auto">
                        <div className="relative w-full h-full">
                            <Image
                                src="https://placehold.co/800x1131.png"
                                alt="Document preview placeholder"
                                layout="fill"
                                objectFit="contain"
                                data-ai-hint="document paper"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        {/* Actions and Info */}
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Formulir Finalisasi</CardTitle>
                    <CardDescription>
                        Isi detail berikut untuk menyelesaikan surat.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFinalize} className="space-y-6">
                       <div>
                          <Label htmlFor="metode_cetak">Metode Cetak</Label>
                           <Select 
                              name="metode_cetak" 
                              required 
                              value={printMethod}
                              onValueChange={(value: MetodeCetak) => setPrintMethod(value)}
                            >
                                <SelectTrigger id="metode_cetak">
                                    <SelectValue placeholder="Pilih metode..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {printMethods.map(m => (
                                        <SelectItem key={m} value={m}>{m}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                      </div>

                      <div className={cn("space-y-6 transition-opacity", !showDigitalFields && 'opacity-50 pointer-events-none')}>
                        <div>
                            <Label htmlFor="nomor_surat">Nomor Surat Resmi</Label>
                            <Input id="nomor_surat" name="nomor_surat" placeholder={`${application.jenisSurat.kode_surat}/...`} required={showDigitalFields} disabled={!showDigitalFields}/>
                        </div>
                        <div>
                            <Label htmlFor="tanggal_surat">Tanggal Surat</Label>
                            <Input id="tanggal_surat" name="tanggal_surat" type="date" defaultValue={new Date().toISOString().split('T')[0]} required disabled={!showDigitalFields}/>
                        </div>
                        <div>
                            <Label htmlFor="id_penandatangan">Penandatangan</Label>
                            <Select name="id_penandatangan" required={showDigitalFields} disabled={!showDigitalFields}>
                                  <SelectTrigger id="id_penandatangan">
                                      <SelectValue placeholder="Pilih pejabat..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                      {signatories.map(s => (
                                          <SelectItem key={s.id_aparat} value={s.id_aparat.toString()}>{s.nama_lengkap} ({s.jabatan})</SelectItem>
                                      ))}
                                  </SelectContent>
                              </Select>
                        </div>
                      </div>

                      <Separator />

                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                         {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            showDigitalFields ? <Check className="mr-2"/> : <Printer className="mr-2"/>
                          )}
                        {showDigitalFields ? 'Selesaikan & Siap Diambil' : 'Finalisasi & Cetak'}
                      </Button>
                  </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
