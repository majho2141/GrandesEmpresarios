'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  
  // Verificar si la ruta actual es parte del dashboard
  const isDashboardRoute = 
    pathname?.startsWith('/cliente/dashboard') || 
    pathname?.startsWith('/emprendedor/dashboard') || 
    pathname?.startsWith('/administrador/dashboard') ||
    pathname?.startsWith('/cliente/') ||
    pathname?.startsWith('/emprendedor/') ||
    pathname?.startsWith('/administrador/');
  
  // Si es una ruta de dashboard, solo renderiza el contenido sin header ni footer
  if (isDashboardRoute) {
    return <main className="flex-grow">{children}</main>;
  }
  
  // Si no es una ruta de dashboard, renderiza el layout completo
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}; 