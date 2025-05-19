'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';

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
        return <span className="px-2 py-1 bg-[#F18F01] bg-opacity-40 text-white rounded-full text-xs font-medium">Emprendedor</span>;
      case 'administrador':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Administrador</span>;
      default:
        return <span>{tipo}</span>;
    }
  };

  return (
    <DashboardLayout titulo="Gestión de Usuarios" rol="administrador">
      {/* Contenido principal */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
        {/* Filtros y búsqueda */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <div>
              <label htmlFor="filtroTipo" className="block text-sm font-medium text-[#2E4057]/70 mb-1">Tipo de Usuario</label>
              <select
                id="filtroTipo"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full rounded-lg border border-[#E1E1E8] p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
              >
                <option value="todos">Todos</option>
                <option value="cliente">Cliente</option>
                <option value="emprendedor">Emprendedor</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
            <div>
              <label htmlFor="filtroEstado" className="block text-sm font-medium text-[#2E4057]/70 mb-1">Estado</label>
              <select
                id="filtroEstado"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full rounded-lg border border-[#E1E1E8] p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
              >
                <option value="todos">Todos</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="pendiente">Pendiente</option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-64">
            <label htmlFor="busqueda" className="block text-sm font-medium text-[#2E4057]/70 mb-1">Buscar Usuario</label>
            <div className="relative">
              <input
                type="text"
                id="busqueda"
                placeholder="Nombre o email"
                value={filtroBusqueda}
                onChange={(e) => setFiltroBusqueda(e.target.value)}
                className="w-full rounded-lg border border-[#E1E1E8] p-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-3 top-3 text-[#2E4057]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Tabla de usuarios */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E1E1E8]">
            <thead>
              <tr className="bg-[#F4F4F8]">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Tipo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Registro</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E1E1E8]">
              {usuariosPaginados.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-[#F4F4F8] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E4057]">#{usuario.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">{usuario.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">{usuario.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{renderTipo(usuario.tipo)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]/70">{usuario.fechaRegistro}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{renderEstado(usuario.estado)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button
                      onClick={() => verDetalles(usuario.id)}
                      className="text-[#048BA8] hover:text-[#048BA8]/80 transition-colors mr-3"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => cambiarEstado(usuario.id, usuario.estado === 'activo' ? 'inactivo' : 'activo')}
                      className={`${
                        usuario.estado === 'activo' ? 'text-red-500 hover:text-red-600' : 'text-green-500 hover:text-green-600'
                      } transition-colors`}
                    >
                      {usuario.estado === 'activo' ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="flex justify-center mt-6">
            <nav className="inline-flex rounded-md shadow-sm isolate">
              <button
                onClick={() => cambiarPagina(Math.max(1, paginaActual - 1))}
                disabled={paginaActual === 1}
                className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-l-md ${
                  paginaActual === 1
                    ? 'bg-[#F4F4F8] text-[#2E4057]/40 cursor-not-allowed'
                    : 'bg-white text-[#2E4057] hover:bg-[#F4F4F8] cursor-pointer'
                } border border-[#E1E1E8]`}
              >
                Anterior
              </button>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                <button
                  key={pagina}
                  onClick={() => cambiarPagina(pagina)}
                  className={`relative inline-flex items-center px-3 py-2 text-sm font-medium ${
                    paginaActual === pagina
                      ? 'bg-[#048BA8] text-white z-10'
                      : 'bg-white text-[#2E4057] hover:bg-[#F4F4F8]'
                  } border border-[#E1E1E8] -ml-px`}
                >
                  {pagina}
                </button>
              ))}
              <button
                onClick={() => cambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
                disabled={paginaActual === totalPaginas}
                className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-r-md ${
                  paginaActual === totalPaginas
                    ? 'bg-[#F4F4F8] text-[#2E4057]/40 cursor-not-allowed'
                    : 'bg-white text-[#2E4057] hover:bg-[#F4F4F8] cursor-pointer'
                } border border-[#E1E1E8] -ml-px`}
              >
                Siguiente
              </button>
            </nav>
          </div>
        )}
      </div>
      
      {/* Modal de detalles de usuario */}
      {usuarioSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#2E4057]">Detalles del Usuario</h3>
                <button onClick={cerrarDetalles} className="text-[#2E4057]/60 hover:text-[#2E4057]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Información del usuario */}
              {(() => {
                const usuario = usuarios.find(u => u.id === usuarioSeleccionado);
                if (!usuario) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-[#048BA8] flex items-center justify-center text-white text-2xl font-medium">
                        {usuario.nombre.charAt(0)}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-[#2E4057]/60">ID</p>
                      <p className="text-[#2E4057] font-medium">#{usuario.id}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-[#2E4057]/60">Nombre</p>
                      <p className="text-[#2E4057] font-medium">{usuario.nombre}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-[#2E4057]/60">Email</p>
                      <p className="text-[#2E4057] font-medium">{usuario.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-[#2E4057]/60">Tipo</p>
                      <div className="mt-1">{renderTipo(usuario.tipo)}</div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-[#2E4057]/60">Fecha de Registro</p>
                      <p className="text-[#2E4057] font-medium">{usuario.fechaRegistro}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-[#2E4057]/60">Estado</p>
                      <div className="mt-1">{renderEstado(usuario.estado)}</div>
                    </div>
                    
                    <div className="pt-4 border-t border-[#E1E1E8] flex justify-between">
                      <div>
                        <label htmlFor="cambiarTipo" className="block text-sm text-[#2E4057]/60 mb-1">Cambiar Tipo</label>
                        <select
                          id="cambiarTipo"
                          value={usuario.tipo}
                          onChange={(e) => cambiarTipo(usuario.id, e.target.value)}
                          className="rounded-lg border border-[#E1E1E8] p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                        >
                          <option value="cliente">Cliente</option>
                          <option value="emprendedor">Emprendedor</option>
                          <option value="administrador">Administrador</option>
                        </select>
                      </div>
                      
                      <button
                        onClick={() => {
                          cambiarEstado(usuario.id, usuario.estado === 'activo' ? 'inactivo' : 'activo');
                          cerrarDetalles();
                        }}
                        className={`px-4 py-2 rounded-lg ${
                          usuario.estado === 'activo'
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {usuario.estado === 'activo' ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
} 