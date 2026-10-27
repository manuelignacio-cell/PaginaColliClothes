"use client";
import { useState } from "react";
import { isValidEmail } from "@/lib/format";
import { REGIONES } from "@/lib/regiones";
import type { CheckoutData } from "@/lib/orders";
import AlertMessage from "./AlertMessage";

interface CheckoutFormProps {
  total: string;
  initial?: Partial<{ nombre: string; apellido: string; correo: string }>;
  onPay: (data: CheckoutData, pagoOk: boolean) => void;
}

export default function CheckoutForm({ total, initial = {}, onPay }: CheckoutFormProps) {
  const regiones = Object.keys(REGIONES);
  const [nombre, setNombre] = useState(initial.nombre ?? "");
  const [apellido, setApellido] = useState(initial.apellido ?? "");
  const [correo, setCorreo] = useState(initial.correo ?? "");
  const [calle, setCalle] = useState("");
  const [depto, setDepto] = useState("");
  const [region, setRegion] = useState(regiones[0]);
  const [comuna, setComuna] = useState(REGIONES[regiones[0]][0]);
  const [indicaciones, setIndicaciones] = useState("");
  const [pagoOk, setPagoOk] = useState(true);
  const [error, setError] = useState("");

  function changeRegion(value: string) {
    setRegion(value);
    setComuna(REGIONES[value][0]); // la comuna depende de la región
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !calle.trim()) return setError("Completa nombre, apellido y calle.");
    if (!isValidEmail(correo)) return setError("Ingresa un correo válido.");
    setError("");
    onPay({ nombre, apellido, correo, direccion: { calle, depto, region, comuna, indicaciones } }, pagoOk);
  }

  return (
    <form onSubmit={submit} noValidate>
      <AlertMessage message={error} />
      <h2 className="h5">Información del cliente</h2>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="k-nombre">Nombre*</label>
          <input id="k-nombre" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="k-apellido">Apellidos*</label>
          <input id="k-apellido" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="k-correo">Correo*</label>
          <input id="k-correo" type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>
      </div>
      <h2 className="h5">Dirección de entrega de los productos</h2>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="k-calle">Calle*</label>
          <input id="k-calle" className="form-control" value={calle} onChange={(e) => setCalle(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="k-depto">Departamento (opcional)</label>
          <input id="k-depto" className="form-control" placeholder="Ej: 603" value={depto} onChange={(e) => setDepto(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="k-region">Región*</label>
          <select id="k-region" className="form-select" value={region} onChange={(e) => changeRegion(e.target.value)}>
            {regiones.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="k-comuna">Comuna*</label>
          <select id="k-comuna" className="form-select" value={comuna} onChange={(e) => setComuna(e.target.value)}>
            {REGIONES[region].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="k-ind">Indicaciones para la entrega (opcional)</label>
          <textarea id="k-ind" rows={2} className="form-control" value={indicaciones} onChange={(e) => setIndicaciones(e.target.value)} />
        </div>
      </div>
      <div className="alert alert-secondary">
        <strong>Simulación de pago (para la demo):</strong>
        <div className="form-check mt-1">
          <input className="form-check-input" type="radio" id="p-ok" checked={pagoOk} onChange={() => setPagoOk(true)} />
          <label className="form-check-label" htmlFor="p-ok">El pago es exitoso</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" id="p-fail" checked={!pagoOk} onChange={() => setPagoOk(false)} />
          <label className="form-check-label" htmlFor="p-fail">El pago falla</label>
        </div>
      </div>
      <div className="text-end">
        <button className="btn btn-success" type="submit">Pagar ahora {total}</button>
      </div>
    </form>
  );
}
