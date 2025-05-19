'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { FaShoppingCart, FaMapMarkerAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

export default function Carrito() {
  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Navbar */}
      <DashboardHeader titulo="Carrito de Compras" rol="cliente" />

      {/* Contenido principal */}
      <div className="container mx-auto py-8 px-4">
        {/* Stepper */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-4xl">
            <div className="relative flex items-center justify-between">
              {/* Líneas de conexión */}
              <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
              <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-[#048BA8] z-0" style={{ width: '0%' }}></div>
              
              {/* Paso 1: Carrito (actual) */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#048BA8] text-white flex items-center justify-center shadow-md transition-all ring-4 ring-blue-100">
                  <FaShoppingCart className="w-5 h-5" />
                </div>
                <div className="mt-3 text-sm font-semibold text-[#048BA8]">Revisar Carrito</div>
              </div>
              
              {/* Paso 2: Dirección */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center shadow-sm transition-all">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <div className="mt-3 text-sm font-medium text-gray-400">Dirección de Envío</div>
              </div>
              
              {/* Paso 3: Pago */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center shadow-sm transition-all">
                  <FaCreditCard className="w-5 h-5" />
                </div>
                <div className="mt-3 text-sm font-medium text-gray-400">Método de Pago</div>
              </div>
              
              {/* Paso 4: Confirmación */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center shadow-sm transition-all">
                  <FaCheckCircle className="w-5 h-5" />
                </div>
                <div className="mt-3 text-sm font-medium text-gray-400">Confirmar Orden</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Productos en el carrito */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-[#2E4057]">Productos en tu carrito (3)</h2>
              </div>
              
              {/* Lista de productos */}
              <div className="divide-y divide-gray-200">
                {/* Producto 1 */}
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 flex-shrink-0 rounded-md flex items-center justify-center">
                    <span className="text-gray-400">Imagen</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-[#2E4057]">Laptop XYZ Pro</h3>
                    <p className="text-gray-500">Procesador i7, 16GB RAM, 512GB SSD</p>
                    <p className="text-[#F18F01] font-semibold mt-1">$899.00</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center focus:outline-none">
                      <span>-</span>
                    </button>
                    <input
                      type="number"
                      min="1"
                      value="1"
                      className="w-12 text-center border rounded-md p-1"
                      readOnly
                    />
                    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center focus:outline-none">
                      <span>+</span>
                    </button>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-[#2E4057]">$899.00</span>
                    <button className="text-red-500 text-sm mt-2 hover:underline">
                      Eliminar
                    </button>
                  </div>
                </div>
                
                {/* Producto 2 */}
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 flex-shrink-0 rounded-md flex items-center justify-center">
                    <span className="text-gray-400">Imagen</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-[#2E4057]">Monitor 27"</h3>
                    <p className="text-gray-500">1440p, 144Hz, Panel IPS</p>
                    <p className="text-[#F18F01] font-semibold mt-1">$299.00</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center focus:outline-none">
                      <span>-</span>
                    </button>
                    <input
                      type="number"
                      min="1"
                      value="2"
                      className="w-12 text-center border rounded-md p-1"
                      readOnly
                    />
                    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center focus:outline-none">
                      <span>+</span>
                    </button>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-[#2E4057]">$598.00</span>
                    <button className="text-red-500 text-sm mt-2 hover:underline">
                      Eliminar
                    </button>
                  </div>
                </div>
                
                {/* Producto 3 */}
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 flex-shrink-0 rounded-md flex items-center justify-center">
                    <span className="text-gray-400">Imagen</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-[#2E4057]">Teclado Mecánico</h3>
                    <p className="text-gray-500">RGB, Switches Blue, Layout Español</p>
                    <p className="text-[#F18F01] font-semibold mt-1">$79.99</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center focus:outline-none">
                      <span>-</span>
                    </button>
                    <input
                      type="number"
                      min="1"
                      value="1"
                      className="w-12 text-center border rounded-md p-1"
                      readOnly
                    />
                    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center focus:outline-none">
                      <span>+</span>
                    </button>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold text-[#2E4057]">$79.99</span>
                    <button className="text-red-500 text-sm mt-2 hover:underline">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t flex justify-between">
                <button className="text-[#048BA8] hover:text-[#037897] flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Continuar comprando
                </button>
                <button className="text-red-500 hover:text-red-600">
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>
          
          {/* Resumen del pedido */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-4 transition-all hover:shadow-md">
              <h2 className="text-xl font-bold text-[#2E4057] mb-4">Resumen del pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal (3 productos)</span>
                  <span className="font-medium">$1,576.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium">$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos</span>
                  <span className="font-medium">$157.70</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#F18F01]">$1,744.69</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#99C24D] mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">Envío gratis en pedidos mayores a $1,500</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#99C24D] mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">Garantía de devolución de 30 días</span>
                </div>
              </div>
              
              <div>
                <Link 
                  href="/cliente/direccion" 
                  className="bg-[#F18F01] hover:bg-[#e07c01] text-white font-semibold py-3 px-4 rounded-md w-full block text-center transition-all"
                >
                  Proceder al pago
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 