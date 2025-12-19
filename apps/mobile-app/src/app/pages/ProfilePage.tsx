import { useAuth, LoginForm } from '@react-demo/auth';
import { Button } from '@react-demo/ui-components';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.loginContainer}>
          <h1 className={styles.title}>Welcome Back!</h1>
          <p className={styles.subtitle}>Please login to continue</p>
          <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </div>
        <h1 className={styles.name}>
          {user.firstName} {user.lastName}
        </h1>
        <p className={styles.email}>{user.email}</p>
      </div>

      <div className={styles.menu}>
        <div className={styles.menuSection}>
          <h3 className={styles.menuTitle}>Account</h3>
          <button className={styles.menuItem}>
            <span>
              <span role="img" aria-label="User">👤</span> Personal Information
            </span>
            <span>→</span>
          </button>
          <button className={styles.menuItem}>
            <span>
              <span role="img" aria-label="Location">📍</span> Addresses
            </span>
            <span>→</span>
          </button>
          <button className={styles.menuItem}>
            <span>
              <span role="img" aria-label="Payment">💳</span> Payment Methods
            </span>
            <span>→</span>
          </button>
        </div>

        <div className={styles.menuSection}>
          <h3 className={styles.menuTitle}>Orders</h3>
          <button className={styles.menuItem}>
            <span>
              <span role="img" aria-label="Orders">📦</span> My Orders
            </span>
            <span>→</span>
          </button>
          <button className={styles.menuItem}>
            <span>
              <span role="img" aria-label="Wishlist">❤️</span> Wishlist
            </span>
            <span>→</span>
          </button>
        </div>

        <div className={styles.menuSection}>
          <h3 className={styles.menuTitle}>Settings</h3>
          <button className={styles.menuItem}>
            <span>
              <span role="img" aria-label="Notifications">🔔</span> Notifications
            </span>
            <span>→</span>
          </button>
          <button className={styles.menuItem}>
            <span>
              <span role="img" aria-label="Privacy">🔒</span> Privacy & Security
            </span>
            <span>→</span>
          </button>
          <button className={styles.menuItem}>
            <span>
              <span role="img" aria-label="Help">ℹ️</span> Help & Support
            </span>
            <span>→</span>
          </button>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" size="large" onClick={logout} fullWidth>
          Logout
        </Button>
      </div>
    </div>
  );
}

