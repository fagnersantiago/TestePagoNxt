export type ErrorType = {
  MAX_PRODUCTS_REACHED: string;
  ORDER_ALREADY_IN_CHECKOUT: string;
  ORDER_IS_EMPTY: string;
};

export function handleError(order_id: number, error: any) {
  const handleError = Object.assign({
    order_id: order_id,
    error: error,
  });
  return handleError;
}
