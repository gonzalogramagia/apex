import { fragments } from '../../../../fragments.js';

export const lentitud = {
  id: 1004,
  title: "Lentitud",
  category: "Dinámico",
  summary: "Diagnóstico de navegación lenta, validación de masivos y recambio de equipos Docsis 2.0.",
  tags: ["Lentitud", "Docsis 2.0", "Masivo", "Infinite"],
  lastSync: "10 de Febrero de 2026",
  content: `
    <div class="detail-body">
      <div class="alert-box warning">
        <h4>⚠️ Recambio Cablemódem 2.0 (Importante)</h4>
        <p>Ante upgrade o reclamo de equipo <strong>DOCSIS 2.0 sin WIFI</strong>, no generar Service. Gestionar <strong>alta de nuevo servicio</strong> y baja del existente debido a obsolescencia.</p>
      </div>

      <div class="info-block">
        <h4 style="margin-top: 0 !important; color: var(--text-primary);">Matriz de Derivación (Docsis 2.0)</h4>
        <table class="data-table">
          <thead>
            <tr>
              <th>Segmento</th>
              <th>Mercado</th>
              <th>Derivar por mail a:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Grandes Clientes</strong></td>
              <td>Interior / AMBA</td>
              <td>AtencionCorporativa / ReferentesTecnicosMercadoAMBA</td>
            </tr>
            <tr>
              <td><strong>Executive</strong></td>
              <td>Interior / AMBA</td>
              <td>AtencionPymesConectividad / ReferentesTecnicosMercadoAMBA</td>
            </tr>
            <tr>
              <td><strong>Crecimiento</strong></td>
              <td>Ventas</td>
              <td>Transferencia cálida a <strong>Pic VDN Ventas Convergente</strong></td>
            </tr>
          </tbody>
        </table>
        <p style="font-size: 0.9rem; opacity: 0.8; font-style: italic;">* Solicitar teléfono y horario de contacto para coordinación técnica.</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 2rem 0;">
        <div class="alert-box info">
          <h4>🚀 SLA INFINITE</h4>
          <p>Resolución en <strong>12hs</strong>. Si la agenda supera el SLA, solicitar <strong>adelanto de visita</strong> obligatoriamente.</p>
        </div>
        <div class="alert-box success">
          <h4>🏠 ACOMETIDA</h4>
          <p>Una sola acometida para todos los servicios del cliente. No informar acometidas dedicadas.</p>
        </div>
      </div>

      <div class="service-section">
        <h3 style="color: var(--accent-secondary); margin-bottom: 1.5rem;">📋 Gestión de Service</h3>
        
        <div class="policy-item">
          <p><strong>Cambios de boca de lugar:</strong> Gestionar únicamente vía Service (máx 70m).</p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 10px;">
            <div class="code-box">
              <span class="code-label">HFC</span>
              <code>100608 - Reinstalación Acometida Sin Afectación</code>
            </div>
            <div class="code-box">
              <span class="code-label">FTTH</span>
              <code>100648 - Reinstalación sin Afectación FTTH</code>
            </div>
          </div>
        </div>

        <div class="policy-item">
          <p><strong>Garantía de Instalación:</strong> Dentro de los 30 días del alta. Mismos códigos que Reinstalación (100608/100648).</p>
        </div>
      </div>

      <div class="info-block">
        <h4>🔍 Validación de Masivos</h4>
        <p>Validar en CODI+, solapa "Daño a Producto" o Tablero de Control si existe falla de <strong>"lentitud"</strong> o <strong>"lentitud en horas pico"</strong>.</p>
        <div class="image-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
          <img src="/scripts/1-conectividad/1-dinamico/2-lentitud/assets/validacion-masivo.png" class="zoom-img" title="Validación CODI">
          <img src="/scripts/1-conectividad/1-dinamico/2-lentitud/assets/tablero-de-control.jpeg" class="zoom-img" title="Tablero de Control">
        </div>
      </div>

      <div class="orcor-container">
        <span>Para verificar el DOCSIS del equipo:</span>
        <button class="btn-orcor" style="opacity: 0.5; cursor: not-allowed;" disabled>Módulo ORCOR</button>
      </div>

      <div class="panel-footer" style="margin-top: 2rem; display: flex; gap: 1rem;">
        <button class="btn-primary" style="opacity: 0.5; cursor: not-allowed;" disabled>Si existe masivo</button>
        <button class="btn-secondary" style="opacity: 0.5; cursor: not-allowed;" disabled>No existe masivo</button>
      </div>
    </div>
  `
};
