'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';

// Datos de ejemplo - En producción vendrían de la API
const mockProducts = [
  {
    id: '1',
    name: 'Software de Gestión',
    description: 'Sistema completo para la gestión empresarial con módulos de inventario, facturación y CRM.',
    price: 1500000,
    image: '/products/product1.jpg',
    category: 'Software Empresarial',
    business: 'TechSolutions SAS',
  },
  {
    id: '2',
    name: 'App Móvil Personalizada',
    description: 'Desarrollo de aplicaciones móviles a medida para tu negocio.',
    price: 2500000,
    image: '/products/product2.jpg',
    category: 'Desarrollo Móvil',
    business: 'AppDev Colombia',
  },
  {
    id: '3',
    name: 'Servicio de Cloud Computing',
    description: 'Soluciones en la nube para empresas en crecimiento.',
    price: 800000,
    image: '/products/product3.jpg',
    category: 'Servicios Cloud',
    business: 'CloudTech',
  },
];

const categories = ['Software Empresarial', 'Desarrollo Móvil', 'Servicios Cloud', 'Marketing Digital', 'Seguridad IT'];

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const handleFilterChange = (filters: any) => {
    let filtered = [...mockProducts];

    // Filtrar por búsqueda
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por categoría
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Filtrar por precio
    if (filters.minPrice !== null) {
      filtered = filtered.filter(product => product.price >= filters.minPrice);
    }
    if (filters.maxPrice !== null) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice);
    }

    // Ordenar productos
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          // En este ejemplo no tenemos fecha, pero aquí iría la lógica
          break;
        case 'popular':
          // En este ejemplo no tenemos popularidad, pero aquí iría la lógica
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2E4057] to-[#048BA8] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
            Productos y Servicios
          </h1>
          <p className="font-opensans text-lg text-white/90 max-w-2xl">
            Descubre soluciones tecnológicas innovadoras creadas por emprendedores colombianos.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar con filtros */}
          <aside className="w-full md:w-80 flex-shrink-0">
            <div className="sticky top-4">
              <ProductFilters
                categories={categories}
                onFilterChange={handleFilterChange}
              />
            </div>
          </aside>

          {/* Grid de productos */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-[#E1E1E8]">
                <p className="font-opensans text-xl text-[#2E4057]/80">
                  No se encontraron productos que coincidan con los filtros seleccionados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
} 