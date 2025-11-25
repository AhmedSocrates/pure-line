import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';



export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { getCartCount } = useCart();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
    }`;

  const linkClass = `font-medium transition-colors duration-300 ${isScrolled || !isHome ? 'text-slate-700 hover:text-cyan-600' : 'text-white hover:text-cyan-200'
    }`;

  const logoClass = `text-2xl font-bold tracking-tighter ${isScrolled || !isHome ? 'text-cyan-600' : 'text-white'
    }`;

  return (
    <nav className={navClass}>
      <div className="container-max flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className={logoClass}>
          PureLine<span className={isScrolled || !isHome ? 'text-blue-600' : 'text-cyan-200'}>.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={linkClass}>Home</Link>
          <Link to="/products" className={linkClass}>Products</Link>
          <Link to="/categories" className={linkClass}>Categories</Link>
          <Link to="/about" className={linkClass}>About</Link>
        </div>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className={`relative p-2 transition-colors duration-300 ${isScrolled || !isHome ? 'text-slate-700 hover:text-cyan-600' : 'text-white hover:text-cyan-200'
            }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </Link>

        {/* CTA Button */}
        <div className="hidden md:block">

          <Link
            to="/contact"
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${isScrolled || !isHome
              ? 'bg-cyan-600 text-white hover:bg-cyan-700'
              : 'bg-white text-cyan-700 hover:bg-cyan-50'
              }`}
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile Menu Button (Placeholder) */}
        <button className="md:hidden text-2xl">
          <span className={isScrolled || !isHome ? 'text-slate-800' : 'text-white'}>☰</span>
        </button>
      </div>
    </nav>
  );
}
