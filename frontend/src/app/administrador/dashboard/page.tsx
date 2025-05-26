'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AdministradorDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    enterprises: 0,
    products: 0
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await fetch('http://localhost:8080/api/v1/users', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const usersData = await usersResponse.json();
        
        // Fetch enterprises
        const enterprisesResponse = await fetch('http://localhost:8080/api/v1/enterprises', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const enterprisesData = await enterprisesResponse.json();
        
        // Fetch products
        const productsResponse = await fetch('http://localhost:8080/api/v1/products', {
          headers: {
            'accept': 'application/json'
          }
        });
        const productsData = await productsResponse.json();

        setStats({
          users: usersData.length,
          enterprises: enterprisesData.length,
          products: productsData.length
        });

        // Set user info from the first user (admin)
        if (usersData.length > 0) {
          setUserInfo({
            name: usersData[0].name,
            email: usersData[0].email
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <DashboardLayout 
      titulo="Dashboard Administrador" 
      rol="administrador"
      userName={userInfo.name}
      userEmail={userInfo.email}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resumen general */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Resumen General</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#F4F4F8] rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-[#048BA8]/10 flex items-center justify-center text-[#048BA8]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm text-[#2E4057]/60">Usuarios</h4>
                  <p className="text-2xl font-semibold text-[#2E4057]">{stats.users}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F4F4F8] rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-[#F18F01]/10 flex items-center justify-center text-[#F18F01]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>


                  
                </div>
                <div className="ml-4">
                  <h4 className="text-sm text-[#2E4057]/60">Emprendimientos</h4>
                  <p className="text-2xl font-semibold text-[#2E4057]">{stats.enterprises}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F4F4F8] rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-lg bg-[#99C24D]/10 flex items-center justify-center text-[#99C24D]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm text-[#2E4057]/60">Productos</h4>
                  <p className="text-2xl font-semibold text-[#2E4057]">{stats.products}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Panel de actividad reciente */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6 border border-[#E1E1E8]">
          <h2 className="text-xl font-semibold text-[#2E4057] mb-4">Actividad Reciente</h2>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-start pb-4 border-b border-[#E1E1E8] last:border-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                  item % 3 === 0 ? 'bg-[#048BA8]' : 
                  item % 3 === 1 ? 'bg-[#F18F01]' : 
                  'bg-[#99C24D]'
                }`}>
                  {item % 3 === 0 ? 'U' : 
                   item % 3 === 1 ? 'E' : 
                   'P'}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-[#2E4057]">
                    {item % 3 === 0 ? 'Nuevo usuario registrado' : 
                     item % 3 === 1 ? 'Nuevo emprendimiento creado' : 
                     'Nuevo producto añadido'}
                  </p>
                  <p className="text-xs text-[#2E4057]/60 mt-1">Hace {item * 10} minutos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 