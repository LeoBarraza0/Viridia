/* Copia al sitio los archivos del documento final y empaqueta los BPMN para que el visor
   funcione sin servidor (doble clic en index.html no permite leer archivos locales con fetch).
   Uso, desde la carpeta Activo-Digital:   node herramientas/empaquetar.js
   Volver a correrlo cada vez que cambie el PDF, un .bpmn, el SQL o las vistas ArchiMate. */
'use strict';
const fs = require('fs');
const path = require('path');

const sitio = path.join(__dirname, '..');
const doc = path.join(sitio, '..', 'Documento');
const copias = [
  ['VIRIDIA-AE-Final.pdf', 'descargas/VIRIDIA-AE-Final.pdf'],
  ['anexos/VIRIDIA-BPMN-1-incorporacion.bpmn', 'descargas/VIRIDIA-BPMN-1-incorporacion.bpmn'],
  ['anexos/VIRIDIA-BPMN-2-operacion-y-cierre.bpmn', 'descargas/VIRIDIA-BPMN-2-operacion-y-cierre.bpmn'],
  ['anexos/VIRIDIA-BPMN-3-cierre-mensual.bpmn', 'descargas/VIRIDIA-BPMN-3-cierre-mensual.bpmn'],
  ['anexos/VIRIDIA-modelo-relacional.sql', 'descargas/VIRIDIA-modelo-relacional.sql'],
  ['diagramas/mer/MER-1-conceptual-Chen.pdf', 'descargas/MER-1-conceptual-Chen.pdf'],
  ['diagramas/mer/MER-2-relacional.pdf', 'descargas/MER-2-relacional.pdf'],
  ['diagramas/archimate/VIRIDIA-ArchiMate-4-completa.png', 'img/archimate/VIRIDIA-ArchiMate-4-completa.png'],
  ['diagramas/archimate/VIRIDIA-ArchiMate-5-motivacion-estrategia.png', 'img/archimate/VIRIDIA-ArchiMate-5-motivacion-estrategia.png']
];
for (const [de, a] of copias) {
  const destino = path.join(sitio, a);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.copyFileSync(path.join(doc, de), destino);
  console.log('copiado  ' + a);
}

const bpmn = {
  bpmn1: 'VIRIDIA-BPMN-1-incorporacion.bpmn',
  bpmn2: 'VIRIDIA-BPMN-2-operacion-y-cierre.bpmn',
  bpmn3: 'VIRIDIA-BPMN-3-cierre-mensual.bpmn'
};
const salida = {};
for (const [id, archivo] of Object.entries(bpmn)) salida[id] = fs.readFileSync(path.join(sitio, 'descargas', archivo), 'utf8');
fs.writeFileSync(path.join(sitio, 'js', 'bpmn-xml.js'),
  '/* GENERADO por herramientas/empaquetar.js a partir de descargas/*.bpmn. No editar a mano. */\n' +
  'window.VIRIDIA_BPMN = ' + JSON.stringify(salida) + ';\n');
console.log('generado js/bpmn-xml.js');
