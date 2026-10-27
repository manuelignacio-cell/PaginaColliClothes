"use client";
import { useParams } from "next/navigation";
import AppLink from "@/components/AppLink";
import OrderSummary from "@/components/OrderSummary";
import { useCollection } from "@/lib/hooks";

export default function CompraError() {
  const { id } = useParams<{ id: string }>();
  const [orders, ready] = useCollection("orders");
  const order = orders.find((o) => o.id === id);
  if (!ready) return <p>Cargando…</p>;
  if (!order) return <p>No encontramos la orden.</p>;
  return (
    <div className="col-lg-8 mx-auto card card-body">
      <h1 className="h4 text-danger">No se pudo realizar el pago. nro {order.numero}</h1>
      <p className="text-muted">Detalle de compra</p>
      <div className="text-center mb-3">
        <AppLink className="btn btn-success" href="/checkout">VOLVER A REALIZAR EL PAGO</AppLink>
      </div>
      <OrderSummary order={order} />
    </div>
  );
}
