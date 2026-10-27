interface AlertMessageProps {
  message?: string;
  type?: "danger" | "success" | "info" | "warning";
}

/** Renderizado condicional: solo muestra el mensaje cuando existe. */
export default function AlertMessage({ message, type = "danger" }: AlertMessageProps) {
  if (!message) return null;
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
}
