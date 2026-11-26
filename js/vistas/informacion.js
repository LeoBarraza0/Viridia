/* Información: modelo de datos interactivo (18 tablas, 21 relaciones), flujo del dato,
   la cadena que protege RN1, matriz CRUD y diccionario de datos. */
(function () {
  'use strict';
  var V = window.V, D = V.datos, INF = D.informacion, t = V.t;
  var W = 1000, H = 640, BW = 172, BH = 50;
  var COL = [95, 290, 500, 710, 905], FIL = [58, 215, 340, 470, 585];
  var POS = {
    CONTACTO_CLIENTE: [0, 0], CLIENTE: [1, 0], CONTRATO: [2, 0], FACTURA: [3, 0], VERIFICACION: [4, 0],
    PLANTA: [1, 1], MEDIDA_AHORRO: [2, 1], CALCULO_AHORRO: [3, 1], AJUSTE_NO_RUTINARIO: [4, 1],
    VARIABLE_OPERACION: [0, 2], LINEA_BASE: [3, 2], COEFICIENTE_LINEA_BASE: [4, 2],
    PUNTO_MEDICION: [1, 3], RECURSO: [3, 3],
    LECTURA: [0, 4], ALERTA: [1, 4], EQUIPO: [2, 4]
  };
  var TIPO = { fuerte: 'entidad fuerte', debil: 'entidad débil', puente: 'tabla puente', multivaluado: 'atributo multivaluado' };
  var ARISTAS = [];

  function nodos() {
    return INF.entidades.map(function (e) {
      var cx, cy;
      if (e.id === 'ALCANCE_CONTRATO') { cx = 395; cy = 135; } else { cx = COL[POS[e.id][0]]; cy = FIL[POS[e.id][1]]; }
      return { id: e.id, x: cx - BW / 2, y: cy - BH / 2, w: BW, h: BH, clase: 'ent ' + e.tipo, etiqueta: e.id + ', ' + TIPO[e.tipo], html: '<b>' + e.id.replace(/_/g, '_​') + '</b><small>' + TIPO[e.tipo] + '</small>' };
    });
  }
  // Rutas explícitas donde una curva directa cruzaría otra tabla.
  var RUTA = {
    'PLANTA>LINEA_BASE': { puntos: [[330, 240], [330, 290], [650, 290], [650, 315]] },
    'PLANTA>EQUIPO': { puntos: [[376, 228], [395, 228], [395, 597], [414, 597]] },
    'CONTRATO>VERIFICACION': { arco: 24 },
    'CONTRATO>CALCULO_AHORRO': { dx1: -40 },
    'VERIFICACION>CALCULO_AHORRO': { dx1: 40 },
    'PLANTA>VARIABLE_OPERACION': { dx0: -40 },
    'RECURSO>PUNTO_MEDICION': { dy1: -10 },
    'PUNTO_MEDICION>EQUIPO': { dy0: 10 }
  };
  function aristas() {
    ARISTAS = [];
    INF.relaciones.forEach(function (r) {
      var extra = RUTA[r.de + '>' + r.a] || {};
      if (r.via) {
        ARISTAS.push({ de: r.de, a: r.via, cardDe: '1', cardA: 'N', etiqueta: r.verbo, grupo: [r.de, r.via, r.a], rel: r });
        ARISTAS.push({ de: r.via, a: r.a, cardDe: 'N', cardA: '1', grupo: [r.de, r.via, r.a], rel: r });
        return;
      }
      ARISTAS.push(Object.assign({ de: r.de, a: r.a, cardDe: '1', cardA: 'N', etiqueta: r.verbo, clase: r.rn1 ? 'rn1' : '', rel: r }, extra));
    });
    INF.multivaluados.forEach(function (m) { ARISTAS.push({ de: m.de, a: m.tabla, cardDe: '1', cardA: 'N', etiqueta: m.atributo, clase: 'evento' }); });
    return ARISTAS;
  }

  function render() {
    var apps = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'];
    return V.cabecera({
      titulo: 'Arquitectura de información', semilla: 14, lamina: 'informacion',
      alt: 'Grabado de un corte geológico con estratos, hojas fósiles y dos núcleos de muestreo graduados.',
      pregunta: '¿Qué información necesita el proceso y cómo se protege la regla «no se factura sin ahorro verificado»?',
      entrada: INF.intro,
      sumario: [['modelo', 'Modelo de datos'], ['flujo-dato', 'Flujo del dato'], ['rn1', 'La cadena de RN1'], ['crud', 'Matriz CRUD'], ['diccionario', 'Diccionario']]
    }) +
    '<section class="seccion" id="modelo"><div class="contenido">' +
      '<h2>Quince entidades, dieciocho tablas</h2>' +
      '<p class="intro">Arriba la relación comercial, en el centro el cálculo del ahorro y abajo la medición física. Toca una tabla para ver sus atributos, sus relaciones y qué aplicación la crea. Las dos entidades débiles llevan doble borde; las tablas puente y de atributos multivaluados, borde discontinuo.</p>' +
      '<div class="plancha">' +
        '<div class="plancha-barra"><span class="ayuda">Modelo relacional en PostgreSQL: llaves primarias y foráneas con su cardinalidad.</span>' +
          '<span class="acciones" style="margin:0"><button type="button" class="btn btn-verde btn-chico" id="ver-rn1">' + V.icono('rastro') + 'Seguir la cadena de RN1</button><button type="button" class="btn btn-claro btn-chico" id="limpiar-mer">Ver todo</button>' + V.botonPantalla() + '</span></div>' +
        V.diagrama({ id: 'mer', ancho: W, alto: H, nodos: nodos(), aristas: aristas(), zonas: [
          { x: 6, y: 8, w: 988, h: 162, titulo: 'Relación comercial' },
          { x: 6, y: 178, w: 988, h: 196, titulo: 'Cálculo del ahorro' },
          { x: 6, y: 388, w: 988, h: 244, titulo: 'Medición física' }
        ] }) +
        '<div class="leyenda"><span><i style="border-width:1.5px"></i>Entidad fuerte</span><span><i style="box-shadow:0 0 0 2px #fff,0 0 0 3.5px var(--verde)"></i>Entidad débil</span><span><i style="border-style:dashed"></i>Puente o multivaluado</span><span><i class="l-api"></i>Llave foránea 1:N</span><span><i class="l-evento"></i>Atributo multivaluado</span></div>' +
      '</div>' +
      '<div class="acciones"><a class="btn btn-claro btn-chico" href="descargas/MER-1-conceptual-Chen.pdf" target="_blank" rel="noopener">' + V.icono('documento') + 'MER conceptual (Chen, A3)</a>' +
        '<a class="btn btn-claro btn-chico" href="descargas/MER-2-relacional.pdf" target="_blank" rel="noopener">' + V.icono('documento') + 'Modelo relacional (A3)</a>' +
        '<a class="btn btn-claro btn-chico" href="descargas/VIRIDIA-modelo-relacional.sql" download>' + V.icono('datos') + 'Script SQL (18 tablas y restricciones)</a></div>' +
      '<div class="dos-col" style="margin-top:2rem">' + INF.decisiones.map(function (d) { return '<div><h3>' + t(d.titulo) + '</h3><p style="color:var(--texto-2);font-size:.96rem">' + t(d.texto) + '</p></div>'; }).join('') +
        '<div><h3>Atributos derivados</h3><p style="color:var(--texto-2);font-size:.96rem">' + t(INF.derivados) + '</p></div></div>' +
    '</div></section>' +

    '<section class="seccion banda" id="flujo-dato"><div class="contenido">' +
      '<h2>Cómo fluye el dato de consumo</h2>' +
      '<p class="intro">Capturar una vez y reutilizar: la lectura es el dato del que depende todo el modelo.</p>' +
      '<div class="cadena" id="pasos-dato" style="grid-template-columns:repeat(4,minmax(0,1fr))"><span class="savia"></span>' + INF.flujoDato.map(function (f, k) {
        return '<div class="cadena-paso"><div class="punto"></div><b>' + (k + 1) + '. ' + f.paso + '</b>' + t(f.texto) + '</div>';
      }).join('') + '</div>' +
      '<div class="acciones"><button type="button" class="btn btn-verde" id="reproducir-dato">' + V.icono('reproducir') + 'Seguir una lectura</button></div>' +
    '</div></section>' +

    '<section class="seccion" id="rn1"><div class="contenido dos-col">' +
      '<div><h2>La cadena que protege RN1</h2><p>' + t(INF.cadenaRN1) + '</p></div>' +
      '<div><div class="traza-rn1" style="font-size:.9rem;margin:0 0 1.2rem"><span>FACTURA</span><i>→</i><span>CALCULO_AHORRO</span><i>→</i><span>LINEA_BASE (versión)</span></div>' +
        '<h3>Restricciones en la base de datos</h3><ul style="padding-left:1.1rem;margin:0">' + INF.restricciones.map(function (r) { return '<li style="margin-bottom:.5rem">' + V.chip(r.regla) + ' ' + t(r.texto) + '</li>'; }).join('') + '</ul></div>' +
    '</div></section>' +

    '<section class="seccion banda" id="crud"><div class="contenido">' +
      '<h2>Matriz CRUD: quién crea, lee o actualiza cada tabla</h2>' +
      '<p class="intro">' + t(D.aplicaciones.notaCrud) + '</p>' +
      '<div class="tabla-envoltura" style="padding:.8rem"><table class="matriz crud"><thead><tr><th class="fila">Tabla</th>' + apps.map(function (a) { return '<th><button type="button" data-detalle="' + a + '">' + a + '<br><span style="font-family:var(--sans);font-weight:400">' + V.esc(V.porId(D.aplicaciones.apps, a).corto) + '</span></button></th>'; }).join('') + '</tr></thead><tbody>' +
        INF.entidades.map(function (e) {
          var fila = D.aplicaciones.crud[e.id] || {};
          return '<tr><th class="fila"><button type="button" data-detalle="' + e.id + '" class="mono" style="font-size:.78rem">' + e.id + '</button></th>' + apps.map(function (a) {
            var v = fila[a] || '';
            return '<td class="' + (v.indexOf('C') >= 0 ? 'reg' : v ? 'lee' : 'vacia') + '">' + v + '</td>';
          }).join('') + '</tr>';
        }).join('') +
      '</tbody></table></div>' +
      '<p class="nota" style="margin-top:1rem">En verde, la aplicación que crea la tabla (sistema de registro). A10 no aparece porque no maneja entidades del negocio.</p>' +
    '</div></section>' +

    '<section class="seccion" id="diccionario"><div class="contenido">' +
      '<h2>Diccionario de datos resumido</h2>' +
      '<div class="tabla-envoltura"><table class="tabla"><thead><tr><th>Tabla</th><th>Descripción</th><th>Atributos clave</th></tr></thead><tbody>' +
        INF.entidades.map(function (e) { return '<tr data-sel="' + e.id + '"><td><span class="mono" style="font-size:.82rem;font-weight:600">' + e.id + '</span></td><td>' + t(e.descripcion) + '</td><td>' + t(e.atributos) + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
    '</div></section>';
  }

  function enfocarEntidad(id) {
    var diag = V.$('#mer');
    if (!diag) return;
    V.$$('.nodo', diag).forEach(function (n) { n.classList.toggle('elegido', n.getAttribute('data-id') === id); });
    if (!id || !V.porId(INF.entidades, id)) { V.enfocar(diag, null); return; }
    var ids = [id], ks = [];
    ARISTAS.forEach(function (a, k) {
      var g = a.grupo || [a.de, a.a];
      if (g.indexOf(id) >= 0) { ks.push(k); g.forEach(function (x) { if (ids.indexOf(x) < 0) ids.push(x); }); }
    });
    V.enfocar(diag, ids, ks);
  }
  function cadenaRN1() {
    var diag = V.$('#mer');
    V.panel.cerrar(true);
    var ks = [];
    ARISTAS.forEach(function (a, k) { if (a.clase === 'rn1') ks.push(k); });
    V.enfocar(diag, ['FACTURA', 'CALCULO_AHORRO', 'LINEA_BASE'], ks);
    var c = function (id) { var n = nodos().filter(function (x) { return x.id === id; })[0]; return V.centroNodo(n); };
    V.pulso(diag, [c('FACTURA'), c('CALCULO_AHORRO'), c('LINEA_BASE')], W, H, 1600);
  }
  function seguirLectura() {
    var pasos = V.$$('#pasos-dato .cadena-paso'), savia = V.$('#pasos-dato .savia');
    pasos.forEach(function (p) { p.classList.remove('vivo'); }); savia.style.width = '0';
    pasos.forEach(function (p, k) {
      setTimeout(function () { p.classList.add('vivo'); savia.style.width = (86 * k / (pasos.length - 1)) + '%'; }, V.movimiento() ? 150 + k * 600 : 0);
    });
  }

  V.vistas.informacion = {
    titulo: 'Arquitectura de información', render: render,
    montar: function (raiz) {
      raiz.addEventListener('click', function (e) {
        var n = e.target.closest('#mer .nodo'); if (n) { V.detalle(n.getAttribute('data-id')); return; }
        if (e.target.closest('#ver-rn1')) { cadenaRN1(); return; }
        if (e.target.closest('#limpiar-mer')) { V.panel.cerrar(); V.enfocar(V.$('#mer'), null); return; }
        if (e.target.closest('#reproducir-dato')) { seguirLectura(); return; }
        var f = e.target.closest('tr[data-sel]'); if (f) V.detalle(f.getAttribute('data-sel'));
      });
    },
    alSeleccionar: enfocarEntidad
  };
})();
