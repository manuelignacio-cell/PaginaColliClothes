"use client";
import { useRouter } from "next/navigation";
import AppLink from "@/components/AppLink";
import RegisterForm from "@/components/RegisterForm";
import { register } from "@/lib/auth";

export default function Registro() {
  const router = useRouter();
  return (
    <div className="col-lg-5 mx-auto">
      <h1 className="h3 mb-3">Crear cuenta</h1>
      <RegisterForm
        onRegister={(data) => {
          const result = register(data);
          if (!result.ok) return result.error;
          router.push("/");
        }}
      />
      <p className="mt-3 small">¿Ya tienes cuenta? <AppLink href="/login">Iniciar sesión</AppLink></p>
    </div>
  );
}
