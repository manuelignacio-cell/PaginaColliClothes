import { getById, readAll, setStorage } from "@/lib/db";
import { placeOrder } from "@/lib/orders";
import { createFakeStorage } from "../helpers";

describe("orders (compra y stock)", () => {
  const cliente = {
    nombre: "Pedro", apellido: "Soto", correo: "p@x.cl",
    direccion: { calle: "Los Olmos 1", depto: "", region: "Región del Biobío", comuna: "Concepción", indicaciones: "" },
  };
  const items = [{ productId: "1", nombre: "Polera Básica", precio: 8990, cantidad: 2, categoria: "poleras" }];

  beforeEach(() => setStorage(createFakeStorage()));
  afterEach(() => setStorage(null));

  it("pago con error: guarda la orden como fallida y NO descuenta el stock", () => {
    const stockAntes = getById("products", "1")!.stock;
    const order = placeOrder(cliente, items, null, false);
    expect(order.estado).toBe("fallida");
    expect(getById("products", "1")!.stock).toBe(stockAntes);
    expect(readAll("orders").length).toBe(1);
  });
});
