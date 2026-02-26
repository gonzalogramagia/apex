import { fragments } from '../../../../fragments.js';

export const lentitud = {
  id: 1004,
  isProtected: true,
  isProtected: true,
  isHidden: false,
  title: "Lentitud",
  category: "Dinámico",
  summary: "Diagnóstico de navegación lenta, validación de masivos y recambio de equipos Docsis 2.0.",
  tags: ["Lentitud", "Docsis 2.0", "Masivo", "Infinite"],
  lastSync: "21 de Febrero de 2026",
  originalScriptId: "1064",
  complementaryContent: [],
  content: `
    <div class="detail-body">

      <div class="alert-box warning">
        <h4>⚠️ Info: Recambio Cablemódem 2.0</h4>
        <p>Ante una solicitud de upgrade o reclamo técnico de un servicio con CableMódem 2.0 sin WIFI, se debe realizar una gestión de <strong>alta de nuevo servicio</strong> utilizando las ofertas/promociones vigentes y <strong>baja del producto existente</strong>. Esto se debe a la obsolescencia y disponibilidad de stock de este modelo de módem.</p>
        <p>Teniendo en cuenta lo anterior, para los casos donde el cliente realice un reclamo técnico sobre un servicio con DM DOCSIS 2.0, en lugar de generar el Service, se debe derivar según el segmento del cliente para que se avance directamente con el alta de un nuevo equipo.</p>
      </div>

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
            <td rowspan="2"><strong>Grandes Clientes</strong></td>
            <td>Interior</td>
            <td>AtencionCorporativa@teco.com.ar</td>
          </tr>
          <tr>
            <td>AMBA</td>
            <td>ReferentesTecnicosMercadoAMBASURB2B@teco.com.ar</td>
          </tr>
          <tr>
            <td rowspan="2"><strong>Executive</strong></td>
            <td>Interior</td>
            <td>AtencionPymesConectividad@teco.com.ar</td>
          </tr>
          <tr>
            <td>AMBA</td>
            <td>ReferentesTecnicosMercadoAMBASURB2B@teco.com.ar</td>
          </tr>
          <tr>
            <td><strong>Pymes No Carterizado</strong><br><small>Crecimiento</small></td>
            <td>—</td>
            <td>No Tomar Service, realizar transferencia cálida a Ventas (Pic VDN Ventas Convergente), de no ser exitosa, enviar mail desde casilla Recomendados a SupervisoresVentasCanalesB2B@teco.com.ar, en copia ReferentesTecnicosMercadoSMB@teco.com.ar y Recomendados Soporte Pymes.</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">Solicitale al cliente teléfono y horario de contacto, informándole que será contactado para proceder con la resolución de su caso y coordinar una visita técnica (si reclama a la mañana será contactado por la tarde y si reclama por la tarde al día siguiente).</p>

      <div class="alert-box info" style="margin-top:1.5rem;">
        <h4>🚀 IMPORTANTE INFINITE</h4>
        <p>Tener presente la siguiente información para los casos donde se genere una visita técnica. Los clientes que tienen contratado <strong>INFINITE</strong> (Conectividad + Backup 4G + Centro de Control) cuentan con un <strong>SLA de 12hs</strong>. Al momento de generar la visita técnica se verificará la agenda disponible y se procederá de la siguiente forma:</p>
        <ul style="margin:0.5rem 0 0 1.2rem; padding:0;">
          <li>Si la fecha asignada es <strong>dentro de las 12hs</strong>, pactamos la visita con el cliente y no solicitamos adelanto.</li>
          <li>Si la fecha de agenda <strong>supera el SLA, mayor a 12hs.</strong>, se deberá solicitar el adelanto.</li>
        </ul>
      </div>

      <div class="alert-box warning" style="margin-top:1rem;">
        <h4>🏠 IMPORTANTE ACOMETIDA</h4>
        <p>Bajo ningún punto de vista debemos informarle al cliente que vamos a realizar una acometida dedicada para un solo Cablemodem, dado que si el cliente cuenta con uno o más servicios, se realizará la instalación con una <strong>sola acometida</strong>.</p>
      </div>

      <div class="service-section" style="margin-top:1.5rem;">
        <h3 style="color:var(--accent-secondary); margin-bottom:1rem;">📋 IMPORTANTE SERVICE</h3>

        <p><strong>Cambios de boca de lugar:</strong> El Cambio de boca de lugar únicamente debe gestionarse vía Service. Este cambio se puede realizar dentro del mismo domicilio/piso del cliente, es decir, que no afecte la dirección reflejada en Open. Este cambio cubre una distancia máxima de 70 metros.</p>
        <p>Para esto corresponde cargar una orden técnica desde Open con código:</p>
        <div style="display:flex; flex-direction:column; gap:0.5rem; margin:0.5rem 0 1rem 0;">
          <div class="code-box"><span class="code-label">HFC</span><code>100608 - Reinstalación Acometida Sin Afectación</code></div>
          <div class="code-box"><span class="code-label">FTTH</span><code>100648 - Reinstalación sin Afectación FTTH</code></div>
        </div>

        <p><strong>Garantía de Instalación:</strong> Si el cliente manifiesta que el servicio no le está funcionando correctamente o que se encuentra sin servicio y se encuentra dentro de los <strong>30 días desde que se dio de alta el producto</strong>, generar un Service Técnico en Open con la aclaración en comentarios que es por Garantía de Instalación por: 100608 / 100648.</p>
      </div>

      <div class="info-block" style="margin-top:1.5rem;">
        <h4>🔍 Validación de Masivos</h4>
        <p>Validar en <strong>CODI+</strong> o en la solapa <em>"Daño a Producto"</em> de Open si posee un masivo en curso, si existe algún masivo de "lentitud" o "lentitud en horas pico". También validar que en el Tablero de Control de OPEN que no figure ya cargado una Falla Masiva de Lentitud.</p>
      </div>

      <div class="orcor-container" style="margin-top:1.5rem;">
        <span>Para verificar el DOCSIS del equipo:</span>
        <button class="btn-orcor" style="opacity:0.5; cursor:not-allowed;" disabled>Módulo ORCOR</button>
      </div>

      <div class="panel-footer" style="margin-top:1.5rem; display:flex; gap:1rem; flex-wrap:wrap;">
        <button class="btn-option" disabled>Si existe masivo</button>
        <button class="btn-option" disabled>No existe masivo</button>
      </div>

    </div>
  `
};

