import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  GraduationCap, 
  Building, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  HelpCircle,
  Layers,
  Heart
} from 'lucide-react';
import { HeroSection } from './HeroSection';
import { EQUIPMENT_ITEMS } from '../data/equipmentData';
import { STUDENT_PROJECTS } from '../data/projectsData';
import { LEARNING_GUIDES } from '../data/learningData';
import { EquipmentItem } from '../types';

interface LandingPageProps {
  onExploreEquipment: () => void;
  onStartLearning: () => void;
  onOpenVirtualLab: () => void;
  onSelectEquipment: (item: EquipmentItem) => void;
  onBookEquipment: (item: EquipmentItem) => void;
  onOpenBusinessHub: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreEquipment,
  onStartLearning,
  onOpenVirtualLab,
  onSelectEquipment,
  onBookEquipment,
  onOpenBusinessHub
}) => {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does equipment rental work for university students?',
      a: 'Browse our equipment catalogue, pick your rental duration (1 day to semester-long), and select either free 1-hour counter pickup at our physical showroom (Pune or Bengaluru) or express campus courier. Present your verified student ID at checkout to receive 15% off standard rates.'
    },
    {
      q: 'How are security deposits managed and refunded?',
      a: 'A refundable security deposit is held during the rental period. When you return the device to our showroom counter or courier partner, our automated bench test checks channel calibration and probe integrity. Once verified (usually under 15 minutes), the 100% deposit is immediately released to your original payment method.'
    },
    {
      q: 'What if a component or probe is accidentally damaged?',
      a: 'We understand that electronics experimentation involves learning! Passive components like resistors and jumpers are consumable. Probes and multimeters are covered under our subsidized lab insurance pool. You only pay nominal repair costs for major silicon damage.'
    },
    {
      q: 'Can equipment owners monetize their idle lab gear?',
      a: 'Yes! Senior engineers, private makers, and university research labs can consign idle oscilloscopes, RF analyzers, and power supplies to our showroom. We calibrate, insure, and rent them out, remitting 65% of all rental proceeds directly to your bank account.'
    },
    {
      q: 'Do the virtual lab simulations accurately reflect physical hardware?',
      a: 'Yes. Our virtual lab models follow real differential equations for RC cutoffs, 555 astable timing constants, and TTL 74xx logic propagation delays. You can simulate circuits in the browser first, then test identical physical values on rented bench hardware.'
    }
  ];

  const featuredItems = EQUIPMENT_ITEMS.filter((i) => i.popular).slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <HeroSection
        onExploreClick={onExploreEquipment}
        onStartLearningClick={onStartLearning}
        onSelectEquipment={onSelectEquipment}
        onOpenVirtualLab={onOpenVirtualLab}
      />

      {/* 2. How It Works: Discover → Learn → Rent → Experiment → Build */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>THE 5-STAGE WORKFLOW</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How ENTCverse Hub Works
          </h2>
          <p className="text-sm text-slate-300">
            A frictionless bridge between online simulation and physical hardware experimentation.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Discover',
              desc: 'Browse calibrated bench oscilloscopes, microcontrollers, and complete practical kits.'
            },
            {
              step: '02',
              title: 'Learn',
              desc: 'Review practical pinouts, safety invariants, and interactive calculation formulas.'
            },
            {
              step: '03',
              title: 'Rent',
              desc: 'Book for daily or weekly durations. Pick up at our physical showroom or get campus dispatch.'
            },
            {
              step: '04',
              title: 'Experiment',
              desc: 'Build circuits, take oscilloscope waveform measurements, and debug embedded signals.'
            },
            {
              step: '05',
              title: 'Build',
              desc: 'Complete your university capstone project, publish schematics, and return gear for full deposit refund.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 relative group hover:border-slate-700 transition-colors"
            >
              <span className="text-xs font-mono font-bold text-cyan-400">{item.step}.</span>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Equipment Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">SHOWROOM HIGHLIGHTS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Popular Bench Equipment & Practical Kits
            </h2>
          </div>
          <button
            onClick={onExploreEquipment}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All 12 Equipment Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden group hover:shadow-xl"
            >
              <div 
                onClick={() => onSelectEquipment(item)}
                className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-900/90 border border-slate-700/80 rounded px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                  {item.brand}
                </div>
                <div className="absolute top-2.5 right-2.5 bg-emerald-950/90 text-emerald-300 text-[10px] font-medium px-2 py-0.5 rounded border border-emerald-800/80">
                  In Showroom
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400">{item.category}</span>
                  <h4 
                    onClick={() => onSelectEquipment(item)}
                    className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-1"
                  >
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold font-mono text-white">
                      ₹{item.dailyRate} <span className="text-[10px] text-slate-400 font-normal">/ day</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onBookEquipment(item)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg cursor-pointer"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Virtual Laboratory & Interactive Simulator Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/20 p-8 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">BROWSER EXPERIMENTATION</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Simulate Before You Build in Our Virtual Lab
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Avoid burnt chips and blown fuses. Our virtual laboratory runs real-time circuit physics models in your browser. Inspect frequency responses on digital storage oscilloscopes, adjust 555 timer duty cycles, and verify TTL logic gates before powering hardware.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Real-time HTML5 Oscilloscope</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>555 Timer Astable Sandbox</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Interactive TTL Logic Gates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Ohm's Law LED Burnout Guard</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenVirtualLab}
                  className="px-6 py-3 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-400/20 flex items-center gap-2 cursor-pointer"
                >
                  <Activity className="w-4 h-4" />
                  <span>Launch Virtual Simulator</span>
                </button>
              </div>
            </div>

            {/* Interactive Preview Canvas Box */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
                <span className="text-cyan-400 font-bold">RC FILTER LIVE DEMO</span>
                <span className="text-slate-400">f_c = 15.9 Hz</span>
              </div>
              <div className="p-3 rounded-xl bg-[#060a12] border border-slate-800 text-center font-mono text-xs text-cyan-300 space-y-1">
                <div>Sine Wave In ──▶ [ R: 1kΩ | C: 10μF ] ──▶ Filtered Out</div>
                <div className="text-[11px] text-emerald-400">Attenuation: -3.01 dB at Cutoff</div>
              </div>
              <p className="text-[11px] text-slate-400">
                Launch full virtual lab to adjust sliders for R, C, and frequency with live animated waveforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Benefits for 4 Stakeholders */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">ECOSYSTEM VALUE</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Built for Everyone in Electronics Engineering
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            From first-year lab students to university lab managers and hardware consignment owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">For Students</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Practise semester lab experiments at home without buying ₹40k test equipment. 15% student discount and 100% refundable deposits.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">For Colleges & Labs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Expand practical lab capacity during final project submissions. Standardized calibrated kits matching VTU, SPPU, and AKTU syllabi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">For Hobbyists & Makers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prototype IoT ideas, flash ESP32 firmware, and inspect SPI signals over the weekend without heavy capital investment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">For Equipment Owners</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Turn idle oscilloscopes and bench supplies into passive monthly revenue with 65% payouts, full showroom custody, and insurance.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Equipment Owner Earning Opportunity Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-cyan-800/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono text-cyan-400">CONSIGNMENT PROGRAM</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Have Bench Equipment Sitting Idle on a Shelf?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Join 40+ hardware owners who list their instruments with ENTCverse Hub. We handle storage, calibration checks, counter collection, and automatic monthly bank transfers.
            </p>
          </div>

          <button
            onClick={onOpenBusinessHub}
            className="px-6 py-3 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-400/20 shrink-0 cursor-pointer"
          >
            Open Equipment Owner Portal →
          </button>
        </div>
      </section>

      {/* 7. Student Projects Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-cyan-400">COMMUNITY CAPSTONES</span>
            <h2 className="text-2xl font-extrabold text-white">Featured Student Innovations</h2>
          </div>
          <span className="text-xs text-slate-400">Built using rented equipment</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STUDENT_PROJECTS.slice(0, 2).map((proj) => (
            <div key={proj.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span className="text-cyan-400 font-mono">{proj.category}</span>
                <span className="flex items-center gap-1 text-rose-400">
                  <Heart className="w-3.5 h-3.5" />
                  <span className="font-mono">{proj.likes}</span>
                </span>
              </div>
              <h4 className="text-base font-bold text-white">{proj.title}</h4>
              <p className="text-xs text-slate-400">{proj.author} · {proj.college}</p>
              <p className="text-xs text-slate-300 line-clamp-2">{proj.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">CLEAR ANSWERS</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Final Pre-Footer Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 p-10 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to Build Your Next Electronics Project?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Reserve calibrated oscilloscopes, development boards, and practical kits today. Pick up in 1 hour at our Pune showroom or get doorstep campus delivery.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={onExploreEquipment}
              className="px-6 py-3 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-400/20 cursor-pointer"
            >
              Explore Equipment Catalogue
            </button>
            <button
              onClick={onStartLearning}
              className="px-6 py-3 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Browse Lab Tutorials
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
