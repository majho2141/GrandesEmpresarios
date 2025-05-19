'use client';

import React from 'react';
import Link from 'next/link';
import EmprendedorLayout from '@/components/layout/EmprendedorLayout';

export default function EmprendedorDashboard() {
  return (
    <EmprendedorLayout titulo="Dashboard del Emprendedor">
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#2E4057]">Ventas Totales</h3>
            <div className="h-10 w-10 rounded-full bg-[#048BA8] bg-opacity-20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-[#2E4057]">$12,456</p>
              <p className="text-sm text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                15% vs. mes anterior
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#2E4057]">Productos</h3>
            <div className="h-10 w-10 rounded-full bg-[#F18F01] bg-opacity-20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F18F01]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-[#2E4057]">24</p>
              <p className="text-sm text-gray-500">Activos: 18 | Agotados: 6</p>
            </div>
            <Link href="/emprendedor/productos" className="text-[#048BA8] hover:text-[#037897] text-sm">
              Ver todos
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#2E4057]">Campañas</h3>
            <div className="h-10 w-10 rounded-full bg-[#99C24D] bg-opacity-20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#99C24D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-[#2E4057]">3</p>
              <p className="text-sm text-gray-500">Activas: 2 | Finalizadas: 1</p>
            </div>
            <Link href="/emprendedor/marketing" className="text-[#048BA8] hover:text-[#037897] text-sm">
              Ver todas
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-105">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-[#2E4057]">Leads</h3>
            <div className="h-10 w-10 rounded-full bg-[#048BA8] bg-opacity-20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-[#2E4057]">156</p>
              <p className="text-sm text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                23% vs. mes anterior
              </p>
            </div>
            <Link href="/emprendedor/estadisticas" className="text-[#048BA8] hover:text-[#037897] text-sm">
              Ver todos
            </Link>
          </div>
        </div>
      </div>

      {/* Gráficos y tablas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Gráfico de ventas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#2E4057]">Ventas Mensuales</h2>
              <div className="flex space-x-2">
                <select className="border rounded-md text-sm px-2 py-1">
                  <option>Últimos 6 meses</option>
                  <option>Último año</option>
                  <option>Todo el tiempo</option>
                </select>
              </div>
            </div>
            
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

        {/* Alertas */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#2E4057]">Alertas</h2>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">3 nuevas</span>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Stock bajo</h3>
                    <div className="text-sm text-red-700">
                      <p>3 productos tienen menos de 5 unidades disponibles.</p>
                    </div>
                    <Link href="/emprendedor/productos" className="text-xs text-red-800 font-medium hover:underline mt-1 inline-block">Ver productos</Link>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Campaña finalizando</h3>
                    <div className="text-sm text-yellow-700">
                      <p>La campaña "Verano 2023" finaliza en 2 días.</p>
                    </div>
                    <Link href="/emprendedor/marketing" className="text-xs text-yellow-800 font-medium hover:underline mt-1 inline-block">Ver campaña</Link>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Actualización disponible</h3>
                    <div className="text-sm text-blue-700">
                      <p>Hay nuevas características disponibles en la plataforma.</p>
                    </div>
                    <Link href="/emprendedor/tienda/configuracion" className="text-xs text-blue-800 font-medium hover:underline mt-1 inline-block">Ver detalles</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Productos más vendidos */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-[#2E4057]">Productos Más Vendidos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ventas</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$349.99</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">156 unidades</div>
                  <div className="text-xs text-green-600">+12% vs. mes anterior</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 unidades</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href="/emprendedor/productos/1" className="text-[#048BA8] hover:text-[#037897]">Ver detalles</Link>
                </td>
              </tr>
              <tr>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$129.99</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">89 unidades</div>
                  <div className="text-xs text-green-600">+8% vs. mes anterior</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12 unidades</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href="/emprendedor/productos/2" className="text-[#048BA8] hover:text-[#037897]">Ver detalles</Link>
                </td>
              </tr>
              <tr>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$899.99</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">42 unidades</div>
                  <div className="text-xs text-green-600">+5% vs. mes anterior</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8 unidades</td>
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