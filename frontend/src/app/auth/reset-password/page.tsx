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
import { useEffect, useState, Suspense } from 'react';

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface PasswordRequirement {
  regex: RegExp;
  text: string;
  met: boolean;
}

function ResetPasswordForm() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [password, setPassword] = useState('');
  const [requirements, setRequirements] = useState<PasswordRequirement[]>([
    { regex: /.{8,}/, text: 'Mínimo 8 caracteres', met: false },
    { regex: /[A-Z]/, text: 'Al menos una mayúscula', met: false },
    { regex: /[0-9]/, text: 'Al menos un número', met: false },
    { regex: /[^A-Za-z0-9]/, text: 'Al menos un carácter especial', met: false },
  ]);
  
  // Importamos useSearchParams dentro del componente cliente que está dentro de Suspense
  const { useSearchParams } = require('next/navigation');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.replace('/auth/forgot-password');
    }
  }, [token, router]);

  useEffect(() => {
    const updatedRequirements = requirements.map(req => ({
      ...req,
      met: req.regex.test(password)
    }));
    setRequirements(updatedRequirements);
  }, [password]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = handleSubmit(async (data: ResetPasswordFormData) => {
    if (!token) {
      showAlert('error', 'Token inválido o expirado. Por favor, solicita un nuevo enlace.');
      router.push('/auth/forgot-password');
      return;
    }

    try {
      await authService.resetPassword(token, data.password);
      showAlert('success', '¡Contraseña actualizada exitosamente!');
      router.push('/auth/login');
    } catch (error) {
      showAlert('error', 'Error al restablecer la contraseña. Por favor, intenta nuevamente.');
      console.error('Error al restablecer la contraseña:', error);
    }
  });

  if (!token) {
    return null;
  }

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
            Nueva Contraseña
          </h2>
          <p className="text-center text-base font-opensans text-[#2E4057]/80 max-w-sm">
            Ingresa y confirma tu nueva contraseña para restablecer el acceso a tu cuenta
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                Nueva contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                error={errors.password?.message}
                className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
                onChange={(e) => setPassword(e.target.value)}
              />
              <ul className="mt-2 space-y-1 text-sm font-opensans">
                {requirements.map((req, index) => (
                  <li 
                    key={index} 
                    className={`flex items-center transition-colors duration-300 ${
                      req.met ? 'text-[#99C24D]' : 'text-[#2E4057]/60'
                    }`}
                  >
                    <svg 
                      className={`w-4 h-4 mr-2 transition-colors duration-300 ${
                        req.met ? 'text-[#99C24D]' : 'text-[#2E4057]/60'
                      }`} 
                      fill={req.met ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d={req.met 
                          ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                          : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        } 
                      />
                    </svg>
                    {req.text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                Confirmar contraseña
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            disabled={isSubmitting || !requirements.every(req => req.met)}
            className={`text-white font-semibold py-3 transition-all duration-300 hover:shadow-lg ${
              requirements.every(req => req.met)
                ? 'bg-[#F18F01] hover:bg-[#F18F01]/90'
                : 'bg-[#F18F01]/50 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Actualizando...
              </div>
            ) : (
              'Actualizar contraseña'
            )}
          </Button>

          <div className="text-center">
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F8]">
        <div className="text-center">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-[#048BA8] border-t-transparent rounded-full mb-4"></div>
          <p className="text-[#2E4057]">Cargando...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
} 