import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, FileText, CheckSquare } from 'lucide-react';

// This is a mock data fetching function.
// In a real application, you would fetch this data from your database.
async function getDashboardStats() {
    // For now, we'll use some static numbers.
    return {
        totalApplications: 78,
        pendingApplications: 5,
        approvedApplications: 65,
        totalUsers: 152,
    };
}


export default async function DashboardPage() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-8">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
                <p className="text-muted-foreground">
                    Ringkasan aktivitas dan statistik penting dalam aplikasi DesaConnect.
                </p>
            </header>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Permohonan</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalApplications}</div>
                        <p className="text-xs text-muted-foreground">Jumlah semua permohonan masuk</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Permohonan Pending</CardTitle>
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingApplications}</div>
                        <p className="text-xs text-muted-foreground">Permohonan yang butuh diproses</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Permohonan Disetujui</CardTitle>
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.approvedApplications}</div>
                        <p className="text-xs text-muted-foreground">Total permohonan yang selesai</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">Jumlah warga yang terdaftar</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Aktivitas Permohonan Terkini</CardTitle>
                    <CardDescription>Grafik permohonan surat dalam seminggu terakhir.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* In a real app, this chart would be dynamic. */}
                    <div className="h-80 w-full bg-muted/50 rounded-lg flex items-center justify-center">
                        <BarChart className="h-16 w-16 text-muted-foreground/50" />
                        <span className="ml-4 text-muted-foreground">Contoh Grafik Akan Ditampilkan Di Sini</span>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
