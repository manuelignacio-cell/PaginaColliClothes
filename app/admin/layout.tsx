"use client";
import { usePathname, useRouter } from "next/navigation";
import AppLink from "@/components/AppLink";
import AdminGuard from "@/components/admin/AdminGuard";
import { logout } from "@/lib/auth";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/ordenes", label: "Órdenes" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/categorias", label: "Categorías" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/reportes", label: "Reportes" },
  { href: "/admin/perfil", label: "Perfil" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <AdminGuard>
      <div className="row g-4">
        <aside className="col-md-3 col-lg-2">
          <div className="list-group mb-3">
            {LINKS.map((l) => {
              const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
              return (
                <AppLink key={l.href} href={l.href} className={`list-group-item list-group-item-action ${active ? "active" : ""}`}>
                  {l.label}
                </AppLink>
              );
            })}
          </div>
          <AppLink href="/" className="btn btn-primary w-100 mb-2">Tienda</AppLink>
          <button className="btn btn-danger w-100" onClick={() => { logout(); router.push("/"); }}>Cerrar Sesión</button>
        </aside>
        <section className="col-md-9 col-lg-10">{children}</section>
      </div>
    </AdminGuard>
  );
}
