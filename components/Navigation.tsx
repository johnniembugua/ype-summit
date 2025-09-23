'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', color: pathname === '/' ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900' },
    { href: '/about', label: 'About', color: pathname === '/about' ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900' },
    { href: '/register', label: 'Register', color: pathname === '/register' ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900' },
    { href: '/program', label: 'Program', color: pathname === '/program' ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900' },
    { href: '/speakers', label: 'Speakers', color: pathname === '/speakers' ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900' },
    { href: '/exhibitors', label: 'Pitching', color: pathname === '/exhibitors' ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900' },
    { href: '/partnership', label: 'Partnership', color: pathname === '/partnership' ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900' },
    { href: '/resources', label: 'Resources', color: pathname === '/resources' ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo variant="header" />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${item.color} transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${item.color} transition-colors py-2 px-3 rounded-md hover:bg-gray-100`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
