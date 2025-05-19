'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const contactSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  asunto: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  mensaje: z.string().min(20, 'El mensaje debe tener al menos 20 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: Implementar llamada a API
      console.log('Datos del formulario:', data);
      // Mostrar alerta de éxito
    } catch (error) {
      // Mostrar alerta de error
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2E4057] to-[#048BA8] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            Contáctanos
          </h1>
          <p className="font-opensans text-lg text-white/90 max-w-2xl">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de contacto */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-8">
              <svg className="w-6 h-6 text-[#048BA8] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h2 className="font-montserrat text-2xl font-semibold text-[#2E4057]">
                Envíanos un mensaje
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="group">
                <label htmlFor="nombre" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium group-hover:text-[#048BA8] transition-colors duration-300">
                  Nombre completo
                </label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  {...register('nombre')}
                  error={errors.nombre?.message}
                  className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057] rounded-lg"
                />
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium group-hover:text-[#048BA8] transition-colors duration-300">
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  {...register('email')}
                  error={errors.email?.message}
                  className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057] rounded-lg"
                />
              </div>

              <div className="group">
                <label htmlFor="asunto" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium group-hover:text-[#048BA8] transition-colors duration-300">
                  Asunto
                </label>
                <Input
                  id="asunto"
                  type="text"
                  placeholder="¿Sobre qué nos quieres contactar?"
                  {...register('asunto')}
                  error={errors.asunto?.message}
                  className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057] rounded-lg"
                />
              </div>

              <div className="group">
                <label htmlFor="mensaje" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium group-hover:text-[#048BA8] transition-colors duration-300">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  placeholder="Escribe tu mensaje aquí..."
                  {...register('mensaje')}
                  className={`w-full min-h-[120px] p-3 rounded-lg font-opensans resize-y border text-[#2E4057]
                    ${errors.mensaje ? 'border-red-500' : 'border-[#E1E1E8]'}
                    focus:outline-none focus:ring-2 focus:ring-[#048BA8]/20 focus:border-[#048BA8]`}
                />
                {errors.mensaje && (
                  <p className="mt-1 text-sm text-red-500">{errors.mensaje.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                fullWidth 
                disabled={isSubmitting}
                className="bg-[#F18F01] hover:bg-[#F18F01]/90 text-white transition-all duration-300 transform hover:scale-[1.02]"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <svg className="w-6 h-6 text-[#048BA8] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h2 className="font-montserrat text-2xl font-semibold text-[#2E4057]">
                  Información de contacto
                </h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-center p-4 rounded-lg bg-[#F4F4F8] group hover:bg-[#048BA8]/5 transition-colors duration-300">
                  <svg className="w-6 h-6 mr-4 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-opensans text-sm text-[#2E4057]/60">Email</p>
                    <p className="font-opensans text-[#2E4057]">contacto@empretech.co</p>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-lg bg-[#F4F4F8] group hover:bg-[#048BA8]/5 transition-colors duration-300">
                  <svg className="w-6 h-6 mr-4 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-opensans text-sm text-[#2E4057]/60">Teléfono</p>
                    <p className="font-opensans text-[#2E4057]">+57 (606) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-lg bg-[#F4F4F8] group hover:bg-[#048BA8]/5 transition-colors duration-300">
                  <svg className="w-6 h-6 mr-4 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-opensans text-sm text-[#2E4057]/60">Ubicación</p>
                    <p className="font-opensans text-[#2E4057]">Manizales, Colombia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <svg className="w-6 h-6 text-[#048BA8] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <h2 className="font-montserrat text-2xl font-semibold text-[#2E4057]">
                  Redes sociales
                </h2>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="p-3 rounded-lg bg-[#F4F4F8] text-[#048BA8] hover:bg-[#048BA8] hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="p-3 rounded-lg bg-[#F4F4F8] text-[#048BA8] hover:bg-[#048BA8] hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="p-3 rounded-lg bg-[#F4F4F8] text-[#048BA8] hover:bg-[#048BA8] hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 18.6h-2.91v-4.575c0-1.086-.018-2.482-1.512-2.482-1.515 0-1.747 1.182-1.747 2.403v4.654H7.939V8.997h2.79v1.282h.04c.39-.736 1.338-1.512 2.754-1.512 2.945 0 3.49 1.938 3.49 4.458v5.375z"/>
                  </svg>
                </a>
                <a href="#" className="p-3 rounded-lg bg-[#F4F4F8] text-[#048BA8] hover:bg-[#048BA8] hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <svg className="w-6 h-6 text-[#048BA8] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="font-montserrat text-2xl font-semibold text-[#2E4057]">
                  Horario de atención
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 rounded-lg bg-[#F4F4F8] group hover:bg-[#048BA8]/5 transition-colors duration-300">
                  <svg className="w-5 h-5 mr-3 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-opensans text-sm text-[#2E4057]/60">Lunes a Viernes</p>
                    <p className="font-opensans text-[#2E4057]">8:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-lg bg-[#F4F4F8] group hover:bg-[#048BA8]/5 transition-colors duration-300">
                  <svg className="w-5 h-5 mr-3 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-opensans text-sm text-[#2E4057]/60">Sábados</p>
                    <p className="font-opensans text-[#2E4057]">9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 