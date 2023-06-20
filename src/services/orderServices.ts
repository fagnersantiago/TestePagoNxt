import { Order, OrderItem } from "../entities/Order";
import { OrderRepository } from "../repository/OrderRepository";
import path from "path";
import { handleError, ErrorType } from "../utils/errorTypes";

const error: ErrorType = {
  MAX_PRODUCTS_REACHED: "MAX_PRODUCTS_REACHED",
  ORDER_ALREADY_IN_CHECKOUT: " ORDER_ALREADY_IN_CHECKOUT",
  ORDER_IS_EMPTY: "ORDER_IS_EMPTY",
};

let fileName = path.basename(
  "C:\\Users\\fagne\\Documents\\TestePagoNxt\\ORDER_FILE.json"
);

class OrderService {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public createOrder(order_id: number): Order | null {
    const existingOrder = this.orderRepository.findByOrderId(order_id);
    if (existingOrder) {
      console.log("O pedido já existe.");
      return null;
    }

    const newOrder: Order = {
      order_id,
      status: "OPEN",
      orderItems: [],
      totalAmount: 0,
    };

    this.orderRepository.save(newOrder);

    console.log(
      `$ order_management_system < ${fileName} \n ${JSON.stringify(newOrder)}`
    );

    return newOrder;
  }

  public addOrderItem(order_id: number, product_id: number): Order | null {
    const order = this.orderRepository.findByOrderId(order_id);

    if (!order) {
      console.log("O pedido não existe.");
      return null;
    }

    if (order.status !== "OPEN") {
      console.log(
        "Não é possível adicionar produtos ao pedido. O status do pedido não é OPEN."
      );
      return null;
    }

    const existingItem = order.orderItems.find(
      (item) => item.product_id === product_id
    );

    if (existingItem) {
      if (existingItem.quantity >= 5) {
        console.log(
          `$ order_management_system < ${fileName} \n ${JSON.stringify(
            handleError(order.order_id, error.MAX_PRODUCTS_REACHED)
          )}`
        );
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

    console.log(
      `$ order_management_system <${fileName} \n ${JSON.stringify(order)}`
    );

    return order;
  }

  public removeOrderItem(order_id: number, product_id: number): Order | null {
    const order = this.orderRepository.findByOrderId(order_id);
    if (!order) {
      console.log("O pedido não existe.");
      return null;
    }

    if (order.status !== "OPEN") {
      console.log(
        `$ order_management_system < ${fileName} \n ${JSON.stringify(
          handleError(order.order_id, error.ORDER_ALREADY_IN_CHECKOUT)
        )}`
      );
      return null;
    }

    const itemIndex = order.orderItems.findIndex(
      (item) => item.product_id === product_id
    );
    if (itemIndex === -1) {
      console.log("O produto não existe no pedido.");
      return null;
    }

    const item = order.orderItems[itemIndex];
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      order.orderItems.splice(itemIndex, 1);
    }

    console.log(
      `$ order_management_system < ${fileName} \n ${JSON.stringify(order)}`
    );

    return order;
  }

  public checkoutOrder(order_id: number): Order | null {
    const order = this.orderRepository.findByOrderId(order_id);
    if (!order) {
      console.log("O pedido não existe.");
      return null;
    }

    if (order.orderItems.length === 0) {
      console.log(
        `$ order_management_system < ${fileName} \n ${JSON.stringify(
          handleError(order.order_id, error.MAX_PRODUCTS_REACHED)
        )}`
      );
      return null;
    }

    order.status = "WAITING PAYMENT";
    console.log(
      `$ order_management_system <${fileName} \n ${JSON.stringify(order)}`
    );

    return order;
  }
}

export { OrderService };
