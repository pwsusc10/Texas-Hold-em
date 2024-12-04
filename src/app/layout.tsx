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
      <head>
        <link rel="icon" type="image/png" href="/images/icons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/images/icons/favicon.svg" />
        <link rel="shortcut icon" href="/images/icons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="H P" />
      </head>
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
