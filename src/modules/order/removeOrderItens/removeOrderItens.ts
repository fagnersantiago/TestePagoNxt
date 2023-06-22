import { Order } from "../entities/Order";
import { OrderRepository } from "../repository/OrderRepository";
import { error } from "../../../modules/error/appError";
import { getFileName } from "../../../utils/getFileName";
import { logErrorMessage } from "../../error/messageError";
let filePath = "C:\\Users\\fagne\\Documents\\TestePagoNxt\\ORDER_FILE.json";
let fileName = getFileName(filePath);

class RemoveOrderItens {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public removeOrderItem(order_id: number, product_id: number): Order | null {
    const order = this.orderRepository.findByOrderId(order_id);
    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== "OPEN") {
      logErrorMessage(
        fileName,
        order.order_id,
        error.ORDER_ALREADY_IN_CHECKOUT
      );
      return null;
    }

    return this.orderRepository.removeOrderItemByProductId(
      order_id,
      product_id
    );
  }
}

export { RemoveOrderItens };
