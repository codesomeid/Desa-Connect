
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { LetterType } from "@/lib/data";

const formSchema = z.object({
  letterName: z.string().min(5, { message: "Nama surat minimal 5 karakter." }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter." }),
  icon: z.string().optional(),
});

interface EditLetterTypeFormProps {
  letterType: LetterType;
  onSuccess: () => void;
}

export function EditLetterTypeForm({ letterType, onSuccess }: EditLetterTypeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Lucide icon names don't map directly from React components, so we need a way to get the name string.
  // This is a simplification. A real app would need a more robust mapping.
  const getIconName = (icon: React.ReactNode): string | undefined => {
    if (React.isValidElement(icon)) {
      const iconType = (icon.type as any).displayName;
      // This is a weak mapping, but works for this controlled case.
      const map: {[key:string]: string} = {
        'FileText': 'FileText',
        'Shield': 'Shield',
        'Building2': 'Building2',
        'Home': 'Home',
        'Users': 'Users'
      };
      return map[iconType] || undefined;
    }
    return undefined;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      letterName: letterType.name,
      description: letterType.description,
      icon: getIconName(letterType.icon) || 'FileText',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // In a real app, you would send this to your backend to update the data.
    setTimeout(() => {
      console.log("Updated data:", {id: letterType.id, ...values});
      toast({
        title: "Perubahan Disimpan",
        description: `Jenis surat "${values.letterName}" telah berhasil diperbarui.`,
      });
      setIsLoading(false);
      onSuccess(); // Call the callback to close the dialog
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="letterName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Jenis Surat</FormLabel>
              <FormControl>
                <Input
                  placeholder="Contoh: Surat Keterangan Usaha"
                  {...field}
                />
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
                <Input
                  placeholder="Jelaskan kegunaan surat ini"
                  {...field}
                />
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih ikon untuk surat" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FileText">File Umum</SelectItem>
                  <SelectItem value="Shield">Keamanan (SKCK)</SelectItem>
                  <SelectItem value="Building2">Usaha/Bangunan</SelectItem>
                  <SelectItem value="Home">Rumah/Domisili</SelectItem>
                  <SelectItem value="Users">Keluarga/Ahli Waris</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <p className="text-xs text-muted-foreground pt-1">
          Perubahan pada template PDF tidak dapat dilakukan di sini.
        </p>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </Form>
  );
}

