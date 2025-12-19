import { useNavigate } from 'react-router-dom';
import { useAuth, ProtectedRoute } from '@react-demo/auth';
import { Button, Card } from '@react-demo/ui-components';
import { userUtils } from '@react-demo/user-management';
import styles from './ProfilePage.module.css';

function ProfileContent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className={styles.profilePage}>
      <h1>My Profile</h1>

      <div className={styles.profileContent}>
        <Card className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {userUtils.getInitials(user)}
            </div>
            <div>
              <h2>{userUtils.getFullName(user)}</h2>
              <p className={styles.role}>{userUtils.getRoleDisplayName(user.role)}</p>
            </div>
          </div>

          <div className={styles.infoSection}>
            <h3>Personal Information</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className={styles.infoItem}>
                <label>First Name</label>
                <p>{user.firstName}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Last Name</label>
                <p>{user.lastName}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Member Since</label>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button variant="outline">Edit Profile</Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Card>

        <Card className={styles.ordersCard}>
          <h3>Recent Orders</h3>
          <p className={styles.emptyMessage}>No orders yet</p>
          <Button onClick={() => navigate('/products')}>
            Start Shopping
          </Button>
        </Card>
      </div>
    </div>
  );
}

export function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

