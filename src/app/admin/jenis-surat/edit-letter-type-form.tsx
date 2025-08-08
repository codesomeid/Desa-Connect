
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
import { LetterType } from '@/lib/data';

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(5, { message: 'Nama surat minimal 5 karakter.' }),
  description: z.string().min(10, { message: 'Deskripsi minimal 10 karakter.' }),
  icon: z.string().min(1, { message: 'Ikon harus dipilih.' }),
  template: z.any().optional(), // PDF template is optional on edit
});

type IconName = keyof typeof icons;
const iconNames = Object.keys(icons) as IconName[];

interface EditLetterTypeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LetterType) => void;
  letterType: LetterType;
}

export function EditLetterTypeForm({ isOpen, onClose, onSubmit, letterType }: EditLetterTypeFormProps) {
  
  // This is a simplification. A real app would need a more robust mapping.
  const getIconName = (icon: React.ReactNode): string | undefined => {
    if (React.isValidElement(icon)) {
      const iconType = (icon.type as any).displayName;
      // This is a weak mapping, but works for this controlled case.
      const map: {[key:string]: string} = {
          'Home': 'Home',
          'FileText': 'FileText',
          'FileUp': 'FileUp',
          'Shield': 'Shield'
      }
      return map[iconType];
    }
    return undefined;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: letterType.id,
      name: letterType.name,
      description: letterType.description,
      icon: getIconName(letterType.icon) || '',
      template: undefined,
    },
  });
  
  useEffect(() => {
    form.reset({
      id: letterType.id,
      name: letterType.name,
      description: letterType.description,
      icon: getIconName(letterType.icon) || '',
      template: undefined,
    });
  }, [letterType, form]);

  const templateRef = form.register("template");

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    const IconComponent = icons[values.icon as IconName];
    const submittedData: LetterType = {
        ...values,
        icon: <IconComponent className="h-6 w-6 text-accent" />,
        templateUrl: values.template?.[0] ? URL.createObjectURL(values.template[0]) : letterType.templateUrl,
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
              name="name"
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
              name="description"
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
                        <FormLabel>Ubah Template (PDF)</FormLabel>
                        <FormControl>
                            <Input type="file" accept=".pdf" {...templateRef} />
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
