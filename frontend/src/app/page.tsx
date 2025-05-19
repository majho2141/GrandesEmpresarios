'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSection } from '@/components/landing/HeroSection';
import { PlansSection } from '@/components/landing/PlansSection';
import { PartnersSection } from '@/components/landing/PartnersSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PlansSection />
      <PartnersSection />
    </main>
  );
}
