import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@react-demo/cart';
import { useAuth } from '@react-demo/auth';
import styles from './MobileNav.module.css';

export function MobileNav() {
  const location = useLocation();
  const { cart } = useCart();
  const { user } = useAuth();

  const cartCount = cart.itemCount;

  const isActive = (path: string) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={`${styles.navItem} ${isActive('/')}`}>
        <span className={styles.icon}>
          <span role="img" aria-label="Home icon">🏠</span>
        </span>
        <span className={styles.label}>Home</span>
      </Link>

      <Link to="/products" className={`${styles.navItem} ${isActive('/products')}`}>
        <span className={styles.icon}>
          <span role="img" aria-label="Shop icon">🛍️</span>
        </span>
        <span className={styles.label}>Shop</span>
      </Link>

      <Link to="/cart" className={`${styles.navItem} ${isActive('/cart')}`}>
        <span className={styles.icon}>
          <span role="img" aria-label="Cart icon">🛒</span>
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </span>
        <span className={styles.label}>Cart</span>
      </Link>

      <Link to="/profile" className={`${styles.navItem} ${isActive('/profile')}`}>
        <span className={styles.icon}>
          <span role="img" aria-label={user ? 'Profile icon' : 'Login icon'}>
            {user ? '👤' : '🔓'}
          </span>
        </span>
        <span className={styles.label}>{user ? 'Profile' : 'Login'}</span>
      </Link>
    </nav>
  );
}

