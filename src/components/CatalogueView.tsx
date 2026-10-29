import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Check, 
  Eye, 
  ShoppingCart, 
  Scale, 
  ShieldCheck, 
  MapPin,
  Sparkles,
  Info
} from 'lucide-react';
import { EQUIPMENT_ITEMS } from '../data/equipmentData';
import { Category, EquipmentItem } from '../types';

interface CatalogueViewProps {
  onSelectEquipment: (item: EquipmentItem) => void;
  onBookEquipment: (item: EquipmentItem) => void;
  initialSearchQuery?: string;
}

const CATEGORIES: Category[] = [
  'All',
  'Oscilloscopes',
  'Microcontrollers',
  'Single Board Computers',
  'Sensors & Modules',
  'Soldering & Tools',
  'Signal Generators',
  'Power Supplies',
  'Multimeters',
  'RF & Communication',
  'Robotics & IoT',
  'Prototyping & Cables',
  'Complete Lab Kits'
];

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  onSelectEquipment,
  onBookEquipment,
  initialSearchQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'All' | 'In Showroom' | 'Express Dispatch'>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'rating'>('recommended');
  
  // Side-by-side comparison state (holds up to 3 item IDs)
  const [comparedItemIds, setComparedItemIds] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Filtered and sorted equipment
  const filteredItems = useMemo(() => {
    return EQUIPMENT_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Availability filter
      if (availabilityFilter !== 'All' && item.availability !== availabilityFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesModel = item.model.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription.toLowerCase().includes(query);
        return matchesName || matchesBrand || matchesModel || matchesCategory || matchesDesc;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.dailyRate - b.dailyRate;
      if (sortBy === 'price_high') return b.dailyRate - a.dailyRate;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [selectedCategory, availabilityFilter, searchQuery, sortBy]);

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (comparedItemIds.includes(id)) {
      setComparedItemIds(comparedItemIds.filter((item) => item !== id));
    } else {
      if (comparedItemIds.length >= 3) {
        alert('You can compare a maximum of 3 items at a time.');
        return;
      }
      setComparedItemIds([...comparedItemIds, id]);
    }
  };

  const comparedItems = useMemo(() => {
    return EQUIPMENT_ITEMS.filter((item) => comparedItemIds.includes(item.id));
  }, [comparedItemIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Breadcrumb header */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Home</span>
          <span>/</span>
          <span className="text-cyan-400">Equipment Catalogue</span>
          <span>/</span>
          <span>Verified Bench Hardware</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          ENTC Equipment Catalogue & Rental Inventory
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Reserve genuine test benches, development kits, and measurement equipment. Available for instant counter pickup at our physical Pune showroom or door-step campus delivery.
        </p>
      </div>

      {/* Control Bar: Search input, Availability toggle, and Price Sorting */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search oscilloscopes, ESP32, multimeters, soldering, sensors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Availability Filter (Interactive Segmented buttons) */}
          <div className="md:col-span-3 flex items-center gap-1 p-1 bg-slate-950 border border-slate-800/80 rounded-lg">
            {(['All', 'In Showroom', 'Express Dispatch'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setAvailabilityFilter(status)}
                className={`flex-1 py-1.5 px-2 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  availabilityFilter === status
                    ? 'bg-slate-800 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="recommended">Sort by: Recommended</option>
              <option value="price_low">Daily Rate: Low to High</option>
              <option value="price_high">Daily Rate: High to Low</option>
              <option value="rating">Student Rating</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Filter Scroller */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-1 px-3 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-slate-800/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Results Summary & Comparison Bar Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          Showing <span className="text-white font-mono font-medium">{filteredItems.length}</span> lab instruments & kits
          {selectedCategory !== 'All' && <span> in <strong className="text-cyan-400">{selectedCategory}</strong></span>}
        </div>

        {comparedItemIds.length > 0 && (
          <div className="flex items-center gap-3 bg-cyan-950/40 border border-cyan-800/60 px-3 py-1.5 rounded-lg">
            <span className="text-cyan-300 font-medium">
              {comparedItemIds.length} item{comparedItemIds.length > 1 ? 's' : ''} selected to compare
            </span>
            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-2.5 py-1 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded cursor-pointer"
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={() => setComparedItemIds([])}
              className="text-slate-400 hover:text-white"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Equipment Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 space-y-3">
          <Info className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-semibold text-white">No equipment matches your filters</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try clearing the search query or selecting "All" categories to view available lab devices.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setAvailabilityFilter('All');
            }}
            className="px-4 py-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 border border-cyan-900 rounded-lg cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isCompared = comparedItemIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-slate-700 transition-all duration-200 overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-slate-950/40"
              >
                {/* Image Container with Fallback */}
                <div 
                  onClick={() => onSelectEquipment(item)}
                  className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback if image fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Brand Tag Top-Left */}
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-700/80 rounded px-2 py-0.5 text-[11px] font-mono text-cyan-300">
                    {item.brand}
                  </div>

                  {/* Availability Badge Top-Right */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                      item.availability === 'In Showroom'
                        ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-800/80'
                        : 'bg-blue-950/90 text-blue-300 border border-blue-800/80'
                    }`}>
                      {item.availability}
                    </span>
                  </div>

                  {/* Comparison Checkbox Overlay Bottom-Left */}
                  <button
                    onClick={(e) => toggleCompare(item.id, e)}
                    className={`absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                      isCompared
                        ? 'bg-cyan-400 text-slate-950 font-semibold'
                        : 'bg-slate-900/90 text-slate-300 border border-slate-700 hover:border-cyan-400'
                    }`}
                  >
                    <Scale className="w-3 h-3" />
                    <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-left">
                    {/* Unboxed category and model metadata */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-300">{item.model}</span>
                    </div>

                    <h3 
                      onClick={() => onSelectEquipment(item)}
                      className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.shortDescription}
                    </p>

                    {/* Key Technical Specs List */}
                    <div className="pt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-400 font-mono">
                      {item.specs.slice(0, 2).map((s, idx) => (
                        <span key={idx} className="text-slate-300">
                          {s.label}: <strong className="text-cyan-400 font-medium">{s.value}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Pricing and Actions */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-base font-bold text-white font-mono tabular-nums">
                          ₹{item.dailyRate} <span className="text-xs text-slate-400 font-normal">/ day</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Refundable Deposit: ₹{item.deposit}
                        </div>
                      </div>

                      <div className="text-right text-[11px] text-slate-400">
                        <span className="text-amber-400">★ {item.rating}</span> ({item.reviewsCount})
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectEquipment(item)}
                        className="py-2 px-3 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>View Details</span>
                      </button>

                      <button
                        onClick={() => onBookEquipment(item)}
                        className="py-2 px-3 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-cyan-400/20"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Rent Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {showComparisonModal && comparedItems.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0e1627] border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Compare Electronics Equipment</h3>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparedItems.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-left">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-950">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] text-cyan-400 font-mono">{item.brand}</span>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.shortDescription}</p>
                  </div>

                  <div className="py-2 border-y border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Daily Rate:</span>
                      <strong className="text-white font-mono">₹{item.dailyRate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Weekly Rate:</span>
                      <strong className="text-white font-mono">₹{item.weeklyRate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Deposit:</span>
                      <strong className="text-cyan-400 font-mono">₹{item.deposit}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Availability:</span>
                      <span className="text-emerald-400">{item.availability}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="font-semibold text-slate-300">Key Specs:</span>
                    {item.specs.map((s, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] text-slate-400">
                        <span>{s.label}</span>
                        <span className="text-slate-200 font-mono">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setShowComparisonModal(false);
                      onBookEquipment(item);
                    }}
                    className="w-full py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg cursor-pointer transition-colors"
                  >
                    Rent This Device
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
