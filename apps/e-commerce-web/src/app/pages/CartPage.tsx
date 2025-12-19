import { useNavigate } from 'react-router-dom';
import { useCart } from '@react-demo/cart';
import { CartItemComponent, CartSummary } from '@react-demo/cart';
import { Button } from '@react-demo/ui-components';
import styles from './CartPage.module.css';

export function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeItem } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIcon}>
            <span role="img" aria-label="Empty shopping cart">🛒</span>
          </div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1>Shopping Cart</h1>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          <div className={styles.cartHeader}>
            <h2>Items ({cart.itemCount})</h2>
          </div>
          {cart.items.map((item) => (
            <CartItemComponent
              key={item.product.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <div className={styles.cartSidebar}>
          <CartSummary onCheckout={() => navigate('/checkout')} />
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}

