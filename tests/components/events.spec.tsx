import CartTable from "@/components/CartTable";
import CategoryFilter from "@/components/CategoryFilter";
import ContactForm from "@/components/ContactForm";
import LoginForm from "@/components/LoginForm";
import ProductCard from "@/components/ProductCard";
import { polera, lineas } from "../fixtures";
import { buttonByText, click, render, submit, type } from "../helpers";

describe("Pruebas de eventos y estado", () => {
  it("ProductCard: al hacer clic en Añadir llama a onAdd con el producto", () => {
    const onAdd = jasmine.createSpy("onAdd");
    const { container, unmount } = render(<ProductCard product={polera} onAdd={onAdd} />);
    click(buttonByText(container, "Añadir"));
    expect(onAdd).toHaveBeenCalledWith(polera);
    unmount();
  });

  it("CartTable: los botones + / - y Eliminar llaman a sus funciones", () => {
    const onQuantity = jasmine.createSpy("onQuantity");
    const onRemove = jasmine.createSpy("onRemove");
    const { container, unmount } = render(<CartTable items={lineas} onQuantity={onQuantity} onRemove={onRemove} />);
    click(container.querySelector("[aria-label='Agregar uno de Polera Básica']"));
    expect(onQuantity).toHaveBeenCalledWith("1", 3);
    click(container.querySelector("[aria-label='Quitar uno de Polera Básica']"));
    expect(onQuantity).toHaveBeenCalledWith("1", 1);
    click(buttonByText(container, "Eliminar"));
    expect(onRemove).toHaveBeenCalledWith("1");
    unmount();
  });

  it("CategoryFilter: al hacer clic avisa qué categoría se eligió", () => {
    const onSelect = jasmine.createSpy("onSelect");
    const cats = [{ id: "polerones", nombre: "Polerones", descripcion: "", img: "" }];
    const { container, unmount } = render(<CategoryFilter categories={cats} selected="" onSelect={onSelect} />);
    click(buttonByText(container, "Polerones"));
    expect(onSelect).toHaveBeenCalledWith("polerones");
    unmount();
  });

  it("ContactForm: el estado del formulario cambia cuando el usuario escribe", () => {
    const { container, unmount } = render(<ContactForm />);
    const nombre = container.querySelector<HTMLInputElement>("#c-nombre")!;
    type(nombre, "Camila");
    expect(nombre.value).toBe("Camila");
    unmount();
  });

  it("ContactForm: muestra error con correo inválido y no envía", () => {
    const onSubmit = jasmine.createSpy("onSubmit");
    const { container, unmount } = render(<ContactForm onSubmit={onSubmit} />);
    type(container.querySelector("#c-nombre"), "Camila");
    type(container.querySelector("#c-correo"), "correo-malo");
    type(container.querySelector("#c-mensaje"), "Hola");
    submit(container.querySelector("form"));
    expect(container.querySelector(".alert-danger")?.textContent).toContain("correo válido");
    expect(onSubmit).not.toHaveBeenCalled();
    unmount();
  });

  it("ContactForm: con datos válidos envía, confirma y limpia los campos", () => {
    const onSubmit = jasmine.createSpy("onSubmit");
    const { container, unmount } = render(<ContactForm onSubmit={onSubmit} />);
    type(container.querySelector("#c-nombre"), "Camila");
    type(container.querySelector("#c-correo"), "cami@correo.cl");
    type(container.querySelector("#c-mensaje"), "Quiero una talla M");
    submit(container.querySelector("form"));
    expect(onSubmit).toHaveBeenCalledWith({ nombre: "Camila", correo: "cami@correo.cl", mensaje: "Quiero una talla M" });
    expect(container.querySelector(".alert-success")).not.toBeNull();
    expect(container.querySelector<HTMLInputElement>("#c-nombre")!.value).toBe("");
    unmount();
  });

  it("LoginForm: muestra el error que devuelve onLogin (función simulada)", () => {
    const onLogin = jasmine.createSpy("onLogin").and.returnValue("Correo o contraseña incorrectos.");
    const { container, unmount } = render(<LoginForm onLogin={onLogin} />);
    type(container.querySelector("#l-correo"), "x@y.cl");
    type(container.querySelector("#l-clave"), "mala");
    submit(container.querySelector("form"));
    expect(onLogin).toHaveBeenCalledWith("x@y.cl", "mala");
    expect(container.querySelector(".alert-danger")?.textContent).toContain("incorrectos");
    unmount();
  });
});
