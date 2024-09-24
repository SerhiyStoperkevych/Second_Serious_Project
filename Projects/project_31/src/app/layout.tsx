'use client';  // This tells Next.js this is a Client Component

import { Inter } from 'next/font/google';
import { CartProvider } from '../context/CartContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>E-Commerce Portfolio Project</title>
        <meta name="description" content="A full-fledged e-commerce project built using Next.js and TypeScript." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="keywords" content="e-commerce, portfolio, Next.js, TypeScript, project" />
        <meta name="author" content="Your Name" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <CartProvider>{children}</CartProvider>
          </GoogleOAuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
