"use client";
import { useState } from "react";
import AlertMessage from "@/components/AlertMessage";
import type { Category, Product } from "@/lib/types";

export type ProductData = Omit<Product, "id">;

interface ProductFormProps {
  categories: Category[];
  initial?: ProductData;
  onSave: (data: ProductData) => void;
  submitLabel?: string;
}

const EMPTY: ProductData = {
  nombre: "", descripcion: "", categoria: "", precio: 0, oferta: false, precioOferta: 0, stock: 0, stockCritico: 5, talla: "",
};

export default function ProductForm({ categories, initial = EMPTY, onSave, submitLabel = "Guardar" }: ProductFormProps) {
  const [form, setForm] = useState<ProductData>({ ...initial, categoria: initial.categoria || categories[0]?.id || "" });
  const [error, setError] = useState("");
  const text = (f: keyof ProductData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [f]: e.target.value });
  const num = (f: keyof ProductData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [f]: Number(e.target.value) });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim()) return setError("El nombre es obligatorio.");
    if (form.precio <= 0) return setError("El precio debe ser mayor a 0.");
    if (form.stock < 0) return setError("El stock no puede ser negativo.");
    if (form.oferta && (form.precioOferta <= 0 || form.precioOferta >= form.precio))
      return setError("El precio de oferta debe ser mayor a 0 y menor al precio normal.");
    setError("");
    onSave({ ...form, precioOferta: form.oferta ? form.precioOferta : 0 });
  }

  return (
    <form onSubmit={submit} noValidate className="row g-3">
      <div className="col-12"><AlertMessage message={error} /></div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="pf-nombre">Nombre</label>
        <input id="pf-nombre" className="form-control" value={form.nombre} onChange={text("nombre")} />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="pf-cat">Categoría</label>
        <select id="pf-cat" className="form-select" value={form.categoria} onChange={text("categoria")}>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
      </div>
      <div className="col-12">
        <label className="form-label" htmlFor="pf-desc">Descripción</label>
        <textarea id="pf-desc" rows={2} className="form-control" value={form.descripcion} onChange={text("descripcion")} />
      </div>
      <div className="col-md-3">
        <label className="form-label" htmlFor="pf-precio">Precio</label>
        <input id="pf-precio" type="number" className="form-control" value={form.precio} onChange={num("precio")} />
      </div>
      <div className="col-md-3">
        <label className="form-label" htmlFor="pf-stock">Stock</label>
        <input id="pf-stock" type="number" className="form-control" value={form.stock} onChange={num("stock")} />
      </div>
      <div className="col-md-3">
        <label className="form-label" htmlFor="pf-crit">Stock crítico</label>
        <input id="pf-crit" type="number" className="form-control" value={form.stockCritico} onChange={num("stockCritico")} />
      </div>
      <div className="col-md-3">
        <label className="form-label" htmlFor="pf-talla">Tallas</label>
        <input id="pf-talla" className="form-control" value={form.talla} onChange={text("talla")} />
      </div>
      <div className="col-md-3 form-check ms-2">
        <input id="pf-oferta" type="checkbox" className="form-check-input" checked={form.oferta} onChange={(e) => setForm({ ...form, oferta: e.target.checked })} />
        <label className="form-check-label" htmlFor="pf-oferta">Producto en oferta</label>
      </div>
      {form.oferta && (
        <div className="col-md-3">
          <label className="form-label" htmlFor="pf-poferta">Precio de oferta</label>
          <input id="pf-poferta" type="number" className="form-control" value={form.precioOferta} onChange={num("precioOferta")} />
        </div>
      )}
      <div className="col-12"><button className="btn btn-primary" type="submit">{submitLabel}</button></div>
    </form>
  );
}
