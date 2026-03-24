import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: "/Assets/Images/Hero2.jpg",
    title: "PureLine Purity",
    subtitle: "Experience the cleanest water for your home and family."
  },
  {
    id: 2,
    image: "/Assets/Images/Hero3.png",
    title: "Advanced RO Technology",
    subtitle: "State-of-the-art filtration for crystal clear hydration."
  },
  {
    id: 3,
    image: "/Assets/Images/Hero4.png",
    title: "Eco-Friendly Solutions",
    subtitle: "Sustainable water systems that protect our planet."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-slate-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-light">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link
                  to="/products"
                  className="btn-primary border-none text-lg inline-block text-center"
                >
                  Explore Products
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-3 rounded-full bg-transparent border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 inline-block text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-cyan-400 w-8'
                : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}