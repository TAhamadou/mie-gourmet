import type { Metadata } from "next";
import { Geist, Geist_Mono, Shadows_Into_Light } from "next/font/google";
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

const shadowsIntoLight = Shadows_Into_Light({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-shadows-into-light',
});

export const metadata: Metadata = {
  title: "Mie Gourmet Cafe",
  description: "Handcrafted cakes and desserts made with love. Specializing in custom cakes, cheesecakes, and layer cakes for all occasions.",
  icons: {
    icon: [
      {
        url: '/images/logo/Mie-Seal.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/images/logo/Mie-Seal.svg',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
      {
        url: '/images/logo/Mie-Seal.svg',
        sizes: '16x16',
        type: 'image/svg+xml',
      }
    ],
    shortcut: '/images/logo/Mie-Seal.svg',
  },
  openGraph: {
    title: 'Mie Gourmet Cafe',
    description: 'Handcrafted cakes and desserts made with love. Specializing in custom cakes, cheesecakes, and layer cakes for all occasions.',
    images: [
      {
        url: '/images/logo/Mie-Seal.svg',
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
    images: ['/images/logo/Mie-Seal.svg'],
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
        <link rel="icon" type="image/svg+xml" href="/images/logo/Mie-Seal.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/images/logo/Mie-Seal.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/images/logo/Mie-Seal.svg" />
        <link rel="shortcut icon" href="/images/logo/Mie-Seal.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${shadowsIntoLight.variable} antialiased bg-orange-50 text-gray-900`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
