
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function DirectLogin() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Clear any previous roles
    localStorage.removeItem('userRole');
    
    // Set the role to Super Admin
    localStorage.setItem('userRole', 'Super Admin');

    // Show a success toast
    toast({
      title: 'Login Super Admin Berhasil',
      description: 'Anda sekarang masuk sebagai Super Admin.',
    });

    // Redirect to the admin dashboard
    // Use a short timeout to allow the toast to be seen
    const timer = setTimeout(() => {
      router.push('/admin/dashboard');
    }, 500);

    return () => clearTimeout(timer);
  }, [router, toast]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Mengarahkan ke dashboard...</p>
    </div>
  );
}
