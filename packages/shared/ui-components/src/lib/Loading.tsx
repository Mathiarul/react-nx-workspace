import styles from './Loading.module.css';

export interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export function Loading({ size = 'medium', message }: LoadingProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

