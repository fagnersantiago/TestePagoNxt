import { Order } from "../entities/Order";

class OrderRepository {
  private orders: Order[] = [];

  public findByOrderId(order_id: number): Order | undefined {
    return this.orders.find((order) => order.order_id === order_id);
  }

  public save(order: Order) {
    return this.orders.push(order);
  }

  public removeOrderItemByProductId(
    order_id: number,
    product_id: number
  ): Order | null {
    const order = this.findByOrderId(order_id);

    if (!order) {
      throw new Error("Order not found");
    }

    const itemIndex = order.orderItems.findIndex(
      (item) => item.product_id === product_id
    );

    if (itemIndex !== -1) {
      const item = order.orderItems[itemIndex];

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        order.orderItems.splice(itemIndex, 1);
      }

      return order;
    }
  }
}

export { OrderRepository };
