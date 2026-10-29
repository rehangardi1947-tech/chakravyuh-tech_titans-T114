import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Plus, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Layers,
  MapPin
} from 'lucide-react';

interface ConsignmentItem {
  id: string;
  name: string;
  brand: string;
  model: string;
  dailyRate: number;
  totalEarnings: number;
  status: 'Rented' | 'In Showroom' | 'Under Inspection';
  currentRenter?: string;
  returnDate?: string;
  conditionRating: number;
}

export const BusinessDashboardView: React.FC = () => {
  const [items, setItems] = useState<ConsignmentItem[]>([
    {
      id: 'cons-1',
      name: 'Rigol DS1054Z 100MHz DSO',
      brand: 'Rigol',
      model: 'DS1054Z Plus',
      dailyRate: 290,
      totalEarnings: 8700,
      status: 'Rented',
      currentRenter: 'COEP VLSI Lab Group',
      returnDate: 'Nov 02, 2026',
      conditionRating: 98
    },
    {
      id: 'cons-2',
      name: 'Siglent SDG1032X Function Generator',
      brand: 'Siglent',
      model: 'SDG1032X',
      dailyRate: 260,
      totalEarnings: 5200,
      status: 'In Showroom',
      conditionRating: 99
    },
    {
      id: 'cons-3',
      name: 'YIHUA 862D+ Dual Soldering Station',
      brand: 'YIHUA',
      model: '862D+',
      dailyRate: 140,
      totalEarnings: 3360,
      status: 'Rented',
      currentRenter: 'Rohan Deshmukh (Robotics Capstone)',
      returnDate: 'Nov 04, 2026',
      conditionRating: 95
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newRate, setNewRate] = useState(150);
  const [dropoffShowroom, setDropoffShowroom] = useState('Pune Central Electronics Showroom (JM Road)');
  const [payoutRequested, setPayoutRequested] = useState(false);

  const totalEarningsAllTime = items.reduce((acc, i) => acc + i.totalEarnings, 0);
  const activeRentedCount = items.filter((i) => i.status === 'Rented').length;
  const availableBalance = 6420; // Unwithdrawn balance in INR

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newBrand) return;

    const newItem: ConsignmentItem = {
      id: `cons-${Date.now()}`,
      name: newName,
      brand: newBrand,
      model: newModel || 'Standard Lab Edition',
      dailyRate: Number(newRate),
      totalEarnings: 0,
      status: 'Under Inspection',
      conditionRating: 100
    };

    setItems([...items, newItem]);
    setShowAddModal(false);
    setNewName('');
    setNewBrand('');
    setNewModel('');
  };

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => setPayoutRequested(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Title & Hub Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-1">
            <Building2 className="w-4 h-4" />
            <span>EQUIPMENT OWNER & LAB CONSIGNMENT PORTAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Monetize Your Idle Lab Hardware
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Senior engineers, professors, and private makers can deposit idle oscilloscopes, RF analyzers, and bench instruments at our verified physical showrooms and earn monthly rental revenue.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-cyan-400/20 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>List Equipment for Consignment</span>
        </button>
      </div>

      {/* 4 Financial & Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">All-Time Earnings</span>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            ₹{totalEarningsAllTime.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">65% net owner revenue split</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Available Payout Balance</span>
          <div className="text-2xl font-bold font-mono text-white">
            ₹{availableBalance.toLocaleString()}
          </div>
          <div className="pt-1">
            {payoutRequested ? (
              <span className="text-xs text-emerald-400 font-medium">Payout Request Initiated (NEFT)</span>
            ) : (
              <button
                onClick={handleRequestPayout}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
              >
                Withdraw to Bank Account →
              </button>
            )}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Active Equipment on Rent</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {activeRentedCount} <span className="text-xs text-slate-400 font-normal">of {items.length} listed</span>
          </div>
          <p className="text-[11px] text-slate-500">100% covered by security deposits</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Showroom Verification Hub</span>
          <div className="text-sm font-bold text-white mt-1">Pune Tech Hub (JM Rd)</div>
          <p className="text-[11px] text-slate-400">Bench calibration tests active</p>
        </div>
      </div>

      {/* Active Consigned Equipment Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white">Your Listed Inventory</h3>
          <span className="text-xs font-mono text-slate-400">{items.length} Devices Registered</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Equipment / Model</th>
                <th className="py-3 px-4 font-semibold">Daily Rate</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Current Deployment</th>
                <th className="py-3 px-4 font-semibold">Bench Health</th>
                <th className="py-3 px-4 font-semibold text-right">Total Accrued</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white font-sans">{item.name}</div>
                    <div className="text-[11px] text-slate-400">{item.brand} · {item.model}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-300">
                    ₹{item.dailyRate}/d
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.status === 'Rented'
                        ? 'bg-blue-950 text-cyan-300 border border-blue-800'
                        : item.status === 'In Showroom'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-sans text-slate-300">
                    {item.currentRenter ? (
                      <div>
                        <div>{item.currentRenter}</div>
                        <div className="text-[10px] text-slate-500">Due: {item.returnDate}</div>
                      </div>
                    ) : (
                      <span className="text-slate-500">In Showroom Showcase</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-emerald-400 font-bold">{item.conditionRating}%</span>
                    <span className="text-[10px] text-slate-500 block font-sans">No damage recorded</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-cyan-400">
                    ₹{item.totalEarnings.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How Owner Consignment Works */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          How Consignment Works for Lab Owners
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="text-cyan-400 font-bold font-mono">01. Drop Off at Showroom</div>
            <p className="text-slate-400 leading-relaxed">
              Bring your equipment to Pune or Bengaluru showroom. Our lab technicians perform electrical calibration and high-voltage safety testing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="text-cyan-400 font-bold font-mono">02. 100% Insured Rentals</div>
            <p className="text-slate-400 leading-relaxed">
              Every rental collects full refundable security deposits and student ID verification. Accidental probe damage is covered under our insurance pool.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <div className="text-cyan-400 font-bold font-mono">03. Automated Monthly Payouts</div>
            <p className="text-slate-400 leading-relaxed">
              Earn 65% of all daily and weekly rental proceeds deposited straight to your bank account via automated monthly payout.
            </p>
          </div>
        </div>
      </div>

      {/* Modal: List New Equipment */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0e1627] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">List Lab Equipment for Rent</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-medium">Equipment Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohde & Schwarz Spectrum Analyzer"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Brand / Manufacturer</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Keysight / Rigol"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Model Number</label>
                  <input
                    type="text"
                    placeholder="e.g. DSO-X 2004A"
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium">Desired Daily Rental (₹)</label>
                <input
                  type="number"
                  min="20"
                  max="5000"
                  value={newRate}
                  onChange={(e) => setNewRate(Number(e.target.value))}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium">Showroom Drop-off Center</label>
                <select
                  value={dropoffShowroom}
                  onChange={(e) => setDropoffShowroom(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  <option>Pune Central Electronics Showroom (JM Road)</option>
                  <option>Bengaluru Innovation Hub (Koramangala)</option>
                  <option>Delhi Tech Center (Nehru Place)</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-[11px] text-cyan-300">
                A lab technician will call you within 24 hours to schedule the handover and calibration check.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-slate-900 bg-cyan-400 hover:bg-cyan-300 font-semibold rounded-lg"
                >
                  Submit Consignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
