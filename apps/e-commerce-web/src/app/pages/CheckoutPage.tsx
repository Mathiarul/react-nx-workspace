import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ProtectedRoute } from '@react-demo/auth';
import { useCart } from '@react-demo/cart';
import { Button, Input, Card } from '@react-demo/ui-components';
import { orderService, orderCalculations } from '@react-demo/order-management';
import { Address, PaymentMethod, OrderItem } from '@react-demo/types';
import { formatCurrency } from '@react-demo/utils';
import styles from './CheckoutPage.module.css';

function CheckoutContent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const [shippingAddress, setShippingAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CREDIT_CARD
  );

  const orderItems: OrderItem[] = cart.items.map((item) => ({
    productId: item.product.id,
    productName: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const summary = orderCalculations.getOrderSummary(orderItems);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      const order = await orderService.createOrder({
        userId: user.id,
        items: orderItems,
        shippingAddress,
        paymentMethod,
      });


      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  const updateAddress = (field: keyof Address, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  if (cart.items.length === 0) {
    return (
      <div className={styles.emptyCheckout}>
        <h2>Your cart is empty</h2>
        <p>Add items to your cart before checking out</p>
        <Button onClick={() => navigate('/products')}>Browse Products</Button>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <h1>Checkout</h1>

      <div className={styles.checkoutContent}>
        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          <Card className={styles.section}>
            <h2>Shipping Address</h2>
            <div className={styles.formGrid}>
              <Input
                placeholder="Street Address"
                value={shippingAddress.street}
                onChange={(e) => updateAddress('street', e.target.value)}
                required
              />
              <Input
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) => updateAddress('city', e.target.value)}
                required
              />
              <Input
                placeholder="State"
                value={shippingAddress.state}
                onChange={(e) => updateAddress('state', e.target.value)}
                required
              />
              <Input
                placeholder="Zip Code"
                value={shippingAddress.zipCode}
                onChange={(e) => updateAddress('zipCode', e.target.value)}
                required
              />
            </div>
          </Card>

          <Card className={styles.section}>
            <h2>Payment Method</h2>
            <div className={styles.paymentMethods}>
              {Object.values(PaymentMethod).map((method) => (
                <label key={method} className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  />
                  <span>{method.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </Card>

          {error && <div className={styles.error}>{error}</div>}

          <Button
            type="submit"
            disabled={isProcessing}
            fullWidth
            size="large"
          >
            {isProcessing ? 'Processing...' : `Place Order - ${formatCurrency(summary.total)}`}
          </Button>
        </form>

        <div className={styles.orderSummary}>
          <Card>
            <h2>Order Summary</h2>
            <div className={styles.summaryItems}>
              {cart.items.map((item) => (
                <div key={item.product.id} className={styles.summaryItem}>
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>{formatCurrency(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <hr />
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatCurrency(summary.subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{formatCurrency(summary.shipping)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>{formatCurrency(summary.tax)}</span>
            </div>
            <hr />
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{formatCurrency(summary.total)}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}

