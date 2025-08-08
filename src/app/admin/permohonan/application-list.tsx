
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { type Status } from "@/app/lacak/status-timeline";
import Link from "next/link";
import { applications, users, letterTypes } from "@/lib/data";

const statusVariant: { [key in Status]?: "default" | "secondary" | "outline" | "destructive" } = {
  'Baru Masuk': 'secondary',
  'Diproses Staf': 'outline',
  'Verifikasi Kasi': 'outline',
  'Persetujuan Sekdes': 'outline',
  'Menunggu TTE Kades': 'default',
  'Selesai & Dapat Diambil': 'default',
}


export function ApplicationList() {
  const getApplicantName = (applicantId: string) => {
    return users.find(user => user.id === applicantId)?.name || 'Tidak Dikenali';
  }

  const getLetterTypeName = (letterTypeId: string) => {
    return letterTypes.find(lt => lt.id === letterTypeId)?.name || 'Tidak Dikenali';
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pemohon</TableHead>
          <TableHead>Jenis Surat</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app) => (
          <TableRow key={app.id}>
            <TableCell className="font-medium">{getApplicantName(app.applicantId)}</TableCell>
            <TableCell>{getLetterTypeName(app.letterTypeId)}</TableCell>
            <TableCell>{new Date(app.submissionDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[app.status] ?? 'secondary'}>
                {app.status}
              </Badge>
            </TableCell>
            <TableCell>
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/permohonan/${app.id}`}>Lihat Detail</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Ubah Status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
