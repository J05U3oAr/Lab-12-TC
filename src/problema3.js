/** Transpone una matriz rectangular representada como lista de listas. */
export const transponer = matriz => {
  if (!Array.isArray(matriz) || !matriz.every(fila => Array.isArray(fila))) {
    throw new TypeError("La matriz debe ser una lista de listas.");
  }
  if (matriz.length === 0) return [];
  if (!matriz.every(fila => fila.length === matriz[0].length)) {
    throw new TypeError("Todas las filas deben tener la misma cantidad de columnas.");
  }

  // Cada columna original se convierte en una nueva fila mediante lambdas.
  return matriz[0].map((_, columna) => matriz.map(fila => fila[columna]));
};
