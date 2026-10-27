"use client";
import { useState } from "react";
import AlertMessage from "@/components/AlertMessage";
import { isValidEmail } from "@/lib/format";
import type { User } from "@/lib/types";

export type UserData = Omit<User, "id">;

interface UserFormProps {
  initial?: UserData;
  onSave: (data: UserData) => void;
}

const EMPTY: UserData = { nombre: "", apellido: "", correo: "", clave: "", rol: "cliente" };

export default function UserForm({ initial = EMPTY, onSave }: UserFormProps) {
  const [form, setForm] = useState<UserData>(initial);
  const [error, setError] = useState("");
  const set = (f: keyof UserData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [f]: e.target.value });
  return (
    <form
      noValidate
      className="row g-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (!form.nombre.trim() || !form.apellido.trim()) return setError("Nombre y apellido son obligatorios.");
        if (!isValidEmail(form.correo)) return setError("El correo no es válido.");
        if (form.clave.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
        setError("");
        onSave(form);
      }}
    >
      <div className="col-12"><AlertMessage message={error} /></div>
      <div className="col-md-6"><label className="form-label" htmlFor="uf-nombre">Nombre</label><input id="uf-nombre" className="form-control" value={form.nombre} onChange={set("nombre")} /></div>
      <div className="col-md-6"><label className="form-label" htmlFor="uf-apellido">Apellido</label><input id="uf-apellido" className="form-control" value={form.apellido} onChange={set("apellido")} /></div>
      <div className="col-md-6"><label className="form-label" htmlFor="uf-correo">Correo</label><input id="uf-correo" type="email" className="form-control" value={form.correo} onChange={set("correo")} /></div>
      <div className="col-md-3"><label className="form-label" htmlFor="uf-clave">Contraseña</label><input id="uf-clave" type="password" className="form-control" value={form.clave} onChange={set("clave")} /></div>
      <div className="col-md-3">
        <label className="form-label" htmlFor="uf-rol">Rol</label>
        <select id="uf-rol" className="form-select" value={form.rol} onChange={set("rol")}>
          <option value="cliente">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <div className="col-12"><button className="btn btn-primary" type="submit">Guardar</button></div>
    </form>
  );
}
