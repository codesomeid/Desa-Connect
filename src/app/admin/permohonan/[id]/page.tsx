
import Link from 'next/link';
import { ArrowLeft, FileText, User, Calendar, Info, PlayCircle } from 'lucide-react';
import { applications, users, letterTypes, ApplicationStatus, aparatur, suratKeluar } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import StatusUpdater from './status-updater';
import ProcessApplicationButton from './process-application-button';

const statusVariantMap: { [key in ApplicationStatus]: "default" | "secondary" | "destructive" | "outline" } = {
  'Diajukan': 'secondary',
  'Diverifikasi': 'default',
  'Diproses': 'default',
  'Ditolak': 'destructive',
  'Siap Diambil': 'outline',
  'Selesai': 'default',
};

const statusDescriptions: { [key in ApplicationStatus]: string } = {
    'Diajukan': 'Permohonan telah diterima dan menunggu verifikasi oleh admin.',
    'Diverifikasi': 'Permohonan telah diperiksa dan valid. Menunggu proses selanjutnya.',
    'Diproses': 'Permohonan sedang diproses, data sedang dimasukkan ke template.',
    'Siap Diambil': 'Surat telah selesai diproses dan dapat diambil di kantor desa.',
    'Selesai': 'Surat telah diserahkan kepada pemohon.',
    'Ditolak': 'Permohonan ditolak karena alasan tertentu (lihat catatan).',
};

// This function simulates fetching data from a database.
async function getApplicationDetails(id: string) {
  const application = applications.find(app => app.id_permohonan === parseInt(id));
  if (!application) {
    return null;
  }

  const user = users.find(u => u.id_masyarakat === application.id_masyarakat);
  const letterType = letterTypes.find(lt => lt.id_jenis_surat === application.id_jenis_surat);
  const generatedLetter = suratKeluar.find(sk => sk.id_permohonan === application.id_permohonan);
  const signatory = generatedLetter ? aparatur.find(a => a.id_aparat === generatedLetter.id_penandatangan) : null;

  if (!user || !letterType) return null;

  return {
    ...application,
    pemohon: user,
    jenisSurat: letterType,
    suratKeluar: generatedLetter ? { ...generatedLetter, penandatangan: signatory } : null
  };
}

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const application = await getApplicationDetails(params.id);

  if (!application) {
    notFound();
  }
  
  const canBeProcessed = application.status === 'Diverifikasi' || application.status === 'Diproses';

  return (
    <main className="space-y-8">
       <header className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin/permohonan">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Kembali</span>
          </Link>
        </Button>
        <div>
            <div className="flex items-center gap-3">
                 <h1 className="text-2xl font-bold tracking-tight">Detail Permohonan #{application.id_permohonan}</h1>
                 <Badge variant={statusVariantMap[application.status]}>{application.status}</Badge>
            </div>
            <p className="text-muted-foreground">
                {statusDescriptions[application.status]}
            </p>
        </div>
      </header>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'><FileText/> Informasi Surat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Jenis Surat</p>
                        <p className="font-semibold">{application.jenisSurat.nama_surat}</p>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">Tanggal Pengajuan</p>
                        <p>{new Date(application.tanggal_permohonan).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Alasan Permohonan</p>
                        <p className="text-sm p-4 bg-muted/50 rounded-md whitespace-pre-wrap">{application.alasan_permohonan}</p>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'><User /> Data Pemohon</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Nama Lengkap</p>
                        <p className="font-semibold">{application.pemohon.nama_lengkap}</p>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">Nomor Induk Kependudukan (NIK)</p>
                        <p>{application.pemohon.nik}</p>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">Nomor Telepon</p>
                        <p>{application.pemohon.no_telepon}</p>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">Alamat</p>
                        <p>{application.pemohon.alamat}</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Aksi</CardTitle>
                    <CardDescription>Lakukan tindakan pada permohonan ini.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <StatusUpdater currentStatus={application.status} applicationId={application.id_permohonan} />
                    {canBeProcessed && <Separator />}
                    {canBeProcessed && <ProcessApplicationButton application={application} />}
                </CardContent>
            </Card>

             {application.catatan_admin && (
                <Card className="bg-amber-50 border-amber-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-900"><Info /> Catatan Admin</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-amber-800">{application.catatan_admin}</p>
                    </CardContent>
                </Card>
             )}
        </div>

      </div>
    </main>
  );
}
