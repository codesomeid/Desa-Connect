
'use client';

import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import type { PermohonanSurat, Masyarakat } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface ProcessApplicationButtonProps {
    application: PermohonanSurat & { pemohon: Masyarakat };
}

export default function ProcessApplicationButton({ application }: ProcessApplicationButtonProps) {
    const router = useRouter();

    const handleProcess = () => {
        router.push(`/admin/permohonan/${application.id_permohonan}/proses`);
    };

    return (
        <Button
            className="w-full"
            onClick={handleProcess}
        >
            <PlayCircle className="mr-2 h-4 w-4" />
            Proses Permohonan
        </Button>
    );
}
