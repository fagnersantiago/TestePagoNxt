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
    it("deve criar um novo pedido", () => {
      const orderId = 1;
      const newOrder = orderService.createOrder(orderId);

      expect(newOrder).toEqual({
        order_id: orderId,
        status: "OPEN",
        orderItems: [],
        totalAmount: 0,
      });

      const savedOrder = orderRepository.findByOrderId(orderId);
      expect(savedOrder).toEqual(newOrder);
    });

    it("deve retornar null se o pedido já existe", () => {
      const orderId = 1;

      // Criar um pedido de exemplo manualmente no repositório
      const existingOrder = {
        order_id: orderId,
        status: "OPEN",
        orderItems: [],
        totalAmount: 0,
      };
      orderRepository.save(existingOrder);

      const newOrder = orderService.createOrder(orderId);

      expect(newOrder).toBeNull();
    });
  });

  describe("addOrderItem", () => {
    it("deve adicionar um item ao pedido existente", () => {
      const orderId = 1;
      const productId = 1;

      // Criar um pedido de exemplo manualmente no repositório
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

    it("deve retornar null se o pedido não existe", () => {
      const orderId = 1;
      const productId = 1;

      const updatedOrder = orderService.addOrderItem(orderId, productId);

      expect(updatedOrder).toBeNull();
    });
  });
});
