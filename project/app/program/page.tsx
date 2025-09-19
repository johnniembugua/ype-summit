'use client';

import { Award, ArrowLeft, Download, Clock, MapPin, Users, Youtube, Facebook, Twitter, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';

export default function Program() {
  const program = [
    { 
      time: '8:00 AM', 
      title: 'Arrival and Registration', 
      description: 'Check-in and registration for all attendees',
      duration: '30 min',
      type: 'logistics'
    },
    { 
      time: '8:30 AM', 
      title: 'Singing Session', 
      description: 'Led by Choristers',
      duration: '15 min',
      type: 'worship'
    },
    { 
      time: '8:45 AM', 
      title: 'Morning Devotion/Sermonette', 
      description: 'Spiritual preparation for the day',
      duration: '10 min',
      type: 'worship'
    },
    { 
      time: '8:55 AM', 
      title: 'Opening Prayers', 
      description: 'Official opening prayers',
      duration: '5 min',
      type: 'worship'
    },
    { 
      time: '9:00 AM', 
      title: 'Introduction: Business Pitch / Exhibition Awareness', 
      description: 'Introduction to business pitch and exhibition opportunities',
      duration: '20 min',
      type: 'presentation'
    },
    { 
      time: '9:20 AM', 
      title: 'Soft Skills and Personal Development Workshop', 
      description: 'Comprehensive workshop covering: 1. Emotional intelligence & resilience, 2. Stress management, 3. Time management & productivity, 4. Public speaking & communication skills, 5. Mental health & wellness for young professionals',
      duration: '60 min',
      type: 'workshop'
    },
    { 
      time: '10:20 AM', 
      title: 'Short Break / Music', 
      description: 'Networking break with music',
      duration: '10 min',
      type: 'break'
    },
    { 
      time: '10:40 AM', 
      title: 'Break-out Sessions (3 Groups)', 
      description: '1. Entrepreneurship & Business Development, 2. Career Growth & Professional Development, 3. Innovation & Emerging Trends',
      duration: '80 min',
      type: 'workshop'
    },
    { 
      time: '12:00 PM', 
      title: 'Introduction of Keynote Speaker', 
      description: 'Introduction of the Chief Guest',
      duration: '10 min',
      type: 'presentation'
    },
    { 
      time: '12:10 PM', 
      title: 'Keynote Speech: Harnessing the Power of Networking', 
      description: 'Keynote address by Chief Guest [CJ Maraga]',
      duration: '50 min',
      type: 'keynote'
    },
    { 
      time: '1:00 PM', 
      title: 'Lunch & Networking', 
      description: 'Lunch break with networking opportunities',
      duration: '60 min',
      type: 'meal'
    },
    { 
      time: '2:10 PM', 
      title: 'Break-out Sessions (3 Groups)', 
      description: '1. Entrepreneurship & Business Development, 2. Career Growth & Professional Development, 3. Innovation & Emerging Trends',
      duration: '60 min',
      type: 'workshop'
    },
    { 
      time: '3:10 PM', 
      title: 'Panelist Round-Up', 
      description: 'Key takeaways from the workshops with Question and Answers',
      duration: '20 min',
      type: 'panel'
    },
    { 
      time: '3:30 PM', 
      title: 'Gifting', 
      description: 'Recognition and gifting session',
      duration: '20 min',
      type: 'presentation'
    },
    { 
      time: '3:50 PM', 
      title: 'Closing Remarks/Vote of Thanks', 
      description: 'Final remarks and expressions of gratitude',
      duration: '5 min',
      type: 'closing'
    },
    { 
      time: '3:55 PM', 
      title: 'Closing Prayer', 
      description: 'Final prayer to close the summit',
      duration: '5 min',
      type: 'worship'
    },
    { 
      time: '4:00 PM', 
      title: 'The End! Networking/Photo Session', 
      description: 'Final networking and photo opportunities',
      duration: 'Ongoing',
      type: 'networking'
    }
  ];

  const workshops = [
    {
      title: "Entrepreneurship & Business Development",
      facilitator: "Various Facilitators",
      description: "Focus on business development strategies, entrepreneurship skills, and practical business growth techniques. Learn how to start, manage, and scale businesses effectively.",
      capacity: "30 participants"
    },
    {
      title: "Career Growth & Professional Development",
      facilitator: "Various Facilitators", 
      description: "Comprehensive career development strategies, professional growth techniques, and advancement opportunities in various industries. Focus on skill development and career progression.",
      capacity: "30 participants"
    },
    {
      title: "Innovation & Emerging Trends",
      facilitator: "Various Facilitators",
      description: "Explore cutting-edge innovations, emerging technologies, and future trends across various industries. Learn about disruptive technologies and innovative solutions.",
      capacity: "30 participants"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'keynote': return 'bg-blue-400 text-blue-900';
      case 'worship': return 'bg-blue-900 text-white';
      case 'panel': return 'bg-green-600 text-white';
      case 'workshop': return 'bg-purple-600 text-white';
      case 'interactive': return 'bg-blue-600 text-white';
      case 'meal': return 'bg-red-600 text-white';
      case 'break': return 'bg-gray-500 text-white';
      case 'presentation': return 'bg-indigo-600 text-white';
      case 'closing': return 'bg-blue-800 text-white';
      case 'networking': return 'bg-yellow-400 text-blue-900';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative text-white" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="space-y-6">
            <Badge className="bg-yellow-400 text-blue-900 text-sm font-semibold px-4 py-2">
              <FileText className="w-4 h-4" />
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              A Day of Transformation
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              A carefully curated program designed to empower your professional journey through inspiring sessions, practical workshops, and meaningful connections.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                <Download className="w-4 h-4 mr-2" />
                Download Full Program PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Timeline */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Detailed Program Schedule
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every session is designed to provide practical insights and spiritual growth for Kingdom-minded professionals.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {program.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 group">
                  <div className="flex-shrink-0 w-full md:w-24 text-left md:text-right">
                    <span className="text-lg font-bold text-blue-900">{item.time}</span>
                    <p className="text-sm text-gray-500">{item.duration}</p>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-900 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                  <div className="flex-1 pb-6">
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0">{item.title}</h3>
                          <Badge className={`text-xs ${getTypeColor(item.type)}`}>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Breakout Workshop Tracks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from four specialized workshop tracks designed to provide deep insights in your area of interest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map((workshop, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{workshop.title}</CardTitle>
                  <CardDescription className="text-blue-600 font-semibold">
                    Facilitated by {workshop.facilitator}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">{workshop.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-blue-900 border-blue-900">
                      {workshop.capacity}
                    </Badge>
                    <span className="text-sm text-gray-500">2:10 PM - 3:10 PM</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="rounded-lg p-6 max-w-2xl mx-auto" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
              <h3 className="text-xl font-bold text-white mb-2">Workshop Selection</h3>
              <p className="text-white">
                You'll choose your preferred workshop track during registration. Spaces are limited and allocated on a first-come, first-served basis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo variant="footer" width={80} height={80} />
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