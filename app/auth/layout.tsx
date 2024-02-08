export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full flex items-center justify-center bg-slate-950 text-background">{children}</main>
  );
}
