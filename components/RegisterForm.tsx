"use client";
import { useState } from "react";
import type { RegisterData } from "@/lib/auth";
import AlertMessage from "./AlertMessage";

interface RegisterFormProps {
  onRegister: (data: RegisterData) => string | void;
}

export default function RegisterForm({ onRegister }: RegisterFormProps) {
  const [form, setForm] = useState<RegisterData>({ nombre: "", apellido: "", correo: "", clave: "" });
  const [error, setError] = useState("");
  const set = (field: keyof RegisterData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setError(onRegister(form) || "");
      }}
    >
      <AlertMessage message={error} />
      <div className="row g-3">
        <div className="col-sm-6">
          <label className="form-label" htmlFor="r-nombre">Nombre</label>
          <input id="r-nombre" className="form-control" value={form.nombre} onChange={set("nombre")} />
        </div>
        <div className="col-sm-6">
          <label className="form-label" htmlFor="r-apellido">Apellido</label>
          <input id="r-apellido" className="form-control" value={form.apellido} onChange={set("apellido")} />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="r-correo">Correo</label>
          <input id="r-correo" type="email" className="form-control" value={form.correo} onChange={set("correo")} />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="r-clave">Contraseña (mín. 6 caracteres)</label>
          <input id="r-clave" type="password" className="form-control" value={form.clave} onChange={set("clave")} />
        </div>
      </div>
      <button className="btn btn-primary w-100 mt-3" type="submit">Crear cuenta</button>
    </form>
  );
}
