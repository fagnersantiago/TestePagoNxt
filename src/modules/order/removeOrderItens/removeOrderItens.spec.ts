import { RemoveOrderItens } from "./removeOrderItens";
import { OrderRepository } from "../repository/OrderRepository";
import { UpdateOrderItem } from "../updateOrderItem/updateOrderItem";

describe("OrderService", () => {
  let orderService: RemoveOrderItens;
  let orderRepository: OrderRepository;
  let updateOrderService: UpdateOrderItem;
  beforeEach(() => {
    orderRepository = new OrderRepository();
    orderService = new RemoveOrderItens(orderRepository);
    updateOrderService = new UpdateOrderItem(orderRepository);
  });
  it("should remove the order item", () => {
    const orderId = 1;
    const productId = 1;

    const order = {
      order_id: orderId,
      status: "OPEN",
      orderItems: [{ product_id: 1, quantity: 2 }],
      totalAmount: 100,
    };

    orderRepository.save(order);

    const result = orderService.removeOrderItem(orderId, productId);

    expect(result).toEqual({
      order_id: orderId,
      status: "OPEN",
      orderItems: [{ product_id: 1, quantity: 1 }],
      totalAmount: 100,
    });
  });

  it("should throw an error if the order is not found", () => {
    const orderId = 1;
    const productId = 1;

    expect(() => {
      orderService.removeOrderItem(orderId, productId);
    }).toThrow("Order not found");
  });

  it("should log an error and return null if the order is not in 'OPEN' status", () => {
    const orderId = 1;
    const productId = 1;

    const order = {
      order_id: orderId,
      status: "CHECKOUT_ORDER",
      orderItems: [{ product_id: 1, quantity: 2 }],
      totalAmount: 50,
    };

    orderRepository.save(order);

    const result = orderService.removeOrderItem(orderId, productId);

    expect(result).toBeNull();
  });
});
