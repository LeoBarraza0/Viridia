/* Tablero de arquitectura: inventario de las capas como un registro de colecciones,
   la cadena de evidencia y el estado de coherencia calculado en vivo desde los datos. */
(function () {
  'use strict';
  var V = window.V, D = V.datos;

  function filas() {
    var ent = D.informacion.entidades;
    return [
      { ruta: 'estrategia', nombre: 'Objetivos estratégicos', sub: 'Estrategia · Visión 2031', ids: D.estrategia.objetivos.map(function (x) { return x.id; }) },
      { ruta: 'estrategia', nombre: 'Capacidades de negocio', sub: 'Estrategia · C2 es la crítica', ids: D.estrategia.capacidades.map(function (x) { return x.id; }) },
      { ruta: 'procesos', nombre: 'Procesos en el mapa', sub: 'Negocio · 3 estratégicos, 5 misionales, 6 de apoyo', ids: D.negocio.procesos.map(function (x) { return x.id; }) },
      { ruta: 'procesos', nombre: 'Reglas de negocio', sub: 'Negocio · aplicadas en los 3 BPMN', ids: D.negocio.reglas.map(function (x) { return x.id; }) },
      { ruta: 'informacion', nombre: 'Entidades del MER', sub: 'Información · 18 tablas en el modelo relacional', ids: ent.filter(function (e) { return e.tipo === 'fuerte' || e.tipo === 'debil'; }).map(function (x) { return x.id; }), cuenta: 15 },
      { ruta: 'aplicaciones', nombre: 'Aplicaciones', sub: 'Aplicaciones · 3 críticas', ids: D.aplicaciones.apps.map(function (x) { return x.id; }) },
      { ruta: 'aplicaciones', nombre: 'Integraciones', sub: 'Aplicaciones · API, eventos o archivos', ids: D.aplicaciones.integraciones.map(function (x) { return x.id; }) },
      { ruta: 'tecnologia', nombre: 'Nodos tecnológicos', sub: 'Tecnología · planta, nube y sede', ids: D.tecnologia.nodos.map(function (x) { return x.id; }) },
      { ruta: 'tecnologia', nombre: 'Riesgos tecnológicos', sub: 'Tecnología · probabilidad × impacto', ids: D.tecnologia.riesgos.map(function (x) { return x.id; }) },
      { ruta: 'transformacion', nombre: 'Brechas', sub: 'Transformación · As-Is frente a To-Be', ids: D.transformacion.brechas.map(function (x) { return x.id; }) },
      { ruta: 'transformacion', nombre: 'Proyectos del roadmap', sub: 'Transformación · 3 fases, 2026–2031', ids: D.transformacion.proyectos.map(function (x) { return x.id; }) },
      { ruta: 'transformacion', nombre: 'Hitos', sub: 'Transformación · 8, 45 y 120 clientes', ids: D.transformacion.hitos.map(function (x) { return x.id; }) }
    ];
  }

  // Comprobaciones de coherencia calculadas en vivo (las mismas que verifica tests/verificar.js).
  function salud() {
    var caps = D.estrategia.capacidades;
    var huerfanas = caps.filter(function (c) { return !Object.keys(c.oe).length; }).length;
    var oeP = {}; caps.forEach(function (c) { Object.keys(c.oe).forEach(function (o) { if (c.oe[o] === 'P') oeP[o] = 1; }); });
    var crud = D.aplicaciones.crud, unRegistro = Object.keys(crud).filter(function (e) {
      var n = Object.keys(crud[e]).filter(function (a) { return crud[e][a].indexOf('C') >= 0; }).length;
      return n === 1 || e === 'LECTURA' || e === 'ALERTA';
    }).length;
    var conProyecto = D.transformacion.brechas.filter(function (b) { return b.proyectos.length; }).length;
    var oeTraza = {}; D.trazabilidad.forEach(function (f) { f.objetivos.forEach(function (o) { oeTraza[o] = 1; }); });
    return [
      { v: (10 - huerfanas) + '/10', t: 'capacidades trazadas a un objetivo' },
      { v: Object.keys(oeP).length + '/5', t: 'objetivos con una capacidad principal' },
      { v: unRegistro + '/18', t: 'tablas con un solo sistema que las crea (excepciones explicadas: LECTURA y ALERTA)' },
      { v: conProyecto + '/14', t: 'brechas con un proyecto que las cierra' },
      { v: Object.keys(oeTraza).length + '/5', t: 'objetivos alcanzados desde una actividad del proceso' }
    ];
  }

  var CADENA = [
    ['T1', 'Medidor', 'Mide cada 15 min'],
    ['A1', 'Pasarela', 'Guarda 72 h si cae la red'],
    ['A2', 'Ingesta', 'Valida y custodia'],
    ['A3', 'Motor', 'Consumo esperado'],
    ['A4', 'MRV', 'Calcula el ahorro'],
    ['A7', 'Facturación', 'Solo si ahorro > 0 (RN1)'],
    ['FACTURA', 'Factura', 'Trazable a su línea base']
  ];

  function render() {
    return V.cabecera({
      titulo: 'Tablero de arquitectura', semilla: 21,
      pregunta: 'El inventario completo de la arquitectura de VIRIDIA, en un vistazo.',
      entrada: 'Cada identificador abre su ficha. Los mismos identificadores se usan en el documento final, así que lo que se ve aquí se puede buscar allá.',
      lamina: 'aplicaciones', alt: 'Grabado de una red de raíces y micelio que conecta diez plántulas.',
      sumario: [['inventario', 'Inventario'], ['cadena', 'Cadena de evidencia'], ['coherencia', 'Coherencia']]
    }) +
    '<section class="seccion" id="inventario"><div class="contenido">' +
      '<h2>Inventario de la arquitectura</h2>' +
      '<p class="intro">Doce colecciones, de la estrategia a la transformación. Toca un identificador para ver su ficha o el nombre de la colección para ir a su capa.</p>' +
      '<div class="registro">' + filas().map(function (f) {
        return '<div class="registro-fila revelar"><div><h3><a href="#/' + f.ruta + '">' + f.nombre + '</a></h3><span class="sub">' + f.sub + '</span></div>' +
          V.chips(f.ids) + '<span class="cuenta" data-contar="' + (f.cuenta || f.ids.length) + '">' + (f.cuenta || f.ids.length) + '</span></div>';
      }).join('') + '</div>' +
    '</div></section>' +
    '<section class="seccion banda" id="cadena"><div class="contenido">' +
      '<h2>El hilo que une todas las capas</h2>' +
      '<p class="intro">Una lectura se captura una sola vez en planta y viaja hasta la factura. Si en algún punto falla la evidencia, no se cobra. Toca «Recorrer» para seguirla.</p>' +
      '<div class="cadena" id="cadena-pasos"><span class="savia"></span>' + CADENA.map(function (c) {
        return '<div class="cadena-paso"><div class="punto"></div><b>' + (V.indice[c[0]] ? V.chip(c[0]) : '<span class="chip" data-t="ENT">' + c[0] + '</span>') + '</b><strong>' + c[1] + '</strong><br>' + V.t(c[2]) + '</div>';
      }).join('') + '</div>' +
      '<div class="acciones"><button class="btn btn-verde" type="button" id="recorrer">' + V.icono('reproducir') + 'Recorrer la cadena</button>' +
      '<a class="btn btn-claro" href="#/aplicaciones?recorrido=1">Verla sobre la vista de aplicaciones</a></div>' +
    '</div></section>' +
    '<section class="seccion" id="coherencia"><div class="contenido">' +
      '<h2>Coherencia entre capas</h2>' +
      '<p class="intro">Estas cifras se calculan en vivo desde el archivo de datos del activo, el mismo que revisa la prueba automática antes de cada publicación.</p>' +
      '<div class="salud revelar">' + salud().map(function (s) { return '<div><strong>' + s.v + '</strong><span>' + s.t + '</span></div>'; }).join('') + '</div>' +
      '<div class="acciones"><a class="btn btn-verde" href="#/trazabilidad">Explorar la trazabilidad ' + V.icono('flecha') + '</a></div>' +
    '</div></section>';
  }

  function recorrer() {
    var pasos = V.$$('#cadena-pasos .cadena-paso'), savia = V.$('#cadena-pasos .savia');
    pasos.forEach(function (p) { p.classList.remove('vivo'); });
    savia.style.width = '0';
    pasos.forEach(function (p, k) {
      setTimeout(function () {
        p.classList.add('vivo');
        savia.style.width = (86 * k / (pasos.length - 1)) + '%';
      }, V.movimiento() ? 140 + k * 420 : 0);
    });
  }

  V.vistas.tablero = {
    titulo: 'Tablero de arquitectura', render: render,
    montar: function (raiz) { V.$('#recorrer', raiz).addEventListener('click', recorrer); }
  };
})();
