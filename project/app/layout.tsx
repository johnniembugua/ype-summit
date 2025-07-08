import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YPE Summit 2025 - Empowering Kingdom-Minded Professionals',
  description: 'Join us on September 28, 2025 in Nairobi, Kenya for the Young Professionals and Entrepreneurs Summit - a faith-based event designed to empower Kingdom-minded professionals for impact.',
  keywords: 'YPE Summit, Young Professionals, Entrepreneurs, Kenya, Nairobi, Faith-based, Kingdom-minded, Professional development, Youth Ministries',
  authors: [{ name: 'YPE Summit Team' }],
  openGraph: {
    title: 'YPE Summit 2025 - Empowering Kingdom-Minded Professionals',
    description: 'Join us on September 28, 2025 in Nairobi, Kenya for the Young Professionals and Entrepreneurs Summit',
    url: 'https://ypesummit.co.ke',
    siteName: 'YPE Summit 2025',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'YPE Summit 2025',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YPE Summit 2025 - Empowering Kingdom-Minded Professionals',
    description: 'Join us on September 28, 2025 in Nairobi, Kenya for the Young Professionals and Entrepreneurs Summit',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e3a5f',
              color: 'white',
              border: '1px solid #d4af37',
            },
          }}
        />
      </body>
    </html>
  );
}