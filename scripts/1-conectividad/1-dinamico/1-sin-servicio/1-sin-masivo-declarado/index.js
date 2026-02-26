export const sinMasivoDeclarado = {
  id: 1009,
  locked: true,
  title: "Sin masivo declarado",
  category: "Dinámico",
  isHidden: true,
  parentScriptId: 1001,
  summary: "Verificación de señal del cablemódem en CODI+ o NXT cuando no existe falla masiva declarada.",
  tags: ["Sin Masivo", "CODI+", "NXT", "Señal", "Cablemódem"],
  lastSync: "21 de Febrero de 2026",
  originalScriptId: "943",
  complementaryContent: [],
  childScripts: [1012, 1013],
  content: `
    <div class="detail-body">

      <p><strong>El árbol de producto es el siguiente:</strong></p>

      <div class="info-block" style="margin-top:1.5rem;">
        <h4>🔍 Verificar si el cablemódem posee señal en CODI+ o NXT</h4>

        <p style="margin-top:1rem;"><strong>CODI+</strong></p>
        <p>Presionar el botón <em>"Ver información de Diagnóstico"</em>. Dentro de Realtime, en <strong>Estado de registración</strong>, verificar el estado del cablemódem.</p>

        <p style="margin-top:1.5rem;"><strong>NXT</strong></p>
        <p>Verificar si el cablemódem posee señal en la parte <strong>Overview</strong>, sección <strong>Status</strong> en <em>CM Status</em>.</p>
      </div>

      <div class="panel-footer" style="margin-top:1.5rem; display:flex; gap:1rem; flex-wrap:wrap;">
        <button class="btn-option" disabled>Cablemódem sin señal</button>
        <button class="btn-option" disabled>Cablemódem con señal</button>
      </div>

    </div>
  `
};
