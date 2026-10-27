"use client";
import { useRouter } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import { create, readAll } from "@/lib/db";

export default function NuevaCategoria() {
  const router = useRouter();
  return (
    <>
      <h1 className="h3 mb-3">Nueva categoría</h1>
      <CategoryForm
        onSave={(data) => {
          // el id de las categorías es un "slug" legible: /categorias/<slug>
          const base = data.nombre.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "categoria";
          const taken = readAll("categories").some((c) => c.id === base);
          create("categories", { ...data, id: taken ? `${base}-${Date.now()}` : base });
          router.push("/admin/categorias");
        }}
      />
    </>
  );
}
