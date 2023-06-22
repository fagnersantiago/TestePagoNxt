export type ErrorType = {
  MAX_PRODUCTS_REACHED: string;
  ORDER_ALREADY_IN_CHECKOUT: string;
  ORDER_IS_EMPTY: string;
};

export const error: ErrorType = {
  MAX_PRODUCTS_REACHED: "MAX_PRODUCTS_REACHED",
  ORDER_ALREADY_IN_CHECKOUT: " ORDER_ALREADY_IN_CHECKOUT",
  ORDER_IS_EMPTY: "ORDER_IS_EMPTY",
};

export function handleError(order_id: number, error: any) {
  const handleError = Object.assign({
    order_id: order_id,
    error: error,
  });
  return handleError;
}
