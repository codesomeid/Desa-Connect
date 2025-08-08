
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GenerateDraftButtonProps {
    application: {
        id: string;
        userName: string;
        reason: string;
    };
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
        // 2. This endpoint would fetch the PDF template.
        // 3. It would use a library like `pdf-lib` to fill the form fields
        //    with data from the application (e.g., userName, reason, etc.).
        // 4. Return the filled PDF as a downloadable file.

        // Here, we just simulate the process.
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: 'Draf Siap Diunduh',
                description: 'Draf surat PDF berhasil dibuat.',
            });
            // Simulate a file download. In a real app, this would be the actual file URL.
            const fakePdfUrl = `/path/to/fake-draft-${application.id}.pdf`;
            const link = document.createElement('a');
            link.href = fakePdfUrl;
            link.setAttribute('download', `DRAF-${application.userName}.pdf`);
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
            Buat & Unduh Draf (PDF)
        </Button>
    );
}
