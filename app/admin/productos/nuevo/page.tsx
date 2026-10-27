"use client";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { create } from "@/lib/db";
import { useCollection } from "@/lib/hooks";

export default function NuevoProducto() {
  const router = useRouter();
  const [categories, ready] = useCollection("categories");
  if (!ready) return <p>Cargando…</p>;
  return (
    <>
      <h1 className="h3 mb-3">Nuevo producto</h1>
      <ProductForm categories={categories} submitLabel="Crear producto" onSave={(data) => { create("products", data); router.push("/admin/productos"); }} />
    </>
  );
}
