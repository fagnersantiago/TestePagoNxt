import * as fs from "fs";

function readInputFile(
  inputFileName: string,
  callback: (inputData: any) => void
): void {
  fs.readFile(inputFileName, "utf8", (err, data) => {
    if (err) {
      console.error(`Erro ao ler o arquivo: ${err}`);
      return;
    }

    try {
      const inputData = JSON.parse(data);
      callback(inputData);
    } catch (error) {
      console.log(error);
      console.log(
        "Entrada inválida. Certifique-se de que o arquivo está em formato JSON válido."
      );
    }
  });
}

export { readInputFile };
