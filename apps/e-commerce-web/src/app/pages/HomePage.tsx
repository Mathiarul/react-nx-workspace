import { useNavigate } from 'react-router-dom';
import { useProducts } from '@react-demo/products';
import { ProductGrid } from '@react-demo/products';
import { useCart } from '@react-demo/cart';
import { Button, Loading } from '@react-demo/ui-components';
import { Product } from '@react-demo/types';
import styles from './HomePage.module.css';

export function HomePage() {
  const navigate = useNavigate();
  const { products, isLoading } = useProducts({ featured: true, pageSize: 6 });
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to E-Commerce</h1>
          <p className={styles.heroSubtitle}>
            Discover amazing products at unbeatable prices
          </p>
          <div className={styles.heroActions}>
            <Button size="large" onClick={() => navigate('/products')}>
              Shop Now
            </Button>
            <Button variant="outline" size="large" onClick={() => navigate('/products')}>
              Browse Products
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2>Featured Products</h2>
          <Button variant="ghost" onClick={() => navigate('/products')}>
            View All →
          </Button>
        </div>

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Loading size="large" />
          </div>
        ) : (
          <ProductGrid
            products={products}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
          />
        )}
      </section>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <span role="img" aria-label="Delivery truck">🚚</span>
          </div>
          <h3>Free Shipping</h3>
          <p>On orders over $100</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <span role="img" aria-label="Secure lock">🔒</span>
          </div>
          <h3>Secure Payment</h3>
          <p>100% secure transactions</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <span role="img" aria-label="Return arrows">🔄</span>
          </div>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <span role="img" aria-label="Speech bubble">💬</span>
          </div>
          <h3>24/7 Support</h3>
          <p>Dedicated customer service</p>
        </div>
      </section>
    </div>
  );
}
