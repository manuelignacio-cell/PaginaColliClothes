import { create, getById, readAll, remove, setStorage } from "@/lib/db";
import { createFakeStorage } from "../helpers";

describe("db (CRUD sobre localStorage simulado)", () => {
  let storage: ReturnType<typeof createFakeStorage>;

  beforeEach(() => {
    storage = createFakeStorage();
    setStorage(storage); // MOCK: no usamos el localStorage real
  });
  afterEach(() => setStorage(null));

  it("CREATE: agrega un registro con id nuevo y lo persiste", () => {
    const before = readAll("blogs").length;
    const nuevo = create("blogs", { titulo: "Nuevo", fecha: "2026-10-01", resumen: "r", contenido: "c" });
    expect(readAll("blogs").length).toBe(before + 1);
    expect(getById("blogs", nuevo.id)?.titulo).toBe("Nuevo");
  });

  it("DELETE: elimina el registro y avisa si no existía", () => {
    const id = readAll("products")[0].id;
    expect(remove("products", id)).toBeTrue();
    expect(getById("products", id)).toBeUndefined();
    expect(remove("products", id)).toBeFalse();
  });
});
