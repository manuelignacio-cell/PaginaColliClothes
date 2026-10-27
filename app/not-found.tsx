import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1>404</h1>
      <p>No encontramos lo que buscas.</p>
      <Link href="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  );
}
