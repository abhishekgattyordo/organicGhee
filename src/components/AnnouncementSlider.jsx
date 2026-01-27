// components/AnnouncementSlider.jsx
import React, { useState, useEffect } from 'react';

const AnnouncementSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      message: "Pure Desi Ghee & Oils At 15% OFF | Use Code: PURE15",
      link: "/collections/all-products",
      label: "1 of 3"
    },
    {
      id: 2,
      message: "Free Shipping on Orders Above ₹999 | Shop Now",
      link: "/collections/free-shipping",
      label: "2 of 3"
    },
    {
      id: 3,
      message: "New Arrivals! Organic Jaggery & Spices Available",
      link: "/collections/new-arrivals",
      label: "3 of 3"
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative bg-gradient-to-r from-green-900 to-emerald-800 text-white overflow-hidden">
      {/* Slides container */}
      <div className="relative h-10 md:h-12">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slideshow__slide slider__slide absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-full'
            }`}
            id={`Slide-sections-${slide.id}`}
            role="group"
            aria-roledescription="Announcement"
            aria-label={slide.label}
            aria-hidden={index !== currentSlide}
          >
            <div className="announcement-bar__announcement h-full" role="region" aria-label="Announcement">
              <a 
                href={slide.link}
                className="announcement-bar__link link link--text focus-inset animate-arrow h-full flex items-center justify-center px-4 hover:opacity-90 transition-opacity"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <p className="announcement-bar__message h5 text-sm md:text-base font-medium flex items-center gap-2">
                  <span>{slide.message}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    className="icon icon-arrow w-3 h-3 md:w-4 md:h-4"
                    viewBox="0 0 14 10"
                  >
                    <path 
                      fill="currentColor" 
                      fillRule="evenodd" 
                      d="M8.537.808a.5.5 0 0 1 .817-.162l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 1 1-.708-.708L11.793 5.5H1a.5.5 0 0 1 0-1h10.793L8.646 1.354a.5.5 0 0 1-.109-.546" 
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Slide indicators (dots) */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1 md:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-1"
        aria-label="Previous slide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNextSlide}
        className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-1"
        aria-label="Next slide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default AnnouncementSlider;