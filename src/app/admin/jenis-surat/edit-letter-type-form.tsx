
'use client';

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Save, icons } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JenisSurat } from '@/lib/data';

const formSchema = z.object({
  id_jenis_surat: z.number(),
  nama_surat: z.string().min(5, { message: 'Nama surat minimal 5 karakter.' }),
  deskripsi: z.string().min(10, { message: 'Deskripsi minimal 10 karakter.' }),
  kode_surat: z.string().min(1, { message: 'Kode surat tidak boleh kosong.' }),
  icon: z.string().min(1, { message: 'Ikon harus dipilih.' }),
  template: z.any().optional().refine(
    (files) =>
      !files ||
      files.length === 0 ||
      files?.[0]?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'File harus berupa DOCX.'
  ),
});

type IconName = keyof typeof icons;
const iconNames = Object.keys(icons) as IconName[];

interface EditLetterTypeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: JenisSurat) => void;
  letterType: JenisSurat;
}

export function EditLetterTypeForm({ isOpen, onClose, onSubmit, letterType }: EditLetterTypeFormProps) {
  
  // This is a simplification. A real app would need a more robust mapping.
  const getIconName = (letterTypeId: number): string => {
      // This is a weak mapping, but works for this controlled case.
      const iconCycle = ['Home', 'FileText', 'FileUp', 'Shield'];
      return iconCycle[letterTypeId % iconCycle.length] || 'FileText';
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_jenis_surat: letterType.id_jenis_surat,
      nama_surat: letterType.nama_surat,
      deskripsi: letterType.deskripsi,
      kode_surat: letterType.kode_surat,
      icon: getIconName(letterType.id_jenis_surat),
      template: undefined,
    },
  });
  
  useEffect(() => {
    form.reset({
      id_jenis_surat: letterType.id_jenis_surat,
      nama_surat: letterType.nama_surat,
      deskripsi: letterType.deskripsi,
      kode_surat: letterType.kode_surat,
      icon: getIconName(letterType.id_jenis_surat),
      template: undefined,
    });
  }, [letterType, form]);

  const templateRef = form.register("template");

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    const submittedData: JenisSurat = {
        ...values,
        template_path: values.template?.[0] ? `/templates/${values.template[0].name}` : letterType.template_path,
    };
    onSubmit(submittedData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ubah Jenis Surat</DialogTitle>
          <DialogDescription>
            Perbarui detail untuk jenis surat ini.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nama_surat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Surat</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kode_surat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Surat</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Singkat</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ikon Surat</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih ikon..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {iconNames.map(iconName => (
                        <SelectItem key={iconName} value={iconName}>
                          {iconName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ubah Template (DOCX)</FormLabel>
                        <FormControl>
                            <Input type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" {...templateRef} />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground">
                            Kosongkan jika tidak ingin mengubah template yang ada.
                        </p>
                    </FormItem>
                )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
