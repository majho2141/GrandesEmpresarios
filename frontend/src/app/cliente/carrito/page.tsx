'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit',
    name: 'Tarjeta de Crédito',
    icon: '💳'
  },
  {
    id: 'debit',
    name: 'Tarjeta de Débito',
    icon: '💳'
  },
  {
    id: 'transfer',
    name: 'Transferencia Bancaria',
    icon: '🏦'
  }
];

export default function CarritoPage() {
  const router = useRouter();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [step, setStep] = useState(1);
  const {
    cartItems,
    isLoading,
    removeFromCart,
    updateQuantity,
    getTotalPrice
  } = useCart();

  const handleProceedToPayment = () => {
    setShowPaymentModal(true);
    setStep(1);
    setSelectedPaymentMethod('');
  };

  const handleConfirmPayment = () => {
    setShowPaymentModal(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      router.push('/cliente/productos');
    }, 2000);
  };

  const handleNextStep = () => {
    if (step === 1 && selectedPaymentMethod) {
      setStep(2);
    } else if (step === 2) {
      handleConfirmPayment();
    }
  };

  const handleBackStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  if (isLoading) {
    return (
      <DashboardLayout titulo="Carrito de Compras" rol="cliente">
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-[#E1E1E8]">
          <div className="w-12 h-12 border-t-4 border-b-4 border-[#048BA8] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-opensans text-xl text-[#2E4057]/80">
            Cargando carrito...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout titulo="Carrito de Compras" rol="cliente">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de productos */}
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-[#E1E1E8]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#2E4057]/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-[#2E4057] mb-2">Tu carrito está vacío</h3>
              <p className="text-[#2E4057]/60 mb-4">
                Agrega productos a tu carrito para comenzar a comprar
              </p>
              <a href="/cliente/dashboard" className="inline-block bg-[#048BA8] text-white px-6 py-2 rounded-lg hover:bg-[#037897] transition-colors">
                Ver productos
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#E1E1E8]">
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-[#F4F4F8] rounded-lg flex items-center justify-center">
                      {item.product.thumbnail ? (
                        <img 
                          src={item.product.thumbnail} 
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#2E4057]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-[#2E4057]">{item.product.name}</h3>
                      <p className="text-sm text-[#2E4057]/60">
                        {item.product.category?.name || 'Sin categoría'}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-[#E1E1E8] rounded-l-lg hover:bg-[#F4F4F8] text-[#2E4057] font-medium"
                        >
                          -
                        </button>
                        <span className="w-12 h-8 flex items-center justify-center border-t border-b border-[#E1E1E8] text-[#2E4057] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-[#E1E1E8] rounded-r-lg hover:bg-[#F4F4F8] text-[#2E4057] font-medium"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#2E4057]">
                        ${((item.product.public_price || 0) * (1 - (item.product.discount || 0) / 100) * item.quantity).toFixed(2)}
                      </p>
                      {item.product.discount > 0 && (
                        <p className="text-sm text-[#2E4057]/60 line-through">
                          ${((item.product.public_price || 0) * item.quantity).toFixed(2)}
                        </p>
                      )}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-800 text-sm mt-2"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
              </div>
              
        {/* Resumen del pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E1E1E8] sticky top-6">
            <h3 className="font-semibold text-lg text-[#2E4057] mb-4">Resumen del Pedido</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-[#2E4057]">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              <div className="flex justify-between text-[#2E4057]">
                <span>Envío</span>
                <span>Calculado al finalizar</span>
              </div>
              <div className="border-t border-[#E1E1E8] pt-4">
                <div className="flex justify-between font-semibold text-[#2E4057]">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full bg-[#048BA8] text-white py-3 rounded-lg mt-6 hover:bg-[#037897] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cartItems.length === 0}
            >
              Proceder al Pago
            </button>

            <div className="mt-4 text-center">
              <a href="/cliente/dashboard" className="text-[#048BA8] hover:underline text-sm">
                Continuar Comprando
              </a>
              </div>
            </div>
          </div>
        </div>

      {/* Modal de pago */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-[#2E4057]/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 font-opensans">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-montserrat font-semibold text-[#2E4057]">
                {step === 1 ? 'Seleccionar Método de Pago' : 'Detalles de Pago'}
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-[#2E4057]/60 hover:text-[#2E4057]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              </div>
              
            {step === 1 ? (
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-4 ${
                      selectedPaymentMethod === method.id
                        ? 'border-[#048BA8] bg-[#048BA8]/5 shadow-sm'
                        : 'border-[#E1E1E8] hover:border-[#048BA8]/50 hover:shadow-sm'
                    }`}
                  >
                    <div className="w-12 h-12 bg-[#F4F4F8] rounded-lg flex items-center justify-center text-2xl">
                      {method.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-medium text-[#2E4057] block">{method.name}</span>
                      <span className="text-sm text-[#2E4057]/60">
                        {method.id === 'credit' && 'Pago con tarjeta de crédito'}
                        {method.id === 'debit' && 'Pago con tarjeta de débito'}
                        {method.id === 'transfer' && 'Transferencia bancaria directa'}
                      </span>
                  </div>
                    {selectedPaymentMethod === method.id && (
                      <div className="w-6 h-6 rounded-full bg-[#048BA8] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                  </div>
                    )}
                    </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-[#F4F4F8] p-6 rounded-xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2E4057] mb-2">
                        Número de Tarjeta
                      </label>
                      <div className="relative">
                    <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          maxLength={19}
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-3 pl-12 border border-[#E1E1E8] rounded-lg focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] outline-none bg-white text-black placeholder:text-black/60"
                    />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E4057]/60">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                  </div>
                  </div>
                </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2E4057] mb-2">
                        Nombre en la Tarjeta
                      </label>
                      <div className="relative">
                    <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="JOHN DOE"
                          className="w-full p-3 pl-12 border border-[#E1E1E8] rounded-lg focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] outline-none bg-white text-black placeholder:text-black/60"
                    />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E4057]/60">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                  </div>
                  </div>
                </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2E4057] mb-2">
                        Fecha de Expiración
                      </label>
                      <div className="relative">
                    <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                          maxLength={5}
                          placeholder="MM/YY"
                          className="w-full p-3 pl-12 border border-[#E1E1E8] rounded-lg focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] outline-none bg-white text-black placeholder:text-black/60"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E4057]/60">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                  </div>
                </div>
              </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2E4057] mb-2">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                          maxLength={4}
                          placeholder="123"
                          className="w-full p-3 pl-12 border border-[#E1E1E8] rounded-lg focus:border-[#048BA8] focus:ring-1 focus:ring-[#048BA8] outline-none bg-white text-black placeholder:text-black/60"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2E4057]/60">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                        </div>
              </div>
            </div>
          </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#E1E1E8]">
                  <h4 className="font-montserrat font-semibold text-[#2E4057] mb-4">Resumen del Pago</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[#2E4057]">
                      <span>Subtotal</span>
                      <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#2E4057]">
                      <span>Envío</span>
                  <span className="font-medium">$10.00</span>
                </div>
                    <div className="border-t border-[#E1E1E8] pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-[#2E4057]">
                        <span>Total</span>
                        <span className="text-lg">${(getTotalPrice() + 10).toFixed(2)}</span>
                </div>
                </div>
              </div>
                </div>

                <div className="bg-[#F4F4F8] p-4 rounded-lg flex items-start space-x-3">
                  <div className="text-[#048BA8] mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  </div>
                  <p className="text-sm text-[#2E4057]/70">
                    Tus datos de pago están seguros. Utilizamos encriptación SSL para proteger tu información.
                  </p>
                </div>
              </div>
            )}

            <div className="flex space-x-4 mt-6">
              {step === 2 && (
                <button
                  onClick={handleBackStep}
                  className="flex-1 py-3 border border-[#E1E1E8] rounded-lg text-[#2E4057] hover:bg-[#F4F4F8] transition-colors"
                >
                  Volver
                </button>
              )}
              <button
                onClick={handleNextStep}
                disabled={step === 1 && !selectedPaymentMethod}
                className={`flex-1 py-3 rounded-lg text-white transition-colors ${
                  step === 1 && !selectedPaymentMethod
                    ? 'bg-[#048BA8]/50 cursor-not-allowed'
                    : 'bg-[#048BA8] hover:bg-[#037897]'
                }`}
              >
                {step === 1 ? 'Continuar' : 'Pagar Ahora'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-[#2E4057]/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-[#048BA8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#048BA8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-montserrat font-semibold text-[#2E4057] mb-2">
              ¡Pago Procesado!
            </h3>
            <p className="text-[#2E4057]/70 mb-6">
              Tu pago ha sido procesado exitosamente. Serás redirigido a la página de confirmación.
            </p>
            <div className="w-12 h-12 border-t-4 border-b-4 border-[#048BA8] rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
      )}
    </DashboardLayout>
  );
} 