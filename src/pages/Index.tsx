import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedSection } from '@/components/FeaturedSection';
import { InteractiveViewer } from '@/components/InteractiveViewer';
import { ProductGrid } from '@/components/ProductGrid';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { CartSidebar } from '@/components/CartSidebar';
import { SiteFooter } from '@/components/SiteFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <InteractiveViewer />
      <ProductGrid />
      <TestimonialCarousel />
      <SiteFooter />
      <CartSidebar />
    </div>
  );
};

export default Index;
