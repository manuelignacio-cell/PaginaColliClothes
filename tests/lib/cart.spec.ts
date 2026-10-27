import { addItem } from "@/lib/cart";
import { poleraOferta } from "../fixtures";

describe("carrito (lógica)", () => {
  it("no permite superar el stock disponible", () => {
    const result = addItem([], poleraOferta, 10); // stock = 3
    expect(result[0].cantidad).toBe(3);
  });
});
