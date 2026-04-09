// =============================================================
// Interfaz de dominio: representa un producto en la aplicación.
// Principio de Responsabilidad Única (SRP): solo define datos.
// =============================================================

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

// DTO para la creación de un producto (datos de entrada)
export interface CreateProductDTO {
  name: string;
  description?: string;
  price: number;
  stock?: number;
}