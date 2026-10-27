"use client";
import { useParams } from "next/navigation";
import AppLink from "@/components/AppLink";
import ProductList from "@/components/ProductList";
import { addItem } from "@/lib/cart";
import { useCart, useCollection } from "@/lib/hooks";

export default function CategoriaDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const [categories, ready] = useCollection("categories");
  const [products] = useCollection("products");
  const [cart, setCart] = useCart();
  const category = categories.find((c) => c.id === slug);

  if (!ready) return <p>Cargando…</p>;
  if (!category) return <p>Categoría no encontrada. <AppLink href="/categorias">Ver categorías</AppLink></p>;

  return (
    <>
      <h1 className="h3">{category.nombre}</h1>
      <p className="text-muted">{category.descripcion}</p>
      <ProductList
        products={products.filter((p) => p.categoria === category.id)}
        onAdd={(p) => setCart(addItem(cart, p))}
        emptyMessage="Aún no hay productos en esta categoría."
      />
    </>
  );
}
