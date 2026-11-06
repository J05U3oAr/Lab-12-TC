# Laboratorio 12 · Teoría de la Computación

Solución en **JavaScript (Node.js)**, un lenguaje que permite programación funcional. Se usan funciones flecha (`=>`) como funciones lambda, funciones de orden superior y resultados nuevos sin modificar las listas de entrada. No se requieren paquetes externos.

## Ejecución

Requisito: Node.js 20 o posterior. Desde esta carpeta:

```sh
node src/main.js
```

El menú permite ejecutar cada problema con los ejemplos del documento o ingresar datos propios. En los campos de datos, presiona Enter para utilizar el ejemplo. Para ingresar listas propias, utiliza JSON con comillas dobles:

```json
[{"make":"Nokia","model":216},{"make":"Samsung","model":7}]
```

Para ejecutar todos los ejemplos sin interacción:

```sh
node src/main.js --demo
```

Para ejecutar las pruebas:

```sh
node --test
```

También están disponibles `npm start`, `npm run demo` y `npm test`. No hace falta ejecutar `npm install`. Si PowerShell bloquea `npm.ps1`, puedes usar `npm.cmd` o los comandos directos con `node` anteriores.

## Organización

```text
Lab_12/
├── src/
│   ├── main.js             Menú y demostración completa
│   ├── ejemplos.js         Datos del enunciado
│   ├── problema1.js        NOT de Church, factorial y suma recursiva
│   ├── problema2.js        Ordenar diccionarios por clave
│   ├── problema3.js        Transponer una matriz
│   └── problema4.js        Eliminar elementos de una lista
├── respuestas/
│   ├── problema_1.md       Fuente editable de las respuestas
│   └── guion_video.md      Guía para grabar la demostración
├── output/pdf/
│   └── problema_1.pdf      Respuestas teóricas para entregar
├── tests/
│   └── problemas.test.js   Pruebas de ejemplos y casos límite
└── package.json
```

## Problema 1: cálculo lambda y programación funcional

Las respuestas completas están en [output/pdf/problema_1.pdf](output/pdf/problema_1.pdf). Incluyen las dos reducciones de NOT (verdadero y falso), la recursión mediante puntos fijos, la representación de ciclos y ejemplos de cuándo conviene este paradigma.

La opción 1 del menú demuestra booleanos de Church, el factorial con el combinador Z y una suma recursiva:

```text
NOT VERDADERO = false
NOT FALSO = true
Factorial de 5 con combinador Z = 120
Suma de 1 a 5 con recursión = 15
```

En JavaScript, `a => b => a` representa `λa.λb.a`. Los ejemplos de factorial y suma utilizan números nativos de JavaScript. El factorial admite enteros de 0 a 170 para evitar resultados infinitos; los resultados grandes están sujetos a la precisión de `Number`. La suma admite enteros de 0 a 1000 para acotar la profundidad recursiva. Son demostraciones didácticas; JavaScript no garantiza optimización de llamadas de cola en Node.js.

## Problema 2: ordenar diccionarios por una clave

Función: `ordenarPorClave(lista, clave)` en [src/problema2.js](src/problema2.js).

Los diccionarios se representan mediante objetos de JavaScript. La lambda de comparación pasada a `sort` compara la clave indicada; se ordena una copia para conservar la lista original.

```js
return [...lista].sort((a, b) =>
  a[clave] < b[clave] ? -1 : a[clave] > b[clave] ? 1 : 0,
);
```

El ejemplo ordenado por `model` devuelve:

```json
[
  {"make":"Mi Max","model":2,"color":"Gold"},
  {"make":"Samsung","model":7,"color":"Blue"},
  {"make":"Nokia","model":216,"color":"Black"}
]
```

El orden es ascendente. Todas las entradas deben contener la clave, con valores del mismo tipo: números finitos o textos. Los textos siguen la comparación lexicográfica de JavaScript, sensible a mayúsculas y acentos, sin ordenación lingüística regional. Los empates conservan el orden original. Una lista vacía devuelve `[]`.

## Problema 3: matriz transpuesta

Función: `transponer(matriz)` en [src/problema3.js](src/problema3.js).

La primera lambda recorre las columnas; la segunda extrae un elemento de cada fila. Las columnas pasan a ser filas y la salida también es una lista de listas.

```js
return matriz[0].map((_, columna) => matriz.map(fila => fila[columna]));
```

```text
Entrada: [[1,2,3],[4,5,6],[7,8,9]]
Salida:  [[1,4,7],[2,5,8],[3,6,9]]
```

También admite matrices rectangulares. Si las filas tienen diferentes longitudes, se informa un error. `[]` y matrices sin columnas, como `[[],[]]`, devuelven `[]`; este formato no conserva la dimensión de una matriz sin columnas.

## Problema 4: eliminar elementos

Función: `eliminarElementos(lista, elementosABorrar)` en [src/problema4.js](src/problema4.js).

Se construye un conjunto con los elementos a eliminar y se usa una lambda como predicado de `filter`:

```js
const porBorrar = new Set(elementosABorrar);
return lista.filter(elemento => !porBorrar.has(elemento));
```

```text
Entrada:  ["rojo","verde","azul","amarillo","gris","blanco","negro"]
Borrar:   ["amarillo","cafe","blanco"]
Salida:   ["rojo","verde","azul","gris","negro"]
```

Se eliminan todas las apariciones de los elementos indicados. Los elementos ausentes se ignoran y se conserva el orden restante. Se admiten textos, números finitos, booleanos y `null`. Se distinguen los tipos: borrar `1` no borra `"1"`. El texto debe coincidir exactamente; `"cafe"` y `"café"` son diferentes.

## Validación

Las 11 pruebas comprueban los ejemplos del documento, casos base de recursión, claves ausentes, orden estable, tipos incompatibles, matrices rectangulares, doble transposición, entradas vacías, elementos repetidos e inmutabilidad de los datos originales.

## Entrega y video

El enunciado pide un repositorio de GitHub y un video no listado de YouTube de no más de 10 minutos.

[Ver video de demostración](https://youtu.be/pKkW9nrStJg)

Puedes seguir [el guion sugerido](respuestas/guion_video.md). El documento menciona el ejercicio 1 para el video; el guion empieza con ese apartado e incluye una ejecución breve de los otros programas.
