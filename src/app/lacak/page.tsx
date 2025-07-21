import { ApplicationTracker } from "./application-tracker";

export default function LacakPage() {
  return (
     <div className="space-y-8 max-w-2xl mx-auto">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Lacak Status Permohonan</h1>
        <p className="text-muted-foreground">
         Masukkan nomor pelacakan Anda untuk melihat status terkini dari permohonan surat Anda.
        </p>
      </header>
      <ApplicationTracker />
    </div>
  );
}
