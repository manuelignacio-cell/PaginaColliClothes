"use client";
import { useState } from "react";
import AlertMessage from "@/components/AlertMessage";
import type { Category } from "@/lib/types";

export type CategoryData = Omit<Category, "id">;

interface CategoryFormProps {
  initial?: CategoryData;
  onSave: (data: CategoryData) => void;
}

export default function CategoryForm({ initial = { nombre: "", descripcion: "", img: "/img/poleras.svg" }, onSave }: CategoryFormProps) {
  const [form, setForm] = useState<CategoryData>(initial);
  const [error, setError] = useState("");
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!form.nombre.trim()) return setError("El nombre es obligatorio.");
        setError("");
        onSave(form);
      }}
    >
      <AlertMessage message={error} />
      <div className="mb-3">
        <label className="form-label" htmlFor="cf-nombre">Nombre</label>
        <input id="cf-nombre" className="form-control" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="cf-desc">Descripción</label>
        <textarea id="cf-desc" rows={2} className="form-control" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="cf-img">Imagen</label>
        <select id="cf-img" className="form-select" value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })}>
          {["poleras", "polerones", "pantalones", "accesorios"].map((i) => <option key={i} value={`/img/${i}.svg`}>{i}</option>)}
        </select>
      </div>
      <button className="btn btn-primary" type="submit">Guardar</button>
    </form>
  );
}
