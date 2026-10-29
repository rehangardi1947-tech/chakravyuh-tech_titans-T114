import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { CatalogueView } from './components/CatalogueView';
import { RentEquipmentView } from './components/RentEquipmentView';
import { VirtualLabView } from './components/VirtualLabView';
import { LearnView } from './components/LearnView';
import { ProjectsView } from './components/ProjectsView';
import { BusinessDashboardView } from './components/BusinessDashboardView';
import { StudentDashboardView } from './components/StudentDashboardView';
import { EquipmentDetailModal } from './components/EquipmentDetailModal';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { EQUIPMENT_ITEMS } from './data/equipmentData';
import { EquipmentItem, RentalBooking } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedDetailItem, setSelectedDetailItem] = useState<EquipmentItem | null>(null);
  const [selectedBookingItem, setSelectedBookingItem] = useState<EquipmentItem | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: 'student' | 'owner' } | null>({
    name: 'Arjun Mehta',
    role: 'student'
  });

  // Initial demo booking for realistic showroom handover display
  const [bookings, setBookings] = useState<RentalBooking[]>([
    {
      equipmentId: 'eq-dso-1054',
      equipmentName: 'Rigol DS1054Z Plus 100MHz 4CH DSO',
      dailyRate: 290,
      days: 3,
      startDate: '2026-11-01',
      totalRent: 740,
      refundableDeposit: 3500,
      deliveryType: 'showroom_pickup',
      pickupLocation: 'Pune Central Electronics Showroom (Rack A-04)',
      studentName: 'Arjun Mehta',
      collegeName: 'COEP Technological University',
      idNumber: 'COEP-2023-ENTC-042',
      status: 'Confirmed'
    }
  ]);

  const handleBookingConfirmed = (newBooking: RentalBooking) => {
    setBookings([newBooking, ...bookings]);
  };

  const handleSearchClick = () => {
    setActiveTab('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b101b] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingCount={bookings.length}
        openBookingHistory={() => setActiveTab('student-dashboard')}
        openAuthModal={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onSearchClick={handleSearchClick}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            onExploreEquipment={() => setActiveTab('catalogue')}
            onStartLearning={() => setActiveTab('learn')}
            onOpenVirtualLab={() => setActiveTab('virtual-lab')}
            onSelectEquipment={(item) => setSelectedDetailItem(item)}
            onBookEquipment={(item) => setSelectedBookingItem(item)}
            onOpenBusinessHub={() => setActiveTab('business')}
          />
        )}

        {activeTab === 'catalogue' && (
          <CatalogueView
            onSelectEquipment={(item) => setSelectedDetailItem(item)}
            onBookEquipment={(item) => setSelectedBookingItem(item)}
          />
        )}

        {activeTab === 'rentals' && (
          <RentEquipmentView
            onBookNow={(item) => setSelectedBookingItem(item)}
            onExploreCatalogue={() => setActiveTab('catalogue')}
          />
        )}

        {activeTab === 'virtual-lab' && (
          <VirtualLabView />
        )}

        {activeTab === 'learn' && (
          <LearnView />
        )}

        {activeTab === 'projects' && (
          <ProjectsView />
        )}

        {activeTab === 'business' && (
          <BusinessDashboardView />
        )}

        {activeTab === 'student-dashboard' && (
          <StudentDashboardView
            bookings={bookings}
            onExploreMore={() => setActiveTab('catalogue')}
            onOpenVirtualLab={() => setActiveTab('virtual-lab')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modals & Overlays */}
      <EquipmentDetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
        onBookNow={(item) => {
          setSelectedDetailItem(null);
          setSelectedBookingItem(item);
        }}
      />

      <BookingModal
        equipment={selectedBookingItem}
        onClose={() => setSelectedBookingItem(null)}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(user) => setCurrentUser(user)}
      />
    </div>
  );
}
