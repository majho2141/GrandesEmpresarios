'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Datos de ejemplo
const mockUserData = {
  nombre: "Juan Carlos",
  apellido: "Rodríguez",
  email: "juan.rodriguez@email.com",
  cedula: "1234567890",
  telefono: "+57 300 123 4567",
  tipoUsuario: "emprendedor",
  emprendimiento: {
    nombre: "TechSolutions Colombia",
    descripcion: "Soluciones tecnológicas para pequeñas empresas",
    categoria: "Tecnología",
    fechaCreacion: "2023-01-15"
  },
  fechaRegistro: "2023-12-01"
};

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
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUserData);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [requirements, setRequirements] = useState(
    passwordRequirements.map(req => ({ ...req, met: false }))
  );
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Validar requisitos de contraseña
  useEffect(() => {
    const newRequirements = requirements.map(req => ({
      ...req,
      met: req.regex.test(passwordData.newPassword)
    }));
    setRequirements(newRequirements);

    // Validar que las contraseñas coincidan
    setPasswordsMatch(
      passwordData.confirmPassword === '' || 
      passwordData.newPassword === passwordData.confirmPassword
    );
  }, [passwordData.newPassword, passwordData.confirmPassword]);

  // Esta función se activará cuando tengamos la API
  const handleSaveChanges = () => {
    setIsEditing(false);
    // TODO: Implementar llamada a API
    // const response = await updateUserProfile(userData);
  };

  // Esta función se activará cuando tengamos la API
  const handlePasswordChange = () => {
    if (requirements.every(req => req.met) && passwordsMatch) {
      // TODO: Implementar llamada a API
      // const response = await updatePassword(passwordData);
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

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
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-[#E1E1E8] hover:border-[#048BA8] transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h2 className="font-montserrat font-bold text-xl text-[#2E4057] mb-1">
                {userData.nombre} {userData.apellido}
              </h2>
              <p className="font-opensans text-[#2E4057]/60 mb-4">
                {userData.tipoUsuario === 'emprendedor' ? 'Emprendedor' : 'Cliente'}
              </p>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-[#048BA8] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#048BA8]/90 transition-colors cursor-pointer"
              >
                {isEditing ? 'Cancelar Edición' : 'Editar Perfil'}
              </button>
            </div>

            {/* Estadísticas o información adicional */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-6">
              <h3 className="font-montserrat font-semibold text-[#2E4057] mb-4">
                Información de la Cuenta
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#2E4057]/80">
                  <svg className="w-5 h-5 text-[#99C24D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-opensans text-sm">
                    Miembro desde {new Date(userData.fechaRegistro).toLocaleDateString()}
                  </span>
                </div>
                {userData.tipoUsuario === 'emprendedor' && (
                  <div className="flex items-center gap-3 text-[#2E4057]/80">
                    <svg className="w-5 h-5 text-[#99C24D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-opensans text-sm">
                      Emprendimiento creado el {new Date(userData.emprendimiento.fechaCreacion).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
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
                  <label className="block font-opensans text-sm font-medium text-[#2E4057] mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={userData.nombre}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-[#E1E1E8] focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] disabled:bg-[#F4F4F8] disabled:cursor-not-allowed transition-colors text-[#2E4057]"
                    onChange={(e) => setUserData({...userData, nombre: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block font-opensans text-sm font-medium text-[#2E4057] mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={userData.apellido}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-[#E1E1E8] focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] disabled:bg-[#F4F4F8] disabled:cursor-not-allowed transition-colors text-[#2E4057]"
                    onChange={(e) => setUserData({...userData, apellido: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block font-opensans text-sm font-medium text-[#2E4057] mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-[#E1E1E8] focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] disabled:bg-[#F4F4F8] disabled:cursor-not-allowed transition-colors text-[#2E4057]"
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block font-opensans text-sm font-medium text-[#2E4057] mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={userData.telefono}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-[#E1E1E8] focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] disabled:bg-[#F4F4F8] disabled:cursor-not-allowed transition-colors text-[#2E4057]"
                    onChange={(e) => setUserData({...userData, telefono: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block font-opensans text-sm font-medium text-[#2E4057] mb-2">
                    Cédula
                  </label>
                  <input
                    type="text"
                    value={userData.cedula}
                    disabled={true}
                    className="w-full px-4 py-2 rounded-lg border border-[#E1E1E8] bg-[#F4F4F8] cursor-not-allowed text-[#2E4057]"
                  />
                </div>
              </div>
            </div>

            {/* Información del Emprendimiento (solo para emprendedores) */}
            {userData.tipoUsuario === 'emprendedor' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#E1E1E8] p-6">
                <h3 className="font-montserrat font-semibold text-xl text-[#2E4057] mb-6">
                  Información del Emprendimiento
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block font-opensans text-sm font-medium text-[#2E4057] mb-2">
                      Nombre del Emprendimiento
                    </label>
                    <input
                      type="text"
                      value={userData.emprendimiento.nombre}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-[#E1E1E8] focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] disabled:bg-[#F4F4F8] disabled:cursor-not-allowed transition-colors text-[#2E4057]"
                      onChange={(e) => setUserData({
                        ...userData,
                        emprendimiento: {...userData.emprendimiento, nombre: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block font-opensans text-sm font-medium text-[#2E4057] mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={userData.emprendimiento.descripcion}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-[#E1E1E8] focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] disabled:bg-[#F4F4F8] disabled:cursor-not-allowed transition-colors text-[#2E4057]"
                      onChange={(e) => setUserData({
                        ...userData,
                        emprendimiento: {...userData.emprendimiento, descripcion: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block font-opensans text-sm font-medium text-[#2E4057] mb-2">
                      Categoría
                    </label>
                    <select
                      value={userData.emprendimiento.categoria}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-[#E1E1E8] focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] disabled:bg-[#F4F4F8] disabled:cursor-not-allowed transition-colors text-[#2E4057]"
                      onChange={(e) => setUserData({
                        ...userData,
                        emprendimiento: {...userData.emprendimiento, categoria: e.target.value}
                      })}
                    >
                      <option value="Tecnología">Tecnología</option>
                      <option value="Alimentos">Alimentos</option>
                      <option value="Servicios">Servicios</option>
                      <option value="Comercio">Comercio</option>
                    </select>
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
                    className="bg-white border border-[#048BA8] text-[#048BA8] font-semibold py-2 px-4 rounded-lg hover:bg-[#048BA8] hover:text-white transition-colors cursor-pointer"
                  >
                    Cambiar Contraseña
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block font-opensans text-sm font-medium text-[#2E4057] mb-2">
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      className="w-full px-4 py-2 rounded-lg border border-[#E1E1E8] focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] transition-colors text-[#2E4057]"
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block font-opensans text-sm font-medium text-[#2E4057] mb-2">
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      className="w-full px-4 py-2 rounded-lg border border-[#E1E1E8] focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] transition-colors text-[#2E4057]"
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    />
                    {/* Requisitos de contraseña */}
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
                    <label className="block font-opensans text-sm font-medium text-[#2E4057] mb-2">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      className={`w-full px-4 py-2 rounded-lg border ${!passwordsMatch ? 'border-red-300 focus:border-red-500' : 'border-[#E1E1E8] focus:border-[#048BA8]'} focus:ring-1 focus:ring-[#048BA8] transition-colors text-[#2E4057]`}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
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
                      className="flex-1 bg-[#048BA8] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#048BA8]/90 transition-colors cursor-pointer disabled:bg-[#E1E1E8] disabled:cursor-not-allowed"
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
                      className="flex-1 bg-white border border-[#E1E1E8] text-[#2E4057] font-semibold py-3 px-6 rounded-lg hover:border-[#048BA8] transition-colors cursor-pointer"
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
                className="w-full md:w-auto bg-white border border-red-200 text-red-600 font-semibold py-2 px-4 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
              >
                Desactivar Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 