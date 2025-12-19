import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '@react-demo/products';
import { useCart } from '@react-demo/cart';
import { Button, Loading } from '@react-demo/ui-components';
import { formatCurrency } from '@react-demo/utils';
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, isLoading } = useProduct(id || '');
  const { addItem } = useCart();


  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      alert('Added to cart! 🛒');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loading size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.error}>
        <h2>Product not found</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.imageContainer}>
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{product.name}</h1>
        <div className={styles.price}>{formatCurrency(product.price)}</div>

        <div className={styles.info}>
          <span className={styles.category}>
            <span role="img" aria-label="Package">📦</span> {product.category}
          </span>
          <span className={styles.stock}>
            {product.stock > 0 ? (
              <>
                <span role="img" aria-label="In stock">✅</span> {product.stock} in stock
              </>
            ) : (
              <>
                <span role="img" aria-label="Out of stock">❌</span> Out of stock
              </>
            )}
          </span>
        </div>

        <div className={styles.description}>
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            size="large"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            fullWidth
          >
            {product.stock > 0 ? 'Add to Cart 🛒' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
}

