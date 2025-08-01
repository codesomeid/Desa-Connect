
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FilePlus2, Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  letterName: z.string().min(5, { message: "Nama surat minimal 5 karakter." }),
  description: z
    .string()
    .min(10, { message: "Deskripsi minimal 10 karakter." }),
  icon: z.string().optional(),
  templateFile: z
    .instanceof(typeof window !== 'undefined' ? File : Object, { message: "File template harus diunggah." })
    .refine((file) => file.size > 0, "File template tidak boleh kosong.")
    .refine(
      (file) => file.type === "application/pdf",
      "Hanya file PDF yang diizinkan."
    ),
});

export function AddLetterTypeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      letterName: "",
      description: "",
      icon: "FileText",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // In a real app, you would upload the file to storage.
    setTimeout(() => {
      console.log({
        ...values,
        templateFileName: values.templateFile.name,
        templateFileType: values.templateFile.type,
        templateFileSize: values.templateFile.size,
      });
      toast({
        title: "Jenis Surat Dibuat",
        description: `Jenis surat "${values.letterName}" dengan template PDF telah berhasil ditambahkan.`,
      });
      form.reset();
      // Manually clear file input if needed, though reset should handle it.
      setIsLoading(false);
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Textarea
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
        <FormField
          control={form.control}
          name="templateFile"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Template Surat (PDF)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                  {...rest}
                  className="file:text-foreground"
                />
              </FormControl>
              <p className="text-xs text-muted-foreground pt-1">
                Unggah file PDF yang akan digunakan sebagai template.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FilePlus2 className="mr-2 h-4 w-4" />
            )}
            Tambah Jenis Surat
          </Button>
        </div>
      </form>
    </Form>
  );
}
