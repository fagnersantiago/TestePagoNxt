import path from "path";
import * as readline from "readline";
import { OrderRepository } from "./modules/order/repository/orderRepository";
import { readInputFile } from "./utils/fileUtils";
import { CreateOrder } from "./modules/order/createOrder/createOrder";
import { RemoveOrderItens } from "./modules/order/removeOrderItens/removeOrderItens";
import { CheckoutOrder } from "./modules/order/checkoutOrder/checkoutOrder";
import { AddOrderItem } from "./modules/order/addOrderItem/addOrderItem";

const orderRepository = new OrderRepository();

const createOrderService = new CreateOrder(orderRepository);
const removeOrderItems = new RemoveOrderItens(orderRepository);
const checkoutOrder = new CheckoutOrder(orderRepository);
const updateOrderItem = new AddOrderItem(orderRepository);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readInput() {
  rl.question(">", (fileName) => {
    const inputFileName = path.resolve(fileName);
    const actions: any[] = [];
    const results: any[] = [];

    readInputFile(inputFileName, (inputData: any) => {
      inputData.forEach((input: any) => {
        const { action, order_id, product_id } = input;
        actions.push(input);

        switch (action) {
          case "CREATE_ORDER":
            const createdOrder = createOrderService.createOrder(order_id);
            results.push(createdOrder);
            break;
          case "ADD_ORDER_ITEM":
            const addOrderItem = updateOrderItem.addOrderItem(
              order_id,
              product_id
            );
            results.push(addOrderItem);
            break;
          case "REMOVE_ORDER_ITEM":
            const removerItems = removeOrderItems.removeOrderItem(
              order_id,
              product_id
            );
            results.push(removerItems);
            break;
          case "CHECKOUT_ORDER":
            const checkout = checkoutOrder.checkoutOrder(order_id);
            results.push(checkout);

            break;
          default:
            break;
        }
      });

      actions.forEach((action) => {
        console.log(JSON.stringify(action));
      });

      console.log(`$ order_management_system < ${fileName}`);
      results.forEach((result) => {
        console.log(JSON.stringify(result));
      });

      rl.close();
    });
  });
}

readInput();
