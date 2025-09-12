'use client';

import { useState } from 'react';
import { Award, ArrowLeft, Lightbulb, Users, Target, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';

export default function Exhibitors() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    yearsOfOperation: '',
    website: '',
    
    // Idea Overview
    ideaTitle: '',
    category: '',
    fieldOfFocus: '',
    areasOfInterest: '',
    uniqueness: '',
    summary: '',
    businessModel: '',
    targetMarket: '',
    
    // Collaboration & Support
    wantToTeamUp: '',
    lookingFor: '',
    
    // SDG Alignment
    sdgAlignment: [] as string[],
    otherSdg: ''
  });

  const categories = [
    'Green Jobs & Sustainability',
    'Digital Innovation & Technology',
    'Agribusiness & Food Systems',
    'Education & Skills Development',
    'Health & Wellbeing',
    'Infrastructure & Community Solutions'
  ];

  const sdgOptions = [
    'SDG 8 – Decent Work and Economic Growth',
    'SDG 9 – Industry, Innovation and Infrastructure'
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSdgToggle = (sdg: string) => {
    setFormData(prev => ({
      ...prev,
      sdgAlignment: prev.sdgAlignment.includes(sdg)
        ? prev.sdgAlignment.filter(item => item !== sdg)
        : [...prev.sdgAlignment, sdg]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Your idea has been submitted successfully!');
      // Reset form
      setFormData({
        fullName: '', email: '', phone: '', companyName: '', yearsOfOperation: '', website: '',
        ideaTitle: '', category: '', fieldOfFocus: '', areasOfInterest: '', uniqueness: '',
        summary: '', businessModel: '', targetMarket: '', wantToTeamUp: '', lookingFor: '',
        sdgAlignment: [], otherSdg: ''
      });
    } catch (error) {
      toast.error('Failed to submit your idea. Please try again.');
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
              <Lightbulb className="w-4 h-4 mr-2" />
              Idea Submission Portal
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              YPE Summit 2025 Idea Submission Form
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
              SDG 8 promotes decent work, youth employment, and inclusive economic growth. SDG 9 supports innovation, sustainable industry, and resilient infrastructure. The 3rd Edition Mwangaza YPE Summit aligns with both goals by empowering young people to design solutions that create jobs, drive innovation, and strengthen communities.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
                <Target className="w-6 h-6 mr-3 text-blue-600" />
                Submit Your Innovative Idea
              </CardTitle>
              <CardDescription className="text-gray-700">
                Share your vision for creating impact through innovation and entrepreneurship
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">🔹 Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name (if applicable)</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearsOfOperation" className="text-sm font-medium text-gray-700">Years of Operation (if applicable)</Label>
                      <Input
                        id="yearsOfOperation"
                        value={formData.yearsOfOperation}
                        onChange={(e) => handleInputChange('yearsOfOperation', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website" className="text-sm font-medium text-gray-700">Website (if applicable)</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Idea Overview */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">🔹 Idea Overview</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ideaTitle" className="text-sm font-medium text-gray-700">Title of Your Idea/Project</Label>
                      <Input
                        id="ideaTitle"
                        value={formData.ideaTitle}
                        onChange={(e) => handleInputChange('ideaTitle', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.category === 'other' && (
                        <Input
                          placeholder="Please specify"
                          className="mt-2"
                          onChange={(e) => handleInputChange('category', e.target.value)}
                        />
                      )}
                    </div>
                    <div>
                      <Label htmlFor="fieldOfFocus" className="text-sm font-medium text-gray-700">Field of Focus</Label>
                      <Input
                        id="fieldOfFocus"
                        placeholder="e.g., Renewable Energy, Fintech, Climate Resilience, Youth Empowerment, Logistics, etc."
                        value={formData.fieldOfFocus}
                        onChange={(e) => handleInputChange('fieldOfFocus', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="areasOfInterest" className="text-sm font-medium text-gray-700">Areas of Interest / Passion</Label>
                      <Input
                        id="areasOfInterest"
                        value={formData.areasOfInterest}
                        onChange={(e) => handleInputChange('areasOfInterest', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="uniqueness" className="text-sm font-medium text-gray-700">What Makes Your Idea Unique?</Label>
                      <Textarea
                        id="uniqueness"
                        placeholder="Highlight the innovation, impact, or spiritual inspiration behind it"
                        value={formData.uniqueness}
                        onChange={(e) => handleInputChange('uniqueness', e.target.value)}
                        required
                        className="mt-1 min-h-[100px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="summary" className="text-sm font-medium text-gray-700">Brief Summary of Proposed Solution</Label>
                      <Textarea
                        id="summary"
                        value={formData.summary}
                        onChange={(e) => handleInputChange('summary', e.target.value)}
                        required
                        className="mt-1 min-h-[100px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessModel" className="text-sm font-medium text-gray-700">Business Model or Funding Needs (Max 20 words)</Label>
                      <Textarea
                        id="businessModel"
                        value={formData.businessModel}
                        onChange={(e) => handleInputChange('businessModel', e.target.value)}
                        required
                        className="mt-1 min-h-[80px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="targetMarket" className="text-sm font-medium text-gray-700">Target Market / End-User</Label>
                      <Textarea
                        id="targetMarket"
                        placeholder="Who will benefit from this solution?"
                        value={formData.targetMarket}
                        onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                        required
                        className="mt-1 min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Collaboration & Support */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">🔹 Collaboration & Support</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Would You Like to Team Up with Others?</Label>
                      <RadioGroup
                        value={formData.wantToTeamUp}
                        onValueChange={(value) => handleInputChange('wantToTeamUp', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" />
                          <Label htmlFor="yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" />
                          <Label htmlFor="no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {formData.wantToTeamUp === 'yes' && (
                      <div>
                        <Label htmlFor="lookingFor" className="text-sm font-medium text-gray-700">
                          What Field or Expertise Are You Looking For?
                        </Label>
                        <Textarea
                          id="lookingFor"
                          placeholder="e.g., Marketing, Tech Development, Legal, Finance, Community Outreach"
                          value={formData.lookingFor}
                          onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                          className="mt-1 min-h-[80px]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* SDG Alignment */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">🔹 SDG Alignment</h3>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">Which SDG(s) Does Your Idea Support?</Label>
                    <div className="space-y-2">
                      {sdgOptions.map((sdg) => (
                        <div key={sdg} className="flex items-center space-x-2">
                          <Checkbox
                            id={sdg}
                            checked={formData.sdgAlignment.includes(sdg)}
                            onCheckedChange={() => handleSdgToggle(sdg)}
                          />
                          <Label htmlFor={sdg} className="text-sm">{sdg}</Label>
                        </div>
                      ))}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="other-sdg"
                          checked={formData.sdgAlignment.includes('other')}
                          onCheckedChange={() => handleSdgToggle('other')}
                        />
                        <Label htmlFor="other-sdg" className="text-sm">Other:</Label>
                        <Input
                          placeholder="Specify other SDG"
                          value={formData.otherSdg}
                          onChange={(e) => handleInputChange('otherSdg', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Your Idea'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo variant="footer" />
              <p className="mt-4 text-gray-400">
                Empowering young professionals and entrepreneurs to make a kingdom impact in their workplaces and communities.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-blue-900 transition-colors">Home</Link>
                <Link href="/about" className="block text-gray-400 hover:text-blue-900 transition-colors">About</Link>
                <Link href="/program" className="block text-gray-400 hover:text-blue-900 transition-colors">Program</Link>
                <Link href="/speakers" className="block text-gray-400 hover:text-blue-900 transition-colors">Speakers</Link>
                <Link href="/exhibitors" className="block text-blue-900 font-semibold">Exhibitors</Link>
                <Link href="/partnership" className="block text-gray-400 hover:text-blue-900 transition-colors">Partnership</Link>
                <Link href="/register" className="block text-gray-400 hover:text-blue-900 transition-colors">Register</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>Email: info@ypesummit.org</p>
                <p>Phone: +254 700 000 000</p>
                <p>Address: Nairobi, Kenya</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-colors">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-colors">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-colors">
                  <span className="text-sm">in</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition-colors">
                  <span className="text-sm">ig</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 YPE Summit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
