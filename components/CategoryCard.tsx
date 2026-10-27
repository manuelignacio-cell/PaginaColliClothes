import type { Category } from "@/lib/types";
import AppLink from "./AppLink";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <AppLink href={`/categorias/${category.id}`} className="text-decoration-none text-dark">
      <div className="card h-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={category.img} alt={category.nombre} className="imagen" />
        <div className="card-body">
          <h3 className="h6 mb-1">{category.nombre}</h3>
          <p className="small text-muted mb-0">{category.descripcion}</p>
        </div>
      </div>
    </AppLink>
  );
}
