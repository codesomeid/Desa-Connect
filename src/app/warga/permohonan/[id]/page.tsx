
import Link from 'next/link';
import { ArrowLeft, FileText, Info } from 'lucide-react';
import { applications, users, letterTypes, ApplicationStatus, logs } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { StatusTimeline } from './status-timeline';

const statusVariantMap: { [key in ApplicationStatus]: "default" | "secondary" | "destructive" | "outline" } = {
  'Diajukan': 'secondary',
  'Diverifikasi': 'default',
  'Diproses': 'default',
  'Ditolak': 'destructive',
  'Siap Diambil': 'outline',
  'Selesai': 'default',
};

async function getApplicationDetails(id: string) {
  const application = applications.find(app => app.id_permohonan === parseInt(id));
  if (!application) {
    return null;
  }

  const user = users.find(u => u.id_masyarakat === application.id_masyarakat);
  const letterType = letterTypes.find(lt => lt.id_jenis_surat === application.id_jenis_surat);
  const applicationLogs = logs.filter(log => log.id_permohonan === application.id_permohonan);

  if (!user || !letterType) return null;

  return {
    ...application,
    pemohon: user,
    jenisSurat: letterType,
    logs: applicationLogs,
  };
}

export default async function WargaApplicationDetailPage({ params }: { params: { id: string } }) {
  const application = await getApplicationDetails(params.id);

  if (!application) {
    notFound();
  }

  return (
    <main className="space-y-8">
      <header className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/warga/dashboard">
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
            Lacak perkembangan permohonan Anda di sini.
          </p>
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Progres Permohonan</CardTitle>
                </CardHeader>
                <CardContent>
                    <StatusTimeline currentStatus={application.status} />
                </CardContent>
            </Card>

            {application.catatan_admin && (
                <Card className="bg-amber-50 border-amber-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-900"><Info /> Catatan dari Admin</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-amber-800">{application.catatan_admin}</p>
                    </CardContent>
                </Card>
             )}
        </div>

        <div className="space-y-8">
           <Card>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'><FileText/> Ringkasan</CardTitle>
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
        </div>
      </div>
    </main>
  );
}
