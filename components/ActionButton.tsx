interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant?: string;
  disabled?: boolean;
}

/** Botón genérico: recibe la etiqueta y la función onClick por props. */
export default function ActionButton({ label, onClick, variant = "dark", disabled = false }: ActionButtonProps) {
  return (
    <button type="button" className={`btn btn-${variant}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
