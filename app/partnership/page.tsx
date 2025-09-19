'use client';

import { useState } from 'react';
import { Award, ArrowLeft, Handshake, Star, Building, Users, Lightbulb, Megaphone, Trophy, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Camera, Church, Coins } from 'lucide-react';
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
import Image from 'next/image';

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
      title: "Legacy Partner",
      amount: "KSH 500,000+",
      description: "Strategic co-creators. Help shape summit themes, co-lead pre-summit programs and community engagements, and support long-term youth-led innovation.",
      icon: Handshake,
      color: "from-purple-800 to-purple-900"
    },
    {
      title: "Innovation Ally", 
      amount: "KSH 150,000 - 250,000",
      description: "Support innovation and leadership. Help shape summit themes, support youth-led innovation, and participate in summit programming.",
      icon: Lightbulb,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Community Connector",
      amount: "KSH 50,000 - 150,000", 
      description: "Assist with outreach, youth mobilization, and community engagement. Acknowledge brand in community-facing engagements.",
      icon: Megaphone,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Youth Champion",
      amount: "KSH 25,000 - 50,000",
      description: "Provide tools, resources, and support to youth-led initiatives. Acknowledge brand in youth-facing engagements.",
      icon: Trophy,
      color: "from-green-500 to-green-600"
    }
  ];

  const supportTypes = [
    {
      icon: Coins,
      title: "Financial Sponsorship",
      description: "Direct financial support to help cover event costs and ensure accessibility for all participants."
    },
    {
      icon: Users,
      title: "Mentorship",
      description: "Provide guidance, coaching, and mentorship to empower young professionals in their career development."
    },
    {
      icon: Camera,
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
      <section className="relative text-white" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="space-y-6">
            <Badge className="bg-yellow-400 text-white text-sm font-semibold px-4 py-2">
              <Handshake className="w-4 h-4 text-blue-900" />
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Partner With Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Join us in empowering the next generation of spiritually grounded professionals. Your partnership makes a lasting impact.
            </p>
            
          </div>
        </div>
      </section>

      {/* Partnership Philosophy & Rationale */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Partnership Philosophy & Rationale
            </h2>
            <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
              <div className="flex-1">
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Our partnership model is local-first and equity-driven. It prioritizes community ownership, long-term capacity building, and shared leadership. Inspired by the Principles of Partnership and grounded in our spiritual commitment to Thrive with Purpose: God at the Center, we believe meaningful collaboration must be built on trust, humility, and mutual accountability.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  This approach ensures that partnerships are not transactional but transformational, creating sustainable impact that extends beyond the summit itself and into the communities we serve.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-96 h-96 rounded-full overflow-hidden shadow-2xl border-2 transform rotate-3 hover:rotate-0 transition-transform duration-300" style={{ borderColor: '#0b3050' }}>
                    <img 
                      src="/images/partnership.jpg" 
                      alt="Partnership collaboration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
                    <Handshake className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Values of Our Partnership Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide how we collaborate with our partners to create meaningful impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Local Leadership</h3>
                <p className="text-gray-600 leading-relaxed">
                  Youth and grassroots organizations best understand their communities. They are the experts and co-create solutions to meet their needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mutual Respect</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every partner brings value to it experience, experience, or faith. We foster a culture of listening and shared learning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Shared Responsibility</h3>
                <p className="text-gray-600 leading-relaxed">
                  Impact is co-owned. Partners walk in step through planning, delivery, and post-summit follow-up to ensure lasting change.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-800 to-purple-900 rounded-full flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Transparency & Accountability</h3>
                <p className="text-gray-600 leading-relaxed">
                  We commit to clear roles, ethical resource use, and open communication throughout the partnership.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
                  <Church className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Faith-Centered Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Purpose-driven leadership rooted in faith and service creates deep transformation. We welcome partners who share or honor this truth.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-6">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Legacy Building</h3>
                <p className="text-gray-600 leading-relaxed">
                  This model strengthens trust, advances localization, and builds legacy-capable partnerships in diverse and emergent contexts where youth empowerment and SDG 8 are central.
                </p>
              </CardContent>
            </Card>
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
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Spiritually Grounded Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Support a faith-based initiative that promotes ethical business practices and spiritually grounded values in the marketplace.
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
              <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <tier.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{tier.title}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-blue-900">{tier.amount}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{tier.description}</p>
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
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <type.icon className="w-8 h-8 text-white" />
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
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-blue-500/20 backdrop-blur-md border border-blue-300/30">
                  <Mail className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Email Us</h3>
                <p className="text-gray-600 mb-2">aysmwangaza@gmail.com</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-blue-500/20 backdrop-blur-md border border-blue-300/30">
                  <Phone className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Call Us</h3>
                <p className="text-gray-600 mb-2">+254117476172</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9AM-5PM EAT</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-blue-500/20 backdrop-blur-md border border-blue-300/30">
                  <MapPin className="h-8 w-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
                <p className="text-gray-600 mb-2">Mwangaza SDA Church</p>
                <p className="text-sm text-gray-500">Let's meet and partner</p>
              </CardContent>
            </Card>
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