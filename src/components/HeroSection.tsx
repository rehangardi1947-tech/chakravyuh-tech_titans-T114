import React from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Building2, 
  Zap, 
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import { EQUIPMENT_ITEMS } from '../data/equipmentData';
import { EquipmentItem } from '../types';

interface HeroSectionProps {
  onExploreClick: () => void;
  onStartLearningClick: () => void;
  onSelectEquipment: (item: EquipmentItem) => void;
  onOpenVirtualLab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onStartLearningClick,
  onSelectEquipment,
  onOpenVirtualLab
}) => {
  const featuredItem = EQUIPMENT_ITEMS[0]; // Rigol 100MHz DSO

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/80 bg-tech-grid">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description, CTAs, Trust indicators */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Showroom Status Kicker (unboxed clean text) */}
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400" />
              <span>PHYSICAL SHOWROOM CONNECTED</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">PUNE TECH HUB & ONLINE DISPATCH</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Your Electronics Lab.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                Without the Expensive Setup.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Why spend ₹40,000 on an oscilloscope or RF kit for a two-week semester project? ENTCverse Hub provides high-precision Electronics & Telecommunication bench equipment for affordable daily rentals, backed by hands-on guides and interactive virtual labs.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-sm font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Explore Equipment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onStartLearningClick}
                className="px-6 py-3.5 text-sm font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>Start Learning</span>
              </button>

              <button
                onClick={onOpenVirtualLab}
                className="px-4 py-3.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Activity className="w-4 h-4" />
                <span>Launch Virtual Lab</span>
              </button>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero purchase lock-in</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Physical showroom pick-up</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Calibrated bench gear</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor with Interactive Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/80 shadow-2xl shadow-cyan-950/30 group">
              {/* Product Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img 
                  src={featuredItem.image} 
                  alt={featuredItem.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Floating Showroom Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg px-2.5 py-1 text-[11px] font-medium text-cyan-300 flex items-center gap-1.5 shadow-md">
                  <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>Available at Pune Showroom (Rack A-04)</span>
                </div>

                <div className="absolute top-3 right-3 bg-emerald-950/80 border border-emerald-700/60 rounded-lg px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                  Calibrated Today
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-cyan-400 font-mono font-medium">RIGOL DS1054Z PLUS</span>
                  <span className="font-mono">4 CH · 100MHz · 1GSa/s</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Digital Storage Oscilloscope Lab Bundle
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2">
                  Complete bench setup with 4 calibrated 10X probes, protocol decoding, and power supply. Perfect for analog filters, microcontrollers, and RF debugging.
                </p>

                {/* Price and CTA row */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <div>
                    <span className="text-xs text-slate-400">Rental from</span>
                    <div className="text-lg font-bold text-white font-mono">
                      ₹290 <span className="text-xs text-slate-400 font-normal">/ day</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectEquipment(featuredItem)}
                    className="px-4 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/50 border border-cyan-700/70 rounded-lg transition-colors cursor-pointer"
                  >
                    View Specs & Book
                  </button>
                </div>
              </div>
            </div>

            {/* Quick floating stat badge */}
            <div className="absolute -bottom-5 -left-4 sm:left-4 bg-[#0e1627]/95 border border-slate-700/80 rounded-xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-white font-mono">1,450+ ENTC Students</p>
                <p className="text-slate-400">Saved over ₹1.2 Crore in lab hardware</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Metric Strip below Hero Split */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl font-extrabold text-cyan-400 font-mono tabular-nums">₹30 - ₹290</div>
            <div className="text-xs font-medium text-white mt-0.5">Affordable Daily Rentals</div>
            <div className="text-[11px] text-slate-400 mt-1">From breadboards to 4-channel DSOs with zero long-term commitment.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl font-extrabold text-white font-mono tabular-nums">48+ Lab Devices</div>
            <div className="text-xs font-medium text-white mt-0.5">Physical Showroom Inventory</div>
            <div className="text-[11px] text-slate-400 mt-1">Inspected, calibrated, and ready for instant counter pickup or campus dispatch.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl font-extrabold text-cyan-400 font-mono tabular-nums">4 Virtual Simulators</div>
            <div className="text-xs font-medium text-white mt-0.5">Zero-Risk Experimentation</div>
            <div className="text-[11px] text-slate-400 mt-1">Interactive RC filters, 555 timers, and logic sandboxes in your browser.</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl font-extrabold text-white font-mono tabular-nums">65% Revenue Share</div>
            <div className="text-xs font-medium text-white mt-0.5">For Equipment Owners</div>
            <div className="text-[11px] text-slate-400 mt-1">Monetize idle lab equipment and test benches when not in use.</div>
          </div>
        </div>
      </div>
    </section>
  );
};
