"use client";
import { useParams } from "next/navigation";
import AppLink from "@/components/AppLink";
import OrderSummary from "@/components/OrderSummary";
import { useCollection } from "@/lib/hooks";

export default function Boleta() {
  const { id } = useParams<{ id: string }>();
  const [orders] = useCollection("orders");
  const order = orders.find((o) => o.id === id);
  if (!order) return <p>Boleta no encontrada. <AppLink href="/admin/ordenes">Volver</AppLink></p>;
  return (
    <>
      <h1 className="h3">Boleta {order.numero}</h1>
      <p><span className={`badge text-bg-${order.estado === "pagada" ? "success" : "danger"}`}>{order.estado}</span></p>
      <OrderSummary order={order} />
      <AppLink href="/admin/ordenes">← Volver a órdenes</AppLink>
    </>
  );
}
