import React, { useState } from 'react';
import { 
  Cpu, 
  Menu, 
  X, 
  Search, 
  BookmarkCheck, 
  User, 
  SlidersHorizontal,
  MapPin
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCount: number;
  openBookingHistory: () => void;
  openAuthModal: () => void;
  currentUser: { name: string; role: 'student' | 'owner' } | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<{ name: string; role: 'student' | 'owner' } | null>>;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookingCount,
  openBookingHistory,
  openAuthModal,
  currentUser,
  setCurrentUser,
  onSearchClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'catalogue', label: 'Equipment Catalogue' },
    { id: 'rentals', label: 'Rent Equipment' },
    { id: 'learn', label: 'Learn ENTC' },
    { id: 'virtual-lab', label: 'Virtual Lab' },
    { id: 'projects', label: 'Projects' },
    { id: 'business', label: 'Business Dashboard' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b101b]/95 backdrop-blur-md">
      {/* Top micro showroom locator strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-slate-900/60 border-b border-slate-800/40 text-[12px] text-slate-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>Physical Electronics Showroom: Pune Tech Hub, JM Road · Mon-Sun 9AM-8PM</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Bengaluru & Delhi Pickup Counters Active</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Student Verification: Flat 15% Off Rentals</span>
          <span className="text-slate-600">|</span>
          <button 
            onClick={() => setActiveTab('business')} 
            className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Earn with Idle Lab Gear
          </button>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button 
          onClick={() => setActiveTab('home')} 
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 group cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/10 group-hover:shadow-cyan-500/25 transition-all">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              ENTCverse<span className="text-cyan-400 font-extrabold ml-1">Hub</span>
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
                  isActive 
                    ? 'text-cyan-400 font-semibold' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Affordances */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search affordance */}
          <button
            onClick={onSearchClick}
            title="Search equipment"
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Search equipment"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Active Bookings badge */}
          {bookingCount > 0 && (
            <button
              onClick={openBookingHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 rounded-lg hover:bg-cyan-900/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>{bookingCount} {bookingCount === 1 ? 'Booking' : 'Bookings'}</span>
            </button>
          )}

          {/* User Profile / Sign In */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab(currentUser.role === 'owner' ? 'business' : 'student-dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentUser.name}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">({currentUser.role})</span>
              </button>
              <button
                onClick={() => setCurrentUser(null)}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer px-1"
                title="Sign out"
              >
                Exit
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={() => setActiveTab('catalogue')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm shadow-cyan-400/20 hover:shadow-cyan-400/40 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Explore Equipment</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0e1524] px-4 pt-2 pb-6 space-y-1">
          <div className="py-2 px-3 text-xs text-slate-400 flex items-center gap-2 border-b border-slate-800/60 mb-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Pune Showroom Open · 9AM - 8PM</span>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === link.id
                  ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('catalogue')}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
            >
              Explore Equipment Catalogue
            </button>
            {!currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full py-2.5 text-center text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Sign In / Student Registration
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
