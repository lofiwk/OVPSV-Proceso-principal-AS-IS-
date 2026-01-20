import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface DatosBasicos {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

interface Antecedentes {
  aceptoTyC: boolean;
  certificadoNoAfiliacion: boolean;
  cartolaRSH: boolean;
  certificadoFonasa: boolean;
  certificadoRND: boolean;
  certificadoAntecedentes: boolean;
  boletinComercial: boolean;
}

export default function FormularioSolicitud() {
  const navigate = useNavigate();

  const [paso, setPaso] = useState(1);

  const [datosBasicos, setDatosBasicos] = useState<DatosBasicos>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  const [antecedentes, setAntecedentes] = useState<Antecedentes>({
    aceptoTyC: false,
    certificadoNoAfiliacion: false,
    cartolaRSH: false,
    certificadoFonasa: false,
    certificadoRND: false,
    certificadoAntecedentes: false,
    boletinComercial: false,
  });

  const [servicioEsencial, setServicioEsencial] = useState('');
  const [contexto, setContexto] = useState('');

  const todosAntecedentesCompletos = useMemo(
    () => Object.values(antecedentes).every((v) => v === true),
    [antecedentes]
  );

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/solicitudes', {
        identificacionPcD: datosBasicos.email, // Simplificado para demo
        servicioEsencial,
        datosBasicos,
        antecedentes,
        contexto,
      });

      alert('¡Solicitud enviada exitosamente!');
      navigate(`/pcd/solicitud/${response.data._id}`);
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error al enviar la solicitud. Verifique su conexión.');
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 20 }}>
      <h1>Formulario de Solicitud</h1>

      {/* Paso 1: Datos básicos */}
      {paso === 1 && (
        <div>
          <h2>Paso 1: Datos Básicos</h2>

          <div style={{ display: 'grid', gap: 10 }}>
            <input
              placeholder="Nombre"
              value={datosBasicos.nombre}
              onChange={(e) => setDatosBasicos({ ...datosBasicos, nombre: e.target.value })}
            />
            <input
              placeholder="Email"
              value={datosBasicos.email}
              onChange={(e) => setDatosBasicos({ ...datosBasicos, email: e.target.value })}
            />
            <input
              placeholder="Teléfono"
              value={datosBasicos.telefono}
              onChange={(e) => setDatosBasicos({ ...datosBasicos, telefono: e.target.value })}
            />
            <input
              placeholder="Dirección"
              value={datosBasicos.direccion}
              onChange={(e) => setDatosBasicos({ ...datosBasicos, direccion: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button
              onClick={() => setPaso(2)}
              style={{ padding: 15, fontSize: 16, border: 'none', borderRadius: 4, cursor: 'pointer', flex: 1 }}
            >
              Continuar →
            </button>
          </div>
        </div>
      )}

      {/* Paso 2: Servicio + antecedentes + contexto */}
      {paso === 2 && (
        <div>
          <h2>Paso 2: Servicio y Antecedentes</h2>

          <div style={{ display: 'grid', gap: 10 }}>
            <input
              placeholder="Servicio esencial"
              value={servicioEsencial}
              onChange={(e) => setServicioEsencial(e.target.value)}
            />

            <textarea
              placeholder="Contexto"
              value={contexto}
              onChange={(e) => setContexto(e.target.value)}
              rows={4}
            />

            <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
              <h3>Antecedentes</h3>

              {(
                Object.keys(antecedentes) as Array<keyof Antecedentes>
              ).map((k) => (
                <label key={k} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <input
                    type="checkbox"
                    checked={antecedentes[k]}
                    onChange={(e) => setAntecedentes({ ...antecedentes, [k]: e.target.checked })}
                  />
                  <span>{k}</span>
                </label>
              ))}

              <small>
                Completados: {Object.values(antecedentes).filter((v) => v).length} de 7
                {!todosAntecedentesCompletos ? ' (faltan)' : ' (ok)'}
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button
              onClick={() => setPaso(1)}
              style={{ padding: 15, fontSize: 16, background: '#ddd', border: 'none', borderRadius: 4, cursor: 'pointer', flex: 1 }}
            >
              ← Volver
            </button>
            <button
              onClick={() => setPaso(3)}
              style={{ padding: 15, fontSize: 16, border: 'none', borderRadius: 4, cursor: 'pointer', flex: 1 }}
              disabled={!datosBasicos.email || !servicioEsencial}
            >
              Continuar →
            </button>
          </div>
        </div>
      )}

      {/* Paso 3: Confirmación */}
      {paso === 3 && (
        <div>
          <h2>Paso 3: Confirmar y Enviar</h2>

          <div style={{ background: '#f5f5f5', padding: 20, borderRadius: 4, marginBottom: 20 }}>
            <h3>Resumen de su solicitud</h3>
            <p>
              <strong>Nombre:</strong> {datosBasicos.nombre}
            </p>
            <p>
              <strong>Email:</strong> {datosBasicos.email}
            </p>
            <p>
              <strong>Servicio:</strong> {servicioEsencial}
            </p>
            <p>
              <strong>Documentos:</strong> {Object.values(antecedentes).filter((v) => v).length} de 7 completados
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setPaso(2)}
              style={{ padding: 15, fontSize: 16, background: '#ddd', border: 'none', borderRadius: 4, cursor: 'pointer', flex: 1 }}
            >
              ← Volver
            </button>
            <button
              onClick={handleSubmit}
              style={{ padding: 15, fontSize: 16, background: '#00ff66', border: 'none', borderRadius: 4, cursor: 'pointer', flex: 1 }}
            >
              Enviar Solicitud
            </button>
          </div>
        </div>
      )}
    </div>
  );
}