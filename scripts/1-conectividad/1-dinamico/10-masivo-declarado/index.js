import { fragments } from '../../../../fragments.js';

export const masivoDeclarado = {
    id: 1010,
    title: "Masivo Declarado",
    category: "Dinámico",
    summary: "Procedimiento para carga de ticket en ECO ante un incidente masivo declarado, considerando las opciones con y sin seguimiento E2E.",
    tags: ["Dinámico", "Sin Servicio", "Masivo Declarado", "ECO"],
    lastSync: "21 de Febrero de 2026",
    originalScriptId: "944",
    isHidden: true, // Hid automatically from main search unless specifically linked or searchable, usually child scripts can be hidden if they are just steps.
    parentScriptId: 1001,
    complementaryContent: [],
    content: `
    <div class="detail-body">
      <p style="font-weight:600; margin-bottom:1.5rem;">Si el servicio posee un Masivo ya declarado, al pasar el caso al estado “En Cola” en ECO inmediatamente se asociará el caso al masivo, holdeándolo.</p>



      <p>El caso quedará en estado <strong>On hold (holdeado)</strong> en el grupo de GI hasta que se resuelva el incidente masivo. Cuando esto ocurra pasará automáticamente al estado Resuelto y continuará con los procedimientos de cierres actuales.</p>

      <div class="service-section" style="margin-top:1.5rem;">
          <h3 style="color:var(--accent-secondary); margin-bottom:1rem;">📝 Generar reclamo en ECO</h3>
          <ul class="eco-list" style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem; background: var(--bg-primary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color);">
              <li><strong>Grupo de servicio:</strong> Conectividad</li>
              <li><strong>Servicio:</strong> CM Dinámico - Internet</li>
              <li><strong>Clasificación:</strong> RECLAMOS CORPORATIVOS \\ CONECTIVIDAD \\ TOTAL \\ FALLA MASIVA</li>
              <li><strong>Resumen:</strong> FALLA MASIVA</li>
              <li><strong>Grupo propietario a escalar:</strong> GI Gestión Inicial B2B</li>
              <li><strong>Estado:</strong> “Cerrado”</li>
          </ul>
      </div>

      <div class="alert-box info" style="margin-top:1.5rem;">
          <h4>ℹ️ Seguimiento E2E</h4>
          <p>De ser necesario realizar seguimiento E2E de algunos de estos tickets debes dejarlo en la cola de trabajo <strong>GI Procesos</strong> de manera que ingrese a la bolsa de seguimiento.</p>
      </div>



      <div class="service-section" style="margin-top:1.5rem;">
          <h3 style="color:var(--accent-secondary); margin-bottom:1rem;">📝 Generar reclamo en ECO (Con seguimiento)</h3>
          <ul class="eco-list" style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem; background: var(--bg-primary); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color);">
              <li><strong>Grupo de servicio:</strong> Conectividad</li>
              <li><strong>Servicio:</strong> CM Dinámico - Internet</li>
              <li><strong>Clasificación:</strong> RECLAMOS CORPORATIVOS \\ CONECTIVIDAD \\ TOTAL \\ FALLA MASIVA</li>
              <li><strong>Resumen:</strong> FALLA MASIVA</li>
              <li><strong>Grupo propietario a escalar:</strong> GI Procesos</li>
              <li><strong>Estado:</strong> “En Cola”</li>
          </ul>
      </div>

    </div>
  `
};
