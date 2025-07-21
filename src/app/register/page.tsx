import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <header className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-primary">DesaConnect</h1>
            <p className="text-muted-foreground">
                Buat akun baru untuk mengakses layanan desa.
            </p>
        </header>
        <RegisterForm />
      </div>
    </div>
  );
}
