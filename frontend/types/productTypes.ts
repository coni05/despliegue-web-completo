// =============================================================
// Tipos compartidos con el frontend para tipado estricto.
// =============================================================

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductDTO {
  name: string;
  description?: string;
  price: number;
  stock?: number;
}

// Respuesta genérica del backend
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}