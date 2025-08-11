
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Shield, UserCog } from 'lucide-react';

export default function RoleSelectionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">DesaConnect</h1>
          <p className="text-muted-foreground">
            Pilih peran Anda untuk melanjutkan
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                <span>Warga</span>
              </CardTitle>
              <CardDescription>
                Masuk sebagai warga untuk mengajukan permohonan surat dan melacak status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/login/warga">Masuk sebagai Warga</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <span>Aparat Desa</span>
              </CardTitle>
              <CardDescription>
                Masuk ke panel admin untuk mengelola permohonan, surat, dan pengguna.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/login/aparatur">Masuk sebagai Aparat</Link>
              </Button>
            </CardContent>
          </Card>
           <Card className="border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-6 w-6 text-primary" />
                <span className="text-primary">Super Admin</span>
              </CardTitle>
              <CardDescription>
                Masuk dengan akses penuh ke semua fitur untuk pengujian dan administrasi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/login/superadmin">Masuk sebagai Super Admin</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
         <footer className="text-center text-sm text-muted-foreground">
          © 2024 DesaConnect
        </footer>
      </div>
    </div>
  );
}
