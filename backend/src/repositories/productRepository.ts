// =============================================================
// Repositorio: capa de acceso a datos.
// Principio de Inversión de Dependencias (DIP): no depende de
// detalles de implementación directa de MySQL, solo de la interfaz.
// =============================================================

import pool from "../config/database";
import { Product, CreateProductDTO } from "../types/productTypes";

export class ProductRepository {
  /**
   * Obtiene todos los productos.
   * @returns {Promise<Product[]>}
   */
  async findAll(): Promise<Product[]> {
    const [rows] = await pool.execute<Product[]>("SELECT * FROM products ORDER BY id DESC");
    return rows;
  }

  /**
   * Crea un nuevo producto en la base de datos.
   * @param {CreateProductDTO} data - Datos del producto.
   * @returns {Promise<Product>}
   */
  async create(data: CreateProductDTO): Promise<Product> {
    const { name, description = null, price, stock = 0 } = data;

    const [result] = await pool.execute(
      `INSERT INTO products (name, description, price, stock)
       VALUES (?, ?, ?, ?)`,
      [name, description, price, stock]
    );

    const insertId = (result as any).insertId;
    return this.findById(insertId);
  }

  /**
   * Busca un producto por su ID.
   * @param {number} id
   * @returns {Promise<Product | null>}
   */
  async findById(id: number): Promise<Product | null> {
    const [rows] = await pool.execute<Product[]>(
      "SELECT * FROM products WHERE id = ? LIMIT 1",
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }
}