'use client';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F8] mt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2E4057] to-[#048BA8] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            Términos y Condiciones
          </h1>
          <p className="font-opensans text-lg text-white/90 max-w-2xl">
            Información importante sobre el uso de EmpreTech y tus derechos como usuario.
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
                Al acceder y utilizar la plataforma EmpreTech, aceptas estos términos y condiciones en su totalidad. 
                Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices nuestra plataforma.
              </p>
            </div>
          </section>

          {/* Definiciones */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              2. Definiciones
            </h2>
            <div className="space-y-4 text-[#2E4057]/80 font-opensans">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#048BA8]/10 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-[#2E4057]">Plataforma</p>
                  <p>Se refiere a EmpreTech, incluyendo todos sus servicios y funcionalidades.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#048BA8]/10 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-[#2E4057]">Usuario</p>
                  <p>Cualquier persona que acceda o utilice la plataforma EmpreTech.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#048BA8]/10 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-[#2E4057]">Emprendedor</p>
                  <p>Usuario que ofrece productos o servicios a través de la plataforma.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Registro y Cuentas */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              3. Registro y Cuentas
            </h2>
            <div className="space-y-4 text-[#2E4057]/80 font-opensans">
              <p>Para utilizar nuestros servicios, debes:</p>
              <ul className="list-none space-y-3">
                {[
                  'Tener al menos 18 años de edad',
                  'Proporcionar información precisa y completa durante el registro',
                  'Mantener la confidencialidad de tu cuenta y contraseña',
                  'Notificar inmediatamente cualquier uso no autorizado de tu cuenta'
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

          {/* Servicios */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              4. Servicios
            </h2>
            <div className="prose prose-lg max-w-none text-[#2E4057]/80 font-opensans">
              <p>
                EmpreTech proporciona una plataforma para conectar emprendedores tecnológicos con potenciales clientes. 
                Nos reservamos el derecho de:
              </p>
              <ul className="list-none space-y-3 mt-4">
                {[
                  'Modificar o descontinuar cualquier aspecto del servicio',
                  'Restringir el acceso a ciertas funcionalidades',
                  'Eliminar contenido que viole nuestras políticas',
                  'Actualizar precios y características de los planes'
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

          {/* Propiedad Intelectual */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              5. Propiedad Intelectual
            </h2>
            <div className="prose prose-lg max-w-none text-[#2E4057]/80 font-opensans">
              <p>
                Todo el contenido presente en EmpreTech, incluyendo pero no limitado a textos, gráficos, logos, 
                iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de 
                EmpreTech o sus proveedores de contenido y está protegido por las leyes internacionales de 
                propiedad intelectual.
              </p>
            </div>
          </section>

          {/* Privacidad */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              6. Privacidad y Protección de Datos
            </h2>
            <div className="prose prose-lg max-w-none text-[#2E4057]/80 font-opensans">
              <p>
                Tu privacidad es importante para nosotros. Consulta nuestra Política de Privacidad para entender 
                cómo recolectamos, usamos y protegemos tu información personal.
              </p>
            </div>
          </section>

          {/* Limitación de Responsabilidad */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              7. Limitación de Responsabilidad
            </h2>
            <div className="prose prose-lg max-w-none text-[#2E4057]/80 font-opensans">
              <p>
                EmpreTech no será responsable por daños indirectos, incidentales, especiales, consecuentes o 
                punitivos, o cualquier pérdida de beneficios o ingresos, ya sea incurrida directa o indirectamente, 
                o cualquier pérdida de datos, uso, buena voluntad u otras pérdidas intangibles.
              </p>
            </div>
          </section>

          {/* Modificaciones */}
          <section>
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              8. Modificaciones a los Términos
            </h2>
            <div className="prose prose-lg max-w-none text-[#2E4057]/80 font-opensans">
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán 
                en vigor inmediatamente después de su publicación en la plataforma. El uso continuado de nuestros 
                servicios después de cualquier cambio constituye tu aceptación de los nuevos términos.
              </p>
            </div>
          </section>

          {/* Contacto */}
          <section className="bg-[#F4F4F8] rounded-lg p-6">
            <h2 className="font-montserrat text-2xl font-bold text-[#2E4057] mb-4">
              9. Contacto
            </h2>
            <div className="prose prose-lg max-w-none text-[#2E4057]/80 font-opensans">
              <p>
                Si tienes alguna pregunta sobre estos términos y condiciones, por favor contáctanos a través de:
              </p>
              <ul className="list-none space-y-2 mt-4">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>soporte@empretech.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+57 (1) 123-4567</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 