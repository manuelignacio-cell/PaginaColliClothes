"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/lib/hooks";

/** Solo deja ver el contenido si hay un usuario administrador con sesión iniciada. */
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, ready] = useSession();
  const allowed = user?.rol === "admin";
  useEffect(() => {
    if (ready && !allowed) router.replace("/login");
  }, [ready, allowed, router]);
  if (!ready) return <p>Cargando…</p>;
  if (!allowed) return <p>Acceso solo para administradores.</p>;
  return <>{children}</>;
}
