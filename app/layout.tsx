import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { FloatingQuestionButton } from '@/components/FloatingQuestionButton';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YPE Summit 2025 - Empowering Spiritually Grounded Professionals',
  description: 'Join us on September 28, 2025 in Nairobi, Kenya for the Young Professionals and Entrepreneurs Summit - a faith-based event designed to empower spiritually grounded professionals for impact.',
  keywords: 'YPE Summit, Young Professionals, Entrepreneurs, Kenya, Nairobi, Faith-based, spiritually grounded, Professional development, Youth Ministries',
  authors: [{ name: 'YPE Summit Team' }],
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'apple-touch-icon-precomposed', url: '/logo.png' },
    ],
  },
  openGraph: {
    title: 'YPE Summit 2025 - Empowering Spiritually Grounded Professionals',
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
    title: 'YPE Summit 2025 - Empowering Spiritually Grounded Professionals',
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
         attribute="class"
         defaultTheme="light"
         enableSystem={false}
         disableTransitionOnChange>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#d4af37',
                color: 'white',
                border: '1px solid #d4af37',
              },
            }}
          />
          <FloatingQuestionButton />
        </ThemeProvider>
      </body>
    </html>
  );
}