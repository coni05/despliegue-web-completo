// =============================================================
// Capa de API: encapsula las llamadas HTTP al backend.
// Principio de Responsabilidad Única (SRP): solo se encarga
// de comunicación con el servidor.
// =============================================================

import { ApiResponse, Product, CreateProductDTO } from "../types/productTypes";

const BASE_URL = "/api"; // Nginx reescribe /api/* -> backend

/**
 * Obtiene todos los productos.
 * @returns {Promise<Product[]>}
 */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  const json: ApiResponse<Product[]> = await res.json();
  if (!json.success) throw new Error(json.message || "Error al obtener productos");
  return json.data;
}

/**
 * Crea un nuevo producto.
 * @param {CreateProductDTO} data
 * @returns {Promise<Product>}
 */
export async function createProduct(data: CreateProductDTO): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json: ApiResponse<Product> = await res.json();
  if (!json.success) throw new Error(json.message || "Error al crear producto");
  return json.data;
}