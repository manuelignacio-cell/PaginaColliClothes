import { formatCLP } from "@/lib/format";
import type { Order } from "@/lib/types";
import CartTable from "./CartTable";

export default function OrderSummary({ order }: { order: Order }) {
  const d = order.direccion;
  return (
    <>
      <dl className="row small">
        <dt className="col-sm-3">Cliente</dt>
        <dd className="col-sm-9">{order.cliente.nombre} {order.cliente.apellido} · {order.cliente.correo}</dd>
        <dt className="col-sm-3">Dirección</dt>
        <dd className="col-sm-9">{d.calle}{d.depto ? `, Depto ${d.depto}` : ""}, {d.comuna}, {d.region}</dd>
        {d.indicaciones && (<><dt className="col-sm-3">Indicaciones</dt><dd className="col-sm-9">{d.indicaciones}</dd></>)}
        <dt className="col-sm-3">Fecha</dt>
        <dd className="col-sm-9">{new Date(order.fecha).toLocaleString("es-CL")}</dd>
      </dl>
      <CartTable items={order.items} />
      <p className="text-center fs-5">Total {order.estado === "pagada" ? "pagado" : "a pagar"}: <strong>{formatCLP(order.total)}</strong></p>
    </>
  );
}
