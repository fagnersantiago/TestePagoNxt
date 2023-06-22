import path from "path";
import * as readline from "readline";
// import { OrderService } from "../modules/order/services/orderServices";
import { OrderRepository } from "./modules/order/repository/OrderRepository";
import { readInputFile } from "./utils/fileUtils";
import { CreateOrder } from "./modules/order/CreateOrder/createOrder";
import { RemoveOrderItens } from "./modules/order/removeOrderItens/removeOrderItens";
import { CheckoutOrder } from "./modules/order/checkoutOrder/checkoutOrder";
import { UpdateOrderItem } from "./modules/order/updateOrderItem/updateOrderItem";
const inputFileName =
  "C:\\Users\\fagne\\Documents\\TestePagoNxt\\ORDER_FILE.json";
const fileName = path.basename(inputFileName);

const orderRepository = new OrderRepository();
// const orderService = new OrderService(orderRepository);
const createOrderService = new CreateOrder(orderRepository);
const removeOrderItens = new RemoveOrderItens(orderRepository);
const checkoutOrder = new CheckoutOrder(orderRepository);
const updatedOrder = new UpdateOrderItem(orderRepository);

readInputFile(fileName, (inputData: any) => {
  inputData.forEach((input: any) => {
    const { action, order_id, product_id } = input;

    const inputDataString = JSON.stringify(input);
    console.log(` ${inputDataString}`);
    switch (action) {
      case "CREATE_ORDER":
        createOrderService.createOrder(order_id);
        break;
      case "ADD_ORDER_ITEM":
        updatedOrder.addOrderItem(order_id, product_id);
        break;
      case "REMOVE_ORDER_ITEM":
        removeOrderItens.removeOrderItem(order_id, product_id);
        break;
      case "CHECKOUT_ORDER":
        checkoutOrder.checkoutOrder(order_id);
        break;
      default:
        console.log("Ação inválida.");
    }
  });
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readInput() {
  rl.question(`${fileName} \n`, (input) => {
    if (input === "exit") {
      rl.close();
    } else {
      const inputData = JSON.parse(input);
      readInputFile(fileName, inputData);
    }
  });
}

readInput();
