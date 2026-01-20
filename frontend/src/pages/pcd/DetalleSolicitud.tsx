import { Link, useParams } from "react-router-dom";

type Req = {
  id: string;
  servicioEsencial: string;
  estado: string;
  actorActual: string;
  updatedAt: string;
  contexto: string;
  recomendacion: string;
};

const DEMO: Record<string, Req> = {
  "SV-001": {
    id: "SV-001",
    servicioEsencial: "Electricidad",
    estado: "En revisión",
    actorActual: "Curador Vital",
    updatedAt: new Date().toISOString(),
    contexto:
      "Solicitud para evitar corte por atraso. La persona depende de continuidad del servicio por condiciones de salud.",
    recomendacion: "Priorizar continuidad del servicio mientras se valida documentación.",
  },
  "SV-002": {
    id: "SV-002",
    servicioEsencial: "Agua",
    estado: "En negociación",
    actorActual: "Intercesor",
    updatedAt: new Date().toISOString(),
    contexto:
      "Caso validado. Se negocia alternativa de pago con proveedor sin suspensión del servicio esencial.",
    recomendacion: "Proponer prórroga y plan de pagos.",
  },
};

export default function RequestDetail() {
  const { id } = useParams();
  const r = (id && DEMO[id]) || null;

  if (!r) {
    return (
      <div style={{ padding: 16 }}>
        <p>No existe la solicitud.</p>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: 16, background: "#fff", color: "#000" }}>
      <h1 style={{ margin: 0, color: "#c400ff" }}>Detalle {r.id}</h1>

      <p><b>Servicio esencial:</b> {r.servicioEsencial}</p>
      <p><b>Estado:</b> {r.estado}</p>
      <p><b>Actor actual:</b> {r.actorActual}</p>

      <hr />

      <p style={{ color: "#0a7" }}><b>Contexto:</b> {r.contexto}</p>
      <p><b>Recomendación:</b> {r.recomendacion}</p>

      <div style={{ marginTop: 16 }}>
        <Link to={`/requests/${r.id}/state`} style={{ color: "#c400ff" }}>
          Ver estados del proceso
        </Link>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/" style={{ color: "#00f" }}>Volver</Link>
      </div>
    </div>
  );
}