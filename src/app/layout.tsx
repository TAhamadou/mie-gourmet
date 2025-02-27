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
        url: '/images/logo/Mie-Seal.svg',
        width: 512,
        height: 512,
        alt: 'Mie Gourmet Cafe Logo',
      }
    ],
    locale: 'en_US',
    type: 'website',
  }
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
