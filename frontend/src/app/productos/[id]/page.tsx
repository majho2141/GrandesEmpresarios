'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { productService, Product } from '@/services/api/product.service';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ShoppingCart, Heart, Share2, ArrowLeft, Star, Package, Shield, Truck, ChevronRight, Home } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('descripcion');

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        if (params.id) {
          const productData = await productService.getProductById(params.id as string);
          setProduct(productData);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('No se pudo cargar la información del producto. Por favor, intenta de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);


  // Funcionalidad para agregar al carrito (aquí implementarías la lógica real)
  const handleAddToCart = () => {
    console.log(`Agregando al carrito: ${product?.name}, cantidad: ${quantity}`);
    // Aquí implementarías la lógica real
    alert(`Producto añadido al carrito: ${product?.name} x ${quantity}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F4F8] flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-[#048BA8] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F4F4F8]">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#F4F4F8] rounded-full flex items-center justify-center">
                <ArrowLeft className="w-6 h-6 text-[#2E4057]" />
              </div>
            </div>
            <h1 className="text-2xl font-montserrat font-bold text-[#2E4057] mb-4">Producto no encontrado</h1>
            <p className="text-[#2E4057]/80 mb-6">{error || 'Lo sentimos, el producto que buscas no existe o no está disponible.'}</p>
            <Button onClick={() => router.push('/productos')} className="bg-[#048BA8] hover:bg-[#048BA8]/90 text-[#FFFFFF]">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver a productos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Calcular el precio con descuento
  const finalPrice = product.discount > 0
    ? product.public_price - (product.public_price * (product.discount / 100))
    : product.public_price;

  // Características destacadas (simuladas, en un caso real vendrían del producto)
  const features = [
    'Alta calidad de materiales',
    'Diseño ergonómico',
    'Fácil de usar',
    'Garantía de 1 año'
  ];

  // Especificaciones técnicas (simuladas)
  const specs = [
    { label: 'Código', value: product.bar_code },
    { label: 'Categoría', value: product.category?.name || 'General' },
    { label: 'Estado', value: product.status === 'active' ? 'Activo' : 'Inactivo' },
    { label: 'Stock', value: `${product.stock} unidades` }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F8]">
      {/* Breadcrumbs con estilo minimalista */}
      <div className="bg-white border-b border-[#E1E1E8]">
        <div className="container mx-auto px-4">
          <nav className="flex items-center py-4 text-sm">
            <Link href="/" className="text-[#2E4057]/60 hover:text-[#048BA8] transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              <span>Inicio</span>
            </Link>
            <ChevronRight className="w-3 h-3 mx-2 text-[#2E4057]/40" />
            <Link href="/productos" className="text-[#2E4057]/60 hover:text-[#048BA8] transition-colors">
              Productos
            </Link>
            <ChevronRight className="w-3 h-3 mx-2 text-[#2E4057]/40" />
            <span className="text-[#2E4057] font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Banner de categoría sutil en la parte superior */}
          <div 
            className="h-2 w-full bg-gradient-to-r from-[#048BA8] to-[#F18F01]" 
            aria-hidden="true"
          />
          
          {/* Producto principal */}
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Imagen del producto */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F4F4F8]">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-contain p-4"
                unoptimized
              />
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 bg-[#F18F01] text-[#FFFFFF] font-semibold px-4 py-2 rounded-lg shadow-md">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="flex flex-col">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    {/* Categoría como badge */}
                    {product.category && (
                      <span className="inline-block px-3 py-1 bg-[#048BA8]/10 text-[#048BA8] text-xs font-medium rounded-full mb-2">
                        {product.category.name}
                      </span>
                    )}
                    <h1 className="text-3xl font-montserrat font-bold text-[#2E4057]">{product.name}</h1>
                    <p className="text-sm font-opensans text-[#2E4057]/60 mt-1">
                      Por <span className="font-medium text-[#048BA8]">{product.enterprise.name}</span>
                    </p>
                    <div className="flex items-center mt-2 mb-4">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? 'fill-[#F18F01] text-[#F18F01]' : 'text-[#D1D5DB]'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-[#2E4057]/70">4.0 (24 reseñas)</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full bg-[#F4F4F8] hover:bg-[#F4F4F8]/80 transition-colors">
                      <Heart className="w-5 h-5 text-[#2E4057]/70" />
                    </button>
                    <button className="p-2 rounded-full bg-[#F4F4F8] hover:bg-[#F4F4F8]/80 transition-colors">
                      <Share2 className="w-5 h-5 text-[#2E4057]/70" />
                    </button>
                  </div>
                </div>

                <p className="text-lg font-opensans text-[#2E4057]/80 mb-6">
                  {product.description}
                </p>

                <div className="flex items-baseline mb-6">
                  <div className="mr-4">
                    {product.discount > 0 && (
                      <span className="line-through text-[#2E4057]/50 font-opensans">
                        ${product.public_price.toLocaleString('es-CO')}
                      </span>
                    )}
                  </div>
                  <div className="text-3xl font-montserrat font-bold text-[#048BA8]">
                    ${finalPrice.toLocaleString('es-CO')}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E1E1E8]">
                  <div className="flex items-center mb-6">
                    <span className="mr-4 font-medium text-[#2E4057]">Cantidad:</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                        className="w-10 h-10 rounded-l-lg bg-[#F4F4F8] flex items-center justify-center hover:bg-[#E1E1E8] transition-colors text-[#2E4057]"
                      >
                        -
                      </button>
                      <span className="w-16 h-10 flex items-center justify-center bg-white border border-[#E1E1E8] text-[#2E4057]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(prev => (prev < product.stock ? prev + 1 : prev))}
                        className="w-10 h-10 rounded-r-lg bg-[#F4F4F8] flex items-center justify-center hover:bg-[#E1E1E8] transition-colors text-[#2E4057]"
                      >
                        +
                      </button>
                    </div>
                    <span className="ml-4 text-sm text-[#2E4057]/60">
                      {product.stock} disponibles
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      fullWidth 
                      onClick={handleAddToCart}
                      className="bg-[#048BA8] hover:bg-[#048BA8]/90 py-6 text-lg text-[#FFFFFF]"
                    >
                      <ShoppingCart className="mr-2 w-5 h-5" /> Añadir al carrito
                    </Button>
                    <Link href="/cliente/carrito" className="w-full">
                      <Button 
                        fullWidth 
                        variant="outline"
                        className="border-[#048BA8] text-[#048BA8] hover:bg-[#048BA8] hover:text-[#FFFFFF] py-6 text-lg"
                      >
                        Comprar ahora
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Beneficios */}
              <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-[#E1E1E8]">
                <div className="flex flex-col items-center text-center">
                  <Package className="w-6 h-6 text-[#048BA8] mb-2" />
                  <span className="text-sm text-[#2E4057]">Envío rápido</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-6 h-6 text-[#048BA8] mb-2" />
                  <span className="text-sm text-[#2E4057]">Garantía</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-6 h-6 text-[#048BA8] mb-2" />
                  <span className="text-sm text-[#2E4057]">Devolución gratis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs de información adicional */}
          <div className="border-t border-[#E1E1E8]">
            <div className="flex border-b border-[#E1E1E8]">
              <button
                onClick={() => setActiveTab('descripcion')}
                className={`px-6 py-4 font-montserrat font-medium text-sm transition-colors ${
                  activeTab === 'descripcion'
                    ? 'text-[#048BA8] border-b-2 border-[#048BA8]'
                    : 'text-[#2E4057]/70 hover:text-[#048BA8]'
                }`}
              >
                Descripción
              </button>
              <button
                onClick={() => setActiveTab('caracteristicas')}
                className={`px-6 py-4 font-montserrat font-medium text-sm transition-colors ${
                  activeTab === 'caracteristicas'
                    ? 'text-[#048BA8] border-b-2 border-[#048BA8]'
                    : 'text-[#2E4057]/70 hover:text-[#048BA8]'
                }`}
              >
                Características
              </button>
              <button
                onClick={() => setActiveTab('especificaciones')}
                className={`px-6 py-4 font-montserrat font-medium text-sm transition-colors ${
                  activeTab === 'especificaciones'
                    ? 'text-[#048BA8] border-b-2 border-[#048BA8]'
                    : 'text-[#2E4057]/70 hover:text-[#048BA8]'
                }`}
              >
                Especificaciones
              </button>
              <button
                onClick={() => setActiveTab('empresa')}
                className={`px-6 py-4 font-montserrat font-medium text-sm transition-colors ${
                  activeTab === 'empresa'
                    ? 'text-[#048BA8] border-b-2 border-[#048BA8]'
                    : 'text-[#2E4057]/70 hover:text-[#048BA8]'
                }`}
              >
                Sobre la empresa
              </button>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'descripcion' && (
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-[#2E4057] mb-4">Descripción del producto</h3>
                  <p className="font-opensans text-[#2E4057]/80 leading-relaxed">
                    {product.description || 'No hay descripción disponible para este producto.'}
                  </p>
                </div>
              )}

              {activeTab === 'caracteristicas' && (
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-[#2E4057] mb-4">Características destacadas</h3>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-[#048BA8]/10 rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-[#048BA8] rounded-full"></div>
                        </div>
                        <span className="ml-3 font-opensans text-[#2E4057]/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'especificaciones' && (
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-[#2E4057] mb-4">Especificaciones técnicas</h3>
                  <div className="bg-[#F4F4F8] rounded-lg p-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {specs.map((spec, index) => (
                        <div key={index} className="flex">
                          <dt className="w-1/3 font-opensans font-medium text-[#2E4057]">{spec.label}:</dt>
                          <dd className="w-2/3 font-opensans text-[#2E4057]/80">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}

              {activeTab === 'empresa' && (
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-[#2E4057] mb-4">Sobre {product.enterprise.name}</h3>
                  <p className="font-opensans text-[#2E4057]/80 leading-relaxed mb-4">
                    {product.enterprise.description || 'No hay información disponible sobre esta empresa.'}
                  </p>
                  <div className="bg-[#F4F4F8] rounded-lg p-6">
                    <h4 className="font-montserrat font-medium text-[#2E4057] mb-3">Información de contacto</h4>
                    <ul className="space-y-2">
                      <li className="font-opensans text-[#2E4057]/80">
                        <span className="font-medium">Email:</span> {product.enterprise.email}
                      </li>
                      <li className="font-opensans text-[#2E4057]/80">
                        <span className="font-medium">Teléfono:</span> {product.enterprise.phone_number}
                      </li>
                      <li className="font-opensans text-[#2E4057]/80">
                        <span className="font-medium">Dirección:</span> {product.enterprise.address}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Productos relacionados - Aquí se mostrarían productos de la misma categoría */}
        <div className="mt-12">
          <h2 className="text-2xl font-montserrat font-bold text-[#2E4057] mb-6">
            También podría interesarte
          </h2>
          <p className="text-[#2E4057]/80 mb-8">
            Explora más productos {product.category?.name ? `de la categoría ${product.category.name}` : 'similares'}.
          </p>
          <div className="flex justify-center">
            <Link href="/productos">
              <Button className="bg-[#048BA8] hover:bg-[#048BA8]/90 text-[#FFFFFF]">
                Explorar más productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 