'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const plans = [
  {
    name: 'Plan Básico',
    price: 'Gratis',
    description: 'Ideal para emprendedores que están comenzando',
    features: [
      'Perfil básico de emprendimiento',
      'Listado de productos (hasta 5)',
      'Estadísticas básicas',
      'Soporte por correo',
    ],
    icon: (
      <svg className="w-12 h-12 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    name: 'Plan Profesional',
    price: '$49.900/mes',
    description: 'Para emprendimientos en crecimiento',
    features: [
      'Todo lo del plan básico',
      'Productos ilimitados',
      'Estadísticas avanzadas',
      'Soporte prioritario',
      'Herramientas de marketing',
    ],
    highlighted: true,
    icon: (
      <svg className="w-12 h-12 text-[#F18F01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'Plan Empresarial',
    price: '$99.900/mes',
    description: 'Solución completa para empresas establecidas',
    features: [
      'Todo lo del plan profesional',
      'API personalizada',
      'Gestor de cuenta dedicado',
      'Personalización avanzada',
      'Integración con sistemas propios',
    ],
    icon: (
      <svg className="w-12 h-12 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export const PlansSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#F4F4F8] to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute -left-32 top-1/4 w-64 h-64 bg-[#048BA8]/10 rounded-full blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 w-64 h-64 bg-[#F18F01]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#2E4057] mb-6">
            Planes que se Adaptan a tu Crecimiento
          </h2>
          <p className="font-opensans text-xl text-[#2E4057]/80 max-w-2xl mx-auto">
            Elige el plan que mejor se ajuste a las necesidades de tu emprendimiento y comienza a crecer con nosotros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.highlighted 
                  ? 'border-2 border-[#F18F01] md:scale-105 bg-gradient-to-br from-white to-[#F18F01]/5' 
                  : 'border border-[#E1E1E8] hover:border-[#048BA8] bg-white'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-4 right-4">
                  <span className="bg-[#F18F01] text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Más Popular
                  </span>
                </div>
              )}
              <CardHeader className="p-6 text-center">
                <div className="mx-auto mb-4">{plan.icon}</div>
                <CardTitle className={`text-2xl font-bold mb-2 ${
                  plan.highlighted ? 'text-[#F18F01]' : 'text-[#048BA8]'
                }`}>
                  {plan.name}
                </CardTitle>
                <div className="mt-2 mb-4">
                  <span className="font-montserrat text-4xl font-bold text-[#2E4057]">
                    {plan.price}
                  </span>
                  {plan.price !== 'Gratis' && (
                    <span className="font-opensans text-[#2E4057]/60 ml-1">
                      COP
                    </span>
                  )}
                </div>
                <CardDescription className="text-[#2E4057]/80">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className={`w-5 h-5 mr-3 flex-shrink-0 ${
                          plan.highlighted ? 'text-[#F18F01]' : 'text-[#99C24D]'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-opensans text-[#2E4057]/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  fullWidth
                  className={`transform transition-all duration-300 hover:scale-105 ${
                    plan.highlighted 
                      ? 'bg-[#F18F01] text-white hover:bg-[#F18F01]/90 shadow-lg hover:shadow-xl' 
                      : 'bg-white border-2 border-[#048BA8] text-[#048BA8] hover:bg-[#048BA8]/10'
                  }`}
                >
                  Comenzar ahora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 