
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { PermohonanSurat, Masyarakat } from '@/lib/data';

interface GenerateDraftButtonProps {
    application: PermohonanSurat & { pemohon: Masyarakat };
}

export default function GenerateDraftButton({ application }: GenerateDraftButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGenerate = async () => {
        setIsLoading(true);
        toast({
            title: 'Membuat Draf Surat...',
            description: 'Mohon tunggu, sistem sedang menghasilkan dokumen.',
        });

        // In a real application, you would:
        // 1. Call a server-side function/API endpoint.
        // 2. This endpoint would fetch the .docx template (`template_path`).
        // 3. It would use a library like `docx-templates` (Node.js) or `python-docx-template` (Python)
        //    to fill the placeholders (e.g., {{nama_lengkap}}, {{nik}}) with the application data.
        // 4. The filled .docx would be saved or converted to PDF.
        // 5. It would create a new `Surat_Keluar` entry in the database.
        // 6. Return the filled document as a downloadable file.

        // Here, we just simulate the process.
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: 'Draf Siap Diunduh',
                description: 'Draf surat berhasil dibuat dan entri Surat Keluar telah dicatat.',
            });
            // Simulate a file download. In a real app, this would be the actual file URL.
            const fakeDocxUrl = `/path/to/fake-draft-${application.id_permohonan}.docx`;
            const link = document.createElement('a');
            link.href = fakeDocxUrl;
            link.setAttribute('download', `DRAF-${application.pemohon.nama_lengkap}.docx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

        }, 2000);
    };

    return (
        <Button
            variant="outline"
            className="w-full"
            onClick={handleGenerate}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <FileDown className="mr-2 h-4 w-4" />
            )}
            Buat & Unduh Draf (DOCX)
        </Button>
    );
}
