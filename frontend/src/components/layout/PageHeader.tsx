'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PageHeaderProps {
  title: string;
  description: string;
  backgroundImage?: string;
  overlayColor?: string;
  size?: 'small' | 'medium' | 'large';
  decorationItems?: Array<{
    position: 'left' | 'right' | 'top' | 'bottom';
    color: string;
    size: number;
  }>;
  breadcrumbs?: Array<{
    label: string;
    link?: string;
  }>;
  actions?: React.ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  backgroundImage = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
  overlayColor = 'from-[#2E4057]/95 to-[#048BA8]/95',
  size = 'medium',
  decorationItems = [
    { position: 'left', color: 'bg-[#048BA8]/10', size: 120 },
    { position: 'right', color: 'bg-[#F18F01]/10', size: 180 },
  ],
  breadcrumbs,
  actions,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollPosition = window.scrollY;
      const opacity = 1 - Math.min(scrollPosition / 300, 0.7);
      const scale = 1 + Math.min(scrollPosition / 2000, 0.05);
      const translateY = Math.min(scrollPosition / 2, 40);
      
      if (ref.current) {
        const bgElement = ref.current.querySelector('.bg-image') as HTMLElement;
        const contentElement = ref.current.querySelector('.content-wrapper') as HTMLElement;
        
        if (bgElement) {
          bgElement.style.transform = `scale(${scale})`;
          bgElement.style.opacity = `${opacity}`;
        }
        
        if (contentElement) {
          contentElement.style.transform = `translateY(${translateY}px)`;
          contentElement.style.opacity = `${opacity}`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getHeightClass = () => {
    switch (size) {
      case 'small': return 'py-12 md:py-16';
      case 'large': return 'py-24 md:py-32';
      default: return 'py-16 md:py-20';
    }
  };
  
  return (
    <header 
      ref={ref}
      className="relative w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-image transition-transform duration-500">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${overlayColor}`} />
      </div>
      
      {/* Decorative elements */}
      {decorationItems.map((item, index) => {
        let positionClass = '';
        
        switch (item.position) {
          case 'left':
            positionClass = 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2';
            break;
          case 'right':
            positionClass = 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2';
            break;
          case 'top':
            positionClass = 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2';
            break;
          case 'bottom':
            positionClass = 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2';
            break;
        }
        
        return (
          <div 
            key={index}
            className={`absolute ${positionClass} rounded-full blur-3xl ${item.color}`}
            style={{ width: item.size * 2, height: item.size * 2 }}
          />
        );
      })}
      
      {/* Content */}
      <div className={`relative container mx-auto px-6 ${getHeightClass()} content-wrapper transition-all duration-500`}>
        {breadcrumbs && (
          <div className="mb-6">
            <nav className="flex space-x-2 items-center text-white/80">
              {breadcrumbs.map((item, index) => (
                <span key={index} className="flex items-center">
                  {index > 0 && (
                    <svg className="w-4 h-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {item.link ? (
                    <a href={item.link} className="text-white/80 hover:text-white font-medium transition-colors text-sm">
                      {item.label}
                    </a>
                  ) : (
                    <span className="font-medium text-white text-sm">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl"
        >
          <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {title}
            <div className="h-1.5 w-24 bg-white/80 mt-5 rounded-full" />
          </h1>
          
          <p className="font-opensans text-lg md:text-xl text-white/90 max-w-2xl">
            {description}
          </p>
          
          {actions && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              {actions}
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" className="w-full h-auto fill-[#F4F4F8]">
          <path d="M0,48L80,40C160,32,320,16,480,16C640,16,800,32,960,37.3C1120,43,1280,37,1360,34.7L1440,32L1440,48L1360,48C1280,48,1120,48,960,48C800,48,640,48,480,48C320,48,160,48,80,48L0,48Z" />
        </svg>
      </div>
    </header>
  );
}; 