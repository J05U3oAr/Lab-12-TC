/** Elimina todas las apariciones indicadas y conserva el orden restante. */
export const eliminarElementos = (lista, elementosABorrar) => {
  if (!Array.isArray(lista) || !Array.isArray(elementosABorrar)) {
    throw new TypeError("La lista original y los elementos a borrar deben ser listas.");
  }
  const esEscalar = valor =>
    valor === null || typeof valor === "string" || typeof valor === "boolean" ||
    (typeof valor === "number" && Number.isFinite(valor));
  if (!lista.every(esEscalar) || !elementosABorrar.every(esEscalar)) {
    throw new TypeError("Los elementos deben ser textos, números finitos, booleanos o null.");
  }

  const porBorrar = new Set(elementosABorrar);
  // filter recibe una lambda; Set permite consultar los elementos a eliminar.
  return lista.filter(elemento => !porBorrar.has(elemento));
};
