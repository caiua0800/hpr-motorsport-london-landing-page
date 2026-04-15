'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/src/components/Navbar';
import { useLanguage } from '@/src/context/language-context';
import { translations } from '@/src/translations';

/* ─────────── VEHICLE DATA ─────────── */
type VehicleType = 'car' | 'van' | 'motorcycle';
type VehicleTier = 'luxury' | 'standard';

interface Vehicle {
  id: number;
  img: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  gearbox: string;
  type: VehicleType;
  tier: VehicleTier;
  colour: string;
  engine: string;
  features: string[];
  desc: string;
}

const VEHICLES: Vehicle[] = [
  {
    id: 1,
    img: '/images/for-sale/car1.jpg',
    make: 'BMW',
    model: '3 Series 320i',
    year: 2020,
    price: 18500,
    mileage: 32000,
    fuel: 'Petrol',
    gearbox: 'Automatic',
    type: 'car',
    tier: 'luxury',
    colour: 'Alpine White',
    engine: '2.0L TwinPower Turbo',
    features: ['Full Service History', 'Sat Nav', 'Heated Seats', 'Parking Sensors', 'LED Headlights'],
    desc: 'Stunning BMW 3 Series in pristine condition. Full main dealer service history, recent MOT. Features include sat-nav, heated leather seats, parking sensors and BMW driver assistance package.',
  },
  {
    id: 2,
    img: '/images/for-sale/car2.jpg',
    make: 'Mercedes-Benz',
    model: 'C-Class C220d AMG Line',
    year: 2019,
    price: 16900,
    mileage: 45000,
    fuel: 'Diesel',
    gearbox: 'Automatic',
    type: 'car',
    tier: 'luxury',
    colour: 'Obsidian Black',
    engine: '2.0L CDI Diesel 194hp',
    features: ['Mercedes Service History', 'Panoramic Roof', 'AMG Styling', 'Premium Sound', 'Burmester Audio'],
    desc: 'Elegant Mercedes-Benz C-Class with full dealership service history. Features AMG sport styling pack, panoramic sunroof, Burmester surround-sound system and full leather interior.',
  },
  {
    id: 3,
    img: '/images/for-sale/car3.jpg',
    make: 'Volkswagen',
    model: 'Golf GTI Performance',
    year: 2021,
    price: 19800,
    mileage: 22000,
    fuel: 'Petrol',
    gearbox: 'DSG Automatic',
    type: 'car',
    tier: 'standard',
    colour: 'Pure White',
    engine: '2.0L TSI GTI 245hp',
    features: ['One Owner', 'VW Main Dealer History', 'Sports Suspension', 'Performance Pack', 'Alcantara Interior'],
    desc: 'Sporty VW Golf GTI Performance with very low mileage. One previous owner, full main dealer service history. Performance suspension, limited-slip differential, 19" Pretoria alloys.',
  },
  {
    id: 4,
    img: '/images/for-sale/car4.jpg',
    make: 'Ford',
    model: 'Transit Custom 280 L1',
    year: 2020,
    price: 14500,
    mileage: 58000,
    fuel: 'Diesel',
    gearbox: 'Manual',
    type: 'van',
    tier: 'standard',
    colour: 'Frozen White',
    engine: '2.0L EcoBlue Diesel 130hp',
    features: ['SWB Configuration', 'Ply Lined', 'Reversing Camera', 'Parking Sensors', 'Bluetooth'],
    desc: 'Reliable Ford Transit Custom in excellent working condition. Ideal for tradespeople or small businesses. SWB layout, fully ply-lined, reversing camera, and parking sensors fitted.',
  },
  {
    id: 5,
    img: '/images/for-sale/car5.jpg',
    make: 'Audi',
    model: 'A4 S-Line 40 TFSI',
    year: 2022,
    price: 26500,
    mileage: 15000,
    fuel: 'Petrol',
    gearbox: 'S-Tronic Automatic',
    type: 'car',
    tier: 'luxury',
    colour: 'Daytona Grey Pearl',
    engine: '2.0L TFSI 204hp',
    features: ['Audi Warranty Remaining', 'Virtual Cockpit Pro', 'Matrix LED', 'B&O Sound System', 'Full Leather'],
    desc: 'Near-new Audi A4 S-Line with remaining Audi factory warranty. Audi Virtual Cockpit Pro, Matrix LED headlights, Bang & Olufsen Premium Sound 3D and full Valcona leather interior.',
  },
  {
    id: 6,
    img: '/images/for-sale/mothorcycle.jpg',
    make: 'Honda',
    model: 'CBR600RR',
    year: 2021,
    price: 7200,
    mileage: 8500,
    fuel: 'Petrol',
    gearbox: 'Manual 6-Speed',
    type: 'motorcycle',
    tier: 'standard',
    colour: 'Tricolour Red/White/Blue',
    engine: '599cc Inline-4 DOHC',
    features: ['Both Keys', 'Service Manual', 'HPR Serviced', 'Fitted Cover', 'Low Mileage'],
    desc: 'Pristine Honda CBR600RR supersport in near-showroom condition. Very low mileage for the year, fully standard, recently serviced by HPR Motorsport. Comes with both keys, service manual and fitted dust cover.',
  },
];

/* ─────────── SORT OPTIONS ─────────── */
type SortKey = 'price_asc' | 'price_desc' | 'year_desc' | 'mileage_asc';

function sortVehicles(vehicles: Vehicle[], sort: SortKey) {
  return [...vehicles].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'year_desc') return b.year - a.year;
    if (sort === 'mileage_asc') return a.mileage - b.mileage;
    return 0;
  });
}

/* ─────────── VEHICLE CARD ─────────── */
function VehicleCard({ v, t, onOpen }: { v: Vehicle; t: typeof translations['en']['listings']; onOpen: (v: Vehicle) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="vehicle-card cursor-pointer"
      onClick={() => onOpen(v)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <Image
          src={v.img}
          alt={`${v.make} ${v.model}`}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {v.tier === 'luxury' && <span className="badge-luxury">✦ {t.luxury}</span>}
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge-certified">✓ {t.certified}</span>
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,7,7,0.7) 0%, transparent 50%)' }} />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-[10px] text-gray-600 tracking-widest uppercase mb-0.5">{v.year} · {v.colour}</p>
            <h3
              className="text-lg font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
            >
              {v.make} {v.model}
            </h3>
          </div>
          <p
            className="text-2xl font-black text-white shrink-0 ml-2"
            style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
          >
            £{v.price.toLocaleString('en-GB')}
          </p>
        </div>

        {/* Specs row */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-500 mb-5 pb-4 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#E31E24]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            {v.mileage.toLocaleString('en-GB')} {t.miles}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#E31E24]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/></svg>
            {v.fuel}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#E31E24]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/></svg>
            {v.gearbox}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#E31E24]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/></svg>
            {v.engine}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            className="btn-primary flex-1 py-2.5 text-xs"
            onClick={(e) => { e.stopPropagation(); onOpen(v); }}
          >
            {t.enquire}
          </button>
          <a
            href={`https://wa.me/447411075767?text=Hi HPR, I'm interested in the ${v.year} ${v.make} ${v.model} listed at £${v.price.toLocaleString('en-GB')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary py-2.5 px-4 text-xs"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: '#25D366', color: '#25D366' }}
          >
            {t.whatsapp}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── MODAL ─────────── */
function VehicleModal({ v, onClose, t }: { v: Vehicle; onClose: () => void; t: typeof translations['en']['listings'] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        style={{ background: '#0f0f0f', border: '1px solid #1e1e1e' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative" style={{ aspectRatio: '16/9' }}>
          <Image src={v.img} alt={`${v.make} ${v.model}`} fill className="object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/70 flex items-center justify-center text-white hover:bg-[#E31E24] transition-colors"
          >
            ✕
          </button>
          {v.tier === 'luxury' && (
            <div className="absolute top-4 left-4"><span className="badge-luxury">✦ {t.luxury}</span></div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-gray-600 tracking-widest uppercase mb-1">{v.year} · {v.colour}</p>
              <h2
                className="text-2xl md:text-3xl font-black text-white"
                style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
              >
                {v.make} {v.model}
              </h2>
            </div>
            <p
              className="text-3xl font-black text-white"
              style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
            >
              £{v.price.toLocaleString('en-GB')}
            </p>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: t.year, value: String(v.year) },
              { label: t.miles, value: `${v.mileage.toLocaleString('en-GB')} mi` },
              { label: t.fuel, value: v.fuel },
              { label: t.gearbox, value: v.gearbox },
            ].map((spec) => (
              <div key={spec.label} className="text-center py-3 border border-[#1e1e1e]">
                <p className="text-[10px] text-gray-600 tracking-widest uppercase mb-1">{spec.label}</p>
                <p className="text-sm font-bold text-white">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed mb-6">{v.desc}</p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-3">Features</h4>
            <div className="flex flex-wrap gap-2">
              {v.features.map((f) => (
                <span key={f} className="badge-certified">{f}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/447411075767?text=Hi HPR, I'm interested in the ${v.year} ${v.make} ${v.model} listed at £${v.price.toLocaleString('en-GB')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 justify-center"
              style={{ background: '#25D366' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.562 4.13 1.537 5.862L.057 23.93l6.243-1.46A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.848 0-3.574-.5-5.062-1.37l-.363-.214-3.706.868.908-3.618-.237-.374A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              {t.whatsapp}
            </a>
            <a href="/#contact" className="btn-primary flex-1 justify-center">
              {t.enquire}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────── FILTER CHIP ─────────── */
function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 border"
      style={{
        background: active ? '#E31E24' : 'transparent',
        borderColor: active ? '#E31E24' : '#2a2a2a',
        color: active ? '#fff' : '#666',
        clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
      }}
    >
      {children}
    </button>
  );
}

/* ─────────── PAGE ─────────── */
export default function ListingsPage() {
  const { lang } = useLanguage();
  const t = translations[lang].listings;

  const [typeFilter, setTypeFilter] = useState<'all' | VehicleType>('all');
  const [tierFilter, setTierFilter] = useState<'all' | VehicleTier>('all');
  const [sort, setSort] = useState<SortKey>('price_asc');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const filtered = useMemo(() => {
    let list = VEHICLES.filter((v) => {
      if (typeFilter !== 'all' && v.type !== typeFilter) return false;
      if (tierFilter !== 'all' && v.tier !== tierFilter) return false;
      return true;
    });
    return sortVehicles(list, sort);
  }, [typeFilter, tierFilter, sort]);

  const typeFilters: { key: 'all' | VehicleType; label: string }[] = [
    { key: 'all', label: t.all },
    { key: 'car', label: t.cars },
    { key: 'van', label: t.vans },
    { key: 'motorcycle', label: t.motorcycles },
  ];
  const tierFilters: { key: 'all' | VehicleTier; label: string }[] = [
    { key: 'all', label: t.all },
    { key: 'luxury', label: t.luxury },
    { key: 'standard', label: t.standard },
  ];
  const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'price_asc',   label: t.priceLow },
    { key: 'price_desc',  label: t.priceHigh },
    { key: 'year_desc',   label: t.newest },
    { key: 'mileage_asc', label: t.mileage },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#070707' }}>
      <Navbar />

      {/* ── Header ── */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #0a0000, #070707)' }}
      >
        {/* Decorative speed lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[15, 35, 60, 80].map((top, i) => (
            <div
              key={i}
              className="speed-line"
              style={{
                top: `${top}%`,
                width: `${25 + i * 10}%`,
                opacity: 0.1,
                ['--dur' as string]: `${3 + i * 0.4}s`,
                ['--del' as string]: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#E31E24] transition-colors mb-6 tracking-wider">
            ← {lang === 'en' ? 'Back to Home' : 'Voltar ao Início'}
          </Link>
          <div className="section-eyebrow mb-4">
            {lang === 'en' ? 'For Sale' : 'À Venda'}
          </div>
          <h1
            className="section-heading mb-4"
            style={{ fontFamily: 'var(--font-barlow), sans-serif' }}
          >
            {t.heading}
          </h1>
          <p className="text-gray-500 text-sm max-w-lg">{t.sub}</p>
        </div>
      </section>

      {/* ── Filters ── */}
      <div
        className="sticky top-[72px] z-30 border-b border-[#111]"
        style={{ background: 'rgba(7,7,7,0.97)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Type + Tier */}
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((f) => (
                <Chip key={f.key} active={typeFilter === f.key} onClick={() => setTypeFilter(f.key)}>
                  {f.label}
                </Chip>
              ))}
              <div className="w-px self-stretch bg-[#1e1e1e] mx-1" />
              {tierFilters.map((f) => (
                <Chip key={f.key} active={tierFilter === f.key} onClick={() => setTierFilter(f.key)}>
                  {f.label}
                </Chip>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-gray-600 tracking-wider whitespace-nowrap">{t.sortBy}:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="form-input py-2 px-3 text-xs w-auto min-w-[180px]"
              >
                {sortOptions.map((o) => (
                  <option key={o.key} value={o.key}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Results count ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-2">
        <p className="text-xs text-gray-600 tracking-wider">
          {filtered.length} {lang === 'en' ? `vehicle${filtered.length !== 1 ? 's' : ''} found` : `veículo${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pb-24">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-500 text-sm">{t.noResults}</p>
              <button
                className="btn-secondary mt-4 text-xs"
                onClick={() => { setTypeFilter('all'); setTierFilter('all'); }}
              >
                {lang === 'en' ? 'Clear Filters' : 'Limpar Filtros'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((v) => (
                <VehicleCard key={v.id} v={v} t={t as typeof translations['en']['listings']} onOpen={setSelectedVehicle} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedVehicle && (
          <VehicleModal v={selectedVehicle} onClose={() => setSelectedVehicle(null)} t={t as typeof translations['en']['listings']} />
        )}
      </AnimatePresence>

      {/* ── Footer minimal ── */}
      <div
        className="text-center py-6 text-xs text-gray-700 tracking-wider border-t border-[#0f0f0f]"
        style={{ background: '#050505' }}
      >
        © 2024 HPR Motorsport · London
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/447411075767"
        target="_blank"
        rel="noopener noreferrer"
        className="fab-whatsapp"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.562 4.13 1.537 5.862L.057 23.93l6.243-1.46A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.848 0-3.574-.5-5.062-1.37l-.363-.214-3.706.868.908-3.618-.237-.374A9.938 9.938 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </div>
  );
}
