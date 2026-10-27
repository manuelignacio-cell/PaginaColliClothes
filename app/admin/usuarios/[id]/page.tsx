"use client";
import { useParams, useRouter } from "next/navigation";
import UserForm from "@/components/admin/UserForm";
import { update } from "@/lib/db";
import { useCollection } from "@/lib/hooks";

export default function EditarUsuario() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [users, ready] = useCollection("users");
  const user = users.find((u) => u.id === id);
  if (!ready) return <p>Cargando…</p>;
  if (!user) return <p>Usuario no encontrado.</p>;
  const { id: _id, ...data } = user;
  void _id;
  return (
    <>
      <h1 className="h3 mb-3">Editar usuario</h1>
      <UserForm initial={data} onSave={(changes) => { update("users", id, changes); router.push("/admin/usuarios"); }} />
    </>
  );
}
