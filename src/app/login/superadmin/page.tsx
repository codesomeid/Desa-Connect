
import { DirectLogin } from './direct-login';

export default function SuperAdminDirectLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center">
        <header className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary">DesaConnect</h1>
          <p className="text-muted-foreground">
            Login Super Admin
          </p>
        </header>
        <DirectLogin />
      </div>
    </div>
  );
}
