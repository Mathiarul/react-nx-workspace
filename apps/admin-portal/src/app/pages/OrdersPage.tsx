import { Card } from '@react-demo/ui-components';
import styles from './OrdersPage.module.css';
export function OrdersPage() {
  return (
    <div className={styles.ordersPage}>
      <div className={styles.header}>
        <h1>Order Management</h1>
        <p>Process and manage customer orders</p>
      </div>
      <Card>
        <p>Order management features coming soon...</p>
      </Card>
    </div>
  );
}
