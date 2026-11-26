/* Estrategia: misión, Visión 2031, objetivos OE1–OE5, capacidades C1–C10,
   matriz de cobertura interactiva, cadena de alineación y la capacidad crítica C2. */
(function () {
  'use strict';
  var V = window.V, D = V.datos, E = D.estrategia, t = V.t;
  var OES = ['OE1', 'OE2', 'OE3', 'OE4', 'OE5'];

  function render() {
    var critica = E.critica;
    return V.cabecera({
      titulo: 'Arquitectura estratégica', semilla: 5, lamina: 'estrategia',
      alt: 'Grabado de una ceiba joven en corte: cinco ramas arriba y diez raíces bajo la línea del suelo.',
      pregunta: '¿Por qué existe la empresa, hacia dónde va y qué debe ser capaz de hacer para llegar?',
      entrada: 'Es la capa de la que se derivan todas las demás: cinco objetivos que se sostienen sobre diez capacidades, como las ramas de la ceiba sobre sus raíces.',
      sumario: [['mision', 'Misión y visión'], ['objetivos', 'Objetivos'], ['capacidades', 'Capacidades'], ['matriz', 'Matriz de cobertura'], ['alineacion', 'Cadena de alineación'], ['critica', 'Capacidad crítica'], ['motivacion', 'Vista ArchiMate']]
    }) +
    '<section class="seccion" id="mision"><div class="contenido dos-col">' +
      '<div><h2>Misión</h2><blockquote class="declaracion">' + t(E.mision) + '</blockquote>' +
        '<dl class="dl" style="margin-top:1.2rem">' + E.misionElementos.map(function (m) { return '<dt>' + t(m.elemento) + '</dt><dd>' + t(m.texto) + '</dd>'; }).join('') + '</dl>' +
        '<p class="nota" style="margin-top:1.2rem">' + t(E.notaCoherencia) + '</p></div>' +
      '<div><h2>Visión 2031</h2><blockquote class="declaracion">' + t(E.vision) + '</blockquote>' +
        '<dl class="dl" style="margin-top:1.2rem">' + E.visionElementos.map(function (m) { return '<dt>' + t(m.elemento) + '</dt><dd>' + t(m.texto) + '</dd>'; }).join('') + '</dl></div>' +
    '</div></section>' +

    '<section class="seccion banda" id="objetivos"><div class="contenido">' +
      '<h2>Cinco objetivos estratégicos</h2>' +
      '<p class="intro">Cada uno enuncia un resultado, no una actividad. Toca un objetivo para iluminar las capacidades que lo sostienen en el mapa y en la matriz.</p>' +
      '<div class="objetivos" role="group" aria-label="Objetivos estratégicos">' + E.objetivos.map(function (o) {
        return '<button type="button" class="objetivo revelar" data-oe="' + o.id + '" aria-pressed="false"><strong><b>' + o.id + '</b> ' + t(o.nombre) + '</strong><span>' + t(o.meta) + '</span></button>';
      }).join('') + '</div>' +
      '<p class="nota" style="margin-top:1.4rem">' + t(E.criterioObjetivos) + '</p>' +
    '</div></section>' +

    '<section class="seccion" id="capacidades"><div class="contenido">' +
      '<h2>Diez capacidades de negocio</h2>' +
      '<p class="intro">Qué debe ser capaz de hacer la organización, con independencia de quién lo haga y con qué tecnología. Toca una capacidad para ver por qué es necesaria y a qué objetivos sirve.</p>' +
      '<div class="capacidades" id="mapa-capacidades">' + E.capacidades.map(function (c) {
        return '<button type="button" class="capacidad revelar' + (c.critica ? ' critica' : '') + '" data-c="' + c.id + '"><span><b>' + c.id + '</b> ' + t(c.corto) + '</span><span class="rel">' + (c.critica ? 'Capacidad crítica' : '') + '</span></button>';
      }).join('') + '</div>' +
    '</div></section>' +

    '<section class="seccion banda" id="matriz"><div class="contenido">' +
      '<h2>Matriz de cobertura</h2>' +
      '<p class="intro">' + t(E.lecturaMatriz) + '</p>' +
      '<div class="tabla-envoltura" style="padding:.8rem;display:inline-block;max-width:100%"><table class="matriz" id="matriz-cobertura"><thead><tr><th class="fila" scope="col">Capacidad</th>' +
        OES.map(function (o) { return '<th scope="col" data-oe="' + o + '"><button type="button" data-oe="' + o + '">' + o + '</button></th>'; }).join('') + '<th scope="col">Total</th></tr></thead><tbody>' +
        E.capacidades.map(function (c) {
          return '<tr><th class="fila" scope="row" data-c="' + c.id + '"><button type="button" data-c="' + c.id + '"><span class="mono" style="font-size:.78rem;font-weight:600;color:var(--verde)">' + c.id + '</span> ' + t(c.corto) + '</button></th>' +
            OES.map(function (o) { var r = c.oe[o] || ''; return '<td class="' + r + '" data-oe="' + o + '" data-c="' + c.id + '" title="' + (r === 'P' ? 'Relación principal' : r === 'S' ? 'Relación de soporte' : 'Sin relación') + '">' + r + '</td>'; }).join('') +
            '<td class="tot">' + Object.keys(c.oe).length + '</td></tr>';
        }).join('') +
        '<tr><th class="fila" scope="row"><strong>Capacidades que lo sostienen</strong></th>' + OES.map(function (o) {
          return '<td class="tot">' + E.capacidades.filter(function (c) { return c.oe[o]; }).length + '</td>';
        }).join('') + '<td class="tot">20</td></tr>' +
      '</tbody></table></div>' +
      '<p class="nota" style="margin-top:1rem"><strong>P</strong> relación principal · <strong>S</strong> relación de soporte · celda vacía: sin relación.</p>' +
    '</div></section>' +

    '<section class="seccion" id="alineacion"><div class="contenido dos-col">' +
      '<div><h2>Cadena de alineación</h2><p class="intro">Se lee de arriba abajo: cada nivel responde a una pregunta y ninguno se justifica por sí mismo, sino por el que lo antecede. Hacia abajo, ninguna capacidad existe sin un objetivo; hacia arriba, ningún objetivo queda sin capacidades.</p></div>' +
      '<div class="cadena-alineacion revelar">' +
        eslabon('¿Quiénes somos?', 'Empresa', 'VIRIDIA S.A.S. BIC · IA aplicada a la eficiencia de recursos') +
        eslabon('¿Por qué existimos?', 'Misión', 'Reducir el consumo de energía, agua y materiales convirtiendo los datos del cliente en ahorro medible') +
        eslabon('¿Hacia dónde vamos?', 'Visión 2031', 'Referencia en el Caribe, con balance ambiental neto positivo demostrado') +
        eslabon('¿Qué resultados buscamos?', 'Objetivos', E.objetivos.map(function (o) { return o.id; }).join(' · ')) +
        eslabon('¿Qué debemos saber hacer?', 'Capacidades', 'C1 a C10, con C2 como capacidad crítica') +
      '</div>' +
    '</div></section>' +

    '<section class="seccion banda" id="critica"><div class="contenido">' +
      '<h2>La capacidad crítica: C2</h2>' +
      '<div class="dos-col"><div><p style="font-size:1.12rem">' + t(critica.definicion) + '</p><p class="nota"><strong>Objetivo que soporta:</strong> ' + t(critica.soporta) + '</p></div>' +
      '<div><h3>Qué pasaría si fallara</h3><div class="modos">' + critica.modos.map(function (m) { return '<div class="modo"><h3>' + t(m.titulo) + '</h3><p>' + t(m.texto) + '</p></div>'; }).join('') + '</div></div></div>' +
      '<p class="medida" style="margin-top:1.6rem">' + t(critica.consecuencia) + '</p>' +
      '<div class="dos-col" style="margin-top:1.6rem">' + critica.alternativas.map(function (a) {
        return '<div><h3>Por qué no ' + V.chip(a.id) + '</h3><p style="color:var(--texto-2)">' + t(a.texto) + '</p></div>';
      }).join('') + '<div><h3>Efecto acumulativo</h3><p style="color:var(--texto-2)">' + t(critica.acumulativo) + '</p></div></div>' +
      '<blockquote class="declaracion" style="margin-top:1.8rem">' + t(critica.implicacion) + '<cite>Principio que guió todo el trabajo</cite></blockquote>' +
    '</div></section>' +

    '<section class="seccion" id="motivacion"><div class="contenido">' +
      '<h2>Vista de motivación en ArchiMate</h2>' +
      '<p class="intro">La misma estrategia en ArchiMate 3.2, con tres elementos que la cadena no muestra: el impulsor, el curso de acción y los recursos difíciles de imitar. Toca cualquier elemento para ver con qué se relaciona.</p>' +
      '<div class="plancha"><div class="plancha-barra"><span class="ayuda">Cada capacidad realiza el objetivo con el que tiene relación principal. C9 solo tiene relaciones de soporte: influye en OE2.</span>' +
        '<span class="acciones" style="margin:0"><button type="button" class="btn btn-claro btn-chico" id="ver-soporte" aria-pressed="false">Mostrar relaciones de soporte</button>' + V.botonPantalla() + '</span></div>' +
        V.diagrama({ id: 'mot', clase: 'archi', ancho: MW, alto: MH, minimo: 960, nodos: M.nodos, aristas: M.aristas, zonas: [
          { x: 6, y: 4, w: 988, h: 188, clase: 'am-mot', titulo: 'Motivación' },
          { x: 6, y: 198, w: 988, h: 218, clase: 'am-est', titulo: 'Estrategia' }
        ] }) +
        V.leyendaArchi([['impulsor', 'Impulsor', 'am-mot'], ['meta', 'Meta', 'am-mot'], ['curso', 'Curso de acción', 'am-est'], ['capacidad', 'Capacidad', 'am-est'], ['recurso', 'Recurso', 'am-est']],
          ['influencia', 'agregacion', 'realizacion', 'asignacion', 'soporte']) +
      '</div>' +
      '<p class="nota" style="margin-top:1rem">Composición tomada de la vista exportada desde Archi para el documento final: <a href="img/archimate/VIRIDIA-ArchiMate-5-motivacion-estrategia.png" target="_blank" rel="noopener">ver la exportación original</a>.</p>' +
    '</div></section>';
  }

  /* Vista de motivación: nodos y relaciones vivos sobre la composición de la exportación de Archi. */
  var MW = 1000, MH = 422, OY = 116, OH = 64, CY = 256, CH = 66;
  // Relación principal de cada capacidad: x de salida, nivel del tramo horizontal y x de llegada (ruteo ortogonal sin cruces).
  var RUTA = { C3: [90, 204, 296], C5: [185, 216, 340], C2: [275, 228, 425], C4: [375, 240, 465], C9: [490], C6: [572], C7: [640], C8: [742], C1: [860], C10: [936] };
  var M = (function () {
    var nodos = [], aristas = [], ox = {}, cx = {}, mot = E.motivacion;
    function nodo(id, x, y, w, h, clase, icono, html, etiqueta) { nodos.push({ id: id, x: x, y: y, w: w, h: h, clase: clase, icono: icono, html: html, etiqueta: etiqueta }); }
    function arista(de, a, clase, puntos, extra) { var ar = { de: de, a: a, clase: clase, puntos: puntos }; Object.keys(extra || {}).forEach(function (k) { ar[k] = extra[k]; }); aristas.push(ar); }
    nodo('IMPULSOR', 20, 28, 200, 56, 'am-mot', 'impulsor', '<small>Impulsor</small><span>' + t(mot[0].texto) + '</span>', 'Impulsor: ' + mot[0].texto);
    nodo('VISION', 256, 28, 724, 56, 'am-mot', 'meta', '<small>Meta · Visión 2031</small><span>Ser la referencia del Caribe colombiano en IA para la eficiencia de recursos, con ahorro demostrado por verificación independiente</span>', 'Meta: Visión 2031');
    nodo('CURSO', 20, OY, 200, OH, 'am-est', 'curso', '<small>Curso de acción</small><span>' + t(mot[1].texto) + '</span>', 'Curso de acción: ' + mot[1].texto);
    E.objetivos.forEach(function (o, j) {
      var x = 256 + j * 147; ox[o.id] = x + 68;
      nodo(o.id, x, OY, 136, OH, 'am-mot', 'meta', '<b>' + o.id + '</b><span>' + t(o.corto) + '</span>', o.id + ': ' + o.nombre);
    });
    ['C3', 'C5', 'C2', 'C4', 'C9', 'C6', 'C7', 'C8', 'C1', 'C10'].forEach(function (id, i) {
      var c = V.porId(E.capacidades, id), x = 20 + i * 96.9; cx[id] = x + 44;
      nodo(id, x, CY, 88, CH, 'am-est' + (c.critica ? ' am-critica' : ''), 'capacidad', '<b>' + id + '</b><span>' + t(c.corto) + '</span>', id + ': ' + c.nombre);
    });
    nodo('R1', 183, 350, 150, 56, 'am-est', 'recurso', '<small>Recurso</small><span>Histórico de consumo acumulado</span>', 'Recurso: histórico de consumo acumulado');
    nodo('R2', 570, 350, 150, 56, 'am-est', 'recurso', '<small>Recurso</small><span>Equipos en comodato</span>', 'Recurso: equipos en comodato');

    arista('IMPULSOR', 'VISION', 'influencia', [[220, 56], [256, 56]], { fin: 'abierta', etiqueta: '+', fija: true });
    E.objetivos.forEach(function (o) { arista('VISION', o.id, '', [[ox[o.id], 84], [ox[o.id], OY]], { inicio: 'rombo' }); });
    arista('CURSO', 'OE1', 'realizacion', [[220, OY + 32], [256, OY + 32]], { fin: 'hueco' });
    E.capacidades.forEach(function (c) {
      var r = RUTA[c.id], abajo = OY + OH;
      Object.keys(c.oe).forEach(function (o) {
        if (c.oe[o] === 'P') arista(c.id, o, 'realizacion', r.length > 1 ? [[r[0], CY], [r[0], r[1]], [r[2], r[1]], [r[2], abajo]] : [[r[0], CY], [r[0], abajo]], { fin: 'hueco' });
        else if (c.id === 'C9' && o === 'OE2') arista(c.id, o, 'influencia', [[r[0], CY], [r[0], abajo]], { fin: 'abierta' });
        else arista(c.id, o, 'soporte', null, { vertical: true, dx0: -20, dx1: Math.max(-56, Math.min(56, (cx[c.id] - ox[o]) / 8)) });
      });
    });
    arista('R1', 'C2', '', [[cx.C2, 350], [cx.C2, CY + CH]], { inicio: 'punto', fin: 'flecha' });
    arista('R2', 'C7', '', [[cx.C7, 350], [cx.C7, CY + CH]], { inicio: 'punto', fin: 'flecha' });
    return { nodos: nodos, aristas: aristas };
  })();

  // Ficha breve de los elementos de la vista que no tienen identificador propio en el documento.
  function fichaMot(id) {
    var mot = E.motivacion, f = {
      IMPULSOR: { tipo: 'Impulsor', titulo: mot[0].texto, cuerpo: '<p>Es la presión del entorno que da sentido a la estrategia. En la vista influye de forma positiva (+) en la Visión 2031.</p>' },
      VISION: { tipo: 'Meta', titulo: 'Visión 2031', cuerpo: '<blockquote class="declaracion">' + t(E.vision) + '</blockquote>' + V.h3('Agrega los cinco objetivos') + V.chips(OES) },
      CURSO: { tipo: 'Curso de acción', titulo: 'Contrato de desempeño por ahorro compartido', cuerpo: '<p>' + t(mot[1].texto) + ' Realiza OE1.</p>' + V.chips(['OE1']), pie: '<a class="btn btn-verde btn-chico" href="#/simulador">Simular el contrato</a>' },
      R1: { tipo: 'Recurso', titulo: 'Histórico de consumo acumulado', cuerpo: '<p>' + t(mot[2].texto) + '</p><p>' + t(E.critica.acumulativo) + '</p>' + V.h3('Asignado a') + V.chips(['C2']) },
      R2: { tipo: 'Recurso', titulo: 'Equipos en comodato', cuerpo: '<p>' + t(mot[3].texto) + '</p>' + V.h3('Asignado a') + V.chips(['C7']) }
    }[id];
    V.panel.abrir({ tipo: f.tipo + ' · ArchiMate', titulo: f.titulo, cuerpo: f.cuerpo, pie: f.pie });
    enfocarMot(id);
  }
  function enfocarMot(id) {
    var diag = V.$('#mot');
    if (!diag) return;
    var v = id && V.$('.nodo[data-id="' + id + '"]', diag) ? V.vecinos(M.aristas, id) : null;
    V.enfocar(diag, v && v.ids, v && v.ks);
    V.$$('.nodo', diag).forEach(function (n) { n.classList.toggle('elegido', n.getAttribute('data-id') === id); });
  }
  function eslabon(q, titulo, texto) { return '<div class="eslabon"><span class="q">' + q + '</span><div class="b"><strong>' + titulo.toUpperCase() + '</strong><span>' + t(texto) + '</span></div></div>'; }

  // Ilumina capacidades y celdas relacionadas con un OE o una capacidad.
  function iluminar(id) {
    var mapa = V.$('#mapa-capacidades'), matriz = V.$('#matriz-cobertura');
    if (!mapa) return;
    V.$$('.objetivo').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-oe') === id)); });
    var esOE = OES.indexOf(id) >= 0, esC = /^C\d+$/.test(id || '');
    mapa.classList.toggle('foco', esOE || esC);
    matriz.classList.toggle('foco', esOE || esC);
    V.$$('.capacidad', mapa).forEach(function (b) {
      var c = V.porId(E.capacidades, b.getAttribute('data-c')), rel = esOE ? c.oe[id] : null;
      b.classList.toggle('encendida', esOE ? !!rel : b.getAttribute('data-c') === id);
      V.$('.rel', b).textContent = rel ? (rel === 'P' ? 'principal de ' + id : 'soporte de ' + id) : '';
    });
    V.$$('td, th', matriz).forEach(function (celda) {
      var on = esOE ? celda.getAttribute('data-oe') === id : esC ? celda.getAttribute('data-c') === id : false;
      celda.classList.toggle('encendida', on && (celda.tagName === 'TH' || celda.textContent !== '' || esC));
    });
    enfocarMot(esOE || esC ? id : null);
  }

  V.vistas.estrategia = {
    titulo: 'Arquitectura estratégica', render: render,
    montar: function (raiz) {
      raiz.addEventListener('click', function (e) {
        var b = e.target.closest('[data-oe], [data-c]');
        if (b && (b.tagName === 'BUTTON')) { V.detalle(b.getAttribute('data-oe') || b.getAttribute('data-c')); return; }
        var n = e.target.closest('#mot .nodo');
        if (n) {
          var id = n.getAttribute('data-id');
          if (V.indice[id]) V.detalle(id); else { iluminar(null); fichaMot(id); }
          return;
        }
        var s = e.target.closest('#ver-soporte');
        if (s) {
          var on = s.getAttribute('aria-pressed') !== 'true';
          s.setAttribute('aria-pressed', String(on));
          V.$('#mot').classList.toggle('ver-soporte', on);
        }
      });
    },
    alSeleccionar: iluminar
  };

})();
