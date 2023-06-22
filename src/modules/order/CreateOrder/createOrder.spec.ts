import { CreateOrder } from "./createOrder";
import { OrderRepository } from "../repository/OrderRepository";

describe("Create Order", () => {
  let createOrderService: CreateOrder;
  let orderRepository: OrderRepository;

  beforeEach(() => {
    orderRepository = new OrderRepository();
    createOrderService = new CreateOrder(orderRepository);
  });

  describe("createOrder", () => {
    it("should be create a new order", () => {
      const orderId = 1;
      const newOrder = createOrderService.createOrder(orderId);

      expect(newOrder).toEqual({
        order_id: orderId,
        status: "OPEN",
        orderItems: [],
        totalAmount: 50,
      });

      const savedOrder = orderRepository.findByOrderId(orderId);
      expect(savedOrder).toEqual(newOrder);
    });
  });
});
