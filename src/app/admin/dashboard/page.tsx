export default function AdminDashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,_rgba(248,247,243,1),_rgba(241,238,228,1))] px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl border border-primary/10 bg-white/90 p-10 text-center shadow-xl shadow-primary/5 backdrop-blur">
        <p className="text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase">
          Admin
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
          Dashboard placeholder
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Login now redirects to this route successfully. The actual dashboard
          module can be implemented next without changing the auth flow.
        </p>
      </div>
    </main>
  );
}
