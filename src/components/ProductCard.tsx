import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import type { Product } from '@/lib/products';
import { useCart } from '@/hooks/use-cart';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, index, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.colors[0],
      size: '10',
      image: product.image,
    });
    toast.success(`${product.name} added to bag`, {
      description: `Size 10 · ${product.colors[0]}`,
    });
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group neumorphic neumorphic-hover p-5 cursor-pointer metallic-border"
      onClick={() => onQuickView(product)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl mb-5">
        <div className="bg-gradient-to-br from-secondary via-muted to-secondary rounded-xl p-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-contain transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

        {/* Add to cart button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleAddToCart}
          className={`absolute bottom-4 right-4 p-3.5 rounded-full btn-metallic opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 ${
            isAdding ? 'animate-pulse-glow scale-110' : ''
          }`}
          aria-label={`Add ${product.name} to bag`}
        >
          <ShoppingBag className="w-4 h-4" />
        </motion.button>

        {/* Quick view label */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
          <span className="font-body text-[10px] uppercase tracking-widest text-foreground/80 bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2.5 px-1">
        <div className="flex items-center gap-1.5">
          <Star className="w-3 h-3 fill-foreground text-foreground" />
          <span className="text-[11px] font-body text-muted-foreground">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>
        <h3 className="font-display text-2xl text-foreground tracking-wide">{product.name}</h3>
        <p className="font-body text-[11px] text-muted-foreground uppercase tracking-widest">{product.tagline}</p>
        <div className="flex items-center justify-between pt-1">
          <p className="font-body text-lg font-semibold text-gradient">${product.price}</p>
          <div className="flex gap-1.5">
            {product.colors.map(color => (
              <span
                key={color}
                className="text-[9px] font-body uppercase tracking-widest px-2.5 py-1 rounded-full border border-border text-muted-foreground"
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
