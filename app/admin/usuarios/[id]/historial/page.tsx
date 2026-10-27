"use client";
import { useParams } from "next/navigation";
import AppLink from "@/components/AppLink";
import { formatCLP } from "@/lib/format";
import { useCollection } from "@/lib/hooks";

export default function HistorialCompras() {
  const { id } = useParams<{ id: string }>();
  const [users] = useCollection("users");
  const [orders] = useCollection("orders");
  const user = users.find((u) => u.id === id);
  const mine = orders.filter((o) => o.userId === id);
  return (
    <>
      <h1 className="h3 mb-3">Historial de compras{user ? ` — ${user.nombre} ${user.apellido}` : ""}</h1>
      {mine.length === 0 ? <p className="text-muted">Este usuario aún no tiene compras.</p> : (
        <ul className="list-group">
          {mine.map((o) => (
            <li key={o.id} className="list-group-item d-flex justify-content-between">
              <span>{o.numero} · {new Date(o.fecha).toLocaleDateString("es-CL")} · {o.estado}</span>
              <span>{formatCLP(o.total)} · <AppLink href={`/admin/ordenes/${o.id}`}>Ver boleta</AppLink></span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3"><AppLink href="/admin/usuarios">← Volver a usuarios</AppLink></p>
    </>
  );
}
