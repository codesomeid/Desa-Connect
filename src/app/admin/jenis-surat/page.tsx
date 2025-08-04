
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AddLetterTypeForm } from "./add-letter-type-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Building2, FileText, Shield, MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const letterTypes = [
  {
    name: "Surat Pengantar Keterangan Catatan Kepolisian",
    description: "Untuk pembuatan SKCK.",
    icon: <Shield className="h-5 w-5 text-muted-foreground" />,
    templateUrl: "/skck_template.pdf", // Dummy URL
  },
  {
    name: "Surat Keterangan Usaha (SKU)",
    description: "Untuk keperluan membuka atau menjalankan usaha.",
    icon: <Building2 className="h-5 w-5 text-muted-foreground" />,
    templateUrl: "/sku_template.pdf", // Dummy URL
  },
  {
    name: "Surat Keterangan Kematian (Akta Kematian)",
    description: "Sebagai pengantar untuk pembuatan akta kematian.",
    icon: <FileText className="h-5 w-5 text-muted-foreground" />,
    templateUrl: "/kematian_template.pdf", // Dummy URL
  },
];

const handleViewTemplate = (url: string) => {
  window.open(url, "_blank");
};


export default function LetterTypeManagementPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Jenis Surat</h1>
        <p className="text-muted-foreground">
          Tambah, lihat, dan kelola jenis surat yang tersedia untuk warga.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Jenis Surat Baru</CardTitle>
                    <CardDescription>Buat jenis surat baru yang dapat diajukan oleh warga.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddLetterTypeForm />
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle>Daftar Jenis Surat</CardTitle>
                    <CardDescription>Daftar semua jenis surat yang saat ini tersedia dalam sistem.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-12">Ikon</TableHead>
                            <TableHead>Nama Surat</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {letterTypes.map((letter) => (
                            <TableRow key={letter.name}>
                                <TableCell>{letter.icon}</TableCell>
                                <TableCell className="font-medium">{letter.name}</TableCell>
                                <TableCell className="text-muted-foreground">{letter.description}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuItem onSelect={() => handleViewTemplate(letter.templateUrl)}>
                                          <Eye className="mr-2 h-4 w-4" />
                                          Lihat Template
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>Ubah</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive hover:!text-destructive-foreground hover:!bg-destructive">
                                            Hapus
                                        </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
