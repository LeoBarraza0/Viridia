/* Núcleo del activo digital: utilidades, índice de identificadores, enrutador,
   panel de detalle (fichas), curvas de nivel y animaciones compartidas.
   Cada pantalla vive en js/vistas/<nombre>.js y se registra en V.vistas. */
(function () {
  'use strict';
  var D = window.VIRIDIA_AE;
  var V = window.V = { datos: D, vistas: {}, estado: {}, ruta: { nombre: null, params: {} } };
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)');
  V.movimiento = function () { return !reducido.matches; };
  document.documentElement.classList.add('js');

  /* ---------- Utilidades ---------- */
  V.$ = function (s, r) { return (r || document).querySelector(s); };
  V.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ENT = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  V.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ENT[c]; }); };
  // Texto del archivo de datos: escapa y convierte {P} (propuesta del equipo) y CO2e.
  V.t = function (s) {
    return V.esc(s)
      .replace(/\{P\}/g, '<sup class="p" title="Propuesta del equipo">P</sup>')
      .replace(/CO2e/g, 'CO<sub>2</sub>e');
  };
  // Números con el formato del documento: punto de miles y coma decimal (también en cifras de 4 dígitos).
  V.fmt = function (n, dec) {
    dec = dec || 0;
    if (n == null || isNaN(n)) return '—';
    var neg = n < 0, s = Math.abs(n).toFixed(dec).split('.');
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (neg ? '−' : '') + s[0] + (dec ? ',' + s[1] : '');
  };
  V.pesos = function (n) { return '$ ' + V.fmt(Math.round(n)); };
  V.millones = function (n) { return '$ ' + V.fmt(n / 1e6, 1) + ' M'; };
  V.h3 = function (s) { return '<h3>' + s + '</h3>'; };
  V.lista = function (items) { return items.length ? '<ul>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '<p>—</p>'; };
  V.porId = function (arr, id) { for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i]; return null; };
  V.icono = function (nombre) { return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICONOS[nombre] || '') + '</svg>'; };
  var ICONOS = {
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    cerrar: '<path d="M6 6l12 12M18 6L6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    mas: '<path d="M12 5v14M5 12h14"/>',
    menos: '<path d="M5 12h14"/>',
    ajustar: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    descarga: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    documento: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
    hoja: '<path d="M12 21c7-3 8-11 0-18C4 10 5 18 12 21z"/><path d="M12 21V8"/>',
    reproducir: '<path d="M7 5l12 7-12 7z"/>',
    detener: '<rect x="6" y="6" width="12" height="12" rx="1.5"/>',
    rastro: '<circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 12h5l5-5M12 12l5 5"/>',
    datos: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
    subir: '<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
    buscar: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.4-4.4"/>',
    pantalla: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
    imprimir: '<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3"/><rect x="7" y="14" width="10" height="7"/>',
    lupa: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L20 20M7.5 10h5M10 7.5v5"/>'
  };
  // Botón de pantalla completa para las planchas de diagramas.
  V.botonPantalla = function () { return '<button type="button" class="btn btn-claro btn-chico" data-pantalla aria-pressed="false" title="Ver el diagrama en pantalla completa">' + V.icono('pantalla') + 'Pantalla completa</button>'; };

  /* ---------- Índice de identificadores ---------- */
  var IDX = V.indice = {};
  function reg(id, tipo, ruta, obj, nombre) { IDX[id] = { id: id, tipo: tipo, ruta: ruta, obj: obj, nombre: nombre }; }
  D.estrategia.objetivos.forEach(function (o) { reg(o.id, 'OE', 'estrategia', o, o.nombre); });
  D.estrategia.capacidades.forEach(function (c) { reg(c.id, 'C', 'estrategia', c, c.nombre); });
  D.negocio.procesos.forEach(function (p) { reg(p.id, 'PROC', 'procesos', p, p.nombre); });
  D.negocio.reglas.forEach(function (r) { reg(r.id, 'RN', 'procesos', r, r.texto); });
  D.negocio.areas.forEach(function (a) { reg(a.id, 'AREA', 'procesos', a, a.nombre); });
  D.informacion.entidades.forEach(function (e) { reg(e.id, 'ENT', 'informacion', e, e.id); });
  D.aplicaciones.apps.forEach(function (a) { reg(a.id, 'A', 'aplicaciones', a, a.nombre); });
  D.aplicaciones.externos.forEach(function (x) { reg(x.id, 'EXT', 'aplicaciones', x, x.nombre.replace('{P}', '')); });
  D.aplicaciones.mecanismos.forEach(function (m) { reg(m.id, 'MEC', 'aplicaciones', m, m.nombre.replace('{P}', '')); });
  D.aplicaciones.integraciones.forEach(function (i) { reg(i.id, 'I', 'aplicaciones', i, i.de + ' → ' + i.a.join(', ')); });
  D.tecnologia.nodos.forEach(function (n) { reg(n.id, 'T', 'tecnologia', n, n.nombre); });
  D.tecnologia.riesgos.forEach(function (r) { reg(r.id, 'R', 'tecnologia', r, r.riesgo); });
  D.transformacion.brechas.forEach(function (b) { reg(b.id, 'B', 'transformacion', b, b.desde + ' → ' + b.hacia); });
  D.transformacion.proyectos.forEach(function (p) { reg(p.id, 'P', 'transformacion', p, p.nombre); });
  D.transformacion.hitos.forEach(function (h) { reg(h.id, 'H', 'transformacion', h, h.logro); });
  D.tobe.principios.forEach(function (p) { reg(p.id, 'PA', 'transformacion', p, p.nombre); });

  var NOMBRE_TIPO = { OE: 'Objetivo estratégico', C: 'Capacidad de negocio', PROC: 'Proceso', RN: 'Regla de negocio', AREA: 'Área del organigrama', ENT: 'Entidad del modelo de datos', A: 'Aplicación', EXT: 'Sistema externo o canal', MEC: 'Mecanismo de integración', I: 'Integración', T: 'Nodo tecnológico', R: 'Riesgo tecnológico', B: 'Brecha', P: 'Proyecto del roadmap', H: 'Hito del roadmap', PA: 'Principio de arquitectura' };
  V.nombreTipo = function (tipo) { return NOMBRE_TIPO[tipo] || ''; };

  V.chip = function (id, extra) {
    var e = IDX[id];
    if (!e) return '<span class="etq">' + V.esc(id) + '</span>';
    var t = e.tipo === 'PROC' || e.tipo === 'AREA' ? 'C' : e.tipo === 'EXT' || e.tipo === 'MEC' ? 'A' : e.tipo;
    return '<a class="chip" data-t="' + t + '" data-ficha="' + V.esc(id) + '" href="#/' + e.ruta + '?sel=' + encodeURIComponent(id) + '" aria-label="' + V.esc(id + ', ' + e.nombre) + '">' + V.esc(id) + (extra || '') + '</a>';
  };
  V.chips = function (ids) { return '<span class="chips">' + (ids || []).map(function (id) { return V.chip(id); }).join('') + '</span>'; };

  /* ---------- Derivados que usan varias pantallas ---------- */
  V.integracionesDe = function (appId) {
    return D.aplicaciones.integraciones.filter(function (i) { return i.de === appId || i.a.indexOf(appId) >= 0; });
  };
  V.procesosDeApp = function (appId) {
    var r = [];
    Object.keys(D.aplicaciones.appProc).forEach(function (p) { var v = D.aplicaciones.appProc[p][appId]; if (v) r.push({ id: p, rel: v }); });
    return r;
  };
  V.claseCriticidad = function (c) { return { 'Crítica': 'critica', 'Alta': 'alta', 'Media': 'media' }[c] || 'media'; };

  /* ---------- Fichas del panel de detalle ---------- */
  function relOE(c) {
    return '<span class="chips">' + Object.keys(c.oe).map(function (oe) {
      return V.chip(oe, ' <small>' + (c.oe[oe] === 'P' ? 'principal' : 'soporte') + '</small>');
    }).join('') + '</span>';
  }
  function trazaLink(id) { return '<a class="btn btn-claro btn-chico" href="#/trazabilidad?f=' + encodeURIComponent(id) + '">' + V.icono('rastro') + 'Ver su cadena en Trazabilidad</a>'; }
  function irA(ruta, texto) { return '<a class="btn btn-claro btn-chico" href="#/' + ruta + '">' + texto + '</a>'; }

  V.fichas = {
    OE: function (o) {
      var caps = D.estrategia.capacidades.filter(function (c) { return c.oe[o.id]; });
      var kpis = D.conclusiones.kpis.filter(function (k) { return k.objetivo.indexOf(o.id) >= 0; });
      var filas = D.trazabilidad.filter(function (f) { return f.objetivos.indexOf(o.id) >= 0; });
      return {
        titulo: o.nombre,
        cuerpo: '<p>' + V.t(o.enunciado) + '</p>' + V.h3('Meta') + '<p><strong>' + V.t(o.meta) + '</strong></p>' +
          V.h3('Capacidades que lo sostienen') + '<span class="chips">' + caps.map(function (c) { return V.chip(c.id, ' <small>' + (c.oe[o.id] === 'P' ? 'P' : 'S') + '</small>'); }).join('') + '</span>' +
          (kpis.length ? V.h3('Indicadores') + V.lista(kpis.map(function (k) { return V.t(k.indicador) + ': <strong>' + V.t(k.meta) + '</strong>'; })) : '') +
          V.h3('Trazabilidad') + '<p>' + filas.length + ' de las 17 actividades de la tabla de trazabilidad llegan a este objetivo.</p>',
        pie: trazaLink(o.id)
      };
    },
    C: function (c) {
      var areas = D.negocio.areas.filter(function (a) { return a.id !== 'GER' && a.capacidades.indexOf(c.id) >= 0; });
      var procs = D.negocio.procesos.filter(function (p) { return p.capacidades.indexOf(c.id) >= 0; });
      var apps = D.aplicaciones.apps.filter(function (a) { return a.capacidades.indexOf(c.id) >= 0; });
      return {
        titulo: c.nombre,
        cuerpo: (c.critica ? '<p><span class="etq critica">Capacidad crítica</span></p>' : '') +
          '<p>' + V.t(c.porque) + '</p>' + V.h3('Objetivos que sostiene') + relOE(c) +
          V.h3('Área responsable') + V.lista(areas.map(function (a) { return V.esc(a.nombre); })) +
          V.h3('Procesos que la realizan') + V.chips(procs.map(function (p) { return p.id; })) +
          V.h3('Aplicaciones que la realizan') + (apps.length ? V.chips(apps.map(function (a) { return a.id; })) : '<p>Ninguna aplicación propia: ' + (c.id === 'C6' || c.id === 'C10' ? 'es la brecha B5, que cierra el proyecto P10.' : 'se apoya en procesos internos.') + '</p>'),
        pie: trazaLink(c.id)
      };
    },
    PROC: function (p) {
      var tipos = { estrategico: 'Proceso estratégico', misional: 'Proceso misional (principal)', apoyo: 'Proceso de apoyo' };
      var apps = D.aplicaciones.appProc[p.id] || {};
      var actores = D.negocio.actores.filter(function (a) { return a.procesos.indexOf(p.id) >= 0; });
      return {
        titulo: p.nombre,
        cuerpo: '<p><span class="etq">' + tipos[p.tipo] + '</span></p>' +
          V.h3('Capacidades que realiza') + (p.capacidades[0] === 'todas' ? '<p>Todas las capacidades.</p>' : V.chips(p.capacidades)) +
          (p.fases ? V.h3('Fases del servicio') + '<p>Fases ' + p.fases.join(', ') + ' del flujo de un cliente.</p>' : '') +
          V.h3('Actores') + V.lista(actores.map(function (a) { return V.esc(a.nombre) + ' <small>(' + a.tipo + ')</small>'; })) +
          V.h3('Aplicaciones') + (Object.keys(apps).length ? '<span class="chips">' + Object.keys(apps).map(function (a) { return V.chip(a, ' <small>' + apps[a] + '</small>'); }).join('') + '</span><p class="nota">P: soporte directo. S: consulta o apoyo.</p>' : '<p>Sin aplicación: ' + (p.id === 'E1' ? 'los indicadores se consolidan a mano desde A4, A6 y A7.' : 'brecha B5, que cierra P10.') + '</p>'),
        pie: p.tipo === 'misional' ? irA('procesos', 'Ver los BPMN') : ''
      };
    },
    RN: function (r) {
      var acts = D.negocio.actividades.filter(function (a) { return a.reglas.indexOf(r.id) >= 0; });
      var ck = D.informacion.restricciones.filter(function (x) { return x.regla === r.id; });
      return {
        titulo: r.texto,
        cuerpo: V.h3('Origen') + '<p>' + V.t(r.origen) + '</p>' +
          V.h3('Actividades que la aplican (' + acts.length + ')') + V.lista(acts.map(function (a) { return V.t(a.nombre) + ' <small class="cita-fuente">' + a.k.replace(':', ' · ') + '</small>'; })) +
          (ck.length ? V.h3('En el modelo de datos') + V.lista(ck.map(function (x) { return V.t(x.texto); })) : '') +
          (r.id === 'RN1' ? V.h3('En las aplicaciones') + '<p>La integración ' + V.chip('I4') + ' solo envía el cálculo a facturación si el ahorro es positivo.</p>' : ''),
        pie: '<a class="btn btn-claro btn-chico" href="#/procesos?regla=' + r.id + '">Resaltar en los BPMN</a>'
      };
    },
    AREA: function (a) {
      return {
        titulo: a.nombre,
        cuerpo: '<p>' + V.t(a.funcion) + '</p>' + V.h3('Capacidades') + (a.id === 'GER' ? '<p>Todas.</p>' : V.chips(a.capacidades)) +
          V.h3('Aplicaciones de las que es dueña') + V.chips(D.aplicaciones.apps.filter(function (x) { return x.propietario.indexOf(a.nombre.split(' ')[0]) === 0; }).map(function (x) { return x.id; }))
      };
    },
    ENT: function (e) {
      var tipos = { fuerte: 'Entidad fuerte', debil: 'Entidad débil', puente: 'Tabla puente (relación N:M)', multivaluado: 'Tabla de atributo multivaluado' };
      var rels = D.informacion.relaciones.filter(function (r) { return r.de === e.id || r.a === e.id; });
      var crud = D.aplicaciones.crud[e.id] || {};
      var reg = D.aplicaciones.crudRegistro[e.id];
      return {
        titulo: e.id.replace(/_/g, '_​'),
        cuerpo: '<p><span class="etq">' + tipos[e.tipo] + '</span></p><p>' + V.t(e.descripcion) + '</p>' +
          V.h3('Atributos clave') + '<p class="mono" style="font-size:.86rem">' + V.t(e.atributos) + '</p>' +
          V.h3('Relaciones') + V.lista(rels.map(function (r) { return '<strong>' + V.esc(r.de) + '</strong> ' + V.esc(r.verbo) + ' <strong>' + V.esc(r.a) + '</strong> <small class="cita-fuente">' + V.esc(r.card) + '</small><br><small>' + V.t(r.impl) + '</small>'; })) +
          V.h3('Quién la crea, lee o actualiza') + '<span class="chips">' + Object.keys(crud).map(function (a) { return V.chip(a, ' <small>' + crud[a] + '</small>'); }).join('') + '</span>' +
          '<p class="nota">Sistema de registro: <strong>' + V.esc(reg) + '</strong>.</p>'
      };
    },
    A: function (a) {
      var ints = V.integracionesDe(a.id);
      var procs = V.procesosDeApp(a.id);
      return {
        titulo: a.nombre,
        cuerpo: '<p><span class="etq ' + V.claseCriticidad(a.criticidad) + '">Criticidad ' + a.criticidad.toLowerCase() + '</span></p><p>' + V.t(a.proposito) + '</p>' +
          '<dl class="dl"><dt>Propietario</dt><dd>' + V.t(a.propietario) + '</dd><dt>Capacidad</dt><dd>' + V.chips(a.capacidades) + '</dd>' +
          '<dt>Modelo</dt><dd>' + V.t(a.modelo) + '<br><small>' + V.t(a.porqueModelo) + '</small></dd>' +
          '<dt>Nodos</dt><dd>' + V.chips(a.nodos) + '</dd><dt>RPO · RTO</dt><dd>' + V.t(a.rpo) + ' · ' + V.t(a.rto) + '<br><small>' + V.t(a.justRec) + '</small></dd></dl>' +
          V.h3('Datos que usa') + (a.datos.length ? V.chips(a.datos) : '<p>' + V.t(a.datosNota) + '</p>') +
          V.h3('Integraciones (' + ints.length + ')') + (ints.length ? V.lista(ints.map(function (i) { return V.chip(i.id) + ' ' + V.esc(i.de) + ' → ' + V.esc(i.a.join(', ')) + ' <small>' + i.forma + '</small>'; })) : '<p>Todas: verifica la identidad de cada llamada al gateway.</p>') +
          V.h3('Procesos') + (procs.length ? '<span class="chips">' + procs.map(function (p) { return V.chip(p.id, ' <small>' + p.rel + '</small>'); }).join('') + '</span>' : '<p>Protege a todos por igual.</p>'),
        pie: trazaLink(a.id)
      };
    },
    EXT: function (x) {
      var ints = V.integracionesDe(x.id);
      return { titulo: x.nombre.replace('{P}', ''), cuerpo: '<p>' + V.t(x.texto) + '</p>' + (x.propietario ? '<p>Responsable: ' + V.esc(x.propietario) + '</p>' : '') + V.h3('Integraciones') + V.lista(ints.map(function (i) { return V.chip(i.id) + ' ' + V.t(i.que); })) };
    },
    MEC: function (m) {
      var ints = D.aplicaciones.integraciones.filter(function (i) { return i.via === m.id; });
      return { titulo: m.nombre.replace('{P}', ''), cuerpo: '<p>' + V.t(m.texto) + '</p><p>Corre en el nodo ' + V.chip(m.nodo) + '.</p>' + V.h3('Integraciones que transporta (' + ints.length + ')') + V.lista(ints.map(function (i) { return V.chip(i.id) + ' ' + V.esc(i.de) + ' → ' + V.esc(i.a.join(', ')); })) };
    },
    I: function (i) {
      var mec = V.porId(D.aplicaciones.mecanismos, i.via);
      return {
        titulo: (IDX[i.de] ? IDX[i.de].nombre : i.de) + ' → ' + i.a.map(function (x) { return IDX[x] ? IDX[x].nombre : x; }).join(' y '),
        cuerpo: '<dl class="dl"><dt>Origen</dt><dd>' + V.chip(i.de) + '</dd><dt>Destino</dt><dd>' + V.chips(i.a) + '</dd><dt>Forma</dt><dd>' + i.forma + '</dd><dt>Vía</dt><dd>' + V.chip(i.via) + ' en ' + V.chip(mec.nodo) + '</dd></dl>' +
          V.h3('Qué viaja') + '<p>' + V.t(i.que) + '</p>'
      };
    },
    T: function (n) {
      var seg = D.tecnologia.seguridad.filter(function (s) { return s.nodos.indexOf(n.id) >= 0; });
      var zona = V.porId(D.tecnologia.zonas, n.zona);
      var apps = D.aplicaciones.apps.filter(function (a) { return a.nodos.indexOf(n.id) >= 0; });
      return {
        titulo: n.nombre,
        cuerpo: '<p><span class="etq ' + V.claseCriticidad(n.criticidad) + '">Criticidad ' + n.criticidad.toLowerCase() + '</span> <span class="etq">' + V.esc(zona.nombre) + (zona.nube ? ' · nube' : '') + '</span></p>' +
          '<p>' + V.t(n.funcion) + '</p><p>' + V.t(n.detalle) + '</p>' +
          '<dl class="dl"><dt>Aloja o sirve</dt><dd>' + (n.aloja.length ? V.chips(n.aloja) : V.t(n.alojaTexto)) + '</dd><dt>Propietario</dt><dd>' + V.esc(n.propietario) + '</dd></dl>' +
          (apps.length ? V.h3('Aplicaciones que corren aquí') + V.chips(apps.map(function (a) { return a.id; })) : '') +
          (seg.length ? V.h3('Controles de seguridad') + V.lista(seg.map(function (s) { return '<strong>' + s.capa + ':</strong> ' + V.t(s.controles); })) : ''),
        pie: trazaLink(n.id)
      };
    },
    R: function (r) {
      return {
        titulo: r.riesgo,
        cuerpo: '<dl class="dl"><dt>Probabilidad</dt><dd>' + r.p + ' de 5</dd><dt>Impacto</dt><dd>' + r.i + ' de 5</dd><dt>Inherente</dt><dd><strong>' + r.inherente + '</strong></dd><dt>Control</dt><dd>' + V.t(r.control) + '</dd><dt>Residual</dt><dd><strong>' + r.residual + '</strong></dd><dt>Dueño</dt><dd>' + V.esc(r.dueno) + '</dd></dl><p class="nota">' + V.t(D.tecnologia.notaRiesgos) + '</p>'
      };
    },
    B: function (b) {
      return {
        titulo: b.hacia,
        cuerpo: '<p><span class="etq">' + b.capa + '</span> <span class="etq ' + (b.prioridad === 'Alta' ? 'critica' : b.prioridad === 'Media' ? 'alta' : 'media') + '">Prioridad ' + b.prioridad.toLowerCase() + '</span></p>' +
          '<dl class="dl"><dt>Hoy</dt><dd>' + V.t(b.desde) + '</dd><dt>Objetivo</dt><dd><strong>' + V.t(b.hacia) + '</strong></dd><dt>Acción</dt><dd>' + V.esc(b.accion) + '</dd><dt>Afecta</dt><dd>' + V.chips(b.afecta) + '</dd><dt>La cierra</dt><dd>' + V.chips(b.proyectos) + '</dd><dt>Valoración</dt><dd>Impacto ' + V.fmt(b.impacto, 1) + ' · esfuerzo ' + V.fmt(b.esfuerzo, 1) + ' (de 0 a 10)<sup class="p" title="Propuesta del equipo">P</sup></dd></dl>' +
          (D.transformacion.brechasTaller3.indexOf(b.id) >= 0 ? '<p class="nota">Esta brecha ya la había señalado el Taller 3.</p>' : '')
      };
    },
    P: function (p) {
      var hitos = D.transformacion.hitos.filter(function (h) { return h.pos > p.ini && h.pos <= p.fin; });
      return {
        titulo: p.nombre,
        cuerpo: '<p><span class="etq">Fase ' + p.fase + ' · ' + D.transformacion.fases[p.fase - 1].nombre + '</span></p><p>' + V.t(p.actividades) + '</p>' +
          '<dl class="dl"><dt>Responsable</dt><dd>' + V.esc(p.responsable) + '</dd><dt>Periodo</dt><dd>' + V.esc(p.periodo) + '<sup class="p" title="Propuesta del equipo">P</sup></dd><dt>Depende de</dt><dd>' + (p.depende.length ? V.chips(p.depende) : '—') + '</dd><dt>Cierra</dt><dd>' + (p.cierra.length ? V.chips(p.cierra) : V.esc(p.cierraNota)) + '</dd></dl>' +
          (hitos.length ? V.h3('Hitos en su periodo') + V.lista(hitos.map(function (h) { return V.chip(h.id) + ' ' + V.t(h.logro); })) : ''),
        pie: trazaLink(p.id)
      };
    },
    H: function (h) {
      return { titulo: h.logro, cuerpo: '<dl class="dl"><dt>Fecha</dt><dd>' + V.esc(h.fecha) + '<sup class="p" title="Propuesta del equipo">P</sup></dd><dt>Evidencia</dt><dd>' + V.t(h.evidencia) + '</dd></dl>' };
    },
    PA: function (p) {
      return { titulo: p.nombre, cuerpo: V.h3('Justificación') + '<p>' + V.t(p.justificacion) + '</p>' + V.h3('Implicación') + '<p>' + V.t(p.implicacion) + '</p>' };
    }
  };

  /* ---------- Panel de detalle ---------- */
  var panel, velo, ultimoFoco;
  V.panel = {
    abrir: function (o) {
      ultimoFoco = document.activeElement;
      V.$('#panel-id').textContent = o.id || '';
      V.$('#panel-id').hidden = !o.id;
      V.$('#panel-titulo').innerHTML = V.t(o.titulo) + (o.tipo ? '<span class="panel-tipo">' + V.esc(o.tipo) + '</span>' : '');
      V.$('#panel-cuerpo').innerHTML = o.cuerpo || '';
      V.$('#panel-cuerpo').scrollTop = 0;
      var pie = V.$('#panel-pie');
      pie.innerHTML = o.pie || '';
      pie.hidden = !o.pie;
      panel.classList.add('abierto');
      velo.classList.toggle('visible', window.innerWidth < 960);
      V.$('.panel-cerrar').focus({ preventScroll: true });
      V.panel.id = o.id;
    },
    cerrar: function (silencioso) {
      if (!panel.classList.contains('abierto')) return;
      panel.classList.remove('abierto');
      velo.classList.remove('visible');
      V.panel.id = null;
      if (V.vistaActual && V.vistaActual.alSeleccionar) V.vistaActual.alSeleccionar(null);
      if (!silencioso) {
        if (V.ruta.params.sel) { delete V.ruta.params.sel; history.replaceState(null, '', '#/' + V.ruta.nombre); }
        if (ultimoFoco && document.contains(ultimoFoco)) ultimoFoco.focus({ preventScroll: true });
      }
    }
  };
  // Abre la ficha de cualquier identificador del índice.
  V.detalle = function (id) {
    var e = IDX[id];
    if (!e) return;
    var f = V.fichas[e.tipo](e.obj);
    V.panel.abrir({ id: e.tipo === 'ENT' ? 'ENTIDAD' : id, tipo: V.nombreTipo(e.tipo), titulo: f.titulo, cuerpo: f.cuerpo, pie: f.pie });
    if (V.vistaActual && V.vistaActual.alSeleccionar) V.vistaActual.alSeleccionar(id);
    if (V.ruta.params.sel !== id) {
      V.ruta.params.sel = id;
      history.replaceState(null, '', '#/' + V.ruta.nombre + '?sel=' + encodeURIComponent(id));
    }
  };

  /* ---------- Curvas de nivel (marching squares sobre un campo suave) ---------- */
  function azar(semilla) {
    return function () {
      semilla |= 0; semilla = semilla + 0x6D2B79F5 | 0;
      var t = Math.imul(semilla ^ semilla >>> 15, 1 | semilla);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  V.topografia = function (svg) {
    var semilla = Number(svg.getAttribute('data-semilla')) || 7;
    var W = 1600, H = 900, cols = 80, filas = 45, niveles = Number(svg.getAttribute('data-niveles')) || 15;
    var r = azar(semilla), centros = [];
    for (var k = 0; k < 10; k++) centros.push({ x: r() * W * 1.2 - W * 0.1, y: r() * H * 1.2 - H * 0.1, s: 140 + r() * 360, a: r() * 2 - 1 });
    function campo(x, y) {
      var v = 0.00018 * x - 0.0001 * y;
      for (var i = 0; i < centros.length; i++) { var c = centros[i], dx = x - c.x, dy = y - c.y; v += c.a * Math.exp(-(dx * dx + dy * dy) / (2 * c.s * c.s)); }
      return v;
    }
    var g = [], min = Infinity, max = -Infinity, i, j;
    for (j = 0; j <= filas; j++) { g[j] = []; for (i = 0; i <= cols; i++) { var v = campo(i * W / cols, j * H / filas); g[j][i] = v; if (v < min) min = v; if (v > max) max = v; } }
    var sx = W / cols, sy = H / filas, trazos = [];
    for (var n = 1; n <= niveles; n++) {
      var nivel = min + (max - min) * n / (niveles + 1), seg = [];
      for (j = 0; j < filas; j++) for (i = 0; i < cols; i++) {
        var a = g[j][i], b = g[j][i + 1], c = g[j + 1][i + 1], d = g[j + 1][i];
        var caso = (a > nivel ? 8 : 0) | (b > nivel ? 4 : 0) | (c > nivel ? 2 : 0) | (d > nivel ? 1 : 0);
        if (caso === 0 || caso === 15) continue;
        var x = i * sx, y = j * sy;
        var arriba = [x + sx * (nivel - a) / (b - a), y], der = [x + sx, y + sy * (nivel - b) / (c - b)];
        var abajo = [x + sx * (nivel - d) / (c - d), y + sy], izq = [x, y + sy * (nivel - a) / (d - a)];
        var mapa = { 1: [[izq, abajo]], 2: [[abajo, der]], 3: [[izq, der]], 4: [[arriba, der]], 5: [[izq, arriba], [abajo, der]], 6: [[arriba, abajo]], 7: [[izq, arriba]], 8: [[izq, arriba]], 9: [[arriba, abajo]], 10: [[izq, abajo], [arriba, der]], 11: [[arriba, der]], 12: [[izq, der]], 13: [[abajo, der]], 14: [[izq, abajo]] };
        mapa[caso].forEach(function (s) { seg.push(s); });
      }
      unir(seg).forEach(function (linea) { if (linea.length > 4) trazos.push(linea); });
    }
    var html = trazos.map(function (l, k) {
      var d = 'M' + l.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('L');
      return '<path d="' + d + '" pathLength="1" style="--i:' + (k % 24) + '"/>';
    }).join('');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.innerHTML = html;
    if (V.movimiento() && svg.hasAttribute('data-dibuja')) svg.classList.add('dibuja');
  };
  function clave(p) { return Math.round(p[0] * 10) + ',' + Math.round(p[1] * 10); }
  function unir(segmentos) {
    var porPunto = {}, usado = [], lineas = [];
    segmentos.forEach(function (s, k) { [clave(s[0]), clave(s[1])].forEach(function (c) { (porPunto[c] = porPunto[c] || []).push(k); }); });
    function siguiente(punto, actual) {
      var lista = porPunto[clave(punto)] || [];
      for (var i = 0; i < lista.length; i++) if (!usado[lista[i]] && lista[i] !== actual) return lista[i];
      return -1;
    }
    for (var k = 0; k < segmentos.length; k++) {
      if (usado[k]) continue;
      usado[k] = true;
      var linea = [segmentos[k][0], segmentos[k][1]];
      [1, 0].forEach(function (lado) {
        var extremo = lado ? linea[linea.length - 1] : linea[0], idx = siguiente(extremo, k);
        while (idx >= 0) {
          usado[idx] = true;
          var s = segmentos[idx], otro = clave(s[0]) === clave(extremo) ? s[1] : s[0];
          if (lado) linea.push(otro); else linea.unshift(otro);
          extremo = otro; idx = siguiente(extremo, idx);
        }
      });
      lineas.push(linea);
    }
    return lineas;
  }

  /* ---------- Animaciones compartidas ---------- */
  var observador = 'IntersectionObserver' in window ? new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('visto');
      if (e.target.hasAttribute('data-contar')) contar(e.target);
      observador.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  function contar(el) {
    var fin = Number(el.getAttribute('data-contar')), dec = Number(el.getAttribute('data-dec')) || 0;
    var formato = function (v) { return V.fmt(dec ? v : Math.round(v), dec); };
    if (!V.movimiento()) { el.textContent = formato(fin); return; }
    var t0 = performance.now(), dur = 900;
    (function paso(t) {
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = formato(fin * e);
      if (k < 1) requestAnimationFrame(paso);
    })(t0);
  }
  // Interpola un número en pantalla (resultados del simulador).
  V.animarNumero = function (el, fin, formato) {
    var ini = Number(el.getAttribute('data-valor')) || 0;
    el.setAttribute('data-valor', fin);
    if (!V.movimiento() || isNaN(ini)) { el.textContent = formato(fin); return; }
    var t0 = performance.now(), dur = 650;
    (function paso(t) {
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = formato(ini + (fin - ini) * e);
      if (k < 1) requestAnimationFrame(paso);
    })(t0);
  };
  V.realzar = function (raiz) {
    V.$$('svg.topo', raiz).forEach(V.topografia);
    V.$$('.revelar, [data-contar]', raiz).forEach(function (el) {
      if (observador) observador.observe(el);
      else { el.classList.add('visto'); if (el.hasAttribute('data-contar')) contar(el); }
    });
  };
  V.cargarScript = function (src) {
    V._scripts = V._scripts || {};
    if (!V._scripts[src]) V._scripts[src] = new Promise(function (ok, mal) {
      var s = document.createElement('script');
      s.src = src; s.onload = ok; s.onerror = function () { mal(new Error('No se pudo cargar ' + src)); };
      document.head.appendChild(s);
    });
    return V._scripts[src];
  };

  /* ---------- Cabecera de capa compartida ---------- */
  // Pie de cada lámina, como en una guía de campo.
  var LEYENDAS = {
    portada: '<i>Coccoloba uvifera</i> · la nervadura se vuelve red',
    estrategia: '<i>Ceiba pentandra</i> · cinco ramas, diez raíces',
    procesos: 'Caldera de una planta de alimentos · ahí está el ahorro',
    informacion: 'Estratos con hojas fósiles · el histórico es el activo',
    aplicaciones: 'Micelio · diez especies, una sola red',
    tecnologia: 'Pasarela, medidor y caudalímetro en campo',
    transformacion: 'Plántula, arbolito, árbol · 2027, 2029, 2031',
    simulador: 'Doce facturas bajo la lupa'
  };
  V.cabecera = function (o) {
    return '<header class="cabecera"><svg class="topo" aria-hidden="true" data-semilla="' + (o.semilla || 3) + '" data-niveles="13"></svg>' +
      '<div class="cabecera-cuerpo"><div class="cabecera-texto"><h1>' + o.titulo + '</h1><p class="pregunta">' + o.pregunta + '</p>' +
      (o.entrada ? '<p class="entrada">' + o.entrada + '</p>' : '') + '</div>' +
      (o.lamina ? '<figure class="lamina-fig"><img class="lamina lamina-entra" src="img/laminas/' + o.lamina + '.webp" alt="' + V.esc(o.alt || '') + '" width="900" height="700" decoding="async">' +
        '<figcaption>' + (o.leyenda || LEYENDAS[o.lamina] || '') + '</figcaption></figure>' : '') + '</div>' +
      (o.sumario ? '<nav class="sumario" aria-label="En esta página">' + o.sumario.map(function (s) { return '<a href="#' + s[0] + '" data-ancla>' + s[1] + '</a>'; }).join('') + '</nav>' : '') + '</header>';
  };

  /* ---------- Recorrido de capas: anterior y siguiente al final de cada pantalla ---------- */
  var ORDEN = [['inicio', 'Nuestra empresa'], ['tablero', 'Tablero de arquitectura'], ['estrategia', 'Estrategia'], ['procesos', 'Procesos'], ['informacion', 'Información'], ['aplicaciones', 'Aplicaciones'], ['tecnologia', 'Tecnología'], ['transformacion', 'Transformación'], ['simulador', 'Simulador'], ['trazabilidad', 'Trazabilidad'], ['acerca', 'Acerca de']];
  function recorridoCapas(nombre) {
    var i = ORDEN.map(function (r) { return r[0]; }).indexOf(nombre);
    if (i < 0) return '';
    var ant = ORDEN[i - 1], sig = ORDEN[i + 1];
    return '<nav class="siguiente" aria-label="Recorrido de la arquitectura"><div class="contenido">' +
      (ant ? '<a href="#/' + ant[0] + '" class="sig-ant"><span>Anterior</span><strong>' + ant[1] + '</strong></a>' : '<span></span>') +
      (sig ? '<a href="#/' + sig[0] + '" class="sig-sig"><span>Siguiente</span><strong>' + sig[1] + '</strong></a>' : '') + '</div></nav>';
  }

  /* ---------- Búsqueda global (Ctrl+K o /) ---------- */
  function sinTildes(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  var catalogo = null;
  function armarCatalogo() {
    catalogo = Object.keys(IDX).map(function (id) {
      var e = IDX[id];
      return { id: id, nombre: e.nombre.replace('{P}', ''), tipo: NOMBRE_TIPO[e.tipo], href: '#/' + e.ruta + '?sel=' + encodeURIComponent(id), t: e.tipo };
    });
    D.negocio.actividades.forEach(function (a) {
      var d = a.k.split(':')[0];
      catalogo.push({ id: 'BPMN ' + d.charAt(4), nombre: a.nombre, tipo: 'Actividad del BPMN · ' + a.responsable, href: '#/procesos?bpmn=' + d, t: 'ACT' });
    });
    ORDEN.forEach(function (r) { catalogo.push({ id: '', nombre: r[1], tipo: 'Pantalla', href: '#/' + r[0], t: 'PAG' }); });
    catalogo.forEach(function (c) { c.clave = sinTildes(c.id + ' ' + c.nombre + ' ' + c.tipo); c.idn = sinTildes(c.id); });
  }
  function buscar(q) {
    q = sinTildes(q.trim());
    if (!q) return catalogo.filter(function (c) { return c.t === 'PAG'; });
    var palabras = q.split(/\s+/);
    return catalogo.map(function (c) {
      if (!palabras.every(function (p) { return c.clave.indexOf(p) >= 0; })) return null;
      var puntos = c.idn === q ? 0 : c.idn.indexOf(q) === 0 ? 1 : sinTildes(c.nombre).indexOf(q) === 0 ? 2 : 3;
      return { c: c, p: puntos };
    }).filter(Boolean).sort(function (a, b) { return a.p - b.p || a.c.nombre.length - b.c.nombre.length; }).slice(0, 9).map(function (x) { return x.c; });
  }
  V.abrirBuscador = function () {
    if (!catalogo) armarCatalogo();
    var d = V.$('#buscador');
    var entrada = V.$('#buscador-q'), lista = V.$('#buscador-res'), activo = 0, res = [];
    function pintarRes() {
      res = buscar(entrada.value);
      lista.innerHTML = res.length ? res.map(function (c, k) {
        return '<li role="option" id="bres-' + k + '" aria-selected="' + (k === activo) + '"><a href="' + c.href + '">' + (c.id ? '<span class="chip" data-t="' + (/^(PROC|AREA)$/.test(c.t) ? 'C' : /^(EXT|MEC)$/.test(c.t) ? 'A' : c.t) + '">' + V.esc(c.id) + '</span>' : '') +
          '<span class="bres-txt"><strong>' + V.t(c.nombre) + '</strong><small>' + V.esc(c.tipo) + '</small></span></a></li>';
      }).join('') : '<li class="bres-vacio">Nada coincide. Prueba con un identificador (C2, RN1, A3, T10, B13) o una palabra (línea base, factura).</li>';
      entrada.setAttribute('aria-activedescendant', res.length ? 'bres-' + activo : '');
    }
    entrada.value = '';
    activo = 0;
    pintarRes();
    entrada.oninput = function () { activo = 0; pintarRes(); };
    entrada.onkeydown = function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); activo = (activo + (e.key === 'ArrowDown' ? 1 : -1) + res.length) % Math.max(1, res.length); pintarRes(); }
      if (e.key === 'Enter' && res[activo]) { e.preventDefault(); d.close(); location.hash = res[activo].href; }
    };
    lista.onclick = function (e) { if (e.target.closest('a')) d.close(); };
    d.showModal();
    entrada.focus();
  };

  /* ---------- Ficha breve al pasar sobre un identificador ---------- */
  var tarjeta, tTarjeta;
  function mostrarTarjeta(chip) {
    var e = IDX[chip.getAttribute('data-ficha')];
    if (!e) return;
    tarjeta.innerHTML = '<span class="tf-tipo">' + V.esc(NOMBRE_TIPO[e.tipo]) + '</span><strong>' + V.t(e.nombre) + '</strong><span class="tf-ayuda">Toca para ver la ficha</span>';
    var r = chip.getBoundingClientRect();
    tarjeta.hidden = false;
    var w = tarjeta.offsetWidth, h = tarjeta.offsetHeight;
    var x = Math.min(window.innerWidth - w - 8, Math.max(8, r.left + r.width / 2 - w / 2));
    var y = r.top - h - 8 < 8 ? r.bottom + 8 : r.top - h - 8;
    tarjeta.style.left = x + 'px'; tarjeta.style.top = y + 'px';
    tarjeta.classList.add('visible');
  }
  function ocultarTarjeta() { clearTimeout(tTarjeta); if (tarjeta) { tarjeta.classList.remove('visible'); tarjeta.hidden = true; } }

  /* ---------- Enrutador ---------- */
  function leerHash() {
    var h = location.hash.replace(/^#\/?/, ''), partes = h.split('?'), params = {};
    (partes[1] || '').split('&').forEach(function (kv) {
      if (!kv) return;
      var p = kv.split('=');
      params[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
    });
    return { nombre: partes[0] || 'inicio', params: params };
  }
  function pintar(r) {
    var vista = V.vistas[r.nombre];
    V.panel.cerrar(true);
    if (V.vistaActual && V.vistaActual.desmontar) V.vistaActual.desmontar();
    var main = V.$('#principal');
    ocultarTarjeta();
    main.innerHTML = vista.render(r.params) + recorridoCapas(r.nombre);
    document.title = vista.titulo + ' · VIRIDIA · Activo digital de Arquitectura Empresarial';
    V.$$('.nav a').forEach(function (a) {
      if (a.getAttribute('data-ruta') === r.nombre) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
    V.vistaActual = vista;
    V.ruta = r;
    if (vista.montar) vista.montar(main, r.params);
    V.realzar(main);
    if (r.params.sel) V.detalle(r.params.sel);
    var h1 = main.querySelector('h1');
    if (h1 && V._yaNavego) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    V._yaNavego = true;
    V.$('.riel').classList.remove('abierto');
  }
  function navegar() {
    var r = leerHash();
    if (!V.vistas[r.nombre]) r = { nombre: 'inicio', params: {} };
    if (r.nombre === V.ruta.nombre && V.vistaActual) {
      V.ruta.params = r.params;
      if (V.vistaActual.alCambiarParams) V.vistaActual.alCambiarParams(r.params);
      if (r.params.sel) V.detalle(r.params.sel);
      return;
    }
    if (document.startViewTransition && V.movimiento() && V._yaNavego) document.startViewTransition(function () { pintar(r); });
    else pintar(r);
  }

  /* ---------- Arranque ---------- */
  function iniciar() {
    panel = V.$('#panel');
    velo = V.$('#velo');
    V.$('.panel-cerrar').addEventListener('click', function () { V.panel.cerrar(); });
    velo.addEventListener('click', function () { V.panel.cerrar(); V.$('.riel').classList.remove('abierto'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { ocultarTarjeta(); V.panel.cerrar(); V.$('.riel').classList.remove('abierto'); velo.classList.remove('visible'); }
      var escribiendo = /^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement || {}).tagName || '');
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !escribiendo)) { e.preventDefault(); V.abrirBuscador(); }
    });
    // Ficha breve sobre los identificadores, con un pequeño retardo para no estorbar.
    tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-ficha'; tarjeta.hidden = true; tarjeta.setAttribute('role', 'tooltip');
    document.body.appendChild(tarjeta);
    document.addEventListener('pointerover', function (e) {
      var c = e.target.closest && e.target.closest('.chip[data-ficha]');
      if (!c || e.pointerType === 'touch') return;
      clearTimeout(tTarjeta);
      tTarjeta = setTimeout(function () { mostrarTarjeta(c); }, 260);
    });
    document.addEventListener('pointerout', function (e) { if (e.target.closest && e.target.closest('.chip[data-ficha]')) ocultarTarjeta(); });
    window.addEventListener('scroll', ocultarTarjeta, { passive: true });
    V.$$('[data-buscar]').forEach(function (b) { b.addEventListener('click', V.abrirBuscador); });
    V.$('#buscador').addEventListener('click', function (e) { if (e.target === e.currentTarget) e.currentTarget.close(); });
    // Pantalla completa para diagramas (proyector).
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pantalla]');
      if (!b) return;
      var p = b.closest('.plancha');
      if (document.fullscreenElement) document.exitFullscreen(); else if (p && p.requestFullscreen) p.requestFullscreen();
    });
    document.addEventListener('fullscreenchange', function () {
      V.$$('[data-pantalla]').forEach(function (b) { b.setAttribute('aria-pressed', String(!!document.fullscreenElement && b.closest('.plancha') === document.fullscreenElement)); });
    });
    V.$('.menu-btn').addEventListener('click', function () { V.$('.riel').classList.add('abierto'); velo.classList.add('visible'); V.$('.riel a[aria-current]') && V.$('.riel a[aria-current]').focus(); });
    // Botones genéricos: data-detalle="ID" abre la ficha; anclas internas no cambian la ruta.
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-detalle]');
      if (b) { e.preventDefault(); V.detalle(b.getAttribute('data-detalle')); return; }
      var a = e.target.closest('a[data-ancla]');
      if (a) { e.preventDefault(); var dest = document.getElementById(a.getAttribute('href').slice(1)); if (dest) dest.scrollIntoView({ behavior: V.movimiento() ? 'smooth' : 'auto' }); }
    });
    window.addEventListener('hashchange', navegar);
    navegar();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
