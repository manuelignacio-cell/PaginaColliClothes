"use client";
import { useRouter } from "next/navigation";
import CartTable from "@/components/CartTable";
import CheckoutForm from "@/components/CheckoutForm";
import AppLink from "@/components/AppLink";
import { cartTotal, clearCart } from "@/lib/cart";
import { formatCLP } from "@/lib/format";
import { useCart, useSession } from "@/lib/hooks";
import { placeOrder } from "@/lib/orders";

export default function Checkout() {
  const router = useRouter();
  const [cart] = useCart();
  const [user, ready] = useSession();

  if (cart.length === 0)
    return <p>Tu carrito está vacío. <AppLink href="/productos">Ver productos</AppLink></p>;

  return (
    <div className="col-lg-8 mx-auto card card-body">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="h4 mb-0">Carrito de compra</h1>
        <span className="btn btn-primary disabled">Total a pagar: {formatCLP(cartTotal(cart))}</span>
      </div>
      <CartTable items={cart} />
      {/* key: si el usuario inicia sesión, el formulario se rellena automáticamente */}
      <CheckoutForm
        key={ready ? (user?.id ?? "anon") : "loading"}
        total={formatCLP(cartTotal(cart))}
        initial={user ? { nombre: user.nombre, apellido: user.apellido, correo: user.correo } : {}}
        onPay={(data, pagoOk) => {
          const order = placeOrder(data, cart, user?.id ?? null, pagoOk);
          if (pagoOk) {
            clearCart();
            router.push(`/compra/exitosa/${order.id}`);
          } else {
            router.push(`/compra/error/${order.id}`);
          }
        }}
      />
    </div>
  );
}
