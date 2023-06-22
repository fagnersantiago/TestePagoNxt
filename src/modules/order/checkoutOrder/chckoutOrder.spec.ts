import { CheckoutOrder } from "./checkoutOrder";
import { OrderRepository } from "../repository/OrderRepository";

describe("OrderService", () => {
  let orderService: CheckoutOrder;
  let orderRepository: OrderRepository;

  beforeEach(() => {
    orderRepository = new OrderRepository();
    orderService = new CheckoutOrder(orderRepository);
  });

  describe("checkoutOrder", () => {
    it("should update the order status to 'WAITING PAYMENT'", () => {
      const orderId = 1;
      const order = {
        order_id: orderId,
        status: "OPEN",
        orderItems: [{ product_id: 1, quantity: 2 }],
        totalAmount: 50,
      };
      orderRepository.save(order);

      const result = orderService.checkoutOrder(orderId);
      expect(result.status).toBe("WAITING PAYMENT");
    });
  });
});
