'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { StaticImageData } from 'next/image';
import logo from '../../public/images/logo/Mie-Logo.png';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface GalleryImage {
  src: StaticImageData;
  alt: string;
  className?: string;
}

interface HeroCarouselProps {
  images: GalleryImage[];
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative h-[700px]">
      {/* Logo in bottom right corner */}
      <div className="absolute bottom-8 right-8 z-10 w-30 h-30">
        <Image
          src={logo}
          alt="Mie Gourmet Logo"
          width={150}
          height={150}
          className="drop-shadow-lg"
        />
      </div>

      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/50 to-black/80"></div>
      <div className="absolute inset-0 flex flex-col justify-center px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl mb-4 tracking-widest uppercase text-white font-['Quicksand'] font-medium" style={{ letterSpacing: '0.1em', fontWeight: 550 }}>
          Orginal Cakes
        </h1>
        <p className="text-lg text-white max-w-2xl font-['Quicksand'] font-medium" style={{ letterSpacing: '0.1em', fontWeight: 500 }}>
          &ldquo;Sweets that taste like home~&rdquo;
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-orange-100/90 text-gray-800 hover:bg-orange-200/90 transition-colors"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-orange-100/90 text-gray-800 hover:bg-orange-200/90 transition-colors"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
    </div>
  );
} 