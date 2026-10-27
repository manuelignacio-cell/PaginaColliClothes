"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/auth";
import { cartTotal } from "@/lib/cart";
import { formatCLP } from "@/lib/format";
import { useCart, useCollection, useSession } from "@/lib/hooks";
import AppLink from "./AppLink";
import SearchBox from "./SearchBox";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [cart] = useCart();
  const [user] = useSession();
  const [categories] = useCollection("categories");

  return (
    <header className="border-bottom">
      <nav className="navbar navbar-expand-lg container">
        <AppLink className="navbar-brand" href="/">
          Colli Clothes
        </AppLink>
        <button className="navbar-toggler" type="button" aria-label="Abrir menú" onClick={() => setOpen(!open)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><AppLink className="nav-link" href="/">Home</AppLink></li>
            <li className="nav-item"><AppLink className="nav-link" href="/productos">Productos</AppLink></li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle btn btn-link" type="button" onClick={() => setCatsOpen(!catsOpen)}>
                Categorías
              </button>
              <ul className={`dropdown-menu ${catsOpen ? "show" : ""}`}>
                <li><AppLink className="dropdown-item" href="/categorias" onClick={() => setCatsOpen(false)}>Todas</AppLink></li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <AppLink className="dropdown-item" href={`/categorias/${c.id}`} onClick={() => setCatsOpen(false)}>
                      {c.nombre}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item"><AppLink className="nav-link" href="/ofertas">Ofertas</AppLink></li>
            <li className="nav-item"><AppLink className="nav-link" href="/nosotros">Nosotros</AppLink></li>
            <li className="nav-item"><AppLink className="nav-link" href="/blog">Blog</AppLink></li>
            <li className="nav-item"><AppLink className="nav-link" href="/contacto">Contacto</AppLink></li>
          </ul>
          <div className="d-flex flex-column flex-lg-row gap-2 align-items-lg-center">
            <SearchBox onSearch={(q) => router.push(q ? `/productos?q=${encodeURIComponent(q)}` : "/productos")} />
            <AppLink className="btn btn-success btn-sm" href="/carrito">
              Carrito {formatCLP(cartTotal(cart))}
            </AppLink>
            {user ? (
              <>
                {user.rol === "admin" && <AppLink className="btn btn-outline-dark btn-sm" href="/admin">Admin</AppLink>}
                <span className="small text-muted">Hola, {user.nombre}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <AppLink className="btn btn-outline-primary btn-sm" href="/login">Iniciar Sesión</AppLink>
                <AppLink className="btn btn-primary btn-sm" href="/registro">Crear Cuenta</AppLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
