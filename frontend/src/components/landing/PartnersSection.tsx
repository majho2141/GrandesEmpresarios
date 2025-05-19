'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';

const partners = [
  {
    name: 'TechCorp',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png',
    testimonial: 'EmpreTech ha sido fundamental en nuestro crecimiento digital. Su plataforma nos permitió llegar a nuevos clientes y expandir nuestro negocio.',
    author: 'María González',
    role: 'CEO',
    bgColor: 'bg-gradient-to-br from-[#048BA8]/5 to-[#048BA8]/10',
    icon: (
      <svg className="w-8 h-8 text-[#048BA8]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm-5-2v2H9V4h6zM4 8h16v4h-3v-2h-2v2H9v-2H7v2H4V8zm0 11v-5h3v2h2v-2h6v2h2v-2h3v5H4z"/>
      </svg>
    )
  },
  {
    name: 'InnovaSoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png',
    testimonial: 'La facilidad de uso y el soporte excepcional hacen de EmpreTech la mejor plataforma para emprendedores tecnológicos.',
    author: 'Carlos Rodríguez',
    role: 'Fundador',
    bgColor: 'bg-gradient-to-br from-[#F18F01]/5 to-[#F18F01]/10',
    icon: (
      <svg className="w-8 h-8 text-[#F18F01]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2zm0 2.84L19.5 12H18v7h-4v-6H10v6H6v-7H4.5L12 4.84z"/>
      </svg>
    )
  },
  {
    name: 'DigiServ',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/800px-IBM_logo.svg.png',
    testimonial: 'Gracias a EmpreTech, pudimos digitalizar nuestros servicios y aumentar nuestra presencia en el mercado tecnológico.',
    author: 'Ana Martínez',
    role: 'Directora de Innovación',
    bgColor: 'bg-gradient-to-br from-[#048BA8]/5 to-[#048BA8]/10',
    icon: (
      <svg className="w-8 h-8 text-[#048BA8]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.54 1.47c.56-1.24.88-2.62.88-4.01 0-5.18-3.95-9.45-8.92-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05C5.94 2.55 2 6.81 2 12c0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
      </svg>
    )
  }
];

// Logos adicionales de empresas reconocidas
const additionalLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png',
  'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/480px-Facebook_logo_%28square%29.png'
];

export const PartnersSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -left-64 top-0 w-96 h-96 bg-[#048BA8]/5 rounded-full blur-3xl" />
      <div className="absolute -right-64 bottom-0 w-96 h-96 bg-[#F18F01]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#2E4057] mb-6">
            Empresas que Confían en Nosotros
          </h2>
          <p className="font-opensans text-xl text-[#2E4057]/80 max-w-2xl mx-auto">
            Conoce las historias de éxito de empresas que han crecido con EmpreTech
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <Card 
              key={index} 
              className={`group overflow-hidden transition-all duration-500 hover:shadow-xl border-none ${partner.bgColor}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="relative w-32 h-16">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  {partner.icon}
                </div>
                
                <blockquote className="relative">
                  <div className="absolute -top-4 -left-2 text-6xl text-[#048BA8]/20 font-serif">"</div>
                  <div className="relative">
                    <p className="text-[#2E4057]/90 font-opensans text-lg leading-relaxed mb-6 pl-4">
                      {partner.testimonial}
                    </p>
                    <footer className="pl-4">
                      <div className="font-montserrat text-[#2E4057] font-semibold text-lg">
                        {partner.author}
                      </div>
                      <div className="font-opensans text-[#048BA8] font-medium">
                        {partner.role}
                      </div>
                    </footer>
                  </div>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Logos Section */}
        <div className="mt-24 text-center">
          <h3 className="font-montserrat text-2xl font-semibold text-[#2E4057] mb-12">
            Más Empresas que Usan EmpreTech
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
            {additionalLogos.map((logo, index) => (
              <div key={index} className="relative h-12 grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 