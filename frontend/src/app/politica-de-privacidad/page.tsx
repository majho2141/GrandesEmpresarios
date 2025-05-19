'use client';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2E4057] to-[#048BA8] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            Política de Privacidad
          </h1>
          <p className="font-opensans text-lg text-white/90 max-w-2xl">
            Conoce cómo recopilamos, usamos y protegemos tu información personal en EmpreTech.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-8 md:p-12 space-y-8">
          {/* Introducción */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              1. Introducción
            </h2>
            <div className="prose prose-lg max-w-none text-[#2E4057]/80 font-opensans">
              <p>
                En EmpreTech, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política describe 
                nuestras prácticas de recopilación y uso de datos, así como tus derechos sobre tu información personal.
              </p>
            </div>
          </section>

          {/* Información que Recopilamos */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              2. Información que Recopilamos
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Información de Registro',
                  description: 'Nombre, apellido, correo electrónico, número de teléfono y documento de identidad.',
                  icon: (
                    <svg className="w-6 h-6 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )
                },
                {
                  title: 'Información del Emprendimiento',
                  description: 'Nombre del emprendimiento, descripción, categoría y detalles de contacto comercial.',
                  icon: (
                    <svg className="w-6 h-6 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )
                },
                {
                  title: 'Información de Uso',
                  description: 'Datos sobre cómo interactúas con nuestra plataforma, incluyendo registros de acceso e interacciones.',
                  icon: (
                    <svg className="w-6 h-6 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  )
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-[#F4F4F8] rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-[#2E4057] text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="font-opensans text-[#2E4057]/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Uso de la Información */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              3. Uso de la Información
            </h2>
            <div className="space-y-4 text-[#2E4057]/80 font-opensans">
              <p>Utilizamos tu información para:</p>
              <ul className="list-none space-y-3">
                {[
                  'Proporcionar y mejorar nuestros servicios',
                  'Personalizar tu experiencia en la plataforma',
                  'Procesar tus transacciones',
                  'Enviarte comunicaciones importantes sobre el servicio',
                  'Prevenir actividades fraudulentas'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#99C24D] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Compartir Información */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              4. Compartir Información
            </h2>
            <div className="space-y-4 text-[#2E4057]/80 font-opensans">
              <p>No compartimos tu información personal con terceros, excepto en las siguientes situaciones:</p>
              <ul className="list-none space-y-3">
                {[
                  'Con tu consentimiento explícito',
                  'Para cumplir con obligaciones legales',
                  'Para proteger nuestros derechos o propiedad',
                  'En caso de una fusión o adquisición empresarial'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#F18F01] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Seguridad */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              5. Seguridad de la Información
            </h2>
            <div className="bg-[#048BA8]/5 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3 text-[#048BA8] font-semibold">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Medidas de Seguridad Implementadas</span>
              </div>
              <ul className="list-none space-y-3 text-[#2E4057]/80 font-opensans">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#048BA8] rounded-full"></span>
                  <span>Encriptación SSL/TLS para todas las transmisiones de datos</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#048BA8] rounded-full"></span>
                  <span>Monitoreo continuo de seguridad</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#048BA8] rounded-full"></span>
                  <span>Acceso restringido a datos personales</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Derechos del Usuario */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              6. Tus Derechos
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Acceso',
                  description: 'Puedes solicitar una copia de tu información personal.'
                },
                {
                  title: 'Rectificación',
                  description: 'Puedes actualizar o corregir tu información personal.'
                },
                {
                  title: 'Eliminación',
                  description: 'Puedes solicitar la eliminación de tu información.'
                },
                {
                  title: 'Restricción',
                  description: 'Puedes limitar el procesamiento de tu información.'
                }
              ].map((right, index) => (
                <div key={index} className="p-4 border border-[#E1E1E8] rounded-lg hover:border-[#048BA8] transition-colors duration-300">
                  <h3 className="font-montserrat font-semibold text-[#2E4057] mb-2">
                    {right.title}
                  </h3>
                  <p className="font-opensans text-[#2E4057]/80 text-sm">
                    {right.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contacto */}
          <section className="bg-[#F4F4F8] rounded-lg p-6">
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              7. Contacto para Privacidad
            </h2>
            <div className="prose prose-lg max-w-none text-[#2E4057]/80 font-opensans">
              <p>
                Para ejercer tus derechos o realizar consultas sobre privacidad, contáctanos en:
              </p>
              <ul className="list-none space-y-2 mt-4">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>privacidad@empretech.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+57 (1) 123-4567 ext. 2</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 