import { effectivePrice, formatCLP } from "@/lib/format";
import type { Product } from "@/lib/types";
import AppLink from "./AppLink";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const sinStock = product.stock <= 0;
  return (
    <div className="card h-100" data-testid="product-card">
      <ProductImage categoria={product.categoria} alt={product.nombre} />
      <div className="card-body d-flex flex-column">
        <h3 className="h6 card-title">
          <AppLink href={`/productos/${product.id}`} className="text-decoration-none text-dark">
            {product.nombre}
          </AppLink>
        </h3>
        <p className="small text-muted mb-2">Talla: {product.talla}</p>
        <p className="mt-auto mb-2">
          <strong className="precio">{formatCLP(effectivePrice(product))}</strong>
        </p>
        <button className="btn btn-primary btn-sm" onClick={() => onAdd(product)} disabled={sinStock}>
          {sinStock ? "Sin stock" : "Añadir al carrito"}
        </button>
      </div>
    </div>
  );
}
