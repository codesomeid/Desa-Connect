
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, User, FileText, CheckCircle, XCircle } from 'lucide-react';
import { applications, users, letterTypes } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound, redirect } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

// This function simulates fetching data from a database.
async function getApplicationDetails(id: string) {
  const application = applications.find(app => app.id_permohonan === parseInt(id));
  if (!application) {
    return null;
  }

  const user = users.find(u => u.id_masyarakat === application.id_masyarakat);
  const letterType = letterTypes.find(lt => lt.id_jenis_surat === application.id_jenis_surat);
  
  if (!user || !letterType) return null;

  return {
    ...application,
    pemohon: user,
    jenisSurat: letterType,
  };
}

export default async function ProcessApplicationPage({ params }: { params: { id: string } }) {
  const application = await getApplicationDetails(params.id);

  if (!application) {
    notFound();
  }

  // A real app would have a server action here to handle the approval/rejection logic.
  async function handleApprove() {
    'use server';
    // 1. Update application status to 'Siap Diambil' or 'Selesai'
    // 2. Generate the final letter record in `Surat_Keluar` table.
    // 3. Generate and store the final PDF.
    // 4. Create a new log entry in `Log_Aktivitas`.
    console.log(`Application ${application?.id_permohonan} approved.`);
    redirect(`/admin/permohonan/${application?.id_permohonan}`);
  }

  async function handleReject() {
    'use server';
    // 1. Update application status to 'Ditolak'.
    // 2. Add rejection reason to `catatan_admin`.
    // 3. Create a new log entry.
     console.log(`Application ${application?.id_permohonan} rejected.`);
     redirect(`/admin/permohonan/${application?.id_permohonan}`);
  }


  return (
    <main className="space-y-8">
       <header className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href={`/admin/permohonan/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Kembali</span>
          </Link>
        </Button>
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Proses & Pratinjau Surat</h1>
            <p className="text-muted-foreground">
                Tinjau draf surat yang dihasilkan sistem sebelum mengambil keputusan.
            </p>
        </div>
      </header>
      
      <div className="grid gap-8 md:grid-cols-3">
        {/* Document Preview */}
        <div className="md:col-span-2">
            <Card className="h-full">
                 <CardHeader>
                    <CardTitle>Pratinjau Draf Surat</CardTitle>
                    <CardDescription>
                        Ini adalah pratinjau surat yang diisi dengan data pemohon. Nomor dan tanggal surat akan digenerate saat disetujui.
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
                    <CardTitle className="flex items-center gap-2"><FileText /> Ringkasan Permohonan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Jenis Surat</span>
                        <span className="font-semibold text-right">{application.jenisSurat.nama_surat}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Pemohon</span>
                        <span className="font-semibold text-right">{application.pemohon.nama_lengkap}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">NIK</span>
                        <span className="font-semibold text-right">{application.pemohon.nik}</span>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Keputusan Akhir</CardTitle>
                    <CardDescription>
                        Setujui untuk menyelesaikan surat, atau tolak jika ada masalah.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <form action={handleApprove} className='w-full'>
                     <Button className="w-full" size="lg">
                        <CheckCircle className="mr-2"/>
                        Setujui & Selesaikan
                    </Button>
                   </form>
                   <Separator />
                    {/* In a real app, rejecting would likely open a dialog to input a reason. */}
                    <form action={handleReject} className='w-full'>
                        <Button variant="destructive" className="w-full">
                            <XCircle className="mr-2"/>
                            Tolak Permohonan
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
