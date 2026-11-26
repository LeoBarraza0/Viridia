/* Diagramas interactivos: nodos HTML (botones accesibles) posicionados en % sobre un SVG de aristas.
   El contenedor conserva la proporción ancho/alto, así que las coordenadas del SVG y de los nodos coinciden.
   Lo usan Información (MER), Aplicaciones, Tecnología, las vistas ArchiMate y la red de la sede.
   Aristas: { de, a, clase, puntos?, arco?, vertical?, etiqueta?, fija?, cardDe?, cardA?, fin?, inicio?, grupo? }
     fin / inicio: 'flecha' | 'abierta' (servicio, influencia) | 'hueco' (realización) | 'rombo' (agregación)
                   | 'rombo-lleno' (composición) | 'punto' (asignación) */
(function () {
  'use strict';
  var V = window.V;

  function pct(v, total) { return (100 * v / total).toFixed(3) + '%'; }
  function centro(n) { return [n.x + n.w / 2, n.y + n.h / 2]; }

  // Trayecto entre dos nodos: vertical u horizontal según la posición relativa, con tangentes suaves.
  function trayecto(a, b, ar) {
    if (ar.puntos) {
      var n = ar.puntos.length;
      ar._p0 = ar.puntos[0]; ar._p1 = ar.puntos[n - 1]; ar._q0 = ar.puntos[1]; ar._q1 = ar.puntos[n - 2];
      return 'M' + ar.puntos.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L');
    }
    var ca = centro(a), cb = centro(b), dx = cb[0] - ca[0], dy = cb[1] - ca[1], p0, p1, c0, c1;
    if (ar.arco) {
      p0 = [ca[0], a.y]; p1 = [cb[0], b.y];
      ar._p0 = [p0[0], p0[1] - 10]; ar._p1 = [p1[0], p1[1] - 10];
      var alto = Math.min(p0[1], p1[1]) - ar.arco;
      return 'M' + p0[0] + ' ' + p0[1] + ' C' + p0[0] + ' ' + alto + ' ' + p1[0] + ' ' + alto + ' ' + p1[0] + ' ' + p1[1];
    }
    if (ar.vertical || Math.abs(dy) * 1.4 > Math.abs(dx)) {
      p0 = [ca[0] + (ar.dx0 || 0), dy > 0 ? a.y + a.h : a.y];
      p1 = [cb[0] + (ar.dx1 || 0), dy > 0 ? b.y : b.y + b.h];
      var m = (p0[1] + p1[1]) / 2; c0 = [p0[0], m]; c1 = [p1[0], m];
    } else {
      p0 = [dx > 0 ? a.x + a.w : a.x, ca[1] + (ar.dy0 || 0)];
      p1 = [dx > 0 ? b.x : b.x + b.w, cb[1] + (ar.dy1 || 0)];
      var mx = (p0[0] + p1[0]) / 2; c0 = [mx, p0[1]]; c1 = [mx, p1[1]];
    }
    ar._p0 = p0; ar._p1 = p1;
    return 'M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' C' + c0[0].toFixed(1) + ' ' + c0[1].toFixed(1) + ' ' + c1[0].toFixed(1) + ' ' + c1[1].toFixed(1) + ' ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1);
  }
  function hacia(p, q, d) { var dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1; return [p[0] + dx / l * d, p[1] + dy / l * d]; }

  // Puntas de flecha de la notación (ArchiMate y genéricas), en unidades del diagrama.
  function marcadores(id) {
    var m = function (nombre, forma, ref, w) { return '<marker id="' + id + '-' + nombre + '" viewBox="0 0 12 12" refX="' + ref + '" refY="6" markerWidth="' + (w || 9) + '" markerHeight="' + (w || 9) + '" markerUnits="userSpaceOnUse" orient="auto-start-reverse">' + forma + '</marker>'; };
    return '<defs>' +
      m('flecha', '<path d="M1 1 L11 6 L1 11 Z" class="mk-lleno"/>', 10.5) +
      m('hueco', '<path d="M1 1 L11 6 L1 11 Z" class="mk-hueco"/>', 10.5, 11) +
      m('abierta', '<path d="M2 1.5 L11 6 L2 10.5" class="mk-linea"/>', 10.5) +
      // Rombo y punto van al inicio: con auto-start-reverse su eje x apunta hacia el nodo, así que se anclan por el extremo lejano.
      m('rombo', '<path d="M1 6 L6 2 L11 6 L6 10 Z" class="mk-hueco"/>', 11, 12) +
      m('rombo-lleno', '<path d="M1 6 L6 2 L11 6 L6 10 Z" class="mk-lleno"/>', 11, 12) +
      m('punto', '<circle cx="6" cy="6" r="3.2" class="mk-lleno"/>', 9.2, 8) +
      '</defs>';
  }

  V.diagrama = function (o) {
    var W = o.ancho, H = o.alto, porId = {};
    o.nodos.forEach(function (n) { porId[n.id] = n; });
    var zonas = (o.zonas || []).map(function (z) {
      return '<div class="zona ' + (z.clase || '') + '" style="left:' + pct(z.x, W) + ';top:' + pct(z.y, H) + ';width:' + pct(z.w, W) + ';height:' + pct(z.h, H) + '">' +
        (z.titulo ? '<span class="zona-titulo">' + z.titulo + '</span>' : '') + '</div>';
    }).join('');
    var paths = '', textos = '';
    (o.aristas || []).forEach(function (ar, k) {
      var a = porId[ar.de], b = porId[ar.a];
      if (!ar.puntos && (!a || !b)) return; // con puntos basta la geometría: sirve para relaciones entre grupos
      var d = trayecto(a, b, ar);
      var grupo = (ar.grupo || [ar.de, ar.a]).join(' ');
      var mk = (ar.fin ? ' marker-end="url(#' + o.id + '-' + ar.fin + ')"' : '') + (ar.inicio ? ' marker-start="url(#' + o.id + '-' + ar.inicio + ')"' : '');
      paths += '<path d="' + d + '" class="' + (ar.clase || '') + '" data-k="' + k + '" data-grupo="' + grupo + '"' + (ar.id ? ' data-id="' + ar.id + '"' : '') + mk + '/>';
      var largo = ar._p0 && ar._p1 ? Math.hypot(ar._p1[0] - ar._p0[0], ar._p1[1] - ar._p0[1]) : 0;
      if (ar.cardDe && ar.cardA && largo && largo < 56) {
        textos += '<text class="card" x="' + ((ar._p0[0] + ar._p1[0]) / 2).toFixed(1) + '" y="' + (Math.min(ar._p0[1], ar._p1[1]) - 5).toFixed(1) + '" text-anchor="middle">' + ar.cardDe + ':' + ar.cardA + '</text>';
      } else {
        if (ar.cardDe && ar._p0) { var q0 = hacia(ar._p0, ar._q0 || ar._p1, 15); textos += '<text class="card" x="' + (q0[0] + 4).toFixed(1) + '" y="' + (q0[1] + 3).toFixed(1) + '">' + ar.cardDe + '</text>'; }
        if (ar.cardA && ar._p1) { var q1 = hacia(ar._p1, ar._q1 || ar._p0, 15); textos += '<text class="card" x="' + (q1[0] + 4).toFixed(1) + '" y="' + (q1[1] + 3).toFixed(1) + '">' + ar.cardA + '</text>'; }
      }
      if (ar.etiqueta && ar._p0) {
        var pe = ar.posEtiqueta || [(ar._p0[0] + (ar._q0 || ar._p1)[0]) / 2, (ar._p0[1] + (ar._q0 || ar._p1)[1]) / 2];
        if (!ar.posEtiqueta && !ar.puntos) pe = [(ar._p0[0] + ar._p1[0]) / 2, (ar._p0[1] + ar._p1[1]) / 2];
        textos += '<text x="' + (pe[0] + (ar.fija ? 0 : 5)).toFixed(1) + '" y="' + (pe[1] - 4).toFixed(1) + '" data-k="' + k + '"' + (ar.fija ? ' class="fija" text-anchor="middle"' : '') + '>' + V.esc(ar.etiqueta) + '</text>';
      }
    });
    var nodos = o.nodos.map(function (n) {
      return '<button type="button" class="nodo ' + (n.clase || '') + '" data-id="' + n.id + '" style="left:' + pct(n.x, W) + ';top:' + pct(n.y, H) + ';width:' + pct(n.w, W) + ';height:' + pct(n.h, H) + '"' +
        ' aria-label="' + V.esc(n.etiqueta || n.id) + '">' + (n.icono ? '<span class="ico-archi" aria-hidden="true">' + V.iconoArchi(n.icono) + '</span>' : '') + n.html + '</button>';
    }).join('');
    return '<div class="desplaza"><div class="diagrama' + (o.clase ? ' ' + o.clase : '') + '" id="' + o.id + '" style="aspect-ratio:' + W + '/' + H + ';--proporcion:' + (W / H).toFixed(3) + (o.minimo ? ';min-width:' + o.minimo + 'px' : '') + '">' + zonas +
      '<svg class="aristas" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true">' + marcadores(o.id) + paths + textos + '</svg>' + nodos + '</div></div>';
  };

  // Íconos de tipo de elemento de ArchiMate 3.2, dibujados con un solo trazo.
  var ARCHI = {
    impulsor: '<circle cx="8" cy="8" r="5.2"/><path d="M8 1.5v13M1.5 8h13M3.4 3.4l9.2 9.2M12.6 3.4l-9.2 9.2"/>',
    meta: '<circle cx="8" cy="8" r="6"/><circle cx="8" cy="8" r="3.4"/><circle cx="8" cy="8" r="0.9" class="relleno"/>',
    curso: '<circle cx="9.5" cy="9" r="5"/><circle cx="9.5" cy="9" r="2.2"/><path d="M1.5 1.5l6 6M1.5 1.5h3.5M1.5 1.5v3.5"/>',
    capacidad: '<path d="M2 14h12V2h-4v4H6v4H2z"/><path d="M6 14v-4M10 14V6"/>',
    recurso: '<rect x="1.5" y="4" width="11" height="8" rx="2"/><path d="M14.5 6.5v3M4.5 6.5v3M7 6.5v3M9.5 6.5v3"/>',
    actor: '<circle cx="8" cy="3.5" r="2.2"/><path d="M8 5.7v5M4 7.6h8M8 10.7l-3 4M8 10.7l3 4"/>',
    rol: '<ellipse cx="12" cy="8" rx="2.2" ry="4"/><path d="M12 4H4.5a2.2 4 0 0 0 0 8H12"/>',
    componente: '<rect x="4" y="2" width="10" height="12"/><rect x="1.5" y="4.5" width="5" height="2.6" class="relleno-blanco"/><rect x="1.5" y="9" width="5" height="2.6" class="relleno-blanco"/>',
    interfaz: '<circle cx="10.5" cy="8" r="3.5"/><path d="M1.5 8H7"/>',
    dato: '<rect x="1.5" y="2.5" width="13" height="11"/><path d="M1.5 5.5h13"/>',
    nodo: '<path d="M1.5 5l3-3h10v9l-3 3H1.5z"/><path d="M1.5 5h10v9M11.5 5l3-3"/>',
    equipo: '<rect x="2.5" y="2" width="11" height="8" rx="1"/><path d="M1 13.5h14M5 10l-1 3.5M11 10l1 3.5"/>',
    sistema: '<circle cx="7" cy="9" r="5"/><path d="M5 4.4a5 5 0 0 1 9 2.6"/>',
    red: '<circle cx="3" cy="4" r="1.8"/><circle cx="13" cy="4" r="1.8"/><circle cx="3" cy="12" r="1.8"/><circle cx="13" cy="12" r="1.8"/><path d="M4.8 4h6.4M4.8 12h6.4M3 5.8v4.4M13 5.8v4.4"/>',
    ubicacion: '<path d="M8 15s5-5.3 5-9a5 5 0 0 0-10 0c0 3.7 5 9 5 9z"/><circle cx="8" cy="6" r="1.8"/>',
    grupo: '<path d="M1.5 4.5h5l1.2-2H14.5v11H1.5z"/>'
  };
  V.iconoArchi = function (tipo) {
    return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">' + (ARCHI[tipo] || '') + '</svg>';
  };

  // Leyenda de una vista ArchiMate: elementos [ícono, nombre, clase de capa] y tipos de relación.
  var REL = {
    influencia: ['Influencia', '<path d="M1 6h24" stroke-dasharray="4 3"/><path d="M21 2.5 27 6l-6 3.5"/>'],
    agregacion: ['Agregación', '<path d="M11 6h16"/><path d="M1 6l5-3.4L11 6 6 9.4z" fill="#fff"/>'],
    composicion: ['Composición', '<path d="M11 6h16"/><path d="M1 6l5-3.4L11 6 6 9.4z" fill="currentColor"/>'],
    realizacion: ['Realización', '<path d="M1 6h20" stroke-dasharray="1.5 2.5"/><path d="M21 2.5 27 6l-6 3.5z" fill="#fff"/>'],
    asignacion: ['Asignación', '<circle cx="3" cy="6" r="2.2" fill="currentColor"/><path d="M5 6h17"/><path d="M21 2.5 27 6l-6 3.5z" fill="currentColor"/>'],
    servicio: ['Servicio', '<path d="M1 6h25"/><path d="M21 2.5 27 6l-6 3.5"/>'],
    acceso: ['Acceso', '<path d="M1 6h24" stroke-dasharray="1.5 2.5"/><path d="M23 3.5 27 6l-4 2.5"/>'],
    flujo: ['Flujo', '<path d="M1 6h20" stroke-dasharray="4 3" class="lg-agua"/><path d="M21 2.5 27 6l-6 3.5z" fill="currentColor"/>'],
    soporte: ['Soporte (S)', '<path d="M1 6h26" stroke-dasharray="2 3" class="lg-lima"/>']
  };
  V.leyendaArchi = function (elementos, relaciones) {
    return '<div class="leyenda leyenda-archi">' + elementos.map(function (e) {
      return '<span><i class="lg-archi ' + e[2] + '">' + V.iconoArchi(e[0]) + '</i>' + e[1] + '</span>';
    }).join('') + '<span class="leyenda-sep" aria-hidden="true"></span>' + relaciones.map(function (r) {
      return '<span><svg class="lg-rel" viewBox="0 0 28 12" aria-hidden="true">' + REL[r][1] + '</svg>' + REL[r][0] + '</span>';
    }).join('') + '</div>';
  };

  // Enciende un conjunto de nodos y las aristas cuyo grupo cae dentro del conjunto (o las indicadas).
  V.enfocar = function (diag, ids, aristasK) {
    if (!diag) return;
    var foco = ids && ids.length;
    diag.classList.toggle('foco', !!foco);
    var set = {}; (ids || []).forEach(function (i) { set[i] = true; });
    V.$$('.nodo', diag).forEach(function (n) { n.classList.toggle('encendido', !!set[n.getAttribute('data-id')]); });
    V.$$('svg.aristas > path', diag).forEach(function (p) { // solo aristas: las formas de las puntas viven en <defs>
      var k = p.getAttribute('data-k');
      var on = aristasK ? aristasK.indexOf(Number(k)) >= 0 : foco && p.getAttribute('data-grupo').split(' ').every(function (g) { return set[g]; });
      p.classList.toggle('encendida', !!on);
      var t = diag.querySelector('svg.aristas text[data-k="' + k + '"]');
      if (t) t.classList.toggle('encendida', !!on);
    });
  };
  // Aristas que tocan un nodo: índices y vecinos (para resaltar al elegirlo).
  V.vecinos = function (aristas, id) {
    var ids = [id], ks = [];
    aristas.forEach(function (a, k) {
      var g = a.grupo || [a.de, a.a];
      if (a.de === id || a.a === id || g.indexOf(id) >= 0) { ks.push(k); g.concat([a.de, a.a]).forEach(function (x) { if (x && ids.indexOf(x) < 0) ids.push(x); }); }
    });
    return { ids: ids, ks: ks };
  };

  // Mueve un pulso de savia por una lista de puntos [x, y] en coordenadas del diagrama.
  V.pulso = function (diag, puntos, W, H, ms) {
    if (!diag || !V.movimiento() || !diag.animate) return Promise.resolve();
    var p = document.createElement('div');
    p.className = 'pulso';
    diag.appendChild(p);
    var marcos = puntos.map(function (q) { return { left: (100 * q[0] / W) + '%', top: (100 * q[1] / H) + '%' }; });
    var anim = p.animate(marcos, { duration: ms || 900, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' });
    return anim.finished.then(function () { p.remove(); }, function () { p.remove(); });
  };
  V.centroNodo = function (n) { return centro(n); };
})();
