import { fragments } from "../../../../fragments.js";

export const sinServicio = {
  id: 1001,
  isProtected: true,
  title: "Sin Servicio",
  category: "Dinámico",
  summary:
    "Diagnóstico inicial para falta total de servicio. Validación de masivos y situaciones de cable cortado.",
  tags: ["Sin Servicio", "Masivo", "Falla Técnica"],
  lastSync: "21 de Febrero de 2026",
  originalScriptId: "79",
  complementaryContent: [],
  childScripts: [1009, 1010, 1011],
  content: `
    <div class="detail-body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non sem at augue vulputate facilisis, in volutpat purus feugiat. Phasellus convallis arcu id augue fermentum, at vulputate erat tincidunt.</p>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
      <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>
      <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
      <div class="panel-footer" style="margin-top:1.5rem; display:flex; gap:1rem; flex-wrap:wrap;">
        <button class="btn-option" onclick="openScript(1009)">Sin masivo declarado</button>
        <button class="btn-option" onclick="openScript(1010)">Masivo declarado</button>
        <button class="btn-option" onclick="openScript(1011)">Sin falla masiva | Masivo en curso</button>
      </div>
    </div>
  `,
};
