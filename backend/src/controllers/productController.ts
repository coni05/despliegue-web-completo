// =============================================================
// Controlador: capa HTTP. Recibe la petición, llama al servicio
// y devuelve la respuesta. No contiene lógica de negocio.
// Principio de Responsabilidad Única (SRP).
// =============================================================

import { Request, Response } from "express";
import { ProductService } from "../services/productService";

const productService = new ProductService();

export class ProductController {
  /**
   * GET /products — Lista todos los productos.
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener los productos.",
        error: (error as Error).message,
      });
    }
  }

  /**
   * POST /products — Crea un nuevo producto.
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      // 400 para errores de validación, 500 para otros
      const status = (error as Error).message.includes("obligatorio") ? 400 : 500;
      res.status(status).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }
}