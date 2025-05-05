'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
  const [menuColapsado, setMenuColapsado] = useState(false);
  
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
                    <span>{traducirPermiso(permiso)}</span>
                  </label>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className={`h-4 w-4 rounded-full ${valor ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span>{traducirPermiso(permiso)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
            <Link href="/administrador/roles" className="flex items-center p-3 rounded-lg bg-[#048BA8] text-white">
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
          <h1 className="text-2xl font-bold text-[#2E4057]">Gestión de Roles y Permisos</h1>
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
                          <span className="font-medium text-sm">{cambio.accion}</span>
                          <span className="text-xs text-gray-500">{cambio.fecha}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Por: {cambio.administrador}</span>
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{cambio.rolAfectado}</span>
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
                        <label htmlFor="rolNombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Rol</label>
                        <input
                          type="text"
                          id="rolNombre"
                          value={nuevoRol.nombre}
                          onChange={(e) => setNuevoRol({...nuevoRol, nombre: e.target.value})}
                          className="border border-gray-300 rounded-md p-2 w-full"
                          placeholder="Ej: Editor de Contenido"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="rolDescripcion" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea
                          id="rolDescripcion"
                          value={nuevoRol.descripcion}
                          onChange={(e) => setNuevoRol({...nuevoRol, descripcion: e.target.value})}
                          className="border border-gray-300 rounded-md p-2 w-full h-24"
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
        </main>
      </div>
    </div>
  );
} 