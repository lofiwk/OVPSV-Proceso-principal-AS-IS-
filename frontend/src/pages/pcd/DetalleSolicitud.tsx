import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function DetalleSolicitud() {
  const { id } = useParams();
  const [solicitud, setSolicitud] = useState<any>(null);
  const [negociaciones, setNegociaciones] = useState<any[]>([]);

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const cargarDatos = async () => {
    try {
      const [resSol, resNeg] = await Promise.all([
        axios.get(`http://localhost:3000/solicitudes/${id}`),
        axios.get(`http://localhost:3000/solicitudes/${id}/negociaciones`)
      ]);
      setSolicitud(resSol.data);
      setNegociaciones(resNeg.data);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  if (!solicitud) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Cargando...</div>;
  }

  const estadosOrdenados = [
    'Creada',
    'En revisión',
    'Revisión completada',
    'Recomendación emitida',
    'Notificada al Intercesor',
    'En negociación',
    'Finalizada'
  ];

  const indiceActual = estadosOrdenados.indexOf(solicitud.estado);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
      <Link to="/pcd/mis-solicitudes" style={{ color: '#666', textDecoration: 'none' }}>
        ← Volver a mis solicitudes
      </Link>

      <h1 style={{ marginTop: 20 }}>Detalle de Solicitud</h1>

      {/* Estado actual destacado */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        padding: 30,
        borderRadius: 8,
        marginBottom: 30
      }}>
        <h2 style={{ margin: 0, marginBottom: 10 }}>Estado Actual: {solicitud.estado}</h2>
        <p style={{ margin: 0, opacity: 0.9 }}>Responsable: {solicitud.actorActual}</p>
      </div>

      {/* Información básica */}
      <div style={{ background: '#f5f5f5', padding: 20, borderRadius: 8, marginBottom: 30 }}>
        <h3>Información de la Solicitud</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
          <div>
            <strong>Servicio Esencial:</strong>
            <p>{solicitud.servicioEsencial}</p>
          </div>
          <div>
            <strong>Nombre:</strong>
            <p>{solicitud.datosBasicos.nombre}</p>
          </div>
          <div>
            <strong>Email:</strong>
            <p>{solicitud.datosBasicos.email}</p>
          </div>
          <div>
            <strong>Teléfono:</strong>
            <p>{solicitud.datosBasicos.telefono}</p>
          </div>
        </div>
        {solicitud.contexto && (
          <div style={{ marginTop: 15 }}>
            <strong>Contexto:</strong>
            <p>{solicitud.contexto}</p>
          </div>
        )}
      </div>

      {/* Progreso del proceso */}
      <div style={{ marginBottom: 30 }}>
        <h3>Progreso del Proceso</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {estadosOrdenados.map((estado, idx) => {
            const completado = idx <= indiceActual;
            const actual = idx === indiceActual;
            
            return (
              <div 
                key={estado}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  padding: 15,
                  background: actual ? '#e8f5e9' : completado ? '#f5f5f5' : '#fff',
                  border: `2px solid ${actual ? '#00ff66' : completado ? '#ddd' : '#eee'}`,
                  borderRadius: 8
                }}
              >
                <div style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: completado ? '#00ff66' : '#ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {completado ? '✓' : idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <strong>{estado}</strong>
                  {actual && <span style={{ marginLeft: 10, color: '#00a152' }}>← Usted está aquí</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Negociaciones */}
      {negociaciones.length > 0 && (
        <div>
          <h3>Historial de Negociaciones</h3>
          <p style={{ color: '#666', marginBottom: 15 }}>
            El Intercesor está negociando un plan flexible con el proveedor de su servicio.
          </p>
          {negociaciones.map((neg, idx) => (
            <div 
              key={neg._id}
              style={{
                background: '#fff',
                border: '1px solid #ddd',
                padding: 15,
                borderRadius: 8,
                marginBottom: 10
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <strong>Intento #{neg.numeroIntento}</strong>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: 4,
                  fontSize: 14,
                  background: 
                    neg.estadoNegociacion === 'Aceptada' ? '#00ff66' :
                    neg.estadoNegociacion === 'Rechazada' ? '#ffcdd2' :
                    '#fff9c4'
                }}>
                  {neg.estadoNegociacion}
                </span>
              </div>
              <p style={{ fontSize: 14, color: '#666' }}>
                Enviado: {new Date(neg.fechaEnvio).toLocaleDateString('es-CL')}
              </p>
              {neg.estadoNegociacion === 'En espera' && (
                <p style={{ marginTop: 10, color: '#666', fontStyle: 'italic' }}>
                  Esperando respuesta del proveedor...
                </p>
              )}
              {neg.estadoNegociacion === 'Aceptada' && (
                <p style={{ marginTop: 10, color: '#00a152', fontWeight: 'bold' }}>
                  ✓ El proveedor aceptó la propuesta. Su servicio está protegido.
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Mensaje final según estado */}
      {solicitud.estado === 'Finalizada' && (
        <div style={{
          background: '#e8f5e9',
          border: '2px solid #00ff66',
          padding: 20,
          borderRadius: 8,
          marginTop: 30
        }}>
          <h3 style={{ color: '#00a152', margin: 0, marginBottom: 10 }}>
            ✓ Su servicio está protegido
          </h3>
          <p style={{ margin: 0 }}>
            Se ha alcanzado un acuerdo con el proveedor. Su servicio esencial continuará sin interrupciones.
          </p>
        </div>
      )}

      {solicitud.estado === 'En negociación' && (
        <div style={{
          background: '#fff9c4',
          border: '2px solid #ffcc00',
          padding: 20,
          borderRadius: 8,
          marginTop: 30
        }}>
          <h3 style={{ color: '#f57c00', margin: 0, marginBottom: 10 }}>
            ⏳ Negociación en curso
          </h3>
          <p style={{ margin: 0 }}>
            El Intercesor está trabajando con el proveedor para garantizar la continuidad de su servicio.
            Le notificaremos cuando haya novedades.
          </p>
        </div>
      )}
    </div>
  );
}