import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 20
    }}>
      <div style={{ maxWidth: 800, textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontSize: 48, margin: 0, marginBottom: 20 }}>OVPSV</h1>
        <h2 style={{ fontSize: 24, fontWeight: 300, marginBottom: 40 }}>
          Oficina Virtual de Protección y Sustentación Vital
        </h2>
        <p style={{ fontSize: 18, marginBottom: 60, opacity: 0.9 }}>
          Protegiendo el acceso a servicios esenciales para personas en situación de vulnerabilidad
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 30,
          marginTop: 40
        }}>
          {/* Tarjeta PcD */}
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            padding: 40,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ fontSize: 24, marginBottom: 20 }}>Soy Persona con Discapacidad</h3>
            <p style={{ marginBottom: 30, opacity: 0.9 }}>
              Solicite protección para mantener sus servicios esenciales
            </p>
            <Link 
              to="/pcd/nueva-solicitud"
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                background: '#00ff66',
                color: '#000',
                textDecoration: 'none',
                borderRadius: 8,
                fontWeight: 'bold',
                fontSize: 16
              }}
            >
              Nueva Solicitud
            </Link>
            <Link
              to="/pcd/mis-solicitudes"
              style={{
                display: 'block',
                marginTop: 15,
                color: '#fff',
                textDecoration: 'underline'
              }}
            >
              Ver mis solicitudes
            </Link>
          </div>

          {/* Tarjeta Intercesor */}
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            padding: 40,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ fontSize: 24, marginBottom: 20 }}>Soy Intercesor</h3>
            <p style={{ marginBottom: 30, opacity: 0.9 }}>
              Gestione negociaciones de planes flexibles con proveedores
            </p>
            <Link 
              to="/intercesor/casos"
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                background: '#ffcc00',
                color: '#000',
                textDecoration: 'none',
                borderRadius: 8,
                fontWeight: 'bold',
                fontSize: 16
              }}
            >
              Ver Casos Asignados
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}