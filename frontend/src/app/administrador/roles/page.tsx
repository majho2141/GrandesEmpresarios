'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Datos de ejemplo para roles y permisos
const rolesIniciales = [
  {
    id: 1,
    nombre: 'Cliente',
    descripcion: 'Usuario final que realiza compras en la plataforma',
    usuariosAsignados: 568,
    permisos: {
      productos: {
        ver: true,
        comentar: true,
        comprar: true,
        editar: false,
        eliminar: false,
        crear: false
      },
      perfil: {
        ver: true,
        editar: true,
        eliminar: true
      },
      emprendimientos: {
        ver: true,
        contactar: true,
        administrar: false
      },
      usuarios: {
        ver: false,
        administrar: false
      },
      transacciones: {
        verPropias: true,
        verTodas: false,
        administrar: false
      }
    }
  },
  {
    id: 2,
    nombre: 'Emprendedor',
    descripcion: 'Usuario que vende productos y servicios en la plataforma',
    usuariosAsignados: 245,
    permisos: {
      productos: {
        ver: true,
        comentar: true,
        comprar: true,
        editar: true,
        eliminar: true,
        crear: true
      },
      perfil: {
        ver: true,
        editar: true,
        eliminar: true
      },
      emprendimientos: {
        ver: true,
        contactar: true,
        administrar: true
      },
      usuarios: {
        ver: false,
        administrar: false
      },
      transacciones: {
        verPropias: true,
        verTodas: false,
        administrar: false
      }
    }
  },
  {
    id: 3,
    nombre: 'Administrador',
    descripcion: 'Usuario con acceso total al sistema y capacidad de gestión',
    usuariosAsignados: 12,
    permisos: {
      productos: {
        ver: true,
        comentar: true,
        comprar: true,
        editar: true,
        eliminar: true,
        crear: true
      },
      perfil: {
        ver: true,
        editar: true,
        eliminar: true
      },
      emprendimientos: {
        ver: true,
        contactar: true,
        administrar: true
      },
      usuarios: {
        ver: true,
        administrar: true
      },
      transacciones: {
        verPropias: true,
        verTodas: true,
        administrar: true
      }
    }
  },
  {
    id: 4,
    nombre: 'Moderador',
    descripcion: 'Usuario con capacidades limitadas de administración para revisar contenido',
    usuariosAsignados: 8,
    permisos: {
      productos: {
        ver: true,
        comentar: true,
        comprar: false,
        editar: true,
        eliminar: true,
        crear: false
      },
      perfil: {
        ver: true,
        editar: true,
        eliminar: false
      },
      emprendimientos: {
        ver: true,
        contactar: true,
        administrar: false
      },
      usuarios: {
        ver: true,
        administrar: false
      },
      transacciones: {
        verPropias: true,
        verTodas: true,
        administrar: false
      }
    }
  }
];

const registroCambios = [
  { 
    id: 1, 
    fecha: '2023-11-01 14:30', 
    administrador: 'Carlos Rodríguez', 
    accion: 'Añadido permiso "ver transacciones propias" al rol Cliente',
    rolAfectado: 'Cliente'
  },
  { 
    id: 2, 
    fecha: '2023-10-28 09:15', 
    administrador: 'Carlos Rodríguez', 
    accion: 'Creado nuevo rol "Moderador"',
    rolAfectado: 'Moderador'
  },
  { 
    id: 3, 
    fecha: '2023-10-25 16:45', 
    administrador: 'María López', 
    accion: 'Revocado permiso "eliminar productos" al rol Emprendedor',
    rolAfectado: 'Emprendedor'
  },
  { 
    id: 4, 
    fecha: '2023-10-25 16:40', 
    administrador: 'María López', 
    accion: 'Otorgado permiso "eliminar productos" al rol Emprendedor',
    rolAfectado: 'Emprendedor'
  },
  { 
    id: 5, 
    fecha: '2023-10-20 11:30', 
    administrador: 'Carlos Rodríguez', 
    accion: 'Modificada descripción del rol Administrador',
    rolAfectado: 'Administrador'
  }
];

export default function GestionRoles() {
  const [roles, setRoles] = useState(rolesIniciales);
  const [cambios, setCambios] = useState(registroCambios);
  const [rolSeleccionado, setRolSeleccionado] = useState(rolesIniciales[0].id);
  const [permisosEditados, setPermisosEditados] = useState<any>(null);
  const [modoCreacion, setModoCreacion] = useState(false);
  const [nuevoRol, setNuevoRol] = useState({
    nombre: '',
    descripcion: '',
    permisos: rolesIniciales[0].permisos
  });
  
  // Obtener el rol seleccionado actual
  const rolActual = roles.find(r => r.id === rolSeleccionado);
  
  // Iniciar edición de permisos
  const iniciarEdicion = () => {
    if (rolActual) {
      setPermisosEditados(JSON.parse(JSON.stringify(rolActual.permisos)));
    }
  };
  
  // Cancelar edición
  const cancelarEdicion = () => {
    setPermisosEditados(null);
  };
  
  // Guardar cambios de permisos
  const guardarCambios = () => {
    if (!permisosEditados || !rolActual) return;
    
    // Actualizar los permisos del rol
    setRoles(roles.map(rol => 
      rol.id === rolActual.id ? { ...rol, permisos: permisosEditados } : rol
    ));
    
    // Registrar el cambio
    const nuevoCambio = {
      id: cambios.length + 1,
      fecha: new Date().toISOString().slice(0, 16).replace('T', ' '),
      administrador: 'Carlos Rodríguez', // Simulando el administrador actual
      accion: `Actualizados permisos del rol ${rolActual.nombre}`,
      rolAfectado: rolActual.nombre
    };
    
    setCambios([nuevoCambio, ...cambios]);
    setPermisosEditados(null);
  };
  
  // Cambiar un permiso específico
  const cambiarPermiso = (categoria: string, permiso: string, valor: boolean) => {
    if (!permisosEditados) return;
    
    setPermisosEditados({
      ...permisosEditados,
      [categoria]: {
        ...permisosEditados[categoria],
        [permiso]: valor
      }
    });
  };
  
  // Iniciar creación de nuevo rol
  const iniciarCreacionRol = () => {
    setModoCreacion(true);
  };
  
  // Cancelar creación de rol
  const cancelarCreacionRol = () => {
    setModoCreacion(false);
    setNuevoRol({
      nombre: '',
      descripcion: '',
      permisos: rolesIniciales[0].permisos
    });
  };
  
  // Guardar nuevo rol
  const guardarNuevoRol = () => {
    if (!nuevoRol.nombre.trim()) return;
    
    // Crear el nuevo rol
    const nuevoRolCreado = {
      id: roles.length + 1,
      nombre: nuevoRol.nombre,
      descripcion: nuevoRol.descripcion,
      usuariosAsignados: 0,
      permisos: nuevoRol.permisos
    };
    
    setRoles([...roles, nuevoRolCreado]);
    
    // Registrar el cambio
    const nuevoCambio = {
      id: cambios.length + 1,
      fecha: new Date().toISOString().slice(0, 16).replace('T', ' '),
      administrador: 'Carlos Rodríguez', // Simulando el administrador actual
      accion: `Creado nuevo rol "${nuevoRol.nombre}"`,
      rolAfectado: nuevoRol.nombre
    };
    
    setCambios([nuevoCambio, ...cambios]);
    
    // Reiniciar el modo de creación
    cancelarCreacionRol();
  };
  
  // Renderizar categorías de permisos con sus opciones
  const renderCategoriaPermisos = (
    categoria: string, 
    permisos: Record<string, boolean>, 
    editando: boolean, 
    permisosActuales: any
  ) => {
    const traducirCategoria = (cat: string) => {
      switch(cat) {
        case 'productos': return 'Productos';
        case 'perfil': return 'Perfil de Usuario';
        case 'emprendimientos': return 'Emprendimientos';
        case 'usuarios': return 'Usuarios del Sistema';
        case 'transacciones': return 'Transacciones';
        default: return cat;
      }
    };
    
    const traducirPermiso = (perm: string) => {
      switch(perm) {
        case 'ver': return 'Ver';
        case 'editar': return 'Editar';
        case 'eliminar': return 'Eliminar';
        case 'crear': return 'Crear';
        case 'comentar': return 'Comentar';
        case 'comprar': return 'Comprar';
        case 'administrar': return 'Administrar';
        case 'contactar': return 'Contactar';
        case 'verPropias': return 'Ver Propias';
        case 'verTodas': return 'Ver Todas';
        default: return perm;
      }
    };
    
    return (
      <div key={categoria} className="mb-6">
        <h3 className="text-lg font-semibold text-[#2E4057] mb-2">{traducirCategoria(categoria)}</h3>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(permisos).map(([permiso, valor]) => (
              <div key={permiso} className="flex items-center">
                {editando ? (
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permisosActuales[categoria][permiso]}
                      onChange={(e) => cambiarPermiso(categoria, permiso, e.target.checked)}
                      className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] rounded"
                    />
                    <span className="text-[#2E4057]">{traducirPermiso(permiso)}</span>
                  </label>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className={`h-4 w-4 rounded-full ${valor ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-[#2E4057]">{traducirPermiso(permiso)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout titulo="Roles y Permisos" rol="administrador">
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2E4057] mb-6">Gestión de Roles y Permisos</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de roles */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2E4057]">Roles Disponibles</h2>
                <button
                  onClick={iniciarCreacionRol}
                  className="bg-[#048BA8] text-white px-3 py-1 rounded-md text-sm hover:bg-[#036d84] transition-colors"
                >
                  Nuevo Rol
                </button>
              </div>
              
              <div className="space-y-3">
                {roles.map((rol) => (
                  <div
                    key={rol.id}
                    onClick={() => { setRolSeleccionado(rol.id); cancelarEdicion(); }}
                    className={`p-3 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${rolSeleccionado === rol.id ? 'bg-blue-50 border-l-4 border-[#048BA8]' : 'border-l-4 border-transparent'}`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-[#2E4057]">{rol.nombre}</h3>
                      <span className="text-sm text-gray-500">{rol.usuariosAsignados} usuarios</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{rol.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Registro de cambios */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Registro de Cambios</h2>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {cambios.map((cambio) => (
                  <div key={cambio.id} className="p-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm text-[#2E4057]">{cambio.accion}</span>
                      <span className="text-xs text-gray-500">{cambio.fecha}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Por: {cambio.administrador}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-[#2E4057] rounded-full">{cambio.rolAfectado}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Detalle y edición de rol */}
          <div className="lg:col-span-2">
            {modoCreacion ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-[#2E4057]">Crear Nuevo Rol</h2>
                  <button
                    onClick={cancelarCreacionRol}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="mb-4">
                    <label htmlFor="rolNombre" className="block text-sm font-medium text-[#2E4057] mb-1">Nombre del Rol</label>
                    <input
                      type="text"
                      id="rolNombre"
                      value={nuevoRol.nombre}
                      onChange={(e) => setNuevoRol({...nuevoRol, nombre: e.target.value})}
                      className="border border-gray-300 rounded-md p-2 w-full text-[#2E4057]"
                      placeholder="Ej: Editor de Contenido"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="rolDescripcion" className="block text-sm font-medium text-[#2E4057] mb-1">Descripción</label>
                    <textarea
                      id="rolDescripcion"
                      value={nuevoRol.descripcion}
                      onChange={(e) => setNuevoRol({...nuevoRol, descripcion: e.target.value})}
                      className="border border-gray-300 rounded-md p-2 w-full h-24 text-[#2E4057]"
                      placeholder="Describe brevemente las funciones y responsabilidades de este rol"
                    ></textarea>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Configurar Permisos</h3>
                
                {/* Renderizado de permisos para el nuevo rol */}
                {Object.entries(nuevoRol.permisos).map(([categoria, permisos]) => 
                  renderCategoriaPermisos(categoria, permisos, true, nuevoRol.permisos)
                )}
                
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={cancelarCreacionRol}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={guardarNuevoRol}
                    className="px-4 py-2 bg-[#048BA8] text-white rounded-md hover:bg-[#036d84]"
                    disabled={!nuevoRol.nombre.trim()}
                  >
                    Crear Rol
                  </button>
                </div>
              </div>
            ) : rolActual ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-[#2E4057]">{rolActual.nombre}</h2>
                  {!permisosEditados ? (
                    <button
                      onClick={iniciarEdicion}
                      className="bg-[#048BA8] text-white px-3 py-1 rounded-md text-sm hover:bg-[#036d84] transition-colors"
                    >
                      Editar Permisos
                    </button>
                  ) : (
                    <div className="space-x-2">
                      <button
                        onClick={cancelarEdicion}
                        className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={guardarCambios}
                        className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
                      >
                        Guardar
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600">{rolActual.descripcion}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="font-medium">{rolActual.usuariosAsignados}</span> usuarios asignados a este rol
                  </p>
                </div>
                
                <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Permisos</h3>
                
                {/* Renderizado de permisos según si está en modo edición o no */}
                {Object.entries(rolActual.permisos).map(([categoria, permisos]) => 
                  renderCategoriaPermisos(
                    categoria, 
                    permisos, 
                    !!permisosEditados, 
                    permisosEditados || rolActual.permisos
                  )
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}