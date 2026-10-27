"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import AlertMessage from "@/components/AlertMessage";
import AppLink from "@/components/AppLink";
import ProductImage from "@/components/ProductImage";
import { addItem } from "@/lib/cart";
import { effectivePrice, formatCLP } from "@/lib/format";
import { useCart, useCollection } from "@/lib/hooks";

export default function DetalleProducto() {
  const { id } = useParams<{ id: string }>();
  const [products, ready] = useCollection("products");
  const [cart, setCart] = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [aviso, setAviso] = useState("");
  const product = products.find((p) => p.id === id);

  if (!ready) return <p>Cargando…</p>;
  if (!product) return <p>No encontramos ese producto. <AppLink href="/productos">Volver</AppLink></p>;

  return (
    <div className="row g-4">
      <div className="col-md-5"><ProductImage categoria={product.categoria} alt={product.nombre} /></div>
      <div className="col-md-7">
        <h1 className="h3">{product.nombre}</h1>
        <p>{product.descripcion}</p>
        <p className="text-muted">Tallas: {product.talla} · Stock: {product.stock}</p>
        <p className="fs-4">
          <strong className="precio">{formatCLP(effectivePrice(product))}</strong>
        </p>
        <div className="d-flex gap-2 align-items-center mb-3">
          <label htmlFor="cantidad" className="form-label mb-0">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            min={1}
            max={product.stock}
            className="form-control w-auto"
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, Number(e.target.value) || 1))}
          />
          <button
            className="btn btn-primary"
            disabled={product.stock <= 0}
            onClick={() => {
              setCart(addItem(cart, product, cantidad));
              setAviso(`Agregaste ${cantidad} × ${product.nombre} al carrito.`);
            }}
          >
            {product.stock <= 0 ? "Sin stock" : "Añadir al carrito"}
          </button>
        </div>
        <AlertMessage message={aviso} type="success" />
        <AppLink href="/carrito">Ir al carrito</AppLink>
      </div>
    </div>
  );
}
