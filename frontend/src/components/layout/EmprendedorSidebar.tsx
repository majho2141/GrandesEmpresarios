'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface EmprendedorSidebarProps {
  menuColapsado: boolean;
  toggleMenu: () => void;
}

export default function EmprendedorSidebar({ menuColapsado, toggleMenu }: EmprendedorSidebarProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <div className={`bg-[#2E4057] text-white transition-all duration-300 ${menuColapsado ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-[#048BA8]/30">
        {!menuColapsado && (
          <h2 className="text-xl font-semibold">Panel Emprendedor</h2>
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
          <Link href="/emprendedor/dashboard" className={`flex items-center p-3 rounded-lg ${isActive('/emprendedor/dashboard') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Dashboard</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/emprendedor/productos" className={`flex items-center p-3 rounded-lg ${isActive('/emprendedor/productos') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            {!menuColapsado && <span className="ml-4">Productos</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/emprendedor/ventas" className={`flex items-center p-3 rounded-lg ${isActive('/emprendedor/ventas') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Ventas</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/emprendedor/estadisticas" className={`flex items-center p-3 rounded-lg ${isActive('/emprendedor/estadisticas') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Estadísticas</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/emprendedor/marketing" className={`flex items-center p-3 rounded-lg ${isActive('/emprendedor/marketing') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Marketing</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/emprendedor/tienda/configuracion" className={`flex items-center p-3 rounded-lg ${isActive('/emprendedor/tienda') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Configuración</span>}
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
  );
} 