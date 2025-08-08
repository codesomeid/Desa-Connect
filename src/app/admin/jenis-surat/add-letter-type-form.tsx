
'use client';

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
import { FilePlus, icons } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JenisSurat } from '@/lib/data';

const formSchema = z.object({
  nama_surat: z.string().min(5, { message: 'Nama surat minimal 5 karakter.' }),
  deskripsi: z.string().min(10, { message: 'Deskripsi minimal 10 karakter.' }),
  kode_surat: z.string().min(1, { message: 'Kode surat tidak boleh kosong.' }),
  icon: z.string().min(1, { message: 'Ikon harus dipilih.' }),
  template: z
    .any()
    .refine(files => files?.length === 1, 'Template DOCX harus diunggah.')
    .refine(
      files => files?.[0]?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'File harus berupa DOCX.'
    ),
});

type IconName = keyof typeof icons;
const iconNames = Object.keys(icons) as IconName[];

interface AddLetterTypeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddLetterTypeForm({ isOpen, onClose, onSubmit }: AddLetterTypeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_surat: '',
      deskripsi: '',
      kode_surat: '',
      icon: '',
      template: undefined,
    },
  });
  
  const templateRef = form.register("template");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Jenis Surat Baru</DialogTitle>
          <DialogDescription>
            Isi detail di bawah ini untuk menambahkan jenis surat baru ke sistem.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nama_surat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Surat</FormLabel>
                  <FormControl>
                    <Input placeholder="cth. Surat Keterangan Domisili" {...field} />
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
                    <Input placeholder="cth. 474.1" {...field} />
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
                    <Textarea placeholder="Jelaskan kegunaan surat ini..." {...field} />
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
                        <SelectValue placeholder="Pilih ikon yang sesuai..." />
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
                        <FormLabel>Template Surat (DOCX)</FormLabel>
                        <FormControl>
                            <Input type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" {...templateRef} />
                        </FormControl>
                        <FormMessage />
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
                <FilePlus className="mr-2 h-4 w-4" />
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
