'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import { productService, Product, ProductCategory, ProductFiltersType } from '@/services/api/product.service';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Cargar solo los productos, sin esperar por las categorías
        const productsData = await productService.getProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
        
        // Extraer categorías únicas de los productos recibidos
        if (productsData.length > 0) {
          const uniqueCategories = Array.from(
            new Map(
              productsData
                .filter(product => product.category) // Asegurarse de que hay una categoría
                .map(product => [product.category.id, product.category])
            ).values()
          );
          setCategories(uniqueCategories);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = async (filters: ProductFiltersType) => {
    setIsLoading(true);
    
    try {
      // Si hay algún filtro aplicado, filtramos localmente en lugar de usar la API
      if (filters.search || filters.category_id || filters.minPrice || filters.maxPrice || filters.sortBy) {
        let filtered = [...products];
        
        // Filtrar por búsqueda
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
          );
        }
        
        // Filtrar por categoría
        if (filters.category_id) {
          filtered = filtered.filter(product => product.category_id === filters.category_id);
        }
        
        // Filtrar por precio mínimo
        if (filters.minPrice) {
          filtered = filtered.filter(product => product.public_price >= filters.minPrice!);
        }
        
        // Filtrar por precio máximo
        if (filters.maxPrice) {
          filtered = filtered.filter(product => product.public_price <= filters.maxPrice!);
        }
        
        // Ordenar productos
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'price_asc':
              filtered.sort((a, b) => a.public_price - b.public_price);
              break;
            case 'price_desc':
              filtered.sort((a, b) => b.public_price - a.public_price);
              break;
            case 'newest':
              // Por ahora solo mantiene el orden actual
              break;
            case 'popular':
              // Por ahora solo mantiene el orden actual
              break;
          }
        }
        
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    } catch (err) {
      console.error('Error al filtrar productos:', err);
      setError('Error al filtrar los productos. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
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
            {isLoading ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-[#E1E1E8]">
                <div className="w-12 h-12 border-t-4 border-b-4 border-[#048BA8] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-opensans text-xl text-[#2E4057]/80">
                  Cargando productos...
                </p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-[#E1E1E8]">
                <p className="font-opensans text-xl text-[#F18F01]">
                  {error}
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-[#E1E1E8]">
                <p className="font-opensans text-xl text-[#2E4057]/80">
                  No se encontraron productos que coincidan con los filtros seleccionados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
} 