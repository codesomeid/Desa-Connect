
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Search, TriangleAlert } from "lucide-react";
import { StatusTimeline, type Status } from "./status-timeline";
import { useSearchParams } from "next/navigation";

type ApplicationStatus = {
  id: string;
  name: string;
  letterType: string;
  status: Status;
  date: Date;
};

export function ApplicationTracker() {
  const searchParams = useSearchParams();
  const idFromQuery = searchParams.get("id");

  const [appId, setAppId] = useState(idFromQuery || "");
  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (idFromQuery) {
        setAppId(idFromQuery);
        // Automatically trigger search if ID comes from query param
        handleSearch(null, idFromQuery);
    }
  }, [idFromQuery]);


  const handleSearch = (e: React.FormEvent | null, searchId?: string) => {
    e?.preventDefault();
    const finalAppId = searchId || appId;

    if (!finalAppId) {
      setError("Nomor pelacakan tidak boleh kosong.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setStatus(null);

    // Simulate API call
    setTimeout(() => {
      if (finalAppId.startsWith("DS-CNCT-")) {
        const statuses: Status[] = ['Baru Masuk', 'Diproses Staf', 'Verifikasi Kasi', 'Persetujuan Sekdes', 'Menunggu TTE Kades', 'Selesai & Dapat Diambil'];
        const randomStatusIndex = Math.floor(Math.random() * statuses.length);
        const randomStatus = statuses[randomStatusIndex];
        setStatus({
          id: finalAppId,
          name: "Budi Santoso",
          letterType: "Surat Keterangan Usaha",
          status: randomStatus,
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        });
      } else {
        setError(`Permohonan dengan nomor "${finalAppId}" tidak ditemukan. Pastikan nomor yang Anda masukkan benar.`);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Masukkan nomor pelacakan..."
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90" disabled={isLoading}>
              {isLoading && !status ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Lacak
            </Button>
          </form>
        </CardContent>
      </Card>

      {(isLoading && !status) && (
        <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Gagal Melacak</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {status && (
        <Card className="shadow-lg animate-in fade-in-50">
          <CardHeader>
            <CardTitle>Hasil Pelacakan</CardTitle>
            <CardDescription>Status permohonan untuk nomor <span className="font-semibold text-accent">{status.id}</span></CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Nama Pemohon</p>
                    <p className="font-semibold">{status.name}</p>
                </div>
                 <div>
                    <p className="text-muted-foreground">Jenis Surat</p>
                    <p className="font-semibold">{status.letterType}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Tanggal Pengajuan</p>
                    <p className="font-semibold">{status.date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
            <div>
                <p className="text-sm font-medium mb-4 text-center text-muted-foreground">Timeline Status</p>
                <StatusTimeline currentStatus={status.status} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
