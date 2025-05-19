'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface AdministradorSidebarProps {
  menuColapsado: boolean;
  toggleMenu: () => void;
}

export default function AdministradorSidebar({ menuColapsado, toggleMenu }: AdministradorSidebarProps) {
  const pathname = usePathname();
  const { clearAuth } = useAuthStore();
  
  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  const handleLogout = () => {
    clearAuth();
    window.location.href = '/auth/login';
  };

  return (
    <div className={`bg-[#2E4057] text-white transition-all duration-300 ${menuColapsado ? 'w-20' : 'w-64'} relative`}>
      <div className="flex items-center justify-between p-4 border-b border-[#048BA8]/30">
        {!menuColapsado ? (
          <div className="flex items-center">
            <Image
              src="/logoPrincipal.png"
              alt="Logo GrandesEmpresarios"
              width={140}
              height={40}
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <Image
              src="/logoPrincipal.png"
              alt="Logo GrandesEmpresarios"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
        )}
        <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-[#048BA8]/20 cursor-pointer">
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
          <Link href="/administrador/dashboard" className={`flex items-center p-3 rounded-lg ${isActive('/administrador/dashboard') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'} cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Dashboard</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/administrador/usuarios" className={`flex items-center p-3 rounded-lg ${isActive('/administrador/usuarios') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'} cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Usuarios</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/administrador/emprendimientos" className={`flex items-center p-3 rounded-lg ${isActive('/administrador/emprendimientos') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'} cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {!menuColapsado && <span className="ml-4">Emprendimientos</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/administrador/roles" className={`flex items-center p-3 rounded-lg ${isActive('/administrador/roles') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'} cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Roles y Permisos</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/administrador/facturacion" className={`flex items-center p-3 rounded-lg ${isActive('/administrador/facturacion') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'} cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Facturación</span>}
          </Link>
        </div>

        <div className="px-4 py-2">
          <Link href="/productos" className={`flex items-center p-3 rounded-lg hover:bg-[#048BA8]/20 transition-colors cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Ver Tienda</span>}
          </Link>
        </div>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#048BA8]/30 p-4">
        <button onClick={handleLogout} className="flex items-center p-3 w-full rounded-lg hover:bg-[#048BA8]/20 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!menuColapsado && <span className="ml-4">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );
} 