/**
 * "Base de datos" simulada.
 * - Los datos iniciales vienen de datos_prueba.json.
 * - Todo se guarda en localStorage (persistencia) y se expone con funciones CRUD:
 *   readAll / getById (Leer), create (Crear), update (Actualizar), remove (Eliminar).
 * - setStorage permite inyectar un almacenamiento falso (mock) en las pruebas.
 */
import seed from "@/datos_prueba.json";
import type { Collection, DbShape } from "./types";

export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export const CHANGE_EVENT = "colli:change";

let injected: StorageLike | null = null;

export function setStorage(storage: StorageLike | null) {
  injected = storage;
}

function getStorage(): StorageLike | null {
  if (injected) return injected;
  try {
    if (typeof window !== "undefined") return window.localStorage;
  } catch {
    /* localStorage bloqueado */
  }
  return null;
}

function notify() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CHANGE_EVENT));
}

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));
const seedData = seed as unknown as DbShape;
const keyOf = (name: string) => `colli:${name}`;

/* ---------- Valores sueltos (carrito, sesión) ---------- */
export function readKey<T>(name: string, fallback: T): T {
  const storage = getStorage();
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(keyOf(name));
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeKey<T>(name: string, value: T) {
  const storage = getStorage();
  if (storage) storage.setItem(keyOf(name), JSON.stringify(value));
  notify();
}

export function removeKey(name: string) {
  const storage = getStorage();
  if (storage) storage.removeItem(keyOf(name));
  notify();
}

/* ---------- CRUD de colecciones ---------- */
export function readAll<K extends Collection>(collection: K): DbShape[K] {
  const storage = getStorage();
  const initial = clone(seedData[collection]);
  if (!storage) return initial;
  const raw = storage.getItem(keyOf(collection));
  if (raw === null) {
    storage.setItem(keyOf(collection), JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(raw) as DbShape[K];
  } catch {
    return initial;
  }
}

function writeAll<K extends Collection>(collection: K, items: DbShape[K]) {
  const storage = getStorage();
  if (storage) storage.setItem(keyOf(collection), JSON.stringify(items));
  notify();
}

type Item<K extends Collection> = DbShape[K][number];

export function getById<K extends Collection>(collection: K, id: string): Item<K> | undefined {
  return (readAll(collection) as Item<K>[]).find((item) => item.id === id);
}

export function nextId<K extends Collection>(collection: K): string {
  const ids = (readAll(collection) as Item<K>[]).map((item) => Number(item.id)).filter((n) => !Number.isNaN(n));
  return String((ids.length ? Math.max(...ids) : 0) + 1);
}

export function create<K extends Collection>(collection: K, data: Omit<Item<K>, "id"> & { id?: string }): Item<K> {
  const item = { ...data, id: data.id ?? nextId(collection) } as Item<K>;
  writeAll(collection, [...(readAll(collection) as Item<K>[]), item] as DbShape[K]);
  return item;
}

export function update<K extends Collection>(collection: K, id: string, changes: Partial<Item<K>>): Item<K> | undefined {
  const items = readAll(collection) as Item<K>[];
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  const updated = { ...items[index], ...changes, id } as Item<K>;
  const next = [...items];
  next[index] = updated;
  writeAll(collection, next as DbShape[K]);
  return updated;
}

export function remove<K extends Collection>(collection: K, id: string): boolean {
  const items = readAll(collection) as Item<K>[];
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  writeAll(collection, next as DbShape[K]);
  return true;
}

export function resetDb() {
  const storage = getStorage();
  if (storage) {
    (Object.keys(seedData) as Collection[]).forEach((name) => storage.removeItem(keyOf(name)));
    ["cart", "session"].forEach((name) => storage.removeItem(keyOf(name)));
  }
  notify();
}
