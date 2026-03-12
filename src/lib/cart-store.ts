export interface CartItem {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
}

let listeners: (() => void)[] = [];
let cartState: { items: CartItem[]; isOpen: boolean } = { items: [], isOpen: false };

function emitChange() {
  listeners.forEach(l => l());
}

export function getCartSnapshot() {
  return cartState;
}

export function subscribeCart(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

export function addToCart(item: Omit<CartItem, 'quantity'>) {
  const existing = cartState.items.find(i => i.id === item.id && i.color === item.color && i.size === item.size);
  if (existing) {
    cartState = {
      ...cartState,
      items: cartState.items.map(i =>
        i === existing ? { ...i, quantity: i.quantity + 1 } : i
      ),
    };
  } else {
    cartState = {
      ...cartState,
      items: [...cartState.items, { ...item, quantity: 1 }],
    };
  }
  emitChange();
}

export function removeFromCart(id: string) {
  cartState = { ...cartState, items: cartState.items.filter(i => i.id !== id) };
  emitChange();
}

export function updateQuantity(id: string, color: string, size: string, quantity: number) {
  cartState = {
    ...cartState,
    items: cartState.items.map(i =>
      i.id === id && i.color === color && i.size === size ? { ...i, quantity } : i
    ),
  };
  emitChange();
}

export function toggleCart() {
  cartState = { ...cartState, isOpen: !cartState.isOpen };
  emitChange();
}

export function setCartOpen(open: boolean) {
  cartState = { ...cartState, isOpen: open };
  emitChange();
}

export function getCartTotal() {
  return cartState.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function getCartCount() {
  return cartState.items.reduce((sum, i) => sum + i.quantity, 0);
}
