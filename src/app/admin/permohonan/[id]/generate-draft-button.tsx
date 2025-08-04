
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2, Copy, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Status } from "@/app/lacak/status-timeline";
import { generateLetterDraft } from "@/ai/flows/generate-letter-draft-flow";

interface GenerateDraftButtonProps {
  application: {
    applicantName: string;
    nik: string;
    letterType: string;
    purpose: string;
  };
}

export function GenerateDraftButton({ application }: GenerateDraftButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [draft, setDraft] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerateDraft = async () => {
    setIsLoading(true);
    try {
      const result = await generateLetterDraft(application);
      setDraft(result.draft);
      setShowDialog(true);
    } catch (error) {
      console.error("Error generating draft:", error);
      toast({
        variant: "destructive",
        title: "Gagal Membuat Draf",
        description: "Terjadi kesalahan saat mencoba membuat draf surat. Silakan coba lagi.",
      });
    }
    setIsLoading(false);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(draft);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <>
      <div className="space-y-2">
         <p className="text-sm font-medium">Bantuan AI</p>
         <Button onClick={handleGenerateDraft} disabled={isLoading} variant="outline" className="w-full">
            {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <Wand2 className="mr-2 h-4 w-4" />
            )}
            Buat Draf Surat dengan AI
        </Button>
        <p className="text-xs text-muted-foreground">
            Gunakan AI untuk membuat draf awal surat berdasarkan data pemohon.
        </p>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Draf Surat Telah Dibuat</AlertDialogTitle>
            <AlertDialogDescription>
              Berikut adalah draf surat yang dibuat oleh AI. Silakan tinjau, salin, dan gunakan di aplikasi pengolah kata Anda untuk proses selanjutnya.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="relative">
             <Textarea value={draft} readOnly rows={15} className="bg-muted" />
             <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={handleCopy}
            >
                {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Tutup</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
