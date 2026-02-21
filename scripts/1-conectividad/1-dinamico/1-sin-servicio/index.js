import { fragments } from '../../../../fragments.js';

export const sinServicio = {
  id: 1001,
  title: "Sin Servicio",
  category: "Dinámico",
  summary: "Diagnóstico inicial para falta total de servicio. Validación de masivos y situaciones de cable cortado.",
  tags: ["Sin Servicio", "Masivo", "Falla Técnica"],
  lastSync: "10 de Febrero de 2026",
  originalScriptId: "79", // https://knowb2b.telecom.com.ar/getf.php?f=scripting_tecnico/html/79.html
  complementaryContent: [
    {
      title: "Manual de Procedimientos Técnicos",
      url: "https://conocimiento.telecom.com.ar/procedimientos"
    }
  ],
  content: `
    <div class="detail-body">
      <p style="font-weight: 600; margin-bottom: 1.5rem;">Seleccionar la problemática según corresponda:</p>
      
      <div class="info-block">
        <p><strong>Masivo Declarado:</strong> siempre se debe verificar que las fallas masivas se encuentren declaradas en CODI +.</p>
      </div>

      <div class="info-block" style="border-left: 4px solid var(--accent-secondary);">
        <p><strong>Posible Masivo:</strong> de no visualizar el masivo declarado y detectamos una situación de posible masivo (ejemplo: vecinos caídos), se debe remitir un mail al área correspondiente. <strong>Troubleshooting botón Posible Masivo</strong>.</p>
        <p style="margin-top: 10px; font-size: 0.9em; opacity: 0.8;"><strong>Sin Falla Masiva:</strong> continuar con el flujo del procedimiento.</p>
      </div>

      <div class="alert-box warning">
        <h4>⚠️ Información importante antes de avanzar</h4>
        <p><strong>Acometida:</strong> Bajo ningún punto de vista debemos informarle al cliente que vamos a realizar una acometida dedicada. Se realiza la instalación con una sola acometida independientemente de la cantidad de servicios.</p>
      </div>

      <div class="service-section" style="margin-top: 3rem;">
        <h3 style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem; color: var(--accent-secondary);">
          <span style="font-size: 1.3rem;">🛠️</span> 
          Service Técnicos
        </h3>

        <div class="policy-item">
          <p><strong>Cambios de boca de lugar:</strong> el cambio de boca únicamente debe gestionarse vía <strong>Service</strong>. Válido dentro del mismo domicilio/piso (máx 70 metros).</p>
          <div class="code-box">
            <span class="code-label">Código Open (HFC)</span>
            <code>100608 - Reinstalación Acometida Sin Afectación</code>
            <span style="font-size: 0.8rem; color: #94a3b8; margin-top: 4px;">(Ya que el servicio no está caído, solo quiere cambiar el cablemódem de lugar)</span>
          </div>
        </div>

        <div class="policy-item">
          <p><strong>Garantía de Instalación:</strong> aplica dentro de los <strong>30 días</strong> desde el alta. Aclarar obligatoriamente en comentarios.</p>
          <div class="code-box">
            <span class="code-label">Procedimiento</span>
            <code>Garantía de Instalación vía 100608</code>
          </div>
          <p style="font-size: 0.9em; margin: 1rem 0;">Verificar fecha de instalación en Open.</p>
        </div>

        <div class="policy-item">
          <p><strong>Cable cortado:</strong> Generar OT por <strong>Sin servicio</strong>, dar agenda y verificar matriz de escalamiento según corresponda.</p>
        </div>

        <div class="policy-item">
          <p><strong>Comunicaciones Unificadas:</strong> En comentarios de la OT aclarar: <strong>"Soporte Comunicaciones Unificadas"</strong>.</p>
        </div>
      </div>

      <div class="panel-footer" style="margin-top: 3rem; display: flex; gap: 1rem;">
        <button class="btn-primary" style="opacity: 0.5; cursor: not-allowed;" disabled>1. Sin masivo declarado</button>
        <button class="btn-primary" style="opacity: 0.5; cursor: not-allowed;" disabled>2. Masivo declarado</button>
        <button class="btn-primary" style="opacity: 0.5; cursor: not-allowed;" disabled>3. Posible Masivo</button>
      </div>
    </div>
  `
};
