import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '../presentation/providers/QueryProvider';
import { AuthProvider } from '../presentation/providers/AuthProvider';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BusTrack',
  description: 'Rastreo de buses en tiempo real — Bogotá',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0F172A] text-[#F1F5F9]">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: { background: '#1E293B', color: '#F1F5F9', border: '1px solid #475569' },
              }}
            />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
