import styles from './Dashboard.module.css';
import { StatCard, RecentActivity } from '@react-demo/dashboard-components';

export function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Welcome back! Here's what's happening today.</p>
      </header>

      <div className={styles.stats}>
        <StatCard
          title="Total Users"
          value="12,345"
          icon="👥"
          trend={{ value: 12.5, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Revenue"
          value="$54,321"
          icon="💰"
          trend={{ value: 8.2, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Active Projects"
          value="42"
          icon="📊"
          trend={{ value: 3.1, isPositive: false }}
          color="purple"
        />
        <StatCard
          title="Tasks Completed"
          value="234"
          icon="✅"
          trend={{ value: 15.8, isPositive: true }}
          color="orange"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <RecentActivity />
        </div>
        <div className={styles.sidebar}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Quick Actions</h3>
            <div className={styles.actions}>
              <button className={styles.actionButton}>
                <span role="img" aria-label="plus">➕</span> Create New Project
              </button>
              <button className={styles.actionButton}>
                <span role="img" aria-label="memo">📝</span> Add Task
              </button>
              <button className={styles.actionButton}>
                <span role="img" aria-label="person">👤</span> Invite Team Member
              </button>
              <button className={styles.actionButton}>
                <span role="img" aria-label="chart">📊</span> Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

