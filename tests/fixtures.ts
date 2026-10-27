import type { Product } from "@/lib/types";

export const polera: Product = {
  id: "1", nombre: "Polera Básica", descripcion: "Algodón", categoria: "poleras", precio: 8000,
  oferta: false, precioOferta: 0, stock: 10, stockCritico: 5, talla: "M",
};

export const poleraOferta: Product = { ...polera, id: "2", nombre: "Polerón Oferta", oferta: true, precioOferta: 6000, stock: 3 };
