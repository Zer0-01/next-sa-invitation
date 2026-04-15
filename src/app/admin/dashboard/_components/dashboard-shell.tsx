"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Menu, MessageSquareText, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navigation = [
  {
    href: "/admin/dashboard",
    label: "Home",
    icon: LayoutGrid,
  },
  {
    href: "/admin/dashboard/guest",
    label: "Guest",
    icon: Users,
  },
  {
    href: "/admin/dashboard/messages",
    label: "Messages",
    icon: MessageSquareText,
  },
];

function NavItems({
  pathname,
  className,
}: {
  pathname: string;
  className?: string;
}) {
  return (
    <nav className={cn("flex flex-col gap-2", className)}>
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_rgba(248,247,243,1),_rgba(241,238,228,1))] text-foreground">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-6">
        <aside className="hidden rounded-3xl border border-primary/10 bg-white/85 p-5 shadow-xl shadow-primary/5 backdrop-blur lg:flex lg:flex-col">
          <div>
            <p className="text-xs font-semibold tracking-[0.35em] text-muted-foreground uppercase">
              SA Admin
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">
              Dashboard
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Manage invitation activity, guests, and messages from one place.
            </p>
          </div>

          <Separator className="my-6" />

          <NavItems pathname={pathname} />

          <div className="mt-auto rounded-2xl bg-primary/5 p-4">
            <p className="text-sm font-medium">Admin module</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Shared layout for all `/admin/dashboard/*` pages.
            </p>
          </div>
        </aside>

        <div className="flex min-h-[calc(100vh-2rem)] flex-col gap-6">
          <header className="rounded-3xl border border-primary/10 bg-white/85 px-4 py-4 shadow-lg shadow-primary/5 backdrop-blur sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                  Admin Panel
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                  {navigation.find((item) => item.href === pathname)?.label ??
                    "Dashboard"}
                </h2>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl lg:hidden"
                    aria-label="Open dashboard navigation"
                  >
                    <Menu className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Dashboard Navigation</DialogTitle>
                  </DialogHeader>
                  <NavItems pathname={pathname} className="mt-2" />
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
