"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryFilter from "@/components/CategoryFilter";
import ProductList from "@/components/ProductList";
import { addItem } from "@/lib/cart";
import { useCart, useCollection } from "@/lib/hooks";

function Catalogo() {
  const router = useRouter();
  const params = useSearchParams();
  const q = (params.get("q") ?? "").toLowerCase();
  const cat = params.get("cat") ?? "";
  const [products] = useCollection("products");
  const [categories] = useCollection("categories");
  const [cart, setCart] = useCart();

  const filtered = products.filter(
    (p) => (!cat || p.categoria === cat) && (!q || p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q)),
  );

  function select(id: string) {
    const next = new URLSearchParams(params.toString());
    if (id) next.set("cat", id);
    else next.delete("cat");
    router.push(`/productos?${next.toString()}`);
  }

  return (
    <>
      <h1 className="h3 mb-3">Productos</h1>
      {q && <p className="text-muted">Resultados para “{params.get("q")}”</p>}
      <div className="mb-3">
        <CategoryFilter categories={categories} selected={cat} onSelect={select} />
      </div>
      <ProductList products={filtered} onAdd={(p) => setCart(addItem(cart, p))} />
    </>
  );
}

export default function ProductosPage() {
  return (
    <Suspense fallback={<p>Cargando…</p>}>
      <Catalogo />
    </Suspense>
  );
}
