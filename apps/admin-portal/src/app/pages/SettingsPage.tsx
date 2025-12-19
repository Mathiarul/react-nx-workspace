import { Card } from '@react-demo/ui-components';
import styles from './SettingsPage.module.css';
export function SettingsPage() {
  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <h1>Settings</h1>
        <p>Manage system settings and preferences</p>
      </div>
      <Card>
        <p>Settings options coming soon...</p>
      </Card>
    </div>
  );
}
