import { Card } from '@react-demo/ui-components';
import styles from './AnalyticsPage.module.css';
export function AnalyticsPage() {
  return (
    <div className={styles.analyticsPage}>
      <div className={styles.header}>
        <h1>Analytics Overview</h1>
        <p>View detailed analytics and metrics</p>
      </div>
      <Card>
        <p>Analytics features coming soon...</p>
      </Card>
    </div>
  );
}
