'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import EmprendedorLayout from '@/components/layout/EmprendedorLayout';

export default function ProductosEmprendedor() {
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [busqueda, setBusqueda] = useState('');

  return (
    <EmprendedorLayout titulo="Gestión de Productos">
      {/* Acciones principales */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <input 
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="bg-white rounded-lg border px-4 py-2 pl-10 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select 
            className="bg-white rounded-lg border px-4 py-2 w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="electronica">Electrónica</option>
            <option value="ropa">Ropa</option>
            <option value="hogar">Hogar</option>
            <option value="alimentos">Alimentos</option>
          </select>
          <select 
            className="bg-white rounded-lg border px-4 py-2 w-full md:w-40 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="agotado">Agotado</option>
          </select>
        </div>
        <Link 
          href="/emprendedor/productos/nuevo" 
          className="bg-[#F18F01] hover:bg-[#e07c01] text-white px-4 py-2 rounded-lg flex items-center justify-center md:justify-start gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo Producto
        </Link>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4 transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total de Productos</p>
              <p className="text-xl font-bold text-[#2E4057]">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Productos Activos</p>
              <p className="text-xl font-bold text-[#2E4057]">18</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Productos Agotados</p>
              <p className="text-xl font-bold text-[#2E4057]">6</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Ingresos Totales</p>
              <p className="text-xl font-bold text-[#2E4057]">$12,456</p>
            </div>
          </div>
        </div>
      </div>

      {/* Listado de productos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                Precio
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Img</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Smartwatch Pro</div>
                    <div className="text-sm text-gray-500">SKU: SW-PRO-123</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">Electrónica</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$349.99</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">45 unidades</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Activo
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link href="/emprendedor/productos/1" className="text-[#048BA8] hover:text-[#037897] mr-3">Editar</Link>
                <button className="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Img</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Cámara DSLR 4K</div>
                    <div className="text-sm text-gray-500">SKU: CAM-DSLR-456</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">Fotografía</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$899.99</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">12 unidades</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Stock bajo
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link href="/emprendedor/productos/2" className="text-[#048BA8] hover:text-[#037897] mr-3">Editar</Link>
                <button className="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Img</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Auriculares Bluetooth</div>
                    <div className="text-sm text-gray-500">SKU: AUDIO-BT-789</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">Audio</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$129.99</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">3 unidades</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Casi agotado
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link href="/emprendedor/productos/3" className="text-[#048BA8] hover:text-[#037897] mr-3">Editar</Link>
                <button className="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        
        {/* Paginación */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Mostrando 1-3 de 24 productos
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">
              Anterior
            </button>
            <button className="px-3 py-1 border rounded bg-[#048BA8] text-white text-sm">
              1
            </button>
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border rounded text-sm">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </EmprendedorLayout>
  );
} 