import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - YPE Summit 2025',
  description: 'Administrative dashboard for managing YPE Summit 2025 registrations, questions, and partnerships.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
