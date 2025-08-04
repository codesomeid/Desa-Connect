
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

type Application = {
  id: string;
  letterType: string;
  submissionDate: string;
  status: Status;
};

// Dummy data for user's application history
const history: Application[] = [
  {
    id: "DS-CNCT-1689336",
    letterType: "Surat Keterangan Pindah Domisili",
    submissionDate: "2024-07-18",
    status: "Selesai & Dapat Diambil"
  },
  {
    id: "DS-CNCT-1689250",
    letterType: "Surat Keterangan Usaha (SKU)",
    submissionDate: "2024-06-12",
    status: "Selesai & Dapat Diambil"
  },
    {
    id: "DS-CNCT-1689105",
    letterType: "Surat Pengantar Keterangan Catatan Kepolisian",
    submissionDate: "2024-05-01",
    status: "Selesai & Dapat Diambil"
  },
];

const statusVariant: { [key in Status]?: "default" | "secondary" | "outline" | "destructive" } = {
  'Baru Masuk': 'secondary',
  'Diproses Staf': 'outline',
  'Verifikasi Kasi': 'outline',
  'Persetujuan Sekdes': 'outline',
  'Menunggu TTE Kades': 'default',
  'Selesai & Dapat Diambil': 'default',
}


export function ApplicationHistory() {
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
                {history.map((app) => (
                <TableRow key={app.id}>
                    <TableCell className="font-mono text-muted-foreground text-xs">{app.id}</TableCell>
                    <TableCell className="font-medium">{app.letterType}</TableCell>
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
