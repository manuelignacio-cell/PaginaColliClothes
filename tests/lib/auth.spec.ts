import { currentUser, login, logout, register } from "@/lib/auth";
import { setStorage } from "@/lib/db";
import { effectivePrice, formatCLP, isCritical, isValidEmail } from "@/lib/format";
import { polera, poleraOferta } from "../fixtures";
import { createFakeStorage } from "../helpers";

describe("auth (registro e inicio de sesión)", () => {
  beforeEach(() => setStorage(createFakeStorage()));
  afterEach(() => setStorage(null));

  it("registra un cliente nuevo y deja la sesión iniciada", () => {
    const result = register({ nombre: "Ana", apellido: "Soto", correo: "ana@correo.cl", clave: "secreta1" });
    expect(result.ok).toBeTrue();
    expect(currentUser()?.correo).toBe("ana@correo.cl");
    expect(currentUser()?.rol).toBe("cliente");
  });

  it("rechaza correos repetidos y claves cortas", () => {
    expect(register({ nombre: "A", apellido: "B", correo: "cliente@correo.cl", clave: "123456" }).error).toContain("Ya existe");
    expect(register({ nombre: "A", apellido: "B", correo: "x@y.cl", clave: "123" }).ok).toBeFalse();
  });

  it("login correcto e incorrecto, y logout", () => {
    expect(login("admin@colliclothes.cl", "mala").ok).toBeFalse();
    expect(login("admin@colliclothes.cl", "admin123").user?.rol).toBe("admin");
    logout();
    expect(currentUser()).toBeUndefined();
  });
});

describe("format (utilidades)", () => {
  it("valida correos", () => {
    expect(isValidEmail("a@b.cl")).toBeTrue();
    expect(isValidEmail("a@b")).toBeFalse();
  });

  it("precio efectivo, formato CLP y stock crítico", () => {
    expect(effectivePrice(polera)).toBe(8000);
    expect(effectivePrice(poleraOferta)).toBe(6000);
    expect(formatCLP(8000)).toContain("8");
    expect(isCritical({ stock: 5, stockCritico: 5 })).toBeTrue();
    expect(isCritical({ stock: 6, stockCritico: 5 })).toBeFalse();
  });
});
