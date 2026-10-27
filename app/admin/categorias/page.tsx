"use client";
import AppLink from "@/components/AppLink";
import { remove } from "@/lib/db";
import { useCollection } from "@/lib/hooks";

export default function AdminCategorias() {
  const [categories] = useCollection("categories");
  const [products] = useCollection("products");
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Categorías</h1>
        <AppLink href="/admin/categorias/nueva" className="btn btn-primary btn-sm">Nueva categoría</AppLink>
      </div>
      <table className="table table-sm align-middle">
        <thead><tr><th>Nombre</th><th>Descripción</th><th>Productos</th><th /></tr></thead>
        <tbody>
          {categories.map((c) => {
            const total = products.filter((p) => p.categoria === c.id).length;
            return (
              <tr key={c.id}>
                <td>{c.nombre}</td><td>{c.descripcion}</td><td>{total}</td>
                <td className="text-end">
                  <AppLink href={`/admin/categorias/${c.id}`} className="btn btn-outline-primary btn-sm me-1">Editar</AppLink>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    disabled={total > 0}
                    title={total > 0 ? "Tiene productos asociados" : ""}
                    onClick={() => { if (window.confirm(`¿Eliminar ${c.nombre}?`)) remove("categories", c.id); }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
