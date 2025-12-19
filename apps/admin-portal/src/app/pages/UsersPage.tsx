import { Card } from '@react-demo/ui-components';
import styles from './UsersPage.module.css';
export function UsersPage() {
  return (
    <div className={styles.usersPage}>
      <div className={styles.header}>
        <h1>User Management</h1>
        <p>Manage user accounts and permissions</p>
      </div>
      <Card>
        <p>User management features coming soon...</p>
      </Card>
    </div>
  );
}
