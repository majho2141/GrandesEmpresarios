import React from 'react';
import Link from 'next/link';

export default function MarketingPromocionesEmprendedor() {
  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Encabezado de página */}
      <div className="bg-[#2E4057] text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Marketing y Promociones</h1>
          <div className="flex items-center mt-2">
            <Link href="/emprendedor/dashboard" className="text-[#F4F4F8] hover:text-[#F18F01]">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <span>Marketing</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto py-8 px-4">
        {/* Acciones principales */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl font-bold text-[#2E4057]">Tus Campañas de Marketing</h2>
          </div>
          <Link 
            href="/emprendedor/marketing/nuevo" 
            className="bg-[#F18F01] hover:bg-[#e07c01] text-white px-4 py-2 rounded-lg flex items-center justify-center md:justify-start gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nueva Campaña
          </Link>
        </div>

        {/* Tarjetas de campañas activas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#2E4057]">Campañas Activas</h3>
              <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold text-[#2E4057]">2</p>
                <p className="text-sm text-gray-500">Presupuesto total: $2,500</p>
              </div>
              <Link href="/emprendedor/marketing/activas" className="text-[#048BA8] hover:text-[#037897] text-sm">
                Ver detalles
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#2E4057]">Campañas Finalizadas</h3>
              <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold text-[#2E4057]">6</p>
                <p className="text-sm text-gray-500">Presupuesto total: $7,800</p>
              </div>
              <Link href="/emprendedor/marketing/finalizadas" className="text-[#048BA8] hover:text-[#037897] text-sm">
                Ver historial
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#2E4057]">Rendimiento Global</h3>
              <div className="h-10 w-10 rounded-full bg-[#048BA8] bg-opacity-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold text-[#2E4057]">+32%</p>
                <p className="text-sm text-gray-500">ROI promedio: 3.2x</p>
              </div>
              <Link href="/emprendedor/marketing/metricas" className="text-[#048BA8] hover:text-[#037897] text-sm">
                Ver métricas
              </Link>
            </div>
          </div>
        </div>

        {/* Campañas activas */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-[#2E4057]">Campañas Activas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaña</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inicio / Fin</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-[#048BA8] bg-opacity-10 rounded-md flex-shrink-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Verano 2023</div>
                        <div className="text-sm text-gray-500">Descuentos para productos de temporada</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Descuento</div>
                    <div className="text-sm text-gray-500">20% en todos los productos</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">15 Jun 2023</div>
                    <div className="text-sm text-gray-500">30 Ago 2023</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$1,500</div>
                    <div className="text-sm text-gray-500">Usado: $900 (60%)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Activa
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href="/emprendedor/marketing/1" className="text-[#048BA8] hover:text-[#037897] mr-3">Editar</Link>
                    <button className="text-red-600 hover:text-red-900">Pausar</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-indigo-100 rounded-md flex-shrink-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Newsletter Mensual</div>
                        <div className="text-sm text-gray-500">Envío de novedades y ofertas</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Email Marketing</div>
                    <div className="text-sm text-gray-500">Envío a 2,500 suscriptores</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">01 Jun 2023</div>
                    <div className="text-sm text-gray-500">Recurrente (mensual)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$1,000</div>
                    <div className="text-sm text-gray-500">Usado: $250 (25%)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Activa
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href="/emprendedor/marketing/2" className="text-[#048BA8] hover:text-[#037897] mr-3">Editar</Link>
                    <button className="text-red-600 hover:text-red-900">Pausar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección de Descuentos y Cupones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Descuentos activos */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#2E4057]">Descuentos Activos</h2>
              <Link href="/emprendedor/marketing/descuentos/nuevo" className="text-[#048BA8]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 h-12 w-12 bg-[#F18F01] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#F18F01] font-bold text-lg">20%</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Verano 2023</h3>
                  <p className="text-xs text-gray-500">20% de descuento en productos seleccionados</p>
                  <div className="mt-1 text-xs text-gray-500">Vence: 30 Ago 2023</div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 h-12 w-12 bg-[#048BA8] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#048BA8] font-bold text-lg">50%</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Segunda Unidad</h3>
                  <p className="text-xs text-gray-500">50% en la segunda unidad de accesorios</p>
                  <div className="mt-1 text-xs text-gray-500">Vence: 15 Jul 2023</div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold text-lg">15%</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">Club de Clientes</h3>
                  <p className="text-xs text-gray-500">15% para miembros del club</p>
                  <div className="mt-1 text-xs text-gray-500">Permanente</div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Cupones */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#2E4057]">Cupones de Descuento</h2>
              <Link href="/emprendedor/marketing/cupones/nuevo" className="text-[#048BA8]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 h-12 w-12 bg-[#F18F01] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F18F01]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-900">BIENVENIDO10</h3>
                    <span className="text-xs font-semibold text-[#F18F01]">10% OFF</span>
                  </div>
                  <p className="text-xs text-gray-500">Para clientes nuevos</p>
                  <div className="mt-1 text-xs text-gray-500">Usos: 67 / Ilimitado</div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 h-12 w-12 bg-[#048BA8] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-900">ENVIO-GRATIS</h3>
                    <span className="text-xs font-semibold text-[#048BA8]">Envío $0</span>
                  </div>
                  <p className="text-xs text-gray-500">Compras mayores a $100</p>
                  <div className="mt-1 text-xs text-gray-500">Usos: 54 / 100</div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-900">VERANO-2023</h3>
                    <span className="text-xs font-semibold text-indigo-600">25% OFF</span>
                  </div>
                  <p className="text-xs text-gray-500">Válido para toda la tienda</p>
                  <div className="mt-1 text-xs text-gray-500">Usos: 128 / 500</div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de ayuda */}
        <div className="bg-gradient-to-r from-[#048BA8] to-[#2E4057] text-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-2">¿Necesitas ayuda con tu estrategia de marketing?</h2>
              <p className="mb-4">Contamos con herramientas y servicios para ayudarte a impulsar tus ventas y aumentar la visibilidad de tu tienda.</p>
              <div className="space-x-4">
                <button className="bg-white text-[#048BA8] px-4 py-2 rounded-lg font-medium">Contactar a un experto</button>
                <button className="border border-white text-white px-4 py-2 rounded-lg font-medium">Ver recursos</button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 