import { product } from "../modules/order/entities/Products";

export function getProductPrice(product_id: number): number {
  const productItem = product.find((item) => item.id === product_id);
  if (productItem) {
    return productItem.price;
  }
  return 0; // Retornar 0 se o product_id não for encontrado
}
