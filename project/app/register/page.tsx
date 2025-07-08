'use client';

import { useState } from 'react';
import { Award, ArrowLeft, Users, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionSubmitting, setQuestionSubmitting] = useState(false);

  // Registration form submission
  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      profession: formData.get('profession'),
      church: formData.get('church'),
      workshopPreference: formData.get('workshopPreference'),
      type: 'registration'
    };

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast.success('Registration submitted successfully! You will receive a confirmation email with payment details.');
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error('Failed to submit registration. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Question submission
  const handleQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuestionSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      question: formData.get('question'),
      name: formData.get('name'),
      type: 'question'
    };

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast.success('Question submitted successfully! We\'ll address it during the summit.');
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error('Failed to submit question. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setQuestionSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">YPE Summit 2025</h1>
                <p className="text-sm text-gray-600">Youth Ministries</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-900 transition-colors">Home</Link>
              <Link href="/speakers" className="text-gray-700 hover:text-blue-900 transition-colors">Speakers</Link>
              <Link href="/program" className="text-gray-700 hover:text-blue-900 transition-colors">Program</Link>
              <Link href="/register" className="text-blue-900 font-semibold">Register</Link>
              <Link href="/partnership" className="text-gray-700 hover:text-blue-900 transition-colors">Partnership</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-900 transition-colors">About</Link>
            </nav>
          </div>
        </div>
      </header>

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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Registration Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Register to Attend
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Join us for a transformative day of empowerment and inspiration. Registration fee: <span className="font-bold text-yellow-600">KSH 400</span>
                </p>
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 text-white">
                  <div className="flex items-center space-x-4">
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

              <form onSubmit={handleRegistration} className="space-y-6">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input 
                    id="fullName" 
                    name="fullName"
                    required 
                    className="mt-1"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    required 
                    className="mt-1"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel" 
                    required 
                    className="mt-1"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="profession">Profession or Industry *</Label>
                  <Input 
                    id="profession" 
                    name="profession"
                    required 
                    className="mt-1"
                    placeholder="e.g., Marketing, Healthcare, Finance"
                  />
                </div>

                <div>
                  <Label htmlFor="church">Church / Ministry Affiliation (Optional)</Label>
                  <Input 
                    id="church" 
                    name="church"
                    className="mt-1"
                    placeholder="Enter your church or ministry"
                  />
                </div>

                <div>
                  <Label htmlFor="workshopPreference">Workshop Preference *</Label>
                  <Select name="workshopPreference" required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose your preferred workshop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="innovation">Innovation with Purpose (Dr. Sarah Kiprotich)</SelectItem>
                      <SelectItem value="finance">Financial Stewardship & Wealth Building (Daniel Kariuki)</SelectItem>
                      <SelectItem value="healthcare">Healthcare Excellence & Compassion (Dr. Grace Wanjiku)</SelectItem>
                      <SelectItem value="media">Media with Kingdom Values (Samuel Njenga)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">Workshop spaces are limited and allocated on first-come, first-served basis</p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-3 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Register Now - KSH 400'}
                </Button>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Next Steps</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        After registration, you&apos;ll receive an email with payment instructions and event details. Payment can be made via M-Pesa or bank transfer.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Q&A Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ask a Question
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Submit your questions for our speakers and panel discussions. We&apos;ll address them during the live Q&A sessions.
                </p>
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6 text-blue-900">
                  <div className="flex items-center space-x-4">
                    <MessageSquare className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">Real-time Q&A</p>
                      <p className="text-sm mt-1">Questions will be reviewed and answered during the summit sessions.</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleQuestion} className="space-y-6">
                <div>
                  <Label htmlFor="questionName">Your Name *</Label>
                  <Input 
                    id="questionName" 
                    name="name"
                    required 
                    className="mt-1"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <Label htmlFor="question">Your Question *</Label>
                  <Textarea 
                    id="question" 
                    name="question"
                    required 
                    className="mt-1 h-32"
                    placeholder="What would you like to ask our speakers? Be specific about the topic or speaker you're addressing."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 text-lg"
                  disabled={questionSubmitting}
                >
                  {questionSubmitting ? 'Submitting...' : 'Submit Question'}
                </Button>
              </form>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Question Guidelines</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p>Keep questions clear and specific to get the best answers</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p>Questions will be moderated and selected for live sessions</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p>Focus on professional development and Kingdom principles</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p>Submit multiple questions if you have different topics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Payment Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple and secure payment options to complete your registration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">M-Pesa Payment</CardTitle>
                <CardDescription>Quick and convenient mobile payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">KSH 400</p>
                  <p className="text-gray-600">Registration Fee</p>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Paybill:</strong> 123456</p>
                  <p><strong>Account:</strong> Your Full Name</p>
                  <p><strong>Amount:</strong> 400</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-700">
                    <strong>Note:</strong> Use your full name as the account number for easy identification.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Bank Transfer</CardTitle>
                <CardDescription>Direct bank transfer option</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">KSH 400</p>
                  <p className="text-gray-600">Registration Fee</p>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Bank:</strong> Equity Bank</p>
                  <p><strong>Account:</strong> 1234567890</p>
                  <p><strong>Account Name:</strong> YPE Summit 2025</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> Please include your name in the transfer reference.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Confirmation</h3>
              <p className="text-gray-600 mb-4">
                After making payment, please send your payment confirmation (screenshot or receipt) to:
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-blue-900">Email: payments@ypesummit.co.ke</p>
                <p className="font-semibold text-blue-900">WhatsApp: +254 700 000 000</p>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Include your full name and phone number for quick processing.
              </p>
            </div>
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
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">YPE Summit 2025</h3>
                  <p className="text-sm text-gray-400">Youth Ministries</p>
                </div>
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