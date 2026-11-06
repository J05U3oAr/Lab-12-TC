/** Ordena por una clave de texto o números, sin modificar la lista original. */
export const ordenarPorClave = (lista, clave) => {
  if (!Array.isArray(lista)) {
    throw new TypeError("La entrada debe ser una lista de diccionarios.");
  }
  if (typeof clave !== "string" || clave.length === 0) {
    throw new TypeError("La clave debe ser un texto no vacío.");
  }
  if (lista.some(elemento =>
    elemento === null || typeof elemento !== "object" ||
    Array.isArray(elemento) || !Object.hasOwn(elemento, clave)
  )) {
    throw new TypeError(`Cada diccionario debe contener la clave '${clave}'.`);
  }

  const valores = lista.map(elemento => elemento[clave]);
  if (valores.some(valor =>
    !["number", "string"].includes(typeof valor) ||
    typeof valor !== typeof valores[0] ||
    (typeof valor === "number" && !Number.isFinite(valor))
  )) {
    throw new TypeError("Los valores de la clave deben ser todos números finitos o todos textos.");
  }

  // sort recibe una lambda de comparación. Se ordena una copia de la lista.
  return [...lista].sort((a, b) =>
    a[clave] < b[clave] ? -1 : a[clave] > b[clave] ? 1 : 0,
  );
};
