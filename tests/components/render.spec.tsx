import ActionButton from "@/components/ActionButton";
import AlertMessage from "@/components/AlertMessage";
import ProductList from "@/components/ProductList";
import { polera, poleraOferta } from "../fixtures";
import { click, render } from "../helpers";

describe("Pruebas de renderizado", () => {
  it("ProductList dibuja una tarjeta por cada producto", () => {
    const { container, unmount } = render(<ProductList products={[polera, poleraOferta]} onAdd={() => {}} />);
    expect(container.querySelectorAll("[data-testid='product-card']").length).toBe(2);
    unmount();
  });

  it("AlertMessage solo se muestra cuando hay un error", () => {
    const sinError = render(<AlertMessage message="" />);
    expect(sinError.container.querySelector(".alert")).toBeNull();
    sinError.unmount();

    const conError = render(<AlertMessage message="Algo falló" />);
    expect(conError.container.querySelector(".alert")?.textContent).toBe("Algo falló");
    conError.unmount();
  });

  it("ActionButton recibe la etiqueta y la función onClick por props", () => {
    const onClick = jasmine.createSpy("onClick");
    const { container, unmount } = render(<ActionButton label="Comprar" onClick={onClick} />);
    const button = container.querySelector("button")!;
    expect(button.textContent).toBe("Comprar");
    click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    unmount();
  });
});
