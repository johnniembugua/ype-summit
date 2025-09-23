'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar, Clock, MapPin, Users, ArrowRight, Award, Play, ChevronLeft, ChevronRight, Quote, Facebook, Twitter, Youtube, FileText, Church, User } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Logo } from '@/components/Logo';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);

  // State to track if it's past September 28th, 2025 at 12:00 EAT
  const [showFeedbackSection, setShowFeedbackSection] = useState(false);

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

  // Check if it's past September 28th, 2025 at 12:00 EAT
  useEffect(() => {
    const feedbackDate = new Date('2025-09-28T12:00:00+03:00'); // EAT timezone
    const now = new Date();
    
    if (now >= feedbackDate) {
      setShowFeedbackSection(true);
    }
  }, []);

  const isLive = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  const testimonials = [
    {
      name: 'Tony Okeyo',
      title: 'Business Owner',
      testimonial: 'The 2024 YPE Summit was a game-changer for me. I was inspired by the speakers and connected with like-minded professionals who share my passion for spiritually grounded impact.',
      image: '/images/1.jpeg'
    },
    {
      name: 'Natalie',
      title: 'Entrepreneur',
      testimonial: 'I was impressed by the quality of the speakers and the richness of the content. The 2024 YPE Summit was a catalyst for my business and spiritual growth.',
      image: '/images/2.jpeg'
    },
    {
      name: 'Kennedy',
      title: 'Professional',
      testimonial: 'The 2024 YPE Summit was a life-changing experience for me. I was challenged to think differently about my career and my faith, and I left with a renewed sense of purpose.',
      image: '/images/3.jpeg'
    },
    {
      name: 'Sarah Mwangi',
      title: 'Business Leader',
      testimonial: 'The networking opportunities at the 2024 YPE Summit were incredible. I formed partnerships that have transformed my business approach and expanded my spiritually grounded impact.',
      image: '/images/4.jpeg'
    },
    {
      name: 'David Otieno',
      title: 'Tech Professional',
      testimonial: 'As someone in the tech industry, I found the 2024 YPE Summit incredibly relevant. The speakers addressed real-world challenges and provided practical solutions for integrating faith with professional excellence.',
      image: '/images/5.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b3050,#021029)]/85 backdrop-blur-sm"></div>
          
          {/* Animated geometric shapes */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>
        
        {/* removed star-like decorative elements */}
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center z-10">
          <div className="space-y-12">
            {/* Main title with unique styling */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                YPE SUMMIT
              </h1>
              <h2 className="text-2xl md:text-4xl font-light text-yellow-100/90 tracking-wide">
                Thrive with Purpose, God at the Center
              </h2>
            </div>
            
            {/* Creative subtitle */}
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent blur-xl"></div>
              <p className="relative text-lg md:text-xl text-yellow-100/80 leading-relaxed">
                Empowering the next generation of African leaders through faith-rooted entrepreneurship, practical skills, and transformative networking.
              </p>
            </div>
            
            {/* Unique info display */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-yellow-100/90">
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <span className="font-medium">Sept 28</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="font-medium">09:00 EAT</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="font-medium">Nairobi</span>
              </div>
            </div>

            {/* Unique countdown design */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-yellow-400/20 blur-2xl rounded-3xl"></div>
              <div className="relative bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
                {isLive ? (
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-400 font-semibold">LIVE NOW</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">The Summit is Live!</h2>
                    <p className="text-lg text-yellow-100/90">Join us for an amazing day of empowerment and inspiration!</p>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Summit Begins In:</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      <div className="bg-gradient-to-br from-blue-600/30 to-blue-800/30 border border-blue-400/20 rounded-xl p-4 md:p-6 backdrop-blur-sm">
                        <div className="text-3xl md:text-4xl font-bold text-yellow-400">{timeLeft.days}</div>
                        <div className="text-sm md:text-base text-blue-200 font-medium">DAYS</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-600/30 to-blue-800/30 border border-blue-400/20 rounded-xl p-4 md:p-6 backdrop-blur-sm">
                        <div className="text-3xl md:text-4xl font-bold text-yellow-400">{timeLeft.hours}</div>
                        <div className="text-sm md:text-base text-blue-200 font-medium">HOURS</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-600/30 to-blue-800/30 border border-blue-400/20 rounded-xl p-4 md:p-6 backdrop-blur-sm">
                        <div className="text-3xl md:text-4xl font-bold text-yellow-400">{timeLeft.minutes}</div>
                        <div className="text-sm md:text-base text-blue-200 font-medium">MINUTES</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-600/30 to-blue-800/30 border border-blue-400/20 rounded-xl p-4 md:p-6 backdrop-blur-sm">
                        <div className="text-3xl md:text-4xl font-bold text-yellow-400">{timeLeft.seconds}</div>
                        <div className="text-sm md:text-base text-blue-200 font-medium">SECONDS</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Unique CTA design */}
            <div className="space-y-4">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 blur-lg rounded-lg"></div>
                <Link href="/register" className="relative">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold px-8 py-4 text-lg border-0 shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105"
                  >
                    Register To Attend
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-yellow-200/80 font-medium tracking-wide">
                ✦ Limited seats available • Register now to secure your spot ✦
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What to Expect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A transformative day designed to empower spiritually grounded professionals with practical insights, spiritual growth, and meaningful connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-orange-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-900" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Guest Speaker</CardTitle>
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-orange-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-900" />
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

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-orange-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Church className="w-8 h-8 text-blue-900" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Spiritually Grounded Impact</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Connect with like-minded professionals and discover how to make a lasting impact in your workplace and community through spiritually grounded principles.
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
      <section className="py-20 bg-gradient-to-br from-orange-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl p-8 md:p-12 text-white" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-400 flex-shrink-0">
                <img 
                  src="/images/4.jpeg"
                  alt="CJ Maraga"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <Badge className="bg-yellow-400 text-blue-900 mb-4">Guest Speaker</Badge>
                <h3 className="text-3xl font-bold mb-2">CJ Maraga</h3>
                <p className="text-xl text-white-900 mb-4">14th Chief Justice and President of the Supreme Court of Kenya</p>
                <p className="text-lg text-yellow-100 leading-relaxed mb-6">
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

      {/* Organizing Partners */}
            <section className="py-20 bg-white">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-2xl mr-2"></span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      Organizing Partners of The Summit
                    </h2>
                    <span className="text-2xl ml-2"></span>
                  </div>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Meet the visionary organizations leading the charge in youth empowerment and spiritual transformation.
                  </p>
                </div>
      
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <Card className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-10">
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center mx-auto mb-6">
                          <Image src="/images/mays.png" alt="MAYS Logo" width={80} height={80} className="w-36 h-36 object-contain" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Mwangaza Adventist Young Society</h3>
                        <Badge className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 mb-4">
                          Host & Organizer
                        </Badge>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-center">
                        Young Professionals and Entrepreneurs Band – Empowering youth to lead with purpose, innovation, and faith. Mwangaza stands at the forefront of spiritual and professional transformation across communities.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-10">
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center mx-auto mb-6">
                          <Image src="/images/ayp.png" alt="AYP Logo" width={160} height={160} className="w-36 h-36 object-contain" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Newlife Church Adventist Young Professionals</h3>
                        <Badge className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 mb-4">
                          Strategic Partner
                        </Badge>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-center">
                        A vibrant network of faith-driven young professionals committed to service, leadership, and community impact. Newlife champions the integration of spiritual values with entrepreneurial excellence.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions about the YPE Summit 2025.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-2 border-gray-200">
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">What is the YPE Summit?</h3>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The YPE Summit is an annual gathering designed to empower spiritually grounded professionals through faith-rooted entrepreneurship, practical skills development, and transformative networking opportunities.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b-2 border-gray-200">
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">When and where is the summit?</h3>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The YPE Summit 2025 will take place on September 28th at 09:00 EAT, SDA Church Mwangaza, in Nairobi, Kenya. Join us for a day of inspiration, learning, and networking.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b-2 border-gray-200">
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Who should attend?</h3>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The summit is ideal for young professionals, entrepreneurs, students, and anyone seeking to integrate their faith with their professional life and make a spiritually grounded impact.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b-2 border-gray-200">
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">How do I register?</h3>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Registration is simple! Click the "Register for Summit" button on our homepage or visit the registration page. Limited seats are available, so register early.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b-2 border-gray-200">
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">What's included in the registration?</h3>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Your registration includes access to all sessions, workshops, networking opportunities, meals and conference materials.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b-2 border-gray-200">
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Can I become a partner or sponsor?</h3>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Yes! We welcome partnerships with organizations that share our vision. Visit our partnership page or contact us at aysmwangaza@gmail.com for more information.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Attendees Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Hear from our past attendees who have experienced the impact of the YPE Summit.
            </p>
          </div>

          <div className="relative">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.slice(testimonialIndex, testimonialIndex + 3).map((testimonial, index) => (
                    <div key={index} className="block">
                      <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50 h-full">
                        <CardContent className="p-8 flex flex-col h-full">
                          <div className="flex items-center justify-center mb-8">
                            <Quote className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-lg text-gray-600 leading-relaxed mb-8 flex-grow">
                            {testimonial.testimonial}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                <User className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                                <p className="text-sm text-gray-600">{testimonial.title}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <button 
                className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                onClick={() => setTestimonialIndex((testimonialIndex - 3 + testimonials.length) % testimonials.length)}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                onClick={() => setTestimonialIndex((testimonialIndex + 3) % testimonials.length)}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action / Feedback Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {showFeedbackSection ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Share Your Feedback
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                We value your input! Help us improve the YPE Summit experience by sharing your thoughts and suggestions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/feedback" aria-label="Submit Feedback">
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 text-lg"
                  >
                    Submit Feedback
                  </Button>
                </Link>
                <Link href="/contact" aria-label="Contact Us">
                  <Button 
                    size="lg" 
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-3 text-lg"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Make an Impact?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join us at the YPE Summit 2025 and be part of a community that&apos;s committed to excellence, integrity, and spiritually grounded impact in the marketplace.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/register" aria-label="Register for Summit">
                  <Button 
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 text-lg"
                  >
                    Register for Summit
                  </Button>
                </Link>
                <Link href="/partnership" aria-label="Partner With Us">
                  <Button 
                    size="lg" 
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-3 text-lg"
                  >
                    Partner With Us
                  </Button>
                </Link>
              </div>
            </>
          )}
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
                <Link href="/exhibitors" className="block text-gray-400 hover:text-blue-900 transition-colors">Pitching</Link>
                <Link href="/register" className="block text-gray-400 hover:text-blue-900 transition-colors">Register</Link>
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