// =============================================================
// Punto de entrada de la aplicación Express.
// Configura middlewares, rutas y levanta el servidor.
// =============================================================

import express, { Express } from "express";
import cors from "cors";
import { verifyConnection } from "./config/database";
import productRoutes from "./routes/productRoutes";

const app: Express = express();
const PORT = Number(process.env.PORT) || 3000;

// ---- Middlewares ----
app.use(cors());                    // Permite peticiones cross-origin
app.use(express.json());           // Parsea el body como JSON

// ---- Rutas ----
app.use(productRoutes);

// ---- Manejo de ruta no encontrada ----
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Ruta no encontrada." });
});

// ---- Iniciar servidor ----
async function bootstrap(): Promise<void> {
  try {
    await verifyConnection();
    app.listen(PORT, () => {
      console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", (error as Error).message);
    process.exit(1);
  }
}

bootstrap();