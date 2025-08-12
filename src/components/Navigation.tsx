'use client';
import { XMarkIcon, HomeIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export default function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
      isMenuOpen ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-200 ease-in-out z-50`}>
      <div className="p-4">
        <button 
          className="p-2 hover:bg-gray-100 rounded-md"
          onClick={() => setIsMenuOpen(false)}
        >
          <XMarkIcon className="h-6 w-6 text-black" />
        </button>
      </div>
      <ul className="p-4 space-y-4">
        <li>
          <Link 
            href="/" 
            className="flex items-center gap-3 text-black hover:text-orange-500 hover:bg-orange-50 p-2 rounded-md transition-colors"
            onClick={handleLinkClick}
          >
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link 
            href="/shop" 
            className="flex items-center gap-3 text-black hover:text-orange-500 hover:bg-orange-50 p-2 rounded-md transition-colors"
            onClick={handleLinkClick}
          >
            <ShoppingBagIcon className="h-5 w-5" />
            <span>Shop</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
} 