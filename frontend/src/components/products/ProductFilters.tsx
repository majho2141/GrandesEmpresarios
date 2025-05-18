"use client"
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import { ProductCategory, ProductFiltersType } from '@/services/api/product.service';

interface ProductFiltersProps {
  onFilterChange: (filters: ProductFiltersType) => void;
  categories: ProductCategory[];
}

export const ProductFilters = ({ onFilterChange, categories = [] }: ProductFiltersProps) => {
  const [filters, setFilters] = useState<ProductFiltersType>({
    search: '',
    category_id: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: 'newest'
  });

  const handleFilterChange = (partialFilter: Partial<ProductFiltersType>) => {
    const newFilters = { ...filters, ...partialFilter };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E1E1E8] hover:shadow-md transition-all duration-300">
      <h3 className="font-montserrat text-xl font-semibold mb-6 text-[#2E4057] flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#048BA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
      </h3>
      
      <div className="space-y-6">
        {/* Búsqueda */}
        <div className="group">
          <label htmlFor="search" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium group-hover:text-[#048BA8] transition-colors duration-300">
            Buscar
          </label>
          <div className="relative">
            <Input
              id="search"
              type="text"
              placeholder="Buscar productos..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
              className="pl-10 border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057] rounded-lg"
            />
            <svg className="w-5 h-5 text-[#2E4057]/40 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Categoría - Solo mostrar si hay categorías disponibles */}
        {categories.length > 0 && (
          <div className="group">
            <label htmlFor="category" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium group-hover:text-[#048BA8] transition-colors duration-300">
              Categoría
            </label>
            <Select
              id="category"
              value={filters.category_id?.toString() || ''}
              onChange={(e) => handleFilterChange({ 
                category_id: e.target.value ? Number(e.target.value) : undefined 
              })}
              options={[
                { value: '', label: 'Todas las categorías' },
                ...categories.map(category => ({
                  value: category.id.toString(),
                  label: category.name
                }))
              ]}
              className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057] rounded-lg"
            />
          </div>
        )}

        {/* Rango de precios */}
        <div className="group">
          <label className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium group-hover:text-[#048BA8] transition-colors duration-300">
            Rango de precios
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                type="number"
                placeholder="Mínimo"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange({ 
                  minPrice: e.target.value ? Number(e.target.value) : undefined 
                })}
                className="pl-8 border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057] rounded-lg"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E4057]/40">$</span>
            </div>
            <div className="relative">
              <Input
                type="number"
                placeholder="Máximo"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange({ 
                  maxPrice: e.target.value ? Number(e.target.value) : undefined 
                })}
                className="pl-8 border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057] rounded-lg"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E4057]/40">$</span>
            </div>
          </div>
        </div>

        {/* Ordenar por */}
        <div className="group">
          <label htmlFor="sortBy" className="block text-sm font-opensans text-[#2E4057]/90 mb-2 font-medium group-hover:text-[#048BA8] transition-colors duration-300">
            Ordenar por
          </label>
          <Select
            id="sortBy"
            value={filters.sortBy || 'newest'}
            onChange={(e) => handleFilterChange({ sortBy: e.target.value as typeof filters.sortBy })}
            options={[
              { value: 'newest', label: 'Más recientes' },
              { value: 'price_asc', label: 'Precio: Menor a mayor' },
              { value: 'price_desc', label: 'Precio: Mayor a menor' },
              { value: 'popular', label: 'Más populares' }
            ]}
            className="border-[#E1E1E8] focus:border-[#048BA8] text-[#2E4057] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}; 