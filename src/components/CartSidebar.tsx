import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Minus, Plus, Tag } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateQuantity } from '@/lib/cart-store';

export function CartSidebar() {
  const { items, isOpen, setCartOpen, removeItem, total } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = total;
  const tax = subtotal * 0.08;
  const shipping = subtotal > 150 ? 0 : 12;
  const finalTotal = subtotal + tax + shipping - discount;

  const applyDiscount = () => {
    if (discountCode.toUpperCase() === 'NEXUS20') {
      const d = subtotal * 0.2;
      setDiscount(d);
      setDiscountApplied(true);
      toast.success('20% discount applied!');
    } else if (discountCode.toUpperCase() === 'NEXUS10') {
      const d = subtotal * 0.1;
      setDiscount(d);
      setDiscountApplied(true);
      toast.success('10% discount applied!');
    } else {
      toast.error('Invalid discount code');
      setDiscount(0);
      setDiscountApplied(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-md"
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md metallic-surface flex flex-col border-l border-foreground/[0.06]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-foreground/[0.06]">
              <h2 className="font-display text-2xl text-gradient flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-foreground" /> YOUR BAG
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2.5 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close bag"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full neumorphic-inset flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                  <p className="font-body text-muted-foreground text-sm">Your bag is empty</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-4 font-body text-xs underline text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={`${item.id}-${item.color}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="flex gap-4 neumorphic p-4 metallic-border"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-secondary to-muted rounded-xl flex-shrink-0 flex items-center justify-center p-2">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg text-foreground truncate">{item.name}</h3>
                      <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                        {item.color} · US {item.size}
                      </p>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-body text-sm font-medium w-5 text-center text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <p className="font-body font-semibold text-sm text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer with pricing */}
            {items.length > 0 && (
              <div className="p-6 border-t border-foreground/[0.06] space-y-4">
                {/* Discount code */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      value={discountCode}
                      onChange={e => setDiscountCode(e.target.value)}
                      placeholder="Discount code"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                      disabled={discountApplied}
                    />
                  </div>
                  <button
                    onClick={applyDiscount}
                    disabled={discountApplied || !discountCode}
                    className="px-5 py-2.5 rounded-xl font-body text-xs uppercase tracking-wider btn-metallic disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>

                {/* Price breakdown */}
                <div className="neumorphic-inset rounded-xl p-4 space-y-2.5">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-green-500">Discount</span>
                      <span className="text-green-500">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="text-foreground">${tax.toFixed(2)}</span>
                  </div>
                  <div className="gradient-divider my-2" />
                  <div className="flex justify-between font-body">
                    <span className="text-foreground font-semibold">Total</span>
                    <span className="text-xl font-bold text-gradient">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 btn-metallic font-body font-bold text-sm uppercase tracking-[0.2em] rounded-full"
                >
                  Secure Checkout
                </motion.button>
                <p className="font-body text-[9px] text-center text-muted-foreground uppercase tracking-widest">
                  SSL Encrypted · Taxes included · Free returns
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
