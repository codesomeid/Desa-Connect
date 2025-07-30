import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, User } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <header className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-primary">DesaConnect</h1>
            <p className="text-muted-foreground">
                Selamat datang! Silakan pilih peran Anda untuk masuk.
            </p>
        </header>
        <div className="grid grid-cols-1 gap-6">
            <Link href="/login/warga">
                 <Card className="hover:border-accent hover:shadow-lg transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-4">
                            <User className="h-8 w-8 text-accent" />
                            <span>Masuk sebagai Warga</span>
                        </CardTitle>
                        <CardDescription>Untuk mengajukan surat, melacak permohonan, dan melihat pengumuman.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <Button className="w-full bg-accent hover:bg-accent/90">
                            <span>Lanjutkan sebagai Warga</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </Link>
             <Link href="/login/aparatur">
                 <Card className="hover:border-primary hover:shadow-lg transition-all">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-4">
                            <Shield className="h-8 w-8 text-primary" />
                            <span>Masuk sebagai Aparatur Desa</span>
                        </CardTitle>
                        <CardDescription>Untuk mengelola permohonan, pengumuman, dan data warga.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <Button className="w-full">
                            <span>Lanjutkan sebagai Aparatur</span>
                             <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </Link>
        </div>
      </div>
    </div>
  );
}
