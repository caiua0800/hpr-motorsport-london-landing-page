"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/src/components/Navbar";
import { useLanguage } from "@/src/context/language-context";
import { translations } from "@/src/translations";

/* ─────────── SERVICE ICONS (SVG inline) ─────────── */
const SERVICE_ICONS = [
  /* MOT */ <svg
    key="mot"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>,
  /* Tyre */ <svg
    key="tyre"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-8 h-8"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
    <path strokeLinecap="round" d="M12 3v3M12 18v3M3 12h3M18 12h3" />
  </svg>,
  /* Oil */ <svg
    key="oil"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
    />
  </svg>,
  /* Diag */ <svg
    key="diag"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
    />
  </svg>,
  /* Headlight */ <svg
    key="hl"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
    />
  </svg>,
  /* Full Service */ <svg
    key="fs"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
    />
  </svg>,
  /* Brakes */ <svg
    key="brk"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M12 2.25V4.5m0 0l2.25 1.313"
    />
  </svg>,
  /* AC */ <svg
    key="ac"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>,
];

/* ─────────── HERO SPEED LINES (static to avoid hydration mismatch) ─────────── */
const SPEED_LINES = [
  { top: "7%", w: "42%", dur: "3.2s", del: "0s", op: 0.18 },
  { top: "16%", w: "58%", dur: "3.8s", del: "0.9s", op: 0.12 },
  { top: "28%", w: "35%", dur: "2.9s", del: "0.4s", op: 0.15 },
  { top: "40%", w: "65%", dur: "4.1s", del: "1.3s", op: 0.1 },
  { top: "52%", w: "48%", dur: "3.4s", del: "0.6s", op: 0.16 },
  { top: "63%", w: "38%", dur: "3s", del: "1.6s", op: 0.12 },
  { top: "74%", w: "52%", dur: "3.7s", del: "0.2s", op: 0.14 },
  { top: "84%", w: "44%", dur: "2.8s", del: "1.1s", op: 0.1 },
  { top: "93%", w: "31%", dur: "3.5s", del: "0.7s", op: 0.13 },
];

/* ─────────── BEFORE/AFTER SLIDER ─────────── */
function HeadlightSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  hint,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  hint: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getPos = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    return Math.min(
      Math.max(((clientX - rect.left) / rect.width) * 100, 2),
      98
    );
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) setPos(getPos(e.clientX));
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    setPos(getPos(e.touches[0].clientX));
  };

  return (
    <div
      ref={containerRef}
      className="before-after-container aspect-[4/3] w-full"
      onMouseDown={() => {
        dragging.current = true;
      }}
      onMouseUp={() => {
        dragging.current = false;
      }}
      onMouseLeave={() => {
        dragging.current = false;
      }}
      onMouseMove={onMouseMove}
      onTouchStart={() => {
        dragging.current = true;
      }}
      onTouchEnd={() => {
        dragging.current = false;
      }}
      onTouchMove={onTouchMove}
    >
      {/* Before */}
      <Image
        src={before}
        alt="Before"
        fill
        className="object-cover"
        sizes="(max-width:768px) 100vw, 50vw"
      />
      <div className="absolute top-4 left-4 z-20 bg-gray-900/80 text-white text-[10px] font-bold px-2.5 py-1 tracking-widest backdrop-blur-sm border border-white/10">
        {beforeLabel}
      </div>

      {/* After (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={after}
          alt="After"
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div className="absolute top-4 left-4 z-20 bg-[#E31E24] text-white text-[10px] font-bold px-2.5 py-1 tracking-widest">
          {afterLabel}
        </div>
      </div>

      {/* Divider */}
      <div className="slider-handle" style={{ left: `${pos}%` }}>
        <div className="slider-handle-circle select-none">⇔</div>
      </div>

      {/* Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white/80 text-[11px] px-3 py-1.5 rounded-full tracking-wider whitespace-nowrap backdrop-blur-sm">
        {hint}
      </div>
    </div>
  );
}

/* ─────────── VEHICLE PREVIEW DATA ─────────── */
const PREVIEW_VEHICLES = [
  {
    id: 1,
    img: "/images/for-sale/car1.jpg",
    make: "BMW",
    model: "3 Series 320i",
    year: 2020,
    price: 18500,
    tier: "luxury",
  },
  {
    id: 2,
    img: "/images/for-sale/car2.jpg",
    make: "Mercedes-Benz",
    model: "C-Class C220d",
    year: 2019,
    price: 16900,
    tier: "luxury",
  },
  {
    id: 5,
    img: "/images/for-sale/car5.jpg",
    make: "Audi",
    model: "A4 S-Line",
    year: 2022,
    price: 26500,
    tier: "luxury",
  },
];

/* ─────────── ANIMATED COUNTER ─────────── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShown(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={shown ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl font-black tracking-tight text-gradient-red"
        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
      >
        {value}
      </motion.div>
      <div className="text-xs text-gray-500 tracking-widest uppercase mt-1">
        {label}
      </div>
    </div>
  );
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document
      .querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Contact form state */
  const [formSent, setFormSent] = useState(false);
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "#070707", overflowX: "hidden" }}>
      <Navbar />

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 hero-grid-bg opacity-60" />

        {/* Red glow */}
        <div
          className="hero-glow"
          style={{
            top: "50%",
            left: "50%",
            width: "700px",
            height: "700px",
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(circle, rgba(227,30,36,0.12) 0%, transparent 68%)",
          }}
        />
        <div
          className="hero-glow"
          style={{
            bottom: "-10%",
            right: "-5%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(200,169,81,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Speed lines */}
        {SPEED_LINES.map((sl, i) => (
          <div
            key={i}
            className="speed-line"
            style={{
              top: sl.top,
              left: 0,
              width: sl.w,
              opacity: sl.op,
              ["--dur" as string]: sl.dur,
              ["--del" as string]: sl.del,
            }}
          />
        ))}

        {/* Diagonal accent bar */}
        <div
          className="absolute inset-y-0 right-0 w-1 opacity-30"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #E31E24 30%, #E31E24 70%, transparent)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="w-8 h-px bg-[#E31E24]" />
            <span className="text-[11px] font-bold tracking-[0.35em] uppercase text-[#E31E24]">
              {t.hero.badge}
            </span>
            <span className="w-8 h-px bg-[#E31E24]" />
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-0"
            style={{ filter: "drop-shadow(0 0 40px rgba(227,30,36,0.4))" }}
          >
            <Image
              src="/images/hpr_logo.png"
              alt="HPR Motorsport"
              width={240}
              height={120}
              priority
              className="object-contain"
            />
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-0" style={{marginTop:"-20px"}}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1
                className="font-black leading-none tracking-[0.12em] uppercase text-white"
                style={{
                  fontFamily: "var(--font-barlow), sans-serif",
                  fontSize: "clamp(3.5rem, 14vw, 9rem)",
                }}
              >
                {t.hero.line1}
              </h1>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h2
                className="font-semibold leading-none tracking-[0.45em] uppercase text-white/80"
                style={{
                  fontFamily: "var(--font-barlow), sans-serif",
                  fontSize: "clamp(1.1rem, 4vw, 2.8rem)",
                  letterSpacing: "0.45em",
                }}
              >
                {t.hero.line2}
              </h2>
            </motion.div>
          </div>

          {/* Red separator */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="w-20 h-px bg-[#E31E24] mb-6 origin-left"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="text-lg md:text-xl text-gray-400 mb-2 tracking-wide"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#E31E24] mb-4"
          >
            {t.hero.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="max-w-xl text-sm text-gray-500 leading-relaxed mb-10"
          >
            {t.hero.desc}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#services" className="btn-primary">
              {t.hero.cta1}
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <Link href="/listings" className="btn-secondary">
              {t.hero.cta2}
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
          style={{
            animation: "scrollBounce 2s ease-in-out infinite",
            transform: "translateX(-50%)",
          }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-600">
            {t.hero.scroll}
          </span>
          <svg
            className="w-4 h-4 text-[#E31E24]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════ SERVICES ══════════════════════ */}
      <section
        id="services"
        className="py-24 lg:py-32"
        style={{ background: "#070707" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <div className="section-eyebrow justify-center mb-4">
              {t.services.eyebrow}
            </div>
            <h2
              className="section-heading mb-4"
              style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
              {t.services.heading}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              {t.services.subheading}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1e1e1e]">
            {t.services.items.map((item, i) => (
              <div
                key={i}
                className={`service-card reveal stagger-${(i % 8) + 1}`}
              >
                <div className="text-[#E31E24] mb-5">{SERVICE_ICONS[i]}</div>
                <h3
                  className="text-base font-bold text-white mb-2 tracking-wide"
                  style={{
                    fontFamily: "var(--font-barlow), sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {item.desc}
                </p>
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#E31E24] border border-[#E31E24]/30 px-2.5 py-1 rounded-sm">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ ABOUT ══════════════════════ */}
      <section
        id="about"
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        {/* BG accent */}
        <div
          className="absolute top-0 right-0 w-64 h-full opacity-5"
          style={{
            background: "linear-gradient(to left, #E31E24, transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text side */}
            <div>
              <div className="section-eyebrow mb-4 reveal-left">
                {t.about.eyebrow}
              </div>
              <h2
                className="section-heading mb-6 reveal-left stagger-2 whitespace-pre-line"
                style={{ fontFamily: "var(--font-barlow), sans-serif" }}
              >
                {t.about.heading}
              </h2>
              <span className="red-line w-14 mb-6 reveal-left stagger-3" />
              <p className="text-gray-400 leading-relaxed mb-4 text-sm reveal-left stagger-4">
                {t.about.p1}
              </p>
              <p className="text-gray-400 leading-relaxed text-sm reveal-left stagger-5">
                {t.about.p2}
              </p>
              {/* Quote */}
              <div className="mt-8 pl-5 border-l-2 border-[#E31E24] reveal-left stagger-6">
                <p className="text-gray-300 italic text-sm leading-relaxed">
                  {t.about.quote}
                </p>
              </div>
            </div>

            {/* Image side */}
            <div className="relative reveal-right">
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: "2px" }}
              >
                <Image
                  src="/images/ai/mechanical_fixing.jpg"
                  alt="HPR Mechanic"
                  width={600}
                  height={480}
                  className="w-full object-cover"
                  style={{ aspectRatio: "5/4" }}
                />
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top right, rgba(227,30,36,0.15), transparent 60%)",
                  }}
                />
              </div>
              {/* Stats bar overlay */}
              <div
                className="absolute -bottom-6 -left-6 right-6 grid grid-cols-4 gap-px"
                style={{ background: "#1e1e1e" }}
              >
                {t.about.stats.map((s) => (
                  <div
                    key={s.label}
                    className="text-center py-5 px-2"
                    style={{ background: "#0f0f0f" }}
                  >
                    <AnimatedStat value={s.value} label={s.label} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ SHOWCASE ══════════════════════ */}
      <section
        id="showcase"
        className="py-24 lg:py-32 mt-10"
        style={{ background: "#070707" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <div className="section-eyebrow justify-center mb-4">
              {t.showcase.eyebrow}
            </div>
            <h2
              className="section-heading"
              style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
              {t.showcase.heading}
            </h2>
          </div>

          {/* Headlight slider — full width */}
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
            <div className="reveal-left">
              <HeadlightSlider
                before="/images/headlight-transformation/IMG_4669.jpg"
                after="/images/headlight-transformation/IMG_4668.jpg"
                beforeLabel={t.showcase.slider.before}
                afterLabel={t.showcase.slider.after}
                hint={t.showcase.slider.hint}
              />
            </div>
            <div className="reveal-right">
              <div className="section-eyebrow mb-3">
                {t.showcase.slider.heading}
              </div>
              <h3
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-barlow), sans-serif" }}
              >
                {t.showcase.slider.heading}
              </h3>
              <span className="red-line w-10 mb-5" />
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.showcase.slider.desc}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  {
                    label: t.showcase.slider.before,
                    img: "/images/headlight-transformation/IMG_4668.jpg",
                  },
                  {
                    label: t.showcase.slider.after,
                    img: "/images/headlight-transformation/IMG_4669.jpg",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="relative overflow-hidden rounded-sm"
                  >
                    <Image
                      src={item.img}
                      alt={item.label}
                      width={300}
                      height={180}
                      className="w-full object-cover"
                      style={{ aspectRatio: "5/3" }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 py-1.5 text-center text-[10px] font-black tracking-widest"
                      style={{
                        background:
                          item.label === t.showcase.slider.after
                            ? "#E31E24"
                            : "rgba(0,0,0,0.7)",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Two cards: Porsche + oil change */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {[
              {
                img: "/images/mechanical-fix/porch-pneu.jpg",
                ...t.showcase.card1,
              },
              {
                img: "/images/mechanical-fix/car-oil-change.jpg",
                ...t.showcase.card2,
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`relative overflow-hidden reveal stagger-${i + 1}`}
                style={{ borderRadius: "2px" }}
              >
                <Image
                  src={card.img}
                  alt={card.heading}
                  width={700}
                  height={420}
                  className="w-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ aspectRatio: "16/9" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(7,7,7,0.9) 0%, rgba(7,7,7,0.2) 60%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3
                    className="text-xl font-bold text-white mb-1"
                    style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                  >
                    {card.heading}
                  </h3>
                  <p className="text-xs text-gray-400">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ VEHICLE PREVIEW ══════════════════════ */}
      <section
        id="vehicles-preview"
        className="py-24 lg:py-32"
        style={{ background: "#0a0a0a" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="reveal">
              <div className="section-eyebrow mb-3">{t.preview.eyebrow}</div>
              <h2
                className="section-heading"
                style={{ fontFamily: "var(--font-barlow), sans-serif" }}
              >
                {t.preview.heading}
              </h2>
              <p className="text-gray-500 text-sm mt-3 max-w-md">
                {t.preview.sub}
              </p>
            </div>
            <Link href="/listings" className="btn-secondary reveal shrink-0">
              {t.preview.cta}
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PREVIEW_VEHICLES.map((v, i) => (
              <Link
                href="/listings"
                key={v.id}
                className={`vehicle-card block reveal stagger-${i + 1}`}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src={v.img}
                    alt={`${v.make} ${v.model}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-107"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge-luxury">{t.preview.luxury}</span>
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(7,7,7,0.6) 0%, transparent 50%)",
                    }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-[11px] text-gray-500 tracking-wider uppercase">
                        {v.year}
                      </p>
                      <h3
                        className="text-base font-bold text-white"
                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                      >
                        {v.make} {v.model}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-xl font-black text-white"
                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                      >
                        £{v.price.toLocaleString('en-GB')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="badge-certified">
                      {t.preview.eyebrow === "For Sale"
                        ? "HPR Certified"
                        : "Certificado HPR"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ HAPPY CLIENTS ══════════════════════ */}
      <section
        id="clients"
        className="py-24 lg:py-32"
        style={{ background: "#070707" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <div className="section-eyebrow justify-center mb-4">
              {t.clients.eyebrow}
            </div>
            <h2
              className="section-heading whitespace-pre-line"
              style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
              {t.clients.heading}
            </h2>
            <p className="text-gray-500 text-sm mt-4 max-w-lg mx-auto">
              {t.clients.sub}
            </p>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {["IMG_4663", "IMG_4664", "IMG_4665", "IMG_4666", "IMG_4667"].map(
              (name, i) => (
                <div
                  key={name}
                  className={`client-photo-wrap reveal stagger-${i + 1}`}
                  style={{ aspectRatio: i === 2 ? "1/1.2" : "1/1" }}
                >
                  <Image
                    src={`/images/happy-clients/${name}.jpg`}
                    alt="Happy client"
                    width={280}
                    height={280}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            )}
          </div>

          {/* AI mechanic images */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {[
              "/images/ai/mechanical_fixing.jpg",
              "/images/ai/mechanical_fixing2.jpg",
            ].map((src, i) => (
              <div
                key={src}
                className={`client-photo-wrap reveal stagger-${i + 1}`}
              >
                <Image
                  src={src}
                  alt="HPR mechanic at work"
                  width={700}
                  height={400}
                  className="w-full object-cover"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ MOT ══════════════════════ */}
      <section id="mot" className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0d0d0d 0%, #0f0000 50%, #0d0d0d 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(227,30,36,0.3) 40px, rgba(227,30,36,0.3) 41px)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-40"
          style={{
            background:
              "linear-gradient(90deg, transparent, #E31E24 30%, #E31E24 70%, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-40"
          style={{
            background:
              "linear-gradient(90deg, transparent, #E31E24 30%, #E31E24 70%, transparent)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <div className="section-eyebrow mb-4 reveal">{t.mot.eyebrow}</div>
              <h2
                className="section-heading mb-4 reveal stagger-2"
                style={{ fontFamily: "var(--font-barlow), sans-serif" }}
              >
                {t.mot.heading}
              </h2>
              <span className="red-line w-12 mb-5 reveal stagger-3" />
              <p className="text-gray-400 text-sm leading-relaxed mb-6 reveal stagger-4">
                {t.mot.desc}
              </p>
              <div
                className="inline-block text-4xl font-black text-gradient-gold mb-8 reveal stagger-5"
                style={{ fontFamily: "var(--font-barlow), sans-serif" }}
              >
                {t.mot.price}
              </div>
              <div className="reveal stagger-6">
                <a href="#contact" className="btn-primary">
                  {t.mot.cta}
                </a>
              </div>
            </div>

            {/* Features */}
            <div className="reveal-right">
              <div className="space-y-0 border border-[#1e1e1e] rounded-sm overflow-hidden">
                {t.mot.features.map((f, i) => (
                  <div key={i} className="mot-feature-item px-5">
                    <div className="w-5 h-5 rounded-full bg-[#E31E24]/15 border border-[#E31E24]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-[#E31E24]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ CONTACT ══════════════════════ */}
      <section
        id="contact"
        className="py-24 lg:py-32"
        style={{ background: "#0a0a0a" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <div className="section-eyebrow justify-center mb-4">
              {t.contact.eyebrow}
            </div>
            <h2
              className="section-heading"
              style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
              {t.contact.heading}
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info */}
            <div className="lg:col-span-2 space-y-4 reveal-left">
              {/* Map */}
              <div className="overflow-hidden border border-[#1e1e1e]" style={{ borderRadius: '2px' }}>
                <iframe
                  src="https://maps.google.com/maps?q=Unit+3+Watsons+Yard+Orpington+BR6+0HL+UK&output=embed&z=16"
                  width="100%"
                  height="200"
                  style={{ border: 0, display: 'block', filter: 'grayscale(1) brightness(0.8) contrast(1.1)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HPR Motorsport location"
                />
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 p-4 border border-[#1e1e1e] hover:border-[#E31E24]/30 transition-colors">
                <span className="text-xl flex-shrink-0">📍</span>
                <span className="text-sm text-gray-400">{t.contact.address}</span>
              </div>

              {/* Phone */}
              <a
                href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                className="flex items-start gap-4 p-4 border border-[#1e1e1e] hover:border-[#E31E24]/30 transition-colors group"
              >
                <span className="text-xl flex-shrink-0">📞</span>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{t.contact.phone}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${t.contact.email}`}
                className="flex items-start gap-4 p-4 border border-[#1e1e1e] hover:border-[#E31E24]/30 transition-colors group"
              >
                <span className="text-xl flex-shrink-0">✉️</span>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{t.contact.email}</span>
              </a>

              {/* Opening hours */}
              <div className="p-4 border border-[#1e1e1e] hover:border-[#E31E24]/30 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="text-xl flex-shrink-0">🕐</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">{t.contact.hoursLabel}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Mon – Fri</span>
                        <span className="text-white font-medium">{t.contact.hours}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Saturday</span>
                        <span className="text-white font-medium">{t.contact.hoursSat}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Sunday</span>
                        <span className="text-[#E31E24] font-medium">{t.contact.hoursSun}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/447411075767"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center mt-2"
                style={{ background: "#25D366" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.562 4.13 1.537 5.862L.057 23.93l6.243-1.46A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.848 0-3.574-.5-5.062-1.37l-.363-.214-3.706.868.908-3.618-.237-.374A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                {t.contact.whatsapp}
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 reveal-right">
              <AnimatePresence mode="wait">
                {formSent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full min-h-64 text-center gap-4 border border-[#E31E24]/30 p-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#E31E24]/10 border border-[#E31E24]/30 flex items-center justify-center text-[#E31E24] text-2xl">
                      ✓
                    </div>
                    <p className="text-white font-semibold">
                      {t.contact.form.success}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleForm}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        className="form-input"
                        type="text"
                        placeholder={t.contact.form.name}
                        required
                      />
                      <input
                        className="form-input"
                        type="email"
                        placeholder={t.contact.form.email}
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        className="form-input"
                        type="tel"
                        placeholder={t.contact.form.phone}
                      />
                      <select className="form-input" defaultValue="">
                        <option value="" disabled>
                          {t.contact.form.service}
                        </option>
                        {t.contact.form.services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      className="form-input resize-none"
                      rows={5}
                      placeholder={t.contact.form.message}
                    />
                    <button type="submit" className="btn-primary w-full">
                      {t.contact.form.submit}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer style={{ background: "#050505", borderTop: "1px solid #111" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/images/hpr_logo.png"
                  alt="HPR"
                  width={44}
                  height={28}
                  className="object-contain"
                />
                <span
                  className="text-sm font-black tracking-[0.2em] text-white"
                  style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                  HPR MOTORSPORT
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t.footer.tagline}
              </p>
              <div className="flex gap-3 mt-5">
                {["Instagram", "Facebook", "WhatsApp"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-8 h-8 border border-[#1e1e1e] flex items-center justify-center text-gray-600 hover:border-[#E31E24]/40 hover:text-[#E31E24] transition-colors text-xs font-bold"
                  >
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-5">
                Navigation
              </h4>
              <div className="space-y-3">
                {Object.entries(t.footer.links).map(([, label]) => (
                  <div key={label}>
                    <a
                      href="#"
                      className="text-xs text-gray-500 hover:text-white transition-colors tracking-wider"
                    >
                      {label}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-5">
                {t.contact.eyebrow}
              </h4>
              <div className="space-y-2 text-xs text-gray-500">
                <p>{t.contact.address}</p>
                <p>{t.contact.phone}</p>
                <p>{t.contact.email}</p>
                <p className="mt-4 text-gray-600">{t.contact.hours}</p>
                <p className="text-gray-600">{t.contact.hoursSat}</p>
              </div>
            </div>
          </div>

          <div
            className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
            style={{ borderTop: "1px solid #111" }}
          >
            <p className="text-[11px] text-gray-700">{t.footer.rights}</p>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-gray-700">Made with</span>
              <span className="text-[#E31E24] text-xs">♥</span>
              <span className="text-[11px] text-gray-700">in London</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ══════════════════════ WHATSAPP FAB ══════════════════════ */}
      <a
        href="https://wa.me/447411075767"
        target="_blank"
        rel="noopener noreferrer"
        className="fab-whatsapp"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.562 4.13 1.537 5.862L.057 23.93l6.243-1.46A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.848 0-3.574-.5-5.062-1.37l-.363-.214-3.706.868.908-3.618-.237-.374A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      </a>
    </div>
  );
}
