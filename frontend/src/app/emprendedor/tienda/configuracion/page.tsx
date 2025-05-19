'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import EmprendedorLayout from '@/components/layout/EmprendedorLayout';

export default function ConfiguracionTienda() {
  const [tiendaActiva, setTiendaActiva] = useState(true);
  const [notificacionesEmail, setNotificacionesEmail] = useState(true);
  const [notificacionesPush, setNotificacionesPush] = useState(false);
  const [permitirComentarios, setPermitirComentarios] = useState(true);
  const [permitirComprasInvitados, setPermitirComprasInvitados] = useState(false);

  return (
    <EmprendedorLayout titulo="Configuración de Tienda">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#2E4057]">Configuración General</h2>
            <p className="text-gray-500 mt-1">Personaliza los ajustes básicos de tu tienda</p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Estado de tienda */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Estado de la tienda</h3>
                <p className="text-sm text-gray-500">Activa o desactiva la visibilidad de tu tienda en la plataforma</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  name="toggle" 
                  id="toggleTienda" 
                  checked={tiendaActiva}
                  onChange={() => setTiendaActiva(!tiendaActiva)}
                  className="checked:bg-[#048BA8] outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label 
                  htmlFor="toggleTienda" 
                  className={`block overflow-hidden h-6 rounded-full cursor-pointer ${tiendaActiva ? 'bg-[#048BA8]' : 'bg-gray-300'}`}
                ></label>
              </div>
            </div>
            
            {/* Información de tienda */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Información de la tienda</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombreTienda" className="block text-sm font-medium text-gray-700 mb-1">Nombre de la tienda</label>
                  <input
                    type="text"
                    id="nombreTienda"
                    className="border border-gray-300 rounded-md p-2 w-full text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                    defaultValue="Eco Soluciones"
                  />
                </div>
                <div>
                  <label htmlFor="urlTienda" className="block text-sm font-medium text-gray-700 mb-1">URL de la tienda</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                      grandesempresarios.com/
                    </span>
                    <input
                      type="text"
                      id="urlTienda"
                      className="border border-gray-300 rounded-r-md p-2 w-full text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                      defaultValue="ecosoluciones"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <label htmlFor="descripcionTienda" className="block text-sm font-medium text-gray-700 mb-1">Descripción de la tienda</label>
                <textarea
                  id="descripcionTienda"
                  rows={4}
                  className="border border-gray-300 rounded-md p-2 w-full text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                  defaultValue="Ofrecemos soluciones ecológicas para el hogar y la oficina, enfocándonos en productos sostenibles y de alta calidad."
                ></textarea>
              </div>
            </div>
            
            {/* Notificaciones */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Notificaciones</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Notificaciones por email</p>
                    <p className="text-xs text-gray-500">Recibe alertas por email cuando recibas un pedido</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="toggleEmail" 
                      id="toggleEmail" 
                      checked={notificacionesEmail}
                      onChange={() => setNotificacionesEmail(!notificacionesEmail)}
                      className="checked:bg-[#048BA8] outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="toggleEmail" 
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${notificacionesEmail ? 'bg-[#048BA8]' : 'bg-gray-300'}`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Notificaciones push</p>
                    <p className="text-xs text-gray-500">Recibe notificaciones en el navegador</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="togglePush" 
                      id="togglePush" 
                      checked={notificacionesPush}
                      onChange={() => setNotificacionesPush(!notificacionesPush)}
                      className="checked:bg-[#048BA8] outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="togglePush" 
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${notificacionesPush ? 'bg-[#048BA8]' : 'bg-gray-300'}`}
                    ></label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Opciones de tienda */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Opciones de tienda</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Permitir comentarios en productos</p>
                    <p className="text-xs text-gray-500">Los clientes podrán dejar comentarios en tus productos</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="toggleComentarios" 
                      id="toggleComentarios" 
                      checked={permitirComentarios}
                      onChange={() => setPermitirComentarios(!permitirComentarios)}
                      className="checked:bg-[#048BA8] outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="toggleComentarios" 
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${permitirComentarios ? 'bg-[#048BA8]' : 'bg-gray-300'}`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Permitir compras a invitados</p>
                    <p className="text-xs text-gray-500">Los usuarios podrán comprar sin registrarse</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="toggleInvitados" 
                      id="toggleInvitados" 
                      checked={permitirComprasInvitados}
                      onChange={() => setPermitirComprasInvitados(!permitirComprasInvitados)}
                      className="checked:bg-[#048BA8] outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="toggleInvitados" 
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${permitirComprasInvitados ? 'bg-[#048BA8]' : 'bg-gray-300'}`}
                    ></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Cancelar
            </button>
            <button className="px-4 py-2 bg-[#048BA8] text-white rounded-md hover:bg-[#036d84] transition-colors">
              Guardar Cambios
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-[#2E4057]">Personalización de Tienda</h2>
            <p className="text-gray-500 mt-1">Personaliza la apariencia de tu tienda</p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Logo y colores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Logo de la tienda</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
                  <div className="h-32 w-32 bg-gray-200 rounded-md flex items-center justify-center mb-4">
                    <span className="text-gray-500">Logo</span>
                  </div>
                  <button className="px-4 py-2 bg-[#F18F01] text-white rounded-md hover:bg-[#e07c01] transition-colors">
                    Cambiar Logo
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Colores de la tienda</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="colorPrimario" className="block text-sm font-medium text-gray-700 mb-1">Color Primario</label>
                    <div className="flex">
                      <input
                        type="color"
                        id="colorPrimario"
                        defaultValue="#048BA8"
                        className="h-9 w-9 border-0 rounded-md cursor-pointer"
                      />
                      <input
                        type="text"
                        defaultValue="#048BA8"
                        className="border border-gray-300 rounded-md p-2 ml-2 w-full text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="colorSecundario" className="block text-sm font-medium text-gray-700 mb-1">Color Secundario</label>
                    <div className="flex">
                      <input
                        type="color"
                        id="colorSecundario"
                        defaultValue="#F18F01"
                        className="h-9 w-9 border-0 rounded-md cursor-pointer"
                      />
                      <input
                        type="text"
                        defaultValue="#F18F01"
                        className="border border-gray-300 rounded-md p-2 ml-2 w-full text-[#2E4057] focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Cancelar
            </button>
            <button className="px-4 py-2 bg-[#048BA8] text-white rounded-md hover:bg-[#036d84] transition-colors">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </EmprendedorLayout>
  );
} 