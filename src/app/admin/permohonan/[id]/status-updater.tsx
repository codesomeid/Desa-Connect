
"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Status } from "@/app/lacak/status-timeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRightCircle, CheckCircle, Send, FileSignature, BellRing } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusUpdaterProps {
    currentStatus: Status;
    nextStatus?: Status;
}

const actionDetails: { [key in Status]?: { buttonText: string; icon: React.ReactNode; description: string; needsInput?: boolean; inputLabel?: string, inputPlaceholder?: string } } = {
    'Baru Masuk': { buttonText: 'Proses Sekarang', icon: <ArrowRightCircle className="mr-2 h-4 w-4" />, description: 'Mulai proses verifikasi data pemohon.' },
    'Diproses Staf': { buttonText: 'Verifikasi Data', icon: <CheckCircle className="mr-2 h-4 w-4" />, description: 'Konfirmasi keabsahan data NIK, nama, dan alamat.' },
    'Verifikasi Kasi': { buttonText: 'Kirim ke Sekdes', icon: <Send className="mr-2 h-4 w-4" />, description: 'Teruskan draf surat untuk persetujuan Sekretaris Desa.' },
    'Persetujuan Sekdes': { buttonText: 'Setujui & Kirim ke Kades', icon: <FileSignature className="mr-2 h-4 w-4" />, description: 'Isi nomor surat dan teruskan untuk TTE Kepala Desa.', needsInput: true, inputLabel: 'Nomor Surat', inputPlaceholder: 'Contoh: 470/123/PEM' },
    'Menunggu TTE Kades': { buttonText: 'Beri Notifikasi Selesai', icon: <BellRing className="mr-2 h-4 w-4" />, description: 'Beri tahu warga bahwa surat sudah ditandatangani dan dapat diambil.' },
};

export function StatusUpdater({ currentStatus, nextStatus }: StatusUpdaterProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const { toast } = useToast();

    const action = actionDetails[currentStatus];

    const handleUpdateStatus = () => {
        if (!nextStatus) return;
        
        if (action?.needsInput && !inputValue) {
             toast({
                variant: "destructive",
                title: "Input Diperlukan",
                description: `${action.inputLabel} tidak boleh kosong.`,
            });
            return;
        }

        setIsLoading(true);
        // Simulate API call to update status
        setTimeout(() => {
            console.log(`Status updated to: ${nextStatus}`);
            if (inputValue) {
                 console.log(`With Input: ${action?.inputLabel} - ${inputValue}`);
            }
            toast({
                title: "Status Berhasil Diperbarui",
                description: `Status permohonan telah diubah ke "${nextStatus}".`,
            });
            setIsLoading(false);
            setInputValue("");
            // In a real app, you would probably refetch the data or optimistically update the UI.
            // For now, we can just show the toast and disable the button.
        }, 1000);
    };

    if (!action) {
        return (
             <Card className="bg-primary/10 border-primary/50 text-center">
                <CardHeader>
                    <CardTitle>Permohonan Selesai</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Tidak ada tindakan lebih lanjut yang diperlukan untuk permohonan ini.
                    </p>
                </CardContent>
             </Card>
        );
    }


    return (
        <div className="space-y-4">
             {action.needsInput && (
                <div>
                    <Label htmlFor="action-input">{action.inputLabel}</Label>
                    <Input 
                        id="action-input" 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={action.inputPlaceholder}
                        disabled={isLoading}
                    />
                </div>
            )}
            <p className="text-xs text-muted-foreground">{action.description}</p>
            <Button onClick={handleUpdateStatus} disabled={isLoading || !nextStatus} className="w-full">
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    action.icon
                )}
                {action.buttonText}
            </Button>
        </div>
    );
}
