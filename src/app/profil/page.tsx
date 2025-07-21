import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, User, LogOut } from "lucide-react";

export default function ProfilePage() {
    // Dummy user data
    const user = {
        name: "Budi Santoso",
        email: "budi.santoso@email.com",
        phone: "0812-3456-7890",
        nik: "3501234567890001",
        avatar: "https://placehold.co/100x100.png"
    };

    return (
        <div className="space-y-8">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Profil Saya</h1>
                <p className="text-muted-foreground">Lihat dan kelola informasi akun Anda.</p>
            </header>
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="flex flex-col items-center text-center space-y-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile picture" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <CardDescription>Warga DesaConnect</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Separator />
                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-4">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-muted-foreground">NIK</p>
                                <p className="font-medium">{user.nik}</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-muted-foreground">Email</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                                <p className="text-muted-foreground">Nomor Telepon</p>
                                <p className="font-medium">{user.phone}</p>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" className="flex-1">Ubah Profil</Button>
                        <Button variant="destructive" className="flex-1">
                            <LogOut className="mr-2 h-4 w-4" />
                            Keluar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
