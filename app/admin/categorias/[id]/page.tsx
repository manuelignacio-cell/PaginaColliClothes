"use client";
import { useParams, useRouter } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import { update } from "@/lib/db";
import { useCollection } from "@/lib/hooks";

export default function EditarCategoria() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [categories, ready] = useCollection("categories");
  const category = categories.find((c) => c.id === id);
  if (!ready) return <p>Cargando…</p>;
  if (!category) return <p>Categoría no encontrada.</p>;
  return (
    <>
      <h1 className="h3 mb-3">Editar categoría</h1>
      <CategoryForm initial={category} onSave={(changes) => { update("categories", id, changes); router.push("/admin/categorias"); }} />
    </>
  );
}
