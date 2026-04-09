// =============================================================
// Formulario para crear productos.
// SRP: solo maneja el formulario de creación.
// =============================================================

import { useState, FormEvent } from "react";
import { createProduct } from "../api/productApi";

interface ProductFormProps {
  onProductCreated: () => void;
}

export function ProductForm({ onProductCreated }: ProductFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createProduct({
        name,
        description: description || undefined,
        price: parseFloat(price),
        stock: parseInt(stock, 10) || 0,
      });

      // Limpiar formulario y notificar al padre
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      onProductCreated();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>➕ Nuevo Producto</h2>

      {error && <p style={styles.error}>{error}</p>}

      <input
        type="text"
        placeholder="Nombre *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={styles.input}
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...styles.input, resize: "vertical", minHeight: 60 }}
      />

      <input
        type="number"
        placeholder="Precio *"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        min="0"
        step="0.01"
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Stock (0)"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        min="0"
        style={styles.input}
      />

      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? "Creando..." : "Crear Producto"}
      </button>
    </form>
  );
}

// ---- Estilos inline simples ----
const styles: Record<string, React.CSSProperties> = {
  form: {
    background: "#f9f9f9",
    padding: 24,
    borderRadius: 8,
    marginBottom: 24,
  },
  input: {
    display: "block",
    width: "100%",
    padding: 10,
    marginBottom: 12,
    border: "1px solid #ccc",
    borderRadius: 4,
    fontSize: 14,
    boxSizing: "border-box",
  },
  button: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 15,
    width: "100%",
  },
  error: {
    color: "#dc2626",
    fontSize: 14,
    marginBottom: 12,
  },
};