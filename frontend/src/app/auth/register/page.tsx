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
}).refine((data) => {
  // Si es emprendedor, verificar que los datos de empresa estén completos
  if (data.userType === 'entrepreneur') {
    return data.enterprise && 
           data.enterprise.name && 
           data.enterprise.NIT && 
           data.enterprise.email && 
           data.enterprise.phone_number && 
           data.enterprise.currency && 
           data.enterprise.description && 
           data.enterprise.address;
  }
  return true;
}, {
  message: 'Todos los campos del emprendimiento son requeridos',
  path: ['enterprise'],
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
    
    if (type === 'entrepreneur') {
      // Inicializar campos de empresa con valores vacíos para evitar errores de validación
      setValue('enterprise.name', '');
      setValue('enterprise.NIT', '');
      setValue('enterprise.email', '');
      setValue('enterprise.phone_number', '');
      setValue('enterprise.currency', 'COP'); // Valor por defecto para moneda
      setValue('enterprise.description', '');
      setValue('enterprise.address', '');
    }
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F4F4F8] mt-16">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="enterprise.email" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                    Email del Emprendimiento
                  </label>
                  <Input
                    id="enterprise.email"
                    type="email"
                    {...register('enterprise.email')}
                    error={errors.enterprise?.email?.message}
                    className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
                  />
                </div>

                <div>
                  <label htmlFor="enterprise.phone_number" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                    Teléfono del Emprendimiento
                  </label>
                  <Input
                    id="enterprise.phone_number"
                    type="tel"
                    {...register('enterprise.phone_number')}
                    error={errors.enterprise?.phone_number?.message}
                    className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="enterprise.currency" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium">
                  Moneda
                </label>
                <Input
                  id="enterprise.currency"
                  type="text"
                  defaultValue="COP"
                  {...register('enterprise.currency')}
                  error={errors.enterprise?.currency?.message}
                  className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057]"
                />
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
        </form>
      </div>
    </div>
  );
} 