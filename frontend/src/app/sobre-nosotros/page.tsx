import Image from 'next/image';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Header mejorado */}
      <PageHeader 
        title="Sobre EmpreTech"
        description="Impulsando el crecimiento de emprendedores tecnológicos en Colombia a través de una plataforma integral de comercio y colaboración."
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
        overlayColor="from-[#2E4057]/95 to-[#048BA8]/90"
        breadcrumbs={[
          { label: 'Inicio', link: '/' },
          { label: 'Sobre Nosotros' }
        ]}
        size="large"
        actions={
          <Link href="/contacto">
            <Button className="bg-white text-[#2E4057] hover:bg-white/90 px-6 py-2.5">
              Contactar con nuestro equipo
            </Button>
          </Link>
        }
      />

      <div className="container mx-auto px-4 py-12">
        {/* Nuestra Misión */}
        <section className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              alt="Nuestra Misión"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              unoptimized
            />
          </div>
          <div>
            <h2 className="font-montserrat text-3xl font-bold text-[#2E4057] mb-6">
              Nuestra Misión
            </h2>
            <p className="font-opensans text-lg text-[#2E4057]/80 mb-8 leading-relaxed">
              EmpreTech nace con la misión de transformar el panorama del emprendimiento tecnológico en Colombia, 
              creando un ecosistema digital donde los emprendedores pueden mostrar sus productos y servicios, 
              conectar con clientes potenciales y colaborar con otros profesionales del sector.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <span className="flex-shrink-0 w-6 h-6 bg-[#048BA8]/10 rounded-full flex items-center justify-center group-hover:bg-[#048BA8] transition-colors duration-300">
                  <svg className="w-4 h-4 text-[#048BA8] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="font-opensans text-lg text-[#2E4057]/80 group-hover:text-[#2E4057] transition-colors duration-300">
                  Facilitamos la visibilidad de productos y servicios tecnológicos
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <span className="flex-shrink-0 w-6 h-6 bg-[#048BA8]/10 rounded-full flex items-center justify-center group-hover:bg-[#048BA8] transition-colors duration-300">
                  <svg className="w-4 h-4 text-[#048BA8] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="font-opensans text-lg text-[#2E4057]/80 group-hover:text-[#2E4057] transition-colors duration-300">
                  Promovemos la colaboración entre emprendedores
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <span className="flex-shrink-0 w-6 h-6 bg-[#048BA8]/10 rounded-full flex items-center justify-center group-hover:bg-[#048BA8] transition-colors duration-300">
                  <svg className="w-4 h-4 text-[#048BA8] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="font-opensans text-lg text-[#2E4057]/80 group-hover:text-[#2E4057] transition-colors duration-300">
                  Impulsamos la innovación tecnológica en Colombia
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="mb-12">
          <h2 className="font-montserrat text-3xl font-bold text-[#2E4057] text-center mb-8">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-8 hover:shadow-md transition-all duration-300">
              <div className="bg-[#048BA8]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="font-montserrat text-xl font-semibold text-[#2E4057] mb-4 text-center">
                Innovación
              </h3>
              <p className="font-opensans text-[#2E4057]/80 leading-relaxed text-center">
                Fomentamos el desarrollo de soluciones tecnológicas innovadoras que impulsan el progreso digital en Colombia.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-8 hover:shadow-md transition-all duration-300">
              <div className="bg-[#048BA8]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-montserrat text-xl font-semibold text-[#2E4057] mb-4 text-center">
                Colaboración
              </h3>
              <p className="font-opensans text-[#2E4057]/80 leading-relaxed text-center">
                Creemos en el poder de la comunidad y el trabajo en equipo para alcanzar objetivos comunes.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-8 hover:shadow-md transition-all duration-300">
              <div className="bg-[#048BA8]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-montserrat text-xl font-semibold text-[#2E4057] mb-4 text-center">
                Excelencia
              </h3>
              <p className="font-opensans text-[#2E4057]/80 leading-relaxed text-center">
                Promovemos los más altos estándares de calidad en cada proyecto y servicio ofrecido.
              </p>
            </div>
          </div>
        </section>

        {/* Nuestro Impacto */}
        <section className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-8 md:p-12">
          <h2 className="font-montserrat text-3xl font-bold text-[#2E4057] text-center mb-8">
            Nuestro Impacto
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#F4F4F8] rounded-xl p-8 hover:shadow-sm transition-all duration-300">
              <p className="font-montserrat text-4xl font-bold text-[#048BA8] mb-4 text-center">100+</p>
              <p className="font-opensans text-lg text-[#2E4057] font-medium text-center">
                Emprendedores Activos
              </p>
              <p className="font-opensans text-sm text-[#2E4057]/60 mt-2 text-center">
                Creciendo juntos en nuestra plataforma
              </p>
            </div>
            <div className="bg-[#F4F4F8] rounded-xl p-8 hover:shadow-sm transition-all duration-300">
              <p className="font-montserrat text-4xl font-bold text-[#048BA8] mb-4 text-center">500+</p>
              <p className="font-opensans text-lg text-[#2E4057] font-medium text-center">
                Productos Publicados
              </p>
              <p className="font-opensans text-sm text-[#2E4057]/60 mt-2 text-center">
                Soluciones innovadoras en el mercado
              </p>
            </div>
            <div className="bg-[#F4F4F8] rounded-xl p-8 hover:shadow-sm transition-all duration-300">
              <p className="font-montserrat text-4xl font-bold text-[#048BA8] mb-4 text-center">1000+</p>
              <p className="font-opensans text-lg text-[#2E4057] font-medium text-center">
                Conexiones Realizadas
              </p>
              <p className="font-opensans text-sm text-[#2E4057]/60 mt-2 text-center">
                Colaboraciones exitosas entre emprendedores
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 