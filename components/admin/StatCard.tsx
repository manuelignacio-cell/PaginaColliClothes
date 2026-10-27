interface StatCardProps {
  titulo: string;
  valor: string | number;
  detalle?: string;
}

export default function StatCard({ titulo, valor, detalle }: StatCardProps) {
  return (
    <div className={`card h-100`}>
      <div className="card-body">
        <p className="mb-1 small">{titulo}</p>
        <p className="h3 mb-1">{valor}</p>
        {detalle && <p className="small mb-0">{detalle}</p>}
      </div>
    </div>
  );
}
