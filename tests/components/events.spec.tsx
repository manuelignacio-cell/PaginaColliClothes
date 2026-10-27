import ContactForm from "@/components/ContactForm";
import LoginForm from "@/components/LoginForm";
import ProductCard from "@/components/ProductCard";
import { polera } from "../fixtures";
import { buttonByText, click, render, submit, type } from "../helpers";

describe("Pruebas de eventos y estado", () => {
  it("ProductCard: al hacer clic en Añadir llama a onAdd con el producto", () => {
    const onAdd = jasmine.createSpy("onAdd");
    const { container, unmount } = render(<ProductCard product={polera} onAdd={onAdd} />);
    click(buttonByText(container, "Añadir"));
    expect(onAdd).toHaveBeenCalledWith(polera);
    unmount();
  });

  it("ContactForm: el estado del formulario cambia cuando el usuario escribe", () => {
    const { container, unmount } = render(<ContactForm />);
    const nombre = container.querySelector<HTMLInputElement>("#c-nombre")!;
    type(nombre, "Camila");
    expect(nombre.value).toBe("Camila");
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
