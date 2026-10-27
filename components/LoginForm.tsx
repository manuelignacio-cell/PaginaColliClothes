"use client";
import { useState } from "react";
import AlertMessage from "./AlertMessage";

interface LoginFormProps {
  onLogin: (correo: string, clave: string) => string | void;
}

/** onLogin devuelve un mensaje de error (string) si las credenciales fallan. */
export default function LoginForm({ onLogin }: LoginFormProps) {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setError(onLogin(correo, clave) || "");
      }}
    >
      <AlertMessage message={error} />
      <div className="mb-3">
        <label className="form-label" htmlFor="l-correo">Correo</label>
        <input id="l-correo" type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="l-clave">Contraseña</label>
        <input id="l-clave" type="password" className="form-control" value={clave} onChange={(e) => setClave(e.target.value)} />
      </div>
      <button className="btn btn-primary w-100" type="submit">Iniciar sesión</button>
    </form>
  );
}
