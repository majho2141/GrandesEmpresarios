'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { authService } from '@/services/api/auth.service';
import { UserResponse } from '@/services/api/auth.service';
import api from '@/services/api/axios';
import { AUTH_ENDPOINTS } from '@/constants/endpoints';

// Requisitos de contraseña
const passwordRequirements = [
  {
    id: 'length',
    text: 'Al menos 8 caracteres',
    regex: /.{8,}/
  },
  {
    id: 'uppercase',
    text: 'Al menos una mayúscula',
    regex: /[A-Z]/
  },
  {
    id: 'number',
    text: 'Al menos un número',
    regex: /[0-9]/
  },
  {
    id: 'special',
    text: 'Al menos un carácter especial',
    regex: /[^A-Za-z0-9]/
  }
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, setUser, setToken, clearAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userData, setUserData] = useState<UserResponse | null>(user);
  const [isLoading, setIsLoading] = useState(true);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [requirements, setRequirements] = useState(
    passwordRequirements.map(req => ({ ...req, met: false }))
  );
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      setIsLoading(true);
      
      // Verificar si hay token en localStorage
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        try {
          // Establecer el token en el store
          setToken(storedToken);
          
          // Intentar obtener información del usuario con el token
          const userProfile = await authService.getCurrentUser();
          setUser(userProfile);
          setUserData(userProfile);
          setIsLoading(false);
        } catch (error) {
          console.error('Error verificando sesión:', error);
          localStorage.removeItem('token');
          router.push('/auth/login');
        }
      } else if (!isAuthenticated) {
        // No hay token ni autenticación, redirigir a login
        router.push('/auth/login');
      } else {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [router, setToken, setUser, isAuthenticated]);

  // Actualiza userData cuando user cambia (por ejemplo, después de actualizar el perfil)
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    const newRequirements = requirements.map(req => ({
      ...req,
      met: req.regex.test(passwordData.newPassword)
    }));
    setRequirements(newRequirements);

    setPasswordsMatch(
      passwordData.confirmPassword === '' || 
      passwordData.newPassword === passwordData.confirmPassword
    );
  }, [passwordData.newPassword, passwordData.confirmPassword]);

  const handleSaveChanges = async () => {
    if (!userData) return;
    
    try {
      // Usamos authService.updateUser según la documentación de la API
      await authService.updateUser(userData.document_id, {
        name: userData.name,
        email: userData.email,
        phone_number: userData.phone_number,
        address: userData.address
      });
      
      // Actualizamos la información del usuario
      const updatedUser = await authService.getCurrentUser();
      setUserData(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handlePasswordChange = async () => {
    if (requirements.every(req => req.met) && passwordsMatch) {
      try {
        await authService.changePassword(
          passwordData.currentPassword,
          passwordData.newPassword
        );
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error('Error al cambiar contraseña:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      // Primero, llamamos al servicio de autenticación para limpiar
      await authService.logout();
      
      // Luego, limpiamos el estado global
      clearAuth();
      
      // Finalmente, redirigimos al login
      router.push('/auth/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Si falla, intentamos limpiar de todos modos
      clearAuth();
      router.push('/auth/login');
    }
  };

  const handleDeactivateAccount = async () => {
    if (!userData) return;
    
    if (window.confirm('¿Estás seguro de que deseas desactivar tu cuenta? Esta acción no se puede deshacer.')) {
      try {
        // Usamos authService.updateUser para desactivar la cuenta
        await authService.updateUser(userData.document_id, {
          is_active: false
        });
        clearAuth();
        router.push('/auth/login');
      } catch (error) {
        console.error('Error al desactivar cuenta:', error);
      }
    }
  };

  // Mostrar pantalla de carga mientras se verifica la sesión
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F4F8]">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-[#048BA8] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#2E4057] font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  // Renderizamos el perfil solo si userData existe
  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2E4057] to-[#048BA8] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            Mi Perfil
          </h1>
          <p className="font-opensans text-lg text-white/90 max-w-2xl">
            Gestiona tu información personal y detalles de tu cuenta
          </p>
        </div>
      </section>

      {userData && (
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar con foto y acciones principales */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="w-full h-full rounded-full bg-[#048BA8]/10 flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <h2 className="font-montserrat font-bold text-xl text-[#2E4057] mb-1">
                  {userData.name}
                </h2>
                <p className="font-opensans text-[#2E4057]/60 mb-4">
                  {userData.role?.name || 'Usuario'}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-[#2E4057]/60 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{userData.document_verified ? 'Verificado' : 'No verificado'}</span>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full bg-[#048BA8] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#048BA8]/90 transition-colors"
                >
                  {isEditing ? 'Cancelar Edición' : 'Editar Perfil'}
                </button>
              </div>

              {/* Estado de la cuenta */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-6">
                <h3 className="font-montserrat font-semibold text-[#2E4057] mb-4">
                  Estado de la Cuenta
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[#2E4057]/80">
                    <svg className="w-5 h-5 text-[#99C24D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-opensans text-sm">
                      Estado: {userData.is_active ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2E4057]/80">
                    <svg className="w-5 h-5 text-[#99C24D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-opensans text-sm">
                      ID: {userData.id}
                    </span>
                  </div>
                </div>    
                <button
                  onClick={handleLogout}
                  className="w-full mt-4 bg-white border border-[#E1E1E8] text-[#2E4057] font-semibold py-2 px-4 rounded-lg hover:border-[#048BA8] transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="md:col-span-2 space-y-6">
              {/* Información Personal */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-6">
                <h3 className="font-montserrat font-semibold text-xl text-[#2E4057] mb-6">
                  Información Personal
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-opensans text-sm font-medium text-[#2E4057]/60 mb-1">
                      Nombre completo
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value} as UserResponse)}
                        className="w-full px-4 py-2 border border-[#E1E1E8] rounded-lg text-[#2E4057] bg-white focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] outline-none"
                      />
                    ) : (
                      <p className="text-[#2E4057] font-medium">{userData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-opensans text-sm font-medium text-[#2E4057]/60 mb-1">
                      Correo electrónico
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value} as UserResponse)}
                        className="w-full px-4 py-2 border border-[#E1E1E8] rounded-lg text-[#2E4057] bg-white focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] outline-none"
                      />
                    ) : (
                      <p className="text-[#2E4057] font-medium">{userData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-opensans text-sm font-medium text-[#2E4057]/60 mb-1">
                      Teléfono
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phone_number}
                        onChange={(e) => setUserData({...userData, phone_number: e.target.value} as UserResponse)}
                        className="w-full px-4 py-2 border border-[#E1E1E8] rounded-lg text-[#2E4057] bg-white focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] outline-none"
                      />
                    ) : (
                      <p className="text-[#2E4057] font-medium">{userData.phone_number}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-opensans text-sm font-medium text-[#2E4057]/60 mb-1">
                      Documento
                    </label>
                    <p className="text-[#2E4057] font-medium">{userData.document_id}</p>
                  </div>
                  <div>
                    <label className="block font-opensans text-sm font-medium text-[#2E4057]/60 mb-1">
                      Dirección
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.address}
                        onChange={(e) => setUserData({...userData, address: e.target.value} as UserResponse)}
                        className="w-full px-4 py-2 border border-[#E1E1E8] rounded-lg text-[#2E4057] bg-white focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] outline-none"
                      />
                    ) : (
                      <p className="text-[#2E4057] font-medium">{userData.address}</p>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 border border-[#E1E1E8] text-[#2E4057] rounded-lg hover:border-[#048BA8] transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveChanges}
                      className="px-6 py-2 bg-[#048BA8] text-white rounded-lg hover:bg-[#048BA8]/90 transition-colors"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                )}
              </div>

              {/* Información del Rol */}
              {userData.role && (
                <div className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-6">
                  <h3 className="font-montserrat font-semibold text-xl text-[#2E4057] mb-6">
                    Información del Rol
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-opensans text-sm font-medium text-[#2E4057]/60 mb-1">
                        Nombre del rol
                      </label>
                      <p className="text-[#2E4057] font-medium">{userData.role.name}</p>
                    </div>
                    <div>
                      <label className="block font-opensans text-sm font-medium text-[#2E4057]/60 mb-1">
                        Descripción
                      </label>
                      <p className="text-[#2E4057] font-medium">{userData.role.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Sección de Contraseña */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-6">
                <h3 className="font-montserrat font-semibold text-xl text-[#2E4057] mb-6">
                  Contraseña
                </h3>
                {!isChangingPassword ? (
                  <div className="flex items-center justify-between">
                    <p className="font-opensans text-[#2E4057]/80">
                      Cambia tu contraseña para mantener tu cuenta segura
                    </p>
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="bg-white border border-[#048BA8] text-[#048BA8] font-semibold py-2 px-4 rounded-lg hover:bg-[#048BA8] hover:text-white transition-colors"
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-opensans text-sm font-medium text-[#2E4057]/60 mb-1">
                        Contraseña Actual
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-[#E1E1E8] rounded-lg text-[#2E4057] bg-white focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-opensans text-sm font-medium text-[#2E4057]/60 mb-1">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-2 border border-[#E1E1E8] rounded-lg text-[#2E4057] bg-white focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] outline-none"
                      />
                      <div className="mt-3 space-y-2">
                        {requirements.map((req) => (
                          <div key={req.id} className="flex items-center gap-2">
                            <svg 
                              className={`w-5 h-5 ${req.met ? 'text-[#99C24D]' : 'text-[#2E4057]/40'}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d={req.met ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}
                              />
                            </svg>
                            <span className={`text-sm ${req.met ? 'text-[#2E4057]' : 'text-[#2E4057]/60'}`}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block font-opensans text-sm font-medium text-[#2E4057]/60 mb-1">
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className={`w-full px-4 py-2 rounded-lg border text-[#2E4057] bg-white outline-none ${!passwordsMatch ? 'border-red-300 focus:border-red-500' : 'border-[#E1E1E8] focus:border-[#048BA8]'} focus:ring-1 focus:ring-[#048BA8]`}
                      />
                      {!passwordsMatch && passwordData.confirmPassword !== '' && (
                        <p className="mt-2 text-sm text-red-600">
                          Las contraseñas no coinciden
                        </p>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handlePasswordChange}
                        disabled={!requirements.every(req => req.met) || !passwordsMatch || !passwordData.currentPassword}
                        className="flex-1 bg-[#048BA8] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#048BA8]/90 transition-colors disabled:bg-[#E1E1E8] disabled:cursor-not-allowed"
                      >
                        Guardar Nueva Contraseña
                      </button>
                      <button
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          });
                        }}
                        className="flex-1 bg-white border border-[#E1E1E8] text-[#2E4057] font-semibold py-3 px-6 rounded-lg hover:border-[#048BA8] transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sección de Peligro */}
              <div className="bg-red-50 rounded-xl shadow-sm border border-red-100 p-6">
                <h3 className="font-montserrat font-semibold text-xl text-red-600 mb-4">
                  Zona de Peligro
                </h3>
                <p className="font-opensans text-red-600/80 mb-4">
                  Las siguientes acciones son permanentes y no se pueden deshacer.
                </p>
                <button
                  onClick={handleDeactivateAccount}
                  className="w-full md:w-auto bg-white border border-red-200 text-red-600 font-semibold py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Desactivar Cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 