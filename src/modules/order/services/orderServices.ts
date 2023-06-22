import { Order, OrderItem, product } from "../entities/Order";
import { OrderRepository } from "../repository/OrderRepository";
import { error } from "../../../modules/error/appError";
import { getFileName } from "../../../utils/getFileName";
import { logErrorMessage } from "../../error/messageError";
let filePath = "C:\\Users\\fagne\\Documents\\TestePagoNxt\\ORDER_FILE.json";
let fileName = getFileName(filePath);

class OrderService {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public createOrder(order_id: number): Order {
    const order = this.orderRepository.findByOrderId(order_id);
    if (order && order.status !== "OPEN") {
      throw new Error("Order already exists");
    }

    const createOrder: Order = {
      order_id,
      status: "OPEN",
      orderItems: [],
      totalAmount: 50,
    };

    this.orderRepository.save(createOrder);

    return createOrder;
  }

  public addOrderItem(order_id: number, product_id: number): Order | null {
    const order = this.orderRepository.findByOrderId(order_id);

    if (!order) {
      throw new Error("Order not exists");
    }

    if (order.status !== "OPEN") {
      throw new Error(
        "Unable to add products to order. Order status is not OPEN"
      );
    }

    const existingItem = order.orderItems.find(
      (item) => item.product_id === product_id
    );
    if (existingItem) {
      if (existingItem.quantity >= 5) {
        logErrorMessage(fileName, order.order_id, error.MAX_PRODUCTS_REACHED);
        return null;
      }

      existingItem.quantity++;
    } else {
      const newItem: OrderItem = {
        product_id,
        quantity: 1,
      };
      order.orderItems.push(newItem);
    }

    return;
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

  public checkoutOrder(order_id: number): Order {
    const order = this.orderRepository.findByOrderId(order_id);

    if (order && order.orderItems.length === 0) {
      logErrorMessage(fileName, order.order_id, error.ORDER_IS_EMPTY);
    }

    order.status = "WAITING PAYMENT";

    return order;
  }
}

export { OrderService };
