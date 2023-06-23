import { OrderRepository } from "../repository/orderRepository";
import { error } from "../../../modules/error/appError";

class RemoveOrderItens {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public removeOrderItem(order_id: number, product_id: number) {
    const order = this.orderRepository.findByOrderId(order_id);

    if (order.status !== "OPEN") {
      return {
        order_id: order.order_id,
        error: error.ORDER_ALREADY_IN_CHECKOUT,
      };
    }

    return this.orderRepository.removeOrderItemByProductId(
      order_id,
      product_id
    );
  }
}

export { RemoveOrderItens };
