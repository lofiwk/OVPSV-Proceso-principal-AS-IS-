import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function GestionarNegociacion() {
  const { id } = useParams();
  const [solicitud, setSolicitud] = useState<any>(null);
  const [negociaciones, setNegociaciones] = useState<any[]>([]);
  const [propuesta, setPropuesta] = useState('');
  const [enviando, setEnviando] = useState(false);

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

  const enviarPropuesta = async () => {
    if (!propuesta.trim()) {
      alert('Debe ingresar una propuesta');
      return;
    }

    setEnviando(true);
    try {
      await axios.post(`http://localhost:3000/solicitudes/${id}/negociaciones`, {
        intercesor: 'Juan Pérez', // En producción vendría del auth
        propuesta,
        numeroIntento: negociaciones.length + 1
      });

      setPropuesta('');
      alert('Propuesta enviada al proveedor');
      await cargarDatos();
    } catch (error) {
      console.error('Error al enviar propuesta:', error);
      alert('Error al enviar la propuesta');
    } finally {
      setEnviando(false);
    }
  };

  const registrarRespuesta = async (negId: string, aceptada: boolean) => {
    const respuesta = prompt('Ingrese la respuesta del proveedor:');
    if (!respuesta) return;

    try {
      await axios.patch(
        `http://localhost:3000/solicitudes/negociaciones/${negId}/respuesta`,
        { respuesta, aceptada }
      );

      alert(aceptada ? '¡Acuerdo alcanzado!' : 'Propuesta rechazada');
      await cargarDatos();
    } catch (error) {
      console.error('Error al registrar respuesta:', error);
    }
  };

  if (!solicitud) return <div>Cargando...</div>;

  // Opción recomendada: 3 intentos máximos enviados
  const intentosAgotados = negociaciones.length >= 3;

  // Si quieres tu lógica original (3 rechazadas), usa esta en vez de la anterior:
  // const intentosAgotados =
  //   negociaciones.filter(n => n.estadoNegociacion === 'Rechazada').length >= 3;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
      <h1>Gestionar Negociación - Caso {solicitud._id}</h1>

      <div
        style={{
          background: '#f0f0f0',
          padding: 20,
          borderRadius: 4,
          marginBottom: 30
        }}
      >
        <h2>Información del Caso</h2>
        <p>
          <strong>Persona:</strong> {solicitud.datosBasicos.nombre}
        </p>
        <p>
          <strong>Servicio:</strong> {solicitud.servicioEsencial}
        </p>
        <p>
          <strong>Estado:</strong> {solicitud.estado}
        </p>
        <p>
          <strong>Contexto:</strong> {solicitud.contexto || 'No especificado'}
        </p>
      </div>

      <h2>Historial de Negociaciones</h2>

      {negociaciones.length === 0 && (
        <p style={{ color: '#666' }}>No se han enviado propuestas aún.</p>
      )}

      {negociaciones.map((neg) => (
        <div
          key={neg._id}
          style={{
            background: '#fff',
            border: '1px solid #ddd',
            padding: 15,
            marginBottom: 15,
            borderRadius: 4
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <strong>Intento #{neg.numeroIntento}</strong>

            <span
              style={{
                padding: '5px 10px',
                borderRadius: 4,
                background:
                  neg.estadoNegociacion === 'Aceptada'
                    ? '#00ff66'
                    : neg.estadoNegociacion === 'Rechazada'
                      ? '#ff6b6b'
                      : '#ffcc00',
                fontSize: 14
              }}
            >
              {neg.estadoNegociacion}
            </span>
          </div>

          <p style={{ marginTop: 10 }}>
            <strong>Propuesta:</strong> {neg.propuestaEnviada}
          </p>

          {neg.respuestaProveedor && (
            <p>
              <strong>Respuesta:</strong> {neg.respuestaProveedor}
            </p>
          )}

          {neg.estadoNegociacion === 'En espera' && (
            <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
              <button
                onClick={() => registrarRespuesta(neg._id, true)}
                style={{
                  padding: 10,
                  background: '#00ff66',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
              >
                ✓ Aceptada
              </button>

              <button
                onClick={() => registrarRespuesta(neg._id, false)}
                style={{
                  padding: 10,
                  background: '#ff6b6b',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  color: '#fff'
                }}
              >
                ✗ Rechazada
              </button>
            </div>
          )}
        </div>
      ))}

      {intentosAgotados && (
        <div
          style={{
            background: '#ffebee',
            padding: 20,
            borderRadius: 4,
            marginTop: 20,
            border: '1px solid #c00'
          }}
        >
          <h3 style={{ color: '#c00' }}>⚠️ Intentos agotados</h3>
          <p>Se han agotado los 3 intentos. El caso debe escalarse al Curador Vital.</p>
          <button
            style={{
              padding: 10,
              background: '#c00',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Escalar a Curador Vital
          </button>
        </div>
      )}

      {!intentosAgotados && solicitud.estado === 'En negociación' && (
        <div style={{ marginTop: 30 }}>
          <h2>Enviar Nueva Propuesta</h2>

          <p style={{ color: '#666', marginBottom: 10 }}>
            Intento {negociaciones.length + 1} de 3 permitidos
          </p>

          <textarea
            value={propuesta}
            onChange={(e) => setPropuesta(e.target.value)}
            placeholder="Escriba la propuesta de plan flexible para el proveedor..."
            style={{
              width: '100%',
              minHeight: 120,
              padding: 10,
              fontSize: 16,
              marginBottom: 10
            }}
          />

          <button
            onClick={enviarPropuesta}
            disabled={enviando || !propuesta.trim()}
            style={{
              padding: 15,
              fontSize: 16,
              background: enviando ? '#ccc' : '#00ff66',
              border: 'none',
              borderRadius: 4,
              cursor: enviando ? 'not-allowed' : 'pointer',
              width: '100%'
            }}
          >
            {enviando ? 'Enviando...' : 'Enviar Propuesta al Proveedor'}
          </button>
        </div>
      )}
    </div>
  );
}