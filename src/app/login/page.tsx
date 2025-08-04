import { LoginForm } from "./login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, User } from "lucide-react";

export default function RoleSelectionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <header className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary">DesaConnect</h1>
          <p className="text-muted-foreground">
            Aplikasi Layanan Desa Terpadu
          </p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>Pilih Peran Anda</CardTitle>
            <CardDescription>
              Masuk sebagai warga untuk mengajukan surat atau sebagai aparatur untuk mengelola sistem.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
             <Button asChild size="lg" className="h-20 flex-col gap-2">
                <Link href="/login/warga">
                    <User className="h-6 w-6"/>
                    <span>Masuk sebagai Warga</span>
                </Link>
             </Button>
             <Button asChild size="lg" variant="outline" className="h-20 flex-col gap-2">
                <Link href="/login/aparatur">
                    <Shield className="h-6 w-6"/>
                    <span>Masuk sebagai Aparatur Desa</span>
                </Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
