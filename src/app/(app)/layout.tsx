import { RequireAuth } from '../../presentation/guards/RequireAuth';
import { Navbar } from '../../presentation/components/Navbar';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col bg-[#0F172A]">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </RequireAuth>
  );
}
