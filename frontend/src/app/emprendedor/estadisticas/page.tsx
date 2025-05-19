'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import EmprendedorLayout from '@/components/layout/EmprendedorLayout';

export default function EstadisticasEmprendedor() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('mes');

  return (
    <EmprendedorLayout titulo="Estadísticas y Análisis">
      {/* Controles de filtro */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md ${periodoSeleccionado === 'semana' ? 'bg-[#048BA8] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setPeriodoSeleccionado('semana')}
          >
            Semana
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${periodoSeleccionado === 'mes' ? 'bg-[#048BA8] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setPeriodoSeleccionado('mes')}
          >
            Mes
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${periodoSeleccionado === 'año' ? 'bg-[#048BA8] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setPeriodoSeleccionado('año')}
          >
            Año
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${periodoSeleccionado === 'personalizado' ? 'bg-[#048BA8] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setPeriodoSeleccionado('personalizado')}
          >
            Personalizado
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar PDF
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Exportar Excel
          </button>
        </div>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#048BA8] transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm text-gray-500 font-medium">Ingresos Totales</h3>
              <p className="text-3xl font-bold text-[#2E4057]">$12,456</p>
            </div>
            <div className="p-2 bg-[#048BA8] bg-opacity-10 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              15% 
            </span>
            <span className="ml-1 text-gray-500">vs. mes anterior</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#F18F01] transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm text-gray-500 font-medium">Pedidos</h3>
              <p className="text-3xl font-bold text-[#2E4057]">87</p>
            </div>
            <div className="p-2 bg-[#F18F01] bg-opacity-10 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F18F01]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              8% 
            </span>
            <span className="ml-1 text-gray-500">vs. mes anterior</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#99C24D] transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm text-gray-500 font-medium">Visitantes</h3>
              <p className="text-3xl font-bold text-[#2E4057]">1.2K</p>
            </div>
            <div className="p-2 bg-[#99C24D] bg-opacity-10 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#99C24D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              23% 
            </span>
            <span className="ml-1 text-gray-500">vs. mes anterior</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-600 transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm text-gray-500 font-medium">Tasa de Conversión</h3>
              <p className="text-3xl font-bold text-[#2E4057]">3.2%</p>
            </div>
            <div className="p-2 bg-purple-600 bg-opacity-10 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              0.5% 
            </span>
            <span className="ml-1 text-gray-500">vs. mes anterior</span>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#2E4057]">Ventas Mensuales</h2>
          </div>
          <div className="p-6">
            {/* Simulación de gráfico */}
            <div className="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-full h-full p-4">
                <div className="h-full flex items-end space-x-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 bg-[#048BA8] rounded-t-sm" style={{height: '40%'}}></div>
                    <span className="text-xs mt-1">Ene</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 bg-[#048BA8] rounded-t-sm" style={{height: '65%'}}></div>
                    <span className="text-xs mt-1">Feb</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 bg-[#048BA8] rounded-t-sm" style={{height: '50%'}}></div>
                    <span className="text-xs mt-1">Mar</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 bg-[#048BA8] rounded-t-sm" style={{height: '70%'}}></div>
                    <span className="text-xs mt-1">Abr</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 bg-[#048BA8] rounded-t-sm" style={{height: '85%'}}></div>
                    <span className="text-xs mt-1">May</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 bg-[#F18F01] rounded-t-sm" style={{height: '90%'}}></div>
                    <span className="text-xs mt-1">Jun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#2E4057]">Distribución de Ventas</h2>
          </div>
          <div className="p-6">
            {/* Simulación de gráfico circular */}
            <div className="flex justify-center">
              <div className="relative h-48 w-48">
                <div className="absolute inset-0 rounded-full border-8 border-[#048BA8]"></div>
                <div className="absolute inset-0 rounded-full border-8 border-[#F18F01]" style={{clip: 'rect(0, 48px, 96px, 0)'}}></div>
                <div className="absolute inset-0 rounded-full border-8 border-[#99C24D]" style={{clip: 'rect(0, 96px, 96px, 48px)'}}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#2E4057]">87</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-[#048BA8] rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Electrónica (45%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-[#F18F01] rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Accesorios (30%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-[#99C24D] rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Audio (15%)</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Otros (10%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Productos más vendidos */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#2E4057]">Productos Más Vendidos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ventas
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ingresos
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-md flex-shrink-0"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Smartwatch Pro</div>
                      <div className="text-xs text-gray-500">SKU: SW-PRO-123</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electrónica</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">156 unidades</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#048BA8] h-2.5 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">$54,598.44</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href="/emprendedor/productos/1" className="text-[#048BA8] hover:text-[#037897]">Ver detalles</Link>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-md flex-shrink-0"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Auriculares Bluetooth</div>
                      <div className="text-xs text-gray-500">SKU: AUDIO-BT-789</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Audio</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">89 unidades</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#048BA8] h-2.5 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">$11,569.11</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href="/emprendedor/productos/2" className="text-[#048BA8] hover:text-[#037897]">Ver detalles</Link>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-md flex-shrink-0"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Cámara DSLR 4K</div>
                      <div className="text-xs text-gray-500">SKU: CAM-DSLR-456</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fotografía</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">42 unidades</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#048BA8] h-2.5 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">$37,799.58</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href="/emprendedor/productos/3" className="text-[#048BA8] hover:text-[#037897]">Ver detalles</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200">
          <Link href="/emprendedor/productos" className="text-[#048BA8] hover:text-[#037897] text-sm font-medium">
            Ver todos los productos →
          </Link>
        </div>
      </div>
    </EmprendedorLayout>
  );
} 