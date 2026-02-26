import { fragments } from '../../../../fragments.js';

export const sinServicio = {
  id: 1001,
  locked: true,
  title: "Sin Servicio",
  category: "Dinámico",
  summary: "Diagnóstico inicial para falta total de servicio. Validación de masivos y situaciones de cable cortado.",
  tags: ["Sin Servicio", "Masivo", "Falla Técnica"],
  lastSync: "21 de Febrero de 2026",
  originalScriptId: "79",
  complementaryContent: [],
  childScripts: [1009, 1010, 1011],
  content: `
    <div class="detail-body">

      <p style="font-weight:600; margin-bottom:1.5rem;">Seleccionar la problemática según corresponda:</p>

      <div class="info-block">
        <p><strong>Masivo Declarado:</strong> siempre se debe verificar que las fallas masivas se encuentren declaradas en CODI +.</p>
      </div>

      <div class="info-block" style="margin-top:1rem;">
        <p><strong>Posible Masivo:</strong> de no visualizar el masivo declarado y detectamos una situación de posible masivo (ejemplo: vecinos caídos), se debe remitir un mail al área correspondiente para que declaren el mismo. <strong>Troubleshooting botón Posible Masivo</strong>.</p>
        <p style="margin-top:0.5rem;"><strong>Sin Falla Masiva:</strong> continuar con el flujo del procedimiento.</p>
      </div>

      <div class="alert-box warning" style="margin-top:1.5rem;">
        <h4>⚠️ Información importante antes de avanzar con el flujo</h4>
        <p><strong>Acometida:</strong> Bajo ningún punto de vista debemos informarle al cliente que vamos a realizar una acometida dedicada para un solo cablemódem, dado que, si el cliente cuenta con uno o más servicios, se realizará la instalación con una sola acometida.</p>
      </div>

      <div class="service-section" style="margin-top:1.5rem;">
        <h3 style="color:var(--accent-secondary); margin-bottom:1rem;">📋 Service</h3>

        <p><strong>Cambios de boca de lugar:</strong> el cambio de boca de lugar únicamente debe gestionarse vía Service. Este cambio se puede realizar dentro del mismo domicilio/piso del cliente, es decir, que no afecte la dirección reflejada en Open y cubre una distancia máxima de 70 metros.</p>
        <div style="display:flex; flex-direction:column; gap:0.5rem; margin:0.5rem 0 1rem 0;">
          <div class="code-box"><span class="code-label">HFC</span><code>100608 - Reinstalación Acometida Sin Afectación</code></div>
        </div>
        <p style="font-size:0.85rem; color:var(--text-secondary);">(Ya que el servicio no está caído, solo quiere cambiar el cablemódem de lugar)</p>

        <p style="margin-top:1rem;"><strong>Garantía de Instalación:</strong> si el cliente manifiesta que el servicio no le está funcionando correctamente o que se encuentra sin servicio y se encuentra dentro de los <strong>30 días desde que se dio de alta el producto</strong>, generar un Service Técnico en Open con la aclaración en comentarios que es por Garantía de Instalación por: <strong>100608 - Reinstalación Acometida Sin Afectación</strong>. Verificar la fecha de instalación para corroborar estar dentro de los 30 días.</p>

        <p style="margin-top:1rem;"><strong>Cable cortado:</strong> en caso de que el cliente reclame que no tiene servicio porque por ejemplo un camión pasó y cortó el cable, se deberá generar la OT en Open por Sin servicio, dar agenda y en caso de escalamientos se deberá recomendar según matriz de escalamiento.</p>

        <p style="margin-top:1rem;"><strong>Comunicaciones Unificadas:</strong> si la carga del Service viene por un troubleshooting sobre Comunicaciones Unificadas se debe aclarar en el comentario de la OT <strong>"Soporte Comunicaciones Unificadas"</strong>.</p>
      </div>

      <div class="panel-footer" style="margin-top:2rem; display:flex; gap:1rem; flex-wrap:wrap;">
        <button class="btn-option" onclick="openScript(1009)">Sin masivo declarado</button>
        <button class="btn-option" onclick="openScript(1010)">Masivo Declarado</button>
        <button class="btn-option" disabled>Sin Falla Masiva | Masivo en curso</button>
      </div>

    </div>
  `
};
