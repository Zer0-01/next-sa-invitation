"use client";

import { LoaderCircle } from "lucide-react";
import { onIdTokenChanged, type User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { auth } from "@/lib/firebase";

function FullPageLoader({ label }: { label: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex items-center gap-3 rounded-xl border bg-background/95 px-4 py-3 text-sm text-muted-foreground shadow-sm">
        <LoaderCircle className="size-4 animate-spin" />
        <span>{label}</span>
      </div>
    </div>
  );
}

export function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "authorized" | "redirecting">(
    "checking"
  );

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      if (!user) {
        setStatus("redirecting");
        router.replace("/admin/login");
        return;
      }

      setStatus("authorized");
    });

    return unsubscribe;
  }, [router]);

  if (status !== "authorized") {
    return (
      <FullPageLoader
        label={
          status === "redirecting"
            ? "Redirecting to admin login..."
            : "Checking admin session..."
        }
      />
    );
  }

  return <>{children}</>;
}

export function AdminLoginGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "guest" | "redirecting">(
    "checking"
  );

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user: User | null) => {
      if (user) {
        setStatus("redirecting");
        router.replace("/admin/dashboard");
        return;
      }

      setStatus("guest");
    });

    return unsubscribe;
  }, [router]);

  if (status !== "guest") {
    return (
      <FullPageLoader
        label={
          pathname === "/admin/login" && status === "checking"
            ? "Checking admin session..."
            : "Redirecting to dashboard..."
        }
      />
    );
  }

  return <>{children}</>;
}
