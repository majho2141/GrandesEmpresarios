import React from 'react';
import Link from 'next/link';

export default function NuevoProducto() {
  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Encabezado de página */}
      <div className="bg-[#2E4057] text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Crear Nuevo Producto</h1>
          <div className="flex items-center mt-2">
            <Link href="/emprendedor/dashboard" className="text-[#F4F4F8] hover:text-[#F18F01]">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <Link href="/emprendedor/productos" className="text-[#F4F4F8] hover:text-[#F18F01]">
              Productos
            </Link>
            <span className="mx-2">/</span>
            <span>Nuevo Producto</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2E4057] mb-6">Información del Producto</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna izquierda - Detalles básicos */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto*</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                  placeholder="Ej: Smartwatch Pro 2023"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción*</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8] min-h-[150px]" 
                  placeholder="Describe tu producto detalladamente incluyendo características, materiales, etc."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU (Código de Producto)</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                    placeholder="Ej: SW-PRO-2023"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código de Barras (UPC, EAN)</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                    placeholder="Ej: 123456789012"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría*</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]">
                    <option value="">Seleccionar categoría</option>
                    <option value="electronica">Electrónica</option>
                    <option value="computacion">Computación</option>
                    <option value="audio">Audio</option>
                    <option value="fotografia">Fotografía</option>
                    <option value="perifericos">Periféricos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subcategoría</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]">
                    <option value="">Seleccionar subcategoría</option>
                    <option value="smartwatches">Smartwatches</option>
                    <option value="auriculares">Auriculares</option>
                    <option value="celulares">Celulares</option>
                    <option value="tablets">Tablets</option>
                    <option value="accesorios">Accesorios</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                    placeholder="Ej: TechPro"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Características/Especificaciones</label>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="text" 
                        className="w-full sm:w-1/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                        placeholder="Título (ej: Pantalla)"
                      />
                      <input 
                        type="text" 
                        className="w-full sm:w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                        placeholder="Valor (ej: 1.5\ AMOLED Touch)"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="text" 
                        className="w-full sm:w-1/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                        placeholder="Título (ej: Batería)"
                      />
                      <input 
                        type="text" 
                        className="w-full sm:w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                        placeholder="Valor (ej: 300mAh, hasta 5 días)"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="text" 
                        className="w-full sm:w-1/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                        placeholder="Título"
                      />
                      <input 
                        type="text" 
                        className="w-full sm:w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                        placeholder="Valor"
                      />
                    </div>
                  </div>
                  <button className="mt-3 text-sm text-[#048BA8] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Añadir otra característica
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Palabras clave (separadas por comas)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                  placeholder="Ej: smartwatch, tecnología, reloj inteligente, fitness"
                />
              </div>
            </div>
            
            {/* Columna derecha - Imágenes y precios */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imágenes del Producto</label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="mt-2 flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#048BA8] hover:text-[#037897] focus-within:outline-none">
                      <span>Cargar imágenes</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">o arrastra y suelta</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="relative bg-gray-100 rounded overflow-hidden h-16">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                      Vista previa
                    </div>
                  </div>
                  <div className="relative bg-gray-100 rounded overflow-hidden h-16">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                      Vista previa
                    </div>
                  </div>
                  <div className="relative bg-gray-100 rounded overflow-hidden h-16">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                      Vista previa
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-[#2E4057] mb-4">Precios e Inventario</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio de Venta*</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input type="text" className="focus:ring-[#048BA8] focus:border-[#048BA8] block w-full pl-7 pr-12 border-gray-300 rounded-md" placeholder="0.00" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio Regular</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input type="text" className="focus:ring-[#048BA8] focus:border-[#048BA8] block w-full pl-7 pr-12 border-gray-300 rounded-md" placeholder="0.00" />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Deja este campo vacío si no hay descuento</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Costo</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input type="text" className="focus:ring-[#048BA8] focus:border-[#048BA8] block w-full pl-7 pr-12 border-gray-300 rounded-md" placeholder="0.00" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad en Stock*</label>
                    <input 
                      type="number" 
                      min="0" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-900">
                      Gestionar inventario
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-900">
                      Permitir ventas aun sin stock
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2E4057] mb-6">Opciones de Envío</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] border-gray-300 rounded" checked />
              <label className="ml-2 block text-sm text-gray-900">
                Este producto requiere envío
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peso</label>
                <div className="flex">
                  <input 
                    type="text" 
                    className="w-full rounded-l-md border border-r-0 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                    placeholder="0.00"
                  />
                  <select className="rounded-r-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]">
                    <option>kg</option>
                    <option>g</option>
                    <option>lb</option>
                    <option>oz</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dimensiones</label>
                <div className="grid grid-cols-3 gap-1">
                  <input type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" placeholder="Largo" />
                  <input type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" placeholder="Ancho" />
                  <input type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" placeholder="Alto" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]">
                  <option>cm</option>
                  <option>mm</option>
                  <option>in</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2E4057] mb-6">Estado del Producto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]">
                <option value="activo">Activo - Visible en la tienda</option>
                <option value="borrador">Borrador - No visible en la tienda</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visibilidad</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]">
                <option value="publico">Público - Visible para todos</option>
                <option value="privado">Privado - Solo visible para usuarios específicos</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Link 
            href="/emprendedor/productos" 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </Link>
          <button 
            type="submit"
            className="px-4 py-2 bg-[#F18F01] hover:bg-[#e07c01] text-white rounded-md"
          >
            Guardar Producto
          </button>
        </div>
      </div>
    </div>
  );
} 