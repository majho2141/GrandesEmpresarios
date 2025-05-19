'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Datos de ejemplo para emprendimientos
const emprendimientosIniciales = [
  {
    id: 1,
    nombre: 'Eco Soluciones',
    propietario: 'María López',
    email: 'maria@ecosoluciones.com',
    telefono: '+57 315 123 4567',
    categoria: 'Sostenibilidad',
    fechaCreacion: '2023-05-15',
    estado: 'activo',
    descripcion: 'Productos eco-amigables para el hogar y oficina, enfocados en reducir el impacto ambiental.',
    productos: 24,
    ventas: 156,
    ubicacion: 'Bogotá, Colombia',
    imagen: '/emprendimientos/eco-soluciones.jpg'
  },
  {
    id: 2,
    nombre: 'TechMakers',
    propietario: 'Carlos Rodríguez',
    email: 'carlos@techmakers.com',
    telefono: '+57 300 987 6543',
    categoria: 'Tecnología',
    fechaCreacion: '2023-06-20',
    estado: 'activo',
    descripcion: 'Accesorios tecnológicos innovadores y personalizables para dispositivos móviles y computadoras.',
    productos: 36,
    ventas: 287,
    ubicacion: 'Medellín, Colombia',
    imagen: '/emprendimientos/tech-makers.jpg'
  },
  {
    id: 3,
    nombre: 'Artesanías Locales',
    propietario: 'Ana García',
    email: 'ana@artesaniaslocales.com',
    telefono: '+57 321 456 7890',
    categoria: 'Artesanía',
    fechaCreacion: '2023-04-10',
    estado: 'activo',
    descripcion: 'Artesanías tradicionales colombianas elaboradas por comunidades indígenas y artesanos locales.',
    productos: 48,
    ventas: 132,
    ubicacion: 'Cartagena, Colombia',
    imagen: '/emprendimientos/artesanias-locales.jpg'
  },
  {
    id: 4,
    nombre: 'Moda Sustentable',
    propietario: 'Laura Martínez',
    email: 'laura@modasustentable.com',
    telefono: '+57 311 234 5678',
    categoria: 'Moda',
    fechaCreacion: '2023-07-05',
    estado: 'pendiente',
    descripcion: 'Ropa y accesorios fabricados con materiales reciclados y procesos de producción sostenibles.',
    productos: 18,
    ventas: 0,
    ubicacion: 'Cali, Colombia',
    imagen: '/emprendimientos/moda-sustentable.jpg'
  },
  {
    id: 5,
    nombre: 'FinTech Solutions',
    propietario: 'Roberto Fernández',
    email: 'roberto@fintechsolutions.com',
    telefono: '+57 305 678 1234',
    categoria: 'Finanzas',
    fechaCreacion: '2023-03-15',
    estado: 'inactivo',
    descripcion: 'Soluciones financieras digitales para emprendedores y pequeñas empresas.',
    productos: 5,
    ventas: 42,
    ubicacion: 'Barranquilla, Colombia',
    imagen: '/emprendimientos/fintech-solutions.jpg'
  },
  {
    id: 6,
    nombre: 'Sabores Ancestrales',
    propietario: 'Pedro Sánchez',
    email: 'pedro@saboresancestrales.com',
    telefono: '+57 318 765 4321',
    categoria: 'Alimentos',
    fechaCreacion: '2023-08-01',
    estado: 'activo',
    descripcion: 'Alimentos preparados con recetas tradicionales colombianas y productos orgánicos locales.',
    productos: 32,
    ventas: 98,
    ubicacion: 'Bucaramanga, Colombia',
    imagen: '/emprendimientos/sabores-ancestrales.jpg'
  },
  {
    id: 7,
    nombre: 'Educa Digital',
    propietario: 'Carmen Díaz',
    email: 'carmen@educadigital.com',
    telefono: '+57 304 321 7654',
    categoria: 'Educación',
    fechaCreacion: '2023-09-10',
    estado: 'activo',
    descripcion: 'Herramientas educativas digitales para niños y jóvenes, enfocadas en ciencia y tecnología.',
    productos: 15,
    ventas: 64,
    ubicacion: 'Pereira, Colombia',
    imagen: '/emprendimientos/educa-digital.jpg'
  }
];

export default function EmprendimientosPage() {
  const [emprendimientos, setEmprendimientos] = useState(emprendimientosIniciales);
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [emprendimientoSeleccionado, setEmprendimientoSeleccionado] = useState<number | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modoCreacion, setModoCreacion] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // Filtrar emprendimientos según criterios
  const emprendimientosFiltrados = emprendimientos.filter(emp => {
    const coincideCategoria = filtroCategoria === 'todas' || emp.categoria === filtroCategoria;
    const coincideEstado = filtroEstado === 'todos' || emp.estado === filtroEstado;
    const coincideBusqueda = emp.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase()) || 
                             emp.propietario.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
                             emp.descripcion.toLowerCase().includes(filtroBusqueda.toLowerCase());
    return coincideCategoria && coincideEstado && coincideBusqueda;
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
    setModoEdicion(false);
  };

  // Cerrar modal de detalles
  const cerrarDetalles = () => {
    setEmprendimientoSeleccionado(null);
    setModoEdicion(false);
  };

  // Iniciar edición de emprendimiento
  const iniciarEdicion = (id: number) => {
    setEmprendimientoSeleccionado(id);
    setModoEdicion(true);
  };

  // Iniciar creación de nuevo emprendimiento
  const iniciarCreacion = () => {
    setModoCreacion(true);
  };

  // Guardar cambios de emprendimiento (edición o creación)
  const guardarEmprendimiento = (emprendimiento: any) => {
    if (modoEdicion && emprendimientoSeleccionado) {
      // Actualizar emprendimiento existente
      setEmprendimientos(
        emprendimientos.map(emp => emp.id === emprendimientoSeleccionado ? emprendimiento : emp)
      );
      setEmprendimientoSeleccionado(null);
      setModoEdicion(false);
    } else if (modoCreacion) {
      // Crear nuevo emprendimiento
      const nuevoId = Math.max(...emprendimientos.map(emp => emp.id)) + 1;
      setEmprendimientos([...emprendimientos, { ...emprendimiento, id: nuevoId }]);
      setModoCreacion(false);
    }
  };

  // Eliminar emprendimiento
  const eliminarEmprendimiento = (id: number) => {
    setEmprendimientos(emprendimientos.filter(emp => emp.id !== id));
    setEmprendimientoSeleccionado(null);
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

  return (
    <DashboardLayout titulo="Gestión de Emprendimientos" rol="administrador">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
        {/* Cabecera y botón de creación */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#2E4057]">Emprendimientos</h2>
          <button 
            onClick={iniciarCreacion}
            className="px-4 py-2 bg-[#048BA8] text-white rounded-md hover:bg-[#036d84] transition-colors"
          >
            + Nuevo Emprendimiento
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <label htmlFor="filtroCategoria" className="block text-sm font-medium text-[#2E4057]/70 mb-1">Categoría</label>
              <select
                id="filtroCategoria"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full rounded-lg border border-[#E1E1E8] p-2 text-sm text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
              >
                <option value="todas">Todas</option>
                <option value="Sostenibilidad">Sostenibilidad</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Artesanía">Artesanía</option>
                <option value="Moda">Moda</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Educación">Educación</option>
              </select>
            </div>
            <div>
              <label htmlFor="filtroEstado" className="block text-sm font-medium text-[#2E4057]/70 mb-1">Estado</label>
              <select
                id="filtroEstado"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full rounded-lg border border-[#E1E1E8] p-2 text-sm text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
              >
                <option value="todos">Todos</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="pendiente">Pendiente</option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-64">
            <label htmlFor="busqueda" className="block text-sm font-medium text-[#2E4057]/70 mb-1">Buscar</label>
            <div className="relative">
              <input
                type="text"
                id="busqueda"
                placeholder="Nombre, propietario..."
                value={filtroBusqueda}
                onChange={(e) => setFiltroBusqueda(e.target.value)}
                className="w-full rounded-lg border border-[#E1E1E8] p-2 pr-8 text-sm text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Emprendimiento</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Propietario</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Categoría</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Productos</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#2E4057]/70 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E1E1E8]">
              {emprendimientosPaginados.map((emprendimiento) => (
                <tr key={emprendimiento.id} className="hover:bg-[#F4F4F8] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2E4057]">#{emprendimiento.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-[#048BA8]/10 rounded-full flex items-center justify-center text-[#048BA8]">
                        {emprendimiento.nombre.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#2E4057]">{emprendimiento.nombre}</div>
                        <div className="text-sm text-[#2E4057]/70">{new Date(emprendimiento.fechaCreacion).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">{emprendimiento.propietario}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#048BA8]/10 text-[#048BA8]">
                      {emprendimiento.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E4057]">{emprendimiento.productos}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{renderEstado(emprendimiento.estado)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => verDetalles(emprendimiento.id)}
                      className="text-[#048BA8] hover:text-[#036d84] transition-colors mr-3"
                    >
                      Ver
                    </button>
                    <button 
                      onClick={() => iniciarEdicion(emprendimiento.id)}
                      className="text-[#F18F01] hover:text-[#d17e01] transition-colors mr-3"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => eliminarEmprendimiento(emprendimiento.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Eliminar
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

        {/* Modal de detalles/edición de emprendimiento */}
        {emprendimientoSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {(() => {
                  const emprendimiento = emprendimientos.find(e => e.id === emprendimientoSeleccionado);
                  if (!emprendimiento) return null;
                  
                  return (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-[#2E4057]">
                          {modoEdicion ? 'Editar Emprendimiento' : 'Detalles del Emprendimiento'}
                        </h3>
                        <button onClick={cerrarDetalles} className="text-[#2E4057]/60 hover:text-[#2E4057]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Información del emprendimiento */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2 flex justify-center">
                          <div className="w-20 h-20 rounded-full bg-[#048BA8] flex items-center justify-center text-white text-2xl font-medium">
                            {emprendimiento.nombre.charAt(0)}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-[#2E4057]/60">ID</p>
                          <p className="text-[#2E4057] font-medium">#{emprendimiento.id}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-[#2E4057]/60">Nombre</p>
                          <p className="text-[#2E4057] font-medium">{emprendimiento.nombre}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-[#2E4057]/60">Propietario</p>
                          <p className="text-[#2E4057] font-medium">{emprendimiento.propietario}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-[#2E4057]/60">Correo Electrónico</p>
                          <p className="text-[#2E4057] font-medium">{emprendimiento.email}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-[#2E4057]/60">Teléfono</p>
                          <p className="text-[#2E4057] font-medium">{emprendimiento.telefono}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-[#2E4057]/60">Categoría</p>
                          <span className="mt-1 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#048BA8]/10 text-[#048BA8]">
                            {emprendimiento.categoria}
                          </span>
                        </div>
                        
                        <div>
                          <p className="text-sm text-[#2E4057]/60">Fecha de Creación</p>
                          <p className="text-[#2E4057] font-medium">{new Date(emprendimiento.fechaCreacion).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-[#2E4057]/60">Ubicación</p>
                          <p className="text-[#2E4057] font-medium">{emprendimiento.ubicacion}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-[#2E4057]/60">Estado</p>
                          <div className="mt-1">{renderEstado(emprendimiento.estado)}</div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-[#2E4057]/60">Productos</p>
                          <p className="text-[#2E4057] font-medium">{emprendimiento.productos} productos registrados</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-[#2E4057]/60">Ventas</p>
                          <p className="text-[#2E4057] font-medium">{emprendimiento.ventas} ventas realizadas</p>
                        </div>
                        
                        <div className="col-span-2">
                          <p className="text-sm text-[#2E4057]/60">Descripción</p>
                          <p className="text-[#2E4057] mt-1">{emprendimiento.descripcion}</p>
                        </div>
                      </div>
                      
                      {/* Botones de acción */}
                      <div className="flex justify-end space-x-4 mt-8">
                        <button
                          onClick={cerrarDetalles}
                          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          {modoEdicion ? 'Cancelar' : 'Cerrar'}
                        </button>
                        
                        {!modoEdicion && (
                          <>
                            <button
                              onClick={() => iniciarEdicion(emprendimiento.id)}
                              className="px-4 py-2 bg-[#F18F01] text-white rounded-md hover:bg-[#d17e01]"
                            >
                              Editar
                            </button>
                            
                            <button
                              onClick={() => eliminarEmprendimiento(emprendimiento.id)}
                              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                        
                        {modoEdicion && (
                          <button
                            onClick={() => guardarEmprendimiento(emprendimiento)}
                            className="px-4 py-2 bg-[#048BA8] text-white rounded-md hover:bg-[#036d84]"
                          >
                            Guardar Cambios
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

        {/* Modal de creación de emprendimiento */}
        {modoCreacion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-[#2E4057]">Nuevo Emprendimiento</h3>
                  <button 
                    onClick={() => setModoCreacion(false)} 
                    className="text-[#2E4057]/60 hover:text-[#2E4057]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="text-center mb-6">
                  <p className="text-[#2E4057]">Formulario para crear un nuevo emprendimiento</p>
                  <p className="text-sm text-[#2E4057]/60 mt-1">Complete toda la información requerida</p>
                </div>
                
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    onClick={() => setModoCreacion(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  
                  <button
                    onClick={() => {
                      const nuevoEmprendimiento = {
                        nombre: 'Nuevo Emprendimiento',
                        propietario: 'Nuevo Propietario',
                        email: 'nuevo@ejemplo.com',
                        telefono: '+57 300 000 0000',
                        categoria: 'Tecnología',
                        fechaCreacion: new Date().toISOString().split('T')[0],
                        estado: 'pendiente',
                        descripcion: 'Descripción del nuevo emprendimiento.',
                        productos: 0,
                        ventas: 0,
                        ubicacion: 'Bogotá, Colombia',
                        imagen: '/emprendimientos/default.jpg'
                      };
                      guardarEmprendimiento(nuevoEmprendimiento);
                    }}
                    className="px-4 py-2 bg-[#048BA8] text-white rounded-md hover:bg-[#036d84]"
                  >
                    Crear Emprendimiento
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 