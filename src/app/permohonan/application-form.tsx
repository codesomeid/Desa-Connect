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
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy user data, assuming user is logged in.
// In a real app, this would come from an auth context or session.
const loggedInUser = {
  fullName: "Budi Santoso",
  nik: "3501234567890001",
};

const formSchema = z.object({
  fullName: z.string(),
  nik: z.string(),
  letterType: z.string({
    required_error: "Silakan pilih jenis surat.",
  }),
  purpose: z.string().min(10, { message: "Keperluan minimal 10 karakter." }),
});

export function ApplicationForm({ selectedLetterType }: { selectedLetterType?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: loggedInUser.fullName,
      nik: loggedInUser.nik,
      letterType: selectedLetterType,
      purpose: "",
    },
  });

  const formData = form.watch();
  const purposeValue = form.watch("purpose");

  useEffect(() => {
    if (selectedLetterType) {
        form.setValue("letterType", selectedLetterType);
    }
  }, [selectedLetterType, form]);

  function onReview(values: z.infer<typeof formSchema>) {
    setShowReviewDialog(true);
  }

  function onFinalSubmit() {
    setIsSubmitting(true);
    setShowReviewDialog(false);

    // We add the logged in user data to the submission values
    const submissionValues = {
        ...form.getValues(),
        fullName: loggedInUser.fullName,
        nik: loggedInUser.nik,
    }
    console.log(submissionValues);

    // Simulate API call
    setTimeout(() => {
      const newId = `DS-CNCT-${Date.now()}`;
      setApplicationId(newId);
      setShowSuccessDialog(true);
      setIsSubmitting(false);
      form.reset({
        fullName: loggedInUser.fullName,
        nik: loggedInUser.nik,
        purpose: "",
        letterType: selectedLetterType,
      });
    }, 1500);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onReview)} className="space-y-6">
           {!selectedLetterType && (
            <FormField
              control={form.control}
              name="letterType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Surat</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis surat yang diajukan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Surat Pengantar Keterangan Catatan Kepolisian">Surat Pengantar Keterangan Catatan Kepolisian</SelectItem>
                        <SelectItem value="Surat Keterangan Usaha (SKU)">Surat Keterangan Usaha (SKU)</SelectItem>
                        <SelectItem value="Surat Keterangan Domisili Perusahaan/Yayasan">Surat Keterangan Domisili Perusahaan/Yayasan</SelectItem>
                        <SelectItem value="Surat Keterangan Laporan Kehilangan">Surat Keterangan Laporan Kehilangan</SelectItem>
                        <SelectItem value="Surat Keterangan Kepemilikan Rumah">Surat Keterangan Kepemilikan Rumah</SelectItem>
                        <SelectItem value="Surat Keterangan Laporan Kematian (Ahli Waris)">Surat Keterangan Laporan Kematian (Ahli Waris)</SelectItem>
                        <SelectItem value="Surat Keterangan Kematian (Akta Kematian)">Surat Keterangan Kematian (Akta Kematian)</SelectItem>
                        <SelectItem value="Surat Keterangan Status Perkawinan">Surat Keterangan Status Perkawinan</SelectItem>
                        <SelectItem value="Surat Keterangan Beda Data Kependudukan">Surat Keterangan Beda Data Kependudukan</SelectItem>
                        <SelectItem value="Surat Keterangan Domisili Calon Jemaah Haji">Surat Keterangan Domisili Calon Jemaah Haji</SelectItem>
                        <SelectItem value="Surat Keterangan Pindah Domisili">Surat Keterangan Pindah Domisili</SelectItem>
                        <SelectItem value="Surat Keterangan Kepemilikan Tanah">Surat Keterangan Kepemilikan Tanah</SelectItem>
                        <SelectItem value="Surat Keterangan Jalan">Surat Keterangan Jalan</SelectItem>
                        <SelectItem value="Surat Keterangan JPK-KS">Surat Keterangan JPK-KS</SelectItem>
                        <SelectItem value="Surat Keterangan Tidak Mampu (SKTM)">Surat Keterangan Tidak Mampu (SKTM)</SelectItem>
                        <SelectItem value="Surat Keterangan Untuk Nikah">Surat Keterangan Untuk Nikah</SelectItem>
                        <SelectItem value="Surat Keterangan Bekerja di Luar Negeri">Surat Keterangan Bekerja di Luar Negeri</SelectItem>
                        <SelectItem value="Surat Keterangan Orang Tua">Surat Keterangan Orang Tua</SelectItem>
                        <SelectItem value="Surat Keterangan Ahli Waris">Surat Keterangan Ahli Waris</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nik"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Nomor Induk Kependudukan (NIK)</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keperluan</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Jelaskan keperluan Anda untuk surat ini"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center text-xs">
                  <FormMessage />
                  <p className={cn(
                    "text-muted-foreground",
                    (purposeValue?.length || 0) < 10 && "text-destructive"
                  )}>
                    {purposeValue?.length || 0} / 10 karakter
                  </p>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
            Tinjau & Ajukan
          </Button>
        </form>
      </Form>
      
      {/* Review Dialog */}
      <AlertDialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tinjau Permohonan Anda</AlertDialogTitle>
            <AlertDialogDescription>
              Pastikan data yang Anda masukkan sudah benar sebelum mengajukan permohonan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-muted-foreground">Jenis Surat</p>
              <p>{formData.letterType}</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Nama Pemohon</p>
              <p>{formData.fullName}</p>
            </div>
             <div>
              <p className="font-semibold text-muted-foreground">NIK</p>
              <p>{formData.nik}</p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Keperluan</p>
              <p>{formData.purpose}</p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={onFinalSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengajukan...
                </>
              ) : (
                "Ya, Ajukan Sekarang"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permohonan Berhasil Diajukan!</AlertDialogTitle>
            <AlertDialogDescription>
              Permohonan Anda telah kami terima. Silakan simpan nomor pelacakan Anda. Anda dapat melacak status permohonan Anda di halaman 'Lacak Permohonan'.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Nomor Pelacakan Anda</p>
            <p className="text-lg font-bold text-accent">{applicationId}</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>
              Mengerti
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
