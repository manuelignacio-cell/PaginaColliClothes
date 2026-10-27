"use client";
import AppLink from "@/components/AppLink";
import { formatCLP } from "@/lib/format";
import { useCollection } from "@/lib/hooks";

export default function Ordenes() {
  const [orders] = useCollection("orders");
  return (
    <>
      <h1 className="h3 mb-3">Órdenes / Boletas</h1>
      {orders.length === 0 ? <p className="text-muted">Aún no hay órdenes.</p> : (
        <div className="table-responsive">
          <table className="table table-sm align-middle">
            <thead><tr><th>N°</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Estado</th><th /></tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.numero}</td>
                  <td>{new Date(o.fecha).toLocaleDateString("es-CL")}</td>
                  <td>{o.cliente.nombre} {o.cliente.apellido}</td>
                  <td>{formatCLP(o.total)}</td>
                  <td><span className={`badge text-bg-${o.estado === "pagada" ? "success" : "danger"}`}>{o.estado}</span></td>
                  <td><AppLink href={`/admin/ordenes/${o.id}`}>Mostrar boleta</AppLink></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
