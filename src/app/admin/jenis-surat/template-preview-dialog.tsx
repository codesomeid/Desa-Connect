
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { JenisSurat } from '@/lib/data';
import Image from 'next/image';
import { Download } from 'lucide-react';

interface TemplatePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  letterType: JenisSurat;
}

export function TemplatePreviewDialog({ isOpen, onClose, letterType }: TemplatePreviewDialogProps) {

  const handleDownload = () => {
    // In a real app, this would trigger a download from the template_path URL.
    // For now, it's just a simulation.
    console.log(`Downloading template from: ${letterType.template_path}`);
  };

  const fileName = letterType.template_path.split('/').pop();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pratinjau Template: {letterType.nama_surat}</DialogTitle>
          <DialogDescription>
            Ini adalah pratinjau untuk file template <span className="font-mono bg-muted/80 px-1 py-0.5 rounded">{fileName}</span>.
            Di aplikasi nyata, template akan dikonversi ke PDF dan ditampilkan di sini.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 p-4 border rounded-md bg-muted/50 h-[50vh] overflow-y-auto">
            <div className="relative w-full h-full">
                 <Image
                    src="https://placehold.co/800x1131.png"
                    alt="Document preview placeholder"
                    layout="fill"
                    objectFit="contain"
                    data-ai-hint="document paper"
                 />
            </div>
        </div>

        <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Unduh Template (.docx)
            </Button>
            <DialogClose asChild>
                <Button type="button">Tutup</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
