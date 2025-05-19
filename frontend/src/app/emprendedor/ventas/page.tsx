'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import EmprendedorLayout from '@/components/layout/EmprendedorLayout';

export default function VentasEmprendedor() {
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [busqueda, setBusqueda] = useState('');

  return (
    <EmprendedorLayout titulo="Gestión de Ventas">
      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#048BA8] transition-transform hover:scale-105">
          <h3 className="text-gray-500 text-sm font-medium">Ventas Totales</h3>
          <p className="text-3xl font-bold text-[#2E4057]">$12,456</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <span className="mr-1">↑</span> 15% vs. mes anterior
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#F18F01] transition-transform hover:scale-105">
          <h3 className="text-gray-500 text-sm font-medium">Pedidos Pendientes</h3>
          <p className="text-3xl font-bold text-[#2E4057]">8</p>
          <p className="text-sm text-gray-500 mt-2">
            3 en preparación | 5 en envío
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#99C24D] transition-transform hover:scale-105">
          <h3 className="text-gray-500 text-sm font-medium">Entregados (Mes)</h3>
          <p className="text-3xl font-bold text-[#2E4057]">42</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <span className="mr-1">↑</span> 8% vs. mes anterior
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500 transition-transform hover:scale-105">
          <h3 className="text-gray-500 text-sm font-medium">Devoluciones</h3>
          <p className="text-3xl font-bold text-[#2E4057]">3</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <span className="mr-1">↓</span> -5% vs. mes anterior
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label htmlFor="filtroEstado" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              id="filtroEstado"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
            >
              <option value="todos">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="preparacion">En Preparación</option>
              <option value="enviado">Enviado</option>
              <option value="entregado">Entregado</option>
              <option value="devuelto">Devuelto</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
            <input
              type="date"
              id="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
            />
          </div>
          
          <div>
            <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
            <input
              type="date"
              id="fechaFin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
            />
          </div>
          
          <div>
            <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input
              type="text"
              id="busqueda"
              placeholder="Nº Pedido o Cliente"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Limpiar Filtros
          </button>
          <button className="bg-[#048BA8] text-white px-4 py-2 rounded-md hover:bg-[#036d84] transition-colors">
            Exportar Datos
          </button>
        </div>
      </div>
      
      {/* Tabla de pedidos */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nº Pedido
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E4057]">
                  #ORD-2023-8795
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Ana García
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15/11/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  $358.99
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    En preparación
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-[#048BA8] hover:text-[#037897]">Ver detalles</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E4057]">
                  #ORD-2023-8794
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Juan Pérez
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  14/11/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  $129.99
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Enviado
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-[#048BA8] hover:text-[#037897]">Ver detalles</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E4057]">
                  #ORD-2023-8793
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  María López
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  13/11/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  $899.99
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Enviado
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-[#048BA8] hover:text-[#037897]">Ver detalles</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E4057]">
                  #ORD-2023-8792
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Carlos Rodríguez
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  12/11/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  $49.99
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Entregado
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-[#048BA8] hover:text-[#037897]">Ver detalles</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E4057]">
                  #ORD-2023-8791
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Laura Martínez
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  11/11/2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  $1,299.99
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Entregado
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-[#048BA8] hover:text-[#037897]">Ver detalles</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Mostrando 1-5 de 42 pedidos
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