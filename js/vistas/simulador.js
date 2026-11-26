/* Simulador: recorre con un cliente el camino del BPMN.
   1 Prefactibilidad con las facturas (¿hay potencial?) → 2 Línea base (¿cumple ASHRAE 14?)
   → 3 Contrato (RN2) → 4 Cierre mensual (RN3, RN1) y factura trazable a su línea base.
   Toda la matemática vive en js/motor.js (probada por tests/verificar.js). */
(function () {
  'use strict';
  var V = window.V, M = window.MotorVIRIDIA, D = V.datos, t = V.t;
  var CLIENTES = window.VIRIDIA_CLIENTES;
  var FACTOR = D.identidad.calculo.ejemplo.factor;
  var S = null, temporizador = null;
  var P_SUP = '<sup class="p" title="Propuesta del equipo">P</sup>';

  function nuevoEstado(cliente) {
    var pre = M.prefactibilidad(cliente, FACTOR);
    var sugerido = pre.comprometibleMax ? Math.max(8, Math.min(pre.comprometibleMax, Math.round(pre.pct * 0.85))) : 8;
    return {
      cliente: cliente, paso: 1, pre: pre, vars: cliente.modelo.slice(), ajuste: null, contratoListo: false,
      leidas: false, facturaVista: cliente.kwh.length - 1,
      contrato: { comprometido: sugerido, participacion: 40, duracion: 4 },
      mes: Object.assign({ ajuste: 0, recuperado: false }, cliente.mesReporte)
    };
  }
  function fmtCoef(x) {
    var s = Number(Number(x).toPrecision(4));
    if (s === 0) return '0';
    var dec = Math.max(0, Math.min(4, 3 - Math.floor(Math.log10(Math.abs(s)))));
    var txt = V.fmt(s, dec);
    return dec > 0 ? txt.replace(/0+$/, '').replace(/,$/, '') : txt;
  }
  function variable(id) { return S.cliente.variables.filter(function (v) { return v.id === id; })[0]; }

  /* ---------- Gráficas (SVG propio, sin librerías) ---------- */
  function escalaY(max, H, m) { return function (v) { return m.t + (H - m.t - m.b) * (1 - v / max); }; }
  function ticks(max) {
    var paso = Math.pow(10, Math.floor(Math.log10(max / 4))), opciones = [1, 2, 2.5, 5, 10];
    for (var i = 0; i < opciones.length; i++) if (max / (paso * opciones[i]) <= 5) { paso *= opciones[i]; break; }
    var r = []; for (var v = 0; v <= max; v += paso) r.push(v); return r;
  }
  function barraRedondeada(x, y, w, base) {
    var r = Math.min(4, w / 2, base - y);
    return 'M' + x + ' ' + base + 'V' + (y + r) + 'Q' + x + ' ' + y + ' ' + (x + r) + ' ' + y + 'H' + (x + w - r) + 'Q' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + r) + 'V' + base + 'Z';
  }
  function etiquetaMil(v) { return v >= 1000 ? V.fmt(v / 1000) + ' mil' : V.fmt(v); }
  function graficaFacturas(c, p) {
    var W = 660, H = 290, m = { l: 62, r: 10, t: 14, b: 30 }, n = c.kwh.length;
    var max = Math.max.apply(null, c.kwh.concat(p.ajuste.pred)) * 1.1, y = escalaY(max, H, m), base = H - m.b;
    var bw = (W - m.l - m.r) / n, cx = function (i) { return m.l + bw * i + bw / 2; };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Consumo facturado por mes frente al consumo esperado por producción y clima">';
    s += '<g class="eje">' + ticks(max).map(function (v) { return '<line x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text x="' + (m.l - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + etiquetaMil(v) + '</text>'; }).join('') +
      c.meses.map(function (mes, i) { return '<text x="' + cx(i) + '" y="' + (H - 10) + '" text-anchor="middle">' + V.esc(mes) + '</text>'; }).join('') + '</g>';
    s += c.kwh.map(function (v, i) { return '<path class="barra-kwh' + (p.mejores.indexOf(i) >= 0 ? ' mejor' : '') + '" d="' + barraRedondeada(cx(i) - bw / 2 + 4, y(v), bw - 8, base) + '"/>'; }).join('');
    var linea = function (vals) { return vals.map(function (v, i) { return (i ? 'L' : 'M') + cx(i).toFixed(1) + ' ' + y(v).toFixed(1); }).join(''); };
    s += '<path class="linea-modelo dibuja" style="--l:1400" d="' + linea(p.ajuste.pred) + '"/>';
    s += '<path class="linea-objetivo" d="' + linea(p.objetivo) + '"/>';
    s += c.kwh.map(function (v, i) { return '<rect class="golpe" data-i="' + i + '" x="' + (cx(i) - bw / 2) + '" y="' + m.t + '" width="' + bw + '" height="' + (base - m.t) + '" fill="transparent"/>'; }).join('');
    return s + '</svg>';
  }
  function graficaAjuste(c, aj) {
    var W = 660, H = 250, m = { l: 62, r: 10, t: 14, b: 30 }, n = c.kwh.length;
    var vals = c.kwh.concat(aj.pred), min = Math.min.apply(null, vals) * 0.9, max = Math.max.apply(null, vals) * 1.05;
    var y = function (v) { return m.t + (H - m.t - m.b) * (1 - (v - min) / (max - min)); };
    var paso = (W - m.l - m.r) / (n - 1), x = function (i) { return m.l + paso * i; };
    var tk = ticks(max - min).map(function (v) { return Math.round((min + v) / 1000) * 1000; }).filter(function (v) { return v >= min && v <= max; });
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Consumo real frente a la línea base ajustada, mes a mes">';
    s += '<g class="eje">' + tk.map(function (v) { return '<line x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text x="' + (m.l - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + etiquetaMil(v) + '</text>'; }).join('') +
      c.meses.map(function (mes, i) { return '<text x="' + x(i) + '" y="' + (H - 10) + '" text-anchor="middle">' + V.esc(mes) + '</text>'; }).join('') + '</g>';
    var linea = function (arr) { return arr.map(function (v, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); }).join(''); };
    s += '<path class="linea-base dibuja" style="--l:1400" d="' + linea(aj.pred) + '"/>';
    s += '<path class="linea-real" d="' + linea(c.kwh) + '"/>';
    s += c.kwh.map(function (v, i) { return '<circle class="punto-real" cx="' + x(i) + '" cy="' + y(v) + '" r="4.5"/>'; }).join('');
    s += c.kwh.map(function (v, i) { return '<rect class="golpe" data-i="' + i + '" x="' + (x(i) - paso / 2) + '" y="' + m.t + '" width="' + paso + '" height="' + (H - m.t - m.b) + '" fill="transparent"/>'; }).join('');
    return s + '</svg>';
  }
  // Tooltip por mes sobre las gráficas.
  function activarTip(contenedor, texto) {
    var tip = document.createElement('div');
    tip.className = 'tip'; tip.hidden = true; contenedor.appendChild(tip);
    contenedor.addEventListener('pointermove', function (e) {
      var r = e.target.closest && e.target.closest('rect.golpe');
      if (!r) { tip.hidden = true; return; }
      tip.innerHTML = texto(Number(r.getAttribute('data-i')));
      tip.hidden = false;
      var caja = contenedor.getBoundingClientRect();
      var x = e.clientX - caja.left, yy = e.clientY - caja.top;
      tip.style.left = Math.min(caja.width - tip.offsetWidth - 6, Math.max(6, x + 14)) + 'px';
      tip.style.top = Math.max(6, yy - tip.offsetHeight - 10) + 'px';
    });
    contenedor.addEventListener('pointerleave', function () { tip.hidden = true; });
  }

  /* ---------- Facturas ficticias (las genera MotorVIRIDIA.factura) ---------- */
  var MES_CORTO = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function fechas(etq) {
    var p = etq.split(' '), m = MES_CORTO.indexOf(p[0]), a = 2000 + Number(p[1]), sig = (m + 1) % 12, aSig = m === 11 ? a + 1 : a;
    return { periodo: '1 – ' + new Date(a, m + 1, 0).getDate() + ' ' + p[0] + ' ' + a, expide: '3 ' + MES_CORTO[sig] + ' ' + aSig, pago: '15 ' + MES_CORTO[sig] + ' ' + aSig };
  }
  function codigoBarras(txt) {
    var x = 0, s = '';
    for (var k = 0; x < 148; k++) {
      var w = (txt.charCodeAt(k % txt.length) + k) % 3 + 1;
      if (k % 2 === 0) s += '<rect x="' + x + '" y="0" width="' + w + '" height="26"/>';
      x += w + 1;
    }
    return '<svg viewBox="0 0 150 26" aria-hidden="true" fill="#24313A">' + s + '</svg>';
  }
  function celdaFl(etq, valor) { return '<div><span>' + etq + '</span><strong>' + valor + '</strong></div>'; }
  function facturaHTML(c, i, leida) {
    var f = M.factura(c, i), d = c.factura, fe = fechas(c.meses[i]);
    var desde = Math.max(0, i - 5), hist = c.kwh.slice(desde, i + 1), maxH = Math.max.apply(null, hist);
    return '<article class="factura-luz' + (leida ? ' leida' : '') + '" aria-label="Factura ficticia de energía de ' + V.esc(c.meses[i]) + '">' +
      '<header class="fl-cab"><div class="fl-marca"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor"/></svg><div><strong>Energía Demo del Caribe</strong><small>S.A. E.S.P. · comercializadora ficticia</small></div></div>' +
        '<div class="fl-num">Factura de servicios públicos<strong>No. ' + f.numero + '</strong></div></header>' +
      '<div class="fl-cuerpo">' +
        '<div class="fl-bloque">' + celdaFl('Suscriptor', V.esc(c.nombre)) + celdaFl('Cuenta', d.cuenta) + celdaFl('Uso', d.uso) +
          celdaFl('Periodo facturado', '<span class="campo-leer">' + fe.periodo + '</span>') + celdaFl('Expedición · pago oportuno', fe.expide + ' · ' + fe.pago) + celdaFl('Medidor', d.medidor + ' · factor 1') + '</div>' +
        '<table class="fl-tabla"><thead><tr><th>Lecturas</th><th class="n">Anterior</th><th class="n">Actual</th><th class="n">Consumo</th></tr></thead><tbody>' +
          '<tr><td>Energía activa (kWh)</td><td class="n">' + V.fmt(f.anteriorActiva) + '</td><td class="n">' + V.fmt(f.actualActiva) + '</td><td class="n"><strong class="campo-leer">' + V.fmt(f.kwh) + '</strong></td></tr>' +
          '<tr><td>Energía reactiva (kVArh)</td><td class="n">' + V.fmt(f.anteriorReactiva) + '</td><td class="n">' + V.fmt(f.actualReactiva) + '</td><td class="n">' + V.fmt(f.kvarh) + '</td></tr>' +
        '</tbody></table>' +
        '<div class="fl-cu"><strong>Costo unitario (CU) <span class="campo-leer">' + V.fmt(f.cu) + '</span> $/kWh =</strong>' + f.partes.map(function (p) { return '<span>' + p[0] + ' ' + V.fmt(p[1]) + '</span>'; }).join('<span>+</span>') + '</div>' +
        '<table class="fl-tabla"><thead><tr><th>Concepto</th><th class="n">Valor</th></tr></thead><tbody>' +
          '<tr><td>Energía activa · ' + V.fmt(f.kwh) + ' kWh × $ ' + V.fmt(f.cu) + '</td><td class="n"><span class="campo-leer">' + V.pesos(f.valor) + '</span></td></tr>' +
          '<tr><td>Contribución de solidaridad (20 %)</td><td class="n">' + (d.contribucion ? V.pesos(f.contribucion) : 'Exenta · uso industrial') + '</td></tr>' +
          '<tr><td>Reactiva sobre el 50 % de la activa · FP ' + V.fmt(f.fp, 2) + '</td><td class="n">' + V.pesos(f.cargoReactiva) + '</td></tr>' +
          '<tr class="fl-total"><td>Total a pagar</td><td class="n">' + V.pesos(f.total) + '</td></tr>' +
        '</tbody></table>' +
        '<div><span class="fl-lbl">Consumo de los últimos meses (kWh)</span><div class="fl-hist">' + hist.map(function (v, k) {
          return '<span' + (k === hist.length - 1 ? ' class="actual"' : '') + ' style="height:' + (100 * v / maxH).toFixed(1) + '%" title="' + V.esc(c.meses[desde + k]) + ': ' + V.fmt(v) + ' kWh"></span>';
        }).join('') + '</div></div>' +
      '</div>' +
      '<footer class="fl-pie"><span>Documento ficticio generado por el simulador con datos supuestos. La comercializadora no existe.</span>' + codigoBarras(f.numero) + '</footer>' +
      '<span class="fl-sello" aria-hidden="true">ILUSTRATIVA</span></article>';
  }
  function filaExtraida(i, leida) {
    var c = S.cliente, f = leida ? M.factura(c, i) : null;
    return '<tr data-fila="' + i + '"><td>' + V.esc(c.meses[i]) + '</td>' + (leida
      ? '<td class="num">' + V.fmt(f.kwh) + '</td><td class="num">' + V.fmt(f.cu) + '</td><td class="num">' + V.millones(f.valor) + '</td><td class="num">' + V.fmt(f.fp, 2) + '</td>'
      : '<td class="vacio">—</td><td class="vacio">—</td><td class="vacio">—</td><td class="vacio">—</td>') + '</tr>';
  }
  // Bandeja: el lote de facturas, el visor y la tabla de lo extraído. Los clientes de un CSV no tienen facturas.
  function bandeja(leidas) {
    var c = S.cliente, n = c.kwh.length;
    return '<div class="bandeja"><div>' +
      '<h3>Las ' + n + ' facturas del periodo de referencia</h3>' +
      '<p class="nota" style="margin:.2rem 0 .9rem">Facturas ficticias: una comercializadora inventada con los consumos supuestos del cliente. Toca una para verla.</p>' +
      '<div class="lote" role="group" aria-label="Facturas del cliente">' + c.meses.map(function (m, i) {
        return '<button type="button" data-factura="' + i + '" style="--i:' + i + '"' + (leidas ? ' class="leida"' : '') + ' aria-current="' + (i === S.facturaVista) + '" aria-label="Factura de ' + V.esc(m) + '"><i></i><i></i><i></i><b>' + V.esc(m) + '</b><small>' + etiquetaMil(c.kwh[i]) + ' kWh</small></button>';
      }).join('') + '</div>' +
      '<div class="acciones" style="margin-top:1rem">' + (leidas ? '' : '<button type="button" class="btn btn-verde" id="leer-facturas">' + V.icono('lupa') + 'Leer y analizar las facturas</button>') +
        '<button type="button" class="btn btn-claro" id="imprimir-facturas">' + V.icono('imprimir') + 'Imprimir o guardar en PDF</button></div>' +
      '<p class="estado-lectura" id="estado-lectura" aria-live="polite">' + (leidas ? '<b>' + n + ' de ' + n + '</b> facturas leídas: consumo, costo unitario, valor de la energía y factor de potencia.' : 'Aún sin leer. El analista extrae de cada factura lo que necesita la prefactibilidad.') + '</p>' +
      '<div class="tabla-envoltura extraccion"><table class="tabla"><thead><tr><th>Mes</th><th>kWh</th><th>CU $/kWh</th><th>Valor energía</th><th>FP</th></tr></thead><tbody id="filas-extraidas">' +
        c.meses.map(function (m, i) { return filaExtraida(i, leidas); }).join('') + '</tbody></table></div>' +
    '</div><div id="visor-factura">' + facturaHTML(c, S.facturaVista, leidas) + '</div></div>';
  }
  var lectura = null;
  function verFactura(i, escanear) {
    S.facturaVista = i;
    var visor = V.$('#visor-factura');
    visor.innerHTML = facturaHTML(S.cliente, i, S.leidas);
    V.$$('.lote [data-factura]').forEach(function (b) { b.setAttribute('aria-current', String(Number(b.getAttribute('data-factura')) === i)); });
    if (escanear && V.movimiento()) V.$('.factura-luz', visor).classList.add('escaneando');
  }
  // La lectura: factura por factura, el barrido extrae los campos y llena la tabla; luego se cruzan las fuentes.
  function leerFacturas() {
    var c = S.cliente, n = c.kwh.length, i = 0, lento = V.movimiento();
    var boton = V.$('#leer-facturas');
    boton.disabled = true; boton.innerHTML = V.icono('lupa') + 'Leyendo…';
    (function siguiente() {
      if (i >= n) { terminarLectura(); return; }
      verFactura(i, true);
      V.$('#estado-lectura').innerHTML = 'Leyendo la factura <b>' + (i + 1) + ' de ' + n + '</b>: ' + V.esc(c.meses[i]) + '…';
      lectura = setTimeout(function () {
        V.$('#visor-factura .factura-luz').classList.add('leida');
        V.$('#filas-extraidas tr[data-fila="' + i + '"]').outerHTML = filaExtraida(i, true);
        V.$('.lote [data-factura="' + i + '"]').classList.add('leida');
        i++;
        lectura = setTimeout(siguiente, lento ? 170 : 40);
      }, lento ? 380 : 40);
    })();
  }
  function terminarLectura() {
    var n = S.cliente.kwh.length;
    S.leidas = true;
    V.$('#leer-facturas').remove();
    V.$('#estado-lectura').innerHTML = '<b>' + n + ' de ' + n + '</b> facturas leídas: consumo, costo unitario, valor de la energía y factor de potencia.';
    V.$('#analisis').innerHTML = analisis();
    V.$$('#analisis .fuente-dato').forEach(function (el, k) { setTimeout(function () { el.classList.add('lista'); }, V.movimiento() ? 220 * (k + 1) : 0); });
    activarTips();
    pintarPasos();
    V.$('#analisis').scrollIntoView({ behavior: V.movimiento() ? 'smooth' : 'auto', block: 'start' });
  }
  function imprimirFacturas() {
    var c = S.cliente, caja = document.createElement('div');
    caja.id = 'impresion-facturas';
    caja.innerHTML = c.meses.map(function (m, i) { return facturaHTML(c, i, false); }).join('');
    document.body.appendChild(caja);
    document.body.classList.add('imprimiendo-facturas');
    window.addEventListener('afterprint', function fin() {
      document.body.classList.remove('imprimiendo-facturas'); caja.remove(); window.removeEventListener('afterprint', fin);
    });
    window.print();
  }

  /* ---------- Etapas ---------- */
  function etapa1() {
    var leidas = S.leidas || !S.cliente.factura;
    return '<div class="etapa-sim">' + (S.cliente.factura ? bandeja(leidas) : '') + '<div id="analisis">' + (leidas ? analisis() : '') + '</div></div>';
  }
  // Cruce de las facturas con la operación y el clima: gráfica, hallazgos y la compuerta «¿Hay potencial?».
  function analisis() {
    var c = S.cliente, p = S.pre, f = M.analizarFacturas(c);
    var nombresMejores = p.mejores.slice().sort(function (a, b) { return a - b; }).map(function (i) { return c.meses[i]; }).join(', ');
    var v0 = c.variables[0], unidad = v0.unidad === 'miles de L' ? 'mil L' : v0.unidad === 'noches' ? 'noche' : v0.unidad;
    var explican = c.variables.length > 2 ? 'sus variables' : c.variables.map(function (v) { return v.nombre.toLowerCase(); }).join(' y ');
    var fp = c.factura ? c.kwh.reduce(function (s, k, i) { return s + M.factura(c, i).fp; }, 0) / c.kwh.length : null;
    var hallazgos = [
      'El consumo por ' + V.esc(unidad || 'unidad') + ' varió <strong>' + V.fmt(f.variabilidadEspecifico, 1) + ' %</strong> entre meses: con una operación parecida, unos meses gastan más energía que otros.',
      'En <strong>' + V.esc(nombresMejores) + '</strong> el consumo quedó por debajo de lo esperado: son la referencia del potencial.',
      V.esc(explican.charAt(0).toUpperCase() + explican.slice(1)) + ' explican el <strong>' + V.fmt(p.ajuste.r2 * 100, 0) + ' %</strong> de la variación del consumo; el resto depende de cómo se opera.',
      'El costo unitario varió <strong>' + V.fmt(f.variacionTarifa, 1) + ' %</strong> en el año: el ahorro se valora con la tarifa de cada mes, no con un promedio.'
    ];
    if (fp) hallazgos.push('Factor de potencia promedio de <strong>' + V.fmt(fp, 2) + '</strong>: no hay cobro por energía reactiva, así que el ahorro tiene que salir del consumo activo.');
    return '<h3 style="margin-top:' + (c.factura ? '2.2rem' : '0') + '">Cruce con la operación y el clima</h3>' +
      '<div class="fuentes-datos">' +
        '<div class="fuente-dato' + (c.factura ? '' : ' lista') + '"><strong>Facturas de energía</strong><span>' + (c.factura ? c.kwh.length + ' de ' + c.kwh.length + ' leídas' : c.kwh.length + ' meses del CSV') + '</span></div>' +
        c.variables.map(function (v) { return '<div class="fuente-dato' + (c.factura ? '' : ' lista') + '"><strong>' + V.esc(v.nombre) + '</strong><span>' + V.esc(v.fuente || 'Archivo CSV') + ' · ' + v.valores.length + ' meses</span></div>'; }).join('') +
      '</div>' +
      '<div class="sim-rejilla"><div>' +
      '<div class="grafica" id="g-facturas" style="position:relative">' + graficaFacturas(c, p) +
        '<div class="grafica-leyenda"><span><i style="background:var(--dato-1)"></i>Consumo facturado</span><span><i style="background:var(--dato-2)"></i>Sus tres mejores meses</span>' +
        '<span><i style="background:none;border-top:2px solid var(--grafito);height:0;border-radius:0"></i>Lo que explican producción y clima</span><span><i style="background:none;border-top:2px dashed var(--grafito);height:0;border-radius:0"></i>Si operara como en sus mejores meses</span></div></div>' +
      '<h3 style="margin-top:1.4rem">Lo que dicen las facturas</h3><ul class="hallazgos">' + hallazgos.map(function (h, k) { return '<li style="--i:' + k + '">' + h + '</li>'; }).join('') + '</ul>' +
    '</div><div>' +
      '<div class="compuerta ' + (p.hayPotencial ? 'si' : 'no') + '" aria-live="polite"><div class="pregunta-bpmn"><span class="rombo"><span>×</span></span>¿Hay potencial de ahorro?</div>' +
        '<p class="veredicto">' + (p.hayPotencial ? 'Sí: ' : 'No: ') + V.fmt(p.pct, 1) + ' % estimado</p>' +
        '<p>' + (p.hayPotencial
          ? 'Supera el 8 % que VIRIDIA compromete como mínimo. Si la planta operara todos los meses como en sus mejores meses ahorraría cerca de <strong>' + V.fmt(p.ahorroKwh) + ' kWh</strong> al año (<strong>' + V.millones(p.pesos) + '</strong> y ' + V.fmt(p.tco2e, 1) + ' tCO<sub>2</sub>e).'
          : 'No alcanza el 8 % que VIRIDIA compromete como mínimo: la operación ya es estable. Fin «Prospecto descartado»: VIRIDIA cierra con un aviso al cliente.') + '</p></div>' +
      '<div class="indicadores">' +
        ind(V.fmt(f.totalKwh) + ' kWh', 'Consumo del año') +
        ind(V.millones(f.totalValor), 'Valor de la energía en el año') +
        ind(V.fmt(f.tarifaPromedio) + ' $/kWh', 'Tarifa promedio · varió ' + V.fmt(f.variacionTarifa, 1) + ' % en el año') +
        ind(V.fmt(f.especificoPromedio, v0.unidad === 'kg' ? 3 : 1) + ' kWh/' + V.esc(unidad), 'Consumo específico · variabilidad ' + V.fmt(f.variabilidadEspecifico, 1) + ' %') +
      '</div>' +
      '<p class="aviso-ilustrativo">Regla del simulador (ilustrativa): el potencial es lo que la planta dejaría de consumir si operara todos los meses como en sus tres mejores meses, una vez descontado lo que explican ' + (c.variables.length > 2 ? 'sus variables' : 'la producción y el clima') + '. Solo estima: el porcentaje se compromete después de medir (RN2). Datos del cliente: supuestos.</p>' +
      '<div class="acciones">' + (p.hayPotencial
        ? '<button type="button" class="btn btn-verde" data-ir="2">Instalar medición y ajustar la línea base ' + V.icono('flecha') + '</button>'
        : '<button type="button" class="btn btn-verde" data-cliente="alimentos">Probar con la planta de alimentos</button>') + '</div>' +
    '</div></div>';
  }
  function ind(valor, texto) { return '<div><b>' + valor + '</b><span>' + texto + '</span></div>'; }

  function ecuacion(reg) {
    return 'E = <em>' + fmtCoef(reg.a) + '</em>' + Object.keys(reg.b).map(function (id) {
      var v = reg.b[id], va = variable(id);
      return (v < 0 ? ' − ' : ' + ') + '<em>' + fmtCoef(Math.abs(v)) + '</em> · ' + V.esc(va.id === 'cdd' ? 'CDD' : va.nombre);
    }).join('') + '  (kWh/mes)';
  }
  function medidor(nombre, valor, limite, maxEscala, texto) {
    var ok = Math.abs(valor) <= limite;
    return '<div class="medidor"><div class="medidor-cabeza"><span>' + nombre + '</span><strong>' + V.fmt(valor, 1) + ' % <span class="etq ' + (ok ? 'ok' : 'mal') + '">' + (ok ? 'Cumple' : 'No cumple') + '</span></strong></div>' +
      '<div class="medidor-pista"><div class="medidor-valor' + (ok ? '' : ' mal') + '" style="width:' + Math.min(100, 100 * Math.abs(valor) / maxEscala) + '%"></div><span class="medidor-umbral" data-l="' + texto + '" style="left:' + (100 * limite / maxEscala) + '%"></span></div></div>';
  }
  function etapa2() {
    var c = S.cliente, aj;
    try { aj = S.ajuste = M.ajustar(c.kwh, M.columnasDe(c, S.vars)); }
    catch (err) { S.ajuste = null; return '<div class="etapa-sim"><p class="error-sim">' + V.esc(err.message) + '</p></div>'; }
    var faltan = c.variables.filter(function (v) { return S.vars.indexOf(v.id) < 0; });
    return '<div class="etapa-sim"><p class="intro">Semanas 3 a 6 de la puesta en marcha: se instalan medidores y pasarela, se contrastan con los registros del cliente y se ajusta la versión 1 de la línea base con los 12 meses de referencia (IPMVP, ASHRAE Guideline 14).</p>' +
      '<div class="sim-rejilla"><div>' +
        '<h3>Variables que explican el consumo</h3><div class="variables">' + c.variables.map(function (v) {
          var on = S.vars.indexOf(v.id) >= 0, ultima = on && S.vars.length === 1;
          return '<label class="variable"><input type="checkbox" data-var="' + v.id + '"' + (on ? ' checked' : '') + (ultima ? ' disabled' : '') + '>' + V.esc(v.nombre) + ' <small class="cita-fuente">' + V.esc(v.unidad) + '</small></label>';
        }).join('') + '</div>' +
        '<div class="ecuacion" aria-label="Ecuación de la línea base">' + ecuacion(aj.registrado) + '</div>' +
        '<div class="grafica" id="g-ajuste" style="margin-top:1rem;position:relative">' + graficaAjuste(c, aj) +
          '<div class="grafica-leyenda"><span><i style="background:var(--dato-1)"></i>Consumo real</span><span><i style="background:var(--dato-2)"></i>Línea base ajustada</span></div></div>' +
      '</div><div>' +
        medidor('CV(RMSE)', aj.cvrmse, 15, 30, '15 %') +
        medidor('NMBE', aj.nmbe, 5, 10, '±5 %') +
        '<p class="nota">R² = ' + V.fmt(aj.r2, 2) + ' · ' + aj.n + ' meses · ' + aj.p + ' parámetros. Con datos mensuales, ASHRAE Guideline 14 acepta el modelo si CV(RMSE) ≤ 15 % y NMBE dentro de ±5 %.</p>' +
        '<div class="compuerta ' + (aj.cumple ? 'si' : 'no') + '" aria-live="polite"><div class="pregunta-bpmn"><span class="rombo"><span>×</span></span>¿Cumple ASHRAE Guideline 14?</div>' +
          '<p class="veredicto">' + (aj.cumple ? 'Sí: línea base versión 1' : 'No: volver a medir') + '</p>' +
          (aj.cumple
            ? '<p>Queda registrada en el modelo de datos y nunca se sobrescribe (RN6):</p><div class="tabla-envoltura" style="margin-top:.6rem"><table class="tabla"><thead><tr><th>LINEA_BASE</th><th>COEFICIENTE_LINEA_BASE</th></tr></thead><tbody><tr><td class="mono" style="font-size:.8rem">versión 1 · 12 meses<br>CV(RMSE) ' + V.fmt(aj.cvrmse, 1) + ' · NMBE ' + V.fmt(aj.nmbe, 1) + '</td><td class="mono" style="font-size:.8rem">intercepto = ' + fmtCoef(aj.registrado.a) + '<br>' + Object.keys(aj.registrado.b).map(function (id) { return id + ' = ' + fmtCoef(aj.registrado.b[id]); }).join('<br>') + '</td></tr></tbody></table></div>'
            : '<p>El modelo no explica bien el consumo. Se mide más o se agregan variables' + (faltan.length ? ': prueba con <strong>' + faltan.map(function (v) { return V.esc(v.nombre.toLowerCase()); }).join(' o ') + '</strong>.' : '.') + '</p>') +
        '</div>' +
        '<div class="acciones"><button type="button" class="btn btn-claro" data-ir="1">Volver a las facturas</button>' +
          (aj.cumple ? '<button type="button" class="btn btn-verde" data-ir="3">Negociar el contrato ' + V.icono('flecha') + '</button>' : '') + '</div>' +
      '</div></div></div>';
  }

  function etapa3() {
    var c = S.cliente, k = S.contrato, aj = S.ajuste, max = Math.max(8, S.pre.comprometibleMax || 8);
    var anualBase = aj.pred.reduce(function (a, b) { return a + b; }, 0);
    return '<div class="etapa-sim"><div class="sim-rejilla"><div>' +
      '<h3>Términos que se fijan ahora, después de medir</h3>' +
      '<p class="intro">RN2: el porcentaje de ahorro comprometido se fija después de la caracterización, nunca antes. El rango posible va del 8 % que VIRIDIA compromete como mínimo al potencial estimado (' + V.fmt(S.pre.pct, 1) + ' %).</p>' +
      '<div class="campos">' +
        '<div class="campo"><label for="c-comp">Ahorro comprometido</label><span class="valor-rango" id="v-comp">' + k.comprometido + ' %</span><input id="c-comp" type="range" min="8" max="' + max + '" step="1" value="' + k.comprometido + '"><small>Entre 8 % y ' + max + ' %</small></div>' +
        '<div class="campo"><label for="c-part">Participación de VIRIDIA (%)' + P_SUP + '</label><input id="c-part" type="number" min="1" max="99" step="1" value="' + k.participacion + '"><small>Del ahorro verificado en pesos</small></div>' +
        '<div class="campo"><label for="c-dur">Duración' + P_SUP + '</label><select id="c-dur">' + [3, 4, 5].map(function (a) { return '<option value="' + a + '"' + (a === k.duracion ? ' selected' : '') + '>' + a + ' años</option>'; }).join('') + '</select><small>De 3 a 5 años</small></div>' +
      '</div>' +
      '<p class="nota">' + t(D.negocio.decisiones) + '</p>' +
    '</div><div>' +
      '<div class="documento" id="doc-contrato"><h4>Contrato de desempeño <span>CONTRATO · ilustrativo</span></h4>' +
        '<dl class="dl"><dt>Cliente</dt><dd>' + V.esc(c.nombre) + (c.ciudad ? ', ' + V.esc(c.ciudad) : '') + '</dd><dt>Recurso</dt><dd>Energía eléctrica (kWh)</dd>' +
        '<dt>Línea base</dt><dd class="mono" style="font-size:.82rem">versión 1 · ' + ecuacion(aj.registrado).replace(/<\/?em>/g, '') + '</dd>' +
        '<dt>Comprometido</dt><dd id="d-comp">' + k.comprometido + ' % · mínimo anual ≈ ' + V.fmt(anualBase * k.comprometido / 100) + ' kWh</dd>' +
        '<dt>Participación</dt><dd id="d-part">' + k.participacion + ' % para VIRIDIA, ' + (100 - k.participacion) + ' % para el cliente</dd>' +
        '<dt>Duración</dt><dd id="d-dur">' + k.duracion + ' años</dd>' +
        '<dt>Terminación</dt><dd>Si el ahorro anual queda bajo el mínimo comprometido, el cliente termina sin penalidad y VIRIDIA retira los equipos sin costo' + P_SUP + '.</dd></dl></div>' +
      '<div class="acciones"><button type="button" class="btn btn-claro" data-ir="2">Volver a la línea base</button><button type="button" class="btn btn-verde" data-ir="4">Firmar y pasar al cierre mensual ' + V.icono('flecha') + '</button></div>' +
    '</div></div></div>';
  }

  var RECORRIDO = [
    ['s_con', 'Consolidar lecturas y variables de operación del mes', ''],
    ['s_val', 'Validar completitud y calidad de los datos', ''],
    ['s_g95', '¿Completitud ≥ 95 %?', 'decision', 'RN3'],
    ['s_rec', 'Recuperar datos faltantes (respaldo de 72 h o lectura manual)', ''],
    ['s_gdc', '¿Datos completos?', 'decision'],
    ['s_pen', 'Marcar el periodo como pendiente', ''],
    ['s_penE', 'Fin: periodo pendiente', 'fin fin-pend'],
    ['s_eva', 'Evaluar la línea base vigente con las condiciones del mes', '', 'RN6'],
    ['s_gnr', '¿Hubo evento no rutinario?', 'decision'],
    ['s_doc', 'Documentar y acordar el ajuste no rutinario con el cliente', ''],
    ['s_cal', 'Calcular ahorro, % de reducción y tCO2e', ''],
    ['s_emi', 'Emitir reporte mensual de ahorro (siempre)', ''],
    ['s_gah', '¿Ahorro > 0?', 'decision', 'RN1'],
    ['s_rvm', 'Revisar medidas de ahorro', ''],
    ['s_endS', 'Fin: periodo sin facturación', 'fin fin-mal'],
    ['s_liq', 'Liquidar participación y emitir factura electrónica', ''],
    ['s_endF', 'Fin: factura emitida', 'fin']
  ];
  function etapa4() {
    var c = S.cliente, mes = S.mes;
    var campos = S.vars.map(function (id) {
      var v = variable(id);
      return campo('m-' + id, v.nombre + ' del mes', mes[id], v.unidad, 'data-mes="' + id + '"');
    }).join('') +
      campo('m-real', 'Consumo real medido', mes.real, 'kWh', 'data-mes="real"') +
      campo('m-comp', 'Completitud de los datos', mes.completitud, '%, mínimo 95 % (RN3)', 'data-mes="completitud" max="100" step="0.1"') +
      campo('m-aj', 'Ajuste no rutinario', mes.ajuste, 'kWh: + línea nueva, − cierre temporal', 'data-mes="ajuste" step="100" data-libre') +
      campo('m-tar', 'Tarifa del mes', mes.tarifa, '$/kWh, de la factura del cliente', 'data-mes="tarifa"');
    return '<div class="etapa-sim">' +
      '<div class="escenarios" role="group" aria-label="Escenarios"><span class="etq-grupo" style="font-size:.85rem;color:var(--texto-2);align-self:center">Escenarios:</span>' +
        '<button type="button" class="btn btn-claro btn-chico" data-esc="normal">Mes normal</button>' +
        '<button type="button" class="btn btn-claro btn-chico" data-esc="incompleto">Datos incompletos</button>' +
        '<button type="button" class="btn btn-claro btn-chico" data-esc="sin">Sin ahorro</button>' +
        '<button type="button" class="btn btn-claro btn-chico" data-esc="evento">Evento no rutinario</button></div>' +
      '<div class="sim-rejilla"><div>' +
        '<h3>Datos del mes de reporte</h3><div class="campos" id="campos-mes">' + campos +
          '<div class="campo"><span style="font-size:.86rem;font-weight:700">Recuperación</span><label class="interruptor"><input type="checkbox" id="m-rec"' + (mes.recuperado ? ' checked' : '') + '>Se recuperaron los datos faltantes</label><small>Solo aplica si la completitud es menor del 95 %</small></div>' +
        '</div><p class="error-sim" id="error-mes" hidden></p>' +
        '<h3 style="margin-top:1.6rem">Resultado del cierre</h3><div class="indicadores" id="res-cierre"></div>' +
        '<div id="documentos" style="display:grid;gap:1rem;margin-top:1.2rem"></div>' +
      '</div><div>' +
        '<h3>Camino en el BPMN del cierre mensual</h3>' +
        '<ol class="recorrido-bpmn" id="recorrido">' + RECORRIDO.map(function (r) {
          return '<li class="rb ' + r[2] + '" data-id="' + r[0] + '"><span class="marca-rb"><i></i></span><span>' + t(r[1]) + (r[3] ? ' <small>' + r[3] + '</small>' : '') + '</span></li>';
        }).join('') + '</ol>' +
        '<p id="estado-final" aria-live="polite" style="margin-top:1rem"></p>' +
        '<div class="acciones"><a class="btn btn-claro" href="#/procesos?bpmn=bpmn3&amp;camino=1">Ver este camino en el BPMN ' + V.icono('flecha') + '</a></div>' +
      '</div></div></div>';
  }
  function campo(id, etiqueta, valor, ayuda, extra) {
    return '<div class="campo"><label for="' + id + '">' + V.esc(etiqueta) + '</label><input id="' + id + '" type="number" inputmode="decimal" value="' + valor + '" ' + extra + (/data-libre/.test(extra) ? '' : ' min="0"') + '><small>' + V.esc(ayuda) + '</small></div>';
  }

  function leerMes() {
    var error = null;
    V.$$('[data-mes]').forEach(function (inp) {
      var k = inp.getAttribute('data-mes'), v = inp.value.trim() === '' ? NaN : Number(inp.value);
      var mal = isNaN(v) || (k !== 'ajuste' && v < 0) || (k === 'completitud' && v > 100) || (k === 'tarifa' && v <= 0);
      inp.setAttribute('aria-invalid', String(mal));
      if (mal && !error) error = 'Revisa «' + inp.closest('.campo').querySelector('label').textContent + '»: ' + (k === 'completitud' ? 'debe estar entre 0 y 100 %.' : k === 'tarifa' ? 'debe ser mayor que cero.' : 'debe ser un número' + (k === 'ajuste' ? '.' : ' positivo.'));
      if (!mal) S.mes[k] = v;
    });
    var rec = V.$('#m-rec');
    rec.disabled = !(S.mes.completitud < 95);
    S.mes.recuperado = rec.checked && !rec.disabled;
    return error;
  }
  function calcular(animar) {
    var error = leerMes(), caja = V.$('#error-mes');
    caja.hidden = !error; caja.textContent = error || '';
    if (error) return;
    var valores = {}; S.vars.forEach(function (id) { valores[id] = S.mes[id]; });
    var r = M.cierre({ coef: S.ajuste.registrado, mes: valores, real: S.mes.real, completitud: S.mes.completitud, recuperado: S.mes.recuperado, ajuste: S.mes.ajuste, participacion: S.contrato.participacion / 100, tarifa: S.mes.tarifa, factor: FACTOR });
    V.estado.caminoCierre = r;
    pintarResultado(r, animar);
  }
  function pintarResultado(r, animar) {
    var res = V.$('#res-cierre');
    var pend = r.estado === 'pendiente';
    var celdas = [
      ['esperado', 'Consumo esperado (línea base ajustada)', function (v) { return V.fmt(v) + ' kWh'; }],
      ['ahorro', 'Ahorro del mes', function (v) { return V.fmt(v) + ' kWh'; }],
      ['pct', 'Porcentaje de reducción', function (v) { return V.fmt(v, 1) + ' %'; }],
      ['pesos', 'Ahorro en pesos', function (v) { return V.millones(v); }],
      ['factura', 'Factura de VIRIDIA (' + S.contrato.participacion + ' %)', function (v) { return V.millones(v); }],
      ['cliente', 'Lo que conserva el cliente', function (v) { return V.millones(v); }],
      ['tco2e', 'Emisiones evitadas', function (v) { return V.fmt(v, 1) + ' tCO₂e'; }]
    ];
    if (!res.children.length) res.innerHTML = celdas.map(function (c) { return '<div><b data-k="' + c[0] + '">—</b><span>' + c[1] + '</span></div>'; }).join('') + '<div><b data-k="vs">—</b><span>Frente al ahorro comprometido</span></div>';
    celdas.forEach(function (c) {
      var el = res.querySelector('[data-k="' + c[0] + '"]'), v = r[c[0]];
      if (pend || v == null) { el.textContent = '—'; el.setAttribute('data-valor', 0); }
      else V.animarNumero(el, v, c[2]);
    });
    var vs = res.querySelector('[data-k="vs"]');
    vs.textContent = pend ? '—' : (r.pct >= S.contrato.comprometido ? 'Por encima del ' : 'Por debajo del ') + S.contrato.comprometido + ' %';

    // Camino animado por el BPMN.
    var orden = [], visto = {};
    r.camino.forEach(function (id) { if (!visto[id]) { visto[id] = 1; orden.push(id); } });
    V.$$('#recorrido .rb').forEach(function (li) { li.classList.remove('vivo'); });
    orden.forEach(function (id, k) {
      var li = V.$('#recorrido [data-id="' + id + '"]');
      if (!li) return;
      if (animar && V.movimiento()) setTimeout(function () { li.classList.add('vivo'); }, 70 * k); else li.classList.add('vivo');
    });
    var textos = { factura: 'Factura emitida', sin_factura: 'Periodo sin facturación (RN1)', pendiente: 'Periodo pendiente (RN3)' };
    V.$('#estado-final').innerHTML = '<span class="estado-final ' + r.estado + '">' + textos[r.estado] + '</span>';
    pintarDocumentos(r);
  }
  function pintarDocumentos(r) {
    var c = S.cliente, caja = V.$('#documentos');
    var reporte = r.estado === 'pendiente'
      ? '<div class="documento"><h4>Aviso de periodo pendiente <span>al cliente</span></h4><p>La completitud de los datos del mes fue de ' + V.fmt(S.mes.completitud, 1) + ' % y no se pudo recuperar lo faltante. Por RN3 no se calcula el ahorro: el periodo se liquida en el cierre siguiente. No llega factura este mes.</p></div>'
      : '<div class="documento"><h4>Reporte mensual de ahorro <span>se envía haya o no factura</span></h4><dl class="dl">' +
        '<dt>Esperado</dt><dd>' + V.fmt(r.esperado) + ' kWh (línea base v1)</dd><dt>Real</dt><dd>' + V.fmt(S.mes.real) + ' kWh</dd>' +
        (S.mes.ajuste ? '<dt>Ajuste</dt><dd>' + V.fmt(S.mes.ajuste) + ' kWh, documentado y aceptado por el cliente</dd>' : '') +
        '<dt>Ahorro</dt><dd><strong>' + V.fmt(r.ahorro) + ' kWh · ' + V.fmt(r.pct, 1) + ' %</strong></dd>' +
        (r.estado === 'sin_factura' ? '<dt>Factura</dt><dd>No se factura: el ahorro no es positivo (RN1). El ingeniero revisa las medidas.</dd>' : '') + '</dl></div>';
    var factura = r.estado !== 'factura' ? '' :
      '<div class="documento"><h4>Factura electrónica de venta <span>FE-0001 · ilustrativa</span></h4><dl class="dl">' +
        '<dt>Cliente</dt><dd>' + V.esc(c.nombre) + '</dd><dt>Concepto</dt><dd>Participación del ' + S.contrato.participacion + ' % sobre el ahorro verificado del mes</dd>' +
        '<dt>Base</dt><dd>' + V.fmt(r.ahorro) + ' kWh × ' + V.fmt(S.mes.tarifa) + ' $/kWh = ' + V.pesos(r.pesos) + '</dd>' +
        '<dt>Valor</dt><dd><strong>' + V.pesos(r.factura) + '</strong> <small>(antes de impuestos)</small></dd><dt>Emisión</dt><dd>Por medio del proveedor autorizado ante la DIAN (I5)</dd></dl>' +
        '<div class="traza-rn1" aria-label="Cadena que protege la regla RN1"><span>FACTURA</span><i>→</i><span>CALCULO_AHORRO</span><i>→</i><span>LINEA_BASE v1</span></div></div>';
    caja.innerHTML = reporte + factura;
  }

  function escenario(nombre) {
    var base = S.cliente.mesReporte;
    S.mes = Object.assign({ ajuste: 0, recuperado: false }, base);
    var valores = {}; S.vars.forEach(function (id) { valores[id] = S.mes[id]; });
    var esperado = M.evaluar(S.ajuste.registrado, valores);
    if (nombre === 'incompleto') S.mes.completitud = 91.2;
    if (nombre === 'sin') S.mes.real = Math.round(esperado * 1.03 / 1000) * 1000;
    if (nombre === 'evento') S.mes.ajuste = Math.round(esperado * 0.04 / 1000) * 1000;
    pintarEtapa();
  }

  /* ---------- Cargar facturas propias (CSV) ---------- */
  function numero(s) {
    s = String(s).trim().replace(/\s/g, '').replace(/\$/g, '');
    if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
    else s = s.replace(',', '.');
    return Number(s);
  }
  function leerCSV(texto) {
    var lineas = texto.replace(/^﻿/, '').split(/\r?\n/).filter(function (l) { return l.trim(); });
    if (lineas.length < 7) throw new Error('El archivo necesita una fila de encabezados y al menos 6 meses.');
    var sep = (lineas[0].match(/;/g) || []).length ? ';' : lineas[0].indexOf('\t') >= 0 ? '\t' : ',';
    var cab = lineas[0].split(sep).map(function (h) { return h.trim(); });
    var iMes = cab.findIndex(function (h) { return /^mes/i.test(h); }), iKwh = cab.findIndex(function (h) { return /kwh/i.test(h); }), iTar = cab.findIndex(function (h) { return /tarifa/i.test(h); });
    if (iMes < 0 || iKwh < 0 || iTar < 0) throw new Error('Faltan columnas: el encabezado debe tener «mes», «kwh» y «tarifa», y después una columna por variable.');
    var vars = cab.map(function (h, i) { return { h: h, i: i }; }).filter(function (c) { return [iMes, iKwh, iTar].indexOf(c.i) < 0 && c.h; });
    if (!vars.length) throw new Error('Agrega al menos una variable que explique el consumo (por ejemplo, producción o CDD).');
    var filas = lineas.slice(1).map(function (l, n) {
      var c = l.split(sep);
      var fila = { mes: (c[iMes] || '').trim(), kwh: numero(c[iKwh]), tarifa: numero(c[iTar]), vars: vars.map(function (v) { return numero(c[v.i]); }) };
      if (!(fila.kwh > 0) || !(fila.tarifa > 0) || fila.vars.some(isNaN)) throw new Error('La fila ' + (n + 2) + ' tiene valores vacíos o no numéricos.');
      return fila;
    });
    if (filas.length <= vars.length + 2) throw new Error('Con ' + vars.length + ' variables se necesitan al menos ' + (vars.length + 3) + ' meses.');
    var cliente = {
      id: 'propio', nombre: 'Tus facturas', ciudad: '', sector: 'Datos cargados desde un CSV', descripcion: filas.length + ' meses',
      meses: filas.map(function (f) { return f.mes; }), kwh: filas.map(function (f) { return f.kwh; }), tarifa: filas.map(function (f) { return f.tarifa; }),
      variables: vars.map(function (v, j) { var id = 'v' + j; return { id: /cdd/i.test(v.h) ? 'cdd' : id, nombre: v.h, unidad: '', valores: filas.map(function (f) { return f.vars[j]; }) }; })
    };
    cliente.modelo = cliente.variables.map(function (v) { return v.id; });
    var ult = filas[filas.length - 1], aj = M.ajustar(cliente.kwh, M.columnasDe(cliente, cliente.modelo));
    cliente.mesReporte = { real: Math.round(aj.pred[aj.pred.length - 1] * 0.88), completitud: 98, tarifa: ult.tarifa };
    cliente.variables.forEach(function (v, j) { cliente.mesReporte[v.id] = ult.vars[j]; });
    return cliente;
  }
  function plantilla() {
    var c = CLIENTES[0];
    var lineas = ['mes;kwh;tarifa;' + c.variables.map(function (v) { return v.id === 'cdd' ? 'cdd' : 'produccion_kg'; }).join(';')];
    c.meses.forEach(function (m, i) { lineas.push([m, c.kwh[i], c.tarifa[i]].concat(c.variables.map(function (v) { return v.valores[i]; })).join(';')); });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + lineas.join('\r\n')], { type: 'text/csv;charset=utf-8' }));
    a.download = 'plantilla-facturas-viridia.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  /* ---------- Pantalla ---------- */
  function render() {
    S = S || nuevoEstado(CLIENTES[0]);
    return V.cabecera({
      titulo: 'Simulador del servicio', semilla: 33, lamina: 'simulador',
      alt: 'Grabado de un abanico de facturas con una lupa que revela las nervaduras de una hoja.',
      pregunta: 'De las facturas del cliente a la factura por ahorro verificado.',
      entrada: 'Recorre con un cliente el camino que modelan los BPMN: la prefactibilidad con sus facturas, la línea base validada con ASHRAE Guideline 14, el contrato y el cierre mensual, donde RN3 y RN1 deciden si hay factura.',
      sumario: [['clientes', 'Elegir cliente'], ['pasos-sim', 'Etapas'], ['etapa', 'Simulación']]
    }) +
    '<section class="seccion" id="clientes"><div class="contenido">' +
      '<h2>Elige un cliente</h2>' +
      '<p class="intro">Tres plantas ilustrativas, cada una con un desenlace distinto, o tus propias facturas en CSV. Todos los valores de los clientes son supuestos del equipo.</p>' +
      '<div class="clientes" role="group" aria-label="Cliente">' + CLIENTES.map(function (c) {
        return '<button type="button" class="cliente" data-cliente="' + c.id + '" aria-pressed="false"><strong>' + V.esc(c.nombre) + ' · ' + V.esc(c.ciudad) + '</strong><span>' + V.esc(c.descripcion) + '</span><small>' + V.esc(c.sector) + '</small></button>';
      }).join('') +
        '<div class="cliente propio"><strong>Tus facturas</strong><span>CSV con mes, kwh, tarifa y tus variables.</span><span class="acciones" style="margin:.5rem 0 0;gap:.4rem"><button type="button" class="btn btn-verde btn-chico" id="cargar-csv">' + V.icono('subir') + 'Cargar CSV</button><button type="button" class="btn btn-claro btn-chico" id="plantilla">Plantilla</button></span><input type="file" id="csv" accept=".csv,text/csv,text/plain" hidden></div>' +
      '</div><p class="error-sim" id="error-csv" hidden></p>' +
      '<ol class="pasos" id="pasos-sim">' + [['Prefactibilidad', '¿Hay potencial de ahorro?'], ['Línea base', '¿Cumple ASHRAE 14?'], ['Contrato', 'RN2: se fija después de medir'], ['Cierre mensual', 'RN3 y RN1']].map(function (p, k) {
        return '<li class="paso" data-paso="' + (k + 1) + '"><button type="button" data-ir="' + (k + 1) + '"><span class="n">' + (k + 1) + '</span><strong>' + p[0] + '</strong><small>' + p[1] + '</small></button></li>';
      }).join('') + '</ol>' +
      '<div id="etapa"></div>' +
    '</div></section>';
  }
  function permitido(paso) {
    if (paso === 1) return true;
    if (!S.pre.hayPotencial || (S.cliente.factura && !S.leidas)) return false;
    if (paso === 2) return true;
    if (!S.ajuste) { try { S.ajuste = M.ajustar(S.cliente.kwh, M.columnasDe(S.cliente, S.vars)); } catch (e) { S.ajuste = null; } }
    var aj = S.ajuste;
    if (!aj || !aj.cumple) return false;
    return paso === 3 || S.contratoListo;
  }
  function pintarEtapa() {
    clearTimeout(lectura); // una lectura en curso no sigue escribiendo sobre otra etapa u otro cliente
    V.$$('.cliente[data-cliente]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-cliente') === S.cliente.id)); });
    var html = { 1: etapa1, 2: etapa2, 3: etapa3, 4: etapa4 }[S.paso]();
    V.$('#etapa').innerHTML = html;
    pintarPasos();
    activarTips();
    if (S.paso === 4) calcular(true);
  }
  function pintarPasos() {
    V.$$('#pasos-sim .paso').forEach(function (li) {
      var n = Number(li.getAttribute('data-paso'));
      if (n === S.paso) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      li.classList.toggle('hecho', n < S.paso);
      li.classList.toggle('cerrado', n === 1 && !S.pre.hayPotencial && (S.leidas || !S.cliente.factura));
      V.$('button', li).disabled = !permitido(n);
    });
  }
  function activarTips() {
    var g1 = V.$('#g-facturas');
    if (g1) activarTip(g1, function (i) {
      var c = S.cliente, p = S.pre;
      return '<strong>' + V.esc(c.meses[i]) + '</strong><br>Facturado: ' + V.fmt(c.kwh[i]) + ' kWh<br>Esperado: ' + V.fmt(p.ajuste.pred[i]) + ' kWh<br>Como sus mejores meses: ' + V.fmt(p.objetivo[i]) + ' kWh<br>Tarifa: ' + c.tarifa[i] + ' $/kWh';
    });
    var g2 = V.$('#g-ajuste');
    if (g2) activarTip(g2, function (i) {
      var c = S.cliente, aj = S.ajuste;
      return '<strong>' + V.esc(c.meses[i]) + '</strong><br>Real: ' + V.fmt(c.kwh[i]) + ' kWh<br>Línea base: ' + V.fmt(aj.pred[i]) + ' kWh<br>Diferencia: ' + V.fmt(100 * aj.resid[i] / aj.pred[i], 1) + ' %';
    });
  }
  function irA(paso) {
    if (paso === 4 && S.paso === 3) S.contratoListo = true;
    if (!permitido(paso)) return;
    S.paso = paso;
    pintarEtapa();
    V.$('#pasos-sim').scrollIntoView({ behavior: V.movimiento() ? 'smooth' : 'auto', block: 'start' });
  }
  function elegirCliente(cliente) {
    S = nuevoEstado(cliente);
    V.$('#error-csv').hidden = true;
    pintarEtapa();
  }

  function montar(raiz) {
    pintarEtapa();
    raiz.addEventListener('click', function (e) {
      var b;
      if ((b = e.target.closest('[data-cliente]'))) { var c = CLIENTES.filter(function (x) { return x.id === b.getAttribute('data-cliente'); })[0]; if (c) elegirCliente(c); return; }
      if ((b = e.target.closest('[data-ir]'))) { irA(Number(b.getAttribute('data-ir'))); return; }
      if ((b = e.target.closest('[data-esc]'))) { escenario(b.getAttribute('data-esc')); return; }
      if ((b = e.target.closest('[data-factura]'))) { if (!V.$('#leer-facturas[disabled]')) verFactura(Number(b.getAttribute('data-factura')), false); return; }
      if (e.target.closest('#leer-facturas')) { leerFacturas(); return; }
      if (e.target.closest('#imprimir-facturas')) { imprimirFacturas(); return; }
      if (e.target.closest('#cargar-csv')) { V.$('#csv').click(); return; }
      if (e.target.closest('#plantilla')) plantilla();
    });
    raiz.addEventListener('change', function (e) {
      var el = e.target;
      if (el.matches('[data-var]')) {
        var id = el.getAttribute('data-var');
        if (el.checked) S.vars.push(id); else S.vars = S.vars.filter(function (x) { return x !== id; });
        S.vars = S.cliente.variables.map(function (v) { return v.id; }).filter(function (x) { return S.vars.indexOf(x) >= 0; });
        S.vars.forEach(function (x) { if (S.mes[x] == null) S.mes[x] = S.cliente.mesReporte[x]; });
        S.contratoListo = false;
        pintarEtapa();
      } else if (el.id === 'csv' && el.files[0]) {
        var lector = new FileReader();
        lector.onload = function () {
          try { var c = leerCSV(String(lector.result)); elegirCliente(c); V.$$('.cliente[data-cliente]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); }); }
          catch (err) { var caja = V.$('#error-csv'); caja.hidden = false; caja.textContent = 'No se pudo leer el archivo: ' + err.message; }
          el.value = '';
        };
        lector.readAsText(el.files[0]);
      } else if (el.id === 'm-rec') calcular(true);
      else if (el.id === 'c-dur') { S.contrato.duracion = Number(el.value); V.$('#d-dur').textContent = el.value + ' años'; }
    });
    raiz.addEventListener('input', function (e) {
      var el = e.target;
      if (el.id === 'c-comp') {
        S.contrato.comprometido = Number(el.value);
        V.$('#v-comp').textContent = el.value + ' %';
        var anual = S.ajuste.pred.reduce(function (a, b) { return a + b; }, 0);
        V.$('#d-comp').textContent = el.value + ' % · mínimo anual ≈ ' + V.fmt(anual * Number(el.value) / 100) + ' kWh';
      } else if (el.id === 'c-part') {
        var v = Math.min(99, Math.max(1, Number(el.value) || 40));
        S.contrato.participacion = v;
        V.$('#d-part').textContent = v + ' % para VIRIDIA, ' + (100 - v) + ' % para el cliente';
      } else if (el.matches('[data-mes]')) {
        clearTimeout(temporizador);
        temporizador = setTimeout(function () { calcular(false); }, 160);
      }
    });
  }

  V.vistas.simulador = { titulo: 'Simulador del servicio', render: render, montar: montar };
})();
