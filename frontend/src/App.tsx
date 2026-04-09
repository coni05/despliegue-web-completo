// =============================================================
// Componente principal: orquesta el formulario y la lista.
// SRP: coordina la interacción entre componentes hijos.
// =============================================================

import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "./api/productApi";
import { Product } from "./types/productTypes";
import { ProductForm } from "./components/ProductForm";
import { ProductList } from "./components/ProductList";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /** Carga los productos desde la API */
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📦 Mini Sistema de Productos</h1>

      {/* Formulario de creación */}
      <ProductForm onProductCreated={loadProducts} />

      {/* Lista de productos */}
      <ProductList products={products} loading={loading} />
    </div>
  );
}

// ---- Estilos generales ----
const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 800,
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: 24,
    color: "#1e293b",
  },
};