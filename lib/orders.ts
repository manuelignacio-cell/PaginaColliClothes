import { create, getById, readAll, update } from "./db";
import { cartTotal } from "./cart";
import type { Address, CartItem, Order } from "./types";

export interface CheckoutData {
  nombre: string;
  apellido: string;
  correo: string;
  direccion: Address;
}

/** Crea la orden. Si el pago fue correcto descuenta stock; si falla, el carrito se conserva. */
export function placeOrder(data: CheckoutData, items: CartItem[], userId: string | null, pagoOk: boolean): Order {
  const numero = "#" + (20260000 + readAll("orders").length + 1);
  const order = create("orders", {
    numero,
    fecha: new Date().toISOString(),
    userId,
    cliente: { nombre: data.nombre, apellido: data.apellido, correo: data.correo },
    direccion: data.direccion,
    items,
    total: cartTotal(items),
    estado: pagoOk ? "pagada" : "fallida",
  });
  if (pagoOk) {
    items.forEach((item) => {
      const product = getById("products", item.productId);
      if (product) update("products", product.id, { stock: Math.max(0, product.stock - item.cantidad) });
    });
  }
  return order;
}

export const ordersOfUser = (userId: string): Order[] => readAll("orders").filter((o) => o.userId === userId);
