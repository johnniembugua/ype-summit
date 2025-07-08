'use client';

import { Award, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function Speakers() {
  const speakers = [
    {
      name: "Hon. David Maraga",
      title: "Former Chief Justice of Kenya",
      bio: "A distinguished jurist with over 40 years of legal practice, known for his integrity and principled leadership in Kenya's judiciary. His commitment to justice and righteousness has made him a respected figure in both legal and faith communities.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      featured: true,
      topic: "Leadership with Integrity: Principles for Kingdom-Minded Professionals"
    },
    {
      name: "Dr. Sarah Kiprotich",
      title: "CEO, Innovation Hub Kenya",
      bio: "Leading entrepreneur and tech innovator driving digital transformation across East Africa. She has successfully launched multiple startups and is passionate about using technology to solve real-world problems while maintaining strong ethical foundations.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      topic: "Innovation with Purpose: Building Tech Solutions for Kingdom Impact"
    },
    {
      name: "Pastor James Mwangi",
      title: "Senior Pastor & Business Leader",
      bio: "Combining ministry with successful business ventures, advocating for marketplace Christianity. He leads a thriving congregation while running multiple businesses, demonstrating how faith and entrepreneurship can work together.",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      topic: "Marketplace Ministry: Where Faith Meets Business"
    },
    {
      name: "Dr. Grace Wanjiku",
      title: "Healthcare Entrepreneur",
      bio: "Pioneering affordable healthcare solutions and empowering women in business. Her innovative approach to healthcare delivery has improved access to quality medical services in underserved communities across Kenya.",
      image: "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      topic: "Healthcare Innovation: Serving with Excellence and Compassion"
    },
    {
      name: "Daniel Kariuki",
      title: "Fintech Innovator",
      bio: "Revolutionizing financial services and promoting financial literacy in Kenya. His fintech solutions have helped thousands of Kenyans access banking services and build financial stability through innovative mobile platforms.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      topic: "Financial Inclusion: Building Wealth with Kingdom Principles"
    },
    {
      name: "Ruth Muthoni",
      title: "Social Impact Leader",
      bio: "Driving sustainable development and youth empowerment initiatives across Kenya. Her work in community development has transformed lives and created opportunities for young people to thrive in their communities.",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      topic: "Social Entrepreneurship: Creating Sustainable Change"
    },
    {
      name: "Samuel Njenga",
      title: "Media & Communications Expert",
      bio: "Transforming digital communication and building ethical media platforms. His work in media has focused on promoting positive narratives and using communication technology to advance Kingdom values.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      topic: "Media with Purpose: Communicating Kingdom Values in Digital Age"
    }
  ];

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
              <Link href="/speakers" className="text-blue-900 font-semibold">Speakers</Link>
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
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="space-y-6">
            <Badge className="bg-yellow-400 text-blue-900 text-sm font-semibold px-4 py-2">
              Distinguished Speakers
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Learn from Influential Leaders
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Meet the distinguished speakers who are making a difference in their fields while staying true to their faith and Kingdom values.
            </p>
            <Link href="/">
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Speaker */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
              <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-yellow-400 flex-shrink-0">
                  <img 
                    src={speakers[0].image} 
                    alt={speakers[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center lg:text-left flex-1">
                  <Badge className="bg-yellow-400 text-blue-900 mb-4">Keynote Speaker</Badge>
                  <h2 className="text-4xl font-bold mb-3">{speakers[0].name}</h2>
                  <p className="text-2xl text-yellow-400 mb-6">{speakers[0].title}</p>
                  <p className="text-lg text-blue-100 leading-relaxed mb-6">{speakers[0].bio}</p>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-400 mb-2">Speaking Topic:</h3>
                    <p className="text-blue-100">{speakers[0].topic}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Speakers */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Speakers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for insights from these accomplished professionals who are making an impact in their respective fields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.slice(1).map((speaker, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{speaker.name}</h3>
                    <p className="text-yellow-600 font-semibold mb-4">{speaker.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{speaker.bio}</p>
                    <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-3">
                      <h4 className="font-semibold text-blue-900 text-sm mb-1">Speaking Topic:</h4>
                      <p className="text-gray-700 text-xs">{speaker.topic}</p>
                    </div>
                  </div>
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
            Don't Miss These Inspiring Sessions
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Register now to secure your seat and learn from these distinguished speakers who are making a Kingdom impact in their professions.
          </p>
          <div className="space-x-4">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 text-lg"
              >
                Register Now - KSH 400
              </Button>
            </Link>
            <Link href="/program">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
              >
                View Full Program
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