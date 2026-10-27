import { create, readAll, readKey, removeKey, writeKey, getById } from "./db";
import { isValidEmail } from "./format";
import type { User } from "./types";

export interface AuthResult {
  ok: boolean;
  error?: string;
  user?: User;
}

export interface RegisterData {
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
}

export function register(data: RegisterData): AuthResult {
  if (!data.nombre.trim() || !data.apellido.trim()) return { ok: false, error: "Ingresa tu nombre y apellido." };
  if (!isValidEmail(data.correo)) return { ok: false, error: "El correo no es válido." };
  if (data.clave.length < 6) return { ok: false, error: "La contraseña debe tener al menos 6 caracteres." };
  const exists = readAll("users").some((u) => u.correo.toLowerCase() === data.correo.trim().toLowerCase());
  if (exists) return { ok: false, error: "Ya existe una cuenta con ese correo." };
  const user = create("users", { ...data, correo: data.correo.trim(), rol: "cliente" });
  writeKey("session", user.id);
  return { ok: true, user };
}

export function login(correo: string, clave: string): AuthResult {
  const user = readAll("users").find(
    (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.clave === clave,
  );
  if (!user) return { ok: false, error: "Correo o contraseña incorrectos." };
  writeKey("session", user.id);
  return { ok: true, user };
}

export function logout() {
  removeKey("session");
}

export function currentUser(): User | undefined {
  const id = readKey<string | null>("session", null);
  return id ? getById("users", id) : undefined;
}
