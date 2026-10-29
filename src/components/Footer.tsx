import React from 'react';
import { Cpu, ShieldCheck, Phone, Mail, Building, Clock } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full bg-[#080c14] border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                ENTCverse<span className="text-cyan-400 ml-1">Hub</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The hybrid electronics learning and equipment rental platform. Bridging the gap between theory and hands-on laboratory practice with affordable short-term bench equipment rentals and interactive online lab simulations.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>Tagline: <span className="text-cyan-400 font-medium">Learn. Rent. Build. Innovate.</span></p>
              <p>Physical Showroom & Dispatch Center: Pune Tech Hub, Maharashtra</p>
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('catalogue')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Equipment Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('rentals')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Rental Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('virtual-lab')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Virtual Circuit Simulator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('learn')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Learning Academy & Pinouts
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Student Project Showcase
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom & Business */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Physical Hubs</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <Building className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Pune Showroom (Main): JM Road, Shivaji Nagar</span>
              </li>
              <li className="flex items-start gap-2">
                <Building className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Bengaluru Hub: Koramangala 4th Block</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Counter Hours: 09:00 - 20:00 Daily</span>
              </li>
              <li>
                <button onClick={() => setActiveTab('business')} className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors text-left cursor-pointer">
                  List Your Idle Lab Equipment →
                </button>
              </li>
            </ul>
          </div>

          {/* Safety & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Lab Trust & Support</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Calibrated Gear</span>
              </div>
              <p className="text-slate-400">Every rented oscilloscope & meter passes bench verification before handover.</p>
              <div className="pt-2 text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-cyan-400" />
                  <span>+91 20 2550 4900 (Lab Helpline)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-cyan-400" />
                  <span>support@entcversehub.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom hairline & copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 ENTCverse Hub. All rights reserved. Connecting physical electronics showrooms with student innovation.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Lab Safety Policy</span>
            <span>·</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Security Deposit Terms</span>
            <span>·</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Equipment Consignment Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
