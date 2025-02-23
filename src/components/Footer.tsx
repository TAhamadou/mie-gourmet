import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Shipping Information</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <a 
              href="https://www.instagram.com/miegourmetcafe" 
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="h-5 w-5" />
              Instagram
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Mie Gourmet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 