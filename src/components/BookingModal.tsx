import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { EquipmentItem, RentalBooking } from '../types';

interface BookingModalProps {
  equipment: EquipmentItem | null;
  onClose: () => void;
  onBookingConfirmed: (booking: RentalBooking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  equipment,
  onClose,
  onBookingConfirmed
}) => {
  if (!equipment) return null;

  const [days, setDays] = useState<number>(3);
  const [startDate, setStartDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [deliveryType, setDeliveryType] = useState<'showroom_pickup' | 'express_courier'>('showroom_pickup');
  const [pickupCity, setPickupCity] = useState<string>('Pune Central Electronics Showroom (JM Road)');
  
  // Student verification state
  const [studentName, setStudentName] = useState('Arjun Mehta');
  const [collegeName, setCollegeName] = useState('COEP Technological University');
  const [idNumber, setIdNumber] = useState('COEP-2023-ENTC-042');
  const [hasStudentDiscount, setHasStudentDiscount] = useState(true);

  // Completed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<RentalBooking | null>(null);

  // Pricing calculations
  const rawRent = equipment.dailyRate * days;
  const discountAmount = hasStudentDiscount ? Math.round(rawRent * 0.15) : 0;
  const deliveryFee = deliveryType === 'express_courier' ? 99 : 0;
  const finalRent = rawRent - discountAmount + deliveryFee;
  const totalDueNow = finalRent + equipment.deposit;

  const handleConfirmOrder = () => {
    const booking: RentalBooking = {
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      dailyRate: equipment.dailyRate,
      days,
      startDate,
      totalRent: finalRent,
      refundableDeposit: equipment.deposit,
      deliveryType,
      pickupLocation: deliveryType === 'showroom_pickup' ? pickupCity : 'Campus Courier Delivery',
      studentName,
      collegeName,
      idNumber,
      status: 'Confirmed'
    };

    setConfirmedBooking(booking);
    onBookingConfirmed(booking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-[#0e1627] border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 space-y-6 shadow-2xl text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              {confirmedBooking ? 'RESERVATION CONFIRMATION' : 'EQUIPMENT RENTAL DISPATCH'}
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">
              {confirmedBooking ? 'Rental Reserved Successfully' : `Reserve ${equipment.name}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Receipt View */
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <h4 className="text-sm font-bold text-white">Booking Ref: ENTC-2026-9814</h4>
                <p className="text-emerald-300">
                  Your reservation is locked in inventory. Equipment has been transferred to testing bench for calibration verification.
                </p>
              </div>
            </div>

            {/* Pickup Counter instructions & QR Pass */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
              <div className="p-3 bg-white rounded-xl text-slate-900 flex flex-col items-center">
                <QrCode className="w-24 h-24 text-slate-900" />
                <span className="text-[10px] font-mono font-bold mt-1">COUNTER PASS</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="text-cyan-400 font-semibold uppercase tracking-wider text-[11px]">
                  Fulfillment Instructions:
                </div>
                <p className="text-slate-300">
                  Show this QR code along with your <strong className="text-white">{confirmedBooking.collegeName}</strong> student ID at the pickup desk.
                </p>
                <div className="text-slate-400 space-y-0.5">
                  <p>Location: <span className="text-white">{confirmedBooking.pickupLocation}</span></p>
                  <p>Reservation Start: <span className="text-white">{confirmedBooking.startDate}</span> ({confirmedBooking.days} Days)</p>
                  <p>Refundable Deposit: <span className="text-cyan-400 font-mono">₹{confirmedBooking.refundableDeposit}</span> (Refunded immediately upon return test)</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  alert(`Receipt for Booking ENTC-2026-9814 downloaded for ${confirmedBooking.studentName}.`);
                }}
                className="px-4 py-2.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Save PDF Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Configuration Form */
          <div className="space-y-5">
            {/* Equipment Quick Summary */}
            <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                <img src={equipment.image} alt={equipment.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="text-cyan-400 font-mono font-medium">{equipment.brand} · {equipment.model}</span>
                <h4 className="text-sm font-bold text-white">{equipment.name}</h4>
                <div className="text-slate-400">
                  Daily rate: <strong className="text-white font-mono">₹{equipment.dailyRate}</strong> · Deposit: <strong className="text-cyan-400 font-mono">₹{equipment.deposit}</strong>
                </div>
              </div>
            </div>

            {/* Dates & Duration Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-xs">
                <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Start Date:</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Rental Duration ({days} Days):</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 3, 7, 14, 30].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDays(d)}
                      className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                        days === d
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {d}d
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Method Choice */}
            <div className="space-y-2 text-xs">
              <label className="text-slate-300 font-semibold">Handover & Collection Mode:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('showroom_pickup')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    deliveryType === 'showroom_pickup'
                      ? 'bg-cyan-950/30 border-cyan-500/60 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      Showroom Pickup
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">FREE</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Ready in 1 hour. Inspect & test on bench before leaving.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('express_courier')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    deliveryType === 'express_courier'
                      ? 'bg-cyan-950/30 border-cyan-500/60 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-cyan-400" />
                      Campus Courier
                    </span>
                    <span className="text-[10px] font-mono text-slate-300">+₹99</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Delivered directly to college hostel or campus lab.</p>
                </button>
              </div>
            </div>

            {/* Student ID Verification */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white">Student Verification (15% Off Applied)</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">VERIFIED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">Student Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">College / University</label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">Student ID / PRN Number</label>
                  <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-slate-200 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Transparent Cost Breakdown */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Equipment Rental ({days} days @ ₹{equipment.dailyRate}/day):</span>
                <span className="font-mono text-white">₹{rawRent}</span>
              </div>
              {hasStudentDiscount && (
                <div className="flex justify-between text-emerald-400">
                  <span>Student Lab Subsidy (15%):</span>
                  <span className="font-mono">-₹{discountAmount}</span>
                </div>
              )}
              {deliveryFee > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Express Courier Dispatch:</span>
                  <span className="font-mono text-white">+₹{deliveryFee}</span>
                </div>
              )}
              <div className="flex justify-between text-cyan-400">
                <span>Refundable Security Deposit (100% returned on check-in):</span>
                <span className="font-mono font-bold">+₹{equipment.deposit}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-sm font-bold text-white">
                <span>Total Amount Due on Pickup:</span>
                <span className="text-xl font-mono text-cyan-400">₹{totalDueNow}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="px-6 py-2.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg cursor-pointer shadow-md shadow-cyan-400/20"
              >
                Confirm Reservation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
