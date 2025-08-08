
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { letterTypes } from "@/lib/data";

export default function PermohonanPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Pilih Jenis Surat</h1>
        <p className="text-muted-foreground">
          Pilih jenis surat yang ingin Anda ajukan dari daftar di bawah ini.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {letterTypes.map((letter) => (
          <Link href={letter.href} key={letter.id} className="group">
            <Card className="flex h-full flex-col justify-between transition-all group-hover:shadow-lg group-hover:border-accent">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                            {letter.icon}
                        </div>
                        <div>
                            <CardTitle className="text-base">{letter.name}</CardTitle>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{letter.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
