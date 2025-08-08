
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ApplicationStatus } from '@/lib/data';

type Application = {
  id: string;
  userName: string;
  userNIP: string;
  letterName: string;
  date: string;
  status: ApplicationStatus;
};

interface ApplicationListProps {
  applications: Application[];
}

const statusVariantMap: { [key in ApplicationStatus]: "default" | "secondary" | "destructive" | "outline" } = {
  'Pending': 'secondary',
  'Diproses': 'default',
  'Siap Diambil': 'outline',
  'Selesai': 'default',
  'Ditolak': 'destructive',
};

const statusTextMap: { [key in ApplicationStatus]: string } = {
    'Pending': 'Pending',
    'Diproses': 'Diproses',
    'Siap Diambil': 'Siap Diambil',
    'Selesai': 'Selesai',
    'Ditolak': 'Ditolak',
};


export default function ApplicationList({ applications }: ApplicationListProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');

  const filteredApplications = applications
    .filter(app => {
      const searchLower = searchTerm.toLowerCase();
      return (
        app.userName.toLowerCase().includes(searchLower) ||
        app.userNIP.includes(searchLower) ||
        app.letterName.toLowerCase().includes(searchLower)
      );
    })
    .filter(app => statusFilter === 'all' || app.status === statusFilter);

  const handleRowClick = (id: string) => {
    router.push(`/admin/permohonan/${id}`);
  };

  return (
    <div className="space-y-4">
        <div className="flex gap-4">
            <Input
                placeholder="Cari berdasarkan nama, NIP, atau jenis surat..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="max-w-sm"
            />
             <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ApplicationStatus | 'all')}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Diproses">Diproses</SelectItem>
                    <SelectItem value="Siap Diambil">Siap Diambil</SelectItem>
                    <SelectItem value="Selesai">Selesai</SelectItem>
                    <SelectItem value="Ditolak">Ditolak</SelectItem>
                </SelectContent>
            </Select>
        </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Pemohon</TableHead>
              <TableHead>NIP</TableHead>
              <TableHead>Jenis Surat</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map(app => (
                <TableRow key={app.id} onClick={() => handleRowClick(app.id)} className="cursor-pointer">
                  <TableCell className="font-medium">{app.userName}</TableCell>
                  <TableCell>{app.userNIP}</TableCell>
                  <TableCell>{app.letterName}</TableCell>
                  <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                     <Badge variant={statusVariantMap[app.status]}>
                        {statusTextMap[app.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Tidak ada permohonan yang ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
