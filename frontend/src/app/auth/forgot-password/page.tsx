'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAlert } from '@/context/AlertContext';
import { authService } from '@/services/api/auth.service';

const forgotPasswordSchema = z.object({
  email: z.string().email('Ingresa un correo electrónico válido'),
  cedula: z.string().min(8, 'La cédula debe tener al menos 8 caracteres'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = handleSubmit(async (data: ForgotPasswordFormData) => {
    try {
      await authService.forgotPassword(data.email, data.cedula);
      showAlert('success', 'Se ha enviado un correo con las instrucciones para restablecer tu contraseña.');
      router.push('/auth/login');
    } catch (error) {
      showAlert('error', 'No se encontró una cuenta con esos datos. Por favor, verifica la información.');
      console.error('Error al solicitar cambio de contraseña:', error);
    }
  });

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
            Recuperar Contraseña
          </h2>
          <p className="text-center text-base font-opensans text-[#2E4057]/80 max-w-sm">
            Ingresa tu correo electrónico y cédula para recuperar tu contraseña. Te enviaremos las instrucciones por correo.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="ejemplo@correo.com"
                {...register('email')}
                error={errors.email?.message}
                className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
              />
            </div>

            <div>
              <label htmlFor="cedula" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                Cédula
              </label>
              <Input
                id="cedula"
                type="text"
                placeholder="Ingresa tu número de cédula"
                {...register('cedula')}
                error={errors.cedula?.message}
                className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            disabled={isSubmitting}
            className="bg-[#F18F01] hover:bg-[#F18F01]/90 text-white font-semibold py-3 transition-all duration-300 hover:shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando instrucciones...
              </div>
            ) : (
              'Enviar instrucciones'
            )}
          </Button>

          <div className="text-center space-y-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center text-[#048BA8] hover:text-[#048BA8]/80 font-semibold transition-colors duration-300"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 