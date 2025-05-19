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
        router.push('/profile');
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
          
          {/* Separador */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E1E1E8]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#2E4057]/60">
                O continúa con
              </span>
            </div>
          </div>
          
          {/* Botón Google */}
          <button
            type="button"
            onClick={() => showAlert('info', 'Login con Google aún no implementado')}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-white border border-[#E1E1E8] p-3 rounded-lg text-[#2E4057] font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuar con Google
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