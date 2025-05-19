'use client';

import React from 'react';
import Link from 'next/link';
import EmprendedorLayout from '@/components/layout/EmprendedorLayout';

export default function MarketingPromocionesEmprendedor() {
  return (
    <EmprendedorLayout titulo="Marketing y Promociones">
      {/* Acciones principales */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex gap-4 items-center">
          <h2 className="text-xl font-bold text-[#2E4057]">Tus Campañas de Marketing</h2>
        </div>
        <Link 
          href="/emprendedor/marketing#nueva-campana" 
          className="bg-[#F18F01] hover:bg-[#e07c01] text-white px-4 py-2 rounded-lg flex items-center justify-center md:justify-start gap-2 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nueva Campaña
        </Link>
      </div>

      {/* Tarjetas de campañas activas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8] transition-transform hover:scale-105">
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
              <p className="text-sm text-[#2E4057]/60">Presupuesto total: $2,500</p>
            </div>
            <Link href="/emprendedor/marketing#activas" className="text-[#048BA8] hover:text-[#037897] text-sm hover:underline">
              Ver detalles
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8] transition-transform hover:scale-105">
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
              <p className="text-sm text-[#2E4057]/60">Presupuesto total: $7,800</p>
            </div>
            <Link href="/emprendedor/marketing#finalizadas" className="text-[#048BA8] hover:text-[#037897] text-sm hover:underline">
              Ver historial
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8] transition-transform hover:scale-105">
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
              <p className="text-sm text-[#2E4057]/60">ROI promedio: 3.2x</p>
            </div>
            <Link href="/emprendedor/marketing#metricas" className="text-[#048BA8] hover:text-[#037897] text-sm hover:underline">
              Ver métricas
            </Link>
          </div>
        </div>
      </div>

      {/* Campañas activas */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-[#E1E1E8]">
        <div className="p-6 border-b border-[#E1E1E8]">
          <h2 className="text-xl font-bold text-[#2E4057]">Campañas Activas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E1E1E8]">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Campaña</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Tipo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Inicio / Fin</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Presupuesto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E1E1E8]">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-[#048BA8] bg-opacity-10 rounded-md flex-shrink-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-[#2E4057]">Verano 2023</div>
                      <div className="text-sm text-[#2E4057]/60">Descuentos para productos de temporada</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#2E4057]">Descuento</div>
                  <div className="text-sm text-[#2E4057]/60">20% en todos los productos</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#2E4057]/60">15 Jun 2023</div>
                  <div className="text-sm text-[#2E4057]/60">30 Ago 2023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#2E4057]">$1,500</div>
                  <div className="text-sm text-[#2E4057]/60">Usado: $900 (60%)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Activa
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href="/emprendedor/marketing/1" className="text-[#048BA8] hover:text-[#037897] mr-3 hover:underline">Editar</Link>
                  <button className="text-red-600 hover:text-red-900 hover:underline">Pausar</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-indigo-100 rounded-md flex-shrink-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-[#2E4057]">Newsletter Mensual</div>
                      <div className="text-sm text-[#2E4057]/60">Envío de novedades y ofertas</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#2E4057]">Email Marketing</div>
                  <div className="text-sm text-[#2E4057]/60">Envío a 2,500 suscriptores</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#2E4057]/60">01 Jun 2023</div>
                  <div className="text-sm text-[#2E4057]/60">Recurrente (mensual)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#2E4057]">$1,000</div>
                  <div className="text-sm text-[#2E4057]/60">Usado: $250 (25%)</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Activa
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href="/emprendedor/marketing/2" className="text-[#048BA8] hover:text-[#037897] mr-3 hover:underline">Editar</Link>
                  <button className="text-red-600 hover:text-red-900 hover:underline">Pausar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-[#E1E1E8] bg-gray-50">
          <Link href="/emprendedor/marketing#todas" className="text-[#048BA8] hover:text-[#037897] text-sm font-medium hover:underline">
            Ver todas las campañas →
          </Link>
        </div>
      </div>

      {/* Sección de Descuentos y Cupones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Descuentos activos */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#2E4057]">Descuentos Activos</h2>
            <Link 
              href="/emprendedor/marketing#nuevo-descuento" 
              className="h-8 w-8 bg-gray-100 rounded-lg text-[#048BA8] flex items-center justify-center hover:bg-[#048BA8] hover:text-white transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 border border-[#E1E1E8] rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 h-12 w-12 bg-[#F18F01] bg-opacity-40 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">20%</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#2E4057]">Verano 2023</h3>
                <p className="text-xs text-[#2E4057]/60">20% de descuento en productos seleccionados</p>
                <div className="mt-1 text-xs text-[#2E4057]/60">Vence: 30 Ago 2023</div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center p-4 border border-[#E1E1E8] rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 h-12 w-12 bg-[#048BA8] bg-opacity-40 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">50%</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#2E4057]">Segunda Unidad</h3>
                <p className="text-xs text-[#2E4057]/60">50% en la segunda unidad de accesorios</p>
                <div className="mt-1 text-xs text-[#2E4057]/60">Vence: 15 Jul 2023</div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center p-4 border border-[#E1E1E8] rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">15%</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#2E4057]">Club de Clientes</h3>
                <p className="text-xs text-[#2E4057]/60">15% para miembros del club</p>
                <div className="mt-1 text-xs text-[#2E4057]/60">Permanente</div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <Link href="/emprendedor/marketing#descuentos" className="text-[#048BA8] hover:text-[#037897] text-sm hover:underline">
              Ver todos los descuentos →
            </Link>
          </div>
        </div>
        
        {/* Cupones */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#2E4057]">Cupones</h2>
            <Link 
              href="/emprendedor/marketing#nuevo-cupon" 
              className="h-8 w-8 bg-gray-100 rounded-lg text-[#048BA8] flex items-center justify-center hover:bg-[#048BA8] hover:text-white transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 border border-[#E1E1E8] rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 h-14 w-14 bg-[#F18F01] bg-opacity-40 rounded-md flex items-center justify-center mr-4">
                <div className="text-center">
                  <span className="text-white font-bold text-xs block">WELCOME</span>
                  <span className="text-white font-bold text-xs block">10</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#2E4057]">Bienvenida</h3>
                <p className="text-xs text-[#2E4057]/60">10% en primera compra</p>
                <div className="mt-1 text-xs text-[#2E4057]/60">Usos: 58 / Ilimitado</div>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className="p-1 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center p-4 border border-[#E1E1E8] rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 h-14 w-14 bg-[#048BA8] bg-opacity-40 rounded-md flex items-center justify-center mr-4">
                <div className="text-center">
                  <span className="text-white font-bold text-xs block">SUMMER</span>
                  <span className="text-white font-bold text-xs block">23</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#2E4057]">Verano 2023</h3>
                <p className="text-xs text-[#2E4057]/60">15% en productos de verano</p>
                <div className="mt-1 text-xs text-[#2E4057]/60">Usos: 23 / 100</div>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className="p-1 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center p-4 border border-[#E1E1E8] rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 h-14 w-14 bg-purple-500 rounded-md flex items-center justify-center mr-4">
                <div className="text-center">
                  <span className="text-white font-bold text-xs block">FLASH</span>
                  <span className="text-white font-bold text-xs block">25</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#2E4057]">Oferta Flash</h3>
                <p className="text-xs text-[#2E4057]/60">25% por 24 horas</p>
                <div className="mt-1 text-xs text-[#2E4057]/60">Usos: 12 / 50</div>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className="p-1 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Link href="/emprendedor/marketing#cupones" className="text-[#048BA8] hover:text-[#037897] text-sm hover:underline">
              Ver todos los cupones →
            </Link>
          </div>
        </div>
      </div>
    </EmprendedorLayout>
  );
} 