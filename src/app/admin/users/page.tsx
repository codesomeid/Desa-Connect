import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AddUserForm } from "./add-user-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";

const users = [
  {
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    role: "Warga",
  },
  {
    name: "Admin Desa",
    email: "admin@desa.com",
    role: "Aparatur Desa",
  },
    {
    name: "Siti Aminah",
    email: "siti.aminah@email.com",
    role: "Warga",
  },
];


export default function UserManagementPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Pengguna</h1>
        <p className="text-muted-foreground">
          Tambah, lihat, dan kelola pengguna sistem.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Pengguna Baru</CardTitle>
                    <CardDescription>Buat akun untuk warga atau aparatur desa baru.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddUserForm />
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle>Daftar Pengguna</CardTitle>
                    <CardDescription>Daftar semua pengguna yang terdaftar dalam sistem.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Peran</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                            <TableRow key={user.email}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant={user.role === "Aparatur Desa" ? "default" : "secondary"}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
