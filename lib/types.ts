export interface Category {
  id: string;
  nombre: string;
  descripcion: string;
  img: string;
}

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  oferta: boolean;
  precioOferta: number;
  stock: number;
  stockCritico: number;
  talla: string;
}

export type Role = "admin" | "cliente";

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
  rol: Role;
}

export interface Blog {
  id: string;
  titulo: string;
  fecha: string;
  resumen: string;
  contenido: string;
}

export interface CartItem {
  productId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  categoria: string;
}

export interface Address {
  calle: string;
  depto: string;
  region: string;
  comuna: string;
  indicaciones: string;
}

export interface Order {
  id: string;
  numero: string;
  fecha: string;
  userId: string | null;
  cliente: { nombre: string; apellido: string; correo: string };
  direccion: Address;
  items: CartItem[];
  total: number;
  estado: "pagada" | "fallida";
}

export interface DbShape {
  categories: Category[];
  products: Product[];
  users: User[];
  blogs: Blog[];
  orders: Order[];
}

export type Collection = keyof DbShape;
