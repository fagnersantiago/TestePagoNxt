import { OrderRepository } from "../repository/orderRepository";
import { error } from "../../../shared/error/appError";
import { getFileName } from "../../../shared/utils/getFileName";

class CheckoutOrder {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public checkoutOrder(order_id: number) {
    const order = this.orderRepository.findByOrderId(order_id);

    if (order && order.orderItems.length === 0) {
      return {
        order_id: order.order_id,
        error: error.ORDER_IS_EMPTY,
      };
    }

    order.status = "WAITING PAYMENT";

    return order;
  }
}

export { CheckoutOrder };
