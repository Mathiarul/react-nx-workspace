import { ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export function Card({
  children,
  title,
  footer,
  className = '',
  padding = 'medium',
}: CardProps) {
  return (
    <div className={`${styles.card} ${styles[`padding-${padding}`]} ${className}`}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}

