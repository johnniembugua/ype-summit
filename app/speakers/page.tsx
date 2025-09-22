'use client';

import { Award, ArrowLeft, Twitter, Linkedin, Users, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';

export default function Speakers() {
  const speakers = [
    {
      name: "CJ Maraga",
      title: "14th Chief Justice and President of the Supreme Court of Kenya",
      bio: "A distinguished Jurist, who served as the 14th Chief Justice and President of the Supreme Court of Kenya. CJ Maraga is active in civic life, mentoring youth, leading the Africa Judges and Jurists Forum, and advocating for governance. He has received numerous awards, including the Elder of the Golden Heart (EGH) and honorary doctorates.",
      image: "/images/4.jpeg",
      featured: true,
      topic: "Harnessing the power of networking to inspire purpose, unlock opportunities, and drive entrepreneurship for a better tomorrow",
      social: {
        twitter: "https://x.com/dkmaraga?lang=en",
        linkedin: "https://linkedin.com/in/cjmaraga"
      }
    },
    {
      name: "Dr. Dorothy Mbori-Ngacha",
      title: "Medical Doctor & Public Health Expert",
      bio: "A medical doctor with specialist training in paediatrics, infectious disease, and public health. She has extensive experience as a public health professional working in academia, the public sector, the NGO community, and international organizations.",
      image: "/images/2.jpg",
      topic: "career development strategies, professional growth techniques and advancement opportunities",
      social: {
        twitter: "https://twitter.com/drmboringacha",
        linkedin: "https://www.linkedin.com/in/dorothy-mbori-ngacha-778b5b18/"
      }
    },
    {
      name: "Mr. Josphat Mokaya",
      title: "Enterprise Development Expert & Climate Action Expert",
      bio: "An Enterprise Development Expert, an ILO-SIYB Certified Business Trainer and an award winning businessman. He is also a Climate Action Expert and the Sub-Regional Node Coordinator for ECOP East Africa. He has a passion in training and mentoring SMEs and entrepreneurs to exploit their full potential. He drives sustainable development through market research, impactful mentorship, and coaching.",
      image: "/images/3.jpeg",
      topic: "Enterprise Development: Unlocking Entrepreneurial Potential",
      social: {
        twitter: "https://twitter.com/josphatmokaya",
        linkedin: "https://www.linkedin.com/in/josphat-mokaya-254735137/"
      }
    },
    {
      name: "Mr. Erick Macakiage",
      title: "Chairman of RHD Group of Companies",
      bio: "Chairman of RHD Group of Companies; Regional Representative for Malaysian Business Community; a lead government consultant, and the founder of the Bridal Choir Ministry. He mentors SMEs & corporate businesses, boosting their efficiencies and profitability thus ensuring sustainable growth through strategic solutions and mentorship.",
      image: "/images/5.jpg",
      topic: "Strategic Business Growth: Building Sustainable Enterprises",
      social: {
        twitter: "https://twitter.com/erickmacakiage",
        linkedin: "https://ke.linkedin.com/in/edwin-makori-b3572241"
      }
    },
    {
      name: "FCPA. Edwin Makori",
      title: "Former CEO ICPAK & Finance Expert",
      bio: "Previously CEO ICPAK, is a finance expert with extensive experience in strategy, finance, business development, innovation, and IT, with a track record of leading teams to achieve transformative results.",
      image: "/images/1.jpg",
      topic: "Financial Leadership: Strategic Finance for Kingdom Impact",
      social: {
        twitter: "https://twitter.com/edwinmakori",
        linkedin: "https://ke.linkedin.com/in/edwin-makori-b3572241"
      }
    }
  ];

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
              <Users className="w-4 h-4" />
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Learn from Influential Leaders
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Meet the distinguished speakers who are making a difference in their fields while staying true to their faith and Kingdom values.
            </p>
           
          </div>
        </div>
      </section>

      {/* Featured Speaker */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <div className="rounded-2xl p-8 md:p-12 text-white" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
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
                  <div className="flex justify-center space-x-4 mb-6">
                    <a href={speakers[0].social.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-6 h-6 text-blue-100" />
                    </a>
                    <a href={speakers[0].social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-6 h-6 text-blue-100" />
                    </a>
                  </div>
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
                    <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{speaker.name}</h3>
                    <p className="text-yellow-600 font-semibold mb-4">{speaker.title}</p>
                    <div className="flex justify-center space-x-4 mb-4">
                      <a href={speaker.social.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-6 h-6 text-gray-600" />
                      </a>
                      <a href={speaker.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-6 h-6 text-gray-600" />
                      </a>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{speaker.bio}</p>
                    <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-3 text-left pt-3">
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