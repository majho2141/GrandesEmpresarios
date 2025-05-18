import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ConfirmacionPago() {
  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Encabezado de página */}
      <div className="bg-[#2E4057] text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Confirmación de Compra</h1>
          <div className="flex items-center mt-2">
            <Link href="/cliente/dashboard" className="text-[#F4F4F8] hover:text-[#F18F01]">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <Link href="/cliente/carrito" className="text-[#F4F4F8] hover:text-[#F18F01]">
              Carrito
            </Link>
            <span className="mx-2">/</span>
            <Link href="/cliente/pago" className="text-[#F4F4F8] hover:text-[#F18F01]">
              Pago
            </Link>
            <span className="mx-2">/</span>
            <span>Confirmación</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#99C24D] text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#2E4057] mb-2">¡Gracias por tu compra!</h2>
            <p className="text-gray-600">
              Tu pedido ha sido recibido y está siendo procesado. Recibirás un correo electrónico con los detalles de tu compra.
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Número de Pedido</h3>
                <p className="text-lg font-bold text-[#2E4057]">#ORD-2023-123456</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Fecha de Compra</h3>
                <p className="text-lg font-bold text-[#2E4057]">12 Mayo, 2023</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total</h3>
                <p className="text-lg font-bold text-[#F18F01]">$1,744.69</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Método de Pago</h3>
                <p className="text-base text-[#2E4057]">Tarjeta terminada en 3456</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Método de Envío</h3>
                <p className="text-base text-[#2E4057]">Envío Estándar</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Entrega Estimada</h3>
                <p className="text-base text-[#2E4057]">16-19 Mayo, 2023</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#2E4057] mb-4">Resumen del Pedido</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gray-200 flex-shrink-0 rounded-md flex items-center justify-center mr-4">
                  <span className="text-gray-400">Img</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">Laptop XYZ Pro</h4>
                  <p className="text-sm text-gray-500">Procesador i7, 16GB RAM, 512GB SSD</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-gray-500">Cantidad: 1</span>
                    <span className="font-medium">$899.00</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gray-200 flex-shrink-0 rounded-md flex items-center justify-center mr-4">
                  <span className="text-gray-400">Img</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">Monitor 27"</h4>
                  <p className="text-sm text-gray-500">1440p, 144Hz, Panel IPS</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-gray-500">Cantidad: 2</span>
                    <span className="font-medium">$598.00</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gray-200 flex-shrink-0 rounded-md flex items-center justify-center mr-4">
                  <span className="text-gray-400">Img</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">Teclado Mecánico</h4>
                  <p className="text-sm text-gray-500">RGB, Switches Blue, Layout Español</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-gray-500">Cantidad: 1</span>
                    <span className="font-medium">$79.99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="text-lg font-bold text-[#2E4057] mb-4">Dirección de Envío</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium">Juan Pérez</p>
              <p className="text-gray-600">Calle Principal 123</p>
              <p className="text-gray-600">Colonia Centro</p>
              <p className="text-gray-600">Ciudad de México, 06000</p>
              <p className="text-gray-600">México</p>
              <p className="text-gray-600">Teléfono: +52 55 1234 5678</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-base">
              <span>Subtotal</span>
              <span>$1,576.99</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Envío</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Impuestos</span>
              <span>$157.70</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-[#F18F01]">$1,744.69</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/cliente/dashboard" 
              className="bg-[#048BA8] hover:bg-[#037897] text-white py-2 px-6 rounded-md text-center"
            >
              Volver al Dashboard
            </Link>
            <button 
              className="bg-[#2E4057] hover:bg-[#1e2c3a] text-white py-2 px-6 rounded-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Descargar Factura
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 