'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar, Clock, MapPin, Users, ArrowRight, Award, Play, ChevronLeft, ChevronRight, Quote, Facebook, Twitter, Youtube, FileText, Church, User, Loader2, Shield, RefreshCw, LogOut } from 'lucide-react';
import { toast } from 'sonner';

import { DashboardOverview } from '@/components/admin/dashboard-overview';
import { RegistrationsTable } from '@/components/admin/registrations-table';
import { QuestionsTable } from '@/components/admin/questions-table';
import { PartnershipsTable } from '@/components/admin/partnerships-table';
import { ExhibitorsTable } from '@/components/admin/exhibitors-table';
import { FeedbackTable } from '@/components/admin/feedback-table';
import { AdminAuth } from '@/components/admin/admin-auth';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

import {
  getDashboardStats,
  getAllRegistrationsForAdmin,
  getAllQuestionsForAdmin,
  getAllPartnershipsForAdmin,
  getAllExhibitorsForAdmin,
  getAllFeedbackForAdmin,
} from '@/actions/admin';

import { Registration, Question, Partnership, Exhibitor, Feedback } from '@/types';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [stats, setStats] = useState<any>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  const fetchData = async () => {
    try {
      const [statsResult, registrationsResult, questionsResult, partnershipsResult, exhibitorsResult, feedbackResult] = await Promise.all([
        getDashboardStats(),
        getAllRegistrationsForAdmin(),
        getAllQuestionsForAdmin(),
        getAllPartnershipsForAdmin(),
        getAllExhibitorsForAdmin(),
        getAllFeedbackForAdmin(),
      ]);

      if (statsResult.success) setStats(statsResult.data);
      if (registrationsResult.success) setRegistrations(registrationsResult.data as Registration[] || []);
      if (questionsResult.success) setQuestions(questionsResult.data as Question[] || []);
      if (partnershipsResult.success) setPartnerships(partnershipsResult.data as Partnership[] || []);
      if (exhibitorsResult.success) setExhibitors(exhibitorsResult.data as Exhibitor[] || []);
      if (feedbackResult.success) setFeedback(feedbackResult.data as Feedback[] || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    toast.success('Dashboard refreshed');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ype-admin-auth');
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const checkAuthentication = useCallback(() => {
    const authStatus = sessionStorage.getItem('ype-admin-auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  // Show authentication form if not authenticated
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => {
      setIsAuthenticated(true);
      fetchData();
    }} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo variant="header" />
              <Badge className="bg-red-100 text-red-800 border-red-200">
                <Shield className="w-3 h-3 mr-1" />
                Admin Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
                View Site
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-[1000px] mx-auto">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <span>Overview</span>
              {stats && (
                <Badge variant="secondary" className="ml-1">
                  {stats.registrations.total + stats.questions.total + stats.partnerships.total + stats.exhibitors.total + stats.feedback.total}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="registrations" className="flex items-center space-x-2">
              <span>Registrations</span>
              {registrations.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {registrations.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center space-x-2">
              <span>Questions</span>
              {questions.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {questions.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="partnerships" className="flex items-center space-x-2">
              <span>Partnerships</span>
              {partnerships.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {partnerships.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="exhibitors" className="flex items-center space-x-2">
              <span>Exhibitors</span>
              {exhibitors.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {exhibitors.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <span>Feedback</span>
              {feedback.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {feedback.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {stats ? (
              <DashboardOverview stats={stats} />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Unable to load dashboard statistics</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="registrations" className="space-y-6">
            <RegistrationsTable 
              registrations={registrations} 
              onUpdate={fetchData}
            />
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <QuestionsTable 
              questions={questions} 
              onUpdate={fetchData}
            />
          </TabsContent>

          <TabsContent value="partnerships" className="space-y-6">
            <PartnershipsTable 
              partnerships={partnerships} 
              onUpdate={fetchData}
            />
          </TabsContent>

          <TabsContent value="exhibitors" className="space-y-6">
            <ExhibitorsTable 
              exhibitors={exhibitors} 
              onUpdate={fetchData}
            />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <FeedbackTable 
              feedback={feedback} 
              onUpdate={fetchData}
            />
          </TabsContent>
        </Tabs>
      </div>

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