'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Datos de ejemplo para emprendimientos
const emprendimientosIniciales = [
  { 
    id: 1, 
    nombre: 'Eco Soluciones', 
    tipo: 'Tecnología Limpia', 
    fecha: '2023-08-15', 
    estado: 'activo',
    ventas: 25600,
    productos: 12
  },
  { 
    id: 2, 
    nombre: 'Artesanías Locales', 
    tipo: 'Artesanía', 
    fecha: '2023-07-22', 
    estado: 'activo',
    ventas: 8900,
    productos: 45
  },
  { 
    id: 3, 
    nombre: 'TechMakers', 
    tipo: 'Desarrollo Software', 
    fecha: '2023-09-01', 
    estado: 'inactivo',
    ventas: 0,
    productos: 3
  },
  { 
    id: 4, 
    nombre: 'Gastro Fusion', 
    tipo: 'Alimentación', 
    fecha: '2023-10-05', 
    estado: 'pendiente',
    ventas: 0,
    productos: 0
  },
  { 
    id: 5, 
    nombre: 'Moda Sustentable', 
    tipo: 'Textil', 
    fecha: '2023-09-18', 
    estado: 'activo',
    ventas: 12300,
    productos: 27
  },
  { 
    id: 6, 
    nombre: 'EduTech', 
    tipo: 'Educación', 
    fecha: '2023-11-02', 
    estado: 'pendiente',
    ventas: 0,
    productos: 0
  },
  { 
    id: 7, 
    nombre: 'Agro Innovación', 
    tipo: 'Agricultura', 
    fecha: '2023-08-30', 
    estado: 'activo',
    ventas: 18500,
    productos: 8
  },
  { 
    id: 8, 
    nombre: 'FinTech Solutions', 
    tipo: 'Servicios Financieros', 
    fecha: '2023-10-15', 
    estado: 'activo',
    ventas: 32100,
    productos: 5
  },
];

export default function GestionEmprendimientos() {
  const [emprendimientos, setEmprendimientos] = useState(emprendimientosIniciales);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [emprendimientoSeleccionado, setEmprendimientoSeleccionado] = useState<number | null>(null);
  const [menuColapsado, setMenuColapsado] = useState(false);
  
  // Filtrar emprendimientos según criterios
  const emprendimientosFiltrados = emprendimientos.filter(emp => {
    const coincideEstado = filtroEstado === 'todos' || emp.estado === filtroEstado;
    const coincideBusqueda = emp.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase()) || 
                           emp.tipo.toLowerCase().includes(filtroBusqueda.toLowerCase());
    return coincideEstado && coincideBusqueda;
  });
  
  // Cambiar estado de un emprendimiento
  const cambiarEstado = (id: number, nuevoEstado: string) => {
    setEmprendimientos(emprendimientos.map(emp => 
      emp.id === id ? { ...emp, estado: nuevoEstado } : emp
    ));
  };
  
  // Ver detalles de un emprendimiento
  const verDetalles = (id: number) => {
    setEmprendimientoSeleccionado(id);
  };
  
  // Cerrar modal de detalles
  const cerrarDetalles = () => {
    setEmprendimientoSeleccionado(null);
  };
  
  // Renderizar estado con color correspondiente
  const renderEstado = (estado: string) => {
    switch(estado) {
      case 'activo':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Activo</span>;
      case 'inactivo':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Inactivo</span>;
      case 'pendiente':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pendiente</span>;
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
            <Link href="/administrador/emprendimientos" className="flex items-center p-3 rounded-lg bg-[#048BA8] text-white">
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
            <Link href="/administrador/facturacion" className="flex items-center p-3 rounded-lg hover:bg-[#048BA8]/20 transition-colors">
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
          <h1 className="text-2xl font-bold text-[#2E4057]">Gestión de Emprendimientos</h1>
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
          {/* Filtros y búsqueda */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label htmlFor="filtroEstado" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  id="filtroEstado"
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                >
                  <option value="todos">Todos</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="pendiente">Pendiente</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                <input
                  type="text"
                  id="busqueda"
                  placeholder="Nombre o tipo de negocio"
                  value={filtroBusqueda}
                  onChange={(e) => setFiltroBusqueda(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                />
              </div>
            </div>
            
            <div>
              <button className="bg-[#048BA8] text-white px-4 py-2 rounded-md hover:bg-[#036d84] transition-colors">
                Exportar Datos
              </button>
            </div>
          </div>
          
          {/* Tabla de emprendimientos */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Registro
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ventas
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Productos
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {emprendimientosFiltrados.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {emp.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.tipo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.fecha}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderEstado(emp.estado)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${emp.ventas.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.productos}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => verDetalles(emp.id)}
                          className="text-[#048BA8] hover:text-[#036d84] mr-3"
                        >
                          Ver
                        </button>
                        {emp.estado === 'pendiente' && (
                          <button
                            onClick={() => cambiarEstado(emp.id, 'activo')}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            Aprobar
                          </button>
                        )}
                        {emp.estado !== 'inactivo' && emp.estado !== 'pendiente' && (
                          <button
                            onClick={() => cambiarEstado(emp.id, 'inactivo')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Desactivar
                          </button>
                        )}
                        {emp.estado === 'inactivo' && (
                          <button
                            onClick={() => cambiarEstado(emp.id, 'activo')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Activar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Modal de detalles (si hay un emprendimiento seleccionado) */}
          {emprendimientoSeleccionado !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#2E4057]">
                      Detalles del Emprendimiento
                    </h2>
                    <button
                      onClick={cerrarDetalles}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Contenido del detalle */}
                  <div className="space-y-4">
                    {/* Aquí iría la información detallada del emprendimiento */}
                    <p className="text-gray-500">ID: {emprendimientoSeleccionado}</p>
                    <p className="text-gray-500">
                      Información completa del emprendimiento seleccionado.
                    </p>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={cerrarDetalles}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cerrar
                      </button>
                      <button
                        className="px-4 py-2 bg-[#048BA8] text-white rounded-md hover:bg-[#036d84]"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 