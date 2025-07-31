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
import { Eye, FilePlus2, Loader2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const formSchema = z.object({
  letterName: z.string().min(5, { message: "Nama surat minimal 5 karakter." }),
  description: z
    .string()
    .min(10, { message: "Deskripsi minimal 10 karakter." }),
  icon: z.string().optional(),
  template: z
    .string()
    .min(20, { message: "Template surat minimal 20 karakter." }),
});

const dummyDataForPreview = {
  nama_lengkap: "Budi Santoso",
  nik: "3501234567890001",
  keperluan: "Membuka rekening bank",
  tanggal_surat: new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  nama_usaha: "Toko Kelontong Berkah",
  alamat_usaha: "Jl. Merdeka No. 10",
  // Add other dummy data as needed
};

export function AddLetterTypeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [previewContent, setPreviewContent] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      letterName: "",
      description: "",
      icon: "FileText",
      template:
        "Yang bertanda tangan di bawah ini, Kepala DesaConnect, menerangkan bahwa:\n\nNama: {{nama_lengkap}}\nNIK: {{nik}}\n\nAdalah benar warga kami yang berdomisili di DesaConnect. Surat keterangan ini dibuat untuk keperluan {{keperluan}}.\n\nDemikian surat ini dibuat untuk dipergunakan sebagaimana mestinya.\n\nDesaConnect, {{tanggal_surat}}",
    },
  });

  const generatePreview = () => {
    let content = form.getValues("template");
    for (const [key, value] of Object.entries(dummyDataForPreview)) {
      content = content.replace(new RegExp(`{{${key}}}`, "g"), value);
    }
    setPreviewContent(content);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Jenis Surat Dibuat",
        description: `Jenis surat "${values.letterName}" telah berhasil ditambahkan.`,
      });
      form.reset();
      setIsLoading(false);
    }, 1500);
  }

  return (
    <Dialog>
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
            name="template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template Surat</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan template surat di sini. Gunakan {{placeholder}} untuk data dinamis."
                    rows={10}
                    {...field}
                  />
                </FormControl>
                 <p className="text-xs text-muted-foreground pt-1">
                  Gunakan placeholder seperti `{{nama_lengkap}}`, `{{nik}}`, `{{keperluan}}`.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-2">
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={generatePreview}
              >
                <Eye className="mr-2 h-4 w-4" />
                Lihat Pratinjau
              </Button>
            </DialogTrigger>
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
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Pratinjau Surat</DialogTitle>
          <DialogDescription>
            Ini adalah tampilan surat yang akan dihasilkan berdasarkan template
            Anda dan data contoh.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 max-h-[60vh] overflow-y-auto rounded-md border bg-secondary/30 p-6">
          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
            {previewContent}
          </pre>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Tutup</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
