'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function EmprendedorDashboardPage() {
  // Estados para almacenar los valores dinámicos
  const [ventasItems, setVentasItems] = useState([
    { cliente: 'Cliente 1', producto: 'Producto 11', monto: '75.20', estado: 'Pendiente' },
    { cliente: 'Cliente 2', producto: 'Producto 12', monto: '45.99', estado: 'Completada' },
    { cliente: 'Cliente 3', producto: 'Producto 13', monto: '120.50', estado: 'En camino' },
    { cliente: 'Cliente 4', producto: 'Producto 14', monto: '60.75', estado: 'Pendiente' },
    { cliente: 'Cliente 5', producto: 'Producto 15', monto: '89.99', estado: 'Completada' },
  ]);

  const [productosTop, setProductosTop] = useState([
    { nombre: 'Producto Top 1', unidades: '35', precio: '85.50' },
    { nombre: 'Producto Top 2', unidades: '28', precio: '65.99' },
    { nombre: 'Producto Top 3', unidades: '22', precio: '120.25' },
    { nombre: 'Producto Top 4', unidades: '18', precio: '75.50' },
  ]);

  // Actualizar los valores aleatorios solo en el cliente después de la hidratación
  useEffect(() => {
    // Generar nuevos datos aleatorios para ventas
    const nuevasVentas = ventasItems.map((item, index) => {
      return {
        ...item,
        monto: (Math.random() * 200 + 20).toFixed(2)
      };
    });
    
    // Generar nuevos datos aleatorios para productos top
    const nuevosProductos = productosTop.map((item, index) => {
      return {
        ...item,
        unidades: Math.round(Math.random() * 50 + 10).toString(),
        precio: (Math.random() * 100 + 50).toFixed(2)
      };
    });
    
    setVentasItems(nuevasVentas);
    setProductosTop(nuevosProductos);
  }, []);

  return (
    <DashboardLayout titulo="Dashboard Emprendedor" rol="emprendedor">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarjeta de bienvenida */}
        <div className="md:col-span-3 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <h2 className="text-2xl font-semibold text-[#2E4057] mb-2">¡Bienvenido a tu Panel de Emprendedor!</h2>
          <p className="text-[#2E4057]/70">
            Aquí podrás gestionar tus productos, revisar tus ventas y acceder a todas las herramientas para hacer crecer tu negocio.
          </p>
        </div>

        {/* Resumen de métricas */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#048BA8]/10 flex items-center justify-center text-[#048BA8]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="ml-3 font-semibold text-lg text-[#2E4057]">Ventas</h3>
          </div>
          
          <p className="text-3xl font-bold text-[#2E4057]">$1,245.80</p>
          <div className="flex items-center text-green-600 text-sm mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>15% vs mes anterior</span>
          </div>
          
          <button className="mt-4 text-sm text-[#048BA8] hover:underline cursor-pointer">
            Ver detalles
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#F18F01]/10 flex items-center justify-center text-[#F18F01]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="ml-3 font-semibold text-lg text-[#2E4057]">Productos</h3>
          </div>
          
          <p className="text-3xl font-bold text-[#2E4057]">24</p>
          <div className="flex items-center text-green-600 text-sm mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>4 nuevos este mes</span>
          </div>
          
          <button className="mt-4 text-sm text-[#048BA8] hover:underline cursor-pointer">
            Gestionar productos
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#99C24D]/10 flex items-center justify-center text-[#99C24D]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="ml-3 font-semibold text-lg text-[#2E4057]">Clientes</h3>
          </div>
          
          <p className="text-3xl font-bold text-[#2E4057]">56</p>
          <div className="flex items-center text-green-600 text-sm mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>12 nuevos este mes</span>
          </div>
          
          <button className="mt-4 text-sm text-[#048BA8] hover:underline cursor-pointer">
            Ver estadísticas
          </button>
        </div>

        {/* Últimas ventas */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <h3 className="font-semibold text-lg text-[#2E4057] mb-4">Últimas Ventas</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E1E1E8]">
              <thead>
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Cliente</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Producto</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Monto</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E1E1E8]">
                {ventasItems.map((item, index) => (
                  <tr key={index} className="hover:bg-[#F4F4F8]">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-[#2E4057]">{item.cliente}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-[#2E4057]">{item.producto}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-[#2E4057]">${item.monto}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                        item.estado === 'Completada' ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button className="mt-4 text-sm text-[#048BA8] hover:underline cursor-pointer">
            Ver todas las ventas
          </button>
        </div>

        {/* Productos más vendidos */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <h3 className="font-semibold text-lg text-[#2E4057] mb-4">Productos Más Vendidos</h3>
          
          <div className="space-y-4">
            {productosTop.map((item, index) => (
              <div key={index} className="flex items-center p-3 bg-[#F4F4F8] rounded-lg">
                <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-[#048BA8]">
                  <span className="font-semibold text-sm">{index + 1}</span>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-[#2E4057] font-medium">{item.nombre}</p>
                  <p className="text-xs text-[#2E4057]/60">{item.unidades} unidades vendidas</p>
                </div>
                <div className="text-[#2E4057] font-semibold">
                  ${item.precio}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="md:col-span-3 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <h3 className="font-semibold text-lg text-[#2E4057] mb-4">Acciones Rápidas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-[#F4F4F8] hover:bg-[#E1E1E8] transition-colors p-4 rounded-lg flex flex-col items-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#048BA8]/10 flex items-center justify-center text-[#048BA8] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-[#2E4057] text-sm font-medium">Añadir Producto</span>
            </button>
            
            <button className="bg-[#F4F4F8] hover:bg-[#E1E1E8] transition-colors p-4 rounded-lg flex flex-col items-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#F18F01]/10 flex items-center justify-center text-[#F18F01] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <span className="text-[#2E4057] text-sm font-medium">Nueva Campaña</span>
            </button>
            
            <button className="bg-[#F4F4F8] hover:bg-[#E1E1E8] transition-colors p-4 rounded-lg flex flex-col items-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#99C24D]/10 flex items-center justify-center text-[#99C24D] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-[#2E4057] text-sm font-medium">Ver Informes</span>
            </button>
            
            <button className="bg-[#F4F4F8] hover:bg-[#E1E1E8] transition-colors p-4 rounded-lg flex flex-col items-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#2E4057]/10 flex items-center justify-center text-[#2E4057] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-[#2E4057] text-sm font-medium">Configuración</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 