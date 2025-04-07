"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/productos' },
  { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { name: 'Contacto', href: '/contacto' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#2E4057] text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center transform transition-all duration-300 hover:scale-105">
            <Image
              src="/logoPrincipal.png"
              alt="EmpreTech Logo"
              width={150}
              height={40}
              className="h-10 w-auto drop-shadow-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-montserrat text-base relative group py-2"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {item.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#048BA8] transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 w-full h-0 bg-[#048BA8]/10 transition-all duration-300 group-hover:h-full rounded-lg"></span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/auth/login"
              className="font-montserrat text-base px-6 py-2 rounded-lg bg-[#048BA8]/10 border-2 border-[#048BA8] text-white transition-all duration-300 hover:bg-[#048BA8] hover:text-white hover:shadow-lg hover:scale-105 backdrop-blur-sm"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/register"
              className="font-montserrat text-base px-6 py-2 rounded-lg bg-[#F18F01] border-2 border-[#F18F01] text-white transition-all duration-300 hover:bg-[#F18F01]/90 hover:shadow-lg hover:scale-105"
            >
              Registrarse
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 focus:outline-none group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="absolute w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <span
                className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 delay-200' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 bg-white transform transition-all duration-200 ease-in-out ${
                  isMenuOpen ? 'w-0 opacity-50' : 'w-5 delay-200 opacity-100'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 delay-200' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 mt-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col space-y-4 pb-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-montserrat text-base transform transition-all duration-300 hover:translate-x-2 hover:text-[#048BA8] flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-1 h-1 rounded-full bg-[#048BA8] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span>{item.name}</span>
              </Link>
            ))}
            <hr className="border-white/10" />
            <Link
              href="/auth/login"
              className="font-montserrat text-base px-4 py-2 rounded-lg bg-[#048BA8]/10 border-2 border-[#048BA8] text-white transition-all duration-300 hover:bg-[#048BA8] hover:text-white text-center backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/register"
              className="font-montserrat text-base px-4 py-2 rounded-lg bg-[#F18F01] border-2 border-[#F18F01] text-white transition-all duration-300 hover:bg-[#F18F01]/90 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Registrarse
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}; 