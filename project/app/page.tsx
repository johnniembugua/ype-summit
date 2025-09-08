'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Award, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer
  useEffect(() => {
    const targetDate = new Date('2025-09-28T09:00:00+03:00'); // EAT timezone
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const isLive = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo variant="header" />
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-blue-900 font-semibold">Home</Link>
              <Link href="/speakers" className="text-gray-700 hover:text-blue-900 transition-colors">Speakers</Link>
              <Link href="/program" className="text-gray-700 hover:text-blue-900 transition-colors">Program</Link>
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
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-yellow-400 text-blue-900 text-sm font-semibold px-4 py-2">
                September 28, 2025 • Nairobi, Kenya
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                MAYS Summit 2025
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Young Professionals and Entrepreneurs Summit
              </p>
              <div className="flex items-center justify-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>September 28, 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>09:00 AM EAT</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
              {isLive ? (
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-yellow-400 mb-4">🎉 The Summit is Live!</h2>
                  <p className="text-xl text-blue-100">Join us for an amazing day of empowerment and inspiration!</p>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-6">Summit Begins In:</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="text-3xl font-bold text-yellow-400">{timeLeft.days}</div>
                      <div className="text-sm text-blue-100">Days</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="text-3xl font-bold text-yellow-400">{timeLeft.hours}</div>
                      <div className="text-sm text-blue-100">Hours</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="text-3xl font-bold text-yellow-400">{timeLeft.minutes}</div>
                      <div className="text-sm text-blue-100">Minutes</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="text-3xl font-bold text-yellow-400">{timeLeft.seconds}</div>
                      <div className="text-sm text-blue-100">Seconds</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 text-lg"
                >
                  Register to Attend
                </Button>
              </Link>
              <p className="text-sm text-blue-200">Limited seats available • Register now to secure your spot</p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What to Expect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A transformative day designed to empower Kingdom-minded professionals with practical insights, spiritual growth, and meaningful connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Inspiring Speakers</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Learn from distinguished leaders including Hon. David Maraga and other influential professionals who are making a difference in their fields.
                </p>
                <Link href="/speakers">
                  <Button variant="outline" className="group-hover:bg-blue-900 group-hover:text-white transition-colors">
                    Meet Our Speakers
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-900" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Rich Program</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Engaging workshops, panel discussions, networking sessions, and worship experiences designed for professional and spiritual growth.
                </p>
                <Link href="/program">
                  <Button variant="outline" className="group-hover:bg-blue-900 group-hover:text-white transition-colors">
                    View Full Program
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Kingdom Impact</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Connect with like-minded professionals and discover how to make a lasting impact in your workplace and community through Kingdom principles.
                </p>
                <Link href="/about">
                  <Button variant="outline" className="group-hover:bg-blue-900 group-hover:text-white transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Speaker Preview */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-400 flex-shrink-0">
                <img 
                  src="/images/4.jpeg"
                  alt="CJ Maraga"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <Badge className="bg-yellow-400 text-blue-900 mb-4">Featured Speaker</Badge>
                <h3 className="text-3xl font-bold mb-2">CJ Maraga</h3>
                <p className="text-xl text-yellow-400 mb-4">14th Chief Justice and President of the Supreme Court of Kenya</p>
                <p className="text-lg text-blue-100 leading-relaxed mb-6">
                  A distinguished Jurist who served as the 14th Chief Justice and President of the Supreme Court of Kenya, active in civic life and mentoring youth.
                </p>
                <Link href="/speakers">
                  <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                    View All Speakers
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Summits Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Previous Summits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Relive the inspiration and impact from our previous gatherings of Kingdom-minded professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[2024, 2023, 2022].map((year, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-800 rounded-t-lg relative overflow-hidden">
                    <img 
                      src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                      alt={`Summit ${year}`}
                      className="w-full h-full object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">YPE Summit {year}</h3>
                      <p className="text-sm text-gray-200">Impact & Inspiration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              Watch Last Year's Highlights
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join us at the YPE Summit 2025 and be part of a community that's committed to excellence, integrity, and Kingdom impact in the marketplace.
          </p>
          <div className="space-x-4">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 text-lg"
              >
                Register for Summit
              </Button>
            </Link>
            <Link href="/partnership">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
              >
                Partner With Us
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
              <div className="mb-4">
                <Logo variant="footer" />
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