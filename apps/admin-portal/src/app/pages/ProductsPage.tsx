import { Card } from '@react-demo/ui-components';
import styles from './ProductsPage.module.css';
export function ProductsPage() {
  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <h1>Product Management</h1>
        <p>Manage your product catalog</p>
      </div>
      <Card>
        <p>Product management features coming soon...</p>
      </Card>
    </div>
  );
}
