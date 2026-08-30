import { AdminLoginForm } from "./_components/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(187,171,106,0.18),transparent_38%),linear-gradient(180deg,rgba(248,247,243,1),rgba(241,238,228,1))] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(53,66,58,0.03)_35%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(53,66,58,0.12),transparent_65%)]" />
      <AdminLoginForm />
    </main>
  );
}
