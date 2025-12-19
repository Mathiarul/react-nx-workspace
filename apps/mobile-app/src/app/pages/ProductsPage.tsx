import { useProducts, ProductCard } from '@react-demo/products';
import { Loading } from '@react-demo/ui-components';
import styles from './ProductsPage.module.css';

export function ProductsPage() {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loading size="large" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

