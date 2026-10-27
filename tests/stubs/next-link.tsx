import type { AnchorHTMLAttributes, ReactNode } from "react";

/** Reemplazo de next/link para las pruebas: un <a> normal. */
export default function Link({ href, children, ...rest }: { href: string; children?: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
