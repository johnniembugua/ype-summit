// Database table types
export type Registration = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  church?: string | null;
  workshopPreference: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string | null;
  paymentReference?: string | null;
  registrationDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Question = {
  id: string;
  name: string;
  question: string;
  status: 'pending' | 'reviewed' | 'answered' | 'archived';
  category?: string | null;
  isAnswered: boolean;
  answeredAt?: Date | null;
  answeredBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Partnership = {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  supportType: 'financial' | 'venue' | 'media' | 'logistics' | 'other';
  message?: string | null;
  status: 'pending' | 'contacted' | 'confirmed' | 'declined';
  partnershipTier?: 'platinum' | 'gold' | 'silver' | 'bronze' | null;
  partnershipValue?: number | null;
  followUpDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type EventAnalytics = {
  id: string;
  eventType: 'registration' | 'question_submission' | 'partnership_inquiry';
  ipAddress?: string | null;
  userAgent?: string | null;
  referrer?: string | null;
  timestamp: Date;
};

// Form data types
export type RegistrationFormData = {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  church?: string;
  workshopPreference: string;
};

export type QuestionFormData = {
  name: string;
  question: string;
  category?: string;
};

export type PartnershipFormData = {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  supportType: string;
  message?: string;
};

// API response types
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Statistics types
export type RegistrationStats = {
  total: number;
  paid: number;
  pending: number;
};

export type QuestionStats = {
  total: number;
  pending: number;
  reviewed: number;
  answered: number;
};

export type PartnershipStats = {
  total: number;
  pending: number;
  contacted: number;
  confirmed: number;
  declined: number;
};

// Workshop preferences
export type WorkshopPreference = 
  | 'innovation'
  | 'finance'
  | 'healthcare'
  | 'media';

export const WORKSHOP_OPTIONS = {
  innovation: 'Innovation with Purpose (Dr. Sarah Kiprotich)',
  finance: 'Financial Stewardship & Wealth Building (Daniel Kariuki)',
  healthcare: 'Healthcare Excellence & Compassion (Dr. Grace Wanjiku)',
  media: 'Media with Kingdom Values (Samuel Njenga)',
} as const;

// Support types
export const SUPPORT_TYPES = {
  financial: 'Financial Sponsorship',
  venue: 'Venue Support',
  media: 'Media Partnership',
  logistics: 'Logistics Support',
  other: 'Other',
} as const;

// Partnership tiers
export const PARTNERSHIP_TIERS = {
  platinum: 'Platinum Partner',
  gold: 'Gold Partner',
  silver: 'Silver Partner',
  bronze: 'Bronze Partner',
} as const;
