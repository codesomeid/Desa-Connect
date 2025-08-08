
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { users as initialUsers, User } from '@/lib/data';

export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>(initialUsers.filter(u => u.role === 'warga'));
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Manajemen Pengguna</h1>
                <p className="text-muted-foreground">
                    Lihat dan kelola data pengguna (warga) yang terdaftar di aplikasi.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Pengguna Warga</CardTitle>
                    <CardDescription>
                       Gunakan kolom pencarian untuk menemukan pengguna spesifik.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input 
                            placeholder="Cari berdasarkan nama, NIK, atau email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Lengkap</TableHead>
                                        <TableHead>NIK</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>No. Telepon</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map(user => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                <TableCell>{user.nik}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.phoneNumber}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                Tidak ada pengguna yang cocok dengan pencarian Anda.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
