'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store/useAuthStore';

interface Role {
  id: number;
  name: string;
  description: string;
}

interface Permission {
  id: number;
  name: string;
  description: string;
}

export default function GestionRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permisos, setPermisos] = useState<Permission[]>([]);
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState<number | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener roles
        const rolesResponse = await fetch('http://localhost:8080/api/v1/roles/?skip=0&limit=100', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
          }
        });
        if (rolesResponse.ok) {
          const rolesData = await rolesResponse.json();
          setRoles(rolesData);
        }

        // Obtener permisos
        const permisosResponse = await fetch('http://localhost:8080/api/v1/permissions/?skip=0&limit=100', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
          }
        });
        if (permisosResponse.ok) {
          const permisosData = await permisosResponse.json();
          setPermisos(permisosData);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [token]);
  
  // Filtrar roles según criterios
  const rolesFiltrados = roles.filter(rol => {
    const coincideBusqueda = rol.name.toLowerCase().includes(filtroBusqueda.toLowerCase()) || 
                            rol.description.toLowerCase().includes(filtroBusqueda.toLowerCase());
    return coincideBusqueda;
  });
  
  // Calcular el total de páginas
  const totalPaginas = Math.ceil(rolesFiltrados.length / elementosPorPagina);
  
  // Obtener los roles de la página actual
  const rolesPaginados = rolesFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );
  
  // Ver detalles de un rol
  const verDetalles = (id: number) => {
    setRolSeleccionado(id);
  };
  
  // Cerrar modal de detalles
  const cerrarDetalles = () => {
    setRolSeleccionado(null);
  };
  
  // Cambiar página
  const cambiarPagina = (pagina: number) => {
    setPaginaActual(pagina);
  };

  return (
    <DashboardLayout titulo="Gestión de Roles y Permisos" rol="administrador">
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2E4057] mb-6">Gestión de Roles y Permisos</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de roles */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2E4057]">Roles Disponibles</h2>
              </div>
              
              <div className="space-y-3">
                {rolesPaginados.map((rol) => (
                  <div
                    key={rol.id}
                    onClick={() => { verDetalles(rol.id); }}
                    className={`p-3 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${rolSeleccionado === rol.id ? 'bg-blue-50 border-l-4 border-[#048BA8]' : 'border-l-4 border-transparent'}`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-[#2E4057]">{rol.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{rol.description}</p>
                  </div>
                ))}
              </div>
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
          
          {/* Detalle y edición de rol */}
          <div className="lg:col-span-2">
            {rolSeleccionado && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-[#2E4057]">{roles.find(r => r.id === rolSeleccionado)?.name}</h2>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600">{roles.find(r => r.id === rolSeleccionado)?.description}</p>
                </div>
                
                <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Permisos</h3>
                
                <div className="space-y-4">
                  {permisos.map((permiso) => (
                    <div key={permiso.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`permiso-${permiso.id}`}
                        className="rounded border-[#E1E1E8] text-[#048BA8] focus:ring-[#048BA8]"
                      />
                      <label htmlFor={`permiso-${permiso.id}`} className="text-sm text-[#2E4057]">
                        {permiso.name} - {permiso.description}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}