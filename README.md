OVPSV propone un paradigma virtual para proteger servicios esenciales (agua, luz, etc.) de personas con discapacidad en Chile ante moras, mediante intercesores que negocian pausas éticas con proveedores, evitando cortes reactivos.  OVPSV no es software ni entidad; es un paradigma nuevo operado por FCHD (Fundación Chilena para la Discapacidad, una ONG independiente aliada con gobierno). Esta elección deriva de la necesidad de no generar autoauditoría/conflicto (como lo sería integrar este sistema a SENADIS).

Actores (5):

Habitante Vulnerable (PcD): Inicia solicitud; registrado en Registro Nacional de la Discapacidad (RND).
Intercesor (FCHD): Traduce necesidad, negocia prórrogas/planes.
Curador Vital (FCHD): Valida ética, emite directrices, monitorea equidad.
Proveedor (externo): Ofrece alternativas, suspende cortes temporalmente.
Gobierno (externo): Norma, audita cumplimiento.

BPMN As-Is: Diagrama el contexto actual defectuoso (3 procesos reactivos/cortantes). 
To-Be: Mejora específica de cómo debiera ser. En ella se basan los casos de uso y dominio.

Caso 1: Canal estándar (call center/portal): Habitante solicita asistencia; Proveedor gateway (pago: redirige; no: finaliza sin resolver, registra falla); genera corte, notifica; Gobierno audita.

Caso 2: Llamada sin verificación PcD: Habitante proporciona info; Proveedor aplica cobranza, gateway relevancia (no: descarta excepción, confirma corte; sí: registra compromiso); Gobierno recibe notificación y audita ex post.

Caso 3: Gestión crítica manual post-corte: Habitante reclama; Gobierno valida burocráticamente (solicita antecedentes usuario/proveedor), evalúa vulnerabilidad (sí: suspende corte; no: negativo); Proveedor proporciona info, recibe orden.

El bpmn de mejora se correlaciona con el caso 1 (canal estándar reactivo): mejora proactiva vía OVPSV (solicitud virtual, validación vulnerabilidad, pausa ética, plan flexible), evita finalización sin resolver/corte.
