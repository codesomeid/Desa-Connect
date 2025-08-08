
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Status, StatusTimeline } from "@/app/lacak/status-timeline";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { StatusUpdater } from "./status-updater";
import { applications, users, letterTypes } from "@/lib/data";
import { notFound } from "next/navigation";

const allStatuses: Status[] = ['Baru Masuk', 'Diproses Staf', 'Verifikasi Kasi', 'Persetujuan Sekdes', 'Menunggu TTE Kades', 'Selesai & Dapat Diambil'];

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const application = applications.find(app => app.id === params.id);

  if (!application) {
    notFound();
  }

  const applicant = users.find(user => user.id === application.applicantId);
  const letterType = letterTypes.find(lt => lt.id === application.letterTypeId);

  const currentIndex = allStatuses.findIndex(s => s === application.status);
  const nextStatus = currentIndex < allStatuses.length - 1 ? allStatuses[currentIndex + 1] : undefined;
  
  return (
    <main className="space-y-8">
       <header className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin/permohonan">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Kembali</span>
          </Link>
        </Button>
        <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight">Detail Permohonan</h1>
            <p className="text-muted-foreground font-mono text-sm">{application.id}</p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Pemohon</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                            <p className="text-muted-foreground">Nama Lengkap</p>
                            <p className="font-medium">{applicant?.name || 'N/A'}</p>
                        </div>
                         <div>
                            <p className="text-muted-foreground">NIK</p>
                            <p className="font-medium">{applicant?.nik || 'N/A'}</p>
                        </div>
                         <div>
                            <p className="text-muted-foreground">Jenis Surat</p>
                            <p className="font-medium">{letterType?.name || 'N/A'}</p>
                        </div>
                         <div>
                            <p className="text-muted-foreground">Tanggal Pengajuan</p>
                            <p className="font-medium">{new Date(application.submissionDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                    <Separator />
                     <div>
                        <p className="text-muted-foreground text-sm">Keperluan</p>
                        <p className="font-medium text-sm">{application.purpose}</p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Timeline Status</CardTitle>
                     <CardDescription>
                        Lacak dan lihat progres dari permohonan surat ini.
                    </CardDescription>
                </Header>
                <CardContent>
                    <StatusTimeline currentStatus={application.status} />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle>Proses & Tindakan</CardTitle>
                    <CardDescription>Ubah status atau lakukan tindakan lain pada permohonan ini.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <StatusUpdater currentStatus={application.status} nextStatus={nextStatus} />
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
