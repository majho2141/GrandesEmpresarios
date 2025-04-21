'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    gradient: 'from-[#2E4057] via-[#048BA8] to-[#99C24D]',
    pattern: 'radial-gradient(circle at 20% 150%, rgba(4, 139, 168, 0.15) 30%, transparent 31%), radial-gradient(circle at 80% -50%, rgba(153, 194, 77, 0.1) 40%, transparent 41%)',
    title: 'Impulsa tu Emprendimiento Tecnológico',
    description: 'Conectamos emprendedores con las herramientas y recursos que necesitan para crecer.',
    cta: 'Comienza Ahora',
    ctaLink: '/auth/register',
  },
  {
    gradient: 'from-[#048BA8] via-[#2E4057] to-[#F18F01]',
    pattern: 'radial-gradient(circle at 80% 150%, rgba(241, 143, 1, 0.15) 30%, transparent 31%), radial-gradient(circle at 20% -50%, rgba(4, 139, 168, 0.1) 40%, transparent 41%)',
    title: 'Encuentra Productos Innovadores',
    description: 'Descubre soluciones tecnológicas de emprendedores colombianos.',
    cta: 'Explorar Productos',
    ctaLink: '/productos',
  },
  {
    gradient: 'from-[#F18F01] via-[#048BA8] to-[#2E4057]',
    pattern: 'radial-gradient(circle at 30% 150%, rgba(46, 64, 87, 0.15) 30%, transparent 31%), radial-gradient(circle at 70% -50%, rgba(241, 143, 1, 0.1) 40%, transparent 41%)',
    title: 'Únete a Nuestra Comunidad',
    description: 'Forma parte de una red de emprendedores y clientes apasionados por la tecnología.',
    cta: 'Únete Gratis',
    ctaLink: '/auth/register',
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full h-[700px]">
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
            <div className="relative w-full h-full overflow-hidden">
              {/* Fondo con gradiente y patrón */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-500`}>
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{ background: slide.pattern }}
                />
              </div>
              
              {/* Contenido */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl relative">
                    {/* Decorative elements */}
                    <div className="absolute -left-6 -top-6 w-20 h-20 rounded-full bg-white/5 blur-xl" />
                    <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-white/5 blur-xl" />
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6 leading-tight relative">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl font-opensans text-white/90 mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                    <Link href={slide.ctaLink}>
                      <Button
                        size="lg"
                        className="bg-white text-[#2E4057] hover:bg-white/90 font-semibold py-6 px-8 text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                      >
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Overlay decorativo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F4F4F8] to-transparent z-10" />
    </section>
  );
} 