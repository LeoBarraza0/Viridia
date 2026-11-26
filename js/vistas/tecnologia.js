/* Tecnología: vista de despliegue (T1–T16, misma disposición que la figura del documento),
   principios, modelo de servicio, red de la sede, seguridad, continuidad (RPO/RTO) y riesgos R1–R8. */
(function () {
  'use strict';
  var V = window.V, D = V.datos, TEC = D.tecnologia, t = V.t;
  var S = 40, W = 1000, H = Math.round(14.65 * S);
  function X(cm) { return cm * S; }
  function Y(cm) { return (14.65 - cm) * S; }
  function caja(id, cx, cy, w, h, clase, html, etq) { return { id: id, x: X(cx - w / 2), y: Y(cy + h / 2), w: w * S, h: h * S, clase: clase, html: html, etiqueta: etq || id }; }
  function nodo(id, cx, cy, w, h) {
    var n = V.porId(TEC.nodos, id);
    return caja(id, cx, cy, w, h, V.claseCriticidad(n.criticidad), '<b>' + id + '</b>' + V.esc(n.nombre) + '<small>' + (n.aloja.length ? n.aloja.filter(function (x) { return /^A/.test(x); }).join(' · ') || n.aloja.slice(0, 4).join(' · ') + (n.aloja.length > 4 ? '…' : '') : V.esc(n.alojaTexto || '')) + '</small>', id + ' ' + n.nombre);
  }
  var NODOS = [
    nodo('T1', 2.3, 12.3, 4.0, 1.8), nodo('T2', 2.3, 9.2, 4.0, 1.9),
    caja('ERPCLI', 2.3, 5.0, 4.0, 1.2, 'ext', '<b>Externo</b>ERP o MES del cliente<small>Producción, turnos y paradas (I10)</small>'),
    nodo('T3', 6.5, 9.2, 2.9, 1.4),
    caja('INET', 6.5, 5.0, 2.9, 1.2, 'media', '<b>Internet</b>TLS 1.2 o superior<small>SFTP del cliente</small>'),
    nodo('T6', 10.35, 11.85, 2.8, 1.4), nodo('T5', 13.3, 11.85, 2.8, 1.4), nodo('T7', 16.25, 11.85, 2.8, 1.4), nodo('T4', 19.2, 11.85, 2.8, 1.4),
    nodo('T8', 12.75, 8.5, 6.8, 1.7), nodo('T9', 18.3, 8.5, 4.1, 1.7),
    nodo('T10', 10.85, 5.15, 3.75, 2.0), nodo('T11', 14.7, 5.15, 3.75, 2.0), nodo('T12', 18.55, 5.15, 3.75, 2.0),
    nodo('T13', 11.75, 1.75, 5.4, 1.8), nodo('T14', 17.65, 1.75, 5.4, 1.8),
    caja('VERIF', 23.15, 12.9, 3.4, 1.1, 'ext', '<b>Externo</b>Verificador independiente'),
    caja('DIAN', 23.15, 10.9, 3.4, 1.2, 'ext', '<b>Externo</b>Proveedor de factura electrónica (DIAN)'),
    caja('SAAS', 23.15, 7.1, 3.4, 1.8, 'ext', '<b>SaaS</b>A6 CRM · A7 ERP contable · A9 gestión documental'),
    nodo('T15', 23.15, 2.3, 3.4, 1.9), nodo('T16', 4.05, 1.45, 7.5, 1.9)
  ];
  function ruta(de, a, pts, clase, etiqueta) { return { de: de, a: a, puntos: pts.map(function (p) { return [X(p[0]), Y(p[1])]; }), clase: clase || '', etiqueta: etiqueta, grupo: [de, a] }; }
  var ARISTAS = [
    ruta('T1', 'T2', [[2.3, 11.4], [2.3, 10.15]], '', 'Modbus / pulsos'),
    ruta('T2', 'T3', [[4.3, 9.2], [5.05, 9.2]], 'evento'),
    ruta('T3', 'T6', [[7.95, 9.2], [8.3, 9.2], [8.3, 10.28], [9.6, 10.28], [9.6, 11.15]], 'evento', 'MQTT sobre TLS mutuo'),
    ruta('ERPCLI', 'INET', [[4.3, 5.0], [5.05, 5.0]], 'archivo'),
    ruta('INET', 'T7', [[7.95, 5.0], [8.55, 5.0], [8.55, 13.75], [15.6, 13.75], [15.6, 12.55]], 'archivo', 'I10'),
    ruta('T7', 'VERIF', [[16.9, 12.55], [16.9, 13.75], [21.1, 13.75], [21.1, 12.9], [21.45, 12.9]], 'archivo', 'I6'),
    ruta('T16', 'T13', [[7.8, 1.45], [8.6, 1.45], [8.6, 1.75], [9.05, 1.75]], '', 'VPN sitio a nube'),
    ruta('T5', 'T8', [[13.3, 11.15], [13.3, 9.35]]),
    ruta('T6', 'T8', [[10.35, 11.15], [10.35, 9.35]], 'evento'),
    ruta('T8', 'T10', [[10.85, 7.65], [10.85, 6.15]]),
    ruta('T8', 'T11', [[14.7, 7.65], [14.7, 6.15]]),
    ruta('T9', 'T12', [[18.3, 7.65], [18.3, 6.15]]),
    ruta('T5', 'SAAS', [[13.9, 11.15], [13.9, 10.28], [20.85, 10.28], [20.85, 7.1], [21.45, 7.1]]),
    ruta('SAAS', 'DIAN', [[23.15, 8.0], [23.15, 10.3]]),
    ruta('T12', 'T15', [[20.43, 5.15], [20.9, 5.15], [20.9, 2.3], [21.45, 2.3]], 'archivo', 'Réplica y respaldo')
  ];

  /* Red de la sede (T16): dos proveedores → firewall → switch de núcleo → cinco VLAN; túnel VPN hacia T13 y T5. */
  function idVlan(v) { return v.id.replace('VLAN ', 'V'); }
  var RED = (function () {
    var eq = {}; TEC.sede.equipos.forEach(function (e) { eq[e.id] = e; });
    function caja(id, x, y, w, h, clase, html, etq) { return { id: id, x: x, y: y, w: w, h: h, clase: clase, html: html, etiqueta: etq }; }
    function equipo(id, x, y, w, h, clase) { var e = eq[id]; return caja(id, x, y, w, h, clase, '<strong>' + t(e.nombre) + '</strong><small>' + t(e.texto) + '</small>', e.nombre); }
    function tnodo(id, y) { var n = V.porId(TEC.nodos, id); return caja(id, 700, y, 266, 62, V.claseCriticidad(n.criticidad), '<b>' + id + '</b>' + V.esc(n.nombre), id + ' ' + n.nombre); }
    var nodos = [
      equipo('isp1', 40, 36, 186, 58, 'ext'), equipo('isp2', 258, 36, 186, 58, 'ext'),
      equipo('fw', 112, 136, 260, 64, 'media'), equipo('sw', 112, 238, 260, 56, 'media'),
      tnodo('T13', 52), tnodo('T5', 160)
    ];
    var aristas = [
      { de: 'isp1', a: 'fw', clase: '', dx1: -40 }, { de: 'isp2', a: 'fw', clase: '', dx1: 40 },
      { de: 'fw', a: 'sw', clase: '' },
      { de: 'fw', a: 'T13', clase: 'archivo', puntos: [[372, 158], [560, 158], [560, 83], [700, 83]], etiqueta: 'VPN sitio a nube', fija: true, posEtiqueta: [466, 158] },
      { de: 'fw', a: 'T5', clase: 'archivo', puntos: [[372, 178], [580, 178], [580, 191], [700, 191]] }
    ];
    TEC.sede.vlans.forEach(function (v, i) {
      var id = idVlan(v), x = 16 + i * 124;
      nodos.push(caja(id, x, 322, 112, 64, 'media', '<b>' + v.id + '</b>' + t(v.nombre), v.id + ': ' + v.nombre));
      aristas.push({ de: 'sw', a: id, clase: '', puntos: [[242, 294], [242, 308], [x + 56, 308], [x + 56, 322]] });
    });
    return { nodos: nodos, aristas: aristas };
  })();
  function fichaRed(id) {
    var v = TEC.sede.vlans.filter(function (x) { return idVlan(x) === id; })[0], e = V.porId(TEC.sede.equipos, id);
    if (v) V.panel.abrir({ tipo: 'Segmento de la red de la sede', titulo: v.id + ' · ' + v.nombre, cuerpo: '<dl class="dl"><dt>Quién o qué se conecta</dt><dd>' + t(v.quien) + '</dd><dt>Regla de acceso</dt><dd>' + t(v.regla) + '</dd></dl>' + V.h3('Nodo') + V.chips(['T16']) });
    else V.panel.abrir({ tipo: 'Equipo de la red de la sede', titulo: e.nombre, cuerpo: '<p>' + t(e.texto) + '</p>' + (id === 'fw' ? V.h3('Túnel VPN cifrado hacia') + V.chips(['T13', 'T5']) : '') + V.h3('Nodo') + V.chips(['T16']) });
    enfocarRed(id);
  }
  function enfocarRed(id) {
    var diag = V.$('#sede-d');
    if (!diag) return;
    var v = id && V.porId(RED.nodos, id) ? V.vecinos(RED.aristas, id) : null;
    V.enfocar(diag, v && v.ids, v && v.ks);
    V.$$('.nodo', diag).forEach(function (n) { n.classList.toggle('elegido', n.getAttribute('data-id') === id); });
    V.$$('#tabla-vlan tr').forEach(function (tr) { tr.classList.toggle('resaltada', tr.getAttribute('data-vlan') === id); });
  }

  function nivel(n) { return n >= 12 ? 'alto' : n >= 6 ? 'medio' : 'bajo'; }
  function celdaNivel(n) { var nv = nivel(n); return '<span class="etq ' + (nv === 'alto' ? 'critica' : nv === 'medio' ? 'alta' : 'media') + '">' + n + ' · ' + nv + '</span>'; }

  function render() {
    var sede = TEC.sede;
    return V.cabecera({
      titulo: 'Arquitectura tecnológica', semilla: 27, lamina: 'tecnologia',
      alt: 'Grabado técnico de una pasarela industrial con antena, un medidor de energía y un caudalímetro, con una torre celular al fondo.',
      pregunta: '¿Dónde corre todo y cómo se protege el histórico, que no se puede volver a medir?',
      entrada: t(TEC.intro),
      sumario: [['despliegue', 'Despliegue'], ['principios-tec', 'Principios'], ['servicio', 'Modelo de servicio'], ['sede', 'Red de la sede'], ['seguridad', 'Seguridad'], ['continuidad', 'Continuidad'], ['riesgos', 'Riesgos']]
    }) +
    '<section class="seccion" id="despliegue"><div class="contenido">' +
      '<h2>Vista de despliegue</h2>' +
      '<p class="intro">Se lee de izquierda a derecha, en el sentido en que viaja una lectura: planta, conectividad, región principal de la nube, región secundaria y externos. Toca un nodo para ver qué aloja y sus controles.</p>' +
      '<div class="plancha"><div class="plancha-barra"><span class="ayuda">' + t(TEC.nube) + '</span><span class="acciones" style="margin:0"><button type="button" class="btn btn-claro btn-chico" id="limpiar-tec">Ver todo</button>' + V.botonPantalla() + '</span></div>' +
        V.diagrama({ id: 'despliegue-d', ancho: W, alto: H, nodos: NODOS, aristas: ARISTAS, zonas: [
          { x: X(0), y: Y(14.65), w: X(4.6), h: (14.65 - 3.6) * S, titulo: 'Planta del cliente' },
          { x: X(4.9), y: Y(14.65), w: X(3.2), h: (14.65 - 3.6) * S, titulo: 'Conectividad' },
          { x: X(8.4), y: Y(14.65), w: X(12.6), h: 14.65 * S, clase: 'nube', titulo: 'Nube pública · región principal en Latinoamérica · tres zonas de disponibilidad' },
          { x: X(8.7), y: Y(13.55), w: X(12), h: 3.15 * S, clase: 'sub', titulo: 'Perímetro e integración' },
          { x: X(8.7), y: Y(10.15), w: X(12), h: 3.0 * S, clase: 'sub', titulo: 'Cómputo' },
          { x: X(8.7), y: Y(6.9), w: X(12), h: 3.15 * S, clase: 'sub', titulo: 'Datos' },
          { x: X(8.7), y: Y(3.5), w: X(12), h: 3.2 * S, clase: 'sub', titulo: 'Seguridad y operación' },
          { x: X(21.3), y: Y(14.65), w: X(3.7), h: 4.95 * S, titulo: 'Externos' },
          { x: X(21.3), y: Y(9.4), w: X(3.7), h: 4.4 * S, titulo: 'Servicios contratados' },
          { x: X(21.3), y: Y(4.7), w: X(3.7), h: 4.7 * S, titulo: 'Región secundaria' },
          { x: X(0), y: Y(3.3), w: X(8.1), h: 3.3 * S, titulo: 'Sede Barranquilla' }
        ] }) +
        '<div class="leyenda"><span><i class="l-critica"></i>Crítico</span><span><i class="l-alta"></i>Alto</span><span><i class="l-media"></i>Medio</span><span><i class="l-ext"></i>Externo o contratado</span><span><i class="l-api"></i>Conexión síncrona</span><span><i class="l-evento"></i>Evento (lecturas y alertas)</span><span><i class="l-archivo"></i>Archivo o réplica</span></div>' +
      '</div>' +
      '<p class="nota" style="margin-top:1rem">' + t(TEC.zonasNube) + '</p>' +
      '<details class="plegable" style="margin-top:2rem"><summary><span>Catálogo de nodos <small>' + TEC.nodos.length + ' nodos con función, propietario y criticidad</small></span></summary>' +
      '<div class="tabla-envoltura"><table class="tabla"><thead><tr><th>Id</th><th>Nodo</th><th>Función</th><th>Aloja o sirve</th><th>Propietario</th><th>Criticidad</th></tr></thead><tbody>' +
        TEC.nodos.map(function (n) { return '<tr data-sel="' + n.id + '"><td>' + V.chip(n.id) + '</td><td><strong>' + V.esc(n.nombre) + '</strong></td><td>' + t(n.funcion) + '</td><td>' + (n.aloja.length ? V.chips(n.aloja) : t(n.alojaTexto)) + '</td><td>' + V.esc(n.propietario) + '</td><td><span class="etq ' + V.claseCriticidad(n.criticidad) + '">' + n.criticidad + '</span></td></tr>'; }).join('') +
      '</tbody></table></div></details>' +
    '</div></section>' +

    '<section class="seccion banda" id="principios-tec"><div class="contenido">' +
      '<h2>Seis principios tecnológicos</h2><p class="intro">Cada uno se desprende de una regla de negocio o de una capacidad.</p>' +
      '<ol class="dos-col revelar" style="list-style:none;padding:0;margin:0">' + TEC.principios.map(function (p) {
        return '<li style="border-top:2px solid var(--verde);padding-top:.8rem"><h3>' + t(p.nombre) + '</h3><p style="font-size:.95rem;color:var(--texto-2);margin:0 0 .4rem">' + t(p.texto) + '</p><span class="cita-fuente">Origen: ' + t(p.origen) + '</span></li>';
      }).join('') + '</ol>' +
    '</div></section>' +

    '<section class="seccion" id="servicio"><div class="contenido">' +
      '<h2>Modelo de servicio en la nube</h2>' +
      '<p class="intro">Lo que realiza C2 y C4 se construye sobre plataforma gestionada (PaaS) para conservar el control del modelo y de la evidencia; lo que es igual en cualquier empresa se contrata como software (SaaS), según las definiciones de NIST SP 800-145.</p>' +
      '<div class="tabla-envoltura"><table class="tabla"><thead><tr><th>Aplicación</th><th>Modelo</th><th>Nodos</th><th>Por qué</th></tr></thead><tbody>' +
        D.aplicaciones.apps.map(function (a) { return '<tr data-sel="' + a.id + '"><td>' + V.chip(a.id) + ' ' + V.esc(a.nombre) + '</td><td>' + t(a.modelo) + '</td><td>' + V.chips(a.nodos) + '</td><td>' + t(a.porqueModelo) + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<div class="dos-col" style="margin-top:2rem"><div><h3>Selección del proveedor de nube</h3><p style="color:var(--texto-2)">' + t(TEC.proveedor.texto) + '</p></div>' +
        '<div class="revelar">' + TEC.proveedor.criterios.map(function (c) {
          return '<div style="margin-bottom:.75rem"><div style="display:flex;justify-content:space-between;gap:1rem;font-size:.92rem"><span>' + t(c.criterio) + '</span><strong class="num">' + c.peso + ' %</strong></div><div class="medidor-pista" style="height:8px;margin-top:.3rem"><div class="medidor-valor" style="width:' + (c.peso / 30 * 100) + '%;background:var(--dato-1)"></div></div></div>';
        }).join('') + '</div></div>' +
    '</div></section>' +

    '<section class="seccion banda" id="sede"><div class="contenido">' +
      '<h2>Red de la sede (T16)</h2><p class="intro">' + t(sede.texto) + ' Toca una VLAN para ver su regla de acceso.</p>' +
      '<div class="plancha"><div class="plancha-barra"><span class="ayuda">Dos proveedores de Internet con conmutación automática; un solo túnel VPN cifrado hacia la nube. Segmentación propuesta por el equipo<sup class="p" title="Propuesta del equipo">P</sup>.</span>' + V.botonPantalla() + '</div>' +
        V.diagrama({ id: 'sede-d', ancho: 1000, alto: 400, minimo: 760, nodos: RED.nodos, aristas: RED.aristas, zonas: [
          { x: 4, y: 4, w: 640, h: 392, titulo: 'Sede Barranquilla' },
          { x: 668, y: 4, w: 328, h: 250, clase: 'nube', titulo: 'Nube · región principal' }
        ] }) +
        '<div class="leyenda"><span><i class="l-media"></i>Equipo o segmento de la sede (T16, criticidad media)</span><span><i class="l-ext"></i>Proveedor externo</span><span><i class="l-critica"></i>Nodo crítico (T5)</span><span><i class="l-alta"></i>Nodo de criticidad alta (T13)</span><span><i class="l-archivo"></i>Túnel VPN cifrado</span></div>' +
      '</div>' +
      '<div class="tabla-envoltura" style="margin-top:1.2rem"><table class="tabla" id="tabla-vlan"><thead><tr><th>VLAN</th><th>Quién o qué se conecta</th><th>Regla de acceso</th></tr></thead><tbody>' +
        sede.vlans.map(function (v) { return '<tr data-vlan="' + idVlan(v) + '" tabindex="0"><td><strong>' + v.id + '</strong><br><small>' + t(v.nombre) + '</small></td><td>' + t(v.quien) + '</td><td>' + t(v.regla) + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
    '</div></section>' +

    '<section class="seccion" id="seguridad"><div class="contenido">' +
      '<h2>Seguridad por capa</h2>' +
      '<p class="intro">Controles con referencia en ISO/IEC 27001:2022 que responden a tres exigencias: la confidencialidad de la operación de cada cliente, la integridad de la evidencia con la que se factura y la Ley 1581 de 2012.</p>' +
      '<div class="tabla-envoltura"><table class="tabla"><thead><tr><th>Capa</th><th>Controles</th><th>Protege</th><th>Nodos</th></tr></thead><tbody>' +
        TEC.seguridad.map(function (s) { return '<tr><td><strong>' + s.capa + '</strong></td><td>' + t(s.controles) + '</td><td>' + t(s.protege) + '</td><td>' + (s.nodos.length ? V.chips(s.nodos) : '—') + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<p class="nota" style="margin-top:1rem">' + t(TEC.datosPersonales) + '</p>' +
    '</div></section>' +

    '<section class="seccion banda" id="continuidad"><div class="contenido">' +
      '<h2>Continuidad y recuperación</h2>' +
      '<p class="intro">El Taller 3 dejó una brecha: si la ingesta o la integración se detienen, se detienen a la vez el monitoreo, la línea base y la facturación. La respuesta está en tres niveles.</p>' +
      '<div class="dos-col revelar">' + TEC.continuidad.map(function (c) { return '<div style="border-top:2px solid var(--agua);padding-top:.8rem"><h3>' + t(c.nivel) + '</h3><p style="color:var(--texto-2);font-size:.95rem;margin:0">' + t(c.texto) + '</p></div>'; }).join('') + '</div>' +
      '<h3 style="margin-top:2rem">Objetivos de recuperación por aplicación</h3><p class="medida" style="color:var(--texto-2);font-size:.95rem">' + t(TEC.rpoRtoNota) + '</p>' +
      '<div class="tabla-envoltura"><table class="tabla"><thead><tr><th>Aplicación</th><th>RPO</th><th>RTO</th><th>Justificación</th></tr></thead><tbody>' +
        D.aplicaciones.apps.map(function (a) { return '<tr data-sel="' + a.id + '"><td>' + V.chip(a.id) + ' ' + V.esc(a.corto) + '</td><td>' + t(a.rpo) + '</td><td>' + t(a.rto) + '</td><td>' + t(a.justRec) + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<p class="nota" style="margin-top:1rem"><strong>La ventana de 24 a 72 horas.</strong> ' + t(TEC.brechaVentana) + '</p>' +
    '</div></section>' +

    '<section class="seccion" id="riesgos"><div class="contenido">' +
      '<h2>Riesgos tecnológicos</h2><p class="intro">' + t(TEC.notaRiesgos) + '</p>' +
      '<div class="dos-col">' + mapaCalor() +
      '<div class="tabla-envoltura"><table class="tabla"><thead><tr><th>Id</th><th>Riesgo y control</th><th>Inherente</th><th>Residual</th></tr></thead><tbody>' +
        TEC.riesgos.map(function (r) { return '<tr data-sel="' + r.id + '"><td>' + V.chip(r.id) + '</td><td><strong>' + t(r.riesgo) + '</strong><br><small style="color:var(--texto-2)">' + t(r.control) + ' · ' + V.esc(r.dueno) + '</small></td><td>' + celdaNivel(r.inherente) + '</td><td>' + celdaNivel(r.residual) + '</td></tr>'; }).join('') +
      '</tbody></table></div></div>' +
    '</div></section>';
  }
  function mapaCalor() {
    var celdas = '';
    for (var p = 5; p >= 1; p--) {
      celdas += '<div class="mc-eje">' + p + '</div>';
      for (var i = 1; i <= 5; i++) {
        var n = p * i, nv = nivel(n);
        var rs = TEC.riesgos.filter(function (r) { return r.p === p && r.i === i; });
        celdas += '<div class="mc-celda ' + nv + '" title="P ' + p + ' × I ' + i + ' = ' + n + '">' + rs.map(function (r) { return '<button type="button" class="chip lleno" data-detalle="' + r.id + '">' + r.id + '</button>'; }).join('') + '</div>';
      }
    }
    celdas += '<div></div>' + [1, 2, 3, 4, 5].map(function (i) { return '<div class="mc-eje">' + i + '</div>'; }).join('');
    return '<figure class="revelar" style="margin:0"><div class="mapa-calor">' + celdas + '</div><figcaption class="nota" style="margin-top:.6rem">Nivel inherente: probabilidad (filas) × impacto (columnas). Verde oscuro: alto (12 o más); verde claro: medio (6 a 11); gris: bajo.</figcaption></figure>';
  }

  function seleccionar(id) {
    var diag = V.$('#despliegue-d');
    if (!diag) return;
    enfocarRed(V.porId(RED.nodos, id) ? id : null);
    V.$$('.nodo', diag).forEach(function (n) { n.classList.toggle('elegido', n.getAttribute('data-id') === id); });
    if (!id || !V.porId(NODOS, id)) { V.enfocar(diag, null); return; }
    var ids = [id], ks = [];
    ARISTAS.forEach(function (a, k) { if (a.de === id || a.a === id) { ks.push(k); ids.push(a.de, a.a); } });
    V.enfocar(diag, ids, ks);
  }

  V.vistas.tecnologia = {
    titulo: 'Arquitectura tecnológica', render: render,
    montar: function (raiz) {
      raiz.addEventListener('click', function (e) {
        var n = e.target.closest('#despliegue-d .nodo');
        if (n) { var id = n.getAttribute('data-id'); if (V.indice[id]) V.detalle(id); else if (id === 'SAAS') V.detalle('A6'); else seleccionar(id); return; }
        var r = e.target.closest('#sede-d .nodo, #tabla-vlan tr[data-vlan]');
        if (r) { var rid = r.getAttribute('data-id') || r.getAttribute('data-vlan'); if (V.indice[rid]) V.detalle(rid); else fichaRed(rid); return; }
        if (e.target.closest('#limpiar-tec')) { V.panel.cerrar(); V.enfocar(V.$('#despliegue-d'), null); return; }
        var f = e.target.closest('tr[data-sel]'); if (f && !e.target.closest('a')) V.detalle(f.getAttribute('data-sel'));
      });
      raiz.addEventListener('keydown', function (e) {
        var tr = e.target.closest && e.target.closest('#tabla-vlan tr[data-vlan]');
        if (tr && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); fichaRed(tr.getAttribute('data-vlan')); }
      });
    },
    alSeleccionar: seleccionar
  };
})();
