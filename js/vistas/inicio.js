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
          '<div class="portada-lamina"><img class="lamina-entra" src="img/laminas/portada.webp" width="1391" height="931" alt="Grabado de una hoja de uva de playa cuyas nervaduras se convierten en una red de nodos, sobre el perfil de una planta agroindustrial del Caribe." fetchpriority="high"></div>' +
        '</div>' +
        '<div class="portada-cinta"><ol>' +
          '<li><span><strong>Mide</strong> en la planta del cliente</span></li>' +
          '<li><span><strong>Calcula</strong> con IA cuánto debería consumir</span></li>' +
          '<li><span><strong>Indica</strong> qué cambiar en la operación</span></li>' +
          '<li><span><strong>Comprueba</strong> el ahorro contra la línea base</span></li>' +
          '<li><span><strong>Cobra</strong> solo un porcentaje de lo ahorrado</span></li>' +
        '</ol></div>' +
      '</section>' +

      '<section class="seccion" id="problema"><div class="contenido">' +
        '<h2>Pagan cada mes por un consumo que no pueden explicar</h2>' +
        '<p class="intro">' + t(I.problema) + '</p>' +
        '<div class="dos-col revelar">' + I.consecuencias.map(function (c) {
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
      '</div></section>' +

      '<section class="seccion" id="recorrido"><div class="contenido">' +
        '<h2>Recorre la arquitectura</h2>' +
        '<p class="intro">' + t(D.meta.pregunta) + ' Cada capa responde una parte, con los mismos identificadores del documento final.</p>' +
        '<div class="indice-capas revelar">' +
          capa('estrategia', 'Estrategia', 'Por qué existe la empresa, hacia dónde va y qué debe saber hacer.', 'OE1–OE5 · C1–C10') +
          capa('procesos', 'Procesos', 'Qué trabajo hace, quién lo hace y bajo qué reglas.', 'E · M · S · RN1–RN8') +
          capa('informacion', 'Información', 'Qué datos necesita el proceso y cómo protegen la regla RN1.', '15 entidades · 18 tablas') +
          capa('aplicaciones', 'Aplicaciones', 'Qué sistemas apoyan el trabajo y cómo se integran.', 'A1–A10 · I1–I16') +
          capa('tecnologia', 'Tecnología', 'Dónde corre todo y cómo se protege el histórico.', 'T1–T16 · R1–R8') +
          capa('transformacion', 'Transformación', 'Cómo pasa del arranque actual al estado objetivo.', 'B1–B14 · P1–P12 · H1–H6') +
        '</div>' +
      '</div></section>';
  }
  function fila(concepto, op, res) {
    return '<div class="mayor-fila"><span>' + t(concepto) + '</span><span class="op">' + t(op) + '</span><span class="res">' + t(res) + '</span></div>';
  }
  function capa(ruta, nombre, texto, ids) {
    return '<a href="#/' + ruta + '"><strong>' + nombre + '</strong><span>' + texto + '</span><code>' + ids + '</code></a>';
  }

  V.vistas.inicio = { titulo: 'Nuestra empresa', render: render };
})();
