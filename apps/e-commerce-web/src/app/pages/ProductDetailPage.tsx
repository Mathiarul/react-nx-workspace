import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '@react-demo/products';
import { ProductDetail } from '@react-demo/products';
import { useCart } from '@react-demo/cart';
import { Loading } from '@react-demo/ui-components';
import { Product } from '@react-demo/types';
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, isLoading, error } = useProduct(id || '');
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.errorContainer}>
        <h2>Product not found</h2>
        <p>{error || 'The product you are looking for does not exist.'}</p>
      </div>
    );
  }

  return (
    <div className={styles.productDetailPage}>
      <ProductDetail
        product={product}
        onAddToCart={handleAddToCart}
        onBack={() => navigate('/products')}
      />
    </div>
  );
}

