import styles from './stat-card.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

export function StatCard({ title, value, icon, trend, color = 'blue' }: StatCardProps) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.value}>{value}</p>
        </div>
        {icon && (
          <div className={styles.icon}>
            <span>{icon}</span>
          </div>
        )}
      </div>
      {trend && (
        <div className={styles.trend}>
          <span className={trend.isPositive ? styles.positive : styles.negative}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className={styles.trendLabel}>vs last month</span>
        </div>
      )}
    </div>
  );
}

