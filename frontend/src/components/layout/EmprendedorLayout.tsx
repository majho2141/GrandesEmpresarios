'use client';

import React, { useState, ReactNode } from 'react';
import EmprendedorSidebar from './EmprendedorSidebar';
import DashboardHeader from './DashboardHeader';

interface EmprendedorLayoutProps {
  children: ReactNode;
  titulo: string;
}

export default function EmprendedorLayout({ children, titulo }: EmprendedorLayoutProps) {
  const [menuColapsado, setMenuColapsado] = useState(false);

  const toggleMenu = () => {
    setMenuColapsado(!menuColapsado);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <EmprendedorSidebar menuColapsado={menuColapsado} toggleMenu={toggleMenu} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader titulo={titulo} rol="emprendedor" />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 