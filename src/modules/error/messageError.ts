import { handleError } from "./appError";

export function logErrorMessage(
  fileName,
  order_id: number,
  error: string
): void {
  const errorMessage = `$ order_management_system < ${fileName} \n ${JSON.stringify(
    handleError(order_id, error)
  )}`;
  console.log(errorMessage);
}
