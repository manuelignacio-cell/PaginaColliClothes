"use client";
import CategoryCard from "@/components/CategoryCard";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import { addItem } from "@/lib/cart";
import { useCart, useCollection } from "@/lib/hooks";
import type { Product } from "@/lib/types";

export default function Home() {
  const [categories] = useCollection("categories");
  const [products] = useCollection("products");
  const [cart, setCart] = useCart();
  const destacados = products.filter((p) => p.stock > 0).slice(0, 4);

  return (
    <>
      <Hero />
      <h2 className="h4 text-center mb-3">Categorías</h2>
      <div className="row g-3 mb-5">
        {categories.map((c) => (
          <div className="col-6 col-lg-3" key={c.id}><CategoryCard category={c} /></div>
        ))}
      </div>
      <h2 className="h4 mb-3">Productos destacados</h2>
      <ProductList products={destacados} onAdd={(p: Product) => setCart(addItem(cart, p))} />
    </>
  );
}
