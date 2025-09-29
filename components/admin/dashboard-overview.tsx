'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Handshake, TrendingUp, Calendar, Clock, CheckCircle, AlertCircle, Building, Star } from 'lucide-react';

interface DashboardStats {
  registrations: {
    total: number;
    paid: number;
    pending: number;
  };
  questions: {
    total: number;
    pending: number;
    answered: number;
  };
  partnerships: {
    total: number;
    confirmed: number;
    pending: number;
  };
  exhibitors: {
    total: number;
    pending: number;
    reviewed: number;
    approved: number;
    rejected: number;
  };
  feedback: {
    total: number;
    pending: number;
    reviewed: number;
    archived: number;
  };
  analytics: {
    total: number;
    registrations: number;
    questions: number;
    partnerships: number;
    exhibitors: number;
    feedback: number;
  };
}

interface DashboardOverviewProps {
  stats: DashboardStats;
}

export function DashboardOverview({ stats }: DashboardOverviewProps) {
  const statCards = [
    {
      title: 'Total Registrations',
      value: stats.registrations.total,
      subtitle: `${stats.registrations.paid} paid, ${stats.registrations.pending} pending`,
      icon: Users,
      color: 'blue',
      trend: '+12% from last week'
    },
    {
      title: 'Questions Submitted',
      value: stats.questions.total,
      subtitle: `${stats.questions.answered} answered, ${stats.questions.pending} pending`,
      icon: MessageSquare,
      color: 'green',
      trend: '+8% from last week'
    },
    {
      title: 'Partnership Inquiries',
      value: stats.partnerships.total,
      subtitle: `${stats.partnerships.confirmed} confirmed, ${stats.partnerships.pending} pending`,
      icon: Handshake,
      color: 'yellow',
      trend: '+25% from last week'
    },
    {
      title: 'Exhibitor Submissions',
      value: stats.exhibitors.total,
      subtitle: `${stats.exhibitors.approved} approved, ${stats.exhibitors.pending} pending`,
      icon: Building,
      color: 'indigo',
      trend: '+18% from last week'
    },
    {
      title: 'Feedback Submissions',
      value: stats.feedback.total,
      subtitle: `${stats.feedback.reviewed} reviewed, ${stats.feedback.pending} pending`,
      icon: Star,
      color: 'orange',
      trend: '+22% from last week'
    },
    {
      title: 'Total Interactions',
      value: stats.analytics.total,
      subtitle: 'All user interactions tracked',
      icon: TrendingUp,
      color: 'purple',
      trend: '+15% from last week'
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'bg-blue-100 text-blue-600',
        text: 'text-blue-600'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'bg-green-100 text-green-600',
        text: 'text-green-600'
      },
      yellow: {
        bg: 'bg-yellow-50',
        icon: 'bg-yellow-100 text-yellow-600',
        text: 'text-yellow-600'
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'bg-purple-100 text-purple-600',
        text: 'text-purple-600'
      },
      indigo: {
        bg: 'bg-indigo-50',
        icon: 'bg-indigo-100 text-indigo-600',
        text: 'text-indigo-600'
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'bg-orange-100 text-orange-600',
        text: 'text-orange-600'
      },
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const quickStats = [
    {
      label: 'Payment Rate',
      value: stats.registrations.total > 0 
        ? `${Math.round((stats.registrations.paid / stats.registrations.total) * 100)}%`
        : '0%',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      label: 'Response Rate',
      value: stats.questions.total > 0 
        ? `${Math.round((stats.questions.answered / stats.questions.total) * 100)}%`
        : '0%',
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      label: 'Partnership Success',
      value: stats.partnerships.total > 0 
        ? `${Math.round((stats.partnerships.confirmed / stats.partnerships.total) * 100)}%`
        : '0%',
      icon: Handshake,
      color: 'text-yellow-600'
    },
    {
      label: 'Exhibitor Approval Rate',
      value: stats.exhibitors.total > 0 
        ? `${Math.round((stats.exhibitors.approved / stats.exhibitors.total) * 100)}%`
        : '0%',
      icon: Building,
      color: 'text-indigo-600'
    },
    {
      label: 'Feedback Review Rate',
      value: stats.feedback.total > 0 
        ? `${Math.round((stats.feedback.reviewed / stats.feedback.total) * 100)}%`
        : '0%',
      icon: Star,
      color: 'text-orange-600'
    },
    {
      label: 'Active Issues',
      value: stats.registrations.pending + stats.questions.pending + stats.partnerships.pending + stats.exhibitors.pending + stats.feedback.pending,
      icon: AlertCircle,
      color: 'text-red-600'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <div className="flex items-center space-x-4 mt-4 text-blue-200">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>September 28, 2025</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>09:00 AM EAT</span>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, index) => {
          const colorClasses = getColorClasses(stat.color);
          const Icon = stat.icon;
          
          return (
            <Card key={index} className={`${colorClasses.bg} border-0`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-md ${colorClasses.icon}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                <div className={`text-xs ${colorClasses.text} mt-2`}>
                  {stat.trend}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <Card key={index} className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Registration Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Registrations</span>
              <span className="font-semibold">{stats.registrations.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Paid</span>
              <span className="font-semibold text-green-600">{stats.registrations.paid}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Payment</span>
              <span className="font-semibold text-yellow-600">{stats.registrations.pending}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ 
                  width: stats.registrations.total > 0 
                    ? `${(stats.registrations.paid / stats.registrations.total) * 100}%` 
                    : '0%' 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Q&A Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Questions</span>
              <span className="font-semibold">{stats.questions.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Answered</span>
              <span className="font-semibold text-green-600">{stats.questions.answered}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Review</span>
              <span className="font-semibold text-yellow-600">{stats.questions.pending}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ 
                  width: stats.questions.total > 0 
                    ? `${(stats.questions.answered / stats.questions.total) * 100}%` 
                    : '0%' 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Exhibitor Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Submissions</span>
              <span className="font-semibold">{stats.exhibitors.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Approved</span>
              <span className="font-semibold text-green-600">{stats.exhibitors.approved}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Under Review</span>
              <span className="font-semibold text-blue-600">{stats.exhibitors.reviewed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="font-semibold text-yellow-600">{stats.exhibitors.pending}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Rejected</span>
              <span className="font-semibold text-red-600">{stats.exhibitors.rejected}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-indigo-600 h-2 rounded-full" 
                style={{ 
                  width: stats.exhibitors.total > 0 
                    ? `${(stats.exhibitors.approved / stats.exhibitors.total) * 100}%` 
                    : '0%' 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
