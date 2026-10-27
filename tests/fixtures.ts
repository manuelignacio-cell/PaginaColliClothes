import type { CartItem, Product } from "@/lib/types";

export const polera: Product = {
  id: "1", nombre: "Polera Básica", descripcion: "Algodón", categoria: "poleras", precio: 8000,
  oferta: false, precioOferta: 0, stock: 10, stockCritico: 5, talla: "M",
};

export const poleraOferta: Product = { ...polera, id: "2", nombre: "Polerón Oferta", oferta: true, precioOferta: 6000, stock: 3 };

export const sinStock: Product = { ...polera, id: "3", nombre: "Agotado", stock: 0 };

export const lineas: CartItem[] = [
  { productId: "1", nombre: "Polera Básica", precio: 8000, cantidad: 2, categoria: "poleras" },
  { productId: "2", nombre: "Polerón Oferta", precio: 6000, cantidad: 1, categoria: "polerones" },
];
