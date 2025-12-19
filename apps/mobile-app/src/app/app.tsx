import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@react-demo/auth';
import { CartProvider } from '@react-demo/cart';
import { MobileNav } from './components/MobileNav';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { ProfilePage } from './pages/ProfilePage';
import styles from './app.module.css';

function AppContent() {
  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <MobileNav />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
