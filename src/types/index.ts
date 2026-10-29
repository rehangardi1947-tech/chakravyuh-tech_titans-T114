export type Category = 
  | 'All'
  | 'Microcontrollers'
  | 'Single Board Computers'
  | 'Prototyping & Cables'
  | 'Sensors & Modules'
  | 'Multimeters'
  | 'Oscilloscopes'
  | 'Signal Generators'
  | 'Power Supplies'
  | 'RF & Communication'
  | 'Robotics & IoT'
  | 'Soldering & Tools'
  | 'Complete Lab Kits';

export type Availability = 'In Showroom' | 'Express Dispatch' | 'Reserved';

export interface EquipmentItem {
  id: string;
  name: string;
  category: Category;
  model: string;
  brand: string;
  shortDescription: string;
  fullDescription: string;
  dailyRate: number; // in INR ₹ or USD $ equivalent
  weeklyRate: number;
  deposit: number;
  availability: Availability;
  image: string;
  rating: number;
  reviewsCount: number;
  specs: { label: string; value: string }[];
  accessories: string[];
  safetyNotes: string;
  showroomLocation: string;
  popular?: boolean;
}

export interface RentalBooking {
  equipmentId: string;
  equipmentName: string;
  dailyRate: number;
  days: number;
  startDate: string;
  totalRent: number;
  refundableDeposit: number;
  deliveryType: 'showroom_pickup' | 'express_courier';
  pickupLocation: string;
  studentName: string;
  collegeName: string;
  idNumber: string;
  status: 'Confirmed' | 'Active' | 'Returned';
}

export interface LearningGuide {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  summary: string;
  diagramTitle?: string;
  keyPoints: string[];
  experimentSteps: string[];
  codeSample?: string;
  formula?: {
    name: string;
    expression: string;
    description: string;
  };
}

export interface StudentProject {
  id: string;
  title: string;
  author: string;
  college: string;
  category: 'IoT' | 'Telecommunication' | 'Embedded Systems' | 'DSP' | 'Robotics';
  summary: string;
  description: string;
  componentsUsed: string[];
  schematicSummary: string;
  githubUrl: string;
  likes: number;
}
