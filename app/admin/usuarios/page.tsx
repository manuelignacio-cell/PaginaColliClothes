"use client";
import AppLink from "@/components/AppLink";
import { remove } from "@/lib/db";
import { useCollection } from "@/lib/hooks";
import { useSession } from "@/lib/hooks";

export default function AdminUsuarios() {
  const [users] = useCollection("users");
  const [me] = useSession();
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Usuarios</h1>
        <AppLink href="/admin/usuarios/nuevo" className="btn btn-primary btn-sm">Nuevo usuario</AppLink>
      </div>
      <table className="table table-sm align-middle">
        <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th /></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre} {u.apellido}</td><td>{u.correo}</td><td>{u.rol}</td>
              <td className="text-end">
                <AppLink href={`/admin/usuarios/${u.id}/historial`} className="btn btn-outline-secondary btn-sm me-1">Historial de compras</AppLink>
                <AppLink href={`/admin/usuarios/${u.id}`} className="btn btn-outline-primary btn-sm me-1">Editar</AppLink>
                <button className="btn btn-outline-danger btn-sm" disabled={me?.id === u.id} onClick={() => { if (window.confirm(`¿Eliminar a ${u.nombre}?`)) remove("users", u.id); }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
