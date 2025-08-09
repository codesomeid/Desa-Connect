
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Loader2, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
});

export function AparaturLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Clear role on component mount to ensure clean state
    localStorage.removeItem('userRole');
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate admin login
    setTimeout(() => {
      // In a real app, you would call your auth provider here.
      if (values.email === "superadmin@desa.com" && values.password === "superadmin123") {
        toast({
          title: "Login Super Admin Berhasil",
          description: "Selamat datang, Super Admin!",
        });
        localStorage.setItem('userRole', 'Super Admin');
        router.push("/admin/dashboard");
      } else if (values.email === "admin@desa.com" && values.password === "admin123") {
        toast({
          title: "Login Admin Berhasil",
          description: "Selamat datang kembali, Admin!",
        });
        localStorage.setItem('userRole', 'Admin');
        router.push("/admin/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Email atau password salah.",
        });
        localStorage.removeItem('userRole');
      }
      setIsLoading(false);
    }, 1500);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Masuk Aparatur</CardTitle>
        <CardDescription>
          Gunakan email dan password Anda untuk melanjutkan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@desa.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              Masuk
            </Button>
          </form>
        </Form>
      </CardContent>
       <CardFooter className="flex justify-center text-sm">
        <Link href="/" className="font-semibold text-muted-foreground hover:underline text-xs">
            Kembali ke pemilihan peran
        </Link>
      </CardFooter>
    </Card>
  );
}
