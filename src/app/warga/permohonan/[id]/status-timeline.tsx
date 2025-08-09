
'use client';

import { CheckCircle, Circle, Loader, XCircle, FileCheck, FileClock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ApplicationStatus } from '@/lib/data';

const allStatuses: ApplicationStatus[] = [
  'Diajukan',
  'Diverifikasi',
  'Diproses',
  'Siap Diambil',
  'Selesai',
];

interface StatusConfig {
  icon: React.ElementType;
  color: string;
  label: string;
}

const statusConfigMap: Record<ApplicationStatus | 'Ditolak', StatusConfig> = {
  Diajukan: { icon: FileClock, color: 'text-blue-500', label: 'Permohonan Diajukan' },
  Diverifikasi: { icon: CheckCircle, color: 'text-blue-500', label: 'Permohonan Diverifikasi' },
  Diproses: { icon: Loader, color: 'text-blue-500', label: 'Sedang Diproses' },
  'Siap Diambil': { icon: FileCheck, color: 'text-green-500', label: 'Siap Diambil' },
  Selesai: { icon: CheckCircle, color: 'text-green-500', label: 'Selesai' },
  Ditolak: { icon: XCircle, color: 'text-red-500', label: 'Permohonan Ditolak' },
};

export function StatusTimeline({ currentStatus }: { currentStatus: ApplicationStatus }) {
  const currentIndex = allStatuses.indexOf(currentStatus);

  if (currentStatus === 'Ditolak') {
     const config = statusConfigMap['Ditolak'];
     return (
        <div className="flex items-center p-4 rounded-md bg-red-50 border border-red-200">
             <config.icon className={cn("h-8 w-8 mr-4", config.color)} />
             <div>
                <h3 className="font-semibold text-lg">{config.label}</h3>
                <p className="text-sm text-red-700">Permohonan Anda ditolak. Silakan lihat catatan dari admin untuk detailnya.</p>
             </div>
        </div>
     );
  }

  return (
    <div className="space-y-8">
      {allStatuses.map((status, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;
        const config = statusConfigMap[status];

        return (
          <div key={status} className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted border',
                  isActive ? 'bg-primary ring-4 ring-primary/30 text-primary-foreground' : ''
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <config.icon
                    className={cn(
                      'h-5 w-5',
                       isActive && status === 'Diproses' ? 'animate-spin' : 'text-muted-foreground'
                    )}
                  />
                )}
              </div>
              {index < allStatuses.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 h-12 mt-2',
                     isCompleted ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </div>
            <div>
              <h3
                className={cn(
                  'font-semibold',
                  isActive ? 'text-primary' : '',
                  isCompleted ? '' : 'text-muted-foreground'
                )}
              >
                {config.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {/* Descriptions can be added here if needed */}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
