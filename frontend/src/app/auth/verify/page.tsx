'use client';

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAlert } from '@/context/AlertContext';
import { authService } from '@/services/api/auth.service';

const verifySchema = z.object({
  code: z.string().length(6, 'El código debe tener 6 dígitos'),
});

type VerifyFormData = z.infer<typeof verifySchema>;

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showAlert } = useAlert();
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const email = searchParams.get('email');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
  });

  useEffect(() => {
    if (!email) {
      router.replace('/auth/login');
      return;
    }

    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown, canResend, email, router]);

  // Función para manejar el pegado del código
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Si el texto pegado tiene la longitud correcta y solo contiene números
    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setVerificationCode(newCode);
      
      // Enfocar el último input
      inputRefs[5].current?.focus();
    }
  };

  // Función para manejar el cambio en cada input
  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) { // Permite un solo dígito o vacío
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Si se ingresó un dígito y no es el último campo, mover al siguiente
      if (value && index < 5) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  // Función para manejar el retroceso
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      // Si el campo actual está vacío y presiona backspace, ir al anterior
      inputRefs[index - 1].current?.focus();
    }
  };

  // Efecto para verificar cuando se complete el código
  useEffect(() => {
    const fullCode = verificationCode.join('');
    // Actualizamos el valor del campo code en el formulario
    setValue('code', fullCode);
    
    if (verificationCode.every(digit => digit !== '')) {
      // TODO: Aquí puedes implementar la lógica de verificación
      console.log('Código completo:', fullCode);
    }
  }, [verificationCode, setValue]);

  const onSubmit = handleSubmit(async (data: VerifyFormData) => {
    if (!email) return;
    
    try {
      await authService.verifyEmail(data.code, email);
      showAlert('success', '¡Correo verificado exitosamente!');
      router.push('/auth/login');
    } catch (error) {
      showAlert('error', 'Código inválido. Por favor, intenta nuevamente.');
      console.error('Error al verificar el código:', error);
    }
  });

  const handleResendCode = async () => {
    if (!email || !canResend) return;

    try {
      await authService.resendVerificationCode(email);
      showAlert('success', 'Se ha enviado un nuevo código a tu correo.');
      setCountdown(30);
      setCanResend(false);
    } catch (error) {
      showAlert('error', 'Error al reenviar el código. Por favor, intenta nuevamente.');
      console.error('Error al reenviar el código:', error);
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
            Verificar Correo
          </h2>
          <p className="text-center text-base font-opensans text-[#2E4057]/80 max-w-sm">
            Hemos enviado un código de verificación a{' '}
            <span className="font-semibold text-[#2E4057]">
              {email}
            </span>
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          {/* Input oculto para el código completo */}
          <input type="hidden" {...register('code')} />
          
          <div className="mt-8">
            <div className="flex justify-center gap-3">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-2xl font-semibold rounded-lg border-2 border-[#E1E1E8] focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] transition-all text-[#2E4057] bg-white"
                />
              ))}
            </div>

            <div className="mt-8 space-y-4">
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
                    Verificando...
                  </div>
                ) : (
                  'Verificar código'
                )}
              </Button>

              <div className="text-center space-y-4">
                <p className="text-sm font-opensans text-[#2E4057]/70">
                  ¿No recibiste el código?{' '}
                  {canResend ? (
                    <button
                      onClick={handleResendCode}
                      className="text-[#048BA8] hover:text-[#048BA8]/80 font-semibold transition-colors duration-300 cursor-pointer"
                    >
                      Reenviar código
                    </button>
                  ) : (
                    <span className="text-[#2E4057]/50">
                      Reenviar en {countdown}s
                    </span>
                  )}
                </p>

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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 