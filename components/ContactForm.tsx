"use client";
import { useState } from "react";
import { isValidEmail } from "@/lib/format";
import AlertMessage from "./AlertMessage";

interface ContactFormProps {
  onSubmit?: (data: { nombre: string; correo: string; mensaje: string }) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(false);
    if (!nombre.trim() || !mensaje.trim()) return setError("Completa tu nombre y el mensaje.");
    if (!isValidEmail(correo)) return setError("Ingresa un correo válido.");
    setError("");
    onSubmit?.({ nombre, correo, mensaje });
    setEnviado(true);
    setNombre("");
    setCorreo("");
    setMensaje("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AlertMessage message={error} />
      <AlertMessage message={enviado ? "¡Gracias! Te responderemos pronto." : ""} type="success" />
      <div className="mb-3">
        <label className="form-label" htmlFor="c-nombre">Nombre</label>
        <input id="c-nombre" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="c-correo">Correo</label>
        <input id="c-correo" type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="c-mensaje">Mensaje</label>
        <textarea id="c-mensaje" rows={4} className="form-control" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
      </div>
      <button className="btn btn-primary" type="submit">Enviar</button>
    </form>
  );
}
