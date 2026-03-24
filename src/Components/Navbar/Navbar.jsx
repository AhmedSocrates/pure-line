import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { getCartCount } = useCart();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || !isHome || isOpen
      ? 'bg-white/90 backdrop-blur-md shadow-md py-4'
      : 'bg-transparent py-6'
  }`;

  const linkClass = `font-medium transition-colors duration-300 ${
    isScrolled || !isHome || isOpen
      ? 'text-slate-700 hover:text-cyan-600'
      : 'text-white hover:text-cyan-200'
  }`;

  const logoClass = `text-2xl font-bold tracking-tighter ${
    isScrolled || !isHome || isOpen ? 'text-cyan-600' : 'text-white'
  }`;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/categories', label: 'Categories' },
    { to: '/about', label: 'About' },
  ];

  return (
    <>
      <nav className={navClass}>
        <div className="container-max flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className={logoClass}>
            PureLine
            <span className={isScrolled || !isHome || isOpen ? 'text-blue-600' : 'text-cyan-200'}>
              .
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Cart + CTA + Hamburger */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className={`relative p-2 transition-colors duration-300 ${
                isScrolled || !isHome || isOpen
                  ? 'text-slate-700 hover:text-cyan-600'
                  : 'text-white hover:text-cyan-200'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* CTA Button (Desktop only) */}
            <div className="hidden md:block">
              <Link
                to="/about"
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  isScrolled || !isHome
                    ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                    : 'bg-white text-cyan-700 hover:bg-cyan-50'
                }`}
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                  isOpen
                    ? 'rotate-45 translate-y-2 bg-slate-800'
                    : isScrolled || !isHome
                    ? 'bg-slate-800'
                    : 'bg-white'
                }`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                  isOpen
                    ? 'opacity-0'
                    : isScrolled || !isHome
                    ? 'bg-slate-800'
                    : 'bg-white'
                }`}
              />
              <span
                className={`block w-6 h-0.5 rounded-full transition-all duration-300 ${
                  isOpen
                    ? '-rotate-45 -translate-y-2 bg-slate-800'
                    : isScrolled || !isHome
                    ? 'bg-slate-800'
                    : 'bg-white'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay (Moved outside Nav) */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel (Moved outside Nav) */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-24 px-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block py-3 px-4 rounded-xl text-lg font-medium transition-colors duration-200 ${
                location.pathname === link.to
                  ? 'bg-cyan-50 text-cyan-600'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-cyan-600'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-slate-100 my-4" />

          {/* Mobile CTA */}
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block text-center py-3 px-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </>
  );
}