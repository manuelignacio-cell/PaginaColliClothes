import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  onAdd: (product: Product) => void;
  emptyMessage?: string;
}

export default function ProductList({ products, onAdd, emptyMessage = "No encontramos productos." }: ProductListProps) {
  if (products.length === 0) return <p className="text-muted">{emptyMessage}</p>;
  return (
    <div className="row g-3">
      {products.map((p) => (
        <div className="col-12 col-sm-6 col-lg-3" key={p.id}>
          <ProductCard product={p} onAdd={onAdd} />
        </div>
      ))}
    </div>
  );
}
