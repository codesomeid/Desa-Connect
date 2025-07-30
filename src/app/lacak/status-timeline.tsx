"use client";

import { cn } from "@/lib/utils";
import { Check, CircleDot, Hourglass, MailCheck, UserCheck, FileSignature } from "lucide-react";

export type Status = 'Diterima' | 'Diproses' | 'Verifikasi Kasi' | 'Persetujuan Sekdes' | 'TTE Kades' | 'Dapat Diambil';

const statusSteps: { name: Status; icon: React.ReactNode }[] = [
    { name: 'Diterima', icon: <CircleDot className="h-5 w-5" /> },
    { name: 'Diproses', icon: <Hourglass className="h-5 w-5" /> },
    { name: 'Verifikasi Kasi', icon: <UserCheck className="h-5 w-5" /> },
    { name: 'Persetujuan Sekdes', icon: <UserCheck className="h-5 w-5" /> },
    { name: 'TTE Kades', icon: <FileSignature className="h-5 w-5" /> },
    { name: 'Dapat Diambil', icon: <MailCheck className="h-5 w-5" /> },
];

interface StatusTimelineProps {
    currentStatus: Status;
}

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
    const currentIndex = statusSteps.findIndex(step => step.name === currentStatus);

    return (
        <div className="relative flex justify-between items-start overflow-x-auto pb-4">
            <div className="absolute top-4 left-0 w-full h-0.5 bg-muted" />
             <div 
                className="absolute top-4 left-0 h-0.5 bg-accent transition-all duration-500"
                style={{ width: `${(currentIndex / (statusSteps.length - 1)) * 100}%`}}
            />
            {statusSteps.map((step, index) => {
                const isActive = index <= currentIndex;
                return (
                    <div key={step.name} className="z-10 flex flex-col items-center text-center w-28 shrink-0 px-1">
                        <div className={cn(
                            "flex items-center justify-center h-8 w-8 rounded-full border-2 transition-colors duration-300",
                            isActive ? "bg-accent border-accent text-accent-foreground" : "bg-background border-muted-foreground/30 text-muted-foreground"
                        )}>
                            {step.icon}
                        </div>
                        <p className={cn(
                            "mt-2 text-xs font-medium transition-colors duration-300",
                            isActive ? "text-accent" : "text-muted-foreground"
                        )}>
                            {step.name}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
