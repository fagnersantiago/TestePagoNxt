import { Order } from "../entities/Order";

class OrderRepository {
  private orders: Order[] = [];

  public findByOrderId(order_id: number): Order | undefined {
    return this.orders.find((order) => order.order_id === order_id);
  }

  public save(order: Order): void {
    this.orders.push(order);
  }
}

export { OrderRepository };
