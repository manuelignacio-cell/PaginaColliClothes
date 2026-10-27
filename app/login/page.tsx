"use client";
import { useRouter } from "next/navigation";
import AppLink from "@/components/AppLink";
import LoginForm from "@/components/LoginForm";
import { login } from "@/lib/auth";

export default function Login() {
  const router = useRouter();
  return (
    <div className="col-lg-4 mx-auto">
      <h1 className="h3 mb-3">Iniciar sesión</h1>
      <LoginForm
        onLogin={(correo, clave) => {
          const result = login(correo, clave);
          if (!result.ok) return result.error;
          router.push(result.user?.rol === "admin" ? "/admin" : "/");
        }}
      />
      <p className="mt-3 small">¿No tienes cuenta? <AppLink href="/registro">Crear cuenta</AppLink></p>
      <p className="small text-muted">Demo — admin: admin@colliclothes.cl / admin123 · cliente: cliente@correo.cl / cliente123</p>
    </div>
  );
}
