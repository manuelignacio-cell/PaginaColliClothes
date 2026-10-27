import { act } from "react";
import type { ReactElement } from "react";
import { createRoot } from "react-dom/client";

(globalThis as unknown as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;

/** Dibuja un componente en un div real del DOM y devuelve utilidades para consultarlo. */
export function render(ui: ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(ui));
  return {
    container,
    unmount() {
      act(() => root.unmount());
      container.remove();
    },
  };
}

export function click(element: Element | null) {
  if (!element) throw new Error("No se encontró el elemento para hacer clic");
  act(() => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

/** Simula que el usuario escribe en un input/textarea. */
export function type(element: HTMLInputElement | HTMLTextAreaElement | null, value: string) {
  if (!element) throw new Error("No se encontró el campo");
  const proto = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")!.set!;
  act(() => {
    setter.call(element, value);
    element.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

export function submit(form: Element | null) {
  if (!form) throw new Error("No se encontró el formulario");
  act(() => {
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
}

export function buttonByText(container: HTMLElement, text: string): HTMLButtonElement {
  const found = Array.from(container.querySelectorAll("button")).find((b) => b.textContent?.includes(text));
  if (!found) throw new Error(`No hay un botón con el texto "${text}"`);
  return found;
}

/** localStorage falso en memoria: evita tocar el navegador real y permite espiar llamadas. */
export function createFakeStorage(initial: Record<string, string> = {}) {
  const data: Record<string, string> = { ...initial };
  return {
    data,
    getItem: jasmine.createSpy("getItem").and.callFake((k: string) => (k in data ? data[k] : null)),
    setItem: jasmine.createSpy("setItem").and.callFake((k: string, v: string) => { data[k] = v; }),
    removeItem: jasmine.createSpy("removeItem").and.callFake((k: string) => { delete data[k]; }),
  };
}
