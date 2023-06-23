import { RemoveOrderItens } from "./removeOrderItens";
import { OrderRepository } from "../repository/orderRepository";
import { error } from "../../../modules/error/appError";

const products = [{ id: 1, price: 500 }];

function getProductPrice(product_id: number): number {
  const productItem = products.find((item) => item.id === product_id);
  if (productItem) {
    return productItem.price;
  }
  return 0;
}

describe("RemoveOrderItems", () => {
  let orderService: RemoveOrderItens;
  let orderRepository: OrderRepository;

  beforeEach(() => {
    orderRepository = new OrderRepository();
    orderService = new RemoveOrderItens(orderRepository);
  });

  it("should remove an item", () => {
    const orderId = 1;
    const productId = 1;

    const order = {
      order_id: orderId,
      status: "OPEN",
      orderItems: [],
      totalAmount: 0,
    };

    orderRepository.save(order);

    const removed = orderService.removeOrderItem(orderId, productId);

    expect(removed).toBe(removed);
  });

  it("should not remove product of order if status is not OPEN", () => {
    const orderId = 1;
    const productId = 1;

    const order = {
      order_id: orderId,
      status: "CHECKOUT_ORDER",
      orderItems: [{ product_id: productId, quantity: 1 }],
      totalAmount: getProductPrice(productId) * 1,
    };

    orderRepository.save(order);

    const removed = orderService.removeOrderItem(order.order_id, productId);

    expect(removed).toEqual({
      order_id: order.order_id,
      error: error.ORDER_ALREADY_IN_CHECKOUT,
    });
  });
});
