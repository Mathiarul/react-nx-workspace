import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>E-Commerce</h3>
          <p>Your one-stop shop for everything you need</p>
        </div>
        <div className={styles.section}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>© 2025 E-Commerce. All rights reserved. Built with Nx Monorepo.</p>
      </div>
    </footer>
  );
}

