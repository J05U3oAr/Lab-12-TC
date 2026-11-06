import test from "node:test";
import assert from "node:assert/strict";
import { aBooleano, factorial, FALSO, NOT, sumarHasta, VERDADERO } from "../src/problema1.js";
import { ordenarPorClave } from "../src/problema2.js";
import { transponer } from "../src/problema3.js";
import { eliminarElementos } from "../src/problema4.js";
import { colores, coloresABorrar, matrizEjemplo, telefonos } from "../src/ejemplos.js";

test("problema 1: NOT cumple la tabla de verdad y la doble negación", () => {
  assert.equal(aBooleano(NOT(VERDADERO)), false);
  assert.equal(aBooleano(NOT(FALSO)), true);
  assert.equal(aBooleano(NOT(NOT(VERDADERO))), true);
});

test("problema 1: recursión, casos base y entradas inválidas", () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(5), 120);
  assert.equal(sumarHasta(0), 0);
  assert.equal(sumarHasta(5), 15);
  assert.throws(() => factorial(-1), RangeError);
  assert.throws(() => factorial(171), RangeError);
  assert.throws(() => sumarHasta(1.5), RangeError);
  assert.throws(() => sumarHasta(1001), RangeError);
});

test("problema 2: reproduce el ejemplo y no modifica la entrada", () => {
  const original = structuredClone(telefonos);
  assert.deepEqual(ordenarPorClave(telefonos, "model"), [telefonos[1], telefonos[2], telefonos[0]]);
  assert.deepEqual(telefonos, original);
});

test("problema 2: números, textos, empates estables y lista vacía", () => {
  const datos = [{ k: 10 }, { k: 2, id: "primero" }, { k: 2, id: "segundo" }];
  assert.deepEqual(ordenarPorClave(datos, "k"), [datos[1], datos[2], datos[0]]);
  assert.deepEqual(ordenarPorClave([{ k: "z" }, { k: "a" }], "k"), [{ k: "a" }, { k: "z" }]);
  assert.deepEqual(ordenarPorClave([], "k"), []);
});

test("problema 2: rechaza claves ausentes y valores incompatibles", () => {
  assert.throws(() => ordenarPorClave([{ model: 2 }, {}], "model"), TypeError);
  assert.throws(() => ordenarPorClave([{ k: "2" }, { k: 1 }], "k"), TypeError);
  assert.throws(() => ordenarPorClave([{ k: NaN }], "k"), TypeError);
  assert.throws(() => ordenarPorClave([null], "k"), TypeError);
  assert.throws(() => ordenarPorClave({}, "k"), TypeError);
  assert.throws(() => ordenarPorClave([], ""), TypeError);
});

test("problema 3: reproduce el ejemplo cuadrado", () => {
  assert.deepEqual(transponer(matrizEjemplo), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
});

test("problema 3: matriz rectangular, doble transposición e inmutabilidad", () => {
  const matriz = [[1, 2, 3], [4, 5, 6]];
  const original = structuredClone(matriz);
  const resultado = transponer(matriz);
  assert.deepEqual(resultado, [[1, 4], [2, 5], [3, 6]]);
  assert.deepEqual(transponer(resultado), original);
  resultado[0][0] = 100;
  assert.deepEqual(matriz, original);
});

test("problema 3: una fila, una columna, matrices vacías y entradas inválidas", () => {
  assert.deepEqual(transponer([[1, 2, 3]]), [[1], [2], [3]]);
  assert.deepEqual(transponer([[1], [2]]), [[1, 2]]);
  assert.deepEqual(transponer([]), []);
  assert.deepEqual(transponer([[], []]), []);
  assert.throws(() => transponer([[1, 2], [3]]), TypeError);
  assert.throws(() => transponer([1, 2]), TypeError);
  assert.throws(() => transponer(null), TypeError);
});

test("problema 4: reproduce el ejemplo e ignora elementos ausentes", () => {
  assert.deepEqual(eliminarElementos(colores, coloresABorrar), ["rojo", "verde", "azul", "gris", "negro"]);
});

test("problema 4: elimina repeticiones, distingue tipos y conserva entradas", () => {
  const lista = [1, "1", 2, 1, false, null];
  const borrar = [1, 1, null, "ausente"];
  assert.deepEqual(eliminarElementos(lista, borrar), ["1", 2, false]);
  assert.deepEqual(lista, [1, "1", 2, 1, false, null]);
  assert.deepEqual(borrar, [1, 1, null, "ausente"]);
  assert.deepEqual(eliminarElementos([], [1]), []);
  assert.deepEqual(eliminarElementos([1, 2], []), [1, 2]);
});

test("problema 4: valida listas y elementos escalares", () => {
  assert.throws(() => eliminarElementos("rojo", []), TypeError);
  assert.throws(() => eliminarElementos([], null), TypeError);
  assert.throws(() => eliminarElementos([{}], []), TypeError);
  assert.throws(() => eliminarElementos([], [Infinity]), TypeError);
});
