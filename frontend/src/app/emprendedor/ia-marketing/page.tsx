'use client';

import React, { useState, useEffect } from 'react';
import EmprendedorLayout from '@/components/layout/EmprendedorLayout';
import { productService, Product } from '@/services/api/product.service';
import { aiService } from '@/services/api/ai.service';
import { useAlert } from '@/context/AlertContext';

export default function IAMarketingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectedProductForImage, setSelectedProductForImage] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number>(20);
  const [language, setLanguage] = useState<string>('español');
  const [generatedText, setGeneratedText] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [isGeneratingText, setIsGeneratingText] = useState<boolean>(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const { showAlert } = useAlert();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productsData = await productService.getProducts();
      setProducts(productsData);
    } catch (error) {
      showAlert('error', 'Error al cargar los productos');
      console.error('Error loading products:', error);
    }
  };

  const handleProductSelection = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const generateAdText = async () => {
    if (selectedProducts.length === 0) {
      showAlert('error', 'Selecciona al menos un producto para generar el texto');
      return;
    }

    setIsGeneratingText(true);
    try {
      const response = await aiService.generateAdText({
        product_ids: selectedProducts,
        language
      });
      setGeneratedText(response.content);
      showAlert('success', 'Texto publicitario generado exitosamente');
    } catch (error) {
      showAlert('error', 'Error al generar el texto publicitario');
      console.error('Error generating ad text:', error);
    } finally {
      setIsGeneratingText(false);
    }
  };

  const generateAdImage = async () => {
    if (!selectedProductForImage) {
      showAlert('error', 'Selecciona un producto para generar la imagen');
      return;
    }

    setIsGeneratingImage(true);
    try {
      const response = await aiService.generateAdImage({
        product_id: selectedProductForImage,
        discount
      });
      setGeneratedImage(response.image_url);
      showAlert('success', 'Imagen publicitaria generada exitosamente');
    } catch (error) {
      showAlert('error', 'Error al generar la imagen publicitaria');
      console.error('Error generating ad image:', error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showAlert('success', 'Texto copiado al portapapeles');
  };

  return (
    <EmprendedorLayout titulo="IA Marketing - Generador de Contenido">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'text'
                ? 'bg-white text-[#048BA8] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generación de Textos
            </div>
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'image'
                ? 'bg-white text-[#048BA8] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Generación de Imágenes
            </div>
          </button>
        </div>

        {/* Text Generation Tab */}
        {activeTab === 'text' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#2E4057] mb-4">
                Seleccionar Productos para Texto Publicitario
              </h3>
              
              {/* Language Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idioma del contenido
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                >
                  <option value="español">Español</option>
                  <option value="english">English</option>
                  <option value="français">Français</option>
                </select>
              </div>

              {/* Products List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedProducts.includes(product.id)
                        ? 'border-[#048BA8] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleProductSelection(product.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleProductSelection(product.id)}
                        className="mr-3 h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.description}</p>
                        <p className="text-sm font-medium text-[#F18F01]">${product.public_price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={generateAdText}
                disabled={isGeneratingText || selectedProducts.length === 0}
                className="w-full mt-4 bg-[#048BA8] hover:bg-[#037897] disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isGeneratingText ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Generando...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generar Texto Publicitario
                  </>
                )}
              </button>
            </div>

            {/* Generated Text Display */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#2E4057]">
                  Texto Publicitario Generado
                </h3>
                {generatedText && (
                  <button
                    onClick={() => copyToClipboard(generatedText)}
                    className="text-[#048BA8] hover:text-[#037897] flex items-center gap-1 text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copiar
                  </button>
                )}
              </div>
              
              <div className="min-h-[300px] p-4 border border-gray-200 rounded-lg bg-gray-50">
                {generatedText ? (
                  <div className="whitespace-pre-wrap text-gray-800">
                    {generatedText}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p>El texto publicitario generado aparecerá aquí</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Image Generation Tab */}
        {activeTab === 'image' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Selection for Image */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#2E4057] mb-4">
                Seleccionar Producto para Imagen Publicitaria
              </h3>
              
              {/* Discount Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descuento (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
                />
              </div>

              {/* Products List for Image */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedProductForImage === product.id
                        ? 'border-[#048BA8] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedProductForImage(product.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedProductForImage === product.id}
                        onChange={() => setSelectedProductForImage(product.id)}
                        className="mr-3 h-4 w-4 text-[#048BA8] focus:ring-[#048BA8] border-gray-300"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.description}</p>
                        <p className="text-sm font-medium text-[#F18F01]">${product.public_price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={generateAdImage}
                disabled={isGeneratingImage || !selectedProductForImage}
                className="w-full mt-4 bg-[#F18F01] hover:bg-[#e07c01] disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isGeneratingImage ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Generando...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Generar Imagen Publicitaria
                  </>
                )}
              </button>
            </div>

            {/* Generated Image Display */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-[#2E4057] mb-4">
                Imagen Publicitaria Generada
              </h3>
              
              <div className="min-h-[400px] border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center">
                {generatedImage ? (
                  <div className="w-full h-full">
                    <img
                      src={generatedImage}
                      alt="Imagen publicitaria generada"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>La imagen publicitaria generada aparecerá aquí</p>
                  </div>
                )}
              </div>

              {generatedImage && (
                <div className="mt-4 flex gap-2">
                  <a
                    href={generatedImage}
                    download="imagen-publicitaria.png"
                    className="flex-1 bg-[#048BA8] hover:bg-[#037897] text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Descargar
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </EmprendedorLayout>
  );
} 