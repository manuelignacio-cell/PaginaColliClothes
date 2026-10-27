"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertMessage from "@/components/AlertMessage";
import UserForm from "@/components/admin/UserForm";
import { create, readAll } from "@/lib/db";

export default function NuevoUsuario() {
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <>
      <h1 className="h3 mb-3">Nuevo usuario</h1>
      <AlertMessage message={error} />
      <UserForm
        onSave={(data) => {
          if (readAll("users").some((u) => u.correo.toLowerCase() === data.correo.toLowerCase())) return setError("Ya existe un usuario con ese correo.");
          create("users", data);
          router.push("/admin/usuarios");
        }}
      />
    </>
  );
}
