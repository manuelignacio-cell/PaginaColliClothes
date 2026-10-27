import { addItem, cartCount, cartTotal, changeQuantity, removeItem } from "@/lib/cart";
import { polera, poleraOferta, lineas } from "../fixtures";

describe("carrito (lógica)", () => {
  it("agrega un producto nuevo con cantidad 1", () => {
    const result = addItem([], polera);
    expect(result.length).toBe(1);
    expect(result[0].cantidad).toBe(1);
  });

  it("si el producto ya está, suma la cantidad en vez de duplicarlo", () => {
    const result = addItem(addItem([], polera), polera);
    expect(result.length).toBe(1);
    expect(result[0].cantidad).toBe(2);
  });

  it("no permite superar el stock disponible", () => {
    const result = addItem([], poleraOferta, 10); // stock = 3
    expect(result[0].cantidad).toBe(3);
  });

  it("usa el precio de oferta cuando el producto está en oferta", () => {
    expect(addItem([], poleraOferta)[0].precio).toBe(6000);
  });

  it("changeQuantity con 0 elimina la línea", () => {
    expect(changeQuantity(lineas, "1", 0).length).toBe(1);
  });

  it("removeItem quita solo el producto indicado", () => {
    expect(removeItem(lineas, "2").map((l) => l.productId)).toEqual(["1"]);
  });

  it("calcula el total y la cantidad de unidades", () => {
    expect(cartTotal(lineas)).toBe(22000); // 8000*2 + 6000
    expect(cartCount(lineas)).toBe(3);
  });
});
