"use client";

import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { AdminLoginGuard } from "@/components/admin-auth-guard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";

const adminLoginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long."),
});

type AdminLoginValues = z.infer<typeof adminLoginSchema>;

const firebaseErrorMessages: Record<string, string> = {
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/invalid-email": "The email address is not valid.",
  "auth/missing-password": "Enter your password to continue.",
  "auth/too-many-requests":
    "Too many login attempts. Try again in a few minutes.",
  "auth/network-request-failed":
    "The network request failed. Check your connection and try again.",
};

function getFirebaseErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    return (
      firebaseErrorMessages[error.code] ??
      "Login failed. Please try again."
    );
  }

  return "Login failed. Please try again.";
}

export function AdminLoginForm() {
  const router = useRouter();
  const form = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: AdminLoginValues) =>
      signInWithEmailAndPassword(auth, email, password),
    onSuccess: () => {
      toast.success("Login successful.");
      router.push("/admin/dashboard");
    },
    onError: (error) => {
      const message = getFirebaseErrorMessage(error);
      form.setError("root", { message });
      toast.error(message);
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    form.clearErrors("root");
    loginMutation.mutate(values);
  });

  return (
    <AdminLoginGuard>
      <Card className="relative z-10 w-full max-w-md border-white/60 bg-white/88 backdrop-blur-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/15">
            <LockKeyhole className="size-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl tracking-tight">Admin Login</CardTitle>
            <CardDescription className="text-sm leading-6">
              Sign in with your Firebase admin credentials to access the admin
              area.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={onSubmit} noValidate>
            <FieldGroup className="gap-5">
              <Field data-invalid={Boolean(form.formState.errors.email)}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="admin@example.com"
                      className="h-11 rounded-xl border-primary/15 bg-white pl-10"
                      aria-invalid={Boolean(form.formState.errors.email)}
                      {...form.register("email")}
                    />
                  </div>
                  <FieldError errors={[form.formState.errors.email]} />
                </FieldContent>
              </Field>

              <Field data-invalid={Boolean(form.formState.errors.password)}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldContent>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-11 rounded-xl border-primary/15 bg-white"
                    aria-invalid={Boolean(form.formState.errors.password)}
                    {...form.register("password")}
                  />
                  <FieldError errors={[form.formState.errors.password]} />
                </FieldContent>
              </Field>
            </FieldGroup>

            <FieldError>{form.formState.errors.root?.message}</FieldError>

            <Button
              type="submit"
              className="h-11 w-full rounded-xl text-sm font-semibold tracking-wide"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AdminLoginGuard>
  );
}
