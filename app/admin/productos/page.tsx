"use client";
import AppLink from "@/components/AppLink";
import { remove } from "@/lib/db";
import { effectivePrice, formatCLP, isCritical } from "@/lib/format";
import { useCollection } from "@/lib/hooks";

export default function AdminProductos() {
  const [products] = useCollection("products");
  const [categories] = useCollection("categories");
  const nombreCat = (id: string) => categories.find((c) => c.id === id)?.nombre ?? id;
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Productos</h1>
        <div className="d-flex gap-2">
          <AppLink href="/admin/productos/criticos" className="btn btn-outline-warning btn-sm">Stock crítico</AppLink>
          <AppLink href="/admin/productos/nuevo" className="btn btn-primary btn-sm">Nuevo producto</AppLink>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-sm align-middle">
          <thead><tr><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th /></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{nombreCat(p.categoria)}</td>
                <td>{formatCLP(effectivePrice(p))}</td>
                <td className={isCritical(p) ? "text-danger fw-bold" : ""}>{p.stock}</td>
                <td className="text-end">
                  <AppLink href={`/admin/productos/${p.id}`} className="btn btn-outline-primary btn-sm me-1">Editar</AppLink>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => { if (window.confirm(`¿Eliminar ${p.nombre}?`)) remove("products", p.id); }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
