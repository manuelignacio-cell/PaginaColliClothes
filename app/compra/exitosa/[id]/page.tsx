"use client";
import { useParams } from "next/navigation";
import AppLink from "@/components/AppLink";
import OrderSummary from "@/components/OrderSummary";
import { useCollection } from "@/lib/hooks";

export default function CompraExitosa() {
  const { id } = useParams<{ id: string }>();
  const [orders, ready] = useCollection("orders");
  const order = orders.find((o) => o.id === id);
  if (!ready) return <p>Cargando…</p>;
  if (!order) return <p>No encontramos la orden.</p>;
  return (
    <div className="col-lg-8 mx-auto card card-body">
      <h1 className="h4 text-success">Se ha realizado la compra nro {order.numero}</h1>
      <p className="small text-muted">Código orden: ORDER{order.id.padStart(5, "0")}</p>
      <OrderSummary order={order} />
      <div className="d-flex gap-2 justify-content-center">
        <button className="btn btn-danger btn-sm" onClick={() => window.print()}>Imprimir boleta en PDF</button>
        <a className="btn btn-success btn-sm" href={`mailto:${order.cliente.correo}?subject=Boleta ${order.numero}`}>Enviar boleta por email</a>
        <AppLink className="btn btn-outline-dark btn-sm" href="/productos">Seguir comprando</AppLink>
      </div>
    </div>
  );
}
