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

type Application = {
  id: string;
  applicantName: string;
  letterType: string;
  submissionDate: string;
  status: Status;
};

const applications: Application[] = [
  {
    id: "DS-CNCT-1689340",
    applicantName: "Siti Aminah",
    letterType: "Surat Keterangan Usaha (SKU)",
    submissionDate: "2024-07-20",
    status: "Diterima"
  },
  {
    id: "DS-CNCT-1689339",
    applicantName: "Ahmad Dahlan",
    letterType: "Surat Keterangan Tidak Mampu (SKTM)",
    submissionDate: "2024-07-20",
    status: "Diproses"
  },
  {
    id: "DS-CNCT-1689338",
    applicantName: "Rina Fitriani",
    letterType: "Surat Pengantar Keterangan Catatan Kepolisian",
    submissionDate: "2024-07-19",
    status: "Verifikasi Kasi"
  },
  {
    id: "DS-CNCT-1689337",
    applicantName: "Joko Susilo",
    letterType: "Surat Keterangan Kematian (Akta Kematian)",
    submissionDate: "2024-07-18",
    status: "Persetujuan Sekdes"
  },
  {
    id: "DS-CNCT-1689336",
    applicantName: "Dewi Lestari",
    letterType: "Surat Keterangan Pindah Domisili",
    submissionDate: "2024-07-18",
    status: "Dapat Diambil"
  },
];

const statusVariant: { [key in Status]: "default" | "secondary" | "outline" | "destructive" } = {
  'Diterima': 'secondary',
  'Diproses': 'outline',
  'Verifikasi Kasi': 'outline',
  'Persetujuan Sekdes': 'outline',
  'TTE Kades': 'default',
  'Dapat Diambil': 'default',
}


export function ApplicationList() {
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
            <TableCell className="font-medium">{app.applicantName}</TableCell>
            <TableCell>{app.letterType}</TableCell>
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
                  <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
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
