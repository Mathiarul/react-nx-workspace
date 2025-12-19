import { useCart } from '@react-demo/cart';
import { Button } from '@react-demo/ui-components';
import { formatCurrency } from '@react-demo/utils';
import { Link } from 'react-router-dom';
import { CartItem } from '@react-demo/types';
import styles from './CartPage.module.css';

export function CartPage() {
  const { cart, removeItem, updateQuantity } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <span role="img" aria-label="Empty cart">🛒</span>
        </div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <Link to="/products">
          <Button variant="primary" size="large">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Shopping Cart</h1>

      <div className={styles.items}>
        {cart.items.map((item: CartItem) => (
          <div key={item.product.id} className={styles.item}>
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className={styles.itemImage}
            />
            <div className={styles.itemDetails}>
              <h3 className={styles.itemName}>{item.product.name}</h3>
              <div className={styles.itemPrice}>
                {formatCurrency(item.product.price)}
              </div>
              <div className={styles.itemControls}>
                <button
                  className={styles.qtyButton}
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  className={styles.qtyButton}
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => removeItem(item.product.id)}
                  aria-label="Remove item"
                >
                  <span role="img" aria-label="Delete">🗑️</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Subtotal:</span>
          <span className={styles.summaryValue}>{formatCurrency(cart.total)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Shipping:</span>
          <span className={styles.summaryValue}>Free</span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Total:</span>
          <span className={styles.totalValue}>{formatCurrency(cart.total)}</span>
        </div>
        <Button variant="primary" size="large" fullWidth>
          Checkout <span role="img" aria-label="Credit card">💳</span>
        </Button>
      </div>
    </div>
  );
}

