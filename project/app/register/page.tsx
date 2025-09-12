'use client';

import { useState } from 'react';
import { Award, ArrowLeft, Users, CheckCircle } from 'lucide-react';
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

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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
      workshopPreference: formData.get('workshopPreference') as string,
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
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="space-y-6">
            <Badge className="bg-yellow-400 text-blue-900 text-sm font-semibold px-4 py-2">
              Registration & Q&A
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Secure Your Spot
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Register for the YPE Summit 2025 and submit your questions for our live Q&A sessions.
            </p>
            <Link href="/">
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
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
              Join us for a transformative day of empowerment and inspiration. Registration is free!
            </p>
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 text-white max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4">
                <Users className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="font-semibold">What&apos;s Included:</p>
                  <ul className="text-sm text-blue-100 mt-2 space-y-1">
                    <li>• Full access to all sessions and workshops</li>
                    <li>• Lunch and networking refreshments</li>
                    <li>• Digital summit materials and resources</li>
                    <li>• Certificate of participation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto">
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
                    <h4 className="font-semibold text-yellow-800">Next Steps</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      After registration, you&apos;ll receive a confirmation email with event details and your workshop assignment.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don&apos;t Miss This Opportunity
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Spaces are limited and filling up fast. Register today to secure your spot at the YPE Summit 2025.
          </p>
          <div className="space-x-4">
            <Link href="/speakers">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
              >
                Meet Our Speakers
              </Button>
            </Link>
            <Link href="/program">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
              >
                View Full Program
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo variant="footer" />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering Kingdom-minded professionals to make a lasting impact in their fields and communities.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-white transition-colors">Home</Link>
                <Link href="/speakers" className="block text-gray-400 hover:text-white transition-colors">Speakers</Link>
                <Link href="/program" className="block text-gray-400 hover:text-white transition-colors">Program</Link>
                <Link href="/register" className="block text-gray-400 hover:text-white transition-colors">Register</Link>
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <p>info@ypesummit.co.ke</p>
                <p>+254 700 000 000</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="space-y-2 text-gray-400">
                <p>Follow us on social media for updates</p>
                <div className="flex space-x-4 mt-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">f</span>
                  </div>
                  <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">ig</span>
                  </div>
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">wa</span>
                  </div>
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">yt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} YPE Summit. All rights reserved. | Powered by Youth Ministries</p>
          </div>
        </div>
      </footer>
    </div>
  );
}