import ActionButton from "@/components/ActionButton";
import AlertMessage from "@/components/AlertMessage";
import CartTable from "@/components/CartTable";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import ProductList from "@/components/ProductList";
import { polera, poleraOferta, lineas, sinStock } from "../fixtures";
import { buttonByText, click, render } from "../helpers";

describe("Pruebas de renderizado", () => {
  it("ProductList dibuja una tarjeta por cada producto", () => {
    const { container, unmount } = render(<ProductList products={[polera, poleraOferta]} onAdd={() => {}} />);
    expect(container.querySelectorAll("[data-testid='product-card']").length).toBe(2);
    unmount();
  });

  it("ProductList muestra el mensaje cuando no hay productos (renderizado condicional)", () => {
    const { container, unmount } = render(<ProductList products={[]} onAdd={() => {}} emptyMessage="Nada por aquí" />);
    expect(container.textContent).toContain("Nada por aquí");
    expect(container.querySelector("[data-testid='product-card']")).toBeNull();
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

  it("ProductCard muestra solo el precio, sin etiqueta Oferta ni precio tachado", () => {
    const normal = render(<ProductCard product={polera} onAdd={() => {}} />);
    expect(normal.container.querySelector(".precio")?.textContent).toContain("8");
    expect(normal.container.querySelector(".badge")).toBeNull();
    expect(normal.container.querySelector("s")).toBeNull();
    normal.unmount();

    // Producto en oferta: se muestra solo el precio que se paga (6000), sin etiqueta ni precio tachado
    const oferta = render(<ProductCard product={poleraOferta} onAdd={() => {}} />);
    expect(oferta.container.querySelector(".precio")?.textContent).toContain("6");
    expect(oferta.container.querySelector(".badge")).toBeNull();
    expect(oferta.container.querySelector("s")).toBeNull();
    oferta.unmount();
  });

  it("CartTable en modo lectura no muestra botones de acciones", () => {
    const { container, unmount } = render(<CartTable items={lineas} />);
    expect(container.querySelectorAll("button").length).toBe(0);
    expect(container.querySelector(".total")?.textContent).toContain("22");
    unmount();
  });

  it("CategoryFilter marca como activa la categoría seleccionada", () => {
    const cats = [{ id: "poleras", nombre: "Poleras", descripcion: "", img: "" }];
    const { container, unmount } = render(<CategoryFilter categories={cats} selected="poleras" onSelect={() => {}} />);
    expect(buttonByText(container, "Poleras").className).toContain("active");
    expect(buttonByText(container, "Todas").className).not.toContain("active");
    unmount();
  });

  it("ProductCard deshabilita el botón si no hay stock", () => {
    const { container, unmount } = render(<ProductCard product={sinStock} onAdd={() => {}} />);
    expect(buttonByText(container, "Sin stock").disabled).toBeTrue();
    unmount();
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
