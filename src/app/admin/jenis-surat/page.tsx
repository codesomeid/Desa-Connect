
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AddLetterTypeForm } from "./add-letter-type-form";
import { EditLetterTypeForm } from "./edit-letter-type-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal, Eye, Search, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { letterTypes, type LetterType } from "@/lib/data";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const handleViewTemplate = (url: string | undefined) => {
  if (url) {
    window.open(url, "_blank");
  }
};


export default function LetterTypeManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLetters, setFilteredLetters] = useState<LetterType[]>(letterTypes);
  const [editingLetter, setEditingLetter] = useState<LetterType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const results = letterTypes.filter(letter =>
      letter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLetters(results);
  }, [searchTerm]);

  const handleEditClick = (letter: LetterType) => {
    setEditingLetter(letter);
    setIsEditDialogOpen(true);
  };
  
  const handleEditSuccess = () => {
    // In a real app, you would refetch the data.
    // For now, we just close the dialog.
    setIsEditDialogOpen(false);
    setEditingLetter(null);
  }

  return (
    <>
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
                      <div className="relative mb-4">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                              placeholder="Cari nama atau deskripsi surat..."
                              className="pl-9"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                          />
                      </div>
                      <ScrollArea className="h-[500px]">
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
                                  {filteredLetters.length > 0 ? (
                                      filteredLetters.map((letter) => (
                                      <TableRow key={letter.id}>
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
                                                  <DropdownMenuItem onSelect={() => handleViewTemplate(letter.templateUrl)} disabled={!letter.templateUrl}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Lihat Template
                                                  </DropdownMenuItem>
                                                  <DropdownMenuItem onSelect={() => handleEditClick(letter)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Ubah
                                                  </DropdownMenuItem>
                                                  <DropdownMenuItem className="text-destructive hover:!text-destructive-foreground hover:!bg-destructive">
                                                      Hapus
                                                  </DropdownMenuItem>
                                                  </DropdownMenuContent>
                                              </DropdownMenu>
                                          </TableCell>
                                      </TableRow>
                                      ))
                                  ) : (
                                      <TableRow>
                                          <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                              Tidak ada surat yang cocok dengan pencarian Anda.
                                          </TableCell>
                                      </TableRow>
                                  )}
                              </TableBody>
                          </Table>
                      </ScrollArea>
                  </CardContent>
              </Card>
          </div>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ubah Jenis Surat</DialogTitle>
            <DialogDescription>
              Lakukan perubahan pada detail jenis surat. Klik simpan jika sudah selesai.
            </DialogDescription>
          </DialogHeader>
          {editingLetter && <EditLetterTypeForm letterType={editingLetter} onSuccess={handleEditSuccess} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
