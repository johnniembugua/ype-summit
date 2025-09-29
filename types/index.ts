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
  upvotes: number;
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

export type Exhibitor = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string | null;
  yearsOfOperation?: string | null;
  website?: string | null;
  ideaTitle: string;
  category: string;
  fieldOfFocus: string;
  areasOfInterest?: string | null;
  uniqueness: string;
  summary: string;
  businessModel: string;
  targetMarket: string;
  wantToTeamUp: 'yes' | 'no';
  lookingFor?: string | null;
  sdgAlignment: string; // JSON array of selected SDGs
  otherSdg?: string | null;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  reviewedAt?: Date | null;
  reviewedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Feedback = {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  dayAttended: 'yes' | 'partial';
  overallRating: number; // 1-5 stars
  contentQuality: number; // 1-5 stars
  speakerQuality: number; // 1-5 stars
  organizationRating: number; // 1-5 stars
  venueRating: number; // 1-5 stars
  networkingRating: number; // 1-5 stars
  mostValuable: string;
  improvements: string;
  futureTopics: string;
  recommendLikelihood?: string | null;
  additionalComments?: string | null;
  workshopFeedback?: string | null;
  favoriteWorkshop?: string | null;
  favoriteWorkshopOther?: string | null;
  speakerSuggestions?: string | null;
  speakerSpecialization?: string | null;
  shareContact?: string | null; // yes, no
  speakerContact?: string | null;
  status: 'pending' | 'reviewed' | 'archived';
  reviewedAt?: Date | null;
  reviewedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type EventAnalytics = {
  id: string;
  eventType: 'registration' | 'question_submission' | 'partnership_inquiry' | 'exhibitor_submission' | 'feedback_submission';
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
  areaOfInterest: string;
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

export type ExhibitorFormData = {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  yearsOfOperation?: string;
  website?: string;
  ideaTitle: string;
  category: string;
  fieldOfFocus: string;
  areasOfInterest?: string;
  uniqueness: string;
  summary: string;
  businessModel: string;
  targetMarket: string;
  wantToTeamUp: 'yes' | 'no';
  lookingFor?: string;
  sdgAlignment: string[];
  otherSdg?: string;
};

export type FeedbackFormData = {
  fullName: string;
  email: string;
  phone?: string;
  dayAttended: string;
  overallRating: string;
  contentQuality: string;
  speakerQuality: string;
  organizationRating: string;
  venueRating: string;
  networkingRating: string;
  mostValuable: string;
  improvements: string;
  futureTopics: string;
  recommendLikelihood?: string;
  additionalComments?: string;
  workshopFeedback?: string;
  favoriteWorkshop?: string;
  favoriteWorkshopOther?: string;
  speakerSuggestions?: string;
  speakerSpecialization?: string;
  shareContact?: string;
  speakerContact?: string;
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

export type ExhibitorStats = {
  total: number;
  pending: number;
  reviewed: number;
  approved: number;
  rejected: number;
};

export type FeedbackStats = {
  total: number;
  pending: number;
  reviewed: number;
  archived: number;
};

// Area of interest preferences
export type AreaOfInterest = 
  | 'professional_growth'
  | 'entrepreneurship'
  | 'leadership'
  | 'finance'
  | 'technology'
  | 'healthcare'
  | 'education'
  | 'ministry';

export const AREA_OF_INTEREST_OPTIONS = {
  professional_growth: 'Professional Growth & Career Development',
  entrepreneurship: 'Entrepreneurship & Business Innovation',
  leadership: 'Leadership & Management',
  finance: 'Financial Planning & Investment',
  technology: 'Technology & Digital Innovation',
  healthcare: 'Healthcare & Medical Fields',
  education: 'Education & Academic Development',
  ministry: 'Ministry & Spiritual Growth',
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
