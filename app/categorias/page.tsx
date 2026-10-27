"use client";
import CategoryCard from "@/components/CategoryCard";
import { useCollection } from "@/lib/hooks";

export default function Categorias() {
  const [categories] = useCollection("categories");
  return (
    <>
      <h1 className="h3 mb-3">Categorías</h1>
      <div className="row g-3">
        {categories.map((c) => (
          <div className="col-6 col-lg-3" key={c.id}><CategoryCard category={c} /></div>
        ))}
      </div>
    </>
  );
}
