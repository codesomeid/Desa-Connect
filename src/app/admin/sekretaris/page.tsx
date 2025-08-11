
import { applications, users, letterTypes } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';

async function getPendingApplications() {
    // Filter applications with 'Diproses' status
    const pending = applications.filter(app => app.status === 'Diproses');
    
    // Enrich with user and letter type data
    return pending.map(app => {
        const user = users.find(u => u.id_masyarakat === app.id_masyarakat);
        const letterType = letterTypes.find(lt => lt.id_jenis_surat === app.id_jenis_surat);
        return {
            ...app,
            nama_pemohon: user?.nama_lengkap || 'N/A',
            nik_pemohon: user?.nik || 'N/A',
            nama_surat: letterType?.nama_surat || 'N/A',
        };
    }).sort((a,b) => new Date(a.tanggal_permohonan).getTime() - new Date(b.tanggal_permohonan).getTime()); // Sort oldest first
}


export default async function SecretaryApprovalPage() {
    const pendingApplications = await getPendingApplications();

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Persetujuan & Penomoran Surat</h1>
                <p className="text-muted-foreground">
                    Tinjau, beri nomor, dan finalisasi permohonan yang telah disetujui admin.
                </p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Permohonan Menunggu Finalisasi</CardTitle>
                    <CardDescription>
                        Berikut adalah permohonan yang siap untuk diberikan nomor surat dan tanda tangan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nama Pemohon</TableHead>
                                    <TableHead>Jenis Surat</TableHead>
                                    <TableHead>Tgl. Proses</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingApplications.length > 0 ? (
                                    pendingApplications.map(app => (
                                        <TableRow key={app.id_permohonan}>
                                            <TableCell className="font-mono">#{app.id_permohonan}</TableCell>
                                            <TableCell className="font-medium">{app.nama_pemohon}</TableCell>
                                            <TableCell>{app.nama_surat}</TableCell>
                                            <TableCell>{new Date(app.tanggal_permohonan).toLocaleDateString('id-ID')}</TableCell>
                                            <TableCell className="text-right">
                                                <Button asChild size="sm">
                                                    <Link href={`/admin/sekretaris/${app.id_permohonan}`}>
                                                        <PenSquare className="mr-2 h-4 w-4" />
                                                        Proses & Beri Nomor
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            Tidak ada permohonan yang menunggu finalisasi saat ini.
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
