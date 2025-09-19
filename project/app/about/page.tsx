'use client';

import { useState } from 'react';
import { Award, Users, Mountain, ArrowLeft, Facebook, Twitter, Youtube, Binoculars, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';

export default function About() {
  const [activeTab, setActiveTab] = useState('vision');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative text-white" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="space-y-6">
            <Badge className="bg-yellow-400 text-white text-sm font-semibold px-4 py-2">
              <Info className="w-4 h-4 text-blue-900" />
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Empowering Spiritually Grounded Professionals
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Part of the Youth Ministries Department, dedicated to raising leaders who impact their workplaces and communities for the Kingdom.
            </p>
            
          </div>
        </div>
      </section>

      {/* About YPE Band Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About the YPE Band
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The Young Professionals and Entrepreneurs (YPE) Band is a dynamic community within the Youth Ministries Department, bringing together passionate individuals who are committed to excellence in their professional lives while remaining anchored in their faith.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded on the principle that our work is worship, the YPE Band serves as a platform for young professionals to grow spiritually, professionally, and personally while making a meaningful impact in their respective fields.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <p className="text-gray-600">Established as part of the Youth Ministries Department</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <p className="text-gray-600">Serving professionals across various industries and sectors</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3"></div>
                  <p className="text-gray-600">Committed to marketplace ministry and spiritually grounded advancement</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl overflow-hidden">
                <img 
                  src="/images/ype1.jpeg"
                  alt="YPE Band community gathering"
                  className="w-full h-full object-cover opacity-75"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl overflow-hidden">
                  <img 
                    src="/images/ype2.jpeg"
                    alt="YPE professional networking session"
                    className="w-full h-full object-cover opacity-75"
                  />
                </div>
                <div className="aspect-square bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl overflow-hidden">
                  <img 
                    src="/images/ype3.jpeg"
                    alt="YPE ministry activities and worship"
                    className="w-full h-full object-cover opacity-75"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on biblical principles and driven by a passion for excellence, our vision guides everything we do.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Modern Tabs */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex flex-col sm:flex-row border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 ${
                    activeTab === 'vision'
                      ? 'text-blue-900 bg-blue-50 border-b-2 border-blue-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Binoculars className="w-5 h-5" />
                    <span>Vision</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 ${
                    activeTab === 'mission'
                      ? 'text-blue-900 bg-blue-50 border-b-2 border-blue-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Mountain className="w-5 h-5" />
                    <span>Mission</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('values')}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 ${
                    activeTab === 'values'
                      ? 'text-blue-900 bg-blue-50 border-b-2 border-blue-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Values</span>
                  </div>
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8 md:p-12">
                {activeTab === 'vision' && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
                      <Binoculars className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Vision</h3>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                      To raise a generation of spiritually grounded professionals who transform their workplaces and communities through excellence, integrity, and servant leadership.
                    </p>
                  </div>
                )}

                {activeTab === 'mission' && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
                      <Mountain className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Mission</h3>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                      To empower young professionals and entrepreneurs through spiritual growth, professional development, and purposeful networking that advances spiritually grounded values.
                    </p>
                  </div>
                )}

                {activeTab === 'values' && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Values</h3>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                      Excellence in all we do, Integrity in our character, Unity in our fellowship, and Impact in our service to God and humanity.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual Purpose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Excellence in the Marketplace
            </h2>
            <div className="rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
              {/* Neumorphic background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
              
              {/* Content with neumorphic styling */}
              <div className="relative z-10">
                <blockquote className="text-xl md:text-2xl italic leading-relaxed mb-6 font-bold text-white font-serif tracking-wide">
                  "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters"
                </blockquote>
                <p className="text-white/80 text-lg font-light tracking-widest uppercase text-sm mt-6">Colossians 3:23</p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/3 rounded-full blur-lg"></div>
            </div>
            <div className="mt-12 space-y-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                The YPE Band believes that our professional calling is a sacred trust. We understand that excellence in the marketplace is not just about personal success, but about representing Christ in every boardroom, every project, and every interaction.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through our summit and ongoing activities, we equip young professionals with the tools, network, and spiritual foundation needed to thrive in their careers while maintaining their spiritually grounded perspective and values.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">What We Offer</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 border-2 border-transparent" style={{ background: 'linear-gradient(white, white), linear-gradient(90deg, #0b3050, #021023)', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'padding-box, border-box' }}></div>
                      <span className="text-gray-800">Professional development workshops</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 border-2 border-transparent" style={{ background: 'linear-gradient(white, white), linear-gradient(90deg, #0b3050, #021023)', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'padding-box, border-box' }}></div>
                      <span className="text-gray-800">Spiritual growth and mentorship</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 border-2 border-transparent" style={{ background: 'linear-gradient(white, white), linear-gradient(90deg, #0b3050, #021023)', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'padding-box, border-box' }}></div>
                      <span className="text-gray-800">Networking with like-minded professionals</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 border-2 border-transparent" style={{ background: 'linear-gradient(white, white), linear-gradient(90deg, #0b3050, #021023)', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'padding-box, border-box' }}></div>
                      <span className="text-gray-800">Marketplace ministry training</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Our Impact</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 border-2 border-transparent" style={{ background: 'linear-gradient(white, white), linear-gradient(90deg, #0b3050, #021023)', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'padding-box, border-box' }}></div>
                      <span className="text-gray-800">Transforming workplace cultures</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 border-2 border-transparent" style={{ background: 'linear-gradient(white, white), linear-gradient(90deg, #0b3050, #021023)', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'padding-box, border-box' }}></div>
                      <span className="text-gray-800">Raising ethical business leaders</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 border-2 border-transparent" style={{ background: 'linear-gradient(white, white), linear-gradient(90deg, #0b3050, #021023)', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'padding-box, border-box' }}></div>
                      <span className="text-gray-800">Supporting community development</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 border-2 border-transparent" style={{ background: 'linear-gradient(white, white), linear-gradient(90deg, #0b3050, #021023)', backgroundClip: 'padding-box, border-box', backgroundOrigin: 'padding-box, border-box' }}></div>
                      <span className="text-gray-800">Advancing spiritually grounded values in business</span>
                    </li>
                  </ul>
                </div>
              </div>
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