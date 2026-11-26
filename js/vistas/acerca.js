/* Acerca de: equipo, curso, declaración de uso de IA (documento y activo), descargas, fuentes y créditos. */
(function () {
  'use strict';
  var V = window.V, D = V.datos, M = D.meta, IA = D.declaracionIA, t = V.t;

  function descarga(href, titulo, detalle, icono, nombre) {
    return '<a class="descarga" href="' + href + '"' + (nombre ? ' download="' + nombre + '"' : ' target="_blank" rel="noopener"') + '>' + V.icono(icono) + '<strong>' + titulo + '</strong><span>' + detalle + '</span></a>';
  }
  function bloqueIA(titulo, o) {
    return '<div><h3>' + titulo + '</h3><dl class="dl"><dt>Herramientas</dt><dd>' + t(o.herramienta || o.herramientas) + '</dd><dt>Propósito</dt><dd>' + t(o.proposito) + '</dd><dt>Aporte del equipo</dt><dd>' + t(o.equipo) + '</dd><dt>Validación</dt><dd>' + t(o.validacion) + '</dd></dl></div>';
  }

  function render() {
    return V.cabecera({
      titulo: 'Acerca de este activo', semilla: 61, lamina: 'estrategia',
      alt: 'Grabado de una ceiba joven con sus raíces.',
      pregunta: M.entregable + '.',
      entrada: t(M.aviso),
      sumario: [['equipo', 'Equipo'], ['ia', 'Uso de IA'], ['descargas', 'Descargas'], ['fuentes', 'Fuentes'], ['creditos', 'Créditos']]
    }) +
    '<section class="seccion" id="equipo"><div class="contenido">' +
      '<h2>Equipo</h2>' +
      '<div class="equipo revelar">' + M.equipo.map(function (p) { return '<div class="persona"><strong>' + V.esc(p) + '</strong><span style="color:var(--texto-2);font-size:.92rem">' + V.esc(M.programa) + '</span></div>'; }).join('') + '</div>' +
      '<dl class="dl" style="margin-top:2rem;max-width:var(--medida)"><dt>Asignatura</dt><dd>' + V.esc(M.asignatura) + '</dd><dt>Docente</dt><dd>' + V.esc(M.docente) + '</dd><dt>Institución</dt><dd>' + V.esc(M.universidad) + '</dd><dt>Ciudad y fecha</dt><dd>' + V.esc(M.ciudad) + '</dd>' +
        '<dt>Documento</dt><dd>' + V.esc(M.documento) + '</dd><dt>Marcos</dt><dd>' + V.esc(M.marcos) + '</dd><dt>Identificadores</dt><dd>' + V.esc(M.convencion) + '</dd></dl>' +
      '<p class="nota" style="margin-top:1.4rem"><strong>Pregunta que responde.</strong> ' + V.esc(M.pregunta) + '</p>' +
    '</div></section>' +
    '<section class="seccion banda" id="ia"><div class="contenido">' +
      '<h2>Declaración de uso de inteligencia artificial</h2>' +
      '<div class="dos-col revelar">' + bloqueIA('Documento final (Producto 1)', IA.documento) + bloqueIA('Activo digital (Producto 2)', IA.activo) + '</div>' +
    '</div></section>' +
    '<section class="seccion" id="descargas"><div class="contenido">' +
      '<h2>Descargas</h2><p class="intro">El documento final y los archivos editables de sus diagramas. El archivo de datos del activo contiene todas las capas con los mismos identificadores.</p>' +
      '<div class="descargas revelar">' +
        descarga('descargas/VIRIDIA-AE-Final.pdf', 'Documento final de Arquitectura Empresarial', 'PDF · 71 páginas', 'documento') +
        descarga('descargas/VIRIDIA-BPMN-1-incorporacion.bpmn', 'BPMN parte 1: incorporación', 'BPMN 2.0 · Camunda, bpmn.io, Bizagi', 'descarga', 'VIRIDIA-BPMN-1-incorporacion.bpmn') +
        descarga('descargas/VIRIDIA-BPMN-2-operacion-y-cierre.bpmn', 'BPMN parte 2: operación y cierre', 'BPMN 2.0', 'descarga', 'VIRIDIA-BPMN-2-operacion-y-cierre.bpmn') +
        descarga('descargas/VIRIDIA-BPMN-3-cierre-mensual.bpmn', 'BPMN del cierre mensual', 'BPMN 2.0', 'descarga', 'VIRIDIA-BPMN-3-cierre-mensual.bpmn') +
        descarga('descargas/VIRIDIA-modelo-relacional.sql', 'Modelo relacional', 'SQL de PostgreSQL · 18 tablas', 'datos', 'VIRIDIA-modelo-relacional.sql') +
        descarga('descargas/MER-1-conceptual-Chen.pdf', 'MER conceptual (Chen)', 'PDF A3', 'documento') +
        descarga('descargas/MER-2-relacional.pdf', 'Modelo relacional (diagrama)', 'PDF A3', 'documento') +
        '<a class="descarga" href="#" id="descargar-json">' + V.icono('datos') + '<strong>Datos del activo</strong><span>viridia-ae.json · todas las capas</span></a>' +
      '</div>' +
    '</div></section>' +
    '<section class="seccion banda" id="fuentes"><div class="contenido">' +
      '<h2>Fuentes</h2><ol class="referencias revelar">' + D.referencias.map(function (r) {
        return '<li>' + V.esc(r.texto) + (r.url ? ' <a href="' + V.esc(r.url) + '" target="_blank" rel="noopener">Enlace</a>' : '') + '</li>';
      }).join('') + '</ol>' +
    '</div></section>' +
    '<section class="seccion" id="creditos"><div class="contenido">' +
      '<h2>Créditos técnicos</h2>' +
      '<ul style="padding-left:1.1rem;color:var(--texto-2);max-width:var(--medida)">' +
        '<li>Visor BPMN: <a href="https://bpmn.io" target="_blank" rel="noopener">bpmn-js</a> 18.30.0 (navigated viewer), © camunda Services GmbH, licencia de bpmn.io, incluido en <code>vendor/</code>.</li>' +
        '<li>Tipografías Lato e IBM Plex Mono, bajo SIL Open Font License, incluidas en <code>fonts/</code>.</li>' +
        '<li>Ocho láminas de grabado generadas con el generador de imágenes de Figma (gpt-image-2.5-flare) y convertidas en tinta transparente; prompts en <code>herramientas/prompts.json</code>.</li>' +
        '<li>Curvas de nivel generadas en el navegador (marching squares sobre un campo aleatorio con semilla fija). Sin servicios externos ni rastreo: el sitio funciona sin conexión.</li>' +
      '</ul>' +
      '<p class="nota" style="margin-top:1.2rem">' + t(D.conclusiones.limitaciones) + '</p>' +
    '</div></section>';
  }

  V.vistas.acerca = {
    titulo: 'Acerca de', render: render,
    montar: function (raiz) {
      V.$('#descargar-json', raiz).addEventListener('click', function (e) {
        e.preventDefault();
        var a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(D, null, 2)], { type: 'application/json' }));
        a.download = 'viridia-ae.json';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
      });
    }
  };
})();
