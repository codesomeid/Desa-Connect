
import { applications, users, letterTypes } from '@/lib/data';
import ApplicationList from './application-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ApplicationManagementPage() {
  // In a real app, you would fetch this data from an API using a JOIN query
  const fullApplications = applications.map(app => {
    const user = users.find(u => u.id_masyarakat === app.id_masyarakat);
    const letterType = letterTypes.find(lt => lt.id_jenis_surat === app.id_jenis_surat);
    return {
      id_permohonan: app.id_permohonan,
      nama_lengkap_pemohon: user?.nama_lengkap || 'Pengguna Tidak Ditemukan',
      nik_pemohon: user?.nik || '-',
      nama_surat: letterType?.nama_surat || 'Surat Tidak Ditemukan',
      tanggal_permohonan: app.tanggal_permohonan,
      status: app.status
    }
  }).sort((a,b) => b.id_permohonan - a.id_permohonan); // Sort descending by ID

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Permohonan</h1>
        <p className="text-muted-foreground">
          Tinjau, proses, dan kelola semua permohonan surat dari warga.
        </p>
      </header>
      <Card>
        <CardHeader>
            <CardTitle>Daftar Semua Permohonan</CardTitle>
            <CardDescription>Klik pada salah satu permohonan untuk melihat detail dan melakukan aksi.</CardDescription>
        </CardHeader>
        <CardContent>
            <ApplicationList applications={fullApplications} />
        </CardContent>
      </Card>
    </div>
  );
}
