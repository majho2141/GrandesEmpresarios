import React from 'react';

interface EmprendedorHeaderProps {
  titulo: string;
}

export default function EmprendedorHeader({ titulo }: EmprendedorHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-[#2E4057]">{titulo}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </div>
        <div className="h-10 w-10 rounded-full bg-[#F18F01] text-white flex items-center justify-center cursor-pointer">
          <span className="font-semibold">E</span>
        </div>
      </div>
    </header>
  );
} 