"use client";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { update } from "@/lib/db";
import { useCollection } from "@/lib/hooks";

export default function EditarProducto() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [products, ready] = useCollection("products");
  const [categories] = useCollection("categories");
  const product = products.find((p) => p.id === id);
  if (!ready) return <p>Cargando…</p>;
  if (!product) return <p>Producto no encontrado.</p>;
  const { id: _id, ...data } = product;
  void _id;
  return (
    <>
      <h1 className="h3 mb-3">Editar producto</h1>
      <ProductForm categories={categories} initial={data} submitLabel="Guardar cambios" onSave={(changes) => { update("products", id, changes); router.push("/admin/productos"); }} />
    </>
  );
}
