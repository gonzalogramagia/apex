// This file contains shared HTML fragments to avoid duplication across scripts.
// You can use them in your scripts using ${fragments.name}

export const fragments = {
  // Service Policy (Acometida, Boca, Garantía, Cable Cortado)
  servicePolicy: `
    <div class="service-policy-box" style="border-top: 1px solid var(--border-color); margin-top: 30px; padding-top: 20px;">
        <h4 style="color: var(--accent-secondary); margin-bottom: 15px;">📋 Información de Service y Acometida</h4>
        
        <p><strong>Acometida:</strong> <u>Bajo ningún punto de vista</u> debemos informarle al cliente que vamos a realizar una acometida dedicada para un solo cablemódem. Se realiza la instalación con una sola acometida independientemente de la cantidad de servicios.</p>

        <p><strong>Cambios de boca de lugar:</strong> Debe gestionarse únicamente vía <strong>Service</strong>. 
        Aplica dentro del mismo domicilio/piso y cubre una distancia máxima de <strong>70 metros</strong>.
        <br>Código Open: <code>100608-Reinstalación Acometida Sin Afectación</code></p>

        <p><strong>Garantía de Instalación:</strong> Aplica dentro de los <strong>30 días</strong> desde el alta.
        <br>Código Open: <code>100608-Reinstalación Acometida Sin Afectación</code>
        <br><small><em>* Es obligatorio aclarar "Garantía de Instalación" en los comentarios.</em></small></p>

        <p><strong>Cable cortado:</strong> Generar OT por "Sin servicio", dar agenda y verificar matriz de escalamiento según corresponda.</p>
    </div>
  `,

  // CODI+ Validation Block for masivo checks
  codiValidation: `
    <div class="codi-box" style="background: rgba(59, 130, 246, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
        <p><strong>Validación CODI+:</strong> Siempre verificar si las fallas masivas están declaradas.</p>
        <div class="image-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
            <img src="/assets/codi-informacion-diagnostico.png" class="zoom-img" title="CODI+ Info">
            <img src="/assets/codi-realtime-estado.png" class="zoom-img" title="CODI+ Estado">
        </div>
    </div>
  `,

  // Signal Validation Block (CODI+ & NXT)
  signalValidation: `
    <div class="diagnostic-box" style="background: rgba(59, 130, 246, 0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
        <h4 style="margin-bottom: 15px;">Verificar si el cablemódem posee señal en CODI + o NXT:</h4>
        
        <div style="margin-top: 15px;">
            <p><strong>CODI +</strong><br>Presionar el botón “Ver información de Diagnóstico”:</p>
            <img src="/assets/codi-informacion-diagnostico.png" class="zoom-img" style="max-width: 400px; margin: 10px 0;">
            <p>Dentro de Realtime en <strong>Estado de registración</strong> vemos el estado del cablemódem:</p>
            <img src="/assets/codi-realtime-estado.png" class="zoom-img" style="max-width: 400px; margin: 10px 0;">
        </div>

        <div style="margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
            <p><strong>NXT</strong><br>Verificar si el cablemódem posee señal en la parte <strong>Overview</strong>, sección <strong>Status</strong> en <strong>CM Status</strong>:</p>
            <img src="/nxt-overview-status.png" class="zoom-img" style="max-width: 400px; margin: 10px 0;">
        </div>
    </div>
  `,

  // Docsis 2.0 Policy
  docsisPolicy: `
    <div class="info-box warning" style="border-left: 4px solid #f59e0b;">
        <strong>Recambio Cablemódem 2.0:</strong> Ante upgrade o reclamo de equipo DOCSIS 2.0 (sin WIFI), no generar Service. 
        Se debe gestionar el alta de un nuevo servicio y baja del existente según el segmento del cliente.
    </div>
  `
};
