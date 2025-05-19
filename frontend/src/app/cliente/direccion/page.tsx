'use client';

import React from 'react';
import Link from 'next/link';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { FaShoppingCart, FaMapMarkerAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

export default function DireccionEnvio() {
  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Navbar */}
      <DashboardHeader titulo="Dirección de Envío" rol="cliente" />

      {/* Contenido principal */}
      <div className="container mx-auto py-8 px-4">
        {/* Stepper */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-4xl">
            <div className="relative flex items-center justify-between">
              {/* Líneas de conexión */}
              <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
              <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-[#048BA8] z-0" style={{ width: '33.33%' }}></div>
              
              {/* Paso 1: Carrito */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#048BA8] text-white flex items-center justify-center shadow-md transition-all">
                  <FaShoppingCart className="w-5 h-5" />
                </div>
                <div className="mt-3 text-sm font-medium text-[#2E4057]">Revisar Carrito</div>
              </div>
              
              {/* Paso 2: Dirección (actual) */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#048BA8] text-white flex items-center justify-center shadow-md transition-all ring-4 ring-blue-100">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <div className="mt-3 text-sm font-semibold text-[#048BA8]">Dirección de Envío</div>
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
          {/* Formulario de dirección */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
              <h2 className="text-xl font-bold text-[#2E4057] mb-6">Información de Envío</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Juan" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8] text-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                  <input 
                    type="text" 
                    placeholder="Pérez" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8] text-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input 
                    type="tel" 
                    placeholder="+52 55 1234 5678" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8] text-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                  <input 
                    type="email" 
                    placeholder="juan@ejemplo.com" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8] text-gray-700" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input 
                    type="text" 
                    placeholder="Calle Principal 123" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8] text-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Colonia</label>
                  <input 
                    type="text" 
                    placeholder="Colonia Centro" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8] text-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                  <input 
                    type="text" 
                    placeholder="06000" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8] text-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                  <input 
                    type="text" 
                    placeholder="Ciudad de México" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8] text-gray-700" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8] text-gray-700"
                  >
                    <option value="">Seleccionar estado</option>
                    <option value="CDMX">Ciudad de México</option>
                    <option value="JAL">Jalisco</option>
                    <option value="NL">Nuevo León</option>
                    <option value="PUE">Puebla</option>
                    <option value="QRO">Querétaro</option>
                    <option value="MEX">Estado de México</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Método de Envío</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center p-4 border border-gray-200 rounded-md hover:border-[#048BA8] cursor-pointer transition-all bg-gray-50">
                    <input 
                      type="radio" 
                      id="envio-estandar" 
                      name="envio" 
                      className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] mr-3" 
                      defaultChecked 
                    />
                    <label htmlFor="envio-estandar" className="flex-grow cursor-pointer">
                      <div className="font-medium text-gray-700">Envío Estándar</div>
                      <div className="text-sm text-gray-500">Entrega en 3-5 días hábiles</div>
                    </label>
                    <span className="font-medium text-gray-700">$10.00</span>
                  </div>
                  
                  <div className="flex items-center p-4 border border-gray-200 rounded-md hover:border-[#048BA8] cursor-pointer transition-all bg-gray-50">
                    <input 
                      type="radio" 
                      id="envio-express" 
                      name="envio" 
                      className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] mr-3" 
                    />
                    <label htmlFor="envio-express" className="flex-grow cursor-pointer">
                      <div className="font-medium text-gray-700">Envío Express</div>
                      <div className="text-sm text-gray-500">Entrega en 1-2 días hábiles</div>
                    </label>
                    <span className="font-medium text-gray-700">$25.00</span>
                  </div>
                  
                  <div className="flex items-center p-4 border border-gray-200 rounded-md hover:border-[#048BA8] cursor-pointer transition-all bg-gray-50">
                    <input 
                      type="radio" 
                      id="recoger-tienda" 
                      name="envio" 
                      className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] mr-3" 
                    />
                    <label htmlFor="recoger-tienda" className="flex-grow cursor-pointer">
                      <div className="font-medium text-gray-700">Recoger en Tienda</div>
                      <div className="text-sm text-gray-500">Disponible en 24 horas</div>
                    </label>
                    <span className="font-medium text-gray-700">Gratis</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/cliente/carrito" 
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-center transition-all"
                >
                  Regresar al Carrito
                </Link>
                <Link 
                  href="/cliente/pago" 
                  className="bg-[#F18F01] hover:bg-[#e07c01] text-white font-semibold py-2 px-6 rounded-md text-center transition-all"
                >
                  Continuar a Pago
                </Link>
              </div>
            </div>
          </div>
          
          {/* Resumen del pedido */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-4 transition-all hover:shadow-md">
              <h2 className="text-xl font-bold text-[#2E4057] mb-4">Resumen del pedido</h2>
              
              <div className="divide-y divide-gray-200 mb-4">
                <div className="py-3 flex justify-between">
                  <div>
                    <p className="font-medium text-gray-700">Laptop XYZ Pro</p>
                    <p className="text-sm text-gray-500">Cantidad: 1</p>
                  </div>
                  <span className="font-medium text-gray-700">$899.00</span>
                </div>
                <div className="py-3 flex justify-between">
                  <div>
                    <p className="font-medium text-gray-700">Monitor 27"</p>
                    <p className="text-sm text-gray-500">Cantidad: 2</p>
                  </div>
                  <span className="font-medium text-gray-700">$598.00</span>
                </div>
                <div className="py-3 flex justify-between">
                  <div>
                    <p className="font-medium text-gray-700">Teclado Mecánico</p>
                    <p className="text-sm text-gray-500">Cantidad: 1</p>
                  </div>
                  <span className="font-medium text-gray-700">$79.99</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-700">$1,576.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium text-gray-700">$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos</span>
                  <span className="font-medium text-gray-700">$157.70</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-gray-800">Total</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 