import React, { useState, useEffect } from 'react';
import { Product, ProductCategory, ApiResponse, PaginatedResponse } from '@react-demo/types';
import { apiClient } from '@react-demo/api-client';
import { formatCurrency, truncate } from '@react-demo/utils';
import { Button, Card, Loading } from '@react-demo/ui-components';
import styles from './products.module.css';

// ============================================================================
// Product Service
// ============================================================================

export interface ProductFilters {
  category?: ProductCategory;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  page?: number;
  pageSize?: number;
}

export class ProductService {
  private baseUrl = '/products';

  async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();

    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.featured !== undefined) params.append('featured', filters.featured.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString());

    const queryString = params.toString();
    const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;

    return await apiClient.get<PaginatedResponse<Product>>(url);
  }

  async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await this.getProducts({ featured: true, pageSize: 10 });
    return response.data;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await this.getProducts({ search: query, pageSize: 20 });
    return response.data;
  }
}

export const productService = new ProductService();

// ============================================================================
// Product Hooks
// ============================================================================

export function useProducts(filters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await productService.getProducts(filters);
        setProducts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { products, isLoading, error };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, isLoading, error };
}

// ============================================================================
// Product Card Component
// ============================================================================

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onClick?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  return (
    <Card className={styles['product-card']}>
      <img
        src={product.imageUrl}
        alt={product.name}
        className={styles['product-image']}
        onClick={() => onClick?.(product)}
      />
      <div className={styles['product-content']}>
        <h3 className={styles['product-name']} onClick={() => onClick?.(product)}>
          {product.name}
        </h3>
        <p className={styles['product-description']}>
          {truncate(product.description, 80)}
        </p>
        <div className={styles['product-footer']}>
          <span className={styles['product-price']}>
            {formatCurrency(product.price)}
          </span>
          <div className={styles['product-rating']}>
            ⭐ {product.rating.toFixed(1)} ({product.reviews})
          </div>
        </div>
        {product.stock > 0 ? (
          <Button onClick={() => onAddToCart?.(product)} fullWidth>
            Add to Cart
          </Button>
        ) : (
          <Button variant="outline" disabled fullWidth>
            Out of Stock
          </Button>
        )}
      </div>
    </Card>
  );
}

// ============================================================================
// Product Grid Component
// ============================================================================

export interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  isLoading?: boolean;
}

export function ProductGrid({
  products,
  onAddToCart,
  onProductClick,
  isLoading,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={styles['loading-container']}>
        <Loading size="large" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles['empty-state']}>
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className={styles['product-grid']}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Product Detail Component
// ============================================================================

export interface ProductDetailProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onBack?: () => void;
}

export function ProductDetail({ product, onAddToCart, onBack }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart?.(product);
    }
  };

  return (
    <div className={styles['product-detail']}>
      {onBack && (
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
      )}
      <div className={styles['detail-content']}>
        <div className={styles['detail-image-container']}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles['detail-image']}
          />
        </div>
        <div className={styles['detail-info']}>
          <h1 className={styles['detail-name']}>{product.name}</h1>
          <div className={styles['detail-rating']}>
            ⭐ {product.rating.toFixed(1)} ({product.reviews} reviews)
          </div>
          <p className={styles['detail-price']}>{formatCurrency(product.price)}</p>
          <p className={styles['detail-description']}>{product.description}</p>
          <div className={styles['detail-meta']}>
            <span>Category: {product.category}</span>
            <span>Stock: {product.stock} available</span>
          </div>
          {product.stock > 0 && (
            <div className={styles['detail-actions']}>
              <div className={styles['quantity-selector']}>
                <Button
                  size="small"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button
                  size="small"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </Button>
              </div>
              <Button onClick={handleAddToCart}>Add to Cart</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
