'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ProductCard } from '@/components/products/ProductCard';
import { productService, Product } from '@/services/api/product.service';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface OrderDetail {
  quantity: number;
  unit_price: number;
  discount: number;
  total_price: number;
  product_id: number;
  order_id: number;
  id: number;
}

interface Order {
  order_date: string;
  delivery_date: string;
  status: string;
  shipping_cost: number;
  total_amount: number;
  user_id: number;
  address_id: number;
  total_price: number;
  id: number;
  created_at: string;
  updated_at: string;
  order_details: OrderDetail[];
}

export default function ClienteDashboardPage() {
  const router = useRouter();
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const { token } = useAuthStore();

  const handleShowProducts = () => {
    router.push('/cliente/productos');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/orders/?skip=0&limit=100', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
          }
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error al cargar órdenes:', error);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productService.getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Calcular estadísticas
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total_price, 0);
  const totalProducts = orders.reduce((sum, order) => 
    sum + order.order_details.reduce((detailSum, detail) => detailSum + detail.quantity, 0), 0);

  return (
    <DashboardLayout titulo="Dashboard Cliente" rol="cliente">
      {!showProducts ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tarjeta de bienvenida */}
          <div className="col-span-full bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
            <h2 className="text-2xl font-semibold text-[#2E4057] mb-2">¡Bienvenido a tu Dashboard!</h2>
            <p className="text-[#2E4057]/70">
              Aquí podrás gestionar tus compras, ver tu historial y mucho más.
            </p>
          </div>

          {/* Resumen de compras recientes */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-[#2E4057]">Compras Recientes</h3>
              <button className="text-[#048BA8] hover:underline text-sm cursor-pointer">Ver todas</button>
            </div>
            
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center p-3 bg-gray-50 rounded-lg border border-[#E1E1E8]">
                  <div className="w-12 h-12 bg-[#048BA8]/10 rounded-lg flex items-center justify-center text-[#048BA8]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-[#2E4057] font-medium">Orden #{order.id}</p>
                    <p className="text-sm text-[#2E4057]/60">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#2E4057] font-semibold">${order.total_price.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estadísticas */}
          <div className="lg:row-span-2 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
            <h3 className="font-semibold text-lg text-[#2E4057] mb-4">Resumen</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-[#2E4057]/60 mb-1">Total compras</p>
                <p className="text-2xl font-semibold text-[#2E4057]">{totalOrders}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-[#2E4057]/60 mb-1">Gasto total</p>
                <p className="text-2xl font-semibold text-[#2E4057]">${totalSpent.toFixed(2)}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-[#2E4057]/60 mb-1">Productos adquiridos</p>
                <p className="text-2xl font-semibold text-[#2E4057]">{totalProducts}</p>
              </div>
            </div>
          </div>
          
          {/* Productos populares */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-[#2E4057]">Productos Populares</h3>
              <button 
                onClick={handleShowProducts}
                className="text-[#048BA8] hover:underline text-sm cursor-pointer"
              >
                Ver catálogo
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {products.slice(0, 6).map((product) => (
                <div key={product.id} className="bg-gray-50 rounded-lg p-3 border border-[#E1E1E8]">
                  <div className="w-full h-24 bg-[#F4F4F8] rounded-md mb-2 flex items-center justify-center">
                    {product.thumbnail ? (
                      <img 
                        src={product.thumbnail} 
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#2E4057]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <h4 className="font-medium text-[#2E4057] truncate">{product.name}</h4>
                  <p className="text-sm text-[#2E4057]/60">${product.public_price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#2E4057]">Catálogo de Productos</h2>
            <button 
              onClick={handleShowProducts}
              className="text-[#048BA8] hover:underline text-sm cursor-pointer"
            >
              Volver al Dashboard
            </button>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-[#E1E1E8]">
              <div className="w-12 h-12 border-t-4 border-b-4 border-[#048BA8] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-opensans text-xl text-[#2E4057]/80">
                Cargando productos...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
} 