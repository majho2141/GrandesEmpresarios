'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ProductCard } from '@/components/products/ProductCard';
import { productService, Product } from '@/services/api/product.service';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Search, Filter, X } from 'lucide-react';

export default function ClienteProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsData = await productService.getProducts();
        setProducts(productsData);
        // Extraer categorías únicas
        const uniqueCategories = Array.from(
          new Set(productsData.map(product => product.category?.name).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout titulo="Catálogo de Productos" rol="cliente">
      <div className="space-y-6">
        {/* Barra de búsqueda y filtros */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E1E1E8]">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E4057]/40 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#F4F4F8] border-none font-opensans"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white border-[#048BA8] text-[#048BA8] hover:bg-[#048BA8] hover:text-[#FFFFFF] py-6 text-lg transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </Button>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <div className="mt-4 p-4 bg-[#F4F4F8] rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-montserrat font-semibold text-[#2E4057]">Filtros</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(null);
                    setShowFilters(false);
                  }}
                  className="text-[#2E4057]/60 hover:text-[#2E4057] font-opensans"
                >
                  <X className="w-4 h-4 mr-1" />
                  Limpiar
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-montserrat font-medium text-[#2E4057] mb-2">Categorías</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                        className={`px-3 py-1 rounded-full text-sm font-opensans transition-all duration-300 ${
                          category === selectedCategory
                            ? 'bg-[#048BA8] text-white'
                            : 'bg-white text-[#2E4057] hover:bg-[#048BA8]/10'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Estado de carga */}
        {isLoading ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-[#E1E1E8]">
            <div className="w-12 h-12 border-t-4 border-b-4 border-[#048BA8] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-opensans text-xl text-[#2E4057]/80">
              Cargando productos...
            </p>
          </div>
        ) : (
          <>
            {/* Resultados de búsqueda */}
            {searchTerm && (
              <p className="text-[#2E4057]/60 font-opensans">
                {filteredProducts.length} resultados para "{searchTerm}"
              </p>
            )}

            {/* Lista de productos */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-[#E1E1E8]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#2E4057]/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-montserrat font-semibold text-[#2E4057] mb-2">No se encontraron productos</h3>
                <p className="text-[#2E4057]/60 font-opensans">
                  Intenta con otros términos de búsqueda o filtros
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
} 