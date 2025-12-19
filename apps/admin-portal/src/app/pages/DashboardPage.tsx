import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Loading } from '@react-demo/ui-components';
import { useAuth } from '@react-demo/auth';
import styles from './DashboardPage.module.css';
interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}
export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalOrders: 3891,
        totalRevenue: 127450.50,
        pendingOrders: 23,
      });
      setIsLoading(false);
    }, 500);
  }, []);
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loading size="large" />
      </div>
    );
  }
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.email || 'Admin'}</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline" onClick={() => navigate('/orders')}>
            View Orders
          </Button>
          <Button onClick={() => navigate('/products/new')}>
            Add Product
          </Button>
        </div>
      </div>
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <span role="img" aria-label="Users">👥</span>
          </div>
          <div className={styles.statContent}>
            <h3>Total Users</h3>
            <p className={styles.statValue}>{stats?.totalUsers.toLocaleString()}</p>
            <span className={styles.statChange}>+12% from last month</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <span role="img" aria-label="Orders">📦</span>
          </div>
          <div className={styles.statContent}>
            <h3>Total Orders</h3>
            <p className={styles.statValue}>{stats?.totalOrders.toLocaleString()}</p>
            <span className={styles.statChange}>+8% from last month</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <span role="img" aria-label="Revenue">💰</span>
          </div>
          <div className={styles.statContent}>
            <h3>Total Revenue</h3>
            <p className={styles.statValue}>${stats?.totalRevenue.toLocaleString()}</p>
            <span className={styles.statChange}>+15% from last month</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <span role="img" aria-label="Pending">⏳</span>
          </div>
          <div className={styles.statContent}>
            <h3>Pending Orders</h3>
            <p className={styles.statValue}>{stats?.pendingOrders}</p>
            <span className={styles.statChange}>Needs attention</span>
          </div>
        </Card>
      </div>
      <div className={styles.actionsGrid}>
        <Card className={styles.actionCard}>
          <h3>User Management</h3>
          <p>View and manage user accounts, roles, and permissions</p>
          <Button variant="outline" onClick={() => navigate('/users')}>
            Manage Users
          </Button>
        </Card>
        <Card className={styles.actionCard}>
          <h3>Product Management</h3>
          <p>Add, edit, or remove products from your catalog</p>
          <Button variant="outline" onClick={() => navigate('/products')}>
            Manage Products
          </Button>
        </Card>
        <Card className={styles.actionCard}>
          <h3>Order Management</h3>
          <p>Process orders and update order status</p>
          <Button variant="outline" onClick={() => navigate('/orders')}>
            Manage Orders
          </Button>
        </Card>
        <Card className={styles.actionCard}>
          <h3>Analytics</h3>
          <p>View detailed analytics and insights</p>
          <Button variant="outline" onClick={() => navigate('/analytics')}>
            View Analytics
          </Button>
        </Card>
      </div>
      <div className={styles.recentActivity}>
        <Card>
          <h3>Recent Activity</h3>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <span className={styles.activityTime}>2 minutes ago</span>
              <span className={styles.activityText}>New order received</span>
            </div>
            <div className={styles.activityItem}>
              <span className={styles.activityTime}>15 minutes ago</span>
              <span className={styles.activityText}>User registered</span>
            </div>
            <div className={styles.activityItem}>
              <span className={styles.activityTime}>1 hour ago</span>
              <span className={styles.activityText}>Product updated</span>
            </div>
            <div className={styles.activityItem}>
              <span className={styles.activityTime}>2 hours ago</span>
              <span className={styles.activityText}>Order marked as shipped</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
