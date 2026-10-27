"use client";
import StatCard from "@/components/admin/StatCard";
import { formatCLP, isCritical } from "@/lib/format";
import { useCollection } from "@/lib/hooks";

export default function Reportes() {
  const [orders] = useCollection("orders");
  const [products] = useCollection("products");
  const pagadas = orders.filter((o) => o.estado === "pagada");
  const ventas = pagadas.reduce((s, o) => s + o.total, 0);

  const vendidos: Record<string, { nombre: string; unidades: number; monto: number }> = {};
  pagadas.forEach((o) =>
    o.items.forEach((i) => {
      const row = (vendidos[i.productId] ??= { nombre: i.nombre, unidades: 0, monto: 0 });
      row.unidades += i.cantidad;
      row.monto += i.cantidad * i.precio;
    }),
  );
  const ranking = Object.values(vendidos).sort((a, b) => b.unidades - a.unidades);

  return (
    <>
      <h1 className="h3 mb-3">Reportes</h1>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard titulo="Ventas totales" valor={formatCLP(ventas)} /></div>
        <div className="col-md-4"><StatCard titulo="Órdenes pagadas" valor={pagadas.length} detalle={`${orders.length - pagadas.length} con pago fallido`} /></div>
        <div className="col-md-4"><StatCard titulo="Productos con stock crítico" valor={products.filter(isCritical).length} /></div>
      </div>
      <h2 className="h5">Productos más vendidos</h2>
      {ranking.length === 0 ? <p className="text-muted">Aún no hay ventas.</p> : (
        <table className="table table-sm">
          <thead><tr><th>Producto</th><th>Unidades</th><th>Monto</th></tr></thead>
          <tbody>{ranking.map((r) => <tr key={r.nombre}><td>{r.nombre}</td><td>{r.unidades}</td><td>{formatCLP(r.monto)}</td></tr>)}</tbody>
        </table>
      )}
    </>
  );
}
