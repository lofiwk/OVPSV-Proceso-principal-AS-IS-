import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MisSolicitudes() {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/solicitudes');
      setSolicitudes(response.data);
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
      alert('Error de conexión. Verifique que el servidor esté activo.');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Cargando solicitudes...</div>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1>Mis Solicitudes de Protección</h1>
        <Link 
          to="/pcd/nueva-solicitud"
          style={{
            padding: '12px 24px',
            background: '#00ff66',
            color: '#000',
            textDecoration: 'none',
            borderRadius: 4,
            fontWeight: 'bold'
          }}
        >
          + Nueva Solicitud
        </Link>
      </div>

      {solicitudes.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, background: '#f5f5f5', borderRadius: 8 }}>
          <p style={{ fontSize: 18, color: '#666' }}>No tiene solicitudes registradas</p>
          <Link to="/pcd/nueva-solicitud" style={{ color: '#00ff66', fontSize: 16 }}>
            Crear primera solicitud →
          </Link>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        {solicitudes.map(sol => (
          <Link
            key={sol._id}
            to={`/pcd/solicitud/${sol._id}`}
            style={{
              display: 'block',
              padding: 20,
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: 8,
              textDecoration: 'none',
              color: '#000',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
            onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h3 style={{ margin: 0, marginBottom: 8 }}>{sol.servicioEsencial}</h3>
                <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
                  Solicitante: {sol.datosBasicos.nombre}
                </p>
                <p style={{ margin: 0, color: '#666', fontSize: 14, marginTop: 4 }}>
                  Creada: {new Date(sol.createdAt).toLocaleDateString('es-CL')}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  padding: '6px 12px',
                  background: sol.estado === 'Finalizada' ? '#00ff66' : sol.estado === 'En negociación' ? '#ffcc00' : '#e0e0e0',
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: 8
                }}>
                  {sol.estado}
                </div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {sol.actorActual}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <Link to="/" style={{ color: '#666' }}>← Volver al inicio</Link>
      </div>
    </div>
  );
}