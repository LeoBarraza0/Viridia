/* Lectura de los archivos que el cliente entrega al simulador: el paquete .zip, las facturas en PDF,
   el histórico y la operación en Excel (.xlsx) y el CSV propio. Sin librerías: el .zip y el .xlsx se
   descomprimen con DecompressionStream y la hoja se lee con DOMParser. Las facturas en PDF de la
   comercializadora ilustrativa traen sus datos estructurados en los metadatos (/ViridiaFactura),
   como el XML que acompaña a una factura electrónica; un PDF sin esos datos se informa y se ignora. */
(function () {
  'use strict';
  var V = window.V;
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  var VARIABLES = { 'produccion': 'produccion', 'grados-dia de enfriamiento': 'cdd', 'noches-habitacion ocupadas': 'noches', 'horas de eventos en salones': 'eventos', 'volumen envasado': 'litros' };

  function sinTildes(s) { return String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim(); }
  function inflar(datos) {
    return new Response(new Blob([datos]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }
  // Recorre el directorio central del .zip (también sirve para el .xlsx, que es un .zip).
  async function descomprimir(bytes) {
    var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), fin = -1;
    for (var i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) if (dv.getUint32(i, true) === 0x06054b50) { fin = i; break; }
    if (fin < 0) throw new Error('no es un archivo comprimido válido');
    var n = dv.getUint16(fin + 10, true), p = dv.getUint32(fin + 16, true), salida = [];
    for (var k = 0; k < n; k++) {
      var metodo = dv.getUint16(p + 10, true), tam = dv.getUint32(p + 20, true);
      var lnom = dv.getUint16(p + 28, true), lext = dv.getUint16(p + 30, true), lcom = dv.getUint16(p + 32, true), off = dv.getUint32(p + 42, true);
      var nombre = new TextDecoder().decode(bytes.subarray(p + 46, p + 46 + lnom));
      var ini = off + 30 + dv.getUint16(off + 26, true) + dv.getUint16(off + 28, true), datos = bytes.subarray(ini, ini + tam);
      if (!/\/$/.test(nombre)) salida.push({ nombre: nombre, bytes: metodo === 8 ? await inflar(datos) : datos });
      p += 46 + lnom + lext + lcom;
    }
    return salida;
  }
  // Primera hoja de un .xlsx como matriz de valores (texto o número).
  async function leerXlsx(bytes) {
    var partes = {};
    (await descomprimir(bytes)).forEach(function (e) { partes[e.nombre] = e.bytes; });
    var xml = function (n) { return new DOMParser().parseFromString(partes[n] ? new TextDecoder().decode(partes[n]) : '<x/>', 'application/xml'); };
    var compartidas = [].map.call(xml('xl/sharedStrings.xml').getElementsByTagName('si'), function (si) { return si.textContent; });
    var filas = [];
    [].forEach.call(xml('xl/worksheets/sheet1.xml').getElementsByTagName('row'), function (row) {
      var fila = [];
      [].forEach.call(row.getElementsByTagName('c'), function (c) {
        var col = c.getAttribute('r').replace(/\d+/g, '').split('').reduce(function (a, ch) { return a * 26 + ch.charCodeAt(0) - 64; }, 0) - 1;
        var t = c.getAttribute('t'), v = c.getElementsByTagName('v')[0];
        fila[col] = t === 's' ? compartidas[Number(v.textContent)] : t === 'inlineStr' ? c.textContent : t === 'str' || t === 'b' ? (v ? v.textContent : '') : (v ? Number(v.textContent) : '');
      });
      filas[Number(row.getAttribute('r')) - 1] = fila;
    });
    return filas;
  }
  // «nov 25», «noviembre de 2025», «2025-11» o una fecha de Excel → «nov 25».
  function periodo(v) {
    if (typeof v === 'number' && v > 20000) { var d = new Date(Math.round((v - 25569) * 864e5)); return MESES[d.getUTCMonth()] + ' ' + String(d.getUTCFullYear()).slice(2); }
    var s = sinTildes(v), m;
    if ((m = s.match(/^([a-z]{3})[a-z]*\.?\s*(?:de\s*)?(\d{2}|\d{4})$/)) && MESES.indexOf(m[1]) >= 0) return m[1] + ' ' + m[2].slice(-2);
    if ((m = s.match(/^(\d{4})[-/](\d{1,2})$/))) return MESES[Number(m[2]) - 1] + ' ' + m[1].slice(2);
    return null;
  }
  function orden(p) { var x = p.split(' '); return Number(x[1]) * 12 + MESES.indexOf(x[0]); }
  function datosPDF(bytes) {
    var m = new TextDecoder('latin1').decode(bytes).match(/\/ViridiaFactura\s*\(((?:[^()\\]|\\[\s\S])*)\)/);
    if (!m) return null;
    // Cadena literal de PDF: los escritores pueden escapar caracteres (\075 es «=» en octal).
    var b64 = m[1].replace(/\\([0-7]{1,3})|\\([\s\S])/g, function (x, oct, ch) { return oct ? String.fromCharCode(parseInt(oct, 8)) : ch; }).replace(/\s+/g, '');
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(b64), function (c) { return c.charCodeAt(0); })));
  }
  // Una hoja con una tabla que empieza en «Periodo»: si trae consumo y CU es el histórico de facturación;
  // si no, es la operación (una columna por variable, «Nombre (unidad)»). Arriba van pares clave | valor.
  function interpretar(filas) {
    var h = filas.findIndex(function (f) { return f && sinTildes(f[0]) === 'periodo'; });
    if (h < 0) return null;
    var meta = {};
    for (var i = 0; i < h; i++) { var f = filas[i]; if (f && f[0] != null && f[1] != null && f[1] !== '') meta[sinTildes(f[0])] = f[1]; }
    var cab = filas[h].map(sinTildes), col = function (clave) { return cab.findIndex(function (c) { return c.indexOf(clave) === 0; }); };
    var datos = filas.slice(h + 1).filter(function (f) { return f && periodo(f[0]); });
    var iKwh = col('consumo'), iCu = col('cu');
    if (iKwh >= 0 && iCu >= 0) {
      return { tipo: 'facturas', filas: datos.map(function (f) {
        return { periodo: periodo(f[0]), kwh: Number(f[iKwh]), cu: Number(f[iCu]), numero: f[col('factura')], cuenta: String(meta.cuenta || ''), suscriptor: meta.suscriptor, uso: meta.uso, medidor: meta.medidor, contribucionPct: Number(meta['contribucion de solidaridad (%)'] || 0) };
      }) };
    }
    var variables = [];
    filas[h].forEach(function (texto, j) {
      if (!j || texto == null || texto === '') return;
      var m = String(texto).match(/^(.*?)\s*\(([^)]*)\)\s*$/), nombre = m ? m[1] : String(texto), clave = sinTildes(nombre);
      variables.push({ id: VARIABLES[clave] || (/cdd|grados/.test(clave) ? 'cdd' : 'v' + j), nombre: nombre, unidad: m ? m[2] : '', fuente: meta['fuente de ' + clave] || 'Archivo de operación', j: j });
    });
    return { tipo: 'operacion', variables: variables, filas: datos.map(function (f) { return { periodo: periodo(f[0]), valores: variables.map(function (v) { return Number(f[v.j]); }) }; }) };
  }

  /* Recibe una lista de File y devuelve lo que encontró: facturas por periodo (sin repetir y en orden),
     la operación, el CSV y los archivos que no pudo usar. */
  V.leerArchivos = async function (lista) {
    var entradas = [], r = { facturas: [], operacion: null, csv: null, ignorados: [], pdf: 0, excel: 0 };
    for (var f of Array.from(lista)) {
      var b = new Uint8Array(await f.arrayBuffer());
      if (/\.zip$/i.test(f.name)) entradas = entradas.concat(await descomprimir(b));
      else entradas.push({ nombre: f.name, bytes: b });
    }
    for (var e of entradas) {
      var nombre = e.nombre.split('/').pop();
      try {
        if (/\.pdf$/i.test(nombre)) {
          var d = datosPDF(e.bytes);
          if (d) { d.archivo = nombre; r.facturas.push(d); r.pdf++; } else r.ignorados.push(nombre + ' (no trae los datos de la factura)');
        } else if (/\.xlsx$/i.test(nombre)) {
          var hoja = interpretar(await leerXlsx(e.bytes));
          if (!hoja) r.ignorados.push(nombre + ' (no tiene una tabla que empiece en «Periodo»)');
          else if (hoja.tipo === 'facturas') { hoja.filas.forEach(function (x) { x.archivo = nombre; r.facturas.push(x); }); r.excel++; }
          else { hoja.archivo = nombre; r.operacion = hoja; r.excel++; }
        } else if (/\.(csv|txt)$/i.test(nombre)) r.csv = new TextDecoder().decode(e.bytes);
        else if (!/^(leeme|readme)/i.test(nombre)) r.ignorados.push(nombre);
      } catch (err) { r.ignorados.push(nombre + ' (' + err.message + ')'); }
    }
    var visto = {};
    r.facturas = r.facturas.filter(function (x) { return x.periodo && !visto[x.periodo] && (visto[x.periodo] = true); }).sort(function (a, b) { return orden(a.periodo) - orden(b.periodo); });
    return r;
  };
})();
