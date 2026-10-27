"use client";
import AppLink from "@/components/AppLink";
import { useCollection } from "@/lib/hooks";

export default function Blog() {
  const [blogs] = useCollection("blogs");
  return (
    <>
      <h1 className="h3 mb-3">Blog</h1>
      <div className="row g-3">
        {blogs.map((b) => (
          <div className="col-md-6" key={b.id}>
            <div className="card h-100">
              <div className="card-body">
                <p className="small text-muted mb-1">{b.fecha}</p>
                <h2 className="h5">{b.titulo}</h2>
                <p>{b.resumen}</p>
                <AppLink href={`/blog/${b.id}`}>Leer más</AppLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
