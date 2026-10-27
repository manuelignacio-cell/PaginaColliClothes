import type { Product } from "./types";

export function formatCLP(value: number): string {
  return "$" + Math.round(value).toLocaleString("es-CL");
}

/** Precio que realmente paga el cliente (oferta si existe). */
export function effectivePrice(product: Pick<Product, "precio" | "oferta" | "precioOferta">): number {
  return product.oferta && product.precioOferta > 0 ? product.precioOferta : product.precio;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isCritical(product: Pick<Product, "stock" | "stockCritico">): boolean {
  return product.stock <= product.stockCritico;
}
