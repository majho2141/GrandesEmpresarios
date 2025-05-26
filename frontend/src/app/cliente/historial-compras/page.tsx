'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Product {
  id: number;
  name: string;
  public_price: number;
  discount: number;
  categories: string[];
}

interface OrderDetail {
  quantity: number;
  unit_price: number;
  discount: number;
  total_price: number;
  product_id: number;
  order_id: number;
  id: number;
  product?: Product;
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

export default function HistorialCompras() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para los filtros
  const [statusFilter, setStatusFilter] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    const fetchCompras = async () => {
      const token = localStorage.getItem('token'); 
  
      const response = await fetch('http://localhost:8080/api/v1/orders/?skip=0&limit=100', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error('Error al obtener compras:', response.statusText);
        return;
      }
  
      const data = await response.json();
      
      // Fetch product details for each order detail
      const ordersWithProducts = await Promise.all(
        data.map(async (order: Order) => {
          const detailsWithProducts = await Promise.all(
            order.order_details.map(async (detail) => {
              try {
                const productResponse = await fetch(`http://localhost:8080/api/v1/products/${detail.product_id}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                });
                if (productResponse.ok) {
                  const productData = await productResponse.json();
                  return {
                    ...detail,
                    product: {
                      id: productData.id,
                      name: productData.name,
                      public_price: productData.public_price,
                      discount: productData.discount,
                      categories: productData.categories || []
                    }
                  };
                }
              } catch (error) {
                console.error(`Error fetching product ${detail.product_id}:`, error);
              }
              return detail;
            })
          );
          return { ...order, order_details: detailsWithProducts };
        })
      );
      
      setOrders(ordersWithProducts);
      setFilteredOrders(ordersWithProducts);
    };
  
    fetchCompras();
  }, []);

  // Función para aplicar los filtros
  const applyFilters = () => {
    let filtered = [...orders];

    // Filtrar por estado
    if (statusFilter) {
      filtered = filtered.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase());
    }

    // Filtrar por fecha de pedido
    if (orderDate) {
      const [year, month, day] = orderDate.split('-').map(Number);
      filtered = filtered.filter(order => {
        const orderDateObj = new Date(order.order_date);
        return (
          orderDateObj.getFullYear() === year &&
          orderDateObj.getMonth() === month - 1 && // Los meses en JS son 0-based
          orderDateObj.getDate() === day
        );
      });
    }

    // Filtrar por fecha de entrega
    if (deliveryDate) {
      const [year, month, day] = deliveryDate.split('-').map(Number);
      filtered = filtered.filter(order => {
        if (!order.delivery_date) return false;
        const deliveryDateObj = new Date(order.delivery_date);
        return (
          deliveryDateObj.getFullYear() === year &&
          deliveryDateObj.getMonth() === month - 1 && // Los meses en JS son 0-based
          deliveryDateObj.getDate() === day
        );
      });
    }

    setFilteredOrders(filtered);
  };

  // Función para limpiar los filtros
  const clearFilters = () => {
    setStatusFilter('');
    setOrderDate('');
    setDeliveryDate('');
    setFilteredOrders(orders);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Pendiente';
      case 'processing':
        return 'En proceso';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  
  return (
    <DashboardLayout titulo="Historial de Compras" rol="cliente">
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Filtrar Pedidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="pending">Pendiente</option>
              <option value="processing">En proceso</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Pedido</label>
            <input 
              type="date" 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Entrega</label>
            <input 
              type="date" 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#048BA8]"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>
          <div className="flex items-end gap-2">
            <button 
              onClick={applyFilters}
              className="bg-[#048BA8] hover:bg-[#037897] text-white py-2 px-4 rounded-md flex-1"
            >
              Aplicar Filtros
            </button>
            <button 
              onClick={clearFilters}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Listado de pedidos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedido #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Pedido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Entrega
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Artículos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.id.toString().padStart(6, '0')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.order_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.delivery_date ? formatDate(order.delivery_date) : 'Pendiente'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(order.total_price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.order_details.length} artículo{order.order_details.length !== 1 ? 's' : ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="text-[#048BA8] hover:text-[#F18F01] mr-4"
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Paginación */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredOrders.length}</span> de <span className="font-medium">{filteredOrders.length}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Anterior</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-current="page" className="z-10 bg-[#048BA8] border-[#048BA8] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Siguiente</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-[2px] overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#2E4057]">
                Detalles del Pedido #{selectedOrder.id.toString().padStart(6, '0')}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              {selectedOrder.order_details.map((detail) => (
                <div key={detail.id} className="border-b pb-4">
                  {detail.product ? (
                    <>
                      <h4 className="font-medium text-[#048BA8]">{detail.product.name}</h4>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm text-gray-600">Cantidad: {detail.quantity}</p>
                          <p className="text-sm text-gray-600">Precio unitario: {formatCurrency(detail.unit_price)}</p>
                          <p className="text-sm text-gray-600">Descuento: {detail.discount}%</p>
                          <p className="text-sm text-gray-600">Total: {formatCurrency(detail.total_price)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Categorías: {detail.product.categories.length > 0 
                              ? detail.product.categories.join(', ') 
                              : 'Sin categorías'}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">Producto no disponible</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-right font-semibold text-[#2E4057]">
                Total del pedido: {formatCurrency(selectedOrder.total_price)}
              </p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
} 