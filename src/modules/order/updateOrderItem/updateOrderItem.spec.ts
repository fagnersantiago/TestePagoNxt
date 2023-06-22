import { UpdateOrderItem } from "./updateOrderItem";
import { OrderRepository } from "../repository/OrderRepository";

describe("OrderService", () => {
  let orderService: UpdateOrderItem;
  let orderRepository: OrderRepository;

  beforeEach(() => {
    orderRepository = new OrderRepository();
    orderService = new UpdateOrderItem(orderRepository);
  });
  describe("addOrderItem", () => {
    it("should be add a new ordemItem", () => {
      const order_id = 1;
      const product_id = 1;

      const existingOrder = {
        order_id: order_id,
        status: "OPEN",
        orderItems: [],
        totalAmount: 200,
      };
      orderRepository.save(existingOrder);

      const updatedOrder = orderService.addOrderItem(order_id, product_id);
      console.log("AQUI", updatedOrder);
      expect(updatedOrder).not.toBeNull();
      expect(updatedOrder!.orderItems.length).toBe(1);
      expect(updatedOrder!.orderItems[0]).toEqual({
        product_id: product_id,
        quantity: 1,
      });
    });
  });
});
