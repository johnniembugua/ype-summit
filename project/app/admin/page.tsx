'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Shield, RefreshCw, LogOut } from 'lucide-react';
import { toast } from 'sonner';

import { DashboardOverview } from '@/components/admin/dashboard-overview';
import { RegistrationsTable } from '@/components/admin/registrations-table';
import { QuestionsTable } from '@/components/admin/questions-table';
import { PartnershipsTable } from '@/components/admin/partnerships-table';
import { AdminAuth } from '@/components/admin/admin-auth';
import { Logo } from '@/components/Logo';

import {
  getDashboardStats,
  getAllRegistrationsForAdmin,
  getAllQuestionsForAdmin,
  getAllPartnershipsForAdmin,
} from '@/actions/admin';

import { Registration, Question, Partnership } from '@/types';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [stats, setStats] = useState<any>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);

  const fetchData = async () => {
    try {
      const [statsResult, registrationsResult, questionsResult, partnershipsResult] = await Promise.all([
        getDashboardStats(),
        getAllRegistrationsForAdmin(),
        getAllQuestionsForAdmin(),
        getAllPartnershipsForAdmin(),
      ]);

      if (statsResult.success) setStats(statsResult.data);
      if (registrationsResult.success) setRegistrations(registrationsResult.data);
      if (questionsResult.success) setQuestions(questionsResult.data);
      if (partnershipsResult.success) setPartnerships(partnershipsResult.data);

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

  const checkAuthentication = () => {
    const authStatus = sessionStorage.getItem('ype-admin-auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

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
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <span>Overview</span>
              {stats && (
                <Badge variant="secondary" className="ml-1">
                  {stats.registrations.total + stats.questions.total + stats.partnerships.total}
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
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Logo variant="footer" />
            <Badge className="bg-red-600 text-white">Admin Panel</Badge>
          </div>
          <p className="text-gray-400">
            &copy; 2025 YPE Summit Admin Dashboard. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Manage registrations, questions, and partnerships for the YPE Summit 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
