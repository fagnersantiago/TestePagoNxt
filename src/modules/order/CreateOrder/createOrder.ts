import { Order, OrderItem, product } from "../entities/Order";
import { OrderRepository } from "../repository/OrderRepository";

class CreateOrder {
  private createOrderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.createOrderRepository = orderRepository;
  }

  public createOrder(order_id: number): Order {
    const order = this.createOrderRepository.findByOrderId(order_id);
    if (order && order.status !== "OPEN") {
      throw new Error("Order already exists");
    }

    const createOrder: Order = {
      order_id,
      status: "OPEN",
      orderItems: [],
      totalAmount: 50,
    };

    this.createOrderRepository.save(createOrder);

    return createOrder;
  }
}

export { CreateOrder };
