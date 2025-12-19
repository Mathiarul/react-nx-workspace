import { Button } from '@react-demo/ui-components';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export function HomePage() {

  const categories = [
    { id: 'electronics', name: 'Electronics', emoji: '💻' },
    { id: 'clothing', name: 'Clothing', emoji: '👕' },
    { id: 'books', name: 'Books', emoji: '📚' },
    { id: 'home', name: 'Home & Garden', emoji: '🏡' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Welcome to Mobile Shop <span role="img" aria-label="Mobile phone">📱</span>
        </h1>
        <p className={styles.subtitle}>Shop on the go, anytime, anywhere</p>
        <Link to="/products">
          <Button variant="primary" size="large">
            Start Shopping
          </Button>
        </Link>
      </div>

      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className={styles.categoryCard}
            >
              <span className={styles.categoryEmoji}>
                <span role="img" aria-label={category.name}>{category.emoji}</span>
              </span>
              <span className={styles.categoryName}>{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Shop With Us?</h2>
        <div className={styles.featureList}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>
              <span role="img" aria-label="Delivery truck">🚚</span>
            </span>
            <h3>Free Shipping</h3>
            <p>On orders over $50</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>
              <span role="img" aria-label="Lock">🔒</span>
            </span>
            <h3>Secure Payment</h3>
            <p>100% secure transactions</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>
              <span role="img" aria-label="Return arrow">↩️</span>
            </span>
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
        </div>
      </section>
    </div>
  );
}

