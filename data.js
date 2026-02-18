import { sinServicio } from './scripts/1-conectividad/1-dinamico/1-sin-servicio/index.js';
import { lentitud } from './scripts/1-conectividad/1-dinamico/2-lentitud/index.js';
import { microcortes } from './scripts/1-conectividad/1-dinamico/3-microcortes/index.js';
import { destinosInalcanzables } from './scripts/1-conectividad/1-dinamico/4-destinos-inalcanzables/index.js';
import { cambiosDeBoca } from './scripts/1-conectividad/1-dinamico/5-cambios-boca/index.js';
import { garantiaDeInstalacion } from './scripts/1-conectividad/1-dinamico/6-garantia-instalacion/index.js';
import { upgradeTecnologico } from './scripts/1-conectividad/1-dinamico/7-upgrade-tecnologico/index.js';
import { regularizarOT } from './scripts/1-conectividad/1-dinamico/8-regularizar-ot/index.js';
import { sinMasivoDeclarado } from './scripts/1-conectividad/1-dinamico/9-sin-masivo-declarado/index.js';

export const scripts = [
  // --- DINÁMICO (Ordenado del 1 al 9) ---
  sinServicio,
  lentitud,
  microcortes,
  destinosInalcanzables,
  cambiosDeBoca,
  garantiaDeInstalacion,
  upgradeTecnologico,
  regularizarOT,
  sinMasivoDeclarado
];
