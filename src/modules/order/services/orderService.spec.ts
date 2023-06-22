import { OrderService } from "./orderServices";
import { OrderRepository } from "../repository/OrderRepository";

describe("OrderService", () => {
  let orderService: OrderService;
  let orderRepository: OrderRepository;

  beforeEach(() => {
    orderRepository = new OrderRepository();
    orderService = new OrderService(orderRepository);
  });

  describe("createOrder", () => {
    it("should be create a new order", () => {
      const orderId = 1;
      const newOrder = orderService.createOrder(orderId);

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

  describe("addOrderItem", () => {
    it("should be add a new ordemItem", () => {
      const orderId = 1;
      const productId = 1;

      const existingOrder = {
        order_id: orderId,
        status: "OPEN",
        orderItems: [],
        totalAmount: 0,
      };
      orderRepository.save(existingOrder);

      const updatedOrder = orderService.addOrderItem(orderId, productId);

      expect(updatedOrder).not.toBeNull();
      expect(updatedOrder!.orderItems.length).toBe(1);
      expect(updatedOrder!.orderItems[0]).toEqual({
        product_id: productId,
        quantity: 1,
      });
    });
  });

  describe("removeOrderItem", () => {
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
});
