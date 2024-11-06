import type { Metadata } from 'next';
import './globals.css';
import { inter } from './font';
import AuthContext from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'H P',
  description: "Texas Hold'em"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="relative w-full min-h-screen flex flex-col">
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
