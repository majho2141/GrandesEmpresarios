import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ClienteDashboard() {
  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Encabezado de página */}
      <div className="bg-[#2E4057] text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Dashboard de Cliente</h1>
          <p className="mt-2">Bienvenido a tu área personal</p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto py-8 px-4">
        {/* Resumen de actividad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-[#2E4057] mb-3">Compras Recientes</h3>
            <p className="text-gray-600">Has realizado 3 compras en los últimos 30 días</p>
            <Link href="/cliente/historial-compras" className="text-[#048BA8] hover:underline mt-4 inline-block">
              Ver historial completo
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-[#2E4057] mb-3">Carrito Activo</h3>
            <p className="text-gray-600">Tienes 2 productos en tu carrito</p>
            <Link href="/cliente/carrito" className="text-[#048BA8] hover:underline mt-4 inline-block">
              Ir al carrito
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-[#2E4057] mb-3">Perfil</h3>
            <p className="text-gray-600">Actualiza tu información personal</p>
            <Link href="/profile" className="text-[#048BA8] hover:underline mt-4 inline-block">
              Editar perfil
            </Link>
          </div>
        </div>

        {/* Últimas compras */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#2E4057] mb-4">Últimas Compras</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pedido</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10/05/2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#ORD-2023-001</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$120.00</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Entregado
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#048BA8] hover:text-[#F18F01]">
                    <Link href="/cliente/historial-compras/ORD-2023-001">Ver detalles</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">05/05/2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#ORD-2023-002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$85.50</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      En camino
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#048BA8] hover:text-[#F18F01]">
                    <Link href="/cliente/historial-compras/ORD-2023-002">Ver detalles</Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28/04/2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#ORD-2023-003</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$210.75</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Entregado
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#048BA8] hover:text-[#F18F01]">
                    <Link href="/cliente/historial-compras/ORD-2023-003">Ver detalles</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Ofertas personalizadas */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-[#2E4057] mb-4">Ofertas Para Ti</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="relative h-48 w-full">
                <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                  <span className="text-gray-400">Imagen del producto</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#2E4057]">Laptop XYZ Pro</h3>
                <p className="text-gray-500 text-sm">Potente laptop para profesionales</p>
                <div className="mt-2 flex items-baseline">
                  <span className="text-[#F18F01] text-xl font-bold">$899</span>
                  <span className="text-gray-400 text-sm ml-2 line-through">$1099</span>
                </div>
                <button className="mt-3 bg-[#048BA8] hover:bg-[#037897] text-white py-2 px-4 rounded-md w-full">
                  Ver producto
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="relative h-48 w-full">
                <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                  <span className="text-gray-400">Imagen del producto</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#2E4057]">Smartphone ABC</h3>
                <p className="text-gray-500 text-sm">El smartphone más avanzado</p>
                <div className="mt-2 flex items-baseline">
                  <span className="text-[#F18F01] text-xl font-bold">$599</span>
                  <span className="text-gray-400 text-sm ml-2 line-through">$699</span>
                </div>
                <button className="mt-3 bg-[#048BA8] hover:bg-[#037897] text-white py-2 px-4 rounded-md w-full">
                  Ver producto
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="relative h-48 w-full">
                <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                  <span className="text-gray-400">Imagen del producto</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#2E4057]">Tablet UltraThin</h3>
                <p className="text-gray-500 text-sm">Tablet ligera y potente</p>
                <div className="mt-2 flex items-baseline">
                  <span className="text-[#F18F01] text-xl font-bold">$329</span>
                  <span className="text-gray-400 text-sm ml-2 line-through">$399</span>
                </div>
                <button className="mt-3 bg-[#048BA8] hover:bg-[#037897] text-white py-2 px-4 rounded-md w-full">
                  Ver producto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 