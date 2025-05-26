'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store/useAuthStore';

interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  document_id: string;
  address: string;
  enterprise_id: number | null;
  role_id: number;
  document_verified: boolean;
  is_active: boolean;
  role: {
    name: string;
    description: string;
    id: number;
  };
  enterprise: {
    name: string;
    NIT: string;
    email: string;
    phone_number: string;
    currency: string;
    description: string;
    address: string;
    id: number;
  } | null;
}

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<number | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        }
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, [token]);
  
  // Filtrar usuarios según criterios
  const usuariosFiltrados = usuarios.filter(user => {
    const coincideTipo = filtroTipo === 'todos' || user.role.name.toLowerCase() === filtroTipo;
    const coincideEstado = filtroEstado === 'todos' || (filtroEstado === 'activo' ? user.is_active : !user.is_active);
    const coincideBusqueda = user.name.toLowerCase().includes(filtroBusqueda.toLowerCase()) || 
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
  const cambiarEstado = async (id: number, nuevoEstado: boolean) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/users/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_active: nuevoEstado })
      });
      
      if (response.ok) {
        setUsuarios(usuarios.map(user => 
          user.id === id ? { ...user, is_active: nuevoEstado } : user
        ));
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
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
  const renderEstado = (isActive: boolean) => {
    return isActive ? 
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Activo</span> :
      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Inactivo</span>;
  };
  
  // Renderizar tipo de usuario con color correspondiente
  const renderTipo = (roleName: string) => {
    switch(roleName.toLowerCase()) {
      case 'client':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Cliente</span>;
      case 'entrepreneur':
        return <span className="px-2 py-1 bg-[#F18F01] bg-opacity-40 text-white rounded-full text-xs font-medium">Emprendedor</span>;
      case 'admin':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Administrador</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{roleName}</span>;
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
                <option value="client">Cliente</option>
                <option value="entrepreneur">Emprendedor</option>
                <option value="admin">Administrador</option>
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
              </select>
            </div>
          </div>
          
          <div>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Empresa</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E1E1E8]">
              {usuariosPaginados.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-[#F4F4F8] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E4057]">#{usuario.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">{usuario.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">{usuario.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{renderTipo(usuario.role.name)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">
                    {usuario.enterprise ? usuario.enterprise.name : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{renderEstado(usuario.is_active)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button
                      onClick={() => verDetalles(usuario.id)}
                      className="text-[#048BA8] hover:text-[#048BA8]/80 transition-colors mr-3"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => cambiarEstado(usuario.id, !usuario.is_active)}
                      className={`${
                        usuario.is_active ? 'text-red-500 hover:text-red-600' : 'text-green-500 hover:text-green-600'
                      } transition-colors`}
                    >
                      {usuario.is_active ? 'Desactivar' : 'Activar'}
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
      {usuarioSeleccionado && (() => {
        const usuario = usuarios.find(u => u.id === usuarioSeleccionado);
        if (!usuario) return null;
        
        return (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg w-full max-w-md mx-4">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-[#2E4057]">Detalles del Usuario</h3>
                  <button onClick={cerrarDetalles} className="text-[#2E4057]/60 hover:text-[#2E4057]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-[#048BA8] flex items-center justify-center text-white text-2xl font-medium">
                      {usuario.name.charAt(0)}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">ID</p>
                    <p className="text-[#2E4057] font-medium">#{usuario.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Nombre</p>
                    <p className="text-[#2E4057] font-medium">{usuario.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Email</p>
                    <p className="text-[#2E4057] font-medium">{usuario.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Teléfono</p>
                    <p className="text-[#2E4057] font-medium">{usuario.phone_number}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Documento</p>
                    <p className="text-[#2E4057] font-medium">{usuario.document_id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Dirección</p>
                    <p className="text-[#2E4057] font-medium">{usuario.address}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Tipo</p>
                    <div className="mt-1">{renderTipo(usuario.role.name)}</div>
                  </div>
                  
                  {usuario.enterprise && (
                    <div>
                      <p className="text-sm text-[#2E4057]/60">Empresa</p>
                      <p className="text-[#2E4057] font-medium">{usuario.enterprise.name}</p>
                      <p className="text-sm text-[#2E4057]/60 mt-1">NIT: {usuario.enterprise.NIT}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Estado</p>
                    <div className="mt-1">{renderEstado(usuario.is_active)}</div>
                  </div>
                  
                  <div className="pt-4 border-t border-[#E1E1E8]">
                    <button
                      onClick={() => {
                        cambiarEstado(usuario.id, !usuario.is_active);
                        cerrarDetalles();
                      }}
                      className={`w-full px-4 py-2 rounded-lg ${
                        usuario.is_active
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      {usuario.is_active ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </DashboardLayout>
  );
} 