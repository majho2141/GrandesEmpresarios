'use client';

import React, { useState, ReactNode } from 'react';
import ClienteSidebar from './ClienteSidebar';
import EmprendedorSidebar from './EmprendedorSidebar';
import AdministradorSidebar from './AdministradorSidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: ReactNode;
  titulo: string;
  rol: 'cliente' | 'emprendedor' | 'administrador';
}

export default function DashboardLayout({ children, titulo, rol }: DashboardLayoutProps) {
  const [menuColapsado, setMenuColapsado] = useState(false);

  const toggleMenu = () => {
    setMenuColapsado(!menuColapsado);
  };

  // Renderizar el sidebar correspondiente según el rol
  const renderSidebar = () => {
    switch (rol) {
      case 'cliente':
        return <ClienteSidebar menuColapsado={menuColapsado} toggleMenu={toggleMenu} />;
      case 'emprendedor':
        return <EmprendedorSidebar menuColapsado={menuColapsado} toggleMenu={toggleMenu} />;
      case 'administrador':
        return <AdministradorSidebar menuColapsado={menuColapsado} toggleMenu={toggleMenu} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {renderSidebar()}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader titulo={titulo} rol={rol} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 