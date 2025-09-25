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
      time: '8:00 AM – 8:30 AM', 
      title: 'Arrival and registration', 
      description: 'Check-in and registration for all attendees',
      duration: '30 min',
      type: 'logistics',
      facilitator: ''
    },
    { 
      time: '8:30 AM – 8:45 AM', 
      title: 'Singing session', 
      description: 'Led by Choristers',
      duration: '15 min',
      type: 'worship',
      facilitator: 'Choristers'
    },
    { 
      time: '8:45 AM – 8:55 AM', 
      title: 'Morning devotion/Sermonette', 
      description: 'Spiritual preparation for the day',
      duration: '10 min',
      type: 'worship',
      facilitator: ''
    },
    { 
      time: '8:55 AM – 9:00 AM', 
      title: 'Opening prayers', 
      description: 'Official opening prayers',
      duration: '5 min',
      type: 'worship',
      facilitator: ''
    },
    { 
      time: '9:00 AM – 9:20 AM', 
      title: 'Introduction', 
      description: 'Business Pitch / Exhibition Awareness',
      duration: '20 min',
      type: 'presentation',
      facilitator: 'Eric Mackiage'
    },
    { 
      time: '9:20 AM – 10:20 AM', 
      title: 'Soft skills and personal development', 
      description: 'A workshop covering: 1. Emotional intelligence & resilience. 2. Stress management. 3. Time management & productivity. 4. Public speaking & communication skills. 5. Mental health & wellness for young professionals.',
      duration: '60 min',
      type: 'workshop',
      facilitator: 'Dr. Dorothy Mbori'
    },
    { 
      time: '10:20 AM – 10:30 AM', 
      title: 'Short Break / Music', 
      description: 'Networking break with music',
      duration: '10 min',
      type: 'break',
      facilitator: ''
    },
    { 
      time: '10:30 AM – 10:40 AM', 
      title: 'Introduction of the Keynote speaker', 
      description: 'Introduction of the Chief Guest',
      duration: '10 min',
      type: 'presentation',
      facilitator: ''
    },
    { 
      time: '10:40 AM – 12:10 PM', 
      title: 'Keynote Speech', 
      description: '[Harnessing the Power of Networking]',
      duration: '90 min',
      type: 'keynote',
      facilitator: 'Chief Guest [CJ Maraga]'
    },
    { 
      time: '12:10 PM – 1:00 PM', 
      title: 'Break-out sessions [3 groups]', 
      description: '1. Entrepreneurship & Business Development 2. Career Growth & Professional Development 3. Innovation & Emerging Trends.',
      duration: '50 min',
      type: 'workshop',
      facilitator: 'Joseph Owande, Dr.Dorothy Mbori, FCPA. Edwin Makori, Eric Macakiage'
    },
    { 
      time: '1:00 PM – 2:00 PM', 
      title: 'LUNCH & NETWORKING', 
      description: 'Lunch break with networking opportunities',
      duration: '60 min',
      type: 'meal',
      facilitator: 'ALL'
    },
    { 
      time: '2:00 PM – 3:00 PM', 
      title: 'Break-out sessions [3 groups]', 
      description: '1. Entrepreneurship & Business Development 2. Career Growth & Professional Development 3. Innovation & Emerging Trends.',
      duration: '60 min',
      type: 'workshop',
      facilitator: 'Dr. Dorothy Mbori, FCPA. Edwin Makori, Eric Macakiage'
    },
    { 
      time: '3:00 PM – 3:30 PM', 
      title: 'Financial Literacy', 
      description: 'Financial management and literacy session',
      duration: '30 min',
      type: 'presentation',
      facilitator: 'Davidson Muriithi'
    },
    { 
      time: '3:30 PM – 4:10 PM', 
      title: 'Panelist Round-Up', 
      description: '[Key takeaways from the workshops] Question and Answers',
      duration: '40 min',
      type: 'panel',
      facilitator: 'Dr. Dorothy Mbori, FCPA. Edwin Makori, Eric Macakiage'
    },
    { 
      time: '4:10 PM – 4:20 PM', 
      title: 'Gifting', 
      description: 'Recognition and gifting session',
      duration: '10 min',
      type: 'presentation',
      facilitator: ''
    },
    { 
      time: '4:20 PM – 4:25 PM', 
      title: 'Closing remarks/Vote of Thanks', 
      description: 'Final remarks and expressions of gratitude',
      duration: '5 min',
      type: 'closing',
      facilitator: ''
    },
    { 
      time: '4:25 PM – 4:30 PM', 
      title: 'Closing prayer', 
      description: 'Final prayer to close the summit',
      duration: '5 min',
      type: 'worship',
      facilitator: ''
    },
    { 
      time: '4:30 PM', 
      title: 'THE END!', 
      description: '[Networking/ Photo Session]',
      duration: 'Ongoing',
      type: 'networking',
      facilitator: 'ALL'
    }
  ];

  const workshops = [
    {
      title: "Entrepreneurship & Business Development",
      facilitator: "Joseph Owande",
      description: "Focus on business development strategies, entrepreneurship skills, and practical business growth techniques. Learn how to start, manage, and scale businesses effectively in today's competitive market.",
      capacity: "30 participants"
    },
    {
      title: "Career Growth & Professional Development",
      facilitator: "Dr. Dorothy Mbori, FCPA. Edwin Makori", 
      description: "Comprehensive career development strategies, professional growth techniques, and advancement opportunities in various industries. Focus on skill development and career progression.",
      capacity: "30 participants"
    },
    {
      title: "Innovation & Emerging Trends",
      facilitator: "Eric Macakiage",
      description: "Explore cutting-edge innovations, emerging technologies, and future trends across various industries. Learn about disruptive technologies and innovative solutions shaping tomorrow's business landscape.",
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
              <a href="/documents/summit-docs/YPE SUMMIT 2025 PROGRAMME.pdf" download className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Download Full Program PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Program Timeline */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-4 sm:mb-6" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
              <Clock className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Detailed Program Schedule
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Every session is designed to provide practical insights and spiritual growth for Kingdom-minded professionals.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4 sm:gap-6">
              {program.map((item, index) => (
                <Card key={index} className="group bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Time Section - Mobile First */}
                      <div className="text-white p-4 sm:p-6 sm:w-40 sm:flex-shrink-0" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
                        <div className="flex items-center justify-between sm:flex-col sm:items-start sm:space-y-2">
                          <div className="flex items-center space-x-2 sm:space-x-0 sm:space-y-2">
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-xs font-medium opacity-90">Time</span>
                          </div>
                          <span className="text-lg sm:text-sm font-bold text-center sm:text-left">{item.time}</span>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 p-4 sm:p-6">
                        <div className="flex flex-col space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:space-y-0 space-y-2">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors">
                              {item.title}
                            </h3>
                            <Badge className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${getTypeColor(item.type)}`}>
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            {item.description}
                          </p>
                          
                          {item.facilitator && (
                            <div className="flex items-center text-xs sm:text-sm text-gray-500 pt-2">
                              <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                              <span className="break-words">Facilitated by: {item.facilitator}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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