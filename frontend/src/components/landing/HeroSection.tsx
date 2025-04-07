'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: '/hero1.jpg',
    title: 'Impulsa tu Emprendimiento Tecnológico',
    description: 'Conectamos emprendedores con las herramientas y recursos que necesitan para crecer.',
    cta: 'Comienza Ahora',
  },
  {
    image: '/hero2.jpg',
    title: 'Encuentra Productos Innovadores',
    description: 'Descubre soluciones tecnológicas de emprendedores locales.',
    cta: 'Explorar Productos',
  },
  {
    image: '/hero3.jpg',
    title: 'Únete a Nuestra Comunidad',
    description: 'Forma parte de una red de emprendedores y clientes apasionados por la tecnología.',
    cta: 'Únete Gratis',
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full h-[700px] bg-[#2E4057]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        navigation
        pagination={{ 
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-white/50 hover:bg-white transition-all duration-300"></span>`;
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2E4057]/90 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl font-opensans text-white/90 mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                    <Button
                      size="lg"
                      className="bg-[#F18F01] hover:bg-[#F18F01]/90 text-white font-semibold py-6 px-8 text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                    >
                      {slide.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F4F4F8] to-transparent z-10" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#048BA8]/20 to-transparent z-10" />
    </section>
  );
} 