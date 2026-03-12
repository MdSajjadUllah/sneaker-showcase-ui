import { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import type { Product } from '@/lib/products';

export function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="products" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">The Collection</p>
          <h2 className="font-display text-5xl md:text-7xl text-gradient">SHOP ALL</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onQuickView={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
