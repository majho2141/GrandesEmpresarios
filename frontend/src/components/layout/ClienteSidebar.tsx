'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface ClienteSidebarProps {
  menuColapsado: boolean;
  toggleMenu: () => void;
}

export default function ClienteSidebar({ menuColapsado, toggleMenu }: ClienteSidebarProps) {
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
          <Link href="/cliente/dashboard" className={`flex items-center p-3 rounded-lg ${isActive('/cliente/dashboard') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'} cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Dashboard</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/cliente/historial-compras" className={`flex items-center p-3 rounded-lg ${isActive('/cliente/historial-compras') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'} cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {!menuColapsado && <span className="ml-4">Historial de Compras</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/cliente/carrito" className={`flex items-center p-3 rounded-lg ${isActive('/cliente/carrito') ? 'bg-[#048BA8] text-white' : 'hover:bg-[#048BA8]/20 transition-colors'} cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Carrito</span>}
          </Link>
        </div>
        
        <div className="px-4 py-2">
          <Link href="/productos" className={`flex items-center p-3 rounded-lg hover:bg-[#048BA8]/20 transition-colors cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {!menuColapsado && <span className="ml-4">Catálogo de Productos</span>}
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