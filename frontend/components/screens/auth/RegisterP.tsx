'use client'
import { useState } from 'react'
import { register } from '@/services/authService'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterP() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        acceptTerms: false
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData.fullName, formData.email, formData.password);
            alert("Registro exitoso");
        } catch (error) {
            console.error("Error en el registro", error);
        }
    };    

    return (
        <div className="w-full">
            <div className="flex flex-col items-center">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="mb-6"
                />
                
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                    Regístrate
                </h2>
                <p className="text-sm text-gray-600 mb-8">
                    Crea una cuenta para comenzar
                </p>

                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            required
                            className="w-full px-3 text-black py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#76B947] transition-colors bg-[#F8F8F8]"
                            placeholder="Nombre Completo"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                        <input
                            type="email"
                            required
                            className="w-full px-3 text-black py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#76B947] transition-colors bg-[#F8F8F8]"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <input
                            type="password"
                            required
                            className="w-full px-3 text-black py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#76B947] transition-colors bg-[#F8F8F8]"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <div className="text-sm flex justify-center">
                            <span className="text-gray-600">¿Ya tienes una cuenta? <Link 
                                    href="/login" className="text-blue-600 hover:text-blue-800">
                                    Iniciar sesión
                                </Link>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="terms"
                                type="checkbox"
                                className="h-4 w-4 text-[#76B947] border-gray-200 rounded focus:ring-[#76B947]"
                                checked={formData.acceptTerms}
                                onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                Acepto los términos y condiciones
                            </label>
                        </div>
                        
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#76B947] text-white py-2 rounded-md text-sm font-medium hover:bg-[#5a8c35] transition-colors"
                    >
                        Regístrate
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">o continúa con</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <Image
                            src="/google.png"
                            alt="Google"
                            width={16}
                            height={16}
                            className="mr-2"
                        />
                        Google
                    </button>
                </form>
            </div>
        </div>
    )
}