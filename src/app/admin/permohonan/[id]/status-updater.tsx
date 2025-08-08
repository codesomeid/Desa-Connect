
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ApplicationStatus } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface StatusUpdaterProps {
  currentStatus: ApplicationStatus;
  applicationId: string;
}

const statusFlow: { [key in ApplicationStatus]?: ApplicationStatus[] } = {
  'Pending': ['Diproses', 'Ditolak'],
  'Diproses': ['Siap Diambil', 'Ditolak'],
  'Siap Diambil': ['Selesai'],
  'Selesai': [],
  'Ditolak': [],
};

export default function StatusUpdater({ currentStatus, applicationId }: StatusUpdaterProps) {
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | ''>('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const possibleNextStatuses = statusFlow[currentStatus] || [];

  const handleSubmit = () => {
    if (!selectedStatus) {
      toast({
        variant: 'destructive',
        title: 'Gagal',
        description: 'Silakan pilih status baru.',
      });
      return;
    }

    if (selectedStatus === 'Ditolak' && !notes) {
       toast({
        variant: 'destructive',
        title: 'Gagal',
        description: 'Catatan penolakan wajib diisi.',
      });
      return;
    }

    setIsLoading(true);
    // In a real app, you'd make an API call here.
    console.log({
      applicationId,
      newStatus: selectedStatus,
      notes: selectedStatus === 'Ditolak' ? notes : undefined,
    });

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Sukses',
        description: `Status permohonan berhasil diubah menjadi "${selectedStatus}". Halaman akan dimuat ulang.`,
      });
      
      // Force a page reload to reflect status changes.
      // In a real app with a proper backend, you might use client-side state management.
      window.location.reload();
    }, 1000);
  };

  if (possibleNextStatuses.length === 0) {
    return <p className="text-sm text-muted-foreground">Tidak ada aksi status lebih lanjut untuk permohonan ini.</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Ubah Status Permohonan</label>
        <Select
          value={selectedStatus}
          onValueChange={(value) => setSelectedStatus(value as ApplicationStatus)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih status berikutnya..." />
          </SelectTrigger>
          <SelectContent>
            {possibleNextStatuses.map(status => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedStatus === 'Ditolak' && (
        <div>
            <label className="text-sm font-medium">Catatan Penolakan (Wajib)</label>
            <Textarea
                placeholder="Jelaskan alasan mengapa permohonan ditolak..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isLoading}
            />
        </div>
      )}

      <Button onClick={handleSubmit} disabled={isLoading || !selectedStatus} className="w-full">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Perbarui Status
      </Button>
    </div>
  );
}
