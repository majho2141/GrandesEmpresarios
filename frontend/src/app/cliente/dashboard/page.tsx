'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ClienteDashboardPage() {
  return (
    <DashboardLayout titulo="Dashboard Cliente" rol="cliente">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta de bienvenida */}
        <div className="col-span-full bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <h2 className="text-2xl font-semibold text-[#2E4057] mb-2">¡Bienvenido a tu Dashboard!</h2>
          <p className="text-[#2E4057]/70">
            Aquí podrás gestionar tus compras, ver tu historial y mucho más.
          </p>
        </div>

        {/* Resumen de compras recientes */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg text-[#2E4057]">Compras Recientes</h3>
            <button className="text-[#048BA8] hover:underline text-sm cursor-pointer">Ver todas</button>
          </div>
          
          <div className="space-y-4">
            {/* Compra de ejemplo */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center p-3 bg-gray-50 rounded-lg border border-[#E1E1E8]">
                <div className="w-12 h-12 bg-[#048BA8]/10 rounded-lg flex items-center justify-center text-[#048BA8]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-[#2E4057] font-medium">Compra #{1000 + item}</p>
                  <p className="text-sm text-[#2E4057]/60">hace {item} día{item > 1 ? 's' : ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#2E4057] font-semibold">${(item * 25).toFixed(2)}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Completada</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="lg:row-span-2 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <h3 className="font-semibold text-lg text-[#2E4057] mb-4">Resumen</h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-[#2E4057]/60 mb-1">Total compras</p>
              <p className="text-2xl font-semibold text-[#2E4057]">6</p>
              <div className="flex items-center text-green-600 text-xs mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>4 más que el mes pasado</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-[#2E4057]/60 mb-1">Gasto total</p>
              <p className="text-2xl font-semibold text-[#2E4057]">$156.75</p>
              <div className="flex items-center text-green-600 text-xs mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>$45.25 más que el mes pasado</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-[#2E4057]/60 mb-1">Productos adquiridos</p>
              <p className="text-2xl font-semibold text-[#2E4057]">12</p>
            </div>
          </div>
        </div>
        
        {/* Productos populares */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg text-[#2E4057]">Productos Populares</h3>
            <button className="text-[#048BA8] hover:underline text-sm cursor-pointer">Ver catálogo</button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg p-3 border border-[#E1E1E8]">
                <div className="w-full h-24 bg-[#F4F4F8] rounded-md mb-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#2E4057]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-medium text-[#2E4057] truncate">Producto {item}</h4>
                <p className="text-sm text-[#2E4057]/60">${(10 + item * 5).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 