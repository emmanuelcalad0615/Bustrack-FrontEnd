import Link from 'next/link';
import { Logo } from '../presentation/components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F172A] text-[#F1F5F9] px-6 text-center">
      <Logo size={28} />

      <p className="mt-12 text-7xl font-bold tracking-tight text-[#2563EB]">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Página no encontrada</h1>
      <p className="mt-2 max-w-sm text-sm text-[#94A3B8]">
        La ruta que buscas no existe o el bus ya se fue. Volvamos a terreno conocido.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
        >
          Ir al inicio
        </Link>
        <Link
          href="/dashboard"
          className="rounded-xl border border-[#475569] px-6 py-3 text-sm font-semibold text-[#F1F5F9] transition-colors hover:border-[#94A3B8]"
        >
          Ir al dashboard
        </Link>
      </div>
    </div>
  );
}
