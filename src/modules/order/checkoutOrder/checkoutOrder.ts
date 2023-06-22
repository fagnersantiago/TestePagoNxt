import { Order } from "../entities/Order";
import { OrderRepository } from "../repository/OrderRepository";
import { error } from "../../../modules/error/appError";
import { getFileName } from "../../../utils/getFileName";
import { logErrorMessage } from "../../error/messageError";
let filePath = "C:\\Users\\fagne\\Documents\\TestePagoNxt\\ORDER_FILE.json";
let fileName = getFileName(filePath);

class CheckoutOrder {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public checkoutOrder(order_id: number): Order {
    const order = this.orderRepository.findByOrderId(order_id);

    if (order && order.orderItems.length === 0) {
      logErrorMessage(fileName, order.order_id, error.ORDER_IS_EMPTY);
    }

    order.status = "WAITING PAYMENT";

    return order;
  }
}

export { CheckoutOrder };
