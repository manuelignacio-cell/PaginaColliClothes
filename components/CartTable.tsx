import { formatCLP } from "@/lib/format";
import { cartTotal } from "@/lib/cart";
import type { CartItem } from "@/lib/types";

interface CartTableProps {
  items: CartItem[];
  onQuantity?: (productId: string, cantidad: number) => void;
  onRemove?: (productId: string) => void;
}

/** Tabla del carrito. Si no recibe onQuantity/onRemove se muestra en modo solo lectura (checkout, boleta). */
export default function CartTable({ items, onQuantity, onRemove }: CartTableProps) {
  const editable = Boolean(onQuantity && onRemove);
  if (items.length === 0) return <p className="text-muted">Tu carrito está vacío.</p>;
  return (
    <div className="table-responsive">
      <table className="table table-sm align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            {editable && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.productId}>
              <td>{i.nombre}</td>
              <td>{formatCLP(i.precio)}</td>
              <td>
                {editable ? (
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-secondary" aria-label={`Quitar uno de ${i.nombre}`} onClick={() => onQuantity!(i.productId, i.cantidad - 1)}>
                      -
                    </button>
                    <span className="btn btn-light disabled cantidad">{i.cantidad}</span>
                    <button className="btn btn-outline-secondary" aria-label={`Agregar uno de ${i.nombre}`} onClick={() => onQuantity!(i.productId, i.cantidad + 1)}>
                      +
                    </button>
                  </div>
                ) : (
                  i.cantidad
                )}
              </td>
              <td>{formatCLP(i.precio * i.cantidad)}</td>
              {editable && (
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => onRemove!(i.productId)}>
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3} className="text-end">
              Total
            </th>
            <th className="total">{formatCLP(cartTotal(items))}</th>
            {editable && <th />}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
