"use client";
import ProductList from "@/components/ProductList";
import { addItem } from "@/lib/cart";
import { useCart, useCollection } from "@/lib/hooks";

export default function Ofertas() {
  const [products] = useCollection("products");
  const [cart, setCart] = useCart();
  return (
    <>
      <h1 className="h3 mb-3">Ofertas</h1>
      <ProductList
        products={products.filter((p) => p.oferta)}
        onAdd={(p) => setCart(addItem(cart, p))}
        emptyMessage="Por ahora no hay ofertas."
      />
    </>
  );
}
