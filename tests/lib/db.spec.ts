import { create, getById, readAll, remove, setStorage, update } from "@/lib/db";
import { createFakeStorage } from "../helpers";

describe("db (CRUD sobre localStorage simulado)", () => {
  let storage: ReturnType<typeof createFakeStorage>;

  beforeEach(() => {
    storage = createFakeStorage();
    setStorage(storage); // MOCK: no usamos el localStorage real
  });
  afterEach(() => setStorage(null));

  it("READ: la primera lectura carga los datos de datos_prueba.json y los guarda", () => {
    const products = readAll("products");
    expect(products.length).toBeGreaterThan(0);
    expect(storage.setItem).toHaveBeenCalledWith("colli:products", jasmine.any(String));
  });

  it("CREATE: agrega un registro con id nuevo y lo persiste", () => {
    const before = readAll("blogs").length;
    const nuevo = create("blogs", { titulo: "Nuevo", fecha: "2026-10-01", resumen: "r", contenido: "c" });
    expect(readAll("blogs").length).toBe(before + 1);
    expect(getById("blogs", nuevo.id)?.titulo).toBe("Nuevo");
  });

  it("UPDATE: cambia solo los campos indicados", () => {
    const original = readAll("products")[0];
    update("products", original.id, { stock: 99 });
    const actualizado = getById("products", original.id)!;
    expect(actualizado.stock).toBe(99);
    expect(actualizado.nombre).toBe(original.nombre);
  });

  it("UPDATE: devuelve undefined si el id no existe", () => {
    expect(update("products", "no-existe", { stock: 1 })).toBeUndefined();
  });

  it("DELETE: elimina el registro y avisa si no existía", () => {
    const id = readAll("products")[0].id;
    expect(remove("products", id)).toBeTrue();
    expect(getById("products", id)).toBeUndefined();
    expect(remove("products", id)).toBeFalse();
  });
});
