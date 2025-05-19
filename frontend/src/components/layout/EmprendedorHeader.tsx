'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';

interface EmprendedorHeaderProps {
  titulo: string;
}

export default function EmprendedorHeader({ titulo }: EmprendedorHeaderProps) {
  const { user } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-[#2E4057]">{titulo}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notificaciones */}
        <button className="relative p-2 text-gray-500 hover:text-[#048BA8] transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </button>

        {/* Ícono de perfil */}
        <Link 
          href="/profile" 
          className="relative p-2 text-gray-500 hover:text-[#048BA8] transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>

        {/* Información del usuario */}
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-[#048BA8] flex items-center justify-center text-white">
            {user?.name?.charAt(0) || 'E'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">
              {user?.name || 'Usuario Emprendedor'}
            </p>
            <p className="text-xs text-gray-500">Emprendedor</p>
          </div>
        </div>
      </div>
    </header>
  );
} 