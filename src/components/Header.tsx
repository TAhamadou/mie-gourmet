'use client';
// import { useState } from 'react';
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  UserIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import titleImage from '../../public/images/logo/Mie-Title.svg';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  setIsMenuOpen: (value: boolean) => void;
  setIsCartOpen: (value: boolean) => void;
}

export default function Header({ setIsMenuOpen, setIsCartOpen }: HeaderProps) {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="fixed top-0 w-full bg-black shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button 
          className="p-2 rounded-md hover:bg-gray-800"
          onClick={() => setIsMenuOpen(true)}
        >
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>
        
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <Image 
              src={titleImage} 
              alt="Mie Gourmet" 
              width={180} 
              height={60} 
              className="h-12 w-auto" 
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-gray-800">
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-800">
            <UserIcon className="h-5 w-5 text-white" />
          </button>
          <button 
            className="p-2 rounded-md hover:bg-gray-800 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBagIcon className="h-5 w-5 text-white" />
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