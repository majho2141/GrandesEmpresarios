'use client';

import { useState, useEffect } from 'react';
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

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone_number: z.string().min(10, 'El teléfono debe tener al menos 10 caracteres'),
  document_id: z.string().min(6, 'El documento debe tener al menos 6 caracteres'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe tener al menos una mayúscula')
    .regex(/[0-9]/, 'La contraseña debe tener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'La contraseña debe tener al menos un carácter especial'),
  confirmPassword: z.string(),
  userType: z.enum(['client', 'entrepreneur']),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones'
  }),
  enterprise: z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    NIT: z.string().min(9, 'El NIT debe tener al menos 9 caracteres'),
    email: z.string().email('Email inválido'),
    phone_number: z.string().min(10, 'El teléfono debe tener al menos 10 caracteres'),
    currency: z.string().min(3, 'La moneda debe tener al menos 3 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  }).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface PasswordRequirement {
  regex: RegExp;
  text: string;
  met: boolean;
}

export default function RegisterPage() {
  const [userType, setUserType] = useState<'client' | 'entrepreneur'>('client');
  const [password, setPassword] = useState('');
  const [requirements, setRequirements] = useState<PasswordRequirement[]>([
    { regex: /.{8,}/, text: 'Mínimo 8 caracteres', met: false },
    { regex: /[A-Z]/, text: 'Al menos una mayúscula', met: false },
    { regex: /[0-9]/, text: 'Al menos un número', met: false },
    { regex: /[^A-Za-z0-9]/, text: 'Al menos un carácter especial', met: false },
  ]);
  const router = useRouter();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: 'client' as const,
      acceptTerms: false,
    },
  });

  useEffect(() => {
    const updatedRequirements = requirements.map(req => ({
      ...req,
      met: req.regex.test(password)
    }));
    setRequirements(updatedRequirements);
  }, [password]);

  const onSubmit = handleSubmit(async (data: RegisterFormData) => {
    try {
      const registerData = {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        document_id: data.document_id,
        address: "No especificada", // Campo requerido por la API pero no usado en el frontend
        password: data.password,
        enterprise: data.userType === 'entrepreneur' ? data.enterprise : undefined
      };

      await authService.register(registerData);
      showAlert('success', '¡Registro exitoso! Por favor, verifica tu correo electrónico.');
      router.push(`/auth/verify?email=${data.email}`);
    } catch (error) {
      showAlert('error', 'Error al registrar. Por favor, intenta nuevamente.');
      console.error('Error al registrar:', error);
    }
  });

  const handleUserTypeChange = (type: 'client' | 'entrepreneur') => {
    setUserType(type);
    setValue('userType', type);
  };

  const handleGoogleRegister = async () => {
    try {
      showAlert('info', 'Registro con Google aún no implementado');
    } catch (error) {
      showAlert('error', 'Error al registrarse con Google');
      console.error('Error con Google register:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F4F4F8]">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
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
            Crear Cuenta
          </h2>
          <p className="text-center text-base font-opensans text-[#2E4057]/80">
            ¿Ya tienes una cuenta?{' '}
            <Link 
              href="/auth/login" 
              className="text-[#048BA8] hover:text-[#048BA8]/80 font-semibold transition-colors duration-300"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <Button
            type="button"
            onClick={() => handleUserTypeChange('client')}
            className={`px-6 py-2 rounded-lg font-montserrat transition-all duration-300 ${
              userType === 'client'
                ? 'bg-[#048BA8] text-white shadow-md'
                : 'bg-white text-[#2E4057] border-2 border-[#E1E1E8] hover:border-[#048BA8]'
            }`}
          >
            Cliente
          </Button>
          <Button
            type="button"
            onClick={() => handleUserTypeChange('entrepreneur')}
            className={`px-6 py-2 rounded-lg font-montserrat transition-all duration-300 ${
              userType === 'entrepreneur'
                ? 'bg-[#048BA8] text-white shadow-md'
                : 'bg-white text-[#2E4057] border-2 border-[#E1E1E8] hover:border-[#048BA8]'
            }`}
          >
            Emprendedor
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                Nombre
              </label>
              <Input
                id="name"
                type="text"
                {...register('name')}
                error={errors.name?.message}
                className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone_number" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                Teléfono
              </label>
              <Input
                id="phone_number"
                type="tel"
                {...register('phone_number')}
                error={errors.phone_number?.message}
                className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
              />
            </div>

            <div>
              <label htmlFor="document_id" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                Cédula
              </label>
              <Input
                id="document_id"
                type="text"
                {...register('document_id')}
                error={errors.document_id?.message}
                className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                Contraseña
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

          {userType === 'entrepreneur' && (
            <div className="space-y-6 border-t border-[#E1E1E8] pt-6">
              <h3 className="text-xl font-montserrat font-semibold text-[#2E4057] mb-4">
                Información del Emprendimiento
              </h3>
              
              <div>
                <label htmlFor="enterprise.name" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                  Nombre del Emprendimiento
                </label>
                <Input
                  id="enterprise.name"
                  type="text"
                  {...register('enterprise.name')}
                  error={errors.enterprise?.name?.message}
                  className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
                />
              </div>

              <div>
                <label htmlFor="enterprise.description" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                  Descripción
                </label>
                <textarea
                  id="enterprise.description"
                  {...register('enterprise.description')}
                  className={`w-full min-h-[100px] p-3 rounded-lg font-opensans resize-y border-[#E1E1E8] text-[#2E4057]
                    ${errors.enterprise?.description ? 'border-red-500' : 'border'}
                    focus:outline-none focus:ring-2 focus:ring-[#048BA8]/20 focus:border-[#048BA8]`}
                />
                {errors.enterprise?.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.enterprise.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="enterprise.NIT" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                    NIT
                  </label>
                  <Input
                    id="enterprise.NIT"
                    type="text"
                    {...register('enterprise.NIT')}
                    error={errors.enterprise?.NIT?.message}
                    className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
                  />
                </div>

                <div>
                  <label htmlFor="enterprise.address" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                    Dirección
                  </label>
                  <Input
                    id="enterprise.address"
                    type="text"
                    {...register('enterprise.address')}
                    error={errors.enterprise?.address?.message}
                    className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="acceptTerms"
              {...register('acceptTerms')}
              className="h-4 w-4 text-[#048BA8] border-[#E1E1E8] rounded focus:ring-[#048BA8]"
            />
            <label htmlFor="acceptTerms" className="ml-2 block text-sm font-opensans text-[#2E4057]/90">
              Acepto los{' '}
              <Link href="/terminos-y-condiciones" className="text-[#048BA8] hover:text-[#048BA8]/80 font-semibold">
                términos y condiciones
              </Link>
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-sm text-red-500">{errors.acceptTerms.message}</p>
            )}
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
            {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E1E1E8]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#2E4057]/60 font-opensans">
                O regístrate con
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={handleGoogleRegister}
            disabled={isSubmitting}
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