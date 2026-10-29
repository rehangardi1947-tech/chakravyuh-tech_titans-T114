import React from 'react';
import { 
  User, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  BookOpen,
  MapPin
} from 'lucide-react';
import { RentalBooking } from '../types';

interface StudentDashboardViewProps {
  bookings: RentalBooking[];
  onExploreMore: () => void;
  onOpenVirtualLab: () => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  bookings,
  onExploreMore,
  onOpenVirtualLab
}) => {
  const activeRentals = bookings.filter((b) => b.status === 'Active' || b.status === 'Confirmed');
  const totalLockedDeposit = bookings.reduce((sum, b) => sum + b.refundableDeposit, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Student Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-1">
            <User className="w-4 h-4" />
            <span>STUDENT RESEARCHER ACCOUNT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome, Arjun Mehta
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span>COEP Technological University</span>
            <span>·</span>
            <span className="font-mono text-cyan-400">PRN: 112203042 (Verified 15% Subsidy Active)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenVirtualLab}
            className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
          >
            Launch Virtual Lab
          </button>
          <button
            onClick={onExploreMore}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg cursor-pointer transition-colors"
          >
            Rent Additional Hardware
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Active Lab Rentals</span>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {activeRentals.length} <span className="text-xs text-slate-400 font-normal">equipment unit{activeRentals.length !== 1 ? 's' : ''}</span>
          </div>
          <p className="text-[11px] text-slate-500">Scheduled for Pune Showroom pickup</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Total Refundable Deposits</span>
          <div className="text-2xl font-bold font-mono text-white">
            ₹{totalLockedDeposit.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% refunded immediately upon bench test</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400">Student Subsidy Savings</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            ₹1,420
          </div>
          <p className="text-[11px] text-slate-500">Saved vs commercial lab equipment retail</p>
        </div>
      </div>

      {/* Bookings & Active Reservations Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white">Your Equipment Rentals</h3>
          <span className="text-xs font-mono text-slate-400">{bookings.length} Records</span>
        </div>

        {bookings.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400 space-y-2">
            <p>You have not reserved any lab equipment yet.</p>
            <button
              onClick={onExploreMore}
              className="text-cyan-400 font-semibold hover:underline"
            >
              Browse Equipment Catalogue →
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Equipment Name</th>
                  <th className="py-3 px-4 font-semibold">Duration</th>
                  <th className="py-3 px-4 font-semibold">Fulfillment Station</th>
                  <th className="py-3 px-4 font-semibold">Rental Fee</th>
                  <th className="py-3 px-4 font-semibold">Security Deposit</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {bookings.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-sans font-bold text-white">
                      {b.equipmentName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {b.days} Days (Starts {b.startDate})
                    </td>
                    <td className="py-3.5 px-4 font-sans text-slate-300">
                      {b.pickupLocation}
                    </td>
                    <td className="py-3.5 px-4 text-white">
                      ₹{b.totalRent}
                    </td>
                    <td className="py-3.5 px-4 text-cyan-400">
                      ₹{b.refundableDeposit}
                    </td>
                    <td className="py-3.5 px-4 font-sans">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-sans">
                      <button
                        onClick={() => alert(`Showing Counter QR Pass for reservation: ${b.equipmentName}`)}
                        className="px-2.5 py-1 text-[11px] font-medium text-cyan-300 bg-cyan-950/70 border border-cyan-800 hover:bg-cyan-900 rounded cursor-pointer"
                      >
                        Counter Pass
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recommended Next Experiments */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Suggested Practicals for Your Active Gear
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-mono text-[10px]">OSCILLOSCOPE PRACTICAL</span>
            <h4 className="font-bold text-white">Measuring Rise-Time and Slew-Rate on Op-Amp 741</h4>
            <p className="text-slate-400">Step-by-step procedure to connect 10X probe and measure slew rate (ΔV / Δt).</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-mono text-[10px]">WIRELESS TELEMETRY PRACTICAL</span>
            <h4 className="font-bold text-white">LoRa Point-to-Point Packet RSSI Verification</h4>
            <p className="text-slate-400">Calibrating antenna match and checking packet drop rate at 500m distance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
