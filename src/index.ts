import * as fs from "fs";
import path from "path";

// Dados do pedido
interface Order {
  order_id: number;
  status: string;
  orderItems: OrderItem[];
  totalAmount: number;
}

// Dados do item do pedido
interface OrderItem {
  product_id: number;
  quantity: number;
}

// Array para armazenar os pedidos
const orders: Order[] = [];

// Função para criar um novo pedido
function createOrder(order_id: number): Order {
  if (orders.some((order) => order.order_id === order_id)) {
    console.log("O pedido já existe.");
    return null;
  }

  const newOrder: Order = {
    order_id,
    status: "OPEN",
    orderItems: [],
    totalAmount: 0,
  };

  orders.push(newOrder);

  console.log(
    `$ order_management_system < ${fileName} ${JSON.stringify(newOrder)}`
  );

  return newOrder;
}

// Função para adicionar um produto ao pedido
function addOrderItem(order_id: number, product_id: number): Order {
  const order = orders.find((order) => order.order_id === order_id);

  if (!order) {
    console.log("O pedido não existe.");
    return null;
  }

  if (order.status !== "OPEN") {
    console.log(
      "Não é possível adicionar produtos ao pedido. O status do pedido não é OPEN."
    );

    return null;
  }

  const existingItem = order.orderItems.find(
    (item) => item.product_id === product_id
  );

  if (existingItem) {
    if (existingItem.quantity >= 5) {
      console.log(
        `$ order_management_system < ${fileName}  ${order_id}  "error": "MAX_PRODUCTS_REACHED"`
      );
      return null;
    }

    existingItem.quantity++;
  } else {
    const newItem: OrderItem = {
      product_id,
      quantity: 1,
    };

    order.orderItems.push(newItem);
  }

  console.log(
    `$ order_management_system < ${fileName} ${JSON.stringify(order)}`
  );

  return order;
}

// Função para remover um produto do pedido
function removeOrderItem(order_id: number, product_id: number): Order {
  const order = orders.find((order) => order.order_id === order_id);

  if (!order) {
    console.log("O pedido não existe.");
    return null;
  }

  if (order.status !== "OPEN") {
    console.log(
      `$ order_management_system < ${fileName}  ${order_id}  "error": "ORDER_ALREADY_IN_CHECKOUT"`
    );
    return null;
  }

  const itemIndex = order.orderItems.findIndex(
    (item) => item.product_id === product_id
  );

  if (itemIndex === -1) {
    console.log("O produto não existe no pedido.");
    return null;
  }

  const item = order.orderItems[itemIndex];

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    order.orderItems.splice(itemIndex, 1);
  }

  console.log(
    `$ order_management_system < ${fileName} ${JSON.stringify(order)}`
  );

  return order;
}

// Função para finalizar o pedido
function checkoutOrder(order_id: number): Order {
  const order = orders.find((order) => order.order_id === order_id);

  if (!order) {
    console.log("O pedido não existe.");
    return null;
  }

  if (order.orderItems.length === 0) {
    console.log(
      `$ order_management_system < ${fileName}  ${order_id}  "error"; "ORDER_IS_EMPTY" "`
    );
    return null;
  }

  order.status = "WAITING PAYMENT";
  console.log(
    `$ order_management_system < ${fileName} ${JSON.stringify(order)}`
  );

  return order;
}

// Função para processar a entrada
function processInput(input: string) {
  try {
    const { action, order_id, product_id } = JSON.parse(input);

    switch (action) {
      case "CREATE_ORDER":
        createOrder(order_id);
        break;
      case "ADD_ORDER_ITEM":
        addOrderItem(order_id, product_id);
        break;
      case "REMOVE_ORDER_ITEM":
        removeOrderItem(order_id, product_id);
        break;
      case "CHECKOUT_ORDER":
        checkoutOrder(order_id);
        break;
      default:
        console.log("Ação inválida.");
    }
  } catch (error) {
    console.log(
      "Entrada inválida. Certifique-se de que está em formato JSON válido."
    );
  }
}

// Nome do arquivo de entrada
const inputFileName = "C:\\Users\\fagne\\Documents\\TestePagoNxt\\file.json";
const fileName = path.basename(inputFileName);

// Função para ler o arquivo de entrada
function readInputFile(inputFileName: string) {
  fs.readFile(inputFileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Erro ao ler o arquivo: ${err}`);
      return;
    }

    try {
      const inputData = JSON.parse(data);
      inputData.forEach((input: any) => {
        processInput(JSON.stringify(input));
      });
    } catch (error) {
      console.log(
        "Entrada inválida. Certifique-se de que o arquivo está em formato JSON válido."
      );
    }
  });
}

console.log;
readInputFile(inputFileName);
