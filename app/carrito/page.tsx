"use client";
import AppLink from "@/components/AppLink";
import ActionButton from "@/components/ActionButton";
import CartTable from "@/components/CartTable";
import { changeQuantity, clearCart, removeItem } from "@/lib/cart";
import { useCart } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function Carrito() {
  const router = useRouter();
  const [cart, setCart] = useCart();
  return (
    <>
      <h1 className="h3 mb-3">Carrito de compras</h1>
      <div className="alert alert-info small">La información del carrito se guarda en tu navegador (localStorage).</div>
      <CartTable
        items={cart}
        onQuantity={(id, qty) => setCart(changeQuantity(cart, id, qty))}
        onRemove={(id) => setCart(removeItem(cart, id))}
      />
      <div className="d-flex gap-2 justify-content-end">
        <AppLink href="/productos" className="btn btn-outline-dark">Seguir comprando</AppLink>
        <ActionButton label="Limpiar" variant="secondary" onClick={clearCart} disabled={cart.length === 0} />
        <ActionButton label="Comprar ahora" variant="success" onClick={() => router.push("/checkout")} disabled={cart.length === 0} />
      </div>
    </>
  );
}
