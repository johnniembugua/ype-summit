import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'header' | 'footer';
  className?: string;
}

export function Logo({ variant = 'header', className = '' }: LogoProps) {
  const isFooter = variant === 'footer';
  
  return (
    <Link href="/" className={`flex items-center space-x-3 group ${className}`}>
      <div className={`relative ${isFooter ? 'w-12 h-12' : 'w-10 h-10 sm:w-12 sm:h-12'} flex-shrink-0`}>
        <Image
          src="/logo.jpeg"
          alt="MAYS Young Professionals and Entrepreneurs Summit"
          fill
          className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
          priority={variant === 'header'}
        />
      </div>
      <div className={`${isFooter ? 'text-white' : 'text-gray-900'}`}>
        <h1 className={`font-bold leading-tight ${
          isFooter 
            ? 'text-lg sm:text-xl' 
            : 'text-lg sm:text-xl md:text-2xl'
        }`}>
          MAYS Summit 2025
        </h1>
        <p className={`text-sm ${
          isFooter 
            ? 'text-gray-400' 
            : 'text-gray-600'
        } hidden sm:block`}>
          Young Professionals & Entrepreneurs
        </p>
      </div>
    </Link>
  );
}

// Simplified version for mobile menu or compact spaces
export function LogoCompact({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center space-x-2 group ${className}`}>
      <div className="relative w-8 h-8 flex-shrink-0">
        <Image
          src="/logo.jpeg"
          alt="MAYS Summit"
          fill
          className="object-contain rounded group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <span className="font-bold text-gray-900 text-lg">MAYS</span>
    </Link>
  );
}
