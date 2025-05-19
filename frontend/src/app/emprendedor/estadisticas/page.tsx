'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import EmprendedorLayout from '@/components/layout/EmprendedorLayout';

export default function EstadisticasEmprendedor() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('mes');
  // Usamos estados para los valores del gráfico para arreglar problemas de hidratación
  const [mounted, setMounted] = useState(false);
  
  // Estado para los datos de ventas mensuales
  const [ventasMensuales, setVentasMensuales] = useState([
    { mes: 'Ene', valor: 42, color: '#048BA8' },
    { mes: 'Feb', valor: 65, color: '#048BA8' },
    { mes: 'Mar', valor: 53, color: '#048BA8' },
    { mes: 'Abr', valor: 71, color: '#048BA8' },
    { mes: 'May', valor: 84, color: '#048BA8' },
    { mes: 'Jun', valor: 95, color: '#F18F01' }
  ]);
  
  // Estado para la distribución de ventas
  const [distribucionVentas, setDistribucionVentas] = useState([
    { categoria: 'Electrónica', porcentaje: 45, color: '#048BA8' },
    { categoria: 'Accesorios', porcentaje: 30, color: '#F18F01' },
    { categoria: 'Audio', porcentaje: 15, color: '#99C24D' },
    { categoria: 'Otros', porcentaje: 10, color: '#6c757d' }
  ]);

  // Arregla problemas de hidratación
  useEffect(() => {
    setMounted(true);
    
    // Limpieza al desmontar el componente
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <EmprendedorLayout titulo="Estadísticas y Análisis">
      {/* Controles de filtro */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md ${periodoSeleccionado === 'semana' ? 'bg-[#048BA8] text-white' : 'bg-gray-100 hover:bg-gray-200 text-[#2E4057]'}`}
            onClick={() => setPeriodoSeleccionado('semana')}
          >
            Semana
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${periodoSeleccionado === 'mes' ? 'bg-[#048BA8] text-white' : 'bg-gray-100 hover:bg-gray-200 text-[#2E4057]'}`}
            onClick={() => setPeriodoSeleccionado('mes')}
          >
            Mes
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${periodoSeleccionado === 'año' ? 'bg-[#048BA8] text-white' : 'bg-gray-100 hover:bg-gray-200 text-[#2E4057]'}`}
            onClick={() => setPeriodoSeleccionado('año')}
          >
            Año
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${periodoSeleccionado === 'personalizado' ? 'bg-[#048BA8] text-white' : 'bg-gray-100 hover:bg-gray-200 text-[#2E4057]'}`}
            onClick={() => setPeriodoSeleccionado('personalizado')}
          >
            Personalizado
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-[#2E4057] flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar PDF
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-[#2E4057] flex items-center">
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
            {/* Gráfico mejorado */}
            <div className="h-80 w-full bg-white rounded-lg">
              {mounted && (
                <div className="w-full h-full flex flex-col">
                  <div className="flex-grow flex items-end justify-around relative pt-4 px-2">
                    {/* Líneas de cuadrícula horizontales */}
                    <div className="absolute inset-x-0 top-4 bottom-8 flex flex-col justify-between">
                      <div className="h-px w-full bg-gray-100"></div>
                      <div className="h-px w-full bg-gray-100"></div>
                      <div className="h-px w-full bg-gray-100"></div>
                      <div className="h-px w-full bg-gray-100"></div>
                      <div className="h-px w-full bg-gray-100"></div>
                    </div>
                    
                    {/* Valores en eje Y */}
                    <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-xs text-gray-400 pt-2 pb-8">
                      <span>100k</span>
                      <span>80k</span>
                      <span>60k</span>
                      <span>40k</span>
                      <span>20k</span>
                      <span>0</span>
                    </div>
                    
                    {/* Barras del gráfico */}
                    <div className="flex-1 flex items-end justify-around ml-10">
                      {ventasMensuales.map((item, index) => (
                        <div key={index} className="flex flex-col items-center z-10 group">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 absolute bottom-full mb-2">
                            ${Math.floor(item.valor * 1000)}
                          </div>
                          <div 
                            className="w-14 rounded-t-md shadow-md transition-all duration-500 group-hover:brightness-110"
                            style={{
                              height: `${item.valor * 3}px`,
                              backgroundColor: item.color
                            }}
                          ></div>
                          <span className="text-xs mt-2 font-medium text-[#2E4057]">{item.mes}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#2E4057]">Distribución de Ventas</h2>
          </div>
          <div className="p-6">
            {/* Gráfico circular mejorado */}
            {mounted && (
              <div className="flex flex-col items-center">
                <div className="relative h-52 w-52 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#048BA8"
                      strokeWidth="20"
                      strokeDasharray="251.2"
                      strokeDashoffset="138.16"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#F18F01"
                      strokeWidth="20"
                      strokeDasharray="251.2"
                      strokeDashoffset="188.4"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#99C24D"
                      strokeWidth="20"
                      strokeDasharray="251.2"
                      strokeDashoffset="213.52"
                      transform="rotate(-54 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#6c757d"
                      strokeWidth="20"
                      strokeDasharray="251.2"
                      strokeDashoffset="226.08"
                      transform="rotate(-30 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#2E4057]">87</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 w-full">
                  {distribucionVentas.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <span className="text-sm text-[#2E4057]">{item.categoria} ({item.porcentaje}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                      <div className="text-sm font-medium text-[#2E4057]">Smartwatch Pro</div>
                      <div className="text-xs text-gray-500">SKU: SW-PRO-123</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electrónica</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[#2E4057]">156 unidades</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#048BA8] h-2.5 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057] font-medium">$54,598.44</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href="/emprendedor/productos/1" className="text-[#048BA8] hover:text-[#037897]">Ver detalles</Link>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-md flex-shrink-0"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-[#2E4057]">Auriculares Bluetooth</div>
                      <div className="text-xs text-gray-500">SKU: AUDIO-BT-789</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Audio</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[#2E4057]">89 unidades</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#048BA8] h-2.5 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057] font-medium">$11,569.11</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href="/emprendedor/productos/2" className="text-[#048BA8] hover:text-[#037897]">Ver detalles</Link>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-md flex-shrink-0"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-[#2E4057]">Cámara DSLR 4K</div>
                      <div className="text-xs text-gray-500">SKU: CAM-DSLR-456</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fotografía</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[#2E4057]">42 unidades</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#048BA8] h-2.5 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057] font-medium">$37,799.58</td>
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