import { HeroSection } from '@/components/landing/HeroSection';
import { PlansSection } from '@/components/landing/PlansSection';
import { PartnersSection } from '@/components/landing/PartnersSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PlansSection />
      <PartnersSection />
    </main>
  );
}
