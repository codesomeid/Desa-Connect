
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

type ApplicationListItem = {
  id_permohonan: number;
  nama_lengkap_pemohon: string;
  nik_pemohon: string;
  nama_surat: string;
  tanggal_permohonan: string;
  status: ApplicationStatus;
};

interface ApplicationListProps {
  applications: ApplicationListItem[];
}

const statusVariantMap: { [key in ApplicationStatus]: "default" | "secondary" | "destructive" | "outline" } = {
  'Diajukan': 'secondary',
  'Diverifikasi': 'default',
  'Diproses': 'default',
  'Ditolak': 'destructive',
  'Siap Diambil': 'outline',
  'Selesai': 'default',
};


export default function ApplicationList({ applications }: ApplicationListProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');

  const filteredApplications = applications
    .filter(app => {
      const searchLower = searchTerm.toLowerCase();
      return (
        app.nama_lengkap_pemohon.toLowerCase().includes(searchLower) ||
        app.nik_pemohon.includes(searchLower) ||
        app.nama_surat.toLowerCase().includes(searchLower)
      );
    })
    .filter(app => statusFilter === 'all' || app.status === statusFilter);

  const handleRowClick = (id: number) => {
    router.push(`/admin/permohonan/${id}`);
  };

  return (
    <div className="space-y-4">
        <div className="flex gap-4">
            <Input
                placeholder="Cari berdasarkan nama, NIK, atau jenis surat..."
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
                    <SelectItem value="Diajukan">Diajukan</SelectItem>
                    <SelectItem value="Diverifikasi">Diverifikasi</SelectItem>
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
              <TableHead>NIK</TableHead>
              <TableHead>Jenis Surat</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map(app => (
                <TableRow key={app.id_permohonan} onClick={() => handleRowClick(app.id_permohonan)} className="cursor-pointer">
                  <TableCell className="font-medium">{app.nama_lengkap_pemohon}</TableCell>
                  <TableCell>{app.nik_pemohon}</TableCell>
                  <TableCell>{app.nama_surat}</TableCell>
                  <TableCell>{new Date(app.tanggal_permohonan).toLocaleDateString()}</TableCell>
                  <TableCell>
                     <Badge variant={statusVariantMap[app.status]}>
                        {app.status}
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
