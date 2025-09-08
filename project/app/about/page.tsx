'use client';

import { Award, Users, Target, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/Logo';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo variant="header" />
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-900 transition-colors">Home</a>
              <a href="/#speakers" className="text-gray-700 hover:text-blue-900 transition-colors">Speakers</a>
              <a href="/#program" className="text-gray-700 hover:text-blue-900 transition-colors">Program</a>
              <a href="/#register" className="text-gray-700 hover:text-blue-900 transition-colors">Register</a>
              <a href="/about" className="text-blue-900 font-semibold">About</a>
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
              About YPE Band & Ministry
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Empowering Kingdom-Minded Professionals
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Part of the Youth Ministries Department, dedicated to raising leaders who impact their workplaces and communities for the Kingdom.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Summit
            </Button>
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
                  <p className="text-gray-600">Committed to marketplace ministry and Kingdom advancement</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1708912/pexels-photo-1708912.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="YPE Band worship session"
                  className="w-full h-full object-cover opacity-75"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                    alt="Professional networking"
                    className="w-full h-full object-cover opacity-75"
                  />
                </div>
                <div className="aspect-square bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/1708912/pexels-photo-1708912.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                    alt="Ministry activities"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-yellow-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  To raise a generation of Kingdom-minded professionals who transform their workplaces and communities through excellence, integrity, and servant leadership.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-blue-900" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  To empower young professionals and entrepreneurs through spiritual growth, professional development, and purposeful networking that advances God's Kingdom.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Values</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  Excellence in all we do, Integrity in our character, Unity in our fellowship, and Impact in our service to God and humanity.
                </p>
              </CardContent>
            </Card>
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
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
              <blockquote className="text-xl md:text-2xl italic leading-relaxed mb-6">
                "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters"
              </blockquote>
              <p className="text-blue-200 text-lg">Colossians 3:23</p>
            </div>
            <div className="mt-12 space-y-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                The YPE Band believes that our professional calling is a sacred trust. We understand that excellence in the marketplace is not just about personal success, but about representing Christ in every boardroom, every project, and every interaction.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through our summit and ongoing activities, we equip young professionals with the tools, network, and spiritual foundation needed to thrive in their careers while maintaining their Kingdom perspective and values.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What We Offer</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <span>Professional development workshops</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <span>Spiritual growth and mentorship</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <span>Networking with like-minded professionals</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <span>Marketplace ministry training</span>
                    </li>
                  </ul>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Impact</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <span>Transforming workplace cultures</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <span>Raising ethical business leaders</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <span>Supporting community development</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <span>Advancing Kingdom values in business</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Youth Ministries Department */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Part of Youth Ministries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The YPE Band operates under the umbrella of the Youth Ministries Department, sharing in the broader vision of empowering young people for Kingdom impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Connected to a Greater Vision
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                As part of the Youth Ministries Department, the YPE Band benefits from and contributes to a comprehensive approach to youth development that includes spiritual formation, leadership training, and practical life skills.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                This connection ensures that our professional focus remains grounded in biblical principles and aligned with the broader mission of raising up a generation that will transform society.
              </p>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Youth Ministries Departments:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Young Professionals & Entrepreneurs (YPE)</li>
                  <li>• Students Ministry</li>
                  <li>• Young Adults Fellowship</li>
                  <li>• Youth Leadership Development</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1708912/pexels-photo-1708912.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Youth Ministries gathering"
                  className="w-full h-full object-cover opacity-75"
                />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Join Our Community</h4>
                <p className="text-gray-600 text-sm">
                  Be part of a movement that's transforming lives and communities through purposeful professional excellence.
                </p>
              </div>
            </div>
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
            <Button 
              size="lg" 
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 text-lg"
              onClick={() => window.location.href = '/#register'}
            >
              Register for Summit
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
              onClick={() => window.location.href = '/'}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}