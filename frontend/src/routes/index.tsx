import { HashRouter, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import FormularioSolicitud from '../pages/pcd/FormularioSolicitud';
import MisSolicitudes from '../pages/pcd/MisSolicitudes';
import DetalleSolicitud from '../pages/pcd/DetalleSolicitud';
import CasosAsignados from '../pages/intercesor/CasosAsignados';
import GestionarNegociacion from '../pages/intercesor/GestionarNegociacion';

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        
        {/* Rutas PcD (CU1) */}
        <Route path="/pcd/nueva-solicitud" element={<FormularioSolicitud />} />
        <Route path="/pcd/mis-solicitudes" element={<MisSolicitudes />} />
        <Route path="/pcd/solicitud/:id" element={<DetalleSolicitud />} />
        
        {/* Rutas Intercesor (CU2) */}
        <Route path="/intercesor/casos" element={<CasosAsignados />} />
        <Route path="/intercesor/caso/:id/negociar" element={<GestionarNegociacion />} />
      </Routes>
    </HashRouter>
  );
}