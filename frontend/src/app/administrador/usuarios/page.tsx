'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Datos de ejemplo para usuarios
const usuariosIniciales = [
  { 
    id: 1, 
    nombre: 'Juan Pérez', 
    email: 'juan.perez@example.com', 
    tipo: 'cliente', 
    fechaRegistro: '2023-05-12', 
    estado: 'activo' 
  },
  { 
    id: 2, 
    nombre: 'María López', 
    email: 'maria.lopez@example.com', 
    tipo: 'emprendedor', 
    fechaRegistro: '2023-06-15', 
    estado: 'activo' 
  },
  { 
    id: 3, 
    nombre: 'Carlos Rodríguez', 
    email: 'carlos.rodriguez@example.com', 
    tipo: 'administrador', 
    fechaRegistro: '2023-01-10', 
    estado: 'activo' 
  },
  { 
    id: 4, 
    nombre: 'Ana García', 
    email: 'ana.garcia@example.com', 
    tipo: 'cliente', 
    fechaRegistro: '2023-08-05', 
    estado: 'inactivo' 
  },
  { 
    id: 5, 
    nombre: 'Roberto Fernández', 
    email: 'roberto.fernandez@example.com', 
    tipo: 'emprendedor', 
    fechaRegistro: '2023-07-20', 
    estado: 'activo' 
  },
  { 
    id: 6, 
    nombre: 'Laura Martínez', 
    email: 'laura.martinez@example.com', 
    tipo: 'cliente', 
    fechaRegistro: '2023-09-02', 
    estado: 'activo' 
  },
  { 
    id: 7, 
    nombre: 'Pedro Sánchez', 
    email: 'pedro.sanchez@example.com', 
    tipo: 'emprendedor', 
    fechaRegistro: '2023-04-25', 
    estado: 'pendiente' 
  },
  { 
    id: 8, 
    nombre: 'Carmen Díaz', 
    email: 'carmen.diaz@example.com', 
    tipo: 'cliente', 
    fechaRegistro: '2023-10-11', 
    estado: 'activo' 
  },
  { 
    id: 9, 
    nombre: 'Miguel Torres', 
    email: 'miguel.torres@example.com', 
    tipo: 'cliente', 
    fechaRegistro: '2023-08-15', 
    estado: 'activo' 
  },
  { 
    id: 10, 
    nombre: 'Sofía Ruiz', 
    email: 'sofia.ruiz@example.com', 
    tipo: 'emprendedor', 
    fechaRegistro: '2023-09-20', 
    estado: 'inactivo' 
  },
];

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<number | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;
  const [menuColapsado, setMenuColapsado] = useState(false);
  
  // Filtrar usuarios según criterios
  const usuariosFiltrados = usuarios.filter(user => {
    const coincideTipo = filtroTipo === 'todos' || user.tipo === filtroTipo;
    const coincideEstado = filtroEstado === 'todos' || user.estado === filtroEstado;
    const coincideBusqueda = user.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase()) || 
                           user.email.toLowerCase().includes(filtroBusqueda.toLowerCase());
    return coincideTipo && coincideEstado && coincideBusqueda;
  });
  
  // Calcular el total de páginas
  const totalPaginas = Math.ceil(usuariosFiltrados.length / elementosPorPagina);
  
  // Obtener los usuarios de la página actual
  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );
  
  // Cambiar estado de un usuario
  const cambiarEstado = (id: number, nuevoEstado: string) => {
    setUsuarios(usuarios.map(user => 
      user.id === id ? { ...user, estado: nuevoEstado } : user
    ));
  };
  
  // Cambiar rol de un usuario
  const cambiarTipo = (id: number, nuevoTipo: string) => {
    setUsuarios(usuarios.map(user => 
      user.id === id ? { ...user, tipo: nuevoTipo } : user
    ));
  };
  
  // Ver detalles de un usuario
  const verDetalles = (id: number) => {
    setUsuarioSeleccionado(id);
  };
  
  // Cerrar modal de detalles
  const cerrarDetalles = () => {
    setUsuarioSeleccionado(null);
  };
  
  // Cambiar página
  const cambiarPagina = (pagina: number) => {
    setPaginaActual(pagina);
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
  
  // Renderizar tipo de usuario con color correspondiente
  const renderTipo = (tipo: string) => {
    switch(tipo) {
      case 'cliente':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Cliente</span>;
      case 'emprendedor':
        return <span className="px-2 py-1 bg-[#F18F01] bg-opacity-20 text-[#F18F01] rounded-full text-xs font-medium">Emprendedor</span>;
      case 'administrador':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Administrador</span>;
      default:
        return <span>{tipo}</span>;
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
            <Link href="/administrador/usuarios" className="flex items-center p-3 rounded-lg bg-[#048BA8] text-white">
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
          <h1 className="text-2xl font-bold text-[#2E4057]">Gestión de Usuarios</h1>
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
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="filtroTipo" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuario</label>
                <select
                  id="filtroTipo"
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="todos">Todos</option>
                  <option value="cliente">Cliente</option>
                  <option value="emprendedor">Emprendedor</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="filtroEstado" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  id="filtroEstado"
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
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
                  placeholder="Nombre o email"
                  value={filtroBusqueda}
                  onChange={(e) => setFiltroBusqueda(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-[#048BA8] text-white px-4 py-2 rounded-md hover:bg-[#036d84] transition-colors">
                Exportar Datos
              </button>
            </div>
          </div>
          
          {/* Resumen de usuarios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="text-gray-500 text-sm font-medium">Clientes</h3>
              <p className="text-3xl font-bold text-[#2E4057]">{usuarios.filter(u => u.tipo === 'cliente').length}</p>
              <p className="text-sm text-gray-500 mt-2">
                {usuarios.filter(u => u.tipo === 'cliente' && u.estado === 'activo').length} activos
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#F18F01]">
              <h3 className="text-gray-500 text-sm font-medium">Emprendedores</h3>
              <p className="text-3xl font-bold text-[#2E4057]">{usuarios.filter(u => u.tipo === 'emprendedor').length}</p>
              <p className="text-sm text-gray-500 mt-2">
                {usuarios.filter(u => u.tipo === 'emprendedor' && u.estado === 'activo').length} activos
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <h3 className="text-gray-500 text-sm font-medium">Administradores</h3>
              <p className="text-3xl font-bold text-[#2E4057]">{usuarios.filter(u => u.tipo === 'administrador').length}</p>
              <p className="text-sm text-gray-500 mt-2">
                {usuarios.filter(u => u.tipo === 'administrador' && u.estado === 'activo').length} activos
              </p>
            </div>
          </div>
          
          {/* Tabla de usuarios */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
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
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usuariosPaginados.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderTipo(user.tipo)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.fechaRegistro}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderEstado(user.estado)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button 
                          onClick={() => verDetalles(user.id)}
                          className="text-[#048BA8] hover:text-[#036d84]"
                        >
                          Ver
                        </button>
                        
                        {user.estado === 'activo' ? (
                          <button 
                            onClick={() => cambiarEstado(user.id, 'inactivo')}
                            className="text-red-600 hover:text-red-800"
                          >
                            Desactivar
                          </button>
                        ) : (
                          <button 
                            onClick={() => cambiarEstado(user.id, 'activo')}
                            className="text-green-600 hover:text-green-800"
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
          {usuarioSeleccionado && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  {(() => {
                    const user = usuarios.find(u => u.id === usuarioSeleccionado);
                    if (!user) return null;
                    
                    return (
                      <>
                        <div className="flex justify-between items-start mb-6">
                          <h2 className="text-2xl font-bold text-[#2E4057]">{user.nombre}</h2>
                          <button
                            onClick={cerrarDetalles}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Información Personal</h3>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{user.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Rol en la plataforma</p>
                                <div className="mt-1">{renderTipo(user.tipo)}</div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Fecha de registro</p>
                                <p className="font-medium">{user.fechaRegistro}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Estado</p>
                                <div className="mt-1">{renderEstado(user.estado)}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Actividad Reciente</h3>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-gray-500">Último inicio de sesión</p>
                                <p className="font-medium">2023-11-05 14:32:45</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Dirección IP</p>
                                <p className="font-medium">192.168.1.45</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Transacciones realizadas</p>
                                <p className="font-medium">{user.tipo === 'cliente' ? '12' : user.tipo === 'emprendedor' ? '45' : '0'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Opciones de gestión */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                          <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Cambiar rol de usuario</h3>
                          <div className="flex flex-wrap gap-3">
                            <button 
                              onClick={() => cambiarTipo(user.id, 'cliente')}
                              className={`px-4 py-2 rounded-md ${user.tipo === 'cliente' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                            >
                              Cliente
                            </button>
                            <button 
                              onClick={() => cambiarTipo(user.id, 'emprendedor')}
                              className={`px-4 py-2 rounded-md ${user.tipo === 'emprendedor' ? 'bg-[#F18F01] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                            >
                              Emprendedor
                            </button>
                            <button 
                              onClick={() => cambiarTipo(user.id, 'administrador')}
                              className={`px-4 py-2 rounded-md ${user.tipo === 'administrador' ? 'bg-purple-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                            >
                              Administrador
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-4">
                          <button 
                            onClick={cerrarDetalles}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          >
                            Cerrar
                          </button>
                          
                          <button 
                            className="px-4 py-2 bg-[#048BA8] text-white rounded-md hover:bg-[#036d84]"
                          >
                            Enviar mensaje
                          </button>
                          
                          {user.estado === 'activo' ? (
                            <button 
                              onClick={() => { cambiarEstado(user.id, 'inactivo'); cerrarDetalles(); }}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                              Desactivar usuario
                            </button>
                          ) : (
                            <button 
                              onClick={() => { cambiarEstado(user.id, 'activo'); cerrarDetalles(); }}
                              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                              Activar usuario
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
        </main>
      </div>
    </div>
  );
} 