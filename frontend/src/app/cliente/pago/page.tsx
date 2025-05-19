'use client';

import React from 'react';
import Link from 'next/link';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { FaShoppingCart, FaMapMarkerAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

export default function Pago() {
  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Navbar */}
      <DashboardHeader titulo="Proceso de Pago" rol="cliente" />

      {/* Contenido principal */}
      <div className="container mx-auto py-8 px-4">
        {/* Stepper mejorado */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-4xl">
            <div className="relative flex items-center justify-between">
              {/* Líneas de conexión */}
              <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
              <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-[#048BA8] z-0" style={{ width: '66.66%' }}></div>
              
              {/* Paso 1: Carrito */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#048BA8] text-white flex items-center justify-center shadow-md transition-all">
                  <FaShoppingCart className="w-5 h-5" />
                </div>
                <div className="mt-3 text-sm font-medium text-[#2E4057]">Revisar Carrito</div>
              </div>
              
              {/* Paso 2: Dirección */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#048BA8] text-white flex items-center justify-center shadow-md transition-all">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <div className="mt-3 text-sm font-medium text-[#2E4057]">Dirección de Envío</div>
              </div>
              
              {/* Paso 3: Pago (actual) */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#048BA8] text-white flex items-center justify-center shadow-md transition-all ring-4 ring-blue-100">
                  <FaCreditCard className="w-5 h-5" />
                </div>
                <div className="mt-3 text-sm font-semibold text-[#048BA8]">Método de Pago</div>
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
          {/* Formularios */}
          <div className="lg:w-2/3">
            {/* Método de pago */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 transition-all hover:shadow-md">
              <h2 className="text-xl font-bold text-[#2E4057] mb-4">Método de Pago</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input type="radio" id="tarjeta" name="pago" className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8]" defaultChecked />
                  <label htmlFor="tarjeta" className="text-gray-700">Tarjeta de Crédito/Débito</label>
                </div>
                
                <div className="ml-7 border p-4 rounded-md bg-gray-50">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Número de tarjeta</label>
                      <input 
                        type="text" 
                        placeholder="1234 5678 9012 3456" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de expiración</label>
                        <input 
                          type="text" 
                          placeholder="MM/AA" 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input 
                          type="text" 
                          placeholder="123" 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre en la tarjeta</label>
                      <input 
                        type="text" 
                        placeholder="Juan Pérez" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input type="radio" id="paypal" name="pago" className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8]" />
                  <label htmlFor="paypal" className="text-gray-700">PayPal</label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input type="radio" id="transferencia" name="pago" className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8]" />
                  <label htmlFor="transferencia" className="text-gray-700">Transferencia Bancaria</label>
                </div>
              </div>
            </div>
            
            {/* Dirección de envío */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#2E4057]">Dirección de Envío</h2>
                <button className="text-[#048BA8] hover:text-[#037897] text-sm">Editar</button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                <p className="font-medium">Juan Pérez</p>
                <p className="text-gray-600">Calle Principal 123</p>
                <p className="text-gray-600">Colonia Centro</p>
                <p className="text-gray-600">Ciudad de México, 06000</p>
                <p className="text-gray-600">México</p>
                <p className="text-gray-600">Teléfono: +52 55 1234 5678</p>
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
                    <p className="font-medium">Laptop XYZ Pro</p>
                    <p className="text-sm text-gray-500">Cantidad: 1</p>
                  </div>
                  <span className="font-medium">$899.00</span>
                </div>
                <div className="py-3 flex justify-between">
                  <div>
                    <p className="font-medium">Monitor 27"</p>
                    <p className="text-sm text-gray-500">Cantidad: 2</p>
                  </div>
                  <span className="font-medium">$598.00</span>
                </div>
                <div className="py-3 flex justify-between">
                  <div>
                    <p className="font-medium">Teclado Mecánico</p>
                    <p className="text-sm text-gray-500">Cantidad: 1</p>
                  </div>
                  <span className="font-medium">$79.99</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
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
              
              <Link 
                href="/cliente/pago/confirmacion" 
                className="bg-[#F18F01] hover:bg-[#e07c01] text-white font-semibold py-3 px-4 rounded-md w-full block text-center transition-all"
              >
                Confirmar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 