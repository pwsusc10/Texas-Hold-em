import type { Metadata } from 'next';
import './globals.css';
import { inter } from './font';
import AuthContext from '@/context/AuthContext';
import JotaiContext from '@/context/JotaiContext';
import SWRContext from '@/context/SWRContext';
import UserProvider from '@/context/UserProvider';

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
        <JotaiContext>
          <SWRContext>
            <AuthContext>
              <UserProvider>{children}</UserProvider>
            </AuthContext>
          </SWRContext>
        </JotaiContext>
        <div id="portal" />
      </body>
    </html>
  );
}
