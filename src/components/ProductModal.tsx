import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Minus, Plus } from 'lucide-react';
import type { Product } from '@/lib/products';
import { useCart } from '@/hooks/use-cart';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('10');
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    setIsAdded(true);
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        color: selectedColor,
        size: selectedSize,
        image: product.image,
      });
    }
    toast.success(`${product.name} × ${quantity} added to bag!`);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 28, stiffness: 200 }}
          className="relative z-10 w-full max-w-3xl neumorphic p-6 md:p-10 max-h-[90vh] overflow-y-auto metallic-border"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="bg-gradient-to-br from-secondary via-muted to-secondary rounded-2xl p-8 flex items-center justify-center">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full max-w-xs object-contain drop-shadow-2xl"
                whileHover={{ rotate: 5, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 200 }}
                draggable={false}
              />
            </div>

            {/* Details */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-foreground text-foreground' : 'text-muted-foreground/30'}`} />
                  ))}
                  <span className="font-body text-xs text-muted-foreground ml-1">
                    {product.reviews.toLocaleString()} reviews
                  </span>
                </div>
                <h2 className="font-display text-4xl text-gradient">{product.name}</h2>
                <p className="font-body text-sm text-muted-foreground mt-1">{product.tagline}</p>
                <p className="font-display text-3xl text-foreground mt-4">${product.price}.00</p>
              </div>

              {/* Color */}
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Color — {selectedColor}</p>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2.5 rounded-full font-body text-[11px] uppercase tracking-wider transition-all duration-300 ${
                        selectedColor === color
                          ? 'btn-metallic'
                          : 'border border-border text-muted-foreground hover:border-muted-foreground bg-transparent'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Size — US {selectedSize}</p>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 rounded-xl font-body text-sm transition-all duration-300 ${
                        selectedSize === size
                          ? 'btn-metallic'
                          : 'border border-border text-muted-foreground hover:border-muted-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-body text-lg font-semibold w-8 text-center text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(10, q + 1))}
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAdd}
                className={`w-full py-4 rounded-full font-body font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 ${
                  isAdded
                    ? 'bg-green-600/90 text-foreground glow-strong'
                    : 'btn-metallic'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {isAdded ? '✓ Added to Bag' : `Add to Bag — $${(product.price * quantity).toFixed(2)}`}
              </motion.button>

              <div className="gradient-divider" />

              <p className="font-body text-[10px] text-muted-foreground text-center uppercase tracking-widest">
                Free Shipping · 30-Day Returns · 2-Year Warranty
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
