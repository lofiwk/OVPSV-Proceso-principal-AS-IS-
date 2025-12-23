import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

const STATES = [
  "Creada",
  "En revisión",
  "Requiere aclaración",
  "Revisión completada",
  "Recomendación emitida",
  "Notificada al Intercesor",
  "En negociación",
  "Finalizada",
];

export default function RequestState() {
  const { id } = useParams();

  const initial = useMemo(() => {
    // Para la demo: SV-001 parte en "En revisión", SV-002 en "En negociación"
    if (id === "SV-002") return "En negociación";
    return "En revisión";
  }, [id]);

  const [estado, setEstado] = useState<string>(initial);

  const advance = () => {
    const idx = Math.max(0, STATES.indexOf(estado));
    const next = STATES[Math.min(STATES.length - 1, idx + 1)];
    setEstado(next);
  };

  return (
    <div style={{ minHeight: "100vh", padding: 16, background: "#222", color: "#eee" }}>
      <h1 style={{ margin: 0, color: "#ffcc00" }}>Estados — {id}</h1>
      <p>Representación del diagrama de estados (demo local).</p>

      <ol>
        {STATES.map((s) => (
          <li
            key={s}
            style={{
              opacity: s === estado ? 1 : 0.35,
              fontWeight: s === estado ? 800 : 400,
              marginBottom: 6,
            }}
          >
            {s} {s === estado ? "← actual" : ""}
          </li>
        ))}
      </ol>

      <button onClick={advance} style={{ padding: 10, marginTop: 12 }}>
        Avanzar estado
      </button>

      <div style={{ marginTop: 16 }}>
        <Link to={`/requests/${id}`} style={{ color: "#ffcc00" }}>
          Volver al detalle
        </Link>
      </div>
      <div style={{ marginTop: 8 }}>
        <Link to="/" style={{ color: "#ffcc00" }}>
          Volver a la lista
        </Link>
      </div>
    </div>
  );
}