'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAlert } from '@/context/AlertContext';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/api/auth.service';
import { Alert } from '@/components/ui/Alert';

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { setUser, setToken } = useAuthStore();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      const response = await authService.login(data.email, data.password);
      // Guardamos el token
      localStorage.setItem('token', response.access_token);
      // Configuramos el token en el estado global
      setToken(response.access_token);
      
      // Obtenemos la información del usuario
      const userProfile = await authService.getCurrentUser();
      // Actualizamos el estado global con la información del usuario
      setUser(userProfile);
      
      showAlert('success', '¡Inicio de sesión exitoso!');
      router.push('/profile'); // Redirigimos al perfil
    } catch (error) {
      // Mostrar el mensaje de error
      showAlert('error', 'Credenciales inválidas. Por favor, intenta nuevamente.');
      console.error('Error al iniciar sesión:', error);
    } finally {
      setIsLoading(false);
    }
    
    // No devolvemos nada para evitar cualquier comportamiento predeterminado adicional
  };

  const handleGoogleLogin = async () => {
    try {
      // TODO: Implementar login con Google
      showAlert('info', 'Login con Google aún no implementado');
    } catch (error) {
      showAlert('error', 'Error al iniciar sesión con Google');
      console.error('Error con Google login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F4F4F8]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <Link href="/" className="transform transition-all duration-300 hover:scale-105">
            <Image
              src="/logoSecundario.png"
              alt="EmpreTech Logo"
              width={180}
              height={60}
              className="mb-8 drop-shadow-md"
            />
          </Link>
          <h2 className="text-center text-3xl font-montserrat font-bold text-[#048BA8] mb-3">
            Iniciar Sesión
          </h2>
          <p className="text-center text-base font-opensans text-[#2E4057]/80">
            ¿No tienes una cuenta?{' '}
            <Link 
              href="/auth/register" 
              className="text-[#048BA8] hover:text-[#048BA8]/80 font-semibold transition-colors duration-300"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        {error && (
          <div className="mt-4 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <form 
          className="mt-8 space-y-6" 
          onSubmit={(e) => {
            e.preventDefault(); // Previene explícitamente la recarga
            handleSubmit(onSubmit)(e);
          }} 
          noValidate
        >
          <div>
            <label htmlFor="email" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
              className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              error={errors.password?.message}
              className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
            />
          </div>

          <div className="flex items-center justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm font-opensans text-[#048BA8] hover:text-[#048BA8]/80 transition-colors duration-300"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button 
            type="button" 
            fullWidth 
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
            disabled={isLoading}
            className="bg-[#F18F01] hover:bg-[#F18F01]/90 text-white font-semibold py-3 transition-all duration-300 hover:shadow-lg"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E1E1E8]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#2E4057]/60 font-opensans">
                O continúa con
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="bg-white border-[#E1E1E8] text-[#2E4057] font-semibold py-3 transition-all duration-300 hover:bg-white hover:border-[#E1E1E8]"
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
          </Button>
        </form>
      </div>
    </div>
  );
} 