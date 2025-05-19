'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade, EffectCreative } from 'swiper/modules';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-creative';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
    overlayGradient: 'bg-gradient-to-r from-[#2E4057]/90 via-[#2E4057]/70 to-transparent',
    title: 'Impulsa tu Emprendimiento Tecnológico',
    subtitle: 'Plataforma integral para startups',
    description: 'Conectamos emprendedores con las herramientas, recursos y clientes que necesitan para transformar ideas en negocios exitosos.',
    cta: 'Comienza Ahora',
    ctaLink: '/auth/register',
    secondaryCta: 'Conoce más',
    secondaryCtaLink: '/sobre-nosotros',
    decoration: '✦ Potenciando la innovación ✦'
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    overlayGradient: 'bg-gradient-to-r from-[#048BA8]/90 via-[#048BA8]/70 to-transparent',
    title: 'Encuentra Productos Innovadores',
    subtitle: 'Tecnología que transforma',
    description: 'Descubre soluciones tecnológicas creadas por talentosos emprendedores colombianos que están reinventando el futuro.',
    cta: 'Explorar Productos',
    ctaLink: '/productos',
    secondaryCta: 'Ver categorías',
    secondaryCtaLink: '/productos?view=categories',
    decoration: '✦ Innovación nacional ✦'
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    overlayGradient: 'bg-gradient-to-r from-[#F18F01]/90 via-[#F18F01]/70 to-transparent',
    title: 'Únete a Nuestra Comunidad',
    subtitle: 'Red de emprendedores tech',
    description: 'Forma parte de una comunidad vibrante de innovadores, mentores e inversionistas apasionados por la tecnología y el emprendimiento.',
    cta: 'Únete Gratis',
    ctaLink: '/auth/register',
    secondaryCta: 'Ver historias',
    secondaryCtaLink: '/sobre-nosotros#historias',
    decoration: '✦ Creciendo juntos ✦'
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] max-h-[800px] min-h-[600px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectCreative]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-3 !h-3 !bg-white/30 hover:!bg-white !opacity-100 !transition-all !duration-300"></span>`;
          },
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: [0, 0, -400],
            opacity: 0,
          },
          next: {
            translate: ['100%', 0, 0],
            opacity: 0,
          },
        }}
        speed={1000}
        loop
        className="w-full h-full hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full overflow-hidden">
              {/* Imagen de fondo */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  unoptimized
                />
                <div className={`absolute inset-0 ${slide.overlayGradient}`} />
              </div>
              
              {/* Contenido */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 md:px-8">
                  <div className="max-w-2xl relative z-10">
                    {/* Badge decorativo */}
                    <div className="mb-6 inline-block">
                      <span className="bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-white/90 text-sm font-medium tracking-wide">
                        {slide.decoration}
                      </span>
                    </div>
                    
                    <h2 className="text-white/90 font-medium text-xl mb-2">
                      {slide.subtitle}
                    </h2>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6 leading-tight relative">
                      {slide.title}
                      <div className="h-1.5 w-24 bg-white/80 mt-5 rounded-full"></div>
                    </h1>
                    
                    <p className="text-lg sm:text-xl font-opensans text-white/90 mb-8 leading-relaxed max-w-xl">
                      {slide.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={slide.ctaLink}>
                        <Button
                          size="lg"
                          className="bg-white text-[#2E4057] hover:bg-white/90 font-semibold py-6 px-8 text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                        >
                          {slide.cta}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      
                      <Link href={slide.secondaryCtaLink}>
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-white text-white hover:bg-white/10 font-semibold py-6 px-8 text-lg transition-all duration-300"
                        >
                          {slide.secondaryCta}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F4F4F8]/20 to-transparent" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/4" />
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom navigation buttons */}
        <div className="swiper-button-prev !text-white !opacity-70 hover:!opacity-100 transition-opacity !w-12 !h-12 !bg-black/20 rounded-full !backdrop-blur-sm hidden md:flex left-5"></div>
        <div className="swiper-button-next !text-white !opacity-70 hover:!opacity-100 transition-opacity !w-12 !h-12 !bg-black/20 rounded-full !backdrop-blur-sm hidden md:flex right-5"></div>
      </Swiper>
      
      {/* Elemento decorativo de borde inferior */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" className="w-full h-auto fill-[#F4F4F8]">
          <path d="M0,48L80,40C160,32,320,16,480,16C640,16,800,32,960,37.3C1120,43,1280,37,1360,34.7L1440,32L1440,48L1360,48C1280,48,1120,48,960,48C800,48,640,48,480,48C320,48,160,48,80,48L0,48Z" />
        </svg>
      </div>
    </section>
  );
} 