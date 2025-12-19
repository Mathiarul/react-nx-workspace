import {
  Order,
  OrderItem,
  OrderStatus,
  Address,
  PaymentMethod,
  ApiResponse,
  PaginatedResponse,
} from '@react-demo/types';
import { apiClient } from '@react-demo/api-client';
import { formatCurrency } from '@react-demo/utils';

// ============================================================================
// Order Service - Domain logic for order management
// ============================================================================

export interface CreateOrderDto {
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
}

export interface OrderFilters {
  userId?: string;
  status?: OrderStatus;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  pageSize?: number;
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// ============================================================================
// Order Service Class
// ============================================================================

export class OrderService {
  private baseUrl = '/orders';

  /**
   * Get all orders with optional filters
   */
  async getOrders(filters?: OrderFilters): Promise<PaginatedResponse<Order>> {
    const params = new URLSearchParams();

    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.startDate)
      params.append('startDate', filters.startDate.toISOString());
    if (filters?.endDate)
      params.append('endDate', filters.endDate.toISOString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.pageSize)
      params.append('pageSize', filters.pageSize.toString());

    const queryString = params.toString();
    const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;

    return await apiClient.get<PaginatedResponse<Order>>(url);
  }

  /**
   * Get a single order by ID
   */
  async getOrderById(id: string): Promise<Order> {
    const response = await apiClient.get<ApiResponse<Order>>(
      `${this.baseUrl}/${id}`
    );
    return response.data;
  }

  /**
   * Create a new order
   */
  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>(
      this.baseUrl,
      orderData
    );
    return response.data;
  }

  /**
   * Update order status
   */
  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const response = await apiClient.patch<ApiResponse<Order>>(
      `${this.baseUrl}/${id}/status`,
      { status }
    );
    return response.data;
  }

  /**
   * Cancel an order
   */
  async cancelOrder(id: string): Promise<Order> {
    return this.updateOrderStatus(id, OrderStatus.CANCELLED);
  }

  /**
   * Get user's order history
   */
  async getUserOrders(userId: string): Promise<Order[]> {
    const response = await this.getOrders({ userId });
    return response.data;
  }
}

// ============================================================================
// Order Calculations
// ============================================================================

export const orderCalculations = {
  /**
   * Calculate order subtotal
   */
  calculateSubtotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  /**
   * Calculate tax (10% for demo)
   */
  calculateTax(subtotal: number): number {
    return subtotal * 0.1;
  },

  /**
   * Calculate shipping cost
   */
  calculateShipping(subtotal: number): number {
    if (subtotal >= 100) return 0; // Free shipping over $100
    return 10;
  },

  /**
   * Calculate order total
   */
  calculateTotal(items: OrderItem[]): number {
    const subtotal = this.calculateSubtotal(items);
    const tax = this.calculateTax(subtotal);
    const shipping = this.calculateShipping(subtotal);
    return subtotal + tax + shipping;
  },

  /**
   * Get complete order summary
   */
  getOrderSummary(items: OrderItem[]): OrderSummary {
    const subtotal = this.calculateSubtotal(items);
    const tax = this.calculateTax(subtotal);
    const shipping = this.calculateShipping(subtotal);
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
  },
};

// ============================================================================
// Order Validation
// ============================================================================

export const orderValidation = {
  /**
   * Check if order can be cancelled
   */
  canBeCancelled(order: Order): boolean {
    return (
      order.status === OrderStatus.PENDING ||
      order.status === OrderStatus.PROCESSING
    );
  },

  /**
   * Check if order can be modified
   */
  canBeModified(order: Order): boolean {
    return order.status === OrderStatus.PENDING;
  },

  /**
   * Check if order is complete
   */
  isComplete(order: Order): boolean {
    return (
      order.status === OrderStatus.DELIVERED ||
      order.status === OrderStatus.CANCELLED
    );
  },

  /**
   * Validate order status transition
   */
  canTransitionTo(currentStatus: OrderStatus, newStatus: OrderStatus): boolean {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
      [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELLED]: [],
    };

    return validTransitions[currentStatus].includes(newStatus);
  },
};

// ============================================================================
// Order Utilities
// ============================================================================

export const orderUtils = {
  /**
   * Get order status display name
   */
  getStatusDisplayName(status: OrderStatus): string {
    const statusNames: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'Pending',
      [OrderStatus.PROCESSING]: 'Processing',
      [OrderStatus.SHIPPED]: 'Shipped',
      [OrderStatus.DELIVERED]: 'Delivered',
      [OrderStatus.CANCELLED]: 'Cancelled',
    };
    return statusNames[status];
  },

  /**
   * Get order status color for UI
   */
  getStatusColor(status: OrderStatus): string {
    const statusColors: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'yellow',
      [OrderStatus.PROCESSING]: 'blue',
      [OrderStatus.SHIPPED]: 'purple',
      [OrderStatus.DELIVERED]: 'green',
      [OrderStatus.CANCELLED]: 'red',
    };
    return statusColors[status];
  },

  /**
   * Format order total
   */
  formatOrderTotal(order: Order): string {
    return formatCurrency(order.total);
  },

  /**
   * Get order item count
   */
  getItemCount(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  /**
   * Format shipping address
   */
  formatAddress(address: Address): string {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
  },

  /**
   * Get payment method display name
   */
  getPaymentMethodDisplayName(method: PaymentMethod): string {
    const methodNames: Record<PaymentMethod, string> = {
      [PaymentMethod.CREDIT_CARD]: 'Credit Card',
      [PaymentMethod.DEBIT_CARD]: 'Debit Card',
      [PaymentMethod.PAYPAL]: 'PayPal',
      [PaymentMethod.CASH]: 'Cash on Delivery',
    };
    return methodNames[method];
  },
};

// Export singleton instance
export const orderService = new OrderService();

