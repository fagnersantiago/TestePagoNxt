import { OrderItem } from "../entities/Order";
import { OrderRepository } from "../repository/orderRepository";
import { error } from "../../error/appError";
import { getProductPrice } from "../../../utils/getProductPrice";

class AddOrderItem {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public addOrderItem(order_id: number, product_id: number) {
    const order = this.orderRepository.findByOrderId(order_id);

    if (!order) {
      throw new Error("ORDER_NOT_FOUND");
    }

    if (order.status !== "OPEN") {
      throw new Error("ORDER_STATUS_IS_NOT_FOUND");
    }

    const existingItem = order.orderItems.find(
      (item) => item.product_id === product_id
    );

    if (existingItem && existingItem.quantity >= 5) {
      return {
        order_id: order.order_id,
        error: error.MAX_PRODUCTS_REACHED,
      };
    }

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const addItem: OrderItem = {
        product_id: product_id,
        quantity: 1,
      };
      order.orderItems.push(addItem);
    }

    const totalAmount = order.orderItems.reduce(
      (sum, item) => sum + getProductPrice(item.product_id) * item.quantity,
      0
    );

    order.totalAmount = totalAmount;

    return order;
  }
}

export { AddOrderItem };
