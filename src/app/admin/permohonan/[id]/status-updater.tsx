"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Status } from "@/app/lacak/status-timeline";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";

interface StatusUpdaterProps {
    currentStatus: Status;
    allStatuses: Status[];
}

export function StatusUpdater({ currentStatus, allStatuses }: StatusUpdaterProps) {
    const [selectedStatus, setSelectedStatus] = useState<Status>(currentStatus);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleUpdateStatus = () => {
        setIsLoading(true);
        // Simulate API call to update status
        setTimeout(() => {
            toast({
                title: "Status Berhasil Diperbarui",
                description: `Status permohonan telah diubah ke "${selectedStatus}".`,
            });
            setIsLoading(false);
            // In a real app, you would probably refetch the data or optimistically update the UI.
            // For now, we can just show the toast.
        }, 1000);
    };

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="status-select">Ubah Status Permohonan</Label>
                <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as Status)}>
                    <SelectTrigger id="status-select">
                        <SelectValue placeholder="Pilih status baru..." />
                    </SelectTrigger>
                    <SelectContent>
                        {allStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={handleUpdateStatus} disabled={isLoading || selectedStatus === currentStatus} className="w-full">
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Save className="mr-2 h-4 w-4" />
                )}
                Simpan Perubahan
            </Button>
        </div>
    );
}
