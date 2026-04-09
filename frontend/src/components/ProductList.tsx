// =============================================================
// Lista de productos con formato de tabla.
// SRP: solo muestra y formatea los productos.
// =============================================================

import { Product } from "../types/productTypes";

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

export function ProductList({ products, loading }: ProductListProps) {
  if (loading) return <p>Cargando productos...</p>;
  if (products.length === 0) return <p>No hay productos registrados.</p>;

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>ID</th>
          <th style={styles.th}>Nombre</th>
          <th style={styles.th}>Descripción</th>
          <th style={styles.th}>Precio</th>
          <th style={styles.th}>Stock</th>
          <th style={styles.th}>Creado</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} style={styles.row}>
            <td style={styles.td}>{p.id}</td>
            <td style={styles.td}>{p.name}</td>
            <td style={styles.td}>{p.description || "—"}</td>
            <td style={styles.td}>${parseFloat(String(p.price)).toFixed(2)}</td>
            <td style={styles.td}>{p.stock}</td>
            <td style={styles.td}>{new Date(p.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ---- Estilos inline simples ----
const styles: Record<string, React.CSSProperties> = {
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    background: "#fff",
  },
  th: {
    textAlign: "left" as const,
    padding: 12,
    borderBottom: "2px solid #2563eb",
    background: "#eff6ff",
    fontSize: 14,
  },
  td: {
    padding: 12,
    borderBottom: "1px solid #e5e7eb",
    fontSize: 14,
  },
  row: {},
};