'use client';

import { useState } from 'react';
import { Award, ArrowLeft, Handshake, Star, Building, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';
import { createPartnership } from '@/actions/partnerships';
import { partnershipSchema, formatValidationErrors } from '@/lib/validations';
import { SUPPORT_TYPES } from '@/types';
import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';

export default function Partnership() {
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Partner form submission
  const handlePartnership = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPartnerSubmitting(true);
    setValidationErrors({});
    
    const formData = new FormData(e.currentTarget);
    const data = {
      organizationName: formData.get('organizationName') as string,
      contactPerson: formData.get('contactPerson') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      supportType: formData.get('supportType') as string,
      message: (formData.get('message') as string) || undefined,
    };

    // Validate form data
    const validation = partnershipSchema.safeParse(data);
    if (!validation.success) {
      const errors = formatValidationErrors(validation.error);
      setValidationErrors(errors);
      toast.error('Please fix the validation errors and try again.');
      setPartnerSubmitting(false);
      return;
    }

    try {
      const result = await createPartnership(validation.data);

      if (result.success) {
        toast.success(result.message || 'Partnership inquiry submitted successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error || 'Failed to submit partnership inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Partnership submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setPartnerSubmitting(false);
    }
  };

  const partnershipTiers = [
    {
      title: "Platinum Partner",
      amount: "KSH 100,000+",
      benefits: [
        "Logo prominently displayed on all materials",
        "Speaking opportunity during summit",
        "Dedicated booth space for networking",
        "10 complimentary registrations",
        "Social media recognition throughout event",
        "Post-event attendee contact list (with consent)"
      ],
      color: "from-gray-400 to-gray-600"
    },
    {
      title: "Gold Partner",
      amount: "KSH 50,000+",
      benefits: [
        "Logo on event materials and website",
        "Booth space during networking sessions",
        "5 complimentary registrations",
        "Social media mentions",
        "Recognition during opening ceremony"
      ],
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Silver Partner",
      amount: "KSH 25,000+",
      benefits: [
        "Logo on website and select materials",
        "3 complimentary registrations",
        "Social media recognition",
        "Networking opportunities"
      ],
      color: "from-gray-300 to-gray-500"
    },
    {
      title: "Bronze Partner",
      amount: "KSH 10,000+",
      benefits: [
        "Logo on website",
        "1 complimentary registration",
        "Social media mention",
        "Certificate of partnership"
      ],
      color: "from-blue-400 to-blue-600"
    }
  ];

  const supportTypes = [
    {
      icon: Building,
      title: "Financial Sponsorship",
      description: "Direct financial support to help cover event costs and ensure accessibility for all participants."
    },
    {
      icon: Users,
      title: "Venue Support",
      description: "Provide or sponsor venue space, equipment, or facilities needed for the summit."
    },
    {
      icon: Star,
      title: "Media Partnership",
      description: "Help promote the event through your media channels and platforms."
    },
    {
      icon: Handshake,
      title: "Logistics Support",
      description: "Provide services like catering, transportation, printing, or technical equipment."
    }
  ];

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
              Partnership Opportunities
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Partner With Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Join us in empowering the next generation of Kingdom-minded professionals. Your partnership makes a lasting impact.
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

      {/* Why Partner Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Partner With YPE Summit?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Align your organization with a movement that&apos;s transforming lives and communities through purposeful professional excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Reach Target Audience</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with ambitious young professionals and entrepreneurs who are making a difference in their industries and communities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Handshake className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Kingdom Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Support a faith-based initiative that promotes ethical business practices and Kingdom values in the marketplace.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Brand Visibility</h3>
                <p className="text-gray-600 leading-relaxed">
                  Gain exposure through our marketing channels, event materials, and social media platforms reaching thousands of professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partnership Tiers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the partnership level that best aligns with your organization&apos;s goals and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipTiers.map((tier, index) => (
              <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{tier.title}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-blue-900">{tier.amount}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ways to Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              There are various ways your organization can contribute to the success of the YPE Summit 2025.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportTypes.map((type, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <type.icon className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{type.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partner With Us Today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to make an impact? Fill out the form below and we&apos;ll get in touch to discuss partnership opportunities.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handlePartnership} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="organizationName">Organization Name *</Label>
                      <Input 
                        id="organizationName" 
                        name="organizationName"
                        required 
                        className={`mt-1 ${validationErrors.organizationName ? 'border-red-500' : ''}`}
                        placeholder="Enter organization name"
                      />
                      {validationErrors.organizationName && (
                        <p className="text-sm text-red-500 mt-1">{validationErrors.organizationName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input 
                        id="contactPerson" 
                        name="contactPerson"
                        required 
                        className={`mt-1 ${validationErrors.contactPerson ? 'border-red-500' : ''}`}
                        placeholder="Enter contact person name"
                      />
                      {validationErrors.contactPerson && (
                        <p className="text-sm text-red-500 mt-1">{validationErrors.contactPerson}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="partnerEmail">Email Address *</Label>
                      <Input 
                        id="partnerEmail" 
                        name="email"
                        type="email" 
                        required 
                        className={`mt-1 ${validationErrors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter email address"
                      />
                      {validationErrors.email && (
                        <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="partnerPhone">Phone Number *</Label>
                      <Input 
                        id="partnerPhone" 
                        name="phone"
                        type="tel" 
                        required 
                        className={`mt-1 ${validationErrors.phone ? 'border-red-500' : ''}`}
                        placeholder="Enter phone number"
                      />
                      {validationErrors.phone && (
                        <p className="text-sm text-red-500 mt-1">{validationErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="supportType">Type of Support *</Label>
                    <Select name="supportType" required>
                      <SelectTrigger className={`mt-1 ${validationErrors.supportType ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select support type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(SUPPORT_TYPES).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.supportType && (
                      <p className="text-sm text-red-500 mt-1">{validationErrors.supportType}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="partnerMessage">Message</Label>
                    <Textarea 
                      id="partnerMessage" 
                      name="message"
                      className={`mt-1 h-32 ${validationErrors.message ? 'border-red-500' : ''}`}
                      placeholder="Tell us more about your partnership interest, budget range, and how you'd like to support the summit..."
                    />
                    {validationErrors.message && (
                      <p className="text-sm text-red-500 mt-1">{validationErrors.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 text-lg"
                    disabled={partnerSubmitting}
                  >
                    {partnerSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about partnership opportunities? We&apos;re here to help you find the perfect way to support the summit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-yellow-400 text-2xl">📧</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
                <p className="text-gray-600 mb-2">partnerships@ypesummit.co.ke</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-blue-900 text-2xl">📞</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
                <p className="text-gray-600 mb-2">+254 700 000 000</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9AM-5PM EAT</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-yellow-400 text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">WhatsApp</h3>
                <p className="text-gray-600 mb-2">+254 700 000 000</p>
                <p className="text-sm text-gray-500">Quick responses</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join us in empowering the next generation of Kingdom-minded professionals. Your partnership will create lasting change in lives and communities.
          </p>
          <div className="space-x-4">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 text-lg"
              >
                Register to Attend
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
              >
                Learn About YPE
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
            <p>&copy; 2025 YPE Summit. All rights reserved. | Powered by Youth Ministries</p>
          </div>
        </div>
      </footer>
    </div>
  );
}