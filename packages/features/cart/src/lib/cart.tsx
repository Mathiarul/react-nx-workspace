import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, Product } from '@react-demo/types';
import { formatCurrency } from '@react-demo/utils';
import { Button, Card } from '@react-demo/ui-components';
import { getLocalStorage, setLocalStorage } from '@react-demo/utils';
import styles from './cart.module.css';

// ============================================================================
// Cart Context
// ============================================================================

export interface CartContextType {
  cart: Cart;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopping-cart';

export interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  // Initialize state with localStorage value using lazy initialization
  const [cart, setCart] = useState<Cart>(() => {
    const savedCart = getLocalStorage<Cart | null>(CART_STORAGE_KEY, null);
    return savedCart || {
      items: [],
      total: 0,
      itemCount: 0,
    };
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    setLocalStorage(CART_STORAGE_KEY, cart);
  }, [cart]);

  const calculateCart = (items: CartItem[]): Cart => {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return { items, total, itemCount };
  };

  const addItem = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.product.id === product.id
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevCart.items, { product, quantity: 1 }];
      }

      return calculateCart(newItems);
    });
  };

  const removeItem = (productId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter(
        (item) => item.product.id !== productId
      );
      return calculateCart(newItems);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      return calculateCart(newItems);
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0, itemCount: 0 });
  };

  const getItemQuantity = (productId: string): number => {
    const item = cart.items.find((item) => item.product.id === productId);
    return item?.quantity || 0;
  };

  const value: CartContextType = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ============================================================================
// Cart Hook
// ============================================================================

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// ============================================================================
// Cart Icon Component
// ============================================================================

export interface CartIconProps {
  onClick?: () => void;
}

export function CartIcon({ onClick }: CartIconProps) {
  const { cart } = useCart();

  return (
    <button className={styles['cart-icon']} onClick={onClick} aria-label="Shopping cart">
      <span role="img" aria-label="Shopping cart icon">🛒</span>
      {cart.itemCount > 0 && (
        <span className={styles['cart-badge']}>{cart.itemCount}</span>
      )}
    </button>
  );
}

// ============================================================================
// Cart Item Component
// ============================================================================

export interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
}

export function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemComponentProps) {
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <div className={styles['cart-item']}>
      <img
        src={product.imageUrl}
        alt={product.name}
        className={styles['cart-item-image']}
      />
      <div className={styles['cart-item-details']}>
        <h4 className={styles['cart-item-name']}>{product.name}</h4>
        <p className={styles['cart-item-price']}>
          {formatCurrency(product.price)}
        </p>
      </div>
      <div className={styles['cart-item-controls']}>
        <div className={styles['quantity-controls']}>
          <Button
            size="small"
            onClick={() => onUpdateQuantity?.(product.id, quantity - 1)}
          >
            -
          </Button>
          <span className={styles['quantity-value']}>{quantity}</span>
          <Button
            size="small"
            onClick={() => onUpdateQuantity?.(product.id, quantity + 1)}
          >
            +
          </Button>
        </div>
        <p className={styles['cart-item-total']}>{formatCurrency(itemTotal)}</p>
        <Button
          variant="ghost"
          size="small"
          onClick={() => onRemove?.(product.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// Cart Summary Component
// ============================================================================

export interface CartSummaryProps {
  onCheckout?: () => void;
}

export function CartSummary({ onCheckout }: CartSummaryProps) {
  const { cart } = useCart();

  return (
    <Card className={styles['cart-summary']}>
      <h3 className={styles['summary-title']}>Order Summary</h3>
      <div className={styles['summary-row']}>
        <span>Subtotal ({cart.itemCount} items)</span>
        <span>{formatCurrency(cart.total)}</span>
      </div>
      <div className={styles['summary-row']}>
        <span>Shipping</span>
        <span>{cart.total >= 100 ? 'FREE' : formatCurrency(10)}</span>
      </div>
      <div className={styles['summary-row']}>
        <span>Tax (10%)</span>
        <span>{formatCurrency(cart.total * 0.1)}</span>
      </div>
      <hr className={styles['summary-divider']} />
      <div className={styles['summary-total']}>
        <span>Total</span>
        <span>
          {formatCurrency(
            cart.total + (cart.total >= 100 ? 0 : 10) + cart.total * 0.1
          )}
        </span>
      </div>
      <Button
        onClick={onCheckout}
        disabled={cart.items.length === 0}
        fullWidth
      >
        Proceed to Checkout
      </Button>
    </Card>
  );
}

// ============================================================================
// Cart Drawer Component
// ============================================================================

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { cart, updateQuantity, removeItem } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className={styles['drawer-overlay']} onClick={onClose} />
      <div className={styles['drawer-container']}>
        <div className={styles['drawer-header']}>
          <h2>Shopping Cart</h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className={styles['drawer-content']}>
          {cart.items.length === 0 ? (
            <div className={styles['empty-cart']}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className={styles['cart-items']}>
                {cart.items.map((item) => (
                  <CartItemComponent
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
              <CartSummary onCheckout={onCheckout} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartProvider;
