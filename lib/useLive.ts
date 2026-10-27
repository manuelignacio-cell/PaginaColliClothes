"use client";
import { useEffect, useState } from "react";
import { CHANGE_EVENT } from "./db";

/**
 * Lee datos de localStorage y se vuelve a renderizar cuando cambian.
 * Empieza con `initial` (igual en servidor y cliente) para evitar errores de hidratación.
 */
export function useLive<T>(read: () => T, initial: T): [T, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const refresh = () => setValue(read());
    refresh();
    setReady(true);
    window.addEventListener(CHANGE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CHANGE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [value, ready];
}
