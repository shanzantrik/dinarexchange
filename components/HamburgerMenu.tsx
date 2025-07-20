'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavLink {
  label: string;
  href: string;
}

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export default function HamburgerMenu({ open, onClose, navLinks }: HamburgerMenuProps) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="w-80 bg-white h-full shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-orange-500 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-6">
          <nav className="space-y-2 mb-8">
            {navLinks.map((n) => (
              <Link
                key={n.label}
                onClick={onClose}
                href={n.href}
                className="block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="mb-8">
            <Link
              onClick={onClose}
              href="/contact"
              className="btn-gradient flex items-center justify-center space-x-2 w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Contact</span>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Follow Us</h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-500 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/DinarExchange"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-500 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="mailto:dinars@dinarexchange.com.au"
                className="text-gray-600 hover:text-orange-500 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>1300 856 881</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>0417 460 236</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>dinars@dinarexchange.com.au</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 z-40" />
    </motion.div>
  );
}
