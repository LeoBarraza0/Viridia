/* Trazabilidad: la tabla de punta a punta del documento como una nervadura.
   Eliges un objetivo, capacidad, aplicación, nodo o proyecto y la savia recorre todas las cadenas que lo tocan. */
(function () {
  'use strict';
  var V = window.V, D = V.datos, t = V.t, FILAS = D.trazabilidad;
  var COLS = [
    { k: 'actividad', titulo: 'Actividad (BPMN)', w: 204 },
    { k: 'entidades', titulo: 'Entidad (MER)', w: 168 },
    { k: 'apps', titulo: 'Aplicación', w: 64 },
    { k: 'nodos', titulo: 'Nodo', w: 64 },
    { k: 'capacidades', titulo: 'Capacidad', w: 64 },
    { k: 'objetivos', titulo: 'Objetivo', w: 64 },
    { k: 'proyectos', titulo: 'Proyecto', w: 64 }
  ];
  var GAP = 58, ALTO_FILA = 30, CAB = 40, W, H, items = [], venas = [], filtro = null;
  var SIRVEN_A_TODAS = { A10: 'A10 (identidad y seguridad) protege a todas las aplicaciones: sirve a todas las filas.', T13: 'T13 (identidad y llaves) sirve a todas las filas.', T14: 'T14 (registro y monitoreo) sirve a todas las filas.', T15: 'T15 (región secundaria) no aparece en ninguna fila: respalda a T10, T11 y T12, que sí aparecen.', C10: 'C10 (talento) no tiene actividad en el proceso de servicio: es un proceso interno (S5) y el roadmap la cubre con P10.' };

  function valores(fila, k) { return k === 'actividad' ? [fila.actividad] : fila[k]; }
  function orden(k, a, b) {
    if (k === 'actividad' || k === 'entidades') return 0;
    var n = function (s) { return s === 'SaaS' ? 999 : Number(s.replace(/\D/g, '')); };
    return n(a) - n(b);
  }
  function construir() {
    items = []; venas = [];
    var x = 12, porCol = [];
    COLS.forEach(function (c, ci) {
      var lista = [];
      FILAS.forEach(function (f) { valores(f, c.k).forEach(function (v) { if (lista.indexOf(v) < 0) lista.push(v); }); });
      lista.sort(function (a, b) { return orden(c.k, a, b); });
      porCol.push(lista);
      c.x = x; x += c.w + GAP;
    });
    W = x - GAP + 12;
    var maxN = Math.max.apply(null, porCol.map(function (l) { return l.length; }));
    H = CAB + maxN * ALTO_FILA + 10;
    porCol.forEach(function (lista, ci) {
      var paso = (H - CAB - 10) / lista.length;
      lista.forEach(function (v, k) { items.push({ col: ci, v: v, x: COLS[ci].x, y: CAB + paso * k + paso / 2, w: COLS[ci].w }); });
    });
    var mapa = {};
    FILAS.forEach(function (f, r) {
      for (var ci = 0; ci < COLS.length - 1; ci++) {
        valores(f, COLS[ci].k).forEach(function (a) {
          valores(f, COLS[ci + 1].k).forEach(function (b) {
            var clave = ci + '|' + a + '|' + b;
            if (!mapa[clave]) { mapa[clave] = { ci: ci, a: a, b: b, filas: [] }; venas.push(mapa[clave]); }
            mapa[clave].filas.push(r);
          });
        });
      }
    });
  }
  function item(ci, v) { for (var i = 0; i < items.length; i++) if (items[i].col === ci && items[i].v === v) return items[i]; return null; }
  function svg() {
    construir();
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Nervadura de trazabilidad entre actividades, entidades, aplicaciones, nodos, capacidades, objetivos y proyectos" style="min-width:900px">';
    s += COLS.map(function (c) { return '<text class="col-t" x="' + c.x + '" y="18">' + c.titulo + '</text>'; }).join('');
    s += venas.map(function (v, k) {
      var a = item(v.ci, v.a), b = item(v.ci + 1, v.b), x0 = a.x + a.w, x1 = b.x, m = (x0 + x1) / 2;
      return '<path class="vena" data-k="' + k + '" d="M' + x0 + ' ' + a.y.toFixed(1) + ' C' + m + ' ' + a.y.toFixed(1) + ' ' + m + ' ' + b.y.toFixed(1) + ' ' + x1 + ' ' + b.y.toFixed(1) + '"/>';
    }).join('');
    s += items.map(function (it, k) {
      var esAct = it.col === 0, etiqueta = esAct ? (it.v.length > 34 ? it.v.slice(0, 33) + '…' : it.v) : it.col === 1 ? it.v : it.v;
      return '<g class="n-g" data-k="' + k + '" data-v="' + V.esc(it.v) + '" tabindex="0" role="button" aria-label="' + V.esc(it.v) + '"><title>' + V.esc(it.v) + '</title><rect x="' + it.x + '" y="' + (it.y - 11) + '" width="' + it.w + '" height="22" rx="3"/>' +
        '<text class="' + (esAct ? '' : 'id') + '" x="' + (it.x + 6) + '" y="' + (it.y + 4) + '">' + V.esc(etiqueta) + '</text></g>';
    }).join('');
    return s + '</svg>';
  }

  function render(params) {
    filtro = params.f || null;
    var grupos = [
      ['Objetivos', D.estrategia.objetivos.map(function (o) { return o.id; })],
      ['Capacidades', D.estrategia.capacidades.map(function (c) { return c.id; })],
      ['Aplicaciones', D.aplicaciones.apps.map(function (a) { return a.id; })],
      ['Proyectos', D.transformacion.proyectos.map(function (p) { return p.id; })]
    ];
    return V.cabecera({
      titulo: 'Trazabilidad de punta a punta', semilla: 52, lamina: 'portada',
      alt: 'Grabado de una hoja de uva de playa cuyas nervaduras se convierten en una red de nodos.',
      pregunta: 'De cada actividad del proceso al objetivo estratégico y al proyecto que la hace posible.',
      entrada: 'Es la tabla de trazabilidad del documento final, dibujada como la nervadura del logo. Elige un elemento y la savia recorre todas las cadenas que lo tocan.',
      sumario: [['nervadura', 'Nervadura'], ['coherencia-t', 'Prueba de consistencia'], ['tabla-t', 'Tabla completa']]
    }) +
    '<section class="seccion" id="nervadura"><div class="contenido">' +
      '<h2>Elige dónde empezar</h2>' +
      '<div style="display:grid;gap:.6rem;margin-bottom:1.2rem">' + grupos.map(function (g) {
        return '<div class="filtros" role="group" aria-label="' + g[0] + '"><span class="etq-grupo" style="min-width:6.5rem">' + g[0] + ':</span>' + g[1].map(function (id) {
          return '<button type="button" class="filtro" data-f="' + id + '" aria-pressed="' + (filtro === id) + '" title="' + V.esc(V.indice[id] ? V.indice[id].nombre : id) + '">' + id + '</button>';
        }).join('') + '</div>';
      }).join('') + '<div class="filtros"><button type="button" class="btn btn-claro btn-chico" data-f="">Quitar el filtro</button></div></div>' +
      '<p id="traza-resumen" class="nota" aria-live="polite" style="margin-bottom:1rem">Sin filtro: se ven todas las cadenas.</p>' +
      '<div class="plancha"><div class="desplaza nervadura" id="nervadura-svg" style="padding:1rem">' + svg() + '</div></div>' +
    '</div></section>' +
    '<section class="seccion banda" id="coherencia-t"><div class="contenido">' +
      '<h2>Prueba de consistencia</h2><p class="intro">' + t(D.notaTrazabilidad) + '</p>' +
      '<div class="salud revelar">' + consistencia().map(function (c) { return '<div><strong>' + c.v + '</strong><span>' + c.t + '</span></div>'; }).join('') + '</div>' +
    '</div></section>' +
    '<section class="seccion" id="tabla-t"><div class="contenido">' +
      '<h2>Tabla completa</h2>' +
      '<div class="tabla-envoltura"><table class="tabla" id="tabla-traza"><thead><tr><th>Actividad (BPMN)</th><th>Entidad (MER)</th><th>Aplic.</th><th>Nodos</th><th>Capac.</th><th>Objetivo</th><th>Proyecto</th></tr></thead><tbody>' +
        FILAS.map(function (f, r) {
          return '<tr data-r="' + r + '"><td>' + t(f.actividad) + (f.act ? ' <a class="cita-fuente" href="#/procesos?bpmn=' + f.act.split(':')[0] + '">' + f.act.split(':')[0].toUpperCase() + '</a>' : '') + '</td><td>' + V.chips(f.entidades) + '</td><td>' + V.chips(f.apps) + '</td><td>' + V.chips(f.nodos) + '</td><td>' + V.chips(f.capacidades) + '</td><td>' + V.chips(f.objetivos) + '</td><td>' + V.chips(f.proyectos) + '</td></tr>';
        }).join('') + '</tbody></table></div>' +
    '</div></section>';
  }
  function consistencia() {
    var en = function (k) { var s = {}; FILAS.forEach(function (f) { f[k].forEach(function (v) { s[v] = 1; }); }); return s; };
    var caps = en('capacidades'), apps = en('apps'), nodos = en('nodos'), oe = en('objetivos');
    delete nodos.SaaS;
    return [
      { v: Object.keys(oe).length + '/5', t: 'objetivos estratégicos aparecen en la tabla' },
      { v: Object.keys(caps).length + '/10', t: 'capacidades con al menos una actividad; C10 la cubre P10' },
      { v: (Object.keys(apps).length + 1) + '/10', t: 'aplicaciones: ' + Object.keys(apps).length + ' en filas y A10, que sirve a todas' },
      { v: (Object.keys(nodos).length + 2) + '/16', t: 'nodos: ' + Object.keys(nodos).length + ' en filas, T13 y T14 sirven a todas; T15 respalda a T10, T11 y T12' }
    ];
  }

  function aplicar(id) {
    filtro = id || null;
    V.$$('.filtro[data-f]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-f') === filtro)); });
    pintar(filtro, false);
  }
  // Enciende las cadenas de un elemento. En vista previa (al pasar el cursor) no cambia el filtro, el resumen ni la URL.
  function pintar(filtro, previa) {
    var cont = V.$('#nervadura-svg'), resumen = V.$('#traza-resumen');
    if (!cont) return;
    var filas = [];
    if (filtro) FILAS.forEach(function (f, r) { COLS.forEach(function (c) { if (valores(f, c.k).indexOf(filtro) >= 0 && filas.indexOf(r) < 0) filas.push(r); }); });
    cont.classList.toggle('foco', !!filtro);
    cont.classList.toggle('previa', !!previa && !!filtro);
    V.$$('.vena', cont).forEach(function (p) {
      var v = venas[Number(p.getAttribute('data-k'))];
      p.classList.toggle('viva', v.filas.some(function (r) { return filas.indexOf(r) >= 0; }));
    });
    V.$$('.n-g', cont).forEach(function (g) {
      var it = items[Number(g.getAttribute('data-k'))];
      var vivo = filas.some(function (r) { return valores(FILAS[r], COLS[it.col].k).indexOf(it.v) >= 0; });
      g.classList.toggle('viva', vivo);
      g.classList.toggle('origen', it.v === filtro);
    });
    if (previa) return;
    V.$$('#tabla-traza tr[data-r]').forEach(function (tr) {
      var r = Number(tr.getAttribute('data-r'));
      tr.classList.toggle('resaltada', !!filtro && filas.indexOf(r) >= 0);
      tr.classList.toggle('tenue', !!filtro && filas.indexOf(r) < 0);
    });
    if (!filtro) resumen.textContent = 'Sin filtro: se ven todas las cadenas.';
    else if (!filas.length) resumen.textContent = SIRVEN_A_TODAS[filtro] || (filtro + ' no aparece en la tabla de trazabilidad.');
    else {
      var nombre = V.indice[filtro] ? V.indice[filtro].nombre : filtro;
      resumen.innerHTML = '<strong>' + V.esc(filtro) + '</strong> ' + V.esc(nombre) + ': aparece en ' + filas.length + ' de las 17 cadenas.' + (SIRVEN_A_TODAS[filtro] ? ' ' + V.esc(SIRVEN_A_TODAS[filtro]) : '');
    }
    var nuevo = '#/trazabilidad' + (filtro ? '?f=' + encodeURIComponent(filtro) : '');
    if (location.hash !== nuevo) history.replaceState(null, '', nuevo);
  }

  V.vistas.trazabilidad = {
    titulo: 'Trazabilidad', render: render,
    montar: function (raiz) {
      raiz.addEventListener('click', function (e) {
        var b = e.target.closest('[data-f]'); if (b) { aplicar(b.getAttribute('data-f')); return; }
        var g = e.target.closest('.n-g'); if (g) { var v = items[Number(g.getAttribute('data-k'))].v; aplicar(filtro === v ? null : v); }
      });
      // Vista previa: al pasar sobre un elemento se ven sus cadenas; al salir vuelve el filtro elegido.
      raiz.addEventListener('pointerover', function (e) {
        var g = e.target.closest && e.target.closest('#nervadura-svg .n-g');
        if (g) pintar(items[Number(g.getAttribute('data-k'))].v, true);
      });
      raiz.addEventListener('pointerout', function (e) {
        var g = e.target.closest && e.target.closest('#nervadura-svg .n-g');
        if (g && !(e.relatedTarget && g.contains(e.relatedTarget))) pintar(filtro, false);
      });
      raiz.addEventListener('keydown', function (e) {
        var g = e.target.closest && e.target.closest('.n-g');
        if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); var v = items[Number(g.getAttribute('data-k'))].v; aplicar(filtro === v ? null : v); }
      });
      if (filtro) setTimeout(function () { aplicar(filtro); }, 60);
    },
    alCambiarParams: function (p) { aplicar(p.f || null); }
  };
})();
