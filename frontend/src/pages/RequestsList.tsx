import { Link } from "react-router-dom";

type Req = {
  id: string;
  servicioEsencial: string;
  estado: string;
  actorActual: string;
  updatedAt: string;
};

const DEMO: Req[] = [
  {
    id: "SV-001",
    servicioEsencial: "Electricidad",
    estado: "En revisión",
    actorActual: "Curador Vital",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "SV-002",
    servicioEsencial: "Agua",
    estado: "En negociación",
    actorActual: "Intercesor",
    updatedAt: new Date().toISOString(),
  },
];

export default function RequestsList() {
  return (
    <div style={{ minHeight: "100vh", padding: 16, background: "#111", color: "#eee" }}>
      <h1 style={{ margin: 0, color: "#00ff66" }}>OVPSV — Solicitudes</h1>
      <p style={{ marginTop: 8, color: "#ff3b3b" }}>
        Diseño deliberadamente simple (foco: datos).
      </p>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #444" }}>ID</th>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #444" }}>Servicio</th>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #444" }}>Estado</th>
            <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #444" }}>Actor</th>
          </tr>
        </thead>
        <tbody>
          {DEMO.map((r) => (
            <tr key={r.id}>
              <td style={{ padding: 8 }}>
                <Link to={`/requests/${r.id}`} style={{ color: "#00ff66" }}>
                  {r.id}
                </Link>
              </td>
              <td style={{ padding: 8 }}>{r.servicioEsencial}</td>
              <td style={{ padding: 8 }}>{r.estado}</td>
              <td style={{ padding: 8 }}>{r.actorActual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}