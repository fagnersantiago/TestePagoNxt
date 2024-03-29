## Teste PagoNtx

Este repositório contém o teste PagoNtx, que consiste em um sistema de gerenciamento de pedidos capaz de realizar operações de criar pedido, adicionar produtos ao pedido, remover produtos do pedido e finalizar pedido.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Jest

## Executando o Programa

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode encontrá-lo em: [https://nodejs.org](https://nodejs.org)
2. Clone este repositório para o seu ambiente local.
3. Abra o terminal e navegue até o diretório do projeto.
4. Instale as dependências do projeto executando o seguinte comando:

yarn install

5. Execute o programa com o seguinte comando:

yarn dev

Isso iniciará o programa.

## Exemplo de Uso

No termianal digite o nome do arquivo. EX: ADD_ORDERS.json

{"action": "CREATE_ORDER", "order_id": 1}
{"action":"ADD_ORDER_ITEM","order_id":1,"product_id":1}

vale ressaltar que o arquivo é no formato JSON

## Executando os Teste

5. Execute os testes com o seguinte comando:

yarn test

Isso iniciará a execução dos testes e você verá os resultados no terminal.
