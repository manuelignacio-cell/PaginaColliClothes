"use client";
import AppLink from "@/components/AppLink";
import StatCard from "@/components/admin/StatCard";
import { formatCLP, isCritical } from "@/lib/format";
import { useCollection } from "@/lib/hooks";

const ACCESOS = [
  ["/admin/ordenes", "Órdenes", "Seguimiento de todas las compras realizadas."],
  ["/admin/productos", "Productos", "Administrar inventario y detalle de productos."],
  ["/admin/categorias", "Categorías", "Organizar productos en categorías."],
  ["/admin/usuarios", "Usuarios", "Gestión de cuentas y roles."],
  ["/admin/reportes", "Reportes", "Informes de ventas e inventario."],
  ["/admin/perfil", "Perfil", "Tu información de cuenta."],
];

export default function Dashboard() {
  const [orders] = useCollection("orders");
  const [products] = useCollection("products");
  const [users] = useCollection("users");
  const pagadas = orders.filter((o) => o.estado === "pagada");
  return (
    <>
      <h1 className="h3">Dashboard</h1>
      <p className="text-muted">Resumen de las actividades diarias</p>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard titulo="Compras" valor={pagadas.length} detalle={`Ventas: ${formatCLP(pagadas.reduce((s, o) => s + o.total, 0))}`} /></div>
        <div className="col-md-4"><StatCard titulo="Productos" valor={products.length} detalle={`${products.filter(isCritical).length} con stock crítico`} /></div>
        <div className="col-md-4"><StatCard titulo="Usuarios" valor={users.length} /></div>
      </div>
      <div className="row g-3">
        {ACCESOS.map(([href, titulo, texto]) => (
          <div className="col-sm-6 col-xl-4" key={href}>
            <AppLink href={href} className="text-decoration-none text-dark">
              <div className="card h-100 text-center"><div className="card-body"><h2 className="h6">{titulo}</h2><p className="small text-muted mb-0">{texto}</p></div></div>
            </AppLink>
          </div>
        ))}
      </div>
    </>
  );
}
