import React, { useState } from 'react';
import { 
  Calculator, 
  Calendar, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { EQUIPMENT_ITEMS } from '../data/equipmentData';
import { EquipmentItem, RentalBooking } from '../types';

interface RentEquipmentViewProps {
  onBookNow: (item: EquipmentItem) => void;
  onExploreCatalogue: () => void;
}

export const RentEquipmentView: React.FC<RentEquipmentViewProps> = ({
  onBookNow,
  onExploreCatalogue
}) => {
  // Pre-selected items for rapid package estimation
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'eq-dso-1054', // Rigol DSO
    'eq-esp32-devkit', // ESP32
    'eq-solder-station' // Soldering station
  ]);
  const [rentalDays, setRentalDays] = useState<number>(7);
  const [hasStudentCard, setHasStudentCard] = useState<boolean>(true);
  const [deliveryMethod, setDeliveryMethod] = useState<'showroom' | 'courier'>('showroom');

  const selectedItems = EQUIPMENT_ITEMS.filter((i) => selectedIds.includes(i.id));

  const totalDailyBase = selectedItems.reduce((sum, item) => sum + item.dailyRate, 0);
  const rawRent = totalDailyBase * rentalDays;
  // If rental >= 7 days, 15% bundle discount; student card adds another 15%
  const durationDiscount = rentalDays >= 7 ? Math.round(rawRent * 0.15) : 0;
  const studentDiscount = hasStudentCard ? Math.round((rawRent - durationDiscount) * 0.15) : 0;
  const totalRent = rawRent - durationDiscount - studentDiscount;
  const totalDeposit = selectedItems.reduce((sum, item) => sum + item.deposit, 0);
  const deliveryCost = deliveryMethod === 'courier' ? 99 : 0;
  const grandTotal = totalRent + totalDeposit + deliveryCost;

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-1">
            <Calculator className="w-4 h-4" />
            <span>ESTIMATE & RESERVE CUSTOM LAB BUNDLES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Rent ENTC Equipment
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Build your custom electronics workbench package. Mix oscilloscopes, microcontrollers, and soldering stations with transparent daily pricing and verified student discounts.
          </p>
        </div>

        <button
          onClick={onExploreCatalogue}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer self-start md:self-auto"
        >
          <span>View All Available Hardware</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Equipment Selector */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300 uppercase tracking-wider">
              Select Workbench Equipment ({selectedIds.length} Selected)
            </span>
            <button
              onClick={() => setSelectedIds(EQUIPMENT_ITEMS.slice(0, 3).map((i) => i.id))}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Reset Recommended Bundle
            </button>
          </div>

          <div className="space-y-3">
            {EQUIPMENT_ITEMS.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-cyan-950/30 border-cyan-500/70 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-950 overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xs">
                      <div className="text-[10px] text-cyan-400 font-mono">{item.brand} · {item.category}</div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                      <div className="text-slate-400 text-[11px]">
                        Deposit: <span className="font-mono text-slate-300">₹{item.deposit}</span> · Location: {item.showroomLocation.split('(')[0]}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold font-mono text-white">₹{item.dailyRate}/d</div>
                    <span className={`text-[11px] font-semibold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {isSelected ? '✓ Added' : '+ Add to bundle'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Pricing Calculator Deck */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span>Rental Cost Breakdown</span>
            </h3>

            {/* Duration Selector */}
            <div className="space-y-2 text-xs">
              <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Rental Duration: {rentalDays} Days</span>
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 3, 7, 14, 30].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setRentalDays(d)}
                    className={`py-2 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                      rentalDays === d
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>

            {/* Student ID Discount Toggle */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="font-bold text-white">Student Subsidy (15%)</div>
                  <div className="text-[10px] text-slate-400">Available with university ID card</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={hasStudentCard}
                onChange={(e) => setHasStudentCard(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Delivery Option */}
            <div className="space-y-2 text-xs">
              <label className="text-slate-300 font-semibold">Handover Mode:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('showroom')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    deliveryMethod === 'showroom'
                      ? 'bg-cyan-950/40 border-cyan-500/60 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>Showroom</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">FREE (1 Hr Ready)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('courier')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    deliveryMethod === 'courier'
                      ? 'bg-cyan-950/40 border-cyan-500/60 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1">
                    <Truck className="w-3 h-3 text-cyan-400" />
                    <span>Campus Courier</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono mt-0.5">+₹99 Doorstep</div>
                </button>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Standard Daily Rent:</span>
                <span className="font-mono text-white">₹{totalDailyBase}/day</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Days ({rentalDays}d):</span>
                <span className="font-mono text-white">₹{rawRent}</span>
              </div>
              {durationDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Weekly Duration Discount:</span>
                  <span className="font-mono">-₹{durationDiscount}</span>
                </div>
              )}
              {studentDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Student ID Subsidy (15%):</span>
                  <span className="font-mono">-₹{studentDiscount}</span>
                </div>
              )}
              {deliveryCost > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Campus Delivery:</span>
                  <span className="font-mono text-white">+₹{deliveryCost}</span>
                </div>
              )}
              <div className="flex justify-between text-cyan-400">
                <span>Refundable Security Deposit:</span>
                <span className="font-mono font-bold">+₹{totalDeposit}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-sm font-bold text-white">
                <span>Total Initial Payment:</span>
                <span className="text-xl font-mono text-cyan-400">₹{grandTotal}</span>
              </div>
              <p className="text-[10px] text-slate-500">
                *₹{totalDeposit} deposit is refunded immediately upon showroom return test.
              </p>
            </div>

            {/* Direct Booking Action */}
            <button
              disabled={selectedItems.length === 0}
              onClick={() => {
                if (selectedItems.length > 0) {
                  onBookNow(selectedItems[0]);
                }
              }}
              className="w-full py-3 px-4 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-md shadow-cyan-400/20 cursor-pointer"
            >
              Reserve Bundle & Schedule Showroom Pickup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
