import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { Categories } from '@/components/home/Categories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { PromoBanner } from '@/components/home/PromoBanner';
import { Benefits } from '@/components/home/Benefits';
import { Testimonials } from '@/components/home/Testimonials';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <PromoBanner />
        <Benefits />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
