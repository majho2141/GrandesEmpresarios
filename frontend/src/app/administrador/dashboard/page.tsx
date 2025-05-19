'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Datos de ejemplo
const ventasMensuales = [
  { name: 'Ene', ventas: 4000 },
  { name: 'Feb', ventas: 3000 },
  { name: 'Mar', ventas: 5000 },
  { name: 'Abr', ventas: 2780 },
  { name: 'May', ventas: 1890 },
  { name: 'Jun', ventas: 2390 },
  { name: 'Jul', ventas: 3490 },
  { name: 'Ago', ventas: 4000 },
  { name: 'Sep', ventas: 4500 },
  { name: 'Oct', ventas: 5200 },
  { name: 'Nov', ventas: 6000 },
  { name: 'Dic', ventas: 7000 },
];

const usuariosPorTipo = [
  { name: 'Clientes', value: 400 },
  { name: 'Emprendedores', value: 300 },
  { name: 'Administradores', value: 30 },
];

const COLORS = ['#99C24D', '#F18F01', '#048BA8'];

const datosTransacciones = [
  { name: 'Sem 1', transacciones: 240 },
  { name: 'Sem 2', transacciones: 139 },
  { name: 'Sem 3', transacciones: 380 },
  { name: 'Sem 4', transacciones: 390 },
];

export default function AdminDashboard() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('mes');
  const [menuColapsado, setMenuColapsado] = useState(false);

  const totalVentas = ventasMensuales.reduce((sum, item) => sum + item.ventas, 0);
  const totalUsuarios = usuariosPorTipo.reduce((sum, item) => sum + item.value, 0);
  const totalTransacciones = datosTransacciones.reduce((sum, item) => sum + item.transacciones, 0);
  const campañasActivas = 24;
  
  const cambiarPeriodo = (periodo: string) => {
    setPeriodoSeleccionado(periodo);
    // Aquí se cargarían los datos correspondientes al periodo seleccionado
  };

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
            <Link href="/administrador/dashboard" className="flex items-center p-3 rounded-lg bg-[#048BA8] text-white">
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
          <h1 className="text-2xl font-bold text-[#2E4057]">Panel de Administración</h1>
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
          {/* Filtros de periodo */}
          <div className="mb-6 flex space-x-4">
            <button 
              onClick={() => cambiarPeriodo('dia')}
              className={`px-4 py-2 rounded-md transition-colors ${periodoSeleccionado === 'dia' ? 'bg-[#048BA8] text-white' : 'bg-white text-[#2E4057] border border-gray-200 hover:bg-gray-50'}`}
            >
              Día
            </button>
            <button 
              onClick={() => cambiarPeriodo('semana')}
              className={`px-4 py-2 rounded-md transition-colors ${periodoSeleccionado === 'semana' ? 'bg-[#048BA8] text-white' : 'bg-white text-[#2E4057] border border-gray-200 hover:bg-gray-50'}`}
            >
              Semana
            </button>
            <button 
              onClick={() => cambiarPeriodo('mes')}
              className={`px-4 py-2 rounded-md transition-colors ${periodoSeleccionado === 'mes' ? 'bg-[#048BA8] text-white' : 'bg-white text-[#2E4057] border border-gray-200 hover:bg-gray-50'}`}
            >
              Mes
            </button>
            <button 
              onClick={() => cambiarPeriodo('año')}
              className={`px-4 py-2 rounded-md transition-colors ${periodoSeleccionado === 'año' ? 'bg-[#048BA8] text-white' : 'bg-white text-[#2E4057] border border-gray-200 hover:bg-gray-50'}`}
            >
              Año
            </button>
          </div>
          
          {/* Tarjetas de métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#048BA8] transition-transform hover:transform hover:scale-105">
              <h3 className="text-gray-500 text-sm font-medium">Ventas Totales</h3>
              <p className="text-3xl font-bold text-[#2E4057]">${totalVentas.toLocaleString()}</p>
              <p className="text-sm text-[#99C24D] flex items-center mt-2">
                <span className="mr-1">↑</span> 12% vs periodo anterior
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#F18F01] transition-transform hover:transform hover:scale-105">
              <h3 className="text-gray-500 text-sm font-medium">Campañas Activas</h3>
              <p className="text-3xl font-bold text-[#2E4057]">{campañasActivas}</p>
              <p className="text-sm text-[#99C24D] flex items-center mt-2">
                <span className="mr-1">↑</span> 8% vs periodo anterior
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#99C24D] transition-transform hover:transform hover:scale-105">
              <h3 className="text-gray-500 text-sm font-medium">Usuarios Registrados</h3>
              <p className="text-3xl font-bold text-[#2E4057]">{totalUsuarios}</p>
              <p className="text-sm text-[#99C24D] flex items-center mt-2">
                <span className="mr-1">↑</span> 15% vs periodo anterior
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2E4057] transition-transform hover:transform hover:scale-105">
              <h3 className="text-gray-500 text-sm font-medium">Transacciones</h3>
              <p className="text-3xl font-bold text-[#2E4057]">{totalTransacciones}</p>
              <p className="text-sm text-[#99C24D] flex items-center mt-2">
                <span className="mr-1">↑</span> 6% vs periodo anterior
              </p>
            </div>
          </div>
          
          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Ventas Mensuales</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ventasMensuales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ventas" fill="#048BA8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Distribución de Usuarios</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={usuariosPorTipo}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {usuariosPorTipo.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
              <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Volumen de Transacciones</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={datosTransacciones}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="transacciones" 
                      stroke="#F18F01" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Alertas y notificaciones */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Alertas y Notificaciones</h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="font-medium text-red-800">Alerta: Pico inusual de tráfico detectado</p>
                <p className="text-sm text-red-700 mt-1">Se ha detectado un aumento del 200% en el tráfico en la última hora.</p>
              </div>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <p className="font-medium text-yellow-800">Aviso: 5 nuevos emprendimientos pendientes de verificación</p>
                <p className="text-sm text-yellow-700 mt-1">Hay emprendimientos esperando aprobación desde hace más de 48 horas.</p>
              </div>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="font-medium text-blue-800">Información: Actualización de sistema programada</p>
                <p className="text-sm text-blue-700 mt-1">Se realizará mantenimiento programado el próximo domingo a las 02:00 AM.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 