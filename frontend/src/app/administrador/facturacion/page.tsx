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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-[#2E4057] text-white transition-all duration-300 ${menuColapsado ? 'w-20' : 'w-64'}`}>
        <div className="flex items-center justify-between p-4 border-b border-[#048BA8]/30">
          {!menuColapsado && (
            <h2 className="text-xl font-semibold">Panel Admin</h2>
          )}
          <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-[#048BA8]/20">
            {menuColapsado ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>
        
        <nav className="mt-6">
          <div className="px-4 py-2">
            <Link href="/administrador/dashboard" className="flex items-center p-3 rounded-lg hover:bg-[#048BA8]/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              {!menuColapsado && <span className="ml-4">Dashboard</span>}
            </Link>
          </div>
          
          <div className="px-4 py-2">
            <Link href="/administrador/emprendimientos" className="flex items-center p-3 rounded-lg hover:bg-[#048BA8]/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {!menuColapsado && <span className="ml-4">Emprendimientos</span>}
            </Link>
          </div>
          
          <div className="px-4 py-2">
            <Link href="/administrador/usuarios" className="flex items-center p-3 rounded-lg hover:bg-[#048BA8]/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {!menuColapsado && <span className="ml-4">Usuarios</span>}
            </Link>
          </div>
          
          <div className="px-4 py-2">
            <Link href="/administrador/roles" className="flex items-center p-3 rounded-lg hover:bg-[#048BA8]/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {!menuColapsado && <span className="ml-4">Roles</span>}
            </Link>
          </div>
          
          <div className="px-4 py-2">
            <Link href="/administrador/facturacion" className="flex items-center p-3 rounded-lg bg-[#048BA8] text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {!menuColapsado && <span className="ml-4">Facturación</span>}
            </Link>
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full border-t border-[#048BA8]/30 p-4">
          <Link href="/" className="flex items-center p-3 rounded-lg hover:bg-[#048BA8]/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!menuColapsado && <span className="ml-4">Cerrar Sesión</span>}
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#2E4057]">Facturación y Pagos</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-[#048BA8] text-white flex items-center justify-center">
              <span className="font-semibold">A</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#2E4057] mb-6">Control de Facturación y Pagos</h1>
            
            {/* Tarjetas de resumen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2E4057]">
                <h3 className="text-gray-500 text-sm font-medium">Total Facturado</h3>
                <p className="text-3xl font-bold text-[#2E4057]">${totalFacturado.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {facturas.length} facturas emitidas
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-gray-500 text-sm font-medium">Total Pagado</h3>
                <p className="text-3xl font-bold text-green-600">${totalPagado.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {facturas.filter(f => f.estado === 'pagado').length} facturas pagadas
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-gray-500 text-sm font-medium">Pendiente de Pago</h3>
                <p className="text-3xl font-bold text-yellow-600">${totalPendiente.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {facturas.filter(f => f.estado === 'pendiente').length} facturas pendientes
                </p>
              </div>
            </div>
            
            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Distribución por Concepto</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={datosPorConcepto}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {datosPorConcepto.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Ingresos Mensuales</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datosPorMes}>
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
            </div>
            
            {/* Filtros y búsqueda */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <div>
                  <label htmlFor="filtroEstado" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    id="filtroEstado"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  >
                    <option value="todos">Todos</option>
                    <option value="pagado">Pagado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="filtroConcepto" className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
                  <select
                    id="filtroConcepto"
                    value={filtroConcepto}
                    onChange={(e) => setFiltroConcepto(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  >
                    <option value="todos">Todos</option>
                    <option value="compra">Compras</option>
                    <option value="publicidad">Servicios de Publicidad</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                  <input
                    type="date"
                    id="fechaInicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                  <input
                    type="date"
                    id="fechaFin"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                  <input
                    type="text"
                    id="busqueda"
                    placeholder="Nº Factura o Cliente"
                    value={filtroBusqueda}
                    onChange={(e) => setFiltroBusqueda(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
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
            
            {/* Tabla de facturas */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nº Factura
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
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
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Concepto
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {facturasPaginadas.map((factura) => (
                      <tr key={factura.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E4057]">
                          {factura.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {factura.cliente}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          ${factura.monto.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {factura.fechaEmision}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderEstado(factura.estado)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {factura.concepto}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => verDetalles(factura.id)}
                            className="text-[#048BA8] hover:text-[#036d84]"
                          >
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Paginación */}
            {totalPaginas > 1 && (
              <div className="flex justify-center mb-8">
                <nav className="flex items-center">
                  <button
                    onClick={() => cambiarPagina(Math.max(1, paginaActual - 1))}
                    disabled={paginaActual === 1}
                    className={`px-3 py-1 rounded-l-md border ${paginaActual === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Anterior
                  </button>
                  
                  {Array.from({ length: totalPaginas }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => cambiarPagina(i + 1)}
                      className={`px-3 py-1 border-t border-b ${paginaActual === i + 1 ? 'bg-[#048BA8] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => cambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
                    disabled={paginaActual === totalPaginas}
                    className={`px-3 py-1 rounded-r-md border ${paginaActual === totalPaginas ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Siguiente
                  </button>
                </nav>
              </div>
            )}
            
            {/* Modal de detalles */}
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
                              <p className="text-gray-500">{factura.fechaEmision}</p>
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
                          
                          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-lg font-semibold text-[#2E4057] mb-2">Información del Cliente</h3>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium">{factura.cliente}</p>
                                <p className="text-sm text-gray-500">clientetest@example.com</p>
                                <p className="text-sm text-gray-500">+56 9 1234 5678</p>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-semibold text-[#2E4057] mb-2">Estado del Pago</h3>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="mb-2">{renderEstado(factura.estado)}</div>
                                {factura.estado === 'pagado' ? (
                                  <>
                                    <p className="text-sm text-gray-500">Fecha de pago: 2023-11-02</p>
                                    <p className="text-sm text-gray-500">Método: Tarjeta de crédito</p>
                                    <p className="text-sm text-gray-500">Transacción: TRX-98765432</p>
                                  </>
                                ) : (
                                  <p className="text-sm text-gray-500">Vencimiento: 2023-12-03</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold text-[#2E4057] mb-2">Detalle de Factura</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="mb-4">
                                <h4 className="font-medium mb-2">Concepto</h4>
                                <p className="text-gray-700">{factura.concepto}</p>
                              </div>
                              
                              <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between mb-2">
                                  <span className="font-medium">Subtotal:</span>
                                  <span>${(factura.monto * 0.81).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="font-medium">IVA (19%):</span>
                                  <span>${(factura.monto * 0.19).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-[#2E4057]">
                                  <span>Total:</span>
                                  <span>${factura.monto.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-4">
                            <button 
                              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                              Descargar PDF
                            </button>
                            <button 
                              className="px-4 py-2 bg-[#048BA8] text-white rounded-md hover:bg-[#036d84]"
                            >
                              Enviar por Email
                            </button>
                            {factura.estado === 'pendiente' && (
                              <button 
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                              >
                                Marcar como Pagado
                              </button>
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 