import Link from "next/link";
import type { ComponentProps } from "react";

/** Envoltorio de next/link (en las pruebas se reemplaza por un <a> simple). */
export default function AppLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} />;
}
