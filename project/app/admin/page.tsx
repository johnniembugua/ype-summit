'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Shield, RefreshCw, LogOut, LayoutDashboard, Users, MessageSquare, Handshake, Menu, X } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, count: stats ? stats.registrations.total + stats.questions.total + stats.partnerships.total : 0 },
    { id: 'registrations', label: 'Registrations', icon: Users, count: registrations.length },
    { id: 'questions', label: 'Questions', icon: MessageSquare, count: questions.length },
    { id: 'partnerships', label: 'Partnerships', icon: Handshake, count: partnerships.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-sm rounded-r-2xl shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:rounded-r-none lg:shadow-lg ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Logo variant="header" />
              <Badge className="bg-red-100 text-red-800 border-red-200">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <Badge 
                      variant={isActive ? "default" : "secondary"}
                      className={`text-xs ${isActive ? 'bg-blue-700' : ''}`}
                    >
                      {item.count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => window.location.href = '/'}
              >
                View Site
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {/* <div className="min-h-screen flex flex-col"> */}
      <div className="min-h-screen flex flex-col w-full max-w-screen-md md:max-w-screen-lg mx-auto px-4 sm:px-6 lg:max-w-none lg:mx-0">
        {/* Top Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30 flex-shrink-0">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {navigationItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {activeTab === 'overview' && 'Dashboard overview and analytics'}
                    {activeTab === 'registrations' && 'Manage event registrations'}
                    {activeTab === 'questions' && 'Handle participant questions'}
                    {activeTab === 'partnerships' && 'Partnership inquiries and management'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 lg:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {stats ? (
                <DashboardOverview stats={stats} />
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500">Unable to load dashboard statistics</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'registrations' && (
            <RegistrationsTable 
              registrations={registrations} 
              onUpdate={fetchData}
            />
          )}

          {activeTab === 'questions' && (
            <QuestionsTable 
              questions={questions} 
              onUpdate={fetchData}
            />
          )}

          {activeTab === 'partnerships' && (
            <PartnershipsTable 
              partnerships={partnerships} 
              onUpdate={fetchData}
            />
          )}
        </main>
      </div>
    </div>
  );
}
