'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EditarProducto() {
  const params = useParams();
  const productoId = params.id;
  
  // Estado para el producto (simulado, en una aplicación real se cargaría desde una API)
  const [producto, setProducto] = useState({
    nombre: 'Smartwatch Pro',
    descripcion: 'Reloj inteligente con múltiples funciones: monitoreo cardíaco, seguimiento de actividad física, notificaciones y más. Resistente al agua y con batería de larga duración.',
    sku: 'SW-PRO-123',
    codigoBarras: '123456789012',
    categoria: 'electronica',
    subcategoria: 'smartwatches',
    marca: 'TechPro',
    caracteristicas: [
      { titulo: 'Pantalla', valor: '1.5" AMOLED Touch' },
      { titulo: 'Batería', valor: '300mAh, hasta 5 días' },
      { titulo: 'Resistencia', valor: 'IP68, sumergible 50m' }
    ],
    palabrasClave: 'smartwatch, tecnología, reloj inteligente, fitness',
    precioVenta: 349.99,
    precioRegular: 399.99,
    costo: 200,
    stock: 45,
    gestionarInventario: true,
    permitirVentasSinStock: false,
    peso: 0.08,
    unidadPeso: 'kg',
    dimensiones: {
      largo: 4.5,
      ancho: 3.8,
      alto: 1.2
    },
    unidadDimensiones: 'cm',
    estado: 'activo',
    visibilidad: 'publico',
    imagenes: []
  });
  
  // Funciones de manejo de cambios
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProducto({
      ...producto,
      [name]: checked
    });
  };
  
  const handleCaracteristicaChange = (index: number, field: 'titulo' | 'valor', value: string) => {
    const nuevasCaracteristicas = [...producto.caracteristicas];
    nuevasCaracteristicas[index][field] = value;
    setProducto({
      ...producto,
      caracteristicas: nuevasCaracteristicas
    });
  };
  
  const agregarCaracteristica = () => {
    setProducto({
      ...producto,
      caracteristicas: [...producto.caracteristicas, { titulo: '', valor: '' }]
    });
  };
  
  const eliminarCaracteristica = (index: number) => {
    const nuevasCaracteristicas = [...producto.caracteristicas];
    nuevasCaracteristicas.splice(index, 1);
    setProducto({
      ...producto,
      caracteristicas: nuevasCaracteristicas
    });
  };
  
  const handleDimensionChange = (dimension: 'largo' | 'ancho' | 'alto', value: string) => {
    setProducto({
      ...producto,
      dimensiones: {
        ...producto.dimensiones,
        [dimension]: value
      }
    });
  };
  
  // Función para guardar cambios (simulada)
  const guardarCambios = () => {
    // En una aplicación real, aquí se enviarían los datos a la API
    alert('Cambios guardados correctamente');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Encabezado de página */}
      <div className="bg-[#2E4057] text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Editar Producto</h1>
          <div className="flex items-center mt-2">
            <Link href="/emprendedor/dashboard" className="text-[#F4F4F8] hover:text-[#F18F01]">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <Link href="/emprendedor/productos" className="text-[#F4F4F8] hover:text-[#F18F01]">
              Productos
            </Link>
            <span className="mx-2">/</span>
            <span>Editar Producto #{productoId}</span>
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
                  name="nombre"
                  value={producto.nombre}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                  placeholder="Ej: Smartwatch Pro 2023"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción*</label>
                <textarea 
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8] min-h-[150px]" 
                  placeholder="Describe tu producto detalladamente incluyendo características, materiales, etc."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU (Código de Producto)</label>
                  <input 
                    type="text" 
                    name="sku"
                    value={producto.sku}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                    placeholder="Ej: SW-PRO-2023"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código de Barras (UPC, EAN)</label>
                  <input 
                    type="text" 
                    name="codigoBarras"
                    value={producto.codigoBarras}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                    placeholder="Ej: 123456789012"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría*</label>
                  <select 
                    name="categoria"
                    value={producto.categoria}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                  >
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
                  <select 
                    name="subcategoria"
                    value={producto.subcategoria}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                  >
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
                    name="marca"
                    value={producto.marca}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                    placeholder="Ej: TechPro"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Características/Especificaciones</label>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex flex-col gap-2">
                    {producto.caracteristicas.map((caract, index) => (
                      <div key={index} className="flex flex-col sm:flex-row gap-2 items-center">
                        <input 
                          type="text" 
                          value={caract.titulo}
                          onChange={(e) => handleCaracteristicaChange(index, 'titulo', e.target.value)}
                          className="w-full sm:w-1/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                          placeholder="Título (ej: Pantalla)"
                        />
                        <input 
                          type="text" 
                          value={caract.valor}
                          onChange={(e) => handleCaracteristicaChange(index, 'valor', e.target.value)}
                          className="w-full sm:w-2/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                          placeholder="Valor (ej: 1.5\ AMOLED Touch)"
                        />
                        <button 
                          onClick={() => eliminarCaracteristica(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={agregarCaracteristica}
                    className="mt-3 text-sm text-[#048BA8] flex items-center"
                  >
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
                  name="palabrasClave"
                  value={producto.palabrasClave}
                  onChange={handleInputChange}
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
                  <div className="relative bg-gray-100 rounded overflow-hidden h-16 flex items-center justify-center">
                    <img src="/producto-smartwatch.jpg" alt="Vista previa" className="max-h-full" />
                  </div>
                  <div className="relative bg-gray-100 rounded overflow-hidden h-16 flex items-center justify-center">
                    <img src="/producto-smartwatch-2.jpg" alt="Vista previa" className="max-h-full" />
                  </div>
                  <div className="relative bg-gray-100 rounded overflow-hidden h-16 flex items-center justify-center">
                    <img src="/producto-smartwatch-3.jpg" alt="Vista previa" className="max-h-full" />
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
                      <input 
                        type="text" 
                        name="precioVenta"
                        value={producto.precioVenta}
                        onChange={handleInputChange}
                        className="focus:ring-[#048BA8] focus:border-[#048BA8] block w-full pl-7 pr-12 border-gray-300 rounded-md" 
                        placeholder="0.00" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio Regular</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input 
                        type="text" 
                        name="precioRegular"
                        value={producto.precioRegular}
                        onChange={handleInputChange}
                        className="focus:ring-[#048BA8] focus:border-[#048BA8] block w-full pl-7 pr-12 border-gray-300 rounded-md" 
                        placeholder="0.00" 
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Deja este campo vacío si no hay descuento</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Costo</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input 
                        type="text" 
                        name="costo"
                        value={producto.costo}
                        onChange={handleInputChange}
                        className="focus:ring-[#048BA8] focus:border-[#048BA8] block w-full pl-7 pr-12 border-gray-300 rounded-md" 
                        placeholder="0.00" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad en Stock*</label>
                    <input 
                      type="number" 
                      name="stock"
                      value={producto.stock}
                      onChange={handleInputChange}
                      min="0" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="gestionarInventario"
                      checked={producto.gestionarInventario}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] border-gray-300 rounded" 
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Gestionar inventario
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="permitirVentasSinStock"
                      checked={producto.permitirVentasSinStock}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] border-gray-300 rounded" 
                    />
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
              <input 
                type="checkbox" 
                checked={true} 
                className="h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] border-gray-300 rounded" 
              />
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
                    name="peso"
                    value={producto.peso}
                    onChange={handleInputChange}
                    className="w-full rounded-l-md border border-r-0 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                    placeholder="0.00"
                  />
                  <select 
                    name="unidadPeso"
                    value={producto.unidadPeso}
                    onChange={handleInputChange}
                    className="rounded-r-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="lb">lb</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dimensiones</label>
                <div className="grid grid-cols-3 gap-1">
                  <input 
                    type="text" 
                    value={producto.dimensiones.largo}
                    onChange={(e) => handleDimensionChange('largo', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                    placeholder="Largo" 
                  />
                  <input 
                    type="text" 
                    value={producto.dimensiones.ancho}
                    onChange={(e) => handleDimensionChange('ancho', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                    placeholder="Ancho" 
                  />
                  <input 
                    type="text" 
                    value={producto.dimensiones.alto}
                    onChange={(e) => handleDimensionChange('alto', e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]" 
                    placeholder="Alto" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                <select 
                  name="unidadDimensiones"
                  value={producto.unidadDimensiones}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                >
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="in">in</option>
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
              <select 
                name="estado"
                value={producto.estado}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
              >
                <option value="activo">Activo - Visible en la tienda</option>
                <option value="borrador">Borrador - No visible en la tienda</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visibilidad</label>
              <select 
                name="visibilidad"
                value={producto.visibilidad}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
              >
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
            onClick={guardarCambios}
            type="button"
            className="px-4 py-2 bg-[#F18F01] hover:bg-[#e07c01] text-white rounded-md"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
} 