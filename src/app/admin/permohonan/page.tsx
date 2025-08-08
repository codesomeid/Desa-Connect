
import { applications, users, letterTypes } from '@/lib/data';
import ApplicationList from './application-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ApplicationManagementPage() {
  // In a real app, you would fetch this data from an API
  const fullApplications = applications.map(app => {
    const user = users.find(u => u.id === app.userId);
    const letterType = letterTypes.find(lt => lt.id === app.letterTypeId);
    return {
      ...app,
      userName: user?.name || 'Pengguna Tidak Ditemukan',
      userNIP: user?.nik || '-', // Using NIK as NIP for this context
      letterName: letterType?.name || 'Surat Tidak Ditemukan',
    }
  });

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
