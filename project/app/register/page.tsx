'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Award, ArrowLeft, Users, CheckCircle, Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';
import { createRegistration } from '@/actions/registrations';
import { registrationSchema, formatValidationErrors } from '@/lib/validations';
import { AREA_OF_INTEREST_OPTIONS } from '@/types';
import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';
import { Facebook, Twitter, Youtube } from 'lucide-react';

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  // Registration form submission
  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors({});
    
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      profession: formData.get('profession') as string,
      church: (formData.get('church') as string) || undefined,
      areaOfInterest: formData.get('workshopPreference') as string,
    };

    // Validate form data
    const validation = registrationSchema.safeParse(data);
    if (!validation.success) {
      const errors = formatValidationErrors(validation.error);
      setValidationErrors(errors);
      toast.error('Please fix the validation errors and try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await createRegistration(validation.data);

      if (result.success) {
        toast.success(result.message || 'Registration submitted successfully!');
        (e.target as HTMLFormElement).reset();
        router.push('/');
      } else {
        toast.error(result.error || 'Failed to submit registration. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative text-white" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="space-y-6">
            <Badge className="bg-yellow-400 text-blue-900 text-sm font-semibold px-4 py-2">
              <Pen className="w-4 h-4" />
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Secure Your Spot
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Register for the YPE Summit 2025 and submit your questions for our live Q&A sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Register to Attend
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Join us for a transformative day of empowerment and inspiration.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src="/images/mpesa.png" alt="M-Pesa" className="w-100 h-54 object-contain" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Facilitation Fee</h3>
                  <p className="text-2xl font-bold text-green-600">KSH 500</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-3">M-Pesa Send Money Payment Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Phone Number:</span>
                        <span className="font-mono font-semibold text-gray-900">0117476172</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold text-green-600">KSH 500</span>
                      </div>
                      
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Please complete payment after submitting your registration form.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 shadow-lg">
              <form onSubmit={handleRegistration} className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input 
                    id="fullName" 
                    name="fullName"
                    required 
                    className={`mt-1 ${validationErrors.fullName ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {validationErrors.fullName && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    required 
                    className={`mt-1 ${validationErrors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email address"
                  />
                  {validationErrors.email && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel" 
                    required 
                    className={`mt-1 ${validationErrors.phone ? 'border-red-500' : ''}`}
                    placeholder="Enter your phone number"
                  />
                  {validationErrors.phone && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="profession">Profession or Industry *</Label>
                  <Input 
                    id="profession" 
                    name="profession"
                    required 
                    className={`mt-1 ${validationErrors.profession ? 'border-red-500' : ''}`}
                    placeholder="e.g., Marketing, Healthcare, Finance"
                  />
                  {validationErrors.profession && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.profession}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="church">Church / Ministry Affiliation (Optional)</Label>
                  <Input 
                    id="church" 
                    name="church"
                    className={`mt-1 ${validationErrors.church ? 'border-red-500' : ''}`}
                    placeholder="Enter your church or ministry"
                  />
                  {validationErrors.church && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.church}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="workshopPreference">Workshop Preference *</Label>
                  <Select name="workshopPreference" required>
                    <SelectTrigger className={`mt-1 ${validationErrors.workshopPreference ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Choose your preferred workshop" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(AREA_OF_INTEREST_OPTIONS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors.workshopPreference && (
                    <p className="text-sm text-red-500 mt-1">{validationErrors.workshopPreference}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">Workshop spaces are limited and allocated on first-come, first-served basis</p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-3 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Register Now'}
                </Button>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">We're Excited!</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Looking forward to seeing you at the YPE Summit 2025!
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo variant="footer" width={80} height={80} />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering spiritually grounded professionals to make a lasting impact in their fields and communities.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-blue-900 transition-colors">Home</Link>
                <Link href="/about" className="block text-gray-400 hover:text-blue-900 transition-colors">About</Link>
                <Link href="/program" className="block text-gray-400 hover:text-blue-900 transition-colors">Program</Link>
                <Link href="/speakers" className="block text-gray-400 hover:text-blue-900 transition-colors">Speakers</Link>
                <Link href="/register" className="block text-gray-400 hover:text-blue-900 transition-colors">Register</Link>
                <Link href="/about" className="block text-gray-400 hover:text-blue-900 transition-colors">About</Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <p>aysmwangaza@gmail.com</p>
                <p> +254117476172</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="space-y-2 text-gray-400">
                <p>Follow us on social media for updates</p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="#"
                    aria-label="YouTube"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
                  >
                    <Youtube className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} YPE Summit. All rights reserved. | Powered by Mwangaza Adventist Youth Society YPE Band</p>
          </div>
        </div>
      </footer>
    </div>
  );
}