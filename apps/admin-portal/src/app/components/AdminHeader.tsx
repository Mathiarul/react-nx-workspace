import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@react-demo/auth';
import { Button } from '@react-demo/ui-components';
import styles from './AdminHeader.module.css';

export function AdminHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <span role="img" aria-label="Settings gear">⚙️</span>
          </span>
          <span className={styles.logoText}>Admin Portal</span>
        </Link>

        <div className={styles.actions}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{'Admin'}</span>
            <span className={styles.userRole}>{user?.role || 'Administrator'}</span>
          </div>
          <Button variant="outline" size="small" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

