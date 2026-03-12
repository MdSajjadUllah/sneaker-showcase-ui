import { useSyncExternalStore } from 'react';
import { subscribeCart, getCartSnapshot, addToCart, removeFromCart, toggleCart, setCartOpen, getCartTotal, getCartCount } from '@/lib/cart-store';
import type { CartItem } from '@/lib/cart-store';

export function useCart() {
  const state = useSyncExternalStore(subscribeCart, getCartSnapshot);

  return {
    items: state.items,
    isOpen: state.isOpen,
    addItem: addToCart,
    removeItem: removeFromCart,
    toggleCart,
    setCartOpen,
    total: getCartTotal(),
    count: getCartCount(),
  };
}
