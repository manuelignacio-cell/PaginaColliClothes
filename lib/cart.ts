/** Lógica del carrito: funciones puras (fáciles de probar) + guardado en localStorage. */
import { readKey, removeKey, writeKey } from "./db";
import { effectivePrice } from "./format";
import type { CartItem, Product } from "./types";

export function addItem(items: CartItem[], product: Product, cantidad = 1): CartItem[] {
  const existing = items.find((i) => i.productId === product.id);
  const max = product.stock;
  if (existing) {
    return items.map((i) =>
      i.productId === product.id ? { ...i, cantidad: Math.min(i.cantidad + cantidad, max) } : i,
    );
  }
  return [
    ...items,
    {
      productId: product.id,
      nombre: product.nombre,
      precio: effectivePrice(product),
      cantidad: Math.min(cantidad, max),
      categoria: product.categoria,
    },
  ];
}

export function changeQuantity(items: CartItem[], productId: string, cantidad: number): CartItem[] {
  if (cantidad <= 0) return removeItem(items, productId);
  return items.map((i) => (i.productId === productId ? { ...i, cantidad } : i));
}

export function removeItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter((i) => i.productId !== productId);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.cantidad, 0);
}

export const loadCart = (): CartItem[] => readKey<CartItem[]>("cart", []);
export const saveCart = (items: CartItem[]) => writeKey("cart", items);
export const clearCart = () => removeKey("cart");
