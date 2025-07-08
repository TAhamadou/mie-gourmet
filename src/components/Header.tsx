'use client';
import { useState, useEffect } from 'react';
import {
  Bars3Icon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  setIsMenuOpen: (value: boolean) => void;
  setIsCartOpen: (value: boolean) => void;
  disableOpacityChange?: boolean;
}

export default function Header({ setIsMenuOpen, setIsCartOpen, disableOpacityChange = false }: HeaderProps) {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity based on scroll position
  const headerOpacity = disableOpacityChange ? 1 : (scrollY > 100 ? 1 : 0.7);

  return (
    <header 
      className="fixed top-0 w-full bg-orange-100 shadow-sm z-50 transition-opacity duration-300"
      style={{ backgroundColor: `rgba(255, 237, 213, ${headerOpacity})` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button 
          className="p-2 rounded-md hover:bg-orange-200"
          onClick={() => setIsMenuOpen(true)}
        >
          <Bars3Icon className="h-6 w-6 text-gray-800" />
        </button>
        
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <span 
              className="text-4xl text-brown-800 font-normal"
              style={{ 
                fontFamily: "'Shadows Into Light', cursive", 
                fontSize: '60px',
                letterSpacing: '0.1em',
                color: 'rgb(85, 38, 5)'
              }}
            >
              Mie-Gourmet
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="p-2 rounded-md hover:bg-orange-200 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBagIcon className="h-5 w-5 text-gray-800" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
} 