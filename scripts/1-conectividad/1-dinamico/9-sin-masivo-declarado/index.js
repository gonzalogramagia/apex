import { fragments } from '../../../../fragments.js';

export const sinMasivoDeclarado = {
  id: 1009,
  title: "Sin masivo declarado",
  category: "Dinámico",
  isHidden: true,
  summary: "Flujo a seguir cuando no existe una falla masiva reportada en CODI+.",
  tags: ["Sin Masivo", "Troubleshooting", "Service"],
  lastSync: "10 de Febrero de 2026",
  originalScriptId: "1009",
  complementaryContent: [],
  content: `
    <div class="detail-body">
      <p><strong>El árbol de producto es el siguiente:</strong></p>

      ${fragments.signalValidation}

      <div class="question-box" style="margin-top: 30px; background: rgba(16, 185, 129, 0.1); padding: 25px; border-radius: 12px; text-align: center; border: 1px solid var(--accent-primary);">
          <h3 style="margin-bottom: 20px; color: var(--text-primary);">¿Tiene señal el cablemódem?</h3>
          <div style="display: flex; gap: 15px; justify-content: center;">
              <button class="btn-primary" style="min-width: 120px;" onclick="alert('Flujo: Con Señal')">SÍ</button>
              <button class="btn-primary" style="min-width: 120px; background: #991b1b;" onclick="alert('Flujo: Sin Señal')">NO</button>
          </div>
      </div>

      <div class="panel-footer" style="margin-top: 40px;">
        <button class="btn-secondary" onclick="openScript(1001)">Volver a Selección</button>
      </div>
    </div>
  `
};
