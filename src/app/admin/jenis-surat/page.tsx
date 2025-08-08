
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import { letterTypes as initialLetterTypes, LetterType } from '@/lib/data';
import { AddLetterTypeForm } from './add-letter-type-form';
import { EditLetterTypeForm } from './edit-letter-type-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LetterTypeManagementPage() {
  const [letterTypes, setLetterTypes] = useState<LetterType[]>(initialLetterTypes);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<LetterType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddLetter = (newLetter: Omit<LetterType, 'id' | 'icon'> & { icon: string }) => {
    // In a real app, this would involve a database call.
    const createdLetter: LetterType = {
      ...newLetter,
      id: (letterTypes.length + 1).toString(),
      // The icon handling needs to be resolved to a component
      // This is a placeholder
      icon: <FilePlus className="h-6 w-6 text-accent" />,
    };
    setLetterTypes(prev => [...prev, createdLetter]);
    setShowAddForm(false);
  };

  const handleEditLetter = (updatedLetter: LetterType) => {
    setLetterTypes(prev =>
      prev.map(lt => (lt.id === updatedLetter.id ? updatedLetter : lt))
    );
    setShowEditForm(false);
    setSelectedLetter(null);
  };

  const handleDeleteLetter = (letterId: string) => {
     setLetterTypes(prev => prev.filter(lt => lt.id !== letterId));
  };
  
  const openEditDialog = (letter: LetterType) => {
    setSelectedLetter(letter);
    setShowEditForm(true);
  };

  const filteredLetterTypes = letterTypes.filter(lt =>
    lt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Jenis Surat</h1>
          <p className="text-muted-foreground">
            Tambah, ubah, atau hapus jenis surat yang tersedia untuk warga.
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <PlusCircle className="mr-2" />
          Tambah Jenis Surat
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Jenis Surat</CardTitle>
          <CardDescription>
            Berikut adalah semua jenis surat yang saat ini tersedia di aplikasi.
          </CardDescription>
           <div className="relative pt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Cari jenis surat..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 pr-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredLetterTypes.map(letter => (
                <Card key={letter.id} className="flex flex-col">
                  <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      {letter.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{letter.name}</CardTitle>
                    </div>
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(letter)}>
                          Ubah
                        </DropdownMenuItem>
                         <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                Hapus
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus jenis surat secara permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteLetter(letter.id)}>
                                Ya, Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {letter.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {showAddForm && (
        <AddLetterTypeForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddLetter}
        />
      )}

      {showEditForm && selectedLetter && (
        <EditLetterTypeForm
          isOpen={showEditForm}
          onClose={() => {
            setShowEditForm(false);
            setSelectedLetter(null);
          }}
          onSubmit={handleEditLetter}
          letterType={selectedLetter}
        />
      )}
    </div>
  );
}
