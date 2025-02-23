'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HeroCarousel from '../components/HeroCarousel';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { products } from '@/data/products';
import Image from "next/image";
import logo from '../../public/images/logo/Mie-Logo.svg';

// Import gallery images
import gallery1 from '../../public/images/gallery/german_gallery.jpg';
import gallery3 from '../../public/images/gallery/sweet_potato_gallery.jpg';
import gallery4 from '../../public/images/gallery/strawberry_gallery.jpg';

// Import the useSort hook
import { useSort } from '../hooks/useSort';

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'name', name: 'Name' },
  { id: 'price-asc', name: 'Price: Low to High' },
  { id: 'price-desc', name: 'Price: High to Low' },
];

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const galleryImages = [
    { src: gallery1, alt: "German Chocolate Cake Gallery" },
    { src: gallery3, alt: "Sweet Potato Cheesecake Gallery" },
    { src: gallery4, alt: "Strawberry Angel Cake Gallery" },
  ];

  const { sortedItems, sortOption, setSortOption } = useSort(products);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen font-['Helvetica','Arial',sans-serif]">
      <Header setIsMenuOpen={setIsMenuOpen} setIsCartOpen={setIsCartOpen} />
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main>
        <section className="relative mb-4">
          <HeroCarousel images={galleryImages} />
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16">
          <ProductGrid 
            sortedItems={sortedItems}
            sortOption={sortOption}
            setSortOption={setSortOption}
            sortOptions={sortOptions}
          />
        </div>

        {/* About Us Section */}
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                About Us
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="font-medium text-xl text-orange-600">
                  Food is our love language here at Mie Gourmet. We believe a great dessert can brighten any day.
                </p>
                
                <p>
                  Each of our cakes and confections are sparked with innovation, blending tradition with artistry bringing you quality handmade creations.
                </p>

                <div className="py-4">
                  <p className="text-2xl font-serif italic text-gray-800">
                    &ldquo;Our passion for food runs deep.&rdquo;
                  </p>
                </div>

                <p>
                  It&apos;s not just about baking, it&apos;s a form of expression passed down through generations.
                  Chefs, artists, and bakers like scientists with a love for uplifting hearts through joyful experiences.
                </p>

                <p>
                  Every treat we create tells a story of family, community, and a passion for creativity.
                </p>

                <p className="text-xl font-medium text-orange-600 pt-4">
                  So what do you say? Let&apos;s make your day a little brighter.
                </p>
              </div>
            </div>

            {/* Decorative Elements with Logo */}
            <div className="grid grid-cols-3 gap-8 mt-16">
              <div className="aspect-square bg-orange-100 rounded-full opacity-20"></div>
              <div className="relative aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={logo}
                    alt="Mie Gourmet Logo"
                    width={280}
                    height={280}
                    className="opacity-80 scale-125"
                  />
                </div>
              </div>
              <div className="aspect-square bg-orange-100 rounded-full opacity-20"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Overlay */}
      {(isCartOpen || isMenuOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setIsCartOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}
