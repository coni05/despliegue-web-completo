// =============================================================
// Rutas: define los endpoints del API.
// Principio Abierto/Cerrado (OCP): se pueden agregar rutas sin
// modificar la lógica existente.
// =============================================================

import { Router } from "express";
import { ProductController } from "../controllers/productController";

const router = Router();
const controller = new ProductController();

// Lista todos los productos
router.get("/products", (req, res) => controller.getAll(req, res));

// Crea un nuevo producto
router.post("/products", (req, res) => controller.create(req, res));

export default router;