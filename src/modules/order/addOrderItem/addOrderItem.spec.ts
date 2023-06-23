import { AddOrderItem } from "./addOrderItem";
import { OrderRepository } from "../repository/orderRepository";
import { error } from "../../error/appError";

const products = [
  { id: 1, price: 500 },
  { id: 2, price: 400 },
  { id: 3, price: 200 },
];

function getProductPrice(product_id: number): number {
  const productItem = products.find((item) => item.id === product_id);
  if (productItem) {
    return productItem.price;
  }
  return 0; // Retornar 0 se o product_id não for encontrado
}

describe("UpdateOrderItem", () => {
  let orderService: AddOrderItem;
  let orderRepository: OrderRepository;

  beforeEach(() => {
    orderRepository = new OrderRepository();
    orderService = new AddOrderItem(orderRepository);
  });

  it("should add a new order item", () => {
    const orderId = 1;
    const productId = 1;

    const order = {
      order_id: orderId,
      status: "OPEN",
      orderItems: [],
      totalAmount: 0,
    };

    orderRepository.save(order);

    let result;
    try {
      result = orderService.addOrderItem(orderId, productId);
    } catch (error) {}

    expect(result.orderItems.length).toBe(1);
    expect(result.orderItems[0]).toEqual({
      product_id: productId,
      quantity: 1,
    });
    expect(result.totalAmount).toBe(getProductPrice(productId));
  });

  it("should increment the quantity of an existing order item", () => {
    const orderId = 1;
    const productId = 1;

    const order = {
      order_id: orderId,
      status: "OPEN",
      orderItems: [{ product_id: productId, quantity: 1 }],
      totalAmount: getProductPrice(productId) * 5,
    };

    orderRepository.save(order);

    let result;
    try {
      result = orderService.addOrderItem(orderId, productId);
    } catch (error) {
      console.log(error);
    }

    expect(result.orderItems.length).toBe(1);
    expect(result.orderItems[0]).toEqual({
      product_id: productId,
      quantity: 2,
    });
    expect(result.totalAmount).toBe(getProductPrice(productId) * 2);
  });

  it("should throw an error if the order is not found", () => {
    const orderId = 1;
    const productId = 1;

    expect(() => {
      orderService.addOrderItem(orderId, productId);
    }).toThrow("ORDER_NOT_FOUND");
  });

  it("should throw an error if the order status is not 'OPEN'", () => {
    const orderId = 1;
    const productId = 1;

    const order = {
      order_id: orderId,
      status: "CHECKOUT",
      orderItems: [],
      totalAmount: 0,
    };

    orderRepository.save(order);

    const result = orderService.addOrderItem(orderId, productId);

    expect(result).toEqual({
      order_id: order.order_id,
      error: error.ORDER_IS_NOT_OPEN,
    });
  });

  it("should not be exceeding the maximum quantity of the same product", () => {
    const orderId = 1;
    const productId = 1;

    const order = {
      order_id: orderId,
      status: "OPEN",
      orderItems: [{ product_id: productId, quantity: 5 }],
      totalAmount: getProductPrice(productId) * 5,
    };

    orderRepository.save(order);

    const result = orderService.addOrderItem(order.order_id, productId);

    expect(result).toEqual({
      order_id: order.order_id,
      error: error.MAX_PRODUCTS_REACHED,
    });
  });
});
