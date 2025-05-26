'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/context/AlertContext';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/api/auth.service';

// Esquema de validación con zod
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

// Tipo para nuestro formulario
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setUser, setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  // Configuración de react-hook-form con zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Función que se ejecutará cuando el formulario sea válido
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      // Autenticar usuario
      const response = await authService.login(data.email, data.password);
      
      // Guardar token
      localStorage.setItem('token', response.access_token);
      setToken(response.access_token);
      
      // Obtener perfil de usuario
      const userProfile = await authService.getCurrentUser();
      setUser(userProfile);
      
      // Mostrar mensaje de éxito
      showAlert('success', '¡Inicio de sesión exitoso!');
      
      // Retraso breve antes de redireccionar
      setTimeout(() => {
        // Redirigir según el rol del usuario
        const userRole = userProfile.role?.name?.toLowerCase();
        if (userRole === 'cliente' || userRole === 'client') {
          router.push('/cliente/dashboard');
        } else if (userRole === 'administrador' || userRole === 'admin') {
          router.push('/administrador/dashboard');
        } else if (userRole === 'emprendedor') {
          router.push('/emprendedor/dashboard');
        } else {
          router.push('/profile');
        }
      }, 500);
    } catch (error) {
      console.error('Error de autenticación:', error);
      showAlert('error', 'Credenciales inválidas. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F4F8] p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image
              src="/logoSecundario.png"
              alt="EmpreTech Logo"
              width={180}
              height={60}
              priority
              className="drop-shadow-md"
            />
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6 text-[#048BA8]">
          Iniciar Sesión
        </h1>
        
        {/* Formulario con react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-[#2E4057] font-medium mb-2">
              Correo electrónico
            </label>
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              className="w-full p-3 border border-[#E1E1E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048BA8] text-[#2E4057]"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-[#2E4057] font-medium mb-2">
              Contraseña
            </label>
            <input
              {...register('password')}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full p-3 border border-[#E1E1E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#048BA8] text-[#2E4057]"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <Link href="/auth/forgot-password" className="text-[#048BA8] text-sm hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#F18F01] hover:bg-[#F18F01]/90 text-white p-3 rounded-lg font-semibold transition-colors shadow hover:shadow-md cursor-pointer"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-[#2E4057]">
            ¿No tienes una cuenta?{' '}
            <Link href="/auth/register" className="text-[#048BA8] font-semibold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 