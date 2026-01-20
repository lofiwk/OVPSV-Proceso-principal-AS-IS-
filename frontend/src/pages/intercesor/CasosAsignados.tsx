import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CasosAsignados() {
  const [casos, setCasos] = useState<any[]>([]);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    cargarCasos();
  }, []);

  const cargarCasos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/solicitudes');
      setCasos(response.data);
    } catch (error) {
      console.error('Error al cargar casos:', error);
    }
  };

  const casosFiltrados = casos.filter(caso => {
    if (filtro === 'todos') return true;
    if (filtro === 'negociacion') return caso.estado === 'En negociación';
    if (filtro === 'revision') return caso.estado === 'En revisión' || caso.estado === 'Revisión completada';
    return true;
  });

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 20 }}>
      <div style={{ marginBottom: 30 }}>
        <h1>Casos Asignados - Intercesor</h1>
        <p style={{ color: '#666' }}>Gestione las negociaciones de planes flexibles con proveedores</p>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {[
          { key: 'todos', label: 'Todos' },
          { key: 'negociacion', label: 'En negociación' },
          { key: 'revision', label: 'En revisión' }
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            style={{
              padding: '10px 20px',
              background: filtro === f.key ? '#ffcc00' : '#f5f5f5',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: filtro === f.key ? 'bold' : 'normal'
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista de casos */}
      <div style={{ display: 'grid', gap: 15 }}>
        {casosFiltrados.map(caso => (
          <div
            key={caso._id}
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 20
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, marginBottom: 8 }}>
                  {caso.datosBasicos.nombre} - {caso.servicioEsencial}
                </h3>
                <p style={{ margin: 0, color: '#666', fontSize: 14, marginBottom: 4 }}>
                  Email: {caso.datosBasicos.email}
                </p>
                <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
                  Creado: {new Date(caso.createdAt).toLocaleDateString('es-CL')}
                </p>
                {caso.contexto && (
                  <p style={{ marginTop: 10, padding: 10, background: '#f5f5f5', borderRadius: 4, fontSize: 14 }}>
                    {caso.contexto}
                  </p>
                )}
              </div>
              <div style={{ marginLeft: 20 }}>
                <div style={{
                  padding: '8px 16px',
                  background: caso.estado === 'En negociación' ? '#ffcc00' : '#e0e0e0',
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 'bold',
                  marginBottom: 15,
                  textAlign: 'center'
                }}>
                  {caso.estado}
                </div>
                {caso.estado === 'En negociación' && (
                  <Link
                    to={`/intercesor/caso/${caso._id}/negociar`}
                    style={{
                      display: 'block',
                      padding: '10px 20px',
                      background: '#00ff66',
                      color: '#000',
                      textDecoration: 'none',
                      borderRadius: 4,
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}
                  >
                    Gestionar →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {casosFiltrados.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, background: '#f5f5f5', borderRadius: 8 }}>
          <p style={{ fontSize: 18, color: '#666' }}>No hay casos con el filtro seleccionado</p>
        </div>
      )}

      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <Link to="/" style={{ color: '#666' }}>← Volver al inicio</Link>
      </div>
    </div>
  );
}