import type { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

/** "" = todas las categorías */
export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="btn-group flex-wrap" role="group" aria-label="Filtrar por categoría">
      <button type="button" className={`btn btn-outline-dark ${selected === "" ? "active" : ""}`} onClick={() => onSelect("")}>
        Todas
      </button>
      {categories.map((c) => (
        <button
          type="button"
          key={c.id}
          className={`btn btn-outline-dark ${selected === c.id ? "active" : ""}`}
          onClick={() => onSelect(c.id)}
        >
          {c.nombre}
        </button>
      ))}
    </div>
  );
}
