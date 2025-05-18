import React from 'react';
import Link from 'next/link';

export default function HistorialCompras() {
  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Encabezado de página */}
      <div className="bg-[#2E4057] text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Historial de Compras</h1>
          <div className="flex items-center mt-2">
            <Link href="/cliente/dashboard" className="text-[#F4F4F8] hover:text-[#F18F01]">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <span>Historial de Compras</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto py-8 px-4">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Filtrar Pedidos</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]">
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En proceso</option>
                <option value="enviado">Enviado</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
              <input 
                type="date" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
              <input 
                type="date" 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
              />
            </div>
            <div className="flex items-end">
              <button className="bg-[#048BA8] hover:bg-[#037897] text-white py-2 px-4 rounded-md w-full">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Listado de pedidos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedido #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artículos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #ORD-2023-001
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  10/05/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $120.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Entregado
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  3 artículos
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link href="/cliente/historial-compras/ORD-2023-001" className="text-[#048BA8] hover:text-[#F18F01] mr-4">
                    Ver detalles
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #ORD-2023-002
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  05/05/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $85.50
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    En camino
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1 artículo
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link href="/cliente/historial-compras/ORD-2023-002" className="text-[#048BA8] hover:text-[#F18F01] mr-4">
                    Ver detalles
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #ORD-2023-003
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  28/04/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $210.75
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Entregado
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  5 artículos
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link href="/cliente/historial-compras/ORD-2023-003" className="text-[#048BA8] hover:text-[#F18F01] mr-4">
                    Ver detalles
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #ORD-2023-004
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15/04/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $45.99
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Entregado
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1 artículo
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link href="/cliente/historial-compras/ORD-2023-004" className="text-[#048BA8] hover:text-[#F18F01] mr-4">
                    Ver detalles
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #ORD-2023-005
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  05/04/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $129.50
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Cancelado
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2 artículos
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link href="/cliente/historial-compras/ORD-2023-005" className="text-[#048BA8] hover:text-[#F18F01] mr-4">
                    Ver detalles
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          {/* Paginación */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de <span className="font-medium">12</span> resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Anterior</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" aria-current="page" className="z-10 bg-[#048BA8] border-[#048BA8] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </a>
                  <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </a>
                  <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Siguiente</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 