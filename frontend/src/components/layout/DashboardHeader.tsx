'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';

interface DashboardHeaderProps {
  titulo: string;
  rol: 'cliente' | 'emprendedor' | 'administrador';
  userName?: string;
  userEmail?: string;
}

export default function DashboardHeader({ titulo, rol, userName, userEmail }: DashboardHeaderProps) {
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

        {/* Información del usuario */}
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-[#048BA8] flex items-center justify-center text-white">
            {(userName || user?.name || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">
              {userName || user?.name || `Usuario ${rol.charAt(0).toUpperCase() + rol.slice(1)}`}
            </p>
            <p className="text-xs text-gray-500">{userEmail || user?.email || rol.charAt(0).toUpperCase() + rol.slice(1)}</p>
          </div>
        </div>
      </div>
    </header>
  );
} 