'use client';

import { Award, ArrowLeft, Download, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Program() {
  const program = [
    { 
      time: '08:30 AM', 
      title: 'Registration & Welcome', 
      description: 'Check-in, welcome refreshments, and networking',
      duration: '30 min',
      type: 'logistics'
    },
    { 
      time: '09:00 AM', 
      title: 'Opening Worship', 
      description: 'Welcome & Spiritual Preparation led by YPE Worship Team',
      duration: '30 min',
      type: 'worship'
    },
    { 
      time: '09:30 AM', 
      title: 'Keynote Address', 
      description: 'Hon. David Maraga - "Leadership with Integrity: Principles for Kingdom-Minded Professionals"',
      duration: '45 min',
      type: 'keynote'
    },
    { 
      time: '10:15 AM', 
      title: 'Coffee Break', 
      description: 'Networking and refreshments',
      duration: '15 min',
      type: 'break'
    },
    { 
      time: '10:30 AM', 
      title: 'Panel Discussion', 
      description: 'Purpose in the Marketplace - Featuring Dr. Dorothy Mbori-Ngacha, Mr. Josphat Mokaya, and Mr. Erick Macakiage',
      duration: '60 min',
      type: 'panel'
    },
    { 
      time: '11:30 AM', 
      title: 'Q&A Session', 
      description: 'Interactive discussion with panel speakers',
      duration: '30 min',
      type: 'interactive'
    },
    { 
      time: '12:00 PM', 
      title: 'Networking Break', 
      description: 'Light refreshments and professional networking',
      duration: '30 min',
      type: 'break'
    },
    { 
      time: '12:30 PM', 
      title: 'Lunch & Networking', 
      description: 'Connect with fellow professionals over lunch',
      duration: '90 min',
      type: 'meal'
    },
    { 
      time: '02:00 PM', 
      title: 'Breakout Workshops', 
      description: 'Choose from 4 specialized tracks: Innovation, Finance, Healthcare, Media',
      duration: '90 min',
      type: 'workshop'
    },
    { 
      time: '03:30 PM', 
      title: 'Workshop Presentations', 
      description: 'Key insights and takeaways from each workshop track',
      duration: '30 min',
      type: 'presentation'
    },
    { 
      time: '04:00 PM', 
      title: 'Afternoon Tea', 
      description: 'Refreshments and continued networking',
      duration: '30 min',
      type: 'break'
    },
    { 
      time: '04:30 PM', 
      title: 'Live Q&A Session', 
      description: 'Real-time questions from attendees answered by all speakers',
      duration: '45 min',
      type: 'interactive'
    },
    { 
      time: '05:15 PM', 
      title: 'Closing Address', 
      description: 'Commissioning and next steps for Kingdom impact',
      duration: '15 min',
      type: 'closing'
    },
    { 
      time: '05:30 PM', 
      title: 'Closing Worship', 
      description: 'Commissioning, blessing, and closing prayer',
      duration: '30 min',
      type: 'worship'
    }
  ];

  const workshops = [
    {
      title: "Leadership with Integrity",
      facilitator: "CJ Maraga",
      description: "Learn principles of ethical leadership and governance from Kenya's former Chief Justice, focusing on integrity in professional life.",
      capacity: "30 participants"
    },
    {
      title: "Healthcare Excellence",
      facilitator: "Dr. Dorothy Mbori-Ngacha",
      description: "Explore best practices in healthcare delivery, public health strategies, and serving communities with medical expertise.",
      capacity: "25 participants"
    },
    {
      title: "Enterprise Development",
      facilitator: "Mr. Josphat Mokaya",
      description: "Discover how to develop sustainable enterprises, mentor SMEs, and drive climate action through business innovation.",
      capacity: "25 participants"
    },
    {
      title: "Strategic Business Growth",
      facilitator: "Mr. Erick Macakiage",
      description: "Learn strategic solutions for business growth, corporate mentorship, and building profitable sustainable enterprises.",
      capacity: "20 participants"
    },
    {
      title: "Financial Leadership",
      facilitator: "FCPA. Edwin Makori",
      description: "Master strategic finance, business development, and innovative financial leadership for transformative results.",
      capacity: "25 participants"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'keynote': return 'bg-yellow-400 text-blue-900';
      case 'worship': return 'bg-blue-900 text-white';
      case 'panel': return 'bg-green-600 text-white';
      case 'workshop': return 'bg-purple-600 text-white';
      case 'interactive': return 'bg-orange-600 text-white';
      case 'meal': return 'bg-red-600 text-white';
      case 'break': return 'bg-gray-500 text-white';
      case 'presentation': return 'bg-indigo-600 text-white';
      case 'closing': return 'bg-blue-800 text-white';
      default: return 'bg-gray-400 text-white';
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
              <Link href="/program" className="text-blue-900 font-semibold">Program</Link>
              <Link href="/register" className="text-gray-700 hover:text-blue-900 transition-colors">Register</Link>
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
              Event Program
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              A Day of Transformation
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              A carefully curated program designed to empower your professional journey through inspiring sessions, practical workshops, and meaningful connections.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/">
                <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900">
                <Download className="w-4 h-4 mr-2" />
                Download Full Program PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Duration</h3>
                <p className="text-gray-600">8:30 AM - 6:00 PM</p>
                <p className="text-sm text-gray-500">Full day experience</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-gradient-to-br from-yellow-50 to-white">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">Nairobi, Kenya</p>
                <p className="text-sm text-gray-500">Venue details in confirmation</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Capacity</h3>
                <p className="text-gray-600">Limited Seats</p>
                <p className="text-sm text-gray-500">Register early to secure your spot</p>
              </CardContent>
            </Card>
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
                <div key={index} className="flex items-start space-x-6 group">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="text-lg font-bold text-blue-900">{item.time}</span>
                    <p className="text-sm text-gray-500">{item.duration}</p>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-900 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                  <div className="flex-1 pb-6">
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
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
                  <CardDescription className="text-yellow-600 font-semibold">
                    Facilitated by {workshop.facilitator}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">{workshop.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-blue-900 border-blue-900">
                      {workshop.capacity}
                    </Badge>
                    <span className="text-sm text-gray-500">2:00 PM - 3:30 PM</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Workshop Selection</h3>
              <p className="text-blue-900">
                You'll choose your preferred workshop track during registration. Spaces are limited and allocated on a first-come, first-served basis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Included
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your free registration includes everything you need for a transformative day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "All Sessions", description: "Access to keynote, panels, and workshops" },
              { title: "Meals & Refreshments", description: "Lunch, tea breaks, and networking refreshments" },
              { title: "Digital Materials", description: "Presentation slides and resource materials" },
              { title: "Certificate", description: "Certificate of participation and completion" }
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-yellow-400 font-bold text-lg">✓</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Professional Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Don't miss this opportunity to learn, grow, and connect with like-minded Kingdom professionals.
          </p>
          <div className="space-x-4">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 text-lg"
              >
                Register Now
              </Button>
            </Link>
            <Link href="/speakers">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
              >
                Meet Our Speakers
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