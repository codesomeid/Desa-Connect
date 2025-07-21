import { Phone, Shield, Ambulance } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const contacts = [
  { name: "Bapak Budi Santoso", role: "Kepala Desa", phone: "0812-3456-7890", icon: <Phone /> },
  { name: "Ibu Siti Aminah", role: "Sekretaris Desa", phone: "0812-3456-7891", icon: <Phone /> },
  { name: "Kantor Polisi Terdekat", role: "Keamanan", phone: "110", icon: <Shield /> },
  { name: "Puskesmas Desa", role: "Layanan Kesehatan", phone: "0321-123-456", icon: <Ambulance /> },
  { name: "Pemadam Kebakaran", role: "Darurat Kebakaran", phone: "113", icon: <Phone /> },
];

export default function KontakPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Kontak Penting</h1>
        <p className="text-muted-foreground">Direktori kontak penting untuk layanan darurat dan administrasi desa.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  {contact.icon}
                </div>
                <span>{contact.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                    <Separator className="my-3" />
                    <p className="text-lg font-semibold text-accent">{contact.phone}</p>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
