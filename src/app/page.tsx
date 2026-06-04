'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Radio, Bell, Shield, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../presentation/stores/authStore';
import { Logo } from '../presentation/components/Logo';
import { BusIllustration } from '../presentation/components/BusIllustration';

// Animated bus status dots — pure visual, no data
const BUS_DOTS = [
  { color: '#22C55E', label: 'En vivo',         delay: 0,    x: '60%', y: '20%', size: 14 },
  { color: '#22C55E', label: 'En vivo',         delay: 0.4,  x: '75%', y: '45%', size: 10 },
  { color: '#F59E0B', label: 'Señal vieja',     delay: 0.8,  x: '55%', y: '60%', size: 12 },
  { color: '#22C55E', label: 'En vivo',         delay: 0.2,  x: '82%', y: '30%', size: 9  },
  { color: '#EF4444', label: 'Sin señal',       delay: 1.2,  x: '68%', y: '72%', size: 11 },
  { color: '#22C55E', label: 'En vivo',         delay: 0.6,  x: '88%', y: '58%', size: 8  },
  { color: '#64748B', label: 'Sin GPS',         delay: 1.0,  x: '50%', y: '38%', size: 10 },
];

const FEATURES = [
  {
    icon: MapPin,
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.12)',
    title: 'Rutas suscritas',
    desc: 'Suscríbete a las rutas que usas a diario. Filtra, busca y gestiona tus favoritas en segundos.',
  },
  {
    icon: Radio,
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.12)',
    title: 'GPS en tiempo real',
    desc: 'Sigue tus buses en el mapa con actualización cada 5 segundos. Verde = en vivo, ámbar = señal vieja.',
  },
  {
    icon: Bell,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.12)',
    title: 'Alertas de proximidad',
    desc: 'Recibe alertas automáticas cuando un bus de tu ruta está a menos de 500 m de tu ubicación.',
  },
  {
    icon: Shield,
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.12)',
    title: 'Roles USER · ADMIN',
    desc: 'Usuarios ven y se suscriben. Administradores gestionan rutas, buses y sincronizan datos GTFS reales de Bogotá.',
  },
];

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const },
    transition: { delay, duration: 0.5 },
  };
}

export default function LandingPage() {
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && user) router.replace('/dashboard');
  }, [isInitialized, user, router]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex flex-col overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative flex-1 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-16 pb-24">

        {/* Bus dots background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 lg:opacity-30" aria-hidden="true">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

          {/* Animated bus dots */}
          {BUS_DOTS.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size, backgroundColor: dot.color }}
              animate={dot.color === '#22C55E' ? {
                boxShadow: [`0 0 0 0 ${dot.color}66`, `0 0 0 ${dot.size}px ${dot.color}00`, `0 0 0 0 ${dot.color}66`],
              } : {}}
              transition={{ duration: 2, delay: dot.delay, repeat: Infinity, ease: 'easeOut' }}
              aria-label={dot.label}
            />
          ))}

          {/* Connection lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <line x1="60%" y1="20%" x2="75%" y2="45%" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="75%" y1="45%" x2="68%" y2="72%" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="75%" y1="45%" x2="88%" y2="58%" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="82%" y1="30%" x2="75%" y2="45%" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Brand */}
        <motion.div
          className="mb-12 relative z-10"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Logo size={30} />
        </motion.div>

        {/* Hero content — text + bus illustration */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left: copy */}
          <div>
            <motion.h1
              className="font-bold leading-[0.92] tracking-tight mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Tu ciudad,
              <br />
              <span className="text-[#2563EB]">en tiempo</span>
              <br />
              real.
            </motion.h1>

            <motion.p
              className="text-[#94A3B8] text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Rastreo GPS de buses en Bogotá. Suscríbete a tus rutas,
              recibe alertas cuando el bus está cerca y síguelo en el mapa en vivo.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base"
              >
                Crear cuenta gratis
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 border border-[#475569] hover:border-[#94A3B8] text-[#F1F5F9] font-semibold px-8 py-4 rounded-xl transition-colors text-base"
              >
                Iniciar sesión
              </Link>
            </motion.div>
          </div>

          {/* Right: bus illustration */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            <BusIllustration className="w-full max-w-xl ml-auto" />
          </motion.div>
        </div>

        {/* Status legend */}
        <motion.div
          className="absolute bottom-8 left-6 md:left-16 lg:left-24 flex items-center gap-5 text-xs text-[#64748B]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          aria-label="Leyenda de estados de bus"
        >
          {[
            { color: '#22C55E', label: 'En vivo' },
            { color: '#F59E0B', label: 'Señal vieja' },
            { color: '#EF4444', label: 'Sin señal' },
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
              {label}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t border-[#1E293B]">
        <motion.p
          className="text-[#475569] text-xs font-semibold tracking-widest uppercase mb-4"
          {...fadeUpProps(0)}
        >
          Qué hace BusTrack
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 max-w-md leading-tight"
          {...fadeUpProps(0.1)}
        >
          Cuatro razones para no perderte el bus
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1E293B] rounded-2xl overflow-hidden border border-[#1E293B]">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-[#0F172A] p-8 hover:bg-[#0d1527] transition-colors"
              {...fadeUpProps((i + 2) * 0.1)}
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5"
                style={{ backgroundColor: f.bg }}
                aria-hidden="true"
              >
                <f.icon size={18} style={{ color: f.color }} />
              </div>
              <h3 className="font-semibold text-[#F1F5F9] mb-2 text-lg">{f.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BOTTOM ────────────────────────────────────────── */}
      <section className="px-6 md:px-16 lg:px-24 py-24 border-t border-[#1E293B]">
        <motion.div
          className="max-w-2xl"
          {...fadeUpProps(0)}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Empieza ahora.<br />
            <span className="text-[#94A3B8] font-normal">Es gratis.</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base"
            >
              Crear cuenta
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-[#F1F5F9] font-medium px-4 py-4 transition-colors text-base"
            >
              Ya tengo cuenta →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className="px-6 md:px-16 lg:px-24 py-8 border-t border-[#1E293B] flex items-center justify-between text-xs text-[#475569]">
        <Logo size={18} />
        <span>Bogotá, Colombia · {new Date().getFullYear()}</span>
      </footer>

    </div>
  );
}
