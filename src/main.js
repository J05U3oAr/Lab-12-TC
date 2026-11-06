import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { aBooleano, factorial, FALSO, NOT, sumarHasta, VERDADERO } from "./problema1.js";
import { ordenarPorClave } from "./problema2.js";
import { transponer } from "./problema3.js";
import { eliminarElementos } from "./problema4.js";
import { colores, coloresABorrar, matrizEjemplo, telefonos } from "./ejemplos.js";

const mostrar = (titulo, valor) => {
  console.log(`\n${titulo}`);
  console.log(JSON.stringify(valor, null, 2));
};

const demostrarProblema1 = () => {
  console.log("\nProblema 1: booleanos de Church, recursión y ciclos");
  console.log(`NOT VERDADERO = ${aBooleano(NOT(VERDADERO))}`);
  console.log(`NOT FALSO = ${aBooleano(NOT(FALSO))}`);
  console.log(`Factorial de 5 con combinador Z = ${factorial(5)}`);
  console.log(`Suma de 1 a 5 con recursión = ${sumarHasta(5)}`);
  console.log("Explicación y reducción beta: output/pdf/problema_1.pdf");
};

const demostrarTodo = () => {
  demostrarProblema1();
  mostrar("Problema 2: lista original", telefonos);
  mostrar("Ordenada por model", ordenarPorClave(telefonos, "model"));
  mostrar("Problema 3: matriz original", matrizEjemplo);
  mostrar("Matriz transpuesta", transponer(matrizEjemplo));
  mostrar("Problema 4: lista original", colores);
  mostrar("Elementos a borrar", coloresABorrar);
  mostrar("Elementos remanentes", eliminarElementos(colores, coloresABorrar));
};

const ejecutarMenu = async () => {
  const interfaz = createInterface({ input: stdin, output: stdout });
  const leerJSON = async (mensaje, ejemplo) => {
    const texto = (await interfaz.question(`${mensaje}\nEnter usa ${JSON.stringify(ejemplo)}\n> `)).trim();
    try {
      return texto === "" ? ejemplo : JSON.parse(texto);
    } catch {
      throw new SyntaxError("JSON inválido. Escribe las cadenas entre comillas dobles.");
    }
  };

  try {
    while (true) {
      console.log("\nLaboratorio 12 · Programación funcional");
      console.log("1. Demostrar NOT, recursión y ciclos");
      console.log("2. Ordenar diccionarios por una clave");
      console.log("3. Transponer una matriz");
      console.log("4. Eliminar elementos de una lista");
      console.log("5. Ejecutar todos los ejemplos del documento");
      console.log("0. Salir");
      const opcion = (await interfaz.question("Opción: ")).trim();
      if (opcion === "0") break;

      try {
        switch (opcion) {
          case "1":
            demostrarProblema1();
            break;
          case "2": {
            const lista = await leerJSON("Lista de diccionarios en JSON:", telefonos);
            const clave = (await interfaz.question("Clave para ordenar (Enter usa model): ")).trim() || "model";
            mostrar("Lista ordenada", ordenarPorClave(lista, clave));
            break;
          }
          case "3": {
            const matriz = await leerJSON("Matriz en JSON:", matrizEjemplo);
            mostrar("Matriz transpuesta", transponer(matriz));
            break;
          }
          case "4": {
            const lista = await leerJSON("Lista original en JSON:", colores);
            const borrar = await leerJSON("Elementos a borrar en JSON:", coloresABorrar);
            mostrar("Elementos remanentes", eliminarElementos(lista, borrar));
            break;
          }
          case "5":
            demostrarTodo();
            break;
          default:
            console.log("Elige una opción entre 0 y 5.");
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }
  } finally {
    interfaz.close();
  }
};

const argumentos = process.argv.slice(2);
if (argumentos.length === 0) {
  try {
    await ejecutarMenu();
  } catch (error) {
    if (error.code !== "ABORT_ERR" && error.code !== "ERR_USE_AFTER_CLOSE") {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }
  }
} else if (argumentos.length === 1 && argumentos[0] === "--demo") {
  demostrarTodo();
} else {
  console.error("Uso: node src/main.js [--demo]");
  process.exitCode = 1;
}
