
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { letterTypes } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const applicationFormSchema = z.object({
  letterTypeId: z.string({
    required_error: 'Silakan pilih jenis surat.',
  }),
  reason: z
    .string()
    .min(10, {
      message: 'Alasan harus diisi minimal 10 karakter.',
    })
    .max(500, {
      message: 'Alasan tidak boleh lebih dari 500 karakter.',
    }),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export default function NewApplicationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
  });

  function onSubmit(data: ApplicationFormValues) {
    setIsLoading(true);
    // In a real app, this would create a new `Permohonan_Surat` entry in the database.
    console.log('Submitting application:', {
        id_masyarakat: 1, // FAKE_LOGGED_IN_USER_ID
        id_jenis_surat: parseInt(data.letterTypeId),
        alasan_permohonan: data.reason,
        status: 'Diajukan',
        tanggal_permohonan: new Date().toISOString()
    });
    
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        toast({
            title: "Permohonan Terkirim!",
            description: "Permohonan surat Anda telah berhasil dikirim dan akan segera diproses.",
        });
        router.push('/warga/dashboard');
    }, 1500);
  }

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/warga/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Kembali ke Dashboard</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buat Permohonan Surat Baru</h1>
          <p className="text-muted-foreground">
            Pilih jenis surat yang Anda butuhkan dan jelaskan keperluannya.
          </p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Formulir Permohonan</CardTitle>
          <CardDescription>
            Pastikan data yang Anda masukkan sudah benar sebelum mengirim.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="letterTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Surat yang Diperlukan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih satu jenis surat..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {letterTypes.map(lt => (
                          <SelectItem key={lt.id_jenis_surat} value={lt.id_jenis_surat.toString()}>
                            {lt.nama_surat}
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
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alasan atau Keperluan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Jelaskan secara singkat dan jelas untuk apa surat ini Anda perlukan. Contoh: Untuk melamar pekerjaan di PT. Sejahtera Abadi."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                   {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Kirim Permohonan
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
