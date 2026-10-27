"use client";
import AppLink from "@/components/AppLink";
import { isCritical } from "@/lib/format";
import { useCollection } from "@/lib/hooks";

export default function Criticos() {
  const [products] = useCollection("products");
  const criticos = products.filter(isCritical);
  return (
    <>
      <h1 className="h3 mb-3">Productos con stock crítico</h1>
      {criticos.length === 0 ? <p className="text-muted">No hay productos críticos.</p> : (
        <ul className="list-group">
          {criticos.map((p) => (
            <li key={p.id} className="list-group-item d-flex justify-content-between">
              <span>{p.nombre} — stock {p.stock} (crítico: {p.stockCritico})</span>
              <AppLink href={`/admin/productos/${p.id}`}>Reponer</AppLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
