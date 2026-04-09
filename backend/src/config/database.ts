// =============================================================
// Configuración del pool de conexiones a MySQL.
// Usa variables de entorno para ser configurable (12-Factor App).
// =============================================================

import mysql, { Pool, PoolOptions } from "mysql2/promise";

/** Opciones de conexión leídas desde variables de entorno */
const poolConfig: PoolOptions = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "product_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

/** Pool singleton de conexiones */
const pool: Pool = mysql.createPool(poolConfig);

/**
 * Verifica que la conexión a la base de datos sea exitosa.
 * @returns {Promise<void>}
 */
export async function verifyConnection(): Promise<void> {
  const conn = await pool.getConnection();
  await conn.ping();
  conn.release();
  console.log("✅ Conexión a la base de datos establecida.");
}

export default pool;