'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AdministradorDashboardPage() {
  // Estado para almacenar los valores de ventas que se generarán en el cliente
  const [ventasRecientes, setVentasRecientes] = useState([
    { id: '#ORD-2023001', cliente: 'Cliente 1', fecha: '', monto: '0.00', estado: 'Pendiente' },
    { id: '#ORD-2023002', cliente: 'Cliente 2', fecha: '', monto: '0.00', estado: 'Completada' },
    { id: '#ORD-2023003', cliente: 'Cliente 3', fecha: '', monto: '0.00', estado: 'En proceso' },
    { id: '#ORD-2023004', cliente: 'Cliente 4', fecha: '', monto: '0.00', estado: 'Pendiente' },
    { id: '#ORD-2023005', cliente: 'Cliente 5', fecha: '', monto: '0.00', estado: 'Completada' },
  ]);
  
  // Generar los valores aleatorios solo cuando estamos en el cliente (después de la hidratación)
  useEffect(() => {
    const fechaActual = new Date().toLocaleDateString();
    const nuevasVentas = ventasRecientes.map((venta, index) => {
      return {
        ...venta,
        fecha: fechaActual,
        monto: (Math.random() * 300 + 50).toFixed(2),
        estado: index % 3 === 0 ? 'Pendiente' : index % 3 === 1 ? 'Completada' : 'En proceso'
      };
    });
    
    setVentasRecientes(nuevasVentas);
  }, []);
  
  return (
    <DashboardLayout titulo="Dashboard Administrador" rol="administrador">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resumen general */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Resumen General</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F4F4F8] rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-[#048BA8]/10 flex items-center justify-center text-[#048BA8]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm text-[#2E4057]/60">Usuarios</h4>
                  <p className="text-2xl font-semibold text-[#2E4057]">156</p>
                </div>
              </div>
              <div className="mt-2 text-sm text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>12% más este mes</span>
              </div>
            </div>
            
            <div className="bg-[#F4F4F8] rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-[#F18F01]/10 flex items-center justify-center text-[#F18F01]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm text-[#2E4057]/60">Emprendimientos</h4>
                  <p className="text-2xl font-semibold text-[#2E4057]">42</p>
                </div>
              </div>
              <div className="mt-2 text-sm text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>8% más este mes</span>
              </div>
            </div>
            
            <div className="bg-[#F4F4F8] rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-[#99C24D]/10 flex items-center justify-center text-[#99C24D]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm text-[#2E4057]/60">Productos</h4>
                  <p className="text-2xl font-semibold text-[#2E4057]">1,289</p>
                </div>
              </div>
              <div className="mt-2 text-sm text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>24% más este mes</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#2E4057] mb-3">Ventas Recientes</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#E1E1E8]">
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Cliente</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Fecha</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Monto</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[#2E4057]/60 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#E1E1E8]">
                  {ventasRecientes.map((venta, index) => (
                    <tr key={index} className="hover:bg-[#F4F4F8]">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#2E4057]">{venta.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-[#2E4057]">{venta.cliente}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-[#2E4057]/70">{venta.fecha}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-[#2E4057]">${venta.monto}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          venta.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                          venta.estado === 'Completada' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {venta.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Panel de actividad reciente */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Actividad Reciente</h2>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="flex items-start pb-4 border-b border-[#E1E1E8] last:border-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                  item % 4 === 0 ? 'bg-[#048BA8]' : 
                  item % 4 === 1 ? 'bg-[#F18F01]' : 
                  item % 4 === 2 ? 'bg-[#99C24D]' : 
                  'bg-[#2E4057]'
                }`}>
                  {item % 4 === 0 ? 'U' : 
                   item % 4 === 1 ? 'E' : 
                   item % 4 === 2 ? 'P' : 
                   'A'}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-[#2E4057]">
                    {item % 4 === 0 ? 'Nuevo usuario registrado' : 
                     item % 4 === 1 ? 'Nuevo emprendimiento creado' : 
                     item % 4 === 2 ? 'Nuevo producto añadido' : 
                     'Actualización del sistema'}
                  </p>
                  <p className="text-xs text-[#2E4057]/60 mt-1">Hace {item * 10} minutos</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-4 text-sm text-[#048BA8] hover:underline cursor-pointer">
            Ver toda la actividad
          </button>
        </div>
        
        {/* Tareas pendientes */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#2E4057]">Tareas Pendientes</h2>
            <button className="text-sm bg-[#048BA8] text-white px-3 py-1 rounded-md hover:bg-[#048BA8]/90 cursor-pointer">
              + Nueva Tarea
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {title: "Verificaciones de usuarios", count: 12, color: "#048BA8"},
              {title: "Revisión de emprendimientos", count: 5, color: "#F18F01"},
              {title: "Reportes mensuales", count: 3, color: "#99C24D"}
            ].map((task, idx) => (
              <div key={idx} className="bg-[#F4F4F8] rounded-lg p-4 border border-[#E1E1E8]">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-[#2E4057]">{task.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full" style={{backgroundColor: `${task.color}20`, color: task.color}}>
                    {task.count} pendientes
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {Array.from({length: 3}).map((_, i) => (
                    <div key={i} className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-[#048BA8] rounded border-gray-300 focus:ring-[#048BA8]" />
                      <span className="ml-2 text-sm text-[#2E4057]">
                        Tarea {i+1} - {task.title.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 text-sm text-[#048BA8] hover:underline cursor-pointer">
                  Ver todas
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 