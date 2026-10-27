"use client";
import { useParams } from "next/navigation";
import AppLink from "@/components/AppLink";
import { useCollection } from "@/lib/hooks";

export default function DetalleBlog() {
  const { id } = useParams<{ id: string }>();
  const [blogs, ready] = useCollection("blogs");
  const blog = blogs.find((b) => b.id === id);
  if (!ready) return <p>Cargando…</p>;
  if (!blog) return <p>Artículo no encontrado. <AppLink href="/blog">Volver al blog</AppLink></p>;
  return (
    <article className="col-lg-8 mx-auto">
      <p className="small text-muted">{blog.fecha}</p>
      <h1 className="h3">{blog.titulo}</h1>
      <p>{blog.contenido}</p>
      <AppLink href="/blog">← Volver al blog</AppLink>
    </article>
  );
}
