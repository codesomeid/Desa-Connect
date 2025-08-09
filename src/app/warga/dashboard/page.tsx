
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus } from 'lucide-react';
import { applications, users, letterTypes } from '@/lib/data';
import type { ApplicationStatus } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// In a real app, this would be the ID of the currently logged-in user.
const FAKE_LOGGED_IN_USER_ID = 1;

async function getWargaData() {
  const user = users.find(u => u.id_masyarakat === FAKE_LOGGED_IN_USER_ID);
  const userApplications = applications
    .filter(app => app.id_masyarakat === FAKE_LOGGED_IN_USER_ID)
    .map(app => {
      const letterType = letterTypes.find(lt => lt.id_jenis_surat === app.id_jenis_surat);
      return {
        ...app,
        nama_surat: letterType?.nama_surat || 'Surat Tidak Ditemukan',
      };
    })
    .sort((a, b) => new Date(b.tanggal_permohonan).getTime() - new Date(a.tanggal_permohonan).getTime());

  return { user, userApplications };
}

const statusVariantMap: { [key in ApplicationStatus]: "default" | "secondary" | "destructive" | "outline" } = {
  'Diajukan': 'secondary',
  'Diverifikasi': 'default',
  'Diproses': 'default',
  'Ditolak': 'destructive',
  'Siap Diambil': 'outline',
  'Selesai': 'default',
};


export default async function WargaDashboardPage() {
  const { user, userApplications } = await getWargaData();

  if (!user) {
    return <div>Pengguna tidak ditemukan. Silakan login kembali.</div>;
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Selamat Datang, {user.nama_lengkap}!</h1>
        <p className="text-muted-foreground">
          Ini adalah dashboard Anda untuk mengelola semua layanan persuratan desa.
        </p>
      </header>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
                <CardTitle>Ajukan Surat Baru</CardTitle>
                <CardDescription>
                    Perlu surat keterangan atau pengantar? Buat permohonan baru di sini.
                </CardDescription>
            </div>
            <Button asChild>
                <Link href="/warga/permohonan/baru">
                    <FilePlus className="mr-2" />
                    Buat Permohonan
                </Link>
            </Button>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Permohonan Surat Anda</CardTitle>
          <CardDescription>
            Lacak status semua permohonan yang telah Anda ajukan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jenis Surat</TableHead>
                  <TableHead>Tanggal Pengajuan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userApplications.length > 0 ? (
                  userApplications.map(app => (
                    <TableRow key={app.id_permohonan}>
                      <TableCell className="font-medium">{app.nama_surat}</TableCell>
                      <TableCell>{new Date(app.tanggal_permohonan).toLocaleDateString('id-ID')}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariantMap[app.status]}>
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <Button variant="outline" size="sm" asChild>
                            <Link href={`/warga/permohonan/${app.id_permohonan}`}>Lihat Detail</Link>
                         </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Anda belum pernah mengajukan permohonan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
