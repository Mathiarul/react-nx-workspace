import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@react-demo/auth';
import { CartDrawer, CartIcon } from '@react-demo/cart';
import { Button } from '@react-demo/ui-components';
import { userUtils } from '@react-demo/user-management';
import styles from './Header.module.css';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <span role="img" aria-label="Shopping">🛍️</span> E-Commerce
          </Link>

          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
            <Link to="/products" className={styles.navLink}>
              Products
            </Link>
          </nav>

          <div className={styles.actions}>
            <CartIcon onClick={() => setIsCartOpen(true)} />

            {isAuthenticated && user ? (
              <>
                <Link to="/profile" className={styles.userInfo}>
                  <span className={styles.userAvatar}>
                    {userUtils.getInitials(user)}
                  </span>
                  <span className={styles.userName}>
                    {user.firstName}
                  </span>
                </Link>
                <Button variant="outline" size="small" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button size="small" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </>
  );
}

