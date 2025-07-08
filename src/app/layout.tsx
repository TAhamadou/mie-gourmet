import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mie Gourmet Cafe",
  description: "Handcrafted cakes and desserts made with love. Specializing in custom cakes, cheesecakes, and layer cakes for all occasions.",
  icons: {
    icon: [
      {
        url: '/images/logo/Mie-Seal.svg',
        type: 'image/svg+xml',
      }
    ]
  },
  openGraph: {
    title: 'Mie Gourmet Cafe',
    description: 'Handcrafted cakes and desserts made with love. Specializing in custom cakes, cheesecakes, and layer cakes for all occasions.',
    images: [
      {
        url: '/images/logo/Mie-Logo.png',
        width: 1200,
        height: 630,
        alt: 'Mie Gourmet - Premium Cakes & Desserts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/logo/Mie-Logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-orange-50 text-gray-900`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
