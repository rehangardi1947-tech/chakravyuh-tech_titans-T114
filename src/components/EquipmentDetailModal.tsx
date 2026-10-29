import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Check, 
  MapPin, 
  AlertTriangle, 
  FileText, 
  ShoppingCart,
  Layers,
  Sparkles
} from 'lucide-react';
import { EquipmentItem } from '../types';

interface EquipmentDetailModalProps {
  item: EquipmentItem | null;
  onClose: () => void;
  onBookNow: (item: EquipmentItem) => void;
}

export const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({
  item,
  onClose,
  onBookNow
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-[#0e1627] border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 space-y-6 shadow-2xl text-left">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="text-cyan-400 font-bold">{item.brand}</span>
            <span>·</span>
            <span>{item.category}</span>
            <span>·</span>
            <span>{item.model}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Product Hero Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-6 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[4/3]">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="md:col-span-6 space-y-3">
            <h2 className="text-xl font-bold text-white">{item.name}</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{item.shortDescription}</p>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-slate-400 text-[11px]">Daily Rate</span>
                  <div className="text-2xl font-bold font-mono text-cyan-400">
                    ₹{item.dailyRate} <span className="text-xs text-slate-400 font-normal">/ day</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[11px]">Weekly Pass (Save 30%)</span>
                  <div className="text-base font-bold font-mono text-white">
                    ₹{item.weeklyRate} <span className="text-xs text-slate-400 font-normal">/ week</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Refundable Deposit:</span>
                <span className="text-white font-mono font-bold">₹{item.deposit}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{item.showroomLocation}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookNow(item);
              }}
              className="w-full py-3 px-4 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-400/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Reserve & Schedule Pickup</span>
            </button>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Engineering Overview</h4>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            {item.fullDescription}
          </p>
        </div>

        {/* Technical Specifications Grid */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Technical Specifications</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {item.specs.map((spec, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex justify-between">
                <span className="text-slate-400">{spec.label}</span>
                <span className="font-mono text-cyan-300 font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Included Accessories */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Included in Rental Case</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {item.accessories.map((acc, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{acc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Laboratory Safety Warnings */}
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/50 flex items-start gap-3 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-300">Operational & Lab Safety Invariant</span>
            <p className="text-slate-300 leading-relaxed">{item.safetyNotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
