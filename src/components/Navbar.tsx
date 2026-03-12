import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { count, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
        <a href="#" className="font-display text-3xl md:text-4xl tracking-[0.15em] text-gradient">
          NEXUS
        </a>

        <div className="hidden md:flex items-center gap-10 font-body text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
          {['Shop', 'Featured', 'Experience', 'Reviews'].map(item => (
            <a
              key={item}
              href={`#${item === 'Shop' ? 'products' : item === 'Experience' ? 'viewer' : item === 'Reviews' ? 'testimonials' : item.toLowerCase()}`}
              className="hover:text-foreground transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleCart}
            className="relative p-2.5 rounded-full glass text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Open bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-foreground text-background text-[9px] flex items-center justify-center font-bold"
              >
                {count}
              </motion.span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-full glass text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-foreground/[0.06]"
          >
            <div className="flex flex-col gap-5 p-8 font-body text-sm uppercase tracking-[0.15em]">
              {[
                { label: 'Shop', href: '#products' },
                { label: 'Featured', href: '#featured' },
                { label: 'Experience', href: '#viewer' },
                { label: 'Reviews', href: '#testimonials' },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
