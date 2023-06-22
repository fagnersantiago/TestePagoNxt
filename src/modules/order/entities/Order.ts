import { product } from "./Products";

interface Order {
  order_id: number;
  status: string;
  orderItems: OrderItem[];
  totalAmount: number;
}

interface OrderItem {
  product_id: number;
  quantity: number;
}

export { Order, OrderItem, product };
