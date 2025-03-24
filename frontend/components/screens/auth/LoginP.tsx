'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { tokens } from '@/components/tokens'

export default function LoginP() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí irá la lógica de login
    }

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
                    Iniciar sesión
                </h2>
                <p className="text-sm text-gray-600 mb-8">
                    Accede a tu cuenta
                </p>

                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="email"
                            required
                            className="w-full px-3 text-black py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#76B947] transition-colors"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <input
                            type="password"
                            required
                            className="w-full px-3 text-black py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#76B947] transition-colors"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <div className="text-sm flex justify-center">
                        <span className="text-gray-600">¿No tienes una cuenta? <Link 
                                href="/register" className="text-blue-600 hover:text-blue-800">
                                Regístrate
                            </Link>
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="h-4 w-4 text-[#76B947] border-gray-200 rounded focus:ring-[#76B947]"
                                checked={formData.remember}
                                onChange={(e) => setFormData({...formData, remember: e.target.checked})}
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                Recuérdame
                            </label>
                        </div>
                        
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#76B947] text-white py-2 rounded-md text-sm font-medium hover:bg-[#5a8c35] transition-colors"
                    >
                        Iniciar sesión
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