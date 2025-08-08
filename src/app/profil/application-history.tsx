
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { type Status } from "@/app/lacak/status-timeline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListChecks } from "lucide-react";
import Link from "next/link";
import { applications, letterTypes } from "@/lib/data";

// Dummy user ID for demonstration
const currentUserId = "user-001";

const statusVariant: { [key in Status]?: "default" | "secondary" | "outline" | "destructive" } = {
  'Baru Masuk': 'secondary',
  'Diproses Staf': 'outline',
  'Verifikasi Kasi': 'outline',
  'Persetujuan Sekdes': 'outline',
  'Menunggu TTE Kades': 'default',
  'Selesai & Dapat Diambil': 'default',
}


export function ApplicationHistory() {
  // Filter applications for the current user
  const userApplications = applications.filter(app => app.applicantId === currentUserId);

  const getLetterTypeName = (letterTypeId: string) => {
    return letterTypes.find(lt => lt.id === letterTypeId)?.name || 'Tidak Dikenali';
  }

  return (
    <Card>
        <CardHeader>
          <CardTitle>Riwayat Permohonan Saya</CardTitle>
          <CardDescription>
            Daftar semua permohonan surat yang pernah Anda ajukan.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>ID Permohonan</TableHead>
                <TableHead>Jenis Surat</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userApplications.map((app) => (
                <TableRow key={app.id}>
                    <TableCell className="font-mono text-muted-foreground text-xs">{app.id}</TableCell>
                    <TableCell className="font-medium">{getLetterTypeName(app.letterTypeId)}</TableCell>
                    <TableCell>{new Date(app.submissionDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                    <TableCell>
                    <Badge variant={statusVariant[app.status] ?? 'secondary'}>
                        {app.status}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                           <Link href={`/lacak?id=${app.id}`}>
                             <ListChecks className="mr-2 h-3.5 w-3.5" />
                                Lacak
                            </Link>
                        </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
