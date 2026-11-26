/* Aplicaciones: vista por capas (misma disposición que la figura del documento), integraciones I1–I16,
   el recorrido animado de una lectura (1 a 7), catálogo, matriz aplicación × proceso. */
(function () {
  'use strict';
  var V = window.V, D = V.datos, AP = D.aplicaciones, t = V.t;
  var S = 1000 / 24.2, W = 1000, H = Math.round(14.15 * S);
  function X(cm) { return cm * S; }
  function Y(cm) { return (14.15 - cm) * S; }
  function caja(id, cx, cy, w, h, clase, html, etq) { return { id: id, x: X(cx - w / 2), y: Y(cy + h / 2), w: w * S, h: h * S, clase: clase, html: html, etiqueta: etq || id }; }
  function app(id, cx, cy, w, h) {
    var a = V.porId(AP.apps, id);
    return caja(id, cx, cy, w, h, V.claseCriticidad(a.criticidad), '<b>' + id + '</b>' + V.esc(a.nombre) + '<small>' + V.esc(a.propietario.split(/,| y | e /)[0]) + ' · ' + a.criticidad + '</small>', id + ' ' + a.nombre);
  }
  var NODOS = [
    caja('ACT1', 4.05, 13.65, 5.9, 0.8, 'ext', '<b>Cliente</b>Jefe de mantenimiento y gerente de planta'),
    caja('ACT2', 8.95, 13.65, 3.3, 0.8, 'ext', '<b>Cliente</b>Gerencia financiera'),
    caja('ACT3', 13.15, 13.65, 4.5, 0.8, 'ext', '<b>VIRIDIA</b>Comercial, finanzas y legal'),
    caja('ACT4', 19.85, 13.65, 8.3, 0.8, 'ext', '<b>VIRIDIA</b>Ingenieros de eficiencia, analistas y científicos de datos'),
    caja('NOTIF', 3.35, 12.65, 4.5, 0.8, 'media', '<b>Notificaciones</b>Correo y SMS: alertas al cliente y al ingeniero'),
    caja('A5', 9.25, 12.65, 6.7, 0.8, 'media', '<b>A5</b>Portal y tablero del cliente (web)', 'A5 Portal y tablero del cliente'),
    caja('ACCESO', 18.45, 12.65, 11.1, 0.8, 'ext', '<b>Acceso web interno por rol</b>A3, A4, A6, A7, A8 y A9, con inicio de sesión en A10'),
    app('A6', 5.2, 10.65, 3.6, 1.6), app('A3', 9.5, 10.65, 3.8, 1.6), app('A4', 13.9, 10.65, 3.8, 1.6), app('A7', 18.3, 10.65, 3.8, 1.6),
    caja('BUS', 2.9, 8.5, 3.4, 1.5, 'mec BUS', '<b>Bus de eventos</b>I1 · I8 · I9 · I12'),
    caja('GW', 12.25, 8.5, 14.7, 1.5, 'mec GW', '<b>Gateway de API</b>I2 · I3 · I4 · I5 · I7 · I11 · I13 · I14 · I15 · I16. Verifica la identidad con A10 en cada llamada.'),
    caja('SFTP', 21.95, 8.5, 4.1, 1.5, 'mec SFTP', '<b>Transferencia controlada de archivos</b>I6 · I10'),
    app('A8', 3.1, 6.2, 2.4, 1.55), app('A9', 6.5, 6.2, 2.4, 1.55), app('A10', 10.6, 6.2, 4.6, 1.55),
    caja('DIAN', 17.5, 6.2, 3.2, 1.55, 'ext', '<b>Externo</b>Proveedor de factura electrónica (DIAN)'),
    caja('VERIF', 20.85, 6.2, 2.1, 1.55, 'ext', '<b>Externo</b>Verificador independiente'),
    caja('ERPCLI', 23, 6.2, 2.0, 1.55, 'ext', '<b>Externo</b>ERP o MES del cliente'),
    caja('ST1', 3.17, 3.95, 2.35, 2.3, 'almacen', '<b>Series de tiempo</b><small>LECTURA, ALERTA, VARIABLE_OPERACION, PUNTO_MEDICION, RECURSO</small>'),
    app('A2', 6.5, 3.95, 4.0, 2.3),
    caja('ST2', 9.95, 3.95, 2.1, 2.3, 'almacen', '<b>Modelos de línea base</b><small>LINEA_BASE, COEFICIENTE_LINEA_BASE</small>'),
    caja('ST3', 12.8, 3.95, 3.0, 2.3, 'almacen', '<b>Cálculo y verificación</b><small>CALCULO_AHORRO, AJUSTE_NO_RUTINARIO, MEDIDA_AHORRO, VERIFICACION</small>'),
    caja('ST4', 16.1, 3.95, 3.0, 2.3, 'almacen', '<b>Comercial y facturación</b><small>CLIENTE, CONTACTO_CLIENTE, PLANTA, CONTRATO, ALCANCE_CONTRATO, FACTURA</small>'),
    caja('ST5', 19.4, 3.95, 3.0, 2.3, 'almacen', '<b>Activos y documentos</b><small>EQUIPO; contratos, actas y reportes MRV</small>'),
    caja('ST6', 22.6, 3.95, 2.8, 2.3, 'media', '<b>En todos los almacenes</b><small>Espacio aislado por cliente, respaldo diario y retención mínima de 10 años</small>'),
    app('A1', 2.7, 1.05, 3.0, 1.6),
    caja('T1', 6.65, 1.05, 3.3, 1.45, 'media', '<b>T1</b>Medidores clase 0,5S, caudalímetros y sensores<small>En comodato</small>', 'T1 Medidores'),
    caja('T3', 10.65, 1.6, 3.6, 0.85, 'media', '<b>T3</b>Red celular 4G · segunda SIM', 'T3 Red celular 4G'),
    caja('T16', 10.65, 0.6, 3.6, 0.8, 'media', '<b>T16</b>Sede Barranquilla', 'T16 Red de la sede'),
    caja('NB1', 14.75, 1.2, 3.2, 1.3, 'media', '<b>Ambientes separados</b><small>Desarrollo, pruebas y producción</small>'),
    caja('NB2', 18.15, 1.2, 3.2, 1.3, 'media', '<b>Espacio aislado por cliente</b><small>En la base de series de tiempo</small>'),
    caja('NB3', 21.55, 1.2, 3.2, 1.3, 'media', '<b>Respaldo diario</b><small>Retención mínima de 10 años</small>')
  ];
  var POR_ID = {}; NODOS.forEach(function (n) { POR_ID[n.id] = n; });
  // Flechas de la figura del documento: cada una llega hasta el mecanismo que la transporta.
  function seg(de, a, x0, y0, x1, y1, clase, ints) { return { de: de, a: a, puntos: [[X(x0), Y(y0)], [X(x1), Y(y1)]], clase: clase, grupo: [de, a], ints: ints }; }
  var ARISTAS = [
    seg('A1', 'BUS', 1.4, 1.85, 1.4, 7.75, 'evento', ['I1']),
    seg('BUS', 'A2', 4.55, 7.75, 4.55, 5.1, 'evento', ['I1', 'I9']),
    seg('A2', 'GW', 8, 5.1, 8, 7.75, '', ['I2', 'I11']),
    seg('GW', 'A3', 8.2, 9.25, 8.2, 9.85, '', ['I2']),
    seg('A3', 'GW', 10.8, 9.85, 10.8, 9.25, '', ['I3']),
    seg('GW', 'A4', 12.5, 9.25, 12.5, 9.85, '', ['I3', 'I13']),
    seg('A4', 'GW', 15.2, 9.85, 15.2, 9.25, '', ['I4', 'I7', 'I16']),
    seg('GW', 'A7', 16.9, 9.25, 16.9, 9.85, '', ['I4', 'I14']),
    seg('A7', 'GW', 19.4, 9.85, 19.4, 9.25, '', ['I5']),
    seg('GW', 'DIAN', 18.6, 7.75, 18.6, 6.975, '', ['I5']),
    seg('A10', 'GW', 10.55, 6.975, 10.55, 7.75, '', ['A10']),
    seg('GW', 'A5', 7.3, 9.25, 7.3, 12.25, '', ['I7']),
    seg('A6', 'BUS', 4, 9.85, 4, 9.25, 'evento', ['I12']),
    seg('BUS', 'A8', 3.6, 7.75, 3.6, 6.975, 'evento', ['I12']),
    seg('A6', 'GW', 6.4, 9.85, 6.4, 9.25, '', ['I13', 'I14', 'I15']),
    seg('GW', 'A9', 6.5, 7.75, 6.5, 6.975, '', ['I15', 'I16']),
    seg('SFTP', 'VERIF', 20.85, 7.75, 20.85, 6.975, 'archivo', ['I6']),
    seg('ERPCLI', 'SFTP', 23, 6.975, 23, 7.75, 'archivo', ['I10']),
    seg('BUS', 'NOTIF', 1.8, 9.25, 1.8, 12.25, 'evento', ['I8', 'I9']),
    { de: 'BUS', a: 'A5', puntos: [[X(1.8), Y(12.03)], [X(6.3), Y(12.03)], [X(6.3), Y(12.25)]], clase: 'evento', grupo: ['BUS', 'A5'], ints: ['I8', 'I9'] },
    seg('A4', 'SFTP', 15.6, 9.85, 15.6, 9.85, 'archivo', ['I6']),
    seg('T1', 'A1', 5, 1.05, 4.2, 1.05, '', ['T1'])
  ];
  var NUMEROS = [[1, 'T1'], [2, 'A1'], [3, 'A2'], [4, 'A3'], [5, 'A4'], [6, 'A7'], [7, 'DIAN']];
  // Recorrido de una lectura: tramos del pulso, nodos que se encienden (incluidos los almacenes que nombra el
  // paso) y aristas que recorre. Lo encendido se queda encendido: el camino se va dibujando.
  var TRAMOS = [
    { paso: 1, nodos: ['T1'], aristas: [['T1', 'A1']], puntos: [[6.65, 1.05], [4.2, 1.05]] },
    { paso: 2, nodos: ['A1', 'BUS'], aristas: [['A1', 'BUS']], puntos: [[2.7, 1.05], [1.4, 1.85], [1.4, 7.75], [2.9, 8.5]] },
    { paso: 3, nodos: ['A2', 'ST1'], aristas: [['BUS', 'A2']], puntos: [[4.55, 7.75], [4.55, 5.1], [6.5, 3.95]] },
    { paso: 4, nodos: ['GW', 'A3', 'A10', 'ST2'], aristas: [['A2', 'GW'], ['GW', 'A3'], ['A10', 'GW']], puntos: [[8, 5.1], [8, 8.5], [8.2, 9.85], [9.5, 10.65]] },
    { paso: 5, nodos: ['A4', 'ST3'], aristas: [['A3', 'GW'], ['GW', 'A4']], puntos: [[10.8, 9.85], [10.8, 8.5], [12.5, 8.5], [12.5, 9.85], [13.9, 10.65]] },
    { paso: 6, nodos: ['A7', 'ST4'], aristas: [['A4', 'GW'], ['GW', 'A7']], puntos: [[15.2, 9.85], [15.2, 8.5], [16.9, 8.5], [16.9, 9.85], [18.3, 10.65]] },
    { paso: 7, nodos: ['DIAN', 'NOTIF', 'A5'], aristas: [['A7', 'GW'], ['GW', 'DIAN'], ['BUS', 'NOTIF'], ['BUS', 'A5']], puntos: [[19.4, 9.85], [19.4, 8.5], [18.6, 8.5], [18.6, 6.975], [17.5, 6.2]] }
  ];

  function render() {
    var procs = D.negocio.procesos, apps9 = AP.apps.filter(function (a) { return a.id !== 'A10'; });
    var diag = V.diagrama({ id: 'capas', ancho: W, alto: H, nodos: NODOS, aristas: ARISTAS.filter(function (a) { return a.puntos[0][1] !== a.puntos[1][1] || a.puntos[0][0] !== a.puntos[1][0]; }), zonas: [
      { x: 0, y: Y(14.15), w: W, h: 2.3 * S, clase: 'banda', titulo: 'Usuarios<br>y canales' },
      { x: 0, y: Y(11.7), w: W, h: 2.1 * S, clase: 'banda', titulo: 'Aplicaciones<br>de negocio' },
      { x: 0, y: Y(9.45), w: W, h: 1.9 * S, clase: 'banda', titulo: 'Integración' },
      { x: 0, y: Y(7.4), w: W, h: 2.1 * S, clase: 'banda', titulo: 'Soporte<br>y externos' },
      { x: 0, y: Y(5.15), w: W, h: 2.4 * S, clase: 'banda', titulo: 'Datos' },
      { x: 0, y: Y(2.6), w: W, h: 2.6 * S, clase: 'banda', titulo: 'Infraestructura' }
    ] });
    // El número de cada paso del recorrido va en la esquina superior izquierda de su nodo.
    var numeros = NUMEROS.map(function (n) { var c = POR_ID[n[1]]; return '<span class="paso-num" style="left:' + (100 * (c.x + 4) / W) + '%;top:' + (100 * (c.y + 2) / H) + '%">' + n[0] + '</span>'; }).join('');
    var fin = diag.lastIndexOf('</div></div>');
    diag = diag.slice(0, fin) + numeros + diag.slice(fin);
    return V.cabecera({
      titulo: 'Arquitectura de aplicaciones', semilla: 19, lamina: 'aplicaciones',
      alt: 'Grabado de una red de raíces e hifas que conecta diez plántulas y hongos.',
      pregunta: '¿Qué sistemas apoyan el trabajo y cómo intercambian información?',
      entrada: t(AP.intro) + ' Ninguna aplicación se conecta directo con otra: todo pasa por el gateway, el bus o la transferencia de archivos.',
      sumario: [['vista-capas', 'Vista por capas'], ['integraciones', 'Integraciones'], ['catalogo', 'Catálogo'], ['app-proceso', 'Aplicación × proceso']]
    }) +
    '<section class="seccion" id="vista-capas"><div class="contenido">' +
      '<h2>Vista por capas</h2>' +
      '<p class="intro">El color indica la criticidad. Toca una aplicación para ver su ficha e iluminar sus integraciones; los números del 1 al 7 siguen una lectura desde el medidor hasta la factura.</p>' +
      '<div class="plancha"><div class="plancha-barra"><span class="ayuda" id="recorrido-texto" aria-live="polite">Recorrido de una lectura: pulsa «Reproducir».</span>' +
        '<span class="acciones" style="margin:0"><button type="button" class="btn btn-verde btn-chico" id="reproducir">' + V.icono('reproducir') + 'Reproducir el recorrido</button><button type="button" class="btn btn-claro btn-chico" id="limpiar-capas">Ver todo</button>' + V.botonPantalla() + '</span></div>' +
        diag +
        '<div class="leyenda"><span><i class="l-critica"></i>Crítica</span><span><i class="l-alta"></i>Alta</span><span><i class="l-media"></i>Media</span><span><i class="l-ext"></i>Externo o actor</span><span><i class="l-api"></i>API (gateway)</span><span><i class="l-evento"></i>Evento (bus)</span><span><i class="l-archivo"></i>Archivo controlado</span></div>' +
      '</div>' +
      '<p class="nota" style="margin-top:1rem">' + t(AP.decisionesIntegracion) + '</p>' +
    '</div></section>' +

    '<section class="seccion banda" id="integraciones"><div class="contenido">' +
      '<h2>Dieciséis integraciones</h2>' +
      '<div class="filtros" role="group" aria-label="Filtrar por forma" style="margin-bottom:1rem"><span class="etq-grupo">Forma:</span>' +
        ['Todas', 'API', 'Evento', 'Archivo'].map(function (f) { return '<button type="button" class="filtro" data-forma="' + f + '" aria-pressed="' + (f === 'Todas') + '">' + f + '</button>'; }).join('') + '</div>' +
      '<div class="tabla-envoltura"><table class="tabla" id="tabla-int"><thead><tr><th>Id</th><th>Origen → destino</th><th>Forma</th><th>Vía</th><th>Qué viaja</th></tr></thead><tbody>' +
        AP.integraciones.map(function (i) {
          return '<tr data-sel="' + i.id + '" data-forma="' + i.forma + '"><td>' + V.chip(i.id) + '</td><td>' + V.chip(i.de) + ' → ' + V.chips(i.a) + '</td><td>' + i.forma + '</td><td>' + V.esc(V.porId(AP.mecanismos, i.via).nombre.replace('{P}', '')) + '</td><td>' + t(i.que) + '</td></tr>';
        }).join('') + '</tbody></table></div>' +
    '</div></section>' +

    '<section class="seccion" id="catalogo"><div class="contenido">' +
      '<h2>Catálogo de aplicaciones</h2>' +
      '<p class="intro">Crítica si una falla impide facturar el mes siguiente, alta si afecta la operación o el cumplimiento, media si su falla tiene un procedimiento alterno. Se construye lo que realiza C2 y C4; lo demás se contrata.</p>' +
      '<div class="tabla-envoltura"><table class="tabla"><thead><tr><th>Aplicación</th><th>Propósito</th><th>Propietario</th><th>Modelo</th><th>Criticidad</th></tr></thead><tbody>' +
        AP.apps.map(function (a) {
          return '<tr data-sel="' + a.id + '"><td>' + V.chip(a.id) + ' <strong>' + V.esc(a.nombre) + '</strong></td><td>' + t(a.proposito) + '</td><td>' + V.esc(a.propietario) + '</td><td>' + t(a.modelo) + '</td><td><span class="etq ' + V.claseCriticidad(a.criticidad) + '">' + a.criticidad + '</span> ' + V.chips(a.capacidades) + '</td></tr>';
        }).join('') + '</tbody></table></div>' +
    '</div></section>' +

    '<section class="seccion banda" id="app-proceso"><div class="contenido">' +
      '<h2>Relación entre aplicaciones y procesos</h2>' +
      '<p class="intro">' + t(AP.notaAppProc) + '</p>' +
      '<div class="tabla-envoltura" style="padding:.8rem"><table class="matriz"><thead><tr><th class="fila">Proceso</th>' + apps9.map(function (a) { return '<th><button type="button" data-detalle="' + a.id + '">' + a.id + '</button></th>'; }).join('') + '</tr></thead><tbody>' +
        procs.map(function (p) {
          var fila = AP.appProc[p.id] || {};
          return '<tr><th class="fila"><button type="button" data-detalle="' + p.id + '"><span class="mono" style="font-size:.78rem;font-weight:600;color:var(--verde)">' + p.id + '</span> ' + t(p.nombre) + '</button></th>' +
            apps9.map(function (a) { var v = fila[a.id] || ''; return '<td class="' + v + '">' + v + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>' +
      '<p class="nota" style="margin-top:1rem"><strong>P</strong> soporte directo de actividades del proceso · <strong>S</strong> el proceso la consulta o la usa como apoyo.</p>' +
    '</div></section>';
  }

  var dibujadas = [];
  function indicesDe(ints, ids) {
    var ks = [];
    dibujadas.forEach(function (a, k) {
      if (a.ints.some(function (i) { return ints.indexOf(i) >= 0; })) { ks.push(k); ids.push(a.de, a.a); }
    });
    return ks;
  }
  function seleccionar(id) {
    var diag = V.$('#capas');
    if (!diag) return;
    V.$$('.nodo', diag).forEach(function (n) { n.classList.toggle('elegido', n.getAttribute('data-id') === id); });
    V.$$('#tabla-int tr[data-sel]').forEach(function (tr) { tr.classList.toggle('resaltada', tr.getAttribute('data-sel') === id); });
    if (!id) { V.enfocar(diag, null); return; }
    var e = V.indice[id], ids = [id], ints = [];
    if (!e) { V.enfocar(diag, null); return; }
    if (e.tipo === 'I') ints = [id];
    else if (e.tipo === 'A' || e.tipo === 'EXT') ints = V.integracionesDe(id).map(function (i) { return i.id; }).concat(id === 'A10' ? ['A10'] : []);
    else if (e.tipo === 'MEC') ints = AP.integraciones.filter(function (i) { return i.via === id; }).map(function (i) { return i.id; });
    var ks = indicesDe(ints, ids);
    if (e.tipo === 'I') ids.push(e.obj.de, e.obj.via);
    V.enfocar(diag, ids, ks);
  }
  var reproduciendo = false;
  function reproducir() {
    if (reproduciendo) return;
    reproduciendo = true;
    V.panel.cerrar(true);
    var diag = V.$('#capas'), texto = V.$('#recorrido-texto'), acumulado = [], ks = [], k = 0;
    (function siguiente() {
      if (k >= TRAMOS.length) { reproduciendo = false; texto.innerHTML = 'Recorrido completo: la lectura llegó a la factura, solo porque el ahorro fue positivo (RN1).'; return; }
      var tr = TRAMOS[k], paso = AP.recorrido[k];
      acumulado = acumulado.concat(tr.nodos);
      tr.aristas.forEach(function (p) { dibujadas.forEach(function (a, i) { if (a.de === p[0] && a.a === p[1]) ks.push(i); }); });
      V.enfocar(diag, acumulado, ks);
      V.$$('.nodo', diag).forEach(function (n) { n.classList.toggle('elegido', tr.nodos.indexOf(n.getAttribute('data-id')) >= 0); });
      texto.innerHTML = '<strong>' + paso.n + '.</strong> ' + t(paso.texto);
      V.pulso(diag, tr.puntos.map(function (p) { return [X(p[0]), Y(p[1])]; }), W, H, 1100).then(function () { k++; setTimeout(siguiente, V.movimiento() ? 650 : 900); });
    })();
  }

  V.vistas.aplicaciones = {
    titulo: 'Arquitectura de aplicaciones', render: render,
    montar: function (raiz, params) {
      dibujadas = ARISTAS.filter(function (a) { return a.puntos[0][1] !== a.puntos[1][1] || a.puntos[0][0] !== a.puntos[1][0]; });
      raiz.addEventListener('click', function (e) {
        var n = e.target.closest('#capas .nodo');
        if (n) {
          var id = n.getAttribute('data-id');
          if (V.indice[id]) V.detalle(id);
          else if (/^NB|^ST6|^T16|^T3|^T1$/.test(id)) location.hash = '#/tecnologia';
          else if (/^ST/.test(id)) location.hash = '#/informacion';
          else if (id === 'ACCESO') V.detalle('A10');
          return;
        }
        if (e.target.closest('#reproducir')) { reproducir(); return; }
        if (e.target.closest('#limpiar-capas')) { V.panel.cerrar(); V.enfocar(V.$('#capas'), null); return; }
        var f = e.target.closest('[data-forma]');
        if (f && f.tagName === 'BUTTON') {
          var forma = f.getAttribute('data-forma');
          V.$$('.filtro[data-forma]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === f)); });
          V.$$('#tabla-int tr[data-sel]').forEach(function (tr) { tr.hidden = forma !== 'Todas' && tr.getAttribute('data-forma') !== forma; });
          return;
        }
        var fila = e.target.closest('tr[data-sel]');
        if (fila && !e.target.closest('a')) V.detalle(fila.getAttribute('data-sel'));
      });
      if (params.recorrido) setTimeout(function () { V.$('#vista-capas').scrollIntoView({ behavior: 'smooth' }); setTimeout(reproducir, 600); }, 300);
    },
    alSeleccionar: seleccionar
  };
})();
