import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductGrid } from '@react-demo/products';
import { useProducts } from '@react-demo/products';
import { useCart } from '@react-demo/cart';
import { Button, Input, Loading } from '@react-demo/ui-components';
import { Product, ProductCategory } from '@react-demo/types';
import styles from './ProductsPage.module.css';

export function ProductsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>();

  const { products, isLoading } = useProducts({
    search: searchQuery,
    category: selectedCategory,
  });

  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <h1>Products</h1>
        <p>Browse our collection of amazing products</p>
      </div>

      <div className={styles.filters}>
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInput}
        />

        <div className={styles.categories}>
          <Button
            variant={!selectedCategory ? 'primary' : 'outline'}
            size="small"
            onClick={() => setSelectedCategory(undefined)}
          >
            All
          </Button>
          {Object.values(ProductCategory).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              size="small"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Loading size="large" />
          </div>
        ) : (
          <>
            <div className={styles.resultsInfo}>
              <p>{products.length} products found</p>
            </div>
            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
            />
          </>
        )}
      </div>
    </div>
  );
}

