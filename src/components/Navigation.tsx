'use client';
import { XMarkIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export default function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
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
      <ul className="p-4">
        <li className="mb-4">
          <Link href="/" className="flex items-center gap-2 text-black hover:text-gray-600">
            <HomeIcon className="h-4 w-4" /> Shop
          </Link>
        </li>
      </ul>
    </nav>
  );
} 