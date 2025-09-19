'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QuestionsPage() {
  const [formData, setFormData] = useState({
    name: '',
    question: '',
    category: '',
    isAnonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'career', label: 'Career Development' },
    { value: 'entrepreneurship', label: 'Entrepreneurship' },
    { value: 'technology', label: 'Technology & Innovation' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'networking', label: 'Networking' },
    { value: 'finance', label: 'Finance & Investment' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.question.trim() || formData.isAnonymous) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', question: '', category: '', isAnonymous: false });
        
        // Redirect after 3 seconds
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to submit question. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('An error occurred while submitting your question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const handleAnonymousChange = (value: boolean) => {
    setFormData(prev => ({ ...prev, isAnonymous: value }));
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-900 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Ask a Question
            </CardTitle>
            <CardDescription className="text-gray-600">
              Submit your question for the YPE Summit. Our speakers and panelists will address questions in real-time during the event.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitStatus === 'success' && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Your question has been submitted successfully! We'll address it during the summit. Redirecting to home page...
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === 'error' && errorMessage && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">How would you like to submit your question?</Label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="named"
                      name="submissionType"
                      type="radio"
                      checked={!formData.isAnonymous}
                      onChange={(e) => handleAnonymousChange(!e.target.checked)}
                      disabled={isSubmitting || submitStatus === 'success'}
                      className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300"
                    />
                    <label htmlFor="named" className="ml-3 block text-sm font-medium text-gray-700">
                      Submit with my name
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="anonymous"
                      name="submissionType"
                      type="radio"
                      checked={formData.isAnonymous}
                      onChange={(e) => handleAnonymousChange(e.target.checked)}
                      disabled={isSubmitting || submitStatus === 'success'}
                      className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300"
                    />
                    <label htmlFor="anonymous" className="ml-3 block text-sm font-medium text-gray-700">
                      Submit anonymously
                    </label>
                  </div>
                </div>
              </div>

              {!formData.isAnonymous && (
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={isSubmitting || submitStatus === 'success'}
                    required
                  />
                </div>
              )}

              {formData.isAnonymous && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    Your question will be submitted anonymously. Your identity will not be shared with the speakers or other attendees.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange('category', value)}
                  disabled={isSubmitting || submitStatus === 'success'}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category for your question" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="question">Your Question *</Label>
                <Textarea
                  id="question"
                  placeholder="Type your question here..."
                  value={formData.question}
                  onChange={(e) => handleInputChange('question', e.target.value)}
                  disabled={isSubmitting || submitStatus === 'success'}
                  rows={5}
                  required
                  className="resize-none"
                />
                <p className="text-sm text-gray-500">
                  Be specific and clear to help our speakers provide the best answer.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Question
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Questions will be reviewed and selected for discussion during the summit sessions.
            Not all questions may be answered due to time constraints.
          </p>
        </div>
      </div>
    </div>
  );
}
