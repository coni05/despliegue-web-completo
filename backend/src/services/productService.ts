import { ProductRepository } from "../repositories/productRepository";
import { Product, CreateProductDTO } from "../types/productTypes";

export class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async getAllProducts(): Promise<Product[]> {
    return this.repository.findAll();
  }

  async createProduct(data: CreateProductDTO): Promise<Product> {
    // Validaciones
    if (!data.name || data.name.trim().length === 0) {
      throw new Error("El nombre del producto es obligatorio.");
    }

    if (data.price == null || data.price < 0) {
      throw new Error("El precio debe ser un número mayor o igual a 0.");
    }

    if (data.stock != null && data.stock < 0) {
      throw new Error("El stock no puede ser negativo.");
    }

    return this.repository.create({
      name: data.name.trim(),
      description: data.description?.trim() || null,
      price: data.price,
      stock: data.stock ?? 0,
    });
  }
}