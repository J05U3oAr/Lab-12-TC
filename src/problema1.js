// Booleanos de Church: cada booleano selecciona uno de dos argumentos.
export const VERDADERO = a => b => a;
export const FALSO = a => b => b;
export const NOT = p => p(FALSO)(VERDADERO);
export const aBooleano = p => p(true)(false);

// Combinador Z: retrasa la autoaplicación para la evaluación estricta de JS.
export const puntoFijo = f =>
  (x => f((...args) => x(x)(...args)))(
    x => f((...args) => x(x)(...args)),
  );

const factorialRecursivo = puntoFijo(recurrir => n =>
  n === 0 ? 1 : n * recurrir(n - 1),
);

export const factorial = n => {
  if (!Number.isInteger(n) || n < 0 || n > 170) {
    throw new RangeError("El factorial requiere un entero entre 0 y 170.");
  }
  return factorialRecursivo(n);
};

// Reemplaza un ciclo con estado mutable por llamadas con un nuevo estado.
export const sumarHasta = n => {
  if (!Number.isSafeInteger(n) || n < 0 || n > 1000) {
    throw new RangeError("La suma requiere un entero entre 0 y 1000.");
  }
  const acumular = (actual, total) =>
    actual > n ? total : acumular(actual + 1, total + actual);
  return acumular(1, 0);
};
