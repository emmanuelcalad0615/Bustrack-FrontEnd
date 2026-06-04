import { RedirectIfAuthed } from '../../presentation/guards/RedirectIfAuthed';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <RedirectIfAuthed>
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
        {children}
      </div>
    </RedirectIfAuthed>
  );
}
