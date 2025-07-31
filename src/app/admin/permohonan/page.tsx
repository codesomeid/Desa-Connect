import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ApplicationList } from "./application-list";

export default function ApplicationManagementPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Permohonan</h1>
        <p className="text-muted-foreground">
          Kelola, verifikasi, dan proses semua permohonan surat yang masuk.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Permohonan Masuk</CardTitle>
          <CardDescription>
            Berikut adalah daftar semua permohonan yang telah diajukan oleh warga.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationList />
        </CardContent>
      </Card>
    </div>
  );
}
