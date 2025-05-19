"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { ShoppingBag, User, ChevronDown, LogOut, Settings, Heart, Clock } from 'lucide-react';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/productos' },
  { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { name: 'Contacto', href: '/contacto' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const profileRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú de perfil cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Detectar scroll para cambiar la apariencia del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determinar si el usuario es cliente (para mostrar el carrito)
  const userRole = user?.role as string | undefined;
  const isClient = userRole === 'client' || userRole === 'cliente';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-3'
    }`}>
      {/* Fondo con efecto de blur */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white' 
          : 'bg-white'
      } shadow-md`}></div>
      
      <nav className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-all duration-300 hover:opacity-80">
            <Image
              src="/logoSecundario.png"
              alt="EmpreTech Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-montserrat px-4 py-2 text-[#2E4057] text-sm font-medium rounded-lg transition-all duration-200 hover:bg-[#048BA8]/10"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {/* Carrito de compras (solo para clientes) */}
                {isClient && (
                  <Link
                    href="/cliente/carrito"
                    className="relative p-2 rounded-full transition-all duration-200 hover:bg-[#F4F4F8] bg-white shadow-sm"
                    aria-label="Carrito de compras"
                  >
                    <ShoppingBag className="w-5 h-5 text-[#2E4057]" />
                    <span className="absolute -top-1 -right-1 bg-[#F18F01] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      0
                    </span>
                  </Link>
                )}
                
                {/* Perfil de usuario */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 bg-white shadow-sm text-[#2E4057] hover:bg-[#F4F4F8]"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#048BA8] to-[#F18F01] flex items-center justify-center text-white">
                      <span className="text-xs font-bold">{user?.name?.charAt(0) || 'U'}</span>
                    </div>
                    <span className="font-montserrat text-sm">
                      {user?.name || 'Usuario'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Menú desplegable de perfil */}
                  <div className={`absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-lg transition-all duration-200 origin-top-right ${
                    isProfileOpen 
                      ? 'transform scale-100 opacity-100' 
                      : 'transform scale-95 opacity-0 pointer-events-none'
                  }`}>
                    <div className="bg-white text-[#2E4057] rounded-xl ring-1 ring-[#E1E1E8] overflow-hidden">
                      <div className="p-4 border-b border-[#E1E1E8]">
                        <p className="text-sm font-semibold">{user?.name || 'Usuario'}</p>
                        <p className="text-xs text-[#2E4057]/60 truncate">{user?.email || 'correo@ejemplo.com'}</p>
                      </div>
                      <div className="py-1">
                        <Link 
                          href="/profile" 
                          className="flex items-center px-4 py-2 text-sm hover:bg-[#F4F4F8] transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3 text-[#048BA8]" />
                          Mi perfil
                        </Link>

                        {isClient && (
                          <>
                            <Link 
                              href="/cliente/historial-compras" 
                              className="flex items-center px-4 py-2 text-sm hover:bg-[#F4F4F8] transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Clock className="w-4 h-4 mr-3 text-[#048BA8]" />
                              Mis compras
                            </Link>
                            <Link 
                              href="/cliente/favoritos" 
                              className="flex items-center px-4 py-2 text-sm hover:bg-[#F4F4F8] transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Heart className="w-4 h-4 mr-3 text-[#048BA8]" />
                              Favoritos
                            </Link>
                          </>
                        )}

                        <Link 
                          href="/profile/configuracion" 
                          className="flex items-center px-4 py-2 text-sm hover:bg-[#F4F4F8] transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3 text-[#048BA8]" />
                          Configuración
                        </Link>
                      </div>
                      <div className="py-1 border-t border-[#E1E1E8]">
                        <button 
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-[#E53E3E] hover:bg-[#F4F4F8] transition-colors"
                          onClick={() => {
                            // Aquí va la lógica para cerrar sesión
                            setIsProfileOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="font-montserrat text-sm px-4 py-2 rounded-lg transition-all duration-200 border border-[#048BA8] text-[#048BA8] hover:bg-[#048BA8]/5"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="font-montserrat text-sm px-4 py-2 rounded-lg bg-[#048BA8] text-white transition-all duration-200 hover:bg-[#048BA8]/90 shadow-sm"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 relative">
              <span
                className={`absolute h-0.5 w-5 bg-[#2E4057] transform transition duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 bg-[#2E4057] transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'w-0 opacity-0' : 'w-5 opacity-100'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-5 bg-[#2E4057] transform transition duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-[90vh] opacity-100 mt-3' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col space-y-3">
            {/* Perfil y carrito (si está autenticado) en versión móvil */}
            {isAuthenticated && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F4F4F8]">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#048BA8] to-[#F18F01] flex items-center justify-center">
                    <span className="text-white font-bold">{user?.name?.charAt(0) || 'U'}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[#2E4057]">
                      {user?.name || 'Usuario'}
                    </p>
                    <p className="text-xs text-[#2E4057]/60">
                      {user?.email || 'correo@ejemplo.com'}
                    </p>
                  </div>
                </div>
                
                {isClient && (
                  <Link href="/cliente/carrito" className="relative p-2 rounded-full bg-white">
                    <ShoppingBag className="w-5 h-5 text-[#2E4057]" />
                    <span className="absolute -top-1 -right-1 bg-[#F18F01] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      0
                    </span>
                  </Link>
                )}
              </div>
            )}
            
            {/* Enlaces de navegación */}
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-montserrat text-sm px-4 py-3 rounded-lg text-[#2E4057] hover:bg-[#F4F4F8] transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#048BA8] mr-3"></span>
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Opciones de perfil (si está autenticado) */}
            {isAuthenticated ? (
              <div className="flex flex-col space-y-1 pt-2 border-t border-[#E1E1E8]">
                <Link
                  href="/profile"
                  className="font-montserrat text-sm px-4 py-3 rounded-lg text-[#2E4057] hover:bg-[#F4F4F8] transition-colors flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4 mr-3 text-[#048BA8]" />
                  <span>Mi Perfil</span>
                </Link>
                
                {isClient && (
                  <>
                    <Link
                      href="/cliente/historial-compras"
                      className="font-montserrat text-sm px-4 py-3 rounded-lg text-[#2E4057] hover:bg-[#F4F4F8] transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Clock className="w-4 h-4 mr-3 text-[#048BA8]" />
                      <span>Mis compras</span>
                    </Link>
                  </>
                )}
                
                <button
                  className="font-montserrat text-sm px-4 py-3 rounded-lg text-[#E53E3E] hover:bg-[#F4F4F8] transition-colors flex items-center text-left"
                  onClick={() => {
                    // Aquí va la lógica de cerrar sesión
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E1E1E8]">
                <Link
                  href="/auth/login"
                  className="font-montserrat text-sm py-2 rounded-lg border border-[#048BA8] text-[#048BA8] transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="font-montserrat text-sm py-2 rounded-lg bg-[#048BA8] text-white transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}; 