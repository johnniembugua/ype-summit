'use client';

import { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';
import { Facebook, Twitter, Youtube } from 'lucide-react';

export default function Feedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dayAttended: '',
    overallRating: '',
    contentQuality: '',
    speakerQuality: '',
    organizationRating: '',
    venueRating: '',
    networkingRating: '',
    mostValuable: '',
    improvements: '',
    futureTopics: '',
    recommendLikelihood: '',
    additionalComments: '',
    workshopFeedback: '',
    favoriteWorkshop: '',
    favoriteWorkshopOther: '',
    speakerSuggestions: '',
    speakerSpecialization: '',
    shareContact: '',
    speakerContact: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.dayAttended) {
      toast.error('Please select your attendance status.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.mostValuable || !formData.improvements || !formData.futureTopics) {
      toast.error('Please complete all Quick Feedback questions.');
      setIsSubmitting(false);
      return;
    }

    // Validate ratings
    const requiredRatings = ['overallRating', 'contentQuality', 'speakerQuality', 'organizationRating', 'venueRating', 'networkingRating'];
    const missingRatings = requiredRatings.filter(rating => !formData[rating as keyof typeof formData]);
    
    if (missingRatings.length > 0) {
      toast.error('Please provide ratings for all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Thank you for your feedback! Your input helps us improve future events.');
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          dayAttended: '',
          overallRating: '',
          contentQuality: '',
          speakerQuality: '',
          organizationRating: '',
          venueRating: '',
          networkingRating: '',
          mostValuable: '',
          improvements: '',
          futureTopics: '',
          recommendLikelihood: '',
          additionalComments: '',
          workshopFeedback: '',
          favoriteWorkshop: '',
          favoriteWorkshopOther: '',
          speakerSuggestions: '',
          speakerSpecialization: '',
          shareContact: '',
          speakerContact: ''
        });
      } else {
        toast.error(result.error || 'Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const RatingStars = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            star <= parseInt(value) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => onChange(star.toString())}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #87CEEB, #F7F7F7, #FFFBCF)' }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center text-blue-900 hover:text-blue-700 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              YPE Summit 2025 Feedback
            </h1>
            <p className="text-xl text-gray-600">
              Help us improve by sharing your experience at the YPE Summit 2025
            </p>
          </div>

          {/* Feedback Form */}
          <Card className="shadow-xl backdrop-blur-lg bg-white/10 border border-white/20">
            <CardHeader className="text-white rounded-t-lg shadow-lg" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
              <CardTitle className="text-2xl">Event Feedback Form</CardTitle>
              <CardDescription className="text-blue-100">
                Your feedback is valuable to us and will help us create better experiences in the future.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <Card className="border border-white/30 backdrop-blur-sm bg-gradient-to-br from-white/20 via-blue-50/20 to-white/30 shadow-lg shadow-blue-200/10">
                  <CardHeader className="bg-gradient-to-r from-blue-100/30 to-blue-200/20 backdrop-blur-sm border-b border-white/30 pb-4">
                    <CardTitle className="text-lg font-semibold text-blue-900">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white/10 backdrop-blur-sm">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter your email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dayAttended">Did you attend the YPE Summit 2025? *</Label>
                          <Select value={formData.dayAttended} onValueChange={(value) => handleInputChange('dayAttended', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select attendance" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes, I attended the full event</SelectItem>
                              <SelectItem value="partial">Yes, I attended part of the event</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Overall Ratings */}
                <Card className="border border-white/30 backdrop-blur-sm bg-gradient-to-br from-white/20 via-blue-50/20 to-white/30 shadow-lg shadow-blue-200/10">
                  <CardHeader className="bg-gradient-to-r from-blue-100/30 to-blue-200/20 backdrop-blur-sm border-b border-white/30 pb-4">
                    <CardTitle className="text-lg font-semibold text-blue-900">Overall Ratings (1-5 stars)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white/10 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Overall Event Experience *</Label>
                        <RatingStars value={formData.overallRating} onChange={(value) => handleInputChange('overallRating', value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Content Quality *</Label>
                        <RatingStars value={formData.contentQuality} onChange={(value) => handleInputChange('contentQuality', value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Speaker Quality *</Label>
                        <RatingStars value={formData.speakerQuality} onChange={(value) => handleInputChange('speakerQuality', value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Event Organization *</Label>
                        <RatingStars value={formData.organizationRating} onChange={(value) => handleInputChange('organizationRating', value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Venue & Facilities *</Label>
                        <RatingStars value={formData.venueRating} onChange={(value) => handleInputChange('venueRating', value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Networking Opportunities *</Label>
                        <RatingStars value={formData.networkingRating} onChange={(value) => handleInputChange('networkingRating', value)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Workshop Preferences */}
                <Card className="border border-white/30 backdrop-blur-sm bg-gradient-to-br from-white/20 via-blue-50/20 to-white/30 shadow-lg shadow-blue-200/10">
                  <CardHeader className="bg-gradient-to-r from-blue-100/30 to-blue-200/20 backdrop-blur-sm border-b border-white/30 pb-4">
                    <CardTitle className="text-lg font-semibold text-blue-900">Workshop Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white/10 backdrop-blur-sm">
                    <div className="space-y-2">
                      <Label htmlFor="favoriteWorkshop">What was your favorite workshop?</Label>
                      <Select value={formData.favoriteWorkshop} onValueChange={(value) => handleInputChange('favoriteWorkshop', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select favorite workshop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entrepreneurship">Entrepreneurship & Business Development</SelectItem>
                          <SelectItem value="career-growth">Career Growth & Professional Development</SelectItem>
                          <SelectItem value="innovation">Innovation & Emerging Trends</SelectItem>
                          <SelectItem value="financial-literacy">Financial Literacy</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.favoriteWorkshop === 'other' && (
                        <div className="space-y-2 mt-4">
                          <Label htmlFor="favoriteWorkshopOther">Please specify your favorite workshop:</Label>
                          <Input
                            id="favoriteWorkshopOther"
                            value={formData.favoriteWorkshopOther}
                            onChange={(e) => handleInputChange('favoriteWorkshopOther', e.target.value)}
                            placeholder="Enter your favorite workshop"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Speaker Suggestions */}
                <Card className="border border-white/30 backdrop-blur-sm bg-gradient-to-br from-white/20 via-blue-50/20 to-white/30 shadow-lg shadow-blue-200/10">
                  <CardHeader className="bg-gradient-to-r from-blue-100/30 to-blue-200/20 backdrop-blur-sm border-b border-white/30 pb-4">
                    <CardTitle className="text-lg font-semibold text-blue-900">Future Speaker Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white/10 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="speakerSpecialization">What type of speaker expertise would you like to see at future summits?</Label>
                        <Select value={formData.speakerSpecialization} onValueChange={(value) => handleInputChange('speakerSpecialization', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select expertise area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="leadership">Leadership Experts</SelectItem>
                            <SelectItem value="technology">Technology Innovators</SelectItem>
                            <SelectItem value="ministry">Ministry Leaders</SelectItem>
                            <SelectItem value="business">Business Professionals</SelectItem>
                            <SelectItem value="education">Education Specialists</SelectItem>
                            <SelectItem value="community">Community Developers</SelectItem>
                            <SelectItem value="spiritual">Spiritual Teachers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="speakerSuggestions">Specific speaker you'd like to see at future summits (optional)</Label>
                        <Input
                          id="speakerSuggestions"
                          value={formData.speakerSuggestions}
                          onChange={(e) => handleInputChange('speakerSuggestions', e.target.value)}
                          placeholder="Speaker name or organization you'd recommend"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="speakerContact">Speaker contact information (optional)</Label>
                        <Input
                          id="speakerContact"
                          value={formData.speakerContact}
                          onChange={(e) => handleInputChange('speakerContact', e.target.value)}
                          placeholder="Speaker email or phone number (if you have it)"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Feedback */}
                <Card className="border border-white/30 backdrop-blur-sm bg-gradient-to-br from-white/20 via-blue-50/20 to-white/30 shadow-lg shadow-blue-200/10">
                  <CardHeader className="bg-gradient-to-r from-blue-100/30 to-blue-200/20 backdrop-blur-sm border-b border-white/30 pb-4">
                    <CardTitle className="text-lg font-semibold text-blue-900">Quick Feedback</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white/10 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="mostValuable">What was most valuable to you? *</Label>
                        <Select value={formData.mostValuable} onValueChange={(value) => handleInputChange('mostValuable', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select most valuable" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="networking">Networking Opportunities</SelectItem>
                            <SelectItem value="workshops">Workshops & Sessions</SelectItem>
                            <SelectItem value="speakers">Speaker Presentations</SelectItem>
                            <SelectItem value="resources">Learning Resources</SelectItem>
                            <SelectItem value="worship">Worship & Spiritual Content</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="improvements">What needs most improvement? *</Label>
                        <Select value={formData.improvements} onValueChange={(value) => handleInputChange('improvements', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select improvement area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="timing">Event Timing & Schedule</SelectItem>
                            <SelectItem value="venue">Venue & Facilities</SelectItem>
                            <SelectItem value="content">Content Quality</SelectItem>
                            <SelectItem value="organization">Event Organization</SelectItem>
                            <SelectItem value="communication">Communication</SelectItem>
                            <SelectItem value="nothing">Nothing - It was great!</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2 mt-6">
                      <Label htmlFor="futureTopics">Which topics interest you most? *</Label>
                      <Select value={formData.futureTopics} onValueChange={(value) => handleInputChange('futureTopics', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select topic interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leadership">Leadership Development</SelectItem>
                          <SelectItem value="technology">Technology & Innovation</SelectItem>
                          <SelectItem value="ministry">Ministry Strategies</SelectItem>
                          <SelectItem value="youth-engagement">Youth Engagement</SelectItem>
                          <SelectItem value="community-outreach">Community Outreach</SelectItem>
                          <SelectItem value="spiritual-growth">Spiritual Growth</SelectItem>
                          <SelectItem value="business">Business & Entrepreneurship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendation */}
                <Card className="border border-white/30 backdrop-blur-sm bg-gradient-to-br from-white/20 via-blue-50/20 to-white/30 shadow-lg shadow-blue-200/10">
                  <CardHeader className="bg-gradient-to-r from-blue-100/30 to-blue-200/20 backdrop-blur-sm border-b border-white/30 pb-4">
                    <CardTitle className="text-lg font-semibold text-blue-900">Recommendation</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white/10 backdrop-blur-sm">
                    <div className="space-y-2">
                      <Label htmlFor="recommendLikelihood">How likely are you to recommend this event to others?</Label>
                      <Select value={formData.recommendLikelihood} onValueChange={(value) => handleInputChange('recommendLikelihood', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select likelihood" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="very-likely">Very Likely</SelectItem>
                          <SelectItem value="likely">Likely</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="unlikely">Unlikely</SelectItem>
                          <SelectItem value="very-unlikely">Very Unlikely</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Comments */}
                <Card className="border border-white/30 backdrop-blur-sm bg-gradient-to-br from-white/20 via-blue-50/20 to-white/30 shadow-lg shadow-blue-200/10">
                  <CardHeader className="bg-gradient-to-r from-blue-100/30 to-blue-200/20 backdrop-blur-sm border-b border-white/30 pb-4">
                    <CardTitle className="text-lg font-semibold text-blue-900">Additional Comments</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 bg-white/10 backdrop-blur-sm">
                    <div className="space-y-2">
                      <Label htmlFor="additionalComments">Any other comments or suggestions?</Label>
                      <Textarea
                        id="additionalComments"
                        value={formData.additionalComments}
                        onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                        placeholder="Any additional feedback you'd like to share..."
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-600">
            <p className="mb-4">
              Thank you for being part of YPE Summit 2025!
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="#" className="text-blue-900 hover:text-blue-700">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-blue-900 hover:text-blue-700">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-blue-900 hover:text-blue-700">
                <Youtube className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
