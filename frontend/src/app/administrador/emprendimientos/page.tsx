'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store/useAuthStore';

interface Enterprise {
  id: number;
  name: string;
  NIT: string;
  email: string;
  phone_number: string;
  currency: string;
  description: string;
  address: string;
}

export default function GestionEmprendimientos() {
  const [emprendimientos, setEmprendimientos] = useState<Enterprise[]>([]);
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [emprendimientoSeleccionado, setEmprendimientoSeleccionado] = useState<number | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchEmprendimientos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/enterprises', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setEmprendimientos(data);
        }
      } catch (error) {
        console.error('Error al obtener emprendimientos:', error);
      }
    };

    fetchEmprendimientos();
  }, [token]);
  
  // Filtrar emprendimientos según criterios
  const emprendimientosFiltrados = emprendimientos.filter(emp => {
    const coincideBusqueda = emp.name.toLowerCase().includes(filtroBusqueda.toLowerCase()) || 
                            emp.email.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
                            emp.NIT.toLowerCase().includes(filtroBusqueda.toLowerCase());
    return coincideBusqueda;
  });
  
  // Calcular el total de páginas
  const totalPaginas = Math.ceil(emprendimientosFiltrados.length / elementosPorPagina);
  
  // Obtener los emprendimientos de la página actual
  const emprendimientosPaginados = emprendimientosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );
  
  // Ver detalles de un emprendimiento
  const verDetalles = (id: number) => {
    setEmprendimientoSeleccionado(id);
  };
  
  // Cerrar modal de detalles
  const cerrarDetalles = () => {
    setEmprendimientoSeleccionado(null);
  };
  
  // Cambiar página
  const cambiarPagina = (pagina: number) => {
    setPaginaActual(pagina);
  };

  return (
    <DashboardLayout titulo="Gestión de Emprendimientos" rol="administrador">
      {/* Contenido principal */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
        {/* Filtros y búsqueda */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <label htmlFor="busqueda" className="block text-sm font-medium text-[#2E4057]/70 mb-1">Buscar Emprendimiento</label>
            <div className="relative">
              <input
                type="text"
                id="busqueda"
                placeholder="Nombre, email o NIT"
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
        
        {/* Tabla de emprendimientos */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E1E1E8]">
            <thead>
              <tr className="bg-[#F4F4F8]">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">NIT</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Teléfono</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Moneda</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E1E1E8]">
              {emprendimientosPaginados.map((emp) => (
                <tr key={emp.id} className="hover:bg-[#F4F4F8] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E4057]">#{emp.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">{emp.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">{emp.NIT}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">{emp.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">{emp.phone_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">{emp.currency}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button
                      onClick={() => verDetalles(emp.id)}
                      className="text-[#048BA8] hover:text-[#048BA8]/80 transition-colors"
                    >
                      Ver
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
      
      {/* Modal de detalles de emprendimiento */}
      {emprendimientoSeleccionado && (() => {
        const emp = emprendimientos.find(e => e.id === emprendimientoSeleccionado);
        if (!emp) return null;
        
        return (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg w-full max-w-md mx-4">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-[#2E4057]">Detalles del Emprendimiento</h3>
                  <button onClick={cerrarDetalles} className="text-[#2E4057]/60 hover:text-[#2E4057]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-[#048BA8] flex items-center justify-center text-white text-2xl font-medium">
                      {emp.name.charAt(0)}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">ID</p>
                    <p className="text-[#2E4057] font-medium">#{emp.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Nombre</p>
                    <p className="text-[#2E4057] font-medium">{emp.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">NIT</p>
                    <p className="text-[#2E4057] font-medium">{emp.NIT}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Email</p>
                    <p className="text-[#2E4057] font-medium">{emp.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Teléfono</p>
                    <p className="text-[#2E4057] font-medium">{emp.phone_number}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Moneda</p>
                    <p className="text-[#2E4057] font-medium">{emp.currency}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Descripción</p>
                    <p className="text-[#2E4057] font-medium">{emp.description}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#2E4057]/60">Dirección</p>
                    <p className="text-[#2E4057] font-medium">{emp.address}</p>
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