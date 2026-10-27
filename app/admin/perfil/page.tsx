"use client";
import { useState } from "react";
import AlertMessage from "@/components/AlertMessage";
import UserForm from "@/components/admin/UserForm";
import { update } from "@/lib/db";
import { useSession } from "@/lib/hooks";

export default function Perfil() {
  const [user] = useSession();
  const [ok, setOk] = useState("");
  if (!user) return null;
  const { id, ...data } = user;
  return (
    <>
      <h1 className="h3 mb-3">Mi perfil</h1>
      <AlertMessage message={ok} type="success" />
      <UserForm initial={data} onSave={(changes) => { update("users", id, changes); setOk("Perfil actualizado."); }} />
    </>
  );
}
