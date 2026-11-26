/* Inicio · Nuestra empresa: la capa de identidad (Sección 1 del documento). */
(function () {
  'use strict';
  var V = window.V, D = V.datos, I = D.identidad, t = V.t;
  var FUENTES = { iea2025: 'IEA (2025)', proure2022: 'UPME, PROURE 2022–2030', caribe2025: 'El Tiempo (2025); MinEnergía', bogota2025: 'Alcaldía de Bogotá (2025); Semana' };

  var LOGO = '<svg class="logo-grande logo-anima" viewBox="0 0 100 100" fill="none" aria-hidden="true">' +
    '<path class="anillo" d="M78.8 27.5 A36.5 36.5 0 1 1 42.4 14.3" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>' +
    '<polygon points="49.1,12.4 43.2,17.1 41.6,11.5" fill="#FFFFFF"/>' +
    '<g class="hoja"><path d="M50 69.5 C75.5 62.5 73 35.5 50 26.8 C27 35.5 24.5 62.5 50 69.5 Z" fill="#7FBF4D"/>' +
    '<path d="M50 65.8 V31.5 M50 41.5 L39.3 50.5 M50 48.5 L61.3 56.5 M50 56 L41.3 62" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round"/></g>' +
    '<g class="nodos" fill="#FFFFFF" stroke="#7FBF4D" stroke-width="1.3"><circle cx="50" cy="31.5" r="2.6"/><circle cx="39.3" cy="50.5" r="2.6"/><circle cx="61.3" cy="56.5" r="2.6"/><circle cx="41.3" cy="62" r="2.6"/><circle cx="50" cy="65.8" r="2.6"/></g></svg>';

  function render() {
    var ej = I.calculo.ejemplo;
    return '' +
      '<section class="portada" aria-labelledby="titulo-portada">' +
        '<svg class="topo" aria-hidden="true" data-semilla="11" data-niveles="18" data-dibuja style="opacity:.32"></svg>' +
        '<div class="portada-cuerpo">' +
          '<div>' + LOGO +
            '<h1 id="titulo-portada" class="palabra">VIRIDIA</h1>' +
            '<p class="razon">SOCIEDAD POR ACCIONES SIMPLIFICADA · BIC</p>' +
            '<p class="eslogan">«' + t(I.eslogan) + '»</p>' +
            '<p class="que-hace">' + t(I.queHace) + '</p>' +
            '<div class="acciones"><a class="btn btn-lima" href="#/tablero">Recorrer la arquitectura ' + V.icono('flecha') + '</a>' +
            '<a class="btn btn-borde" href="#/simulador">Simular un cliente</a></div>' +
          '</div>' +
          '<div class="portada-lamina"><img class="lamina-entra" src="img/laminas/portada.webp" width="1391" height="931" alt="Grabado de una hoja de uva de playa cuyas nervaduras se convierten en una red de nodos, sobre el perfil de una planta agroindustrial del Caribe." fetchpriority="high">' +
            '<div class="portada-cifras">' +
              cifra('<span data-contar="' + ej.pct + '" data-dec="1">' + V.fmt(ej.pct, 1) + '</span> %', 'menos consumo en el mes') +
              cifra('$ <span data-contar="' + (ej.factura / 1e6).toFixed(1) + '" data-dec="1">' + V.fmt(ej.factura / 1e6, 1) + '</span> M', 'facturados solo por ahorro verificado') +
              cifra('<span data-contar="' + ej.tco2e + '" data-dec="1">' + V.fmt(ej.tco2e, 1) + '</span> t', 'de CO<sub>2</sub>e evitadas') +
            '</div><p class="portada-cifras-nota">Un mes de una planta de alimentos: el ejemplo de cálculo del documento.</p></div>' +
        '</div>' +
        '<div class="portada-cinta"><ol>' +
          '<li><span><strong>Mide</strong> en la planta del cliente</span></li>' +
          '<li><span><strong>Calcula</strong> con IA cuánto debería consumir</span></li>' +
          '<li><span><strong>Indica</strong> qué cambiar en la operación</span></li>' +
          '<li><span><strong>Comprueba</strong> el ahorro contra la línea base</span></li>' +
          '<li><span><strong>Cobra</strong> solo un porcentaje de lo ahorrado</span></li>' +
        '</ol></div>' +
      '</section>' +

      '<section class="seccion capas-sec" id="recorrido"><div class="contenido capas-rejilla">' +
        '<div><h2>Cinco capas, un solo hilo</h2>' +
          '<p class="intro">' + t(D.meta.pregunta) + ' Cada capa responde una parte, con los mismos identificadores del documento final, y ninguna pieza existe sin un objetivo que la justifique. Toca una lámina para abrir su capa.</p>' +
          '<p>Encima de las cinco capas, la transformación lleva a VIRIDIA del arranque de 2026 al estado objetivo de 2031.</p>' +
          '<div class="acciones"><a class="btn btn-lima" href="#/trazabilidad">Seguir el hilo ' + V.icono('flecha') + '</a><a class="btn btn-borde" href="#/transformacion">Ver la transformación</a></div></div>' +
        '<div class="pila-caja revelar">' + pila() + '</div>' +
      '</div></section>' +

      '<section class="seccion" id="problema"><div class="contenido">' +
        '<h2>Pagan cada mes por un consumo que no pueden explicar</h2>' +
        '<p class="intro">' + t(I.problema) + '</p>' +
        '<div class="tres-col revelar">' + I.consecuencias.map(function (c) {
          return '<div><h3>' + t(c.tipo) + '</h3><p class="medida" style="color:var(--texto-2);font-size:.97rem">' + t(c.texto) + '</p></div>';
        }).join('') + '</div>' +
        '<h3 style="margin:2.4rem 0 .9rem">Cuatro datos de fuentes primarias</h3>' +
        '<div class="campo-datos revelar">' + I.datos.map(function (d) {
          return '<article class="dato"><p class="cifra">' + t(d.cifra) + '</p>' +
            '<h3>' + t(d.titulo) + '</h3><p>' + t(d.texto) + '</p><p class="lectura">' + t(d.lectura) + '</p><span class="cita-fuente">Fuente: ' + FUENTES[d.fuente] + '</span></article>';
        }).join('') + '</div>' +
      '</div></section>' +

      '<section class="seccion banda" id="modelo"><div class="contenido">' +
        '<h2>Sin ahorro verificado no hay factura</h2>' +
        '<p class="intro">' + t(I.calculo.intro) + ' Así se liquida un mes de una planta de alimentos (ejemplo ilustrativo del documento):</p>' +
        '<div class="sim-rejilla">' +
          '<div class="mayor">' +
            fila('Consumo esperado (línea base ajustada)', '120.000 + 0,45 × 400.000 + 900 × 300', V.fmt(ej.esperado) + ' kWh') +
            fila('Consumo real medido', 'Medidores en planta, mes de reporte', V.fmt(ej.real) + ' kWh') +
            fila('Ahorro del mes', V.fmt(ej.esperado) + ' − ' + V.fmt(ej.real), V.fmt(ej.ahorro) + ' kWh') +
            fila('Porcentaje de reducción', V.fmt(ej.ahorro) + ' / ' + V.fmt(ej.esperado), V.fmt(ej.pct, 1) + ' %') +
            fila('Ahorro en pesos', V.fmt(ej.ahorro) + ' kWh × ' + ej.tarifa + ' $/kWh (Air-e)', '≈ ' + V.millones(ej.pesos)) +
            fila('Lo que conserva el cliente', '60 % del ahorro en pesos', '≈ ' + V.millones(ej.cliente)) +
            fila('Emisiones evitadas', '75 MWh × 0,220 tCO2e/MWh (UPME, SIN 2024)', '≈ ' + V.fmt(ej.tco2e, 1) + ' tCO2e') +
            '<div class="mayor-fila total"><span><strong>Factura de VIRIDIA</strong></span><span class="op">40 %<sup class="p" title="Propuesta del equipo">P</sup> del ahorro en pesos</span><span class="res">≈ ' + V.millones(ej.factura) + '</span></div>' +
          '</div>' +
          '<div>' + I.niveles.map(function (n) {
            return '<div style="border-top:1px solid var(--linea);padding:.9rem 0"><h3>' + t(n.nivel) + ' <small style="font-weight:400;color:var(--texto-2)">' + t(n.pregunta) + '</small></h3><p style="margin:0;font-size:.96rem">' + t(n.respuesta) + '</p></div>';
          }).join('') +
          '<p class="nota">' + t(I.calculo.nota) + '</p>' +
          '<div class="acciones"><a class="btn btn-verde" href="#/simulador">Probar el cálculo en el simulador ' + V.icono('flecha') + '</a></div></div>' +
        '</div>' +
      '</div></section>' +

      '<section class="seccion" id="propuesta"><div class="contenido">' +
        '<h2>Propuesta de valor</h2>' +
        '<blockquote class="declaracion">' + t(I.propuesta) + '<cite>VIRIDIA S.A.S. BIC</cite></blockquote>' +
        '<ol class="dos-col revelar" style="list-style:none;padding:0;margin:2rem 0 0">' + I.diferenciadores.map(function (d, k) {
          return '<li style="border-top:2px solid var(--verde);padding-top:.8rem"><h3>' + t(d.nombre) + '</h3><p style="font-size:.96rem;color:var(--texto-2);margin:0">' + t(d.texto) + '</p></li>';
        }).join('') + '</ol>' +
        '<p class="nota" style="margin-top:1.8rem"><strong>Compromiso comercial de ahorro.</strong> ' + t(I.compromiso) + '</p>' +
      '</div></section>' +

      '<section class="seccion banda" id="publico"><div class="contenido">' +
        '<h2>Para quién trabaja</h2>' +
        '<p class="intro">' + t(I.clientes) + '</p>' +
        '<div class="tabla-envoltura"><table class="tabla"><thead><tr><th>Segmento</th><th>Perfil</th><th>Por qué compra</th></tr></thead><tbody>' +
          I.segmentos.map(function (s) { return '<tr><td><strong>' + t(s.segmento) + '</strong></td><td>' + t(s.perfil) + '</td><td>' + t(s.porque) + '</td></tr>'; }).join('') +
        '</tbody></table></div>' +
        '<p class="nota" style="margin-top:1.2rem">' + t(I.interlocutor) + '</p>' +
      '</div></section>' +

      '<section class="seccion" id="que-no-es"><div class="contenido dos-col">' +
        '<div><h2>Qué no es VIRIDIA</h2><p class="intro">' + t(I.competencia) + '</p></div>' +
        '<ul class="revelar" style="list-style:none;padding:0;margin:0">' + I.queNoEs.map(function (q) {
          return '<li style="border-top:1px solid var(--linea);padding:.85rem 0"><strong>' + t(q.titulo) + '.</strong> <span style="color:var(--texto-2)">' + t(q.texto) + '</span></li>';
        }).join('') + '</ul>' +
      '</div></section>' +

      '<section class="seccion banda" id="identidad"><div class="contenido dos-col">' +
        '<div><h2>Nombre e identidad</h2><p>' + t(I.origenNombre) + '</p><p>' + t(I.logo) + '</p></div>' +
        '<div><h3>Figura jurídica</h3><p style="color:var(--texto-2)">' + t(I.figura) + '</p><h3>Sector económico</h3><p style="color:var(--texto-2)">' + t(I.sector) + '</p><h3>Alcance geográfico</h3><p style="color:var(--texto-2)">' + t(I.alcance) + '</p></div>' +
      '</div></section>';
  }
  function fila(concepto, op, res) {
    return '<div class="mayor-fila"><span>' + t(concepto) + '</span><span class="op">' + t(op) + '</span><span class="res">' + t(res) + '</span></div>';
  }
  function cifra(valor, texto) { return '<div><b>' + valor + '</b><small>' + texto + '</small></div>'; }

  // Las cinco capas como láminas isométricas apiladas; el hilo de la trazabilidad las atraviesa.
  // Al entrar en pantalla la pila se abre (cada lámina parte de --junta y vuelve a su sitio).
  function pila() {
    var E = D.estrategia, N = D.negocio, AP = D.aplicaciones, TE = D.tecnologia;
    var CAPAS = [
      ['estrategia', 'Estrategia', E.objetivos.length + ' objetivos · ' + E.capacidades.length + ' capacidades', 'Por qué existe y hacia dónde va'],
      ['procesos', 'Negocio', N.procesos.length + ' procesos · ' + N.reglas.length + ' reglas', 'Qué trabajo hace y bajo qué reglas'],
      ['informacion', 'Información', '15 entidades · 18 tablas', 'Qué datos necesita el proceso'],
      ['aplicaciones', 'Aplicaciones', AP.apps.length + ' aplicaciones · ' + AP.integraciones.length + ' integraciones', 'Qué sistemas lo apoyan'],
      ['tecnologia', 'Tecnología', TE.nodos.length + ' nodos · ' + TE.riesgos.length + ' riesgos', 'Dónde corre todo']
    ];
    var cx = 190, hw = 160, hh = 80, g = 10, y0 = 92, paso = 94, medio = y0 + paso * 2;
    var s = '<svg class="pila" viewBox="0 0 650 560" role="group" aria-label="Las cinco capas de la arquitectura">' +
      '<line class="hilo" x1="' + cx + '" y1="' + y0 + '" x2="' + cx + '" y2="' + (y0 + paso * 4) + '"/><circle class="savia" cx="' + cx + '" cy="' + y0 + '" r="5"/>';
    for (var k = CAPAS.length - 1; k >= 0; k--) { // de abajo hacia arriba: la lámina de encima tapa a la de abajo
      var c = CAPAS[k], cy = y0 + paso * k;
      s += '<a href="#/' + c[0] + '" class="placa" style="--k:' + k + ';--junta:' + Math.round((medio - cy) * 0.84) + 'px" aria-label="' + c[1] + ': ' + c[2] + '"><g class="cuerpo">' +
        '<polygon class="lado-i" points="' + (cx - hw) + ',' + cy + ' ' + cx + ',' + (cy + hh) + ' ' + cx + ',' + (cy + hh + g) + ' ' + (cx - hw) + ',' + (cy + g) + '"/>' +
        '<polygon class="lado-d" points="' + cx + ',' + (cy + hh) + ' ' + (cx + hw) + ',' + cy + ' ' + (cx + hw) + ',' + (cy + g) + ' ' + cx + ',' + (cy + hh + g) + '"/>' +
        '<polygon class="cara" points="' + cx + ',' + (cy - hh) + ' ' + (cx + hw) + ',' + cy + ' ' + cx + ',' + (cy + hh) + ' ' + (cx - hw) + ',' + cy + '"/>' +
        // El rótulo corre paralelo al borde delantero izquierdo: es la parte de la cara que la lámina de encima no tapa.
        '<text class="rotulo-iso" text-anchor="middle" transform="matrix(0.894 0.447 -0.894 0.447 ' + (cx - 60) + ' ' + (cy + 30) + ')" y="5">' + c[1].toUpperCase() + '</text>' +
        '<line class="guia" x1="' + (cx + hw + 6) + '" y1="' + cy + '" x2="' + (cx + hw + 30) + '" y2="' + cy + '"/>' +
        '<text class="etq-nombre" x="' + (cx + hw + 40) + '" y="' + (cy - 6) + '">' + c[1] + '</text>' +
        '<text class="etq-cuenta" x="' + (cx + hw + 40) + '" y="' + (cy + 13) + '">' + c[2] + '</text>' +
        '<text class="etq-pregunta" x="' + (cx + hw + 40) + '" y="' + (cy + 31) + '">' + c[3] + '</text>' +
      '</g></a>';
    }
    return s + '</svg>';
  }

  V.vistas.inicio = { titulo: 'Nuestra empresa', render: render };
})();
