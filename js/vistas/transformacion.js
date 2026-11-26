/* Transformación: arquitectura objetivo (To-Be), As-Is frente a To-Be, brechas B1–B14 con su priorización,
   gestión del cambio y roadmap P1–P12 con hitos H1–H6. */
(function () {
  'use strict';
  var V = window.V, D = V.datos, TB = D.tobe, TR = D.transformacion, t = V.t;
  var ANIOS = [['2026', 1], ['2027', 2], ['2028', 2], ['2029', 2], ['2030', 2], ['2031', 2]];

  function render() {
    return V.cabecera({
      titulo: 'Transformación', semilla: 41, lamina: 'transformacion',
      alt: 'Grabado de una plántula, un arbolito y un árbol joven a lo largo de un camino que sube, con estacas que marcan hitos.',
      pregunta: '¿Cómo pasa VIRIDIA de su arranque con pilotos y hojas de cálculo a la arquitectura objetivo de 2031?',
      entrada: t(TR.intro),
      sumario: [['tobe', 'Arquitectura objetivo'], ['asis', 'As-Is frente a To-Be'], ['brechas', 'Brechas'], ['roadmap', 'Roadmap'], ['puesta', 'Puesta en marcha']]
    }) +
    '<section class="seccion" id="tobe"><div class="contenido">' +
      '<h2>El estado objetivo en una página</h2>' +
      '<p class="intro">' + t(TB.intro) + '</p>' +
      '<div class="tabla-envoltura"><table class="tabla"><thead><tr><th>Capa</th><th>Estado objetivo</th><th>Decisión que más pesa</th><th>Objetivo</th></tr></thead><tbody>' +
        TB.capas.map(function (c) { return '<tr><td><strong>' + c.capa + '</strong></td><td>' + t(c.estado) + '</td><td>' + t(c.decision) + '</td><td>' + V.chips(c.objetivos) + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<h3 style="margin-top:2.4rem" id="vista-integrada">Vista integrada en ArchiMate 3.2</h3>' +
      '<p class="intro">' + t(TB.vistaIntegrada) + ' Toca cualquier elemento para ver su ficha y sus relaciones.</p>' +
      '<div class="plancha"><div class="plancha-barra"><span class="ayuda" id="int-texto" aria-live="polite">Los números del 1 al 6 siguen una lectura desde el medidor hasta la factura. Borde verde grueso: capacidad o aplicación crítica.</span>' +
        '<span class="acciones" style="margin:0"><span class="segmentado" role="group" aria-label="Capa a resaltar">' +
          [['todas', 'Todas'], ['est', 'Estrategia'], ['neg', 'Negocio'], ['apl', 'Aplicación'], ['tec', 'Tecnología']].map(function (c) { return '<button type="button" data-capa-int="' + c[0] + '" aria-pressed="' + (c[0] === 'todas') + '">' + c[1] + '</button>'; }).join('') + '</span>' +
          '<button type="button" class="btn btn-verde btn-chico" id="int-lectura">' + V.icono('reproducir') + 'Recorrer una lectura</button>' + V.botonPantalla() + '</span></div>' +
        V.diagrama({ id: 'integrada', clase: 'archi', ancho: IW, alto: IH, minimo: 1000, nodos: INT.nodos, aristas: INT.aristas, zonas: INT.zonas }) +
        V.leyendaArchi([['capacidad', 'Capacidad', 'am-est'], ['rol', 'Rol', 'am-neg'], ['actor', 'Actor', 'am-neg'], ['componente', 'Componente de aplicación', 'am-apl'], ['interfaz', 'Interfaz', 'am-apl'], ['dato', 'Objeto de datos', 'am-apl'], ['equipo', 'Dispositivo', 'am-tec'], ['red', 'Red', 'am-tec'], ['sistema', 'Software de sistema', 'am-tec']],
          ['realizacion', 'servicio', 'composicion', 'flujo', 'acceso']) +
      '</div>' +
      '<p class="nota" style="margin-top:1rem">Composición tomada de la vista exportada desde Archi para el documento final: <a href="img/archimate/VIRIDIA-ArchiMate-4-completa.png" target="_blank" rel="noopener">ver la exportación original</a>.</p>' +
      '<h3 style="margin-top:2.4rem">Principios de arquitectura</h3>' +
      '<div class="dos-col revelar">' + TB.principios.map(function (p) {
        return '<button type="button" class="regla" data-detalle="' + p.id + '" style="grid-template-columns:3.2rem 1fr"><b>' + p.id + '</b><span><strong>' + t(p.nombre) + '</strong><small>' + t(p.implicacion) + '</small></span></button>';
      }).join('') + '</div>' +
      '<h3 style="margin-top:2.4rem">Por qué cambia cada cosa</h3>' +
      '<div class="revelar">' + TB.cambios.map(function (c) {
        return '<div class="cambio"><span class="desde">' + t(c.desde) + '</span>' + V.icono('flecha') + '<span class="hacia">' + t(c.hacia) + '</span><p>' + t(c.porque) + ' <span class="cita-fuente">' + V.esc(c.sostiene) + '</span></p></div>';
      }).join('') + '</div>' +
    '</div></section>' +

    '<section class="seccion banda" id="asis"><div class="contenido">' +
      '<h2>Dos estados actuales y uno objetivo</h2>' +
      '<div class="dos-col"><div><h3>As-Is del cliente</h3><p style="color:var(--texto-2)">' + t(TR.asisCliente) + '</p></div><div><h3>As-Is de VIRIDIA (arranque, final de 2026)</h3><p style="color:var(--texto-2)">' + t(TR.asisViridiaNota) + '</p></div></div>' +
      '<p class="intro" style="margin-top:1.4rem">Capa por capa, cómo funciona VIRIDIA hoy, qué brechas lo separan del estado objetivo y cómo quedará en 2031. Toca una brecha para ver su ficha.</p>' +
      '<div class="comparacion">' + ['Negocio', 'Información', 'Aplicaciones', 'Tecnología'].map(function (c) {
        var a = TR.asisViridia.filter(function (x) { return x.capa === c; })[0], b = TB.capas.filter(function (x) { return x.capa === c; })[0];
        var bs = TR.brechas.filter(function (x) { return x.capa === c; }).map(function (x) { return x.id; });
        return '<div class="comp-fila revelar"><div class="comp-capa"><span>' + c + '</span><small>' + bs.length + ' brechas</small></div>' +
          '<div class="comp-asis"><b>As-Is de VIRIDIA</b>' + t(a.hoy) + '<small>' + t(a.consecuencia) + '</small></div>' +
          '<div class="comp-brechas"><svg class="flecha-comp" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>' + V.chips(bs) + '</div>' +
          '<div class="comp-tobe"><b>To-Be 2031</b>' + t(b.estado) + '<small>' + t(b.decision) + '</small></div></div>';
      }).join('') + '</div>' +
    '</div></section>' +

    '<section class="seccion" id="brechas"><div class="contenido">' +
      '<h2>Catorce brechas</h2>' +
      '<p class="intro">' + t(TR.priorizacion) + ' Cuatro las había señalado el Taller 3: ' + TR.brechasTaller3.map(function (b) { return V.chip(b); }).join(' ') + '.</p>' +
      '<div class="dos-col" style="align-items:start"><figure class="cuadrante revelar" style="margin:0">' + cuadrante() + '<figcaption class="nota">Verde oscuro: prioridad alta. Verde claro: media. Gris: baja. Toca una brecha para ver su ficha.</figcaption></figure>' +
        '<div>' + TR.cuadrantes.map(function (q) { return '<div style="border-top:1px solid var(--linea);padding:.8rem 0"><h3>' + q.nombre + '</h3><p style="margin:0;color:var(--texto-2);font-size:.95rem">' + t(q.texto) + '</p></div>'; }).join('') + '</div></div>' +
      '<div class="filtros" style="margin:1.6rem 0 1rem" role="group" aria-label="Filtrar brechas"><span class="etq-grupo">Capa:</span>' +
        ['Todas', 'Negocio', 'Información', 'Aplicaciones', 'Tecnología'].map(function (c) { return '<button type="button" class="filtro" data-capa="' + c + '" aria-pressed="' + (c === 'Todas') + '">' + c + '</button>'; }).join('') +
        '<span class="etq-grupo" style="margin-left:1rem">Prioridad:</span>' + ['Todas', 'Alta', 'Media', 'Baja'].map(function (p) { return '<button type="button" class="filtro" data-prio="' + p + '" aria-pressed="' + (p === 'Todas') + '">' + p + '</button>'; }).join('') + '</div>' +
      '<div class="tabla-envoltura"><table class="tabla" id="tabla-brechas"><thead><tr><th>Id</th><th>De la situación actual a la objetivo</th><th>Acción</th><th>Afecta</th><th>Prioridad</th><th>Proyecto</th></tr></thead><tbody>' +
        TR.brechas.map(function (b) {
          return '<tr data-sel="' + b.id + '" data-capa="' + b.capa + '" data-prio="' + b.prioridad + '"><td>' + V.chip(b.id) + '</td><td><span style="color:var(--texto-2)">' + t(b.desde) + '</span> → <strong>' + t(b.hacia) + '</strong></td><td>' + V.esc(b.accion) + '</td><td>' + V.chips(b.afecta) + '</td><td><span class="etq ' + (b.prioridad === 'Alta' ? 'critica' : b.prioridad === 'Media' ? 'alta' : 'media') + '">' + b.prioridad + '</span></td><td>' + V.chips(b.proyectos) + '</td></tr>';
        }).join('') + '</tbody></table></div>' +
      '<h3 style="margin-top:2.4rem">Gestión del cambio</h3><div class="dos-col revelar">' + TR.gestionCambio.map(function (g) { return '<div style="border-top:2px solid var(--lima-hondo);padding-top:.8rem"><h3>' + t(g.frente) + '</h3><p style="color:var(--texto-2);font-size:.95rem;margin:0">' + t(g.texto) + '</p></div>'; }).join('') + '</div>' +
    '</div></section>' +

    '<section class="seccion banda" id="roadmap"><div class="contenido">' +
      '<h2>Roadmap de migración 2026–2031</h2>' +
      '<p class="intro">Doce proyectos en tres fases, las del despliegue que ya fijaba la Matriz de Zachman, con los hitos de 8, 45 y 120 clientes. ' + t(TR.notaProyectos) + '</p>' +
      '<div class="fases revelar" role="group" aria-label="Fases">' + TR.fases.map(function (f) {
        return '<button type="button" class="fase f' + f.n + '" data-fase="' + f.n + '" aria-pressed="false"><strong>Fase ' + f.n + '. ' + t(f.nombre) + '</strong><span class="periodo">' + V.esc(f.periodo) + '</span><p>' + t(f.enfoque) + '</p><span class="meta">' + t(f.meta) + '</span></button>';
      }).join('') + '</div>' +
      '<div class="plancha" style="margin-top:1.4rem"><div class="desplaza" style="padding:1rem">' + gantt() + '</div></div>' +
      '<div class="dos-col" style="margin-top:2rem"><div><h3>Criterios de secuenciación</h3><ol style="padding-left:1.2rem;margin:0">' + TR.criterios.map(function (c) { return '<li style="margin-bottom:.5rem"><strong>' + t(c.nombre) + '.</strong> <span style="color:var(--texto-2)">' + t(c.texto) + '</span></li>'; }).join('') + '</ol></div>' +
        '<div><h3>Gobierno del roadmap</h3><p style="color:var(--texto-2)">' + t(TR.gobierno) + '</p>' + TR.criteriosSalida.map(function (c) { return '<p class="nota"><strong>' + t(c.paso) + ':</strong> ' + t(c.texto) + '</p>'; }).join('') + '</div></div>' +
    '</div></section>' +

    '<section class="seccion" id="puesta"><div class="contenido">' +
      '<h2>Puesta en marcha de cada cliente: de 4 a 6 semanas</h2>' +
      '<p class="intro">El roadmap se repite a escala pequeña con cada cliente nuevo, como fija la fila Constructor de la Matriz de Zachman.</p>' +
      '<div class="semanas revelar">' + TR.puestaEnMarcha.map(function (s) { return '<div class="semana"><strong>' + t(s.nombre) + '</strong><b>' + t(s.semanas) + '</b><p>' + t(s.texto) + '</p></div>'; }).join('') + '</div>' +
      '<p class="nota" style="margin-top:1.2rem">' + t(TR.notaPuesta) + '</p>' +
      '<div class="acciones"><a class="btn btn-verde" href="#/simulador">Simular la puesta en marcha y el primer cierre ' + V.icono('flecha') + '</a></div>' +
    '</div></section>';
  }

  function cuadrante() {
    var W = 560, H = 430, m = { l: 54, r: 14, t: 14, b: 50 }, pw = W - m.l - m.r, ph = H - m.t - m.b;
    var x = function (v) { return m.l + pw * v / 10; }, y = function (v) { return m.t + ph * (1 - v / 10); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Brechas por impacto y esfuerzo">';
    s += '<rect class="fondo-q" x="' + x(0) + '" y="' + y(10) + '" width="' + (x(5) - x(0)) + '" height="' + (y(6) - y(10)) + '" fill="rgba(127,191,77,.14)"/>' +
      '<rect class="fondo-q" x="' + x(5) + '" y="' + y(10) + '" width="' + (x(10) - x(5)) + '" height="' + (y(6) - y(10)) + '" fill="rgba(27,94,58,.08)"/>' +
      '<rect class="fondo-q" x="' + x(0) + '" y="' + y(6) + '" width="' + (x(5) - x(0)) + '" height="' + (y(0) - y(6)) + '" fill="#F1F5F1"/>' +
      '<rect x="' + x(0) + '" y="' + y(10) + '" width="' + pw + '" height="' + ph + '" fill="none" stroke="rgba(31,42,46,.35)"/>' +
      '<line x1="' + x(5) + '" x2="' + x(5) + '" y1="' + y(0) + '" y2="' + y(10) + '" stroke="rgba(31,42,46,.25)" stroke-dasharray="4 4"/>' +
      '<line x1="' + x(0) + '" x2="' + x(10) + '" y1="' + y(6) + '" y2="' + y(6) + '" stroke="rgba(31,42,46,.25)" stroke-dasharray="4 4"/>';
    s += '<text class="qt" x="' + (x(0) + 8) + '" y="' + (y(10) + 18) + '">Ganancias rápidas</text><text class="qt" x="' + (x(10) - 8) + '" y="' + (y(10) + 18) + '" text-anchor="end">Proyectos estructurales</text>' +
      '<text class="qt" x="' + (x(0) + 8) + '" y="' + (y(0) - 8) + '">Complementos</text><text class="qt" x="' + (x(10) - 8) + '" y="' + (y(0) - 8) + '" text-anchor="end">Cuando haya escala</text>';
    s += '<text class="eje-t" x="' + (m.l + pw / 2) + '" y="' + (H - 12) + '" text-anchor="middle">Esfuerzo (tiempo, costo y dependencias) →</text>' +
      '<text class="eje-t" transform="translate(16 ' + (m.t + ph / 2) + ') rotate(-90)" text-anchor="middle">Impacto sobre C2, OE1 y OE2 →</text>';
    var colores = { Alta: '#1B5E3A', Media: '#D4E9BF', Baja: '#E4ECE4' };
    s += TR.brechas.map(function (b) {
      return '<g class="b-punto ' + b.prioridad + '" tabindex="0" role="button" data-detalle="' + b.id + '" aria-label="' + b.id + ', prioridad ' + b.prioridad.toLowerCase() + '"><circle cx="' + x(b.esfuerzo) + '" cy="' + y(b.impacto) + '" r="16" fill="' + colores[b.prioridad] + '"' + (b.prioridad === 'Baja' ? ' stroke="#6B7A78"' : '') + '/><text x="' + x(b.esfuerzo) + '" y="' + (y(b.impacto) + 4) + '" text-anchor="middle">' + b.id + '</text><title>' + V.esc(b.id + ': ' + b.hacia) + '</title></g>';
    }).join('');
    return s + '</svg>';
  }

  function gantt() {
    var html = '<div class="gantt" id="gantt"><div style="grid-row:1;grid-column:1"></div>';
    var col = 2;
    ANIOS.forEach(function (a) { html += '<div class="gantt-anio" style="grid-column:' + col + ' / span ' + a[1] + '">' + a[0] + '</div>'; col += a[1]; });
    html += '<div style="grid-row:2;grid-column:1"></div>' + TR.semestres.map(function (s, k) { return '<div class="gantt-cab" style="grid-row:2;grid-column:' + (k + 2) + '">' + s.split('-')[1] + '</div>'; }).join('');
    var fila = 3, i = 0;
    TR.fases.forEach(function (f) {
      html += '<div class="gantt-fase" style="grid-row:' + fila + '">Fase ' + f.n + '. ' + t(f.nombre) + '</div>';
      fila++;
      TR.proyectos.filter(function (p) { return p.fase === f.n; }).forEach(function (p) {
        html += '<div class="gantt-etq" style="grid-row:' + fila + ';grid-column:1" data-detalle="' + p.id + '"><span class="chip" data-t="P">' + p.id + '</span>' + t(p.nombre) + '</div>';
        for (var c = 0; c < 11; c++) html += '<div class="gantt-celda" style="grid-row:' + fila + ';grid-column:' + (c + 2) + '"></div>';
        html += '<button type="button" class="gantt-barra f' + f.n + '" data-detalle="' + p.id + '" data-fase="' + f.n + '" style="grid-row:' + fila + ';grid-column:' + (p.ini + 2) + ' / ' + (p.fin + 2) + ';--i:' + (i++) + '" aria-label="' + p.id + ' ' + V.esc(p.nombre) + ', ' + V.esc(p.periodo) + '" title="' + V.esc(p.periodo) + '"></button>';
        fila++;
      });
    });
    html += '<div style="grid-row:' + fila + ';grid-column:1;padding-top:.9rem;font-weight:700;color:var(--agua-hondo);font-size:.88rem">Hitos</div><div class="gantt-hitos" style="grid-row:' + fila + ';grid-column:2 / -1">' +
      TR.hitos.map(function (h) { return '<button type="button" class="hito" data-detalle="' + h.id + '" style="left:' + (100 * h.pos / 11) + '%" aria-label="' + h.id + ', ' + V.esc(h.fecha) + '"></button><span class="hito-etq" style="left:' + (100 * h.pos / 11) + '%">' + h.id + '</span>'; }).join('') + '</div>';
    return html + '</div>';
  }

  /* Vista integrada To-Be: la composición de la exportación de Archi. Las coordenadas se leen en píxeles
     de esa imagen y se convierten; el eje vertical se estira para que los nombres quepan a tamaño legible. */
  var AP = D.aplicaciones, IW = 1000, IH = 992;
  function ix(x) { return (x - 4) * 0.658; }
  function iy(y) { return (y - 45) * 0.9; }
  var CAPA_INT = {}, NUBE = ['T5', 'T6', 'T7', 'T10', 'T11'];
  var INT = (function () {
    var nodos = [], aristas = [], zonas = [];
    function zona(x0, y0, x1, y1, clase, titulo) { zonas.push({ x: ix(x0), y: iy(y0), w: ix(x1) - ix(x0), h: iy(y1) - iy(y0), clase: clase, titulo: titulo }); }
    function n(id, capa, clase, icono, b, html, etiqueta) {
      CAPA_INT[id] = capa;
      nodos.push({ id: id, x: ix(b[0]), y: iy(b[1]), w: ix(b[2]) - ix(b[0]), h: iy(b[3]) - iy(b[1]), clase: clase, icono: icono, html: html, etiqueta: etiqueta });
    }
    function app(id, b) { var a = V.porId(AP.apps, id); n(id, 'apl', 'am-apl' + (a.criticidad === 'Crítica' ? ' am-critica' : ''), 'componente', b, '<b>' + id + '</b><span>' + V.esc(a.nombre) + '</span>', id + ': ' + a.nombre); }
    function tipo(id, capa, clase, icono, b, rotulo, nombre) { n(id, capa, clase, icono, b, '<small>' + rotulo + '</small><span>' + nombre + '</span>', rotulo + ': ' + nombre); }
    function dato(id, b, extra) { n(id, 'apl', 'am-dato', null, b, '<b>' + id.replace('_', '_<wbr>') + '</b>' + (extra ? '<small>' + extra + '</small>' : ''), 'Objeto de datos ' + id); }
    function tec(id, icono, b, nombre) { n(id, 'tec', 'am-tec', icono, b, '<b>' + id + '</b><span>' + nombre + '</span>', id + ': ' + nombre); }
    function ar(de, a, clase, pts, extra) {
      var o = { de: de, a: a, clase: clase, puntos: pts.map(function (p) { return [ix(p[0]), iy(p[1])]; }) };
      Object.keys(extra || {}).forEach(function (k) { o[k] = extra[k]; });
      if (o.posEtiqueta) o.posEtiqueta = [ix(o.posEtiqueta[0]), iy(o.posEtiqueta[1])];
      if (o.etiqueta) o.fija = true;
      aristas.push(o);
    }
    var flujo = function (de, a, pts, etq, extra) { var o = { fin: 'flecha', etiqueta: etq }; Object.keys(extra || {}).forEach(function (k) { o[k] = extra[k]; }); ar(de, a, 'flujo', pts, o); };
    var sirve = function (de, a, pts, extra) { var o = { fin: 'abierta' }; Object.keys(extra || {}).forEach(function (k) { o[k] = extra[k]; }); ar(de, a, '', pts, o); };

    zona(10, 47, 1510, 155, 'am-est', 'Estrategia: qué debe ser capaz de hacer la empresa');
    zona(20, 72, 540, 140, 'am-nota', 'Las aplicaciones de la nube realizan las capacidades: A2 y A3 realizan C2, la capacidad crítica; A4 realiza C4. El detalle está en la vista de aplicaciones.');
    zona(10, 167, 1510, 347, 'am-neg', 'Negocio: quién usa las aplicaciones');
    zona(245, 188, 895, 338, 'am-grupo-neg', 'Cliente (planta industrial)');
    zona(995, 188, 1310, 338, 'am-grupo-neg', 'VIRIDIA S.A.S. BIC');
    zona(10, 357, 1510, 917, 'am-apl', 'Aplicación: sistemas, datos e integraciones');
    zona(240, 368, 1235, 905, 'am-grupo titulo-centro', 'Aplicaciones de VIRIDIA, alojadas en la nube');
    zona(10, 927, 1510, 1146, 'am-tec', 'Tecnología: dónde corre todo');
    zona(20, 942, 420, 1062, 'am-grupo-planta', 'Planta del cliente');
    zona(450, 942, 1500, 1136, 'am-grupo-nube', 'Nube pública, región Latinoamérica · ambientes de desarrollo, pruebas y producción');

    n('C2', 'est', 'am-est am-critica', 'capacidad', [570, 82, 910, 144], '<b>C2</b><span>Analítica histórica y prospectiva (capacidad crítica)</span>', 'C2: analítica histórica y prospectiva');
    n('C4', 'est', 'am-est', 'capacidad', [995, 82, 1275, 144], '<b>C4</b><span>Medición y verificación</span>', 'C4: medición y verificación');
    tipo('ROL_PLANTA', 'neg', 'am-neg', 'rol', [260, 230, 570, 304], 'Rol', 'Jefe de mantenimiento y gerente de planta');
    tipo('ROL_FIN', 'neg', 'am-neg', 'rol', [585, 230, 885, 304], 'Rol', 'Gerencia financiera del cliente');
    tipo('ROL_COM', 'neg', 'am-neg', 'rol', [1005, 230, 1150, 304], 'Rol', 'Comercial, finanzas y legal');
    tipo('ROL_ING', 'neg', 'am-neg', 'rol', [1158, 230, 1303, 304], 'Rol', 'Ingenieros, analistas y científicos de datos');
    tipo('VERIF', 'neg', 'am-neg', 'actor', [1330, 230, 1500, 304], 'Actor externo', 'Verificador independiente');
    tipo('ERPCLI', 'apl', 'am-apl am-ext', 'componente', [30, 386, 180, 464], 'Externo', 'Sistemas del cliente (ERP o MES)');
    tipo('NOTIF', 'apl', 'am-apl', 'interfaz', [290, 395, 440, 455], 'Interfaz', 'Notificaciones por correo y SMS');
    app('A5', [550, 395, 700, 455]);
    tipo('PORTAL', 'apl', 'am-apl', 'interfaz', [810, 395, 960, 455], 'Interfaz', 'Portal web del cliente');
    app('A1', [30, 505, 180, 575]); app('A2', [290, 505, 440, 575]); app('A3', [550, 505, 700, 575]); app('A4', [810, 505, 960, 575]); app('A7', [1070, 505, 1220, 575]);
    tipo('DIAN', 'apl', 'am-apl am-ext', 'componente', [1330, 505, 1480, 575], 'Externo', 'Proveedor de factura electrónica (DIAN)');
    dato('LECTURA', [310, 615, 420, 665]); dato('LINEA_BASE', [570, 615, 680, 665], '(versionada)'); dato('CALCULO_AHORRO', [830, 615, 940, 665]); dato('FACTURA', [1090, 615, 1200, 665]);
    app('A8', [415, 730, 575, 800]); app('A9', [675, 730, 835, 800]); app('A6', [935, 730, 1095, 800]); app('A10', [1270, 730, 1420, 800]);
    dato('EQUIPO', [440, 835, 550, 885], '(comodato)'); dato('CONTRATO', [960, 835, 1070, 885]);
    tec('T2', 'equipo', [30, 962, 185, 1052], 'Pasarela industrial de planta (respaldo local de 72 h)');
    tec('T1', 'equipo', [240, 962, 410, 1052], 'Medidores clase 0,5S, caudalímetros y sensores (comodato)');
    tec('T3', 'red', [190, 1072, 420, 1136], 'Red celular 4G (segunda SIM, canal cifrado)');
    tec('T5', 'sistema', [470, 975, 660, 1062], 'Gateway de API (verifica la identidad con A10)');
    tec('T6', 'sistema', [675, 975, 865, 1062], 'Bus de eventos (mensajería)');
    tec('T7', 'sistema', [880, 975, 1070, 1062], 'Transferencia controlada de archivos');
    tec('T10', 'sistema', [1085, 975, 1275, 1062], 'Base de series de tiempo (espacio aislado por cliente)');
    tec('T11', 'sistema', [1290, 975, 1485, 1062], 'Bases de datos de las aplicaciones (respaldo diario, 10 años)');

    // Estrategia: lo que se construye realiza C2 y C4 (las líneas salen del grupo de aplicaciones).
    ar('A3', 'C2', 'realizacion', [[925, 368], [925, 112], [910, 112]], { fin: 'hueco', grupo: ['A2', 'A3', 'C2'] });
    ar('A4', 'C4', 'realizacion', [[965, 368], [965, 112], [995, 112]], { fin: 'hueco' });
    // Negocio: quién usa qué.
    sirve('NOTIF', 'ROL_PLANTA', [[365, 395], [365, 304]]);
    sirve('PORTAL', 'ROL_FIN', [[848, 395], [848, 304]]);
    sirve('PORTAL', 'ROL_PLANTA', [[812, 397], [570, 304]]);
    sirve(null, null, [[1110, 368], [1110, 338]], { grupo: ['ROL_COM', 'ROL_ING'] });
    sirve(null, null, [[1270, 765], [1235, 765]], { grupo: ['A10'] });
    ar('A5', 'NOTIF', '', [[550, 425], [440, 425]], { inicio: 'rombo-lleno' });
    ar('A5', 'PORTAL', '', [[700, 425], [810, 425]], { inicio: 'rombo-lleno' });
    // Integraciones (I1–I16); los números 1 a 6 siguen una lectura.
    flujo('ERPCLI', 'A2', [[180, 464], [290, 505]], 'I10 · archivo');
    flujo('A1', 'A2', [[180, 540], [290, 540]], '2 · I1 evento');
    flujo('A2', 'A3', [[440, 540], [550, 540]], '3 · I2 API');
    flujo('A3', 'A4', [[700, 540], [810, 540]], '4 · I3 API');
    flujo('A4', 'A7', [[960, 540], [1070, 540]], '5 · I4 (RN1)');
    flujo('A7', 'DIAN', [[1220, 540], [1330, 540]], '6 · I5 API');
    flujo('A2', 'A5', [[440, 505], [550, 455]], 'I9 · evento');
    flujo('A3', 'A5', [[625, 505], [625, 455]], 'I8 · evento');
    flujo('A4', 'A5', [[810, 505], [700, 455]], 'I7 · API');
    flujo('A4', 'VERIF', [[960, 505], [990, 480], [1415, 480], [1415, 304]], 'I6 expediente MRV · archivo', { posEtiqueta: [1190, 480] });
    flujo('A8', 'A2', [[450, 730], [450, 575]], 'I11 · API', { posEtiqueta: [450, 705] });
    flujo('A4', 'A9', [[830, 575], [770, 610], [770, 730]], 'I16 · API');
    flujo('A6', 'A4', [[955, 730], [955, 575]], 'I13 · API', { posEtiqueta: [955, 705] });
    flujo('A6', 'A7', [[1075, 730], [1075, 575]], 'I14 · API', { posEtiqueta: [1075, 705] });
    flujo('A6', 'A9', [[935, 765], [835, 765]], 'I15 · API');
    flujo('A6', 'A8', [[970, 800], [970, 818], [530, 818], [530, 800]], 'I12 orden de retiro · evento', { posEtiqueta: [750, 818] });
    // Acceso a los objetos de datos del MER.
    [['A2', 'LECTURA', 365, 575, 615], ['A3', 'LINEA_BASE', 625, 575, 615], ['A4', 'CALCULO_AHORRO', 885, 575, 615], ['A7', 'FACTURA', 1145, 575, 615], ['A8', 'EQUIPO', 495, 800, 835], ['A6', 'CONTRATO', 1015, 800, 835]].forEach(function (x) {
      ar(x[0], x[1], 'acceso', [[x[2], x[3]], [x[2], x[4]]], { fin: 'abierta' });
    });
    // Tecnología: dónde corre cada cosa.
    sirve('T2', 'A1', [[105, 962], [105, 575]]);
    flujo('T1', 'T2', [[240, 1007], [185, 1007]], '1 · mide');
    ar('T3', 'T2', '', [[190, 1080], [175, 1052]]);
    ar(null, null, '', [[420, 1105], [450, 1105]], { grupo: ['T3'].concat(NUBE) });
    sirve(null, null, [[843, 942], [843, 905]], { grupo: NUBE });
    sirve(null, null, [[1345, 942], [1345, 800]], { grupo: NUBE.concat(['A10']) });
    return { nodos: nodos, aristas: aristas, zonas: zonas };
  })();

  // Recorrido de una lectura sobre la vista integrada (mismos siete pasos que en Aplicaciones).
  var LECTURA_INT = [
    { nodos: ['T1'], puntos: [[325, 1007], [107, 1007]] },
    { nodos: ['T2', 'A1'], puntos: [[107, 1007], [105, 540]] },
    { nodos: ['A2'], puntos: [[105, 540], [365, 540]] },
    { nodos: ['A3'], puntos: [[365, 540], [625, 540]] },
    { nodos: ['A4'], puntos: [[625, 540], [885, 540]] },
    { nodos: ['A7'], puntos: [[885, 540], [1145, 540]] },
    { nodos: ['DIAN'], puntos: [[1145, 540], [1405, 540]] }
  ];
  var leyendo = false;
  function recorrerLectura() {
    if (leyendo) return;
    leyendo = true;
    V.panel.cerrar(true);
    verCapa('todas');
    var diag = V.$('#integrada'), texto = V.$('#int-texto'), acumulado = [], k = 0;
    (function paso() {
      if (k >= LECTURA_INT.length) { leyendo = false; texto.innerHTML = 'Recorrido completo: la lectura llegó a la factura, solo porque el ahorro fue positivo (RN1).'; return; }
      var tr = LECTURA_INT[k];
      acumulado = acumulado.concat(tr.nodos);
      V.enfocar(diag, acumulado);
      texto.innerHTML = '<strong>' + AP.recorrido[k].n + '.</strong> ' + t(AP.recorrido[k].texto);
      V.pulso(diag, tr.puntos.map(function (p) { return [ix(p[0]), iy(p[1])]; }), IW, IH, 1000).then(function () { k++; setTimeout(paso, V.movimiento() ? 600 : 900); });
    })();
  }
  function verCapa(capa) {
    var diag = V.$('#integrada');
    if (!diag) return;
    V.$$('[data-capa-int]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-capa-int') === capa)); });
    V.$$('.nodo', diag).forEach(function (n) { n.classList.remove('elegido'); });
    V.enfocar(diag, capa === 'todas' ? null : Object.keys(CAPA_INT).filter(function (id) { return CAPA_INT[id] === capa; }));
  }
  function enfocarInt(id) {
    var diag = V.$('#integrada');
    if (!diag || leyendo) return;
    var v = id && CAPA_INT[id] ? V.vecinos(INT.aristas, id) : null;
    V.$$('[data-capa-int]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-capa-int') === 'todas')); });
    V.enfocar(diag, v && v.ids, v && v.ks);
    V.$$('.nodo', diag).forEach(function (n) { n.classList.toggle('elegido', n.getAttribute('data-id') === id); });
  }
  // Ficha breve de los roles y del portal, que no tienen identificador propio en el documento.
  var ROLES = {
    ROL_PLANTA: ['Cliente: gerente de planta y jefe de mantenimiento'],
    ROL_FIN: ['Cliente: gerencia financiera'],
    ROL_COM: ['Comercial y Mercadeo', 'Finanzas, Inversión y Relación con Socios', 'Legal, Cumplimiento y Ética de la IA'],
    ROL_ING: ['Entrega de Servicio y Eficiencia Operativa', 'Tecnología y Gobierno de Datos', 'I+D e Innovación en IA']
  };
  function fichaInt(id) {
    var nodo = V.porId(INT.nodos, id), nombre = nodo.etiqueta.split(': ')[1], cuerpo;
    if (id === 'PORTAL') cuerpo = '<p>Interfaz por la que el cliente usa ' + V.chip('A5') + ', que la compone: ' + t(V.porId(AP.apps, 'A5').proposito) + '</p>' + V.h3('Sirve a') + '<p>Jefe de mantenimiento y gerente de planta; gerencia financiera del cliente.</p>';
    else cuerpo = ROLES[id].map(function (a) {
      var x = D.negocio.actores.filter(function (y) { return y.nombre === a; })[0];
      return V.h3(a.replace('Cliente: ', '')) + '<p>' + t(x.papel) + '</p>' + V.chips(x.procesos);
    }).join('');
    V.panel.abrir({ tipo: (id === 'PORTAL' ? 'Interfaz de aplicación' : 'Rol de negocio') + ' · ArchiMate', titulo: nombre, cuerpo: cuerpo });
    enfocarInt(id);
  }

  function filtrarBrechas() {
    var capa = V.$('.filtro[data-capa][aria-pressed="true"]').getAttribute('data-capa');
    var prio = V.$('.filtro[data-prio][aria-pressed="true"]').getAttribute('data-prio');
    V.$$('#tabla-brechas tr[data-sel]').forEach(function (tr) {
      tr.hidden = (capa !== 'Todas' && tr.getAttribute('data-capa') !== capa) || (prio !== 'Todas' && tr.getAttribute('data-prio') !== prio);
    });
  }
  function enfocarFase(n) {
    var g = V.$('#gantt');
    V.$$('.fase').forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-fase')) === n)); });
    g.classList.toggle('foco', !!n);
    V.$$('.gantt-barra', g).forEach(function (b) { b.classList.toggle('encendida', Number(b.getAttribute('data-fase')) === n); });
    if (!n) return;
    var f = TR.fases[n - 1], ps = TR.proyectos.filter(function (p) { return p.fase === n; });
    var cierra = []; ps.forEach(function (p) { p.cierra.forEach(function (b) { if (cierra.indexOf(b) < 0) cierra.push(b); }); });
    var salida = TR.criteriosSalida[n - 1];
    V.panel.abrir({
      id: 'FASE ' + n, tipo: 'Fase del roadmap · ' + f.periodo, titulo: f.nombre,
      cuerpo: '<p>' + t(f.enfoque) + '</p>' + V.h3('Meta de salida') + '<p><strong>' + t(f.meta) + '</strong></p>' +
        V.h3('Proyectos') + V.chips(ps.map(function (p) { return p.id; })) +
        V.h3('Brechas que cierra') + (cierra.length ? V.chips(cierra) : '<p>Ninguna del As-Is: realiza la Visión 2031 (OE5 y expansión).</p>') +
        (salida ? V.h3('Criterio para pasar a la fase ' + (n + 1)) + '<p>' + t(salida.texto) + '</p>' : '')
    });
  }

  V.vistas.transformacion = {
    titulo: 'Transformación', render: render,
    montar: function (raiz) {
      leyendo = false;
      raiz.addEventListener('click', function (e) {
        var b;
        if ((b = e.target.closest('#integrada .nodo'))) { var id = b.getAttribute('data-id'); if (V.indice[id]) V.detalle(id); else fichaInt(id); return; }
        if ((b = e.target.closest('[data-capa-int]'))) { V.panel.cerrar(true); verCapa(b.getAttribute('data-capa-int')); return; }
        if (e.target.closest('#int-lectura')) { recorrerLectura(); return; }
        if ((b = e.target.closest('.filtro[data-capa], .filtro[data-prio]'))) {
          var attr = b.hasAttribute('data-capa') ? 'data-capa' : 'data-prio';
          V.$$('.filtro[' + attr + ']').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          filtrarBrechas(); return;
        }
        if ((b = e.target.closest('button.fase'))) { var n = Number(b.getAttribute('data-fase')); enfocarFase(b.getAttribute('aria-pressed') === 'true' ? 0 : n); return; }
        var f = e.target.closest('tr[data-sel]'); if (f && !e.target.closest('a')) V.detalle(f.getAttribute('data-sel'));
      });
      raiz.addEventListener('keydown', function (e) {
        var g = e.target.closest && e.target.closest('.b-punto');
        if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); V.detalle(g.getAttribute('data-detalle')); }
      });
    },
    alSeleccionar: function (id) {
      enfocarInt(id);
      if (!id) { var g = V.$('#gantt'); if (g) { g.classList.remove('foco'); V.$$('.fase').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); }); } return; }
      V.$$('#tabla-brechas tr[data-sel]').forEach(function (tr) { tr.classList.toggle('resaltada', tr.getAttribute('data-sel') === id); });
      var e = V.indice[id], g2 = V.$('#gantt');
      if (e && e.tipo === 'P' && g2) { g2.classList.add('foco'); V.$$('.gantt-barra', g2).forEach(function (b) { b.classList.toggle('encendida', b.getAttribute('data-detalle') === id); }); }
      if (e && e.tipo === 'B' && g2) { g2.classList.add('foco'); V.$$('.gantt-barra', g2).forEach(function (b) { b.classList.toggle('encendida', e.obj.proyectos.indexOf(b.getAttribute('data-detalle')) >= 0); }); }
    }
  };
})();
