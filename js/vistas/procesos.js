/* Procesos: organigrama, mapa de procesos, actores, flujo del cliente y los tres BPMN
   interactivos (bpmn-js, el visor de bpmn.io) con las reglas RN1–RN8. */
(function () {
  'use strict';
  var V = window.V, D = V.datos, N = D.negocio, t = V.t;
  var visor = null, diagramaActual = 'bpmn1', reglaActiva = null, caminoActivo = null;
  var ACT = {}; N.actividades.forEach(function (a) { ACT[a.k] = a; });
  var TRAZA = {}; D.trazabilidad.forEach(function (f) { if (f.act) TRAZA[f.act] = f; });

  function render(params) {
    if (params.bpmn && /^bpmn[123]$/.test(params.bpmn)) diagramaActual = params.bpmn;
    if (params.camino && V.estado.caminoCierre) diagramaActual = 'bpmn3';
    var E = N.procesos.filter(function (p) { return p.tipo === 'estrategico'; });
    var M = N.procesos.filter(function (p) { return p.tipo === 'misional'; });
    var S = N.procesos.filter(function (p) { return p.tipo === 'apoyo'; });
    function proc(p, cls) {
      return '<button type="button" class="proc ' + cls + '" data-detalle="' + p.id + '"><span><b>' + p.id + '</b> ' + t(p.nombre) + '</span><small>' + (p.capacidades[0] === 'todas' ? 'Todas las capacidades' : p.capacidades.join(', ')) + '</small></button>';
    }
    return V.cabecera({
      titulo: 'Arquitectura de negocio', semilla: 8, lamina: 'procesos',
      alt: 'Grabado técnico de una caldera industrial con manómetros, tuberías y una enredadera.',
      pregunta: '¿Qué trabajo hace la organización, quién lo hace y bajo qué reglas?',
      entrada: 'El proceso es el trabajo; las aplicaciones son solo herramientas. Del organigrama se baja a un mapa de catorce procesos y al detalle del ciclo de servicio en tres diagramas BPMN.',
      sumario: [['organigrama', 'Estructura'], ['mapa', 'Mapa de procesos'], ['flujo', 'Flujo de un cliente'], ['bpmn', 'Diagramas BPMN'], ['reglas', 'Reglas de negocio'], ['actores', 'Actores']]
    }) +
    '<section class="seccion" id="organigrama"><div class="contenido">' +
      '<h2>Estructura organizacional</h2>' +
      '<p class="intro">' + t(N.criterioAreas) + '</p>' +
      '<div class="organigrama revelar"><div class="org-gob">ASAMBLEA DE ACCIONISTAS<small>Junta Directiva · Comité de Impacto BIC</small></div>' +
        '<button type="button" class="org-ger btn" data-detalle="GER" style="border:0">Gerencia General y Estrategia</button>' +
        '<div class="org-areas">' + N.areas.filter(function (a) { return a.id !== 'GER'; }).map(function (a) {
          return '<button type="button" class="org-area" data-detalle="' + a.id + '"><strong>' + t(a.nombre) + '</strong>' + V.chips(a.capacidades) + '</button>';
        }).join('') + '</div></div>' +
    '</div></section>' +

    '<section class="seccion banda" id="mapa"><div class="contenido">' +
      '<h2>Mapa de procesos</h2>' +
      '<p class="intro">Tres procesos estratégicos fijan la dirección, cinco misionales forman la cadena de valor que entrega ahorro verificado y seis de apoyo sostienen a los demás. Debajo de cada proceso, la capacidad que realiza.</p>' +
      '<div class="mapa-procesos revelar"><div class="mapa-borde">' + t(N.mapaEntrada) + '</div><div class="mapa-bandas">' +
        '<div class="banda"><div class="banda-titulo">PROCESOS ESTRATÉGICOS</div><div class="banda-fila e">' + E.map(function (p) { return proc(p, 'e'); }).join('') + '</div></div>' +
        '<div class="banda"><div class="banda-titulo">PROCESOS MISIONALES · CADENA DE VALOR</div><div class="banda-fila m">' + M.map(function (p) { return proc(p, 'm'); }).join('') + '</div></div>' +
        '<div class="banda"><div class="banda-titulo">PROCESOS DE APOYO</div><div class="banda-fila s">' + S.map(function (p) { return proc(p, 's'); }).join('') + '</div></div>' +
      '</div><div class="mapa-borde">' + t(N.mapaSalida) + '</div></div>' +
      '<p class="nota" style="margin-top:1.2rem">' + t(N.notaMapa) + '</p>' +
    '</div></section>' +

    '<section class="seccion" id="flujo"><div class="contenido">' +
      '<h2>El flujo de un cliente</h2>' +
      '<p class="intro">Doce fases en tres etapas. El cliente no paga nada durante la incorporación. Duración del contrato: 3 a 5 años<sup class="p" title="Propuesta del equipo">P</sup>.</p>' +
      '<div class="fases-flujo revelar">' + (function () {
        var n = 0;
        return N.flujo.map(function (et) {
          return '<div class="etapa"><h3>' + t(et.etapa) + '</h3><ol start="' + (n + 1) + '">' + et.fases.map(function (f) { n++; return '<li>' + t(f) + '</li>'; }).join('') + '</ol><p>' + t(et.obtiene) + '</p></div>';
        }).join('');
      })() + '</div>' +
      '<p class="nota" style="margin-top:1.2rem"><strong>Decisiones del equipo (Corte III).</strong> ' + t(N.decisiones) + '</p>' +
    '</div></section>' +

    '<section class="seccion banda" id="bpmn"><div class="contenido">' +
      '<h2>Ciclo de servicio de eficiencia por desempeño</h2>' +
      '<p class="intro">Los mismos archivos BPMN 2.0 del documento, abiertos en un visor interactivo. Arrastra para moverte, usa la rueda o los botones para acercar y toca una tarea para ver su responsable, sus reglas y su trazabilidad.</p>' +
      '<div class="plancha">' +
        '<div class="plancha-barra"><div class="segmentado" role="group" aria-label="Diagrama">' + N.diagramas.map(function (d, k) {
          return '<button type="button" data-bpmn="' + d.id + '" aria-pressed="' + (d.id === diagramaActual) + '">' + (k < 2 ? 'Parte ' + (k + 1) + ' · ' : '') + t(d.titulo.split(':')[0]) + '</button>';
        }).join('') + '</div><span class="ayuda" id="bpmn-fases"></span>' + V.botonPantalla() + '</div>' +
        '<div class="bpmn-lienzo" id="lienzo"><div class="bpmn-cargando">Cargando el diagrama…</div>' +
          '<div class="bpmn-zoom"><button type="button" data-zoom="mas" aria-label="Acercar">' + V.icono('mas') + '</button><button type="button" data-zoom="menos" aria-label="Alejar">' + V.icono('menos') + '</button><button type="button" data-zoom="ajustar" aria-label="Ajustar a la pantalla">' + V.icono('ajustar') + '</button></div></div>' +
        '<div class="bpmn-leyenda"><span><i></i>Tarea</span><span><i class="lg-call"></i>Subproceso (actividad de llamada)</span><span><i class="lg-gw"></i>Compuerta</span><span><i class="lg-ev"></i>Evento</span><span><i class="lg-msg"></i>Flujo de mensaje</span><span><i class="lg-regla"></i>Regla resaltada</span><span><i class="lg-camino"></i>Camino que tomó el simulador</span></div>' +
        '<div class="leyenda" id="bpmn-texto"></div>' +
      '</div>' +
      '<div class="filtros" style="margin-top:1rem" role="group" aria-label="Resaltar una regla en el diagrama"><span class="etq-grupo">Resaltar regla:</span>' +
        N.reglas.map(function (r) { return '<button type="button" class="filtro" data-regla="' + r.id + '" aria-pressed="false" title="' + V.esc(r.texto) + '">' + r.id + '</button>'; }).join('') +
        '<a class="btn btn-claro btn-chico" id="bpmn-descarga" href="#" download style="margin-left:auto">' + V.icono('descarga') + 'Descargar .bpmn</a></div>' +
      '<p class="nota" style="margin-top:1rem">' + t(N.convenciones) + '</p>' +
      '<details class="plegable" style="margin-top:2rem"><summary><span>Actividades del diagrama <small id="actividades-n"></small></span></summary><div class="tabla-envoltura"><table class="tabla" id="tabla-actividades"></table></div></details>' +
    '</div></section>' +

    '<section class="seccion" id="reglas"><div class="contenido dos-col">' +
      '<div><h2>Reglas de negocio</h2><p class="intro">La arquitectura de negocio es proceso, actor y regla. Toca una regla para ver las actividades que la aplican; el botón «Resaltar» de cada ficha la marca en el diagrama.</p></div>' +
      '<div class="reglas-lista revelar">' + N.reglas.map(function (r) {
        return '<button type="button" class="regla" data-detalle="' + r.id + '"><b>' + r.id + '</b><span>' + t(r.texto) + '<small>' + t(r.origen) + '</small></span></button>';
      }).join('') + '</div>' +
    '</div></section>' +

    '<section class="seccion banda" id="actores"><div class="contenido">' +
      '<h2>Actores</h2><p class="intro">Los internos son áreas del organigrama y carriles del pool de VIRIDIA; los externos con proceso propio son pools separados.</p>' +
      '<div class="tabla-envoltura"><table class="tabla"><thead><tr><th>Actor</th><th>Tipo</th><th>Papel en la operación</th><th>Procesos</th></tr></thead><tbody>' +
        N.actores.map(function (a) { return '<tr><td><strong>' + t(a.nombre) + '</strong></td><td>' + a.tipo + '</td><td>' + t(a.papel) + '</td><td>' + V.chips(a.procesos) + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
    '</div></section>';
  }

  /* ---------- Visor BPMN ---------- */
  function cargarDiagrama(id) {
    diagramaActual = id;
    var d = V.porId(N.diagramas, id);
    V.$$('[data-bpmn]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-bpmn') === id)); });
    V.$('#bpmn-fases').textContent = d.fases + ' · ' + d.archivo;
    V.$('#bpmn-texto').innerHTML = '<span style="display:block;max-width:var(--medida)">' + t(d.texto) + '</span>';
    var dl = V.$('#bpmn-descarga'); dl.href = 'descargas/' + d.archivo; dl.setAttribute('download', d.archivo);
    tablaActividades(id);
    return visor.importXML(window.VIRIDIA_BPMN[id]).then(function () {
      var cv = visor.get('canvas');
      cv.zoom('fit-viewport', 'auto');
      V.$('#lienzo .bpmn-cargando') && V.$('#lienzo .bpmn-cargando').remove();
      visor.get('elementRegistry').forEach(function (el) {
        var k = id + ':' + el.id;
        if (ACT[k] || N.elementosDatos[k]) cv.addMarker(el.id, 'clicable');
        var tipo = tipoBpmn(el);
        if (tipo) cv.addMarker(el.id, tipo);
        if (el.type === 'bpmn:Participant' && /cliente/i.test(el.businessObject.name || '')) cv.addMarker(el.id, 't-cliente');
      });
      if (reglaActiva) marcarRegla(reglaActiva);
      if (caminoActivo && id === 'bpmn3') marcarCamino(caminoActivo);
    });
  }
  // Clase de color según el tipo de elemento BPMN (las reglas viven en viridia.css).
  function tipoBpmn(el) {
    var t = el.type;
    if (/Task$/.test(t)) return 't-tarea';
    if (t === 'bpmn:CallActivity' || t === 'bpmn:SubProcess') return 't-llamada';
    if (/Gateway$/.test(t)) return 't-compuerta';
    if (t === 'bpmn:EndEvent') return 't-fin';
    if (/Event$/.test(t)) return 't-evento';
    if (t === 'bpmn:Participant') return 't-pool';
    if (t === 'bpmn:Lane') return 't-carril';
    if (/Data(Store|Object)Reference$/.test(t)) return 't-dato';
    if (t === 'bpmn:SequenceFlow') return 't-flujo';
    if (t === 'bpmn:MessageFlow') return 't-mensaje';
    return null;
  }
  function reajustar() { if (visor) { var cv = visor.get('canvas'); cv.resized(); cv.zoom('fit-viewport', 'auto'); } }
  function limpiarMarcas(clase) {
    if (!visor) return;
    var cv = visor.get('canvas');
    visor.get('elementRegistry').forEach(function (el) { cv.removeMarker(el.id, clase); });
  }
  function marcarRegla(rn) {
    reglaActiva = rn;
    V.$$('[data-regla]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-regla') === rn)); });
    if (!visor) return;
    limpiarMarcas('con-regla');
    if (!rn) return;
    var cv = visor.get('canvas');
    visor.get('elementRegistry').forEach(function (el) {
      var a = ACT[diagramaActual + ':' + el.id];
      if (a && a.reglas.indexOf(rn) >= 0) cv.addMarker(el.id, 'con-regla');
    });
  }
  // Camino del simulador: nodos recorridos y los flujos de secuencia que los unen.
  function marcarCamino(c) {
    caminoActivo = c;
    if (!visor) return;
    var cv = visor.get('canvas'), reg = visor.get('elementRegistry');
    limpiarMarcas('camino');
    var nodos = {}; c.camino.concat(c.caminoCliente || [], c.caminoAjuste || []).forEach(function (id) { nodos[id] = true; });
    reg.forEach(function (el) {
      if (nodos[el.id]) cv.addMarker(el.id, 'camino');
      else if (el.type === 'bpmn:SequenceFlow' && el.source && el.target && nodos[el.source.id] && nodos[el.target.id]) cv.addMarker(el.id, 'camino');
    });
  }
  function tablaActividades(id) {
    var filas = N.actividades.filter(function (a) { return a.k.indexOf(id + ':') === 0; });
    V.$('#actividades-n').textContent = filas.length + ' elementos, con responsable y regla';
    V.$('#tabla-actividades').innerHTML = '<thead><tr><th>Actividad o decisión</th><th>Responsable (carril o pool)</th><th>Regla</th><th>Nota</th></tr></thead><tbody>' +
      filas.map(function (a) {
        return '<tr data-sel="' + a.k + '" tabindex="0"><td>' + (a.tipo === 'decision' ? '<span class="etq">decisión</span> ' : a.tipo === 'evento' ? '<span class="etq">evento</span> ' : '') + t(a.nombre) + '</td><td>' + t(a.responsable) + '</td><td>' + (a.reglas.length ? V.chips(a.reglas) : '—') + '</td><td>' + t(a.nota) + '</td></tr>';
      }).join('') + '</tbody>';
  }
  function abrirActividad(k) {
    var a = ACT[k], f = TRAZA[k], d = V.porId(N.diagramas, k.split(':')[0]);
    if (!a) return;
    var tipo = a.tipo === 'decision' ? 'Decisión (compuerta)' : a.tipo === 'evento' ? 'Evento de borde' : 'Actividad';
    var cuerpo = '<dl class="dl"><dt>Diagrama</dt><dd>' + t(d.titulo) + '</dd><dt>Responsable</dt><dd>' + t(a.responsable) + '</dd>' +
      '<dt>Reglas</dt><dd>' + (a.reglas.length ? V.chips(a.reglas) : '—') + '</dd><dt>Nota</dt><dd>' + t(a.nota) + '</dd></dl>' +
      (a.reglas.length ? V.h3('Qué dicen sus reglas') + V.lista(a.reglas.map(function (r) { return '<strong>' + r + '</strong> ' + t(V.porId(N.reglas, r).texto); })) : '');
    if (f) {
      cuerpo += V.h3('Trazabilidad de punta a punta') + '<dl class="dl"><dt>Entidades</dt><dd>' + V.chips(f.entidades) + '</dd><dt>Aplicaciones</dt><dd>' + V.chips(f.apps) + '</dd><dt>Nodos</dt><dd>' + V.chips(f.nodos) + '</dd>' +
        '<dt>Capacidades</dt><dd>' + V.chips(f.capacidades) + '</dd><dt>Objetivos</dt><dd>' + V.chips(f.objetivos) + '</dd><dt>Proyectos</dt><dd>' + V.chips(f.proyectos) + '</dd></dl>';
    }
    var pie = k === 'bpmn2:v_call' ? '<button class="btn btn-verde btn-chico" type="button" data-ir-bpmn="bpmn3">Abrir el subproceso de cierre mensual</button>' : '';
    if (k.indexOf('bpmn3:s_') === 0) pie += '<a class="btn btn-claro btn-chico" href="#/simulador">Simular el cierre mensual</a>';
    V.panel.abrir({ id: 'BPMN ' + k.charAt(4), tipo: tipo + ' · ' + a.responsable, titulo: a.nombre, cuerpo: cuerpo, pie: pie });
  }

  function montar(raiz, params) {
    reglaActiva = params.regla || null;
    caminoActivo = params.camino && V.estado.caminoCierre ? V.estado.caminoCierre : null;
    raiz.addEventListener('click', function (e) {
      var b = e.target.closest('[data-bpmn]'); if (b) { cargarDiagrama(b.getAttribute('data-bpmn')); return; }
      var r = e.target.closest('[data-regla]'); if (r) { var rn = r.getAttribute('data-regla'); marcarRegla(reglaActiva === rn ? null : rn); return; }
      var z = e.target.closest('[data-zoom]');
      if (z && visor) {
        var cv = visor.get('canvas'), acc = z.getAttribute('data-zoom');
        if (acc === 'ajustar') cv.zoom('fit-viewport', 'auto'); else cv.zoom(cv.zoom() * (acc === 'mas' ? 1.25 : 0.8));
        return;
      }
      var fila = e.target.closest('tr[data-sel]'); if (fila && !e.target.closest('a')) abrirActividad(fila.getAttribute('data-sel'));
    });
    raiz.addEventListener('keydown', function (e) {
      var fila = e.target.closest && e.target.closest('tr[data-sel]');
      if (fila && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); abrirActividad(fila.getAttribute('data-sel')); }
    });
    document.addEventListener('click', irSubproceso);
    document.addEventListener('fullscreenchange', reajustar);
    Promise.all([V.cargarScript('js/bpmn-xml.js'), V.cargarScript('vendor/bpmn-js/bpmn-navigated-viewer.production.min.js')]).then(function () {
      visor = new window.BpmnJS({
        container: '#lienzo',
        bpmnRenderer: { defaultFillColor: '#FFFFFF', defaultStrokeColor: '#1F2A2E', defaultLabelColor: '#1F2A2E' },
        textRenderer: { defaultStyle: { fontFamily: 'Lato, Segoe UI, sans-serif', fontSize: 12, lineHeight: 1.2 }, externalStyle: { fontSize: 11 } }
      });
      visor.on('element.click', function (ev) {
        var k = diagramaActual + ':' + ev.element.id, dato = N.elementosDatos[k];
        if (ACT[k]) abrirActividad(k);
        else if (dato) V.detalle(dato.app || dato.entidad);
      });
      return cargarDiagrama(diagramaActual);
    }).catch(function (err) {
      V.$('#lienzo').innerHTML = '<p class="bpmn-cargando">No se pudo abrir el visor BPMN (' + V.esc(err.message) + '). Los diagramas están en el documento final y en la carpeta descargas.</p>';
    });
    if (params.regla || params.camino) setTimeout(function () { V.$('#bpmn').scrollIntoView({ behavior: V.movimiento() ? 'smooth' : 'auto' }); }, 350);
  }
  function irSubproceso(e) {
    var b = e.target.closest('[data-ir-bpmn]');
    if (b) { V.panel.cerrar(); cargarDiagrama(b.getAttribute('data-ir-bpmn')); }
  }

  V.vistas.procesos = {
    titulo: 'Arquitectura de negocio', render: render, montar: montar,
    // Misma pantalla, otros parámetros (?bpmn=, ?regla=, ?camino=): cambia de diagrama sin recargar la vista.
    alCambiarParams: function (p) {
      if (p.camino && V.estado.caminoCierre) caminoActivo = V.estado.caminoCierre;
      var destino = /^bpmn[123]$/.test(p.bpmn || '') ? p.bpmn : p.camino ? 'bpmn3' : (p.regla === 'RN2' && diagramaActual === 'bpmn3' ? 'bpmn1' : null);
      var listo = visor && destino && destino !== diagramaActual ? cargarDiagrama(destino) : Promise.resolve();
      listo.then(function () {
        if (p.regla) marcarRegla(p.regla);
        if (caminoActivo && diagramaActual === 'bpmn3') marcarCamino(caminoActivo);
      });
      if (p.regla || p.camino || p.bpmn) V.$('#bpmn').scrollIntoView({ behavior: V.movimiento() ? 'smooth' : 'auto' });
    },
    desmontar: function () { document.removeEventListener('click', irSubproceso); document.removeEventListener('fullscreenchange', reajustar); if (visor) { visor.destroy(); visor = null; } }
  };
})();
