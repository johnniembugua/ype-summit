import { z } from 'zod';

// Registration form validation schema
export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(255, 'Full name must be less than 255 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[+]?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  profession: z
    .string()
    .min(2, 'Profession must be at least 2 characters')
    .max(255, 'Profession must be less than 255 characters'),
  church: z
    .string()
    .max(255, 'Church name must be less than 255 characters')
    .optional(),
  workshopPreference: z
    .enum(['innovation', 'finance', 'healthcare', 'media'], {
      required_error: 'Please select a workshop preference',
    }),
});

// Question form validation schema
export const questionSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name must be less than 255 characters'),
  question: z
    .string()
    .min(10, 'Question must be at least 10 characters')
    .max(1000, 'Question must be less than 1000 characters'),
  category: z
    .string()
    .max(100, 'Category must be less than 100 characters')
    .optional(),
});

// Partnership form validation schema
export const partnershipSchema = z.object({
  organizationName: z
    .string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(255, 'Organization name must be less than 255 characters'),
  contactPerson: z
    .string()
    .min(2, 'Contact person name must be at least 2 characters')
    .max(255, 'Contact person name must be less than 255 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[+]?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  supportType: z
    .enum(['financial', 'venue', 'media', 'logistics', 'other'], {
      required_error: 'Please select a support type',
    }),
  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
});

// Payment validation schema
export const paymentSchema = z.object({
  registrationId: z.string().uuid('Invalid registration ID'),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']),
  paymentMethod: z
    .enum(['mpesa', 'bank_transfer', 'card'])
    .optional(),
  paymentReference: z
    .string()
    .max(255, 'Payment reference must be less than 255 characters')
    .optional(),
});

// Email validation helper
export const isValidEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};

// Phone validation helper
export const isValidPhone = (phone: string): boolean => {
  return /^[+]?[\d\s\-\(\)]+$/.test(phone) && phone.length >= 10 && phone.length <= 20;
};

// Sanitize input helper
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ');
};

// Format phone number helper
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  // If it starts with 254, it's already in international format
  if (cleaned.startsWith('254')) {
    return '+' + cleaned;
  }
  
  // If it starts with 0, replace with 254
  if (cleaned.startsWith('0')) {
    return '+254' + cleaned.substring(1);
  }
  
  // If it's 9 digits, assume it's missing the leading 0
  if (cleaned.length === 9) {
    return '+254' + cleaned;
  }
  
  return phone; // Return original if we can't format it
};

// Validation error formatter
export const formatValidationErrors = (errors: z.ZodError): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};
  
  errors.errors.forEach((error) => {
    const path = error.path.join('.');
    formattedErrors[path] = error.message;
  });
  
  return formattedErrors;
};
