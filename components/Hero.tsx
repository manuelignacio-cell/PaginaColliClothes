import AppLink from "./AppLink";

export default function Hero() {
  return (
    <div className="text-center my-4">
      <h1>Bienvenido a Colli Clothes</h1>
      <p>Tienda de ropa. Mira nuestras ofertas.</p>
      <AppLink className="btn btn-primary" href="/ofertas">Ver ofertas</AppLink>
    </div>
  );
}
