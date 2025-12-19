import styles from './recent-activity.module.css';

interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'success' | 'warning' | 'info';
}

const activities: Activity[] = [
  {
    id: 1,
    title: 'New user registered',
    description: 'John Doe signed up for a premium account',
    time: '2 minutes ago',
    type: 'success',
  },
  {
    id: 2,
    title: 'Server maintenance',
    description: 'Scheduled maintenance completed successfully',
    time: '1 hour ago',
    type: 'info',
  },
  {
    id: 3,
    title: 'High memory usage',
    description: 'Server #3 is using 85% memory',
    time: '3 hours ago',
    type: 'warning',
  },
  {
    id: 4,
    title: 'Payment received',
    description: 'Invoice #1234 has been paid',
    time: '5 hours ago',
    type: 'success',
  },
];

export function RecentActivity() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recent Activity</h2>
      <div className={styles.activities}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.activity}>
            <div className={`${styles.indicator} ${styles[activity.type]}`} />
            <div className={styles.content}>
              <div className={styles.header}>
                <h3 className={styles.activityTitle}>{activity.title}</h3>
                <span className={styles.time}>{activity.time}</span>
              </div>
              <p className={styles.description}>{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

