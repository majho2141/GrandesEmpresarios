'use client';

import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Datos de ejemplo para facturas
const facturasIniciales = [
  { 
    id: 'F-2023-001', 
    cliente: 'Juan Pérez', 
    monto: 158.75, 
    fechaEmision: '2023-11-01', 
    estado: 'pagado',
    concepto: 'Compra de productos' 
  },
  { 
    id: 'F-2023-002', 
    cliente: 'Eco Soluciones', 
    monto: 299.99, 
    fechaEmision: '2023-11-02', 
    estado: 'pagado',
    concepto: 'Servicio de publicidad premium' 
  },
  { 
    id: 'F-2023-003', 
    cliente: 'María López', 
    monto: 85.50, 
    fechaEmision: '2023-11-03', 
    estado: 'pendiente',
    concepto: 'Compra de productos' 
  },
  { 
    id: 'F-2023-004', 
    cliente: 'TechMakers', 
    monto: 199.99, 
    fechaEmision: '2023-11-05', 
    estado: 'pagado',
    concepto: 'Servicio de publicidad estándar' 
  },
  { 
    id: 'F-2023-005', 
    cliente: 'Carmen Díaz', 
    monto: 125.30, 
    fechaEmision: '2023-11-08', 
    estado: 'pagado',
    concepto: 'Compra de productos' 
  },
  { 
    id: 'F-2023-006', 
    cliente: 'Artesanías Locales', 
    monto: 299.99, 
    fechaEmision: '2023-11-10', 
    estado: 'pendiente',
    concepto: 'Servicio de publicidad premium' 
  },
  { 
    id: 'F-2023-007', 
    cliente: 'Pedro Sánchez', 
    monto: 45.75, 
    fechaEmision: '2023-11-12', 
    estado: 'pagado',
    concepto: 'Compra de productos' 
  },
  { 
    id: 'F-2023-008', 
    cliente: 'FinTech Solutions', 
    monto: 399.99, 
    fechaEmision: '2023-11-15', 
    estado: 'pendiente',
    concepto: 'Servicio de publicidad premium plus' 
  },
  { 
    id: 'F-2023-009', 
    cliente: 'Roberto Fernández', 
    monto: 178.25, 
    fechaEmision: '2023-11-17', 
    estado: 'pagado',
    concepto: 'Compra de productos' 
  },
  { 
    id: 'F-2023-010', 
    cliente: 'Moda Sustentable', 
    monto: 199.99, 
    fechaEmision: '2023-11-20', 
    estado: 'pagado',
    concepto: 'Servicio de publicidad estándar' 
  },
];

// Datos para gráficos
const datosPorConcepto = [
  { name: 'Compras', value: 593.55 },
  { name: 'Publicidad Estándar', value: 399.98 },
  { name: 'Publicidad Premium', value: 599.98 },
  { name: 'Publicidad Premium Plus', value: 399.99 },
];

const datosPorMes = [
  { name: 'Ene', ventas: 4000 },
  { name: 'Feb', ventas: 3000 },
  { name: 'Mar', ventas: 5000 },
  { name: 'Abr', ventas: 2780 },
  { name: 'May', ventas: 1890 },
  { name: 'Jun', ventas: 2390 },
  { name: 'Jul', ventas: 3490 },
  { name: 'Ago', ventas: 4000 },
  { name: 'Sep', ventas: 3200 },
  { name: 'Oct', ventas: 2800 },
  { name: 'Nov', ventas: 1993.50 },
  { name: 'Dic', ventas: 0 },
];

const COLORS = ['#2E4057', '#048BA8', '#F18F01', '#99C24D'];

export default function GestionFacturacion() {
  const [facturas, setFacturas] = useState(facturasIniciales);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroConcepto, setFiltroConcepto] = useState('todos');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<string | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;
  const [menuColapsado, setMenuColapsado] = useState(false);
  
  // Filtrar facturas según criterios
  const facturasFiltradas = facturas.filter(factura => {
    const coincideEstado = filtroEstado === 'todos' || factura.estado === filtroEstado;
    const coincideConcepto = filtroConcepto === 'todos' || factura.concepto.toLowerCase().includes(filtroConcepto.toLowerCase());
    const coincideFechaInicio = !fechaInicio || new Date(factura.fechaEmision) >= new Date(fechaInicio);
    const coincideFechaFin = !fechaFin || new Date(factura.fechaEmision) <= new Date(fechaFin);
    const coincideBusqueda = 
      factura.id.toLowerCase().includes(filtroBusqueda.toLowerCase()) || 
      factura.cliente.toLowerCase().includes(filtroBusqueda.toLowerCase());
    
    return coincideEstado && coincideConcepto && coincideFechaInicio && coincideFechaFin && coincideBusqueda;
  });
  
  // Calcular el total de páginas
  const totalPaginas = Math.ceil(facturasFiltradas.length / elementosPorPagina);
  
  // Obtener las facturas de la página actual
  const facturasPaginadas = facturasFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );
  
  // Ver detalles de una factura
  const verDetalles = (id: string) => {
    setFacturaSeleccionada(id);
  };
  
  // Cerrar modal de detalles
  const cerrarDetalles = () => {
    setFacturaSeleccionada(null);
  };
  
  // Cambiar página
  const cambiarPagina = (pagina: number) => {
    setPaginaActual(pagina);
  };
  
  // Calcular totales
  const totalFacturado = facturas.reduce((sum, factura) => sum + factura.monto, 0);
  const totalPendiente = facturas
    .filter(factura => factura.estado === 'pendiente')
    .reduce((sum, factura) => sum + factura.monto, 0);
  const totalPagado = facturas
    .filter(factura => factura.estado === 'pagado')
    .reduce((sum, factura) => sum + factura.monto, 0);
  
  // Renderizar estado con color correspondiente
  const renderEstado = (estado: string) => {
    switch(estado) {
      case 'pagado':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Pagado</span>;
      case 'pendiente':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pendiente</span>;
      case 'cancelado':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Cancelado</span>;
      default:
        return <span>{estado}</span>;
    }
  };

  // Toggle para el menú lateral
  const toggleMenu = () => {
    setMenuColapsado(!menuColapsado);
  };

  return (
    <DashboardLayout titulo="Facturación" rol="administrador">
      <div className="p-6">
        {/* Dashboard de Facturación */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500 mb-2">Total Facturado</h3>
            <p className="text-3xl font-bold text-[#2E4057]">${totalFacturado.toFixed(2)}</p>
            <div className="flex items-center text-sm text-green-600 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>8.2% más que el mes pasado</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500 mb-2">Total Pendiente</h3>
            <p className="text-3xl font-bold text-[#2E4057]">${totalPendiente.toFixed(2)}</p>
            <div className="flex items-center text-sm text-yellow-600 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{Math.round((totalPendiente / totalFacturado) * 100)}% del total facturado</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500 mb-2">Total Cobrado</h3>
            <p className="text-3xl font-bold text-[#2E4057]">${totalPagado.toFixed(2)}</p>
            <div className="flex items-center text-sm text-green-600 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{Math.round((totalPagado / totalFacturado) * 100)}% del total facturado</span>
            </div>
          </div>
        </div>
        
        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Facturación por Concepto</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={datosPorConcepto}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {datosPorConcepto.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Facturación Mensual</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={datosPorMes}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Bar dataKey="ventas" fill="#048BA8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Filtros y tabla de facturas */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="w-full md:w-auto">
              <label htmlFor="filtroEstado" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                id="filtroEstado"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full md:w-40"
              >
                <option value="todos">Todos</option>
                <option value="pagado">Pagado</option>
                <option value="pendiente">Pendiente</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            
            <div className="w-full md:w-auto">
              <label htmlFor="filtroConcepto" className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
              <select
                id="filtroConcepto"
                value={filtroConcepto}
                onChange={(e) => setFiltroConcepto(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full md:w-40"
              >
                <option value="todos">Todos</option>
                <option value="compra">Compras</option>
                <option value="publicidad">Publicidad</option>
              </select>
            </div>
            
            <div className="w-full md:w-auto">
              <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
              <input
                type="date"
                id="fechaInicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full md:w-40"
              />
            </div>
            
            <div className="w-full md:w-auto">
              <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
              <input
                type="date"
                id="fechaFin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full md:w-40"
              />
            </div>
            
            <div className="w-full md:w-auto md:ml-auto">
              <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <input
                type="text"
                id="busqueda"
                placeholder="ID o Cliente"
                value={filtroBusqueda}
                onChange={(e) => setFiltroBusqueda(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full md:w-60"
              />
            </div>
          </div>
          
          {/* Tabla de facturas */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Concepto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Emisión
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
                {facturasPaginadas.map((factura) => (
                  <tr key={factura.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {factura.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {factura.cliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {factura.concepto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${factura.monto.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {factura.fechaEmision}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderEstado(factura.estado)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => verDetalles(factura.id)}
                        className="text-[#048BA8] hover:text-[#036d84] mr-3"
                      >
                        Ver
                      </button>
                      {factura.estado === 'pendiente' && (
                        <button className="text-green-600 hover:text-green-800">
                          Marcar Pagado
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => cambiarPagina(Math.max(1, paginaActual - 1))}
                  disabled={paginaActual === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                    paginaActual === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Anterior</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {Array.from({ length: totalPaginas }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => cambiarPagina(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                      paginaActual === i + 1
                        ? 'z-10 bg-[#048BA8] text-white'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => cambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
                  disabled={paginaActual === totalPaginas}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                    paginaActual === totalPaginas
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Siguiente</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de detalles de factura */}
      {facturaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {(() => {
                const factura = facturas.find(f => f.id === facturaSeleccionada);
                if (!factura) return null;
                
                return (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-[#2E4057]">Factura {factura.id}</h2>
                        <p className="text-gray-500">Emitida el {factura.fechaEmision}</p>
                      </div>
                      <button
                        onClick={cerrarDetalles}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="border-t border-b border-gray-200 py-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Cliente</p>
                          <p className="font-medium">{factura.cliente}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Estado</p>
                          <div className="mt-1">{renderEstado(factura.estado)}</div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Concepto</p>
                          <p className="font-medium">{factura.concepto}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Monto Total</p>
                          <p className="font-medium text-xl">${factura.monto.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Detalles de la Factura</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span>Subtotal</span>
                            <span>${(factura.monto * 0.84).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span>IVA (16%)</span>
                            <span>${(factura.monto * 0.16).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold pt-2">
                            <span>Total</span>
                            <span>${factura.monto.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={cerrarDetalles}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cerrar
                      </button>
                      
                      {factura.estado === 'pendiente' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                          Marcar como Pagado
                        </button>
                      )}
                      
                      <button className="px-4 py-2 bg-[#048BA8] text-white rounded-md hover:bg-[#036d84]">
                        Descargar PDF
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
} 