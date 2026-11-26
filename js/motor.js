/* Motor de cálculo de VIRIDIA: el «backend» del simulador.
   Funciones puras, sin DOM: las usa la pantalla Simulador y las prueba tests/verificar.js.
   Métodos del documento final (§1.10 y BPMN del cierre mensual):
   - Línea base por regresión E = a + b·X1 + c·X2 (+ d·X3), aceptada con ASHRAE Guideline 14
     para datos mensuales: CV(RMSE) ≤ 15 % y NMBE dentro de ±5 %.
   - Ahorro = E ajustada − E real ± ajustes no rutinarios; % = Ahorro / E ajustada × 100.
   - RN3: sin 95 % de completitud no se calcula. RN1: sin ahorro positivo no se factura. */
(function (raiz) {
  'use strict';

  var UMBRAL = { cvrmse: 15, nmbe: 5, completitud: 95, potencialMin: 8, potencialMax: 22 };

  function suma(v) { var s = 0; for (var i = 0; i < v.length; i++) s += v[i]; return s; }
  function promedio(v) { return suma(v) / v.length; }
  function desviacion(v, m) {
    var s = 0; for (var i = 0; i < v.length; i++) s += (v[i] - m) * (v[i] - m);
    return Math.sqrt(s / v.length);
  }

  // Resuelve A·x = g (eliminación de Gauss con pivoteo parcial). A es k×k.
  function resolver(A, g) {
    var k = g.length, M = A.map(function (fila, i) { return fila.concat([g[i]]); });
    for (var c = 0; c < k; c++) {
      var piv = c;
      for (var f = c + 1; f < k; f++) if (Math.abs(M[f][c]) > Math.abs(M[piv][c])) piv = f;
      if (Math.abs(M[piv][c]) < 1e-12) throw new Error('Las variables elegidas son colineales: no se puede ajustar el modelo.');
      var t = M[c]; M[c] = M[piv]; M[piv] = t;
      for (f = c + 1; f < k; f++) {
        var r = M[f][c] / M[c][c];
        for (var j = c; j <= k; j++) M[f][j] -= r * M[c][j];
      }
    }
    var x = new Array(k);
    for (var i = k - 1; i >= 0; i--) {
      var s = M[i][k];
      for (j = i + 1; j < k; j++) s -= M[i][j] * x[j];
      x[i] = s / M[i][i];
    }
    return x;
  }

  /* Ajusta y = a + Σ b_j·x_j por mínimos cuadrados.
     columnas: [{id, valores:[...]}, ...]. Devuelve coeficientes, ajuste y métricas ASHRAE 14. */
  function ajustar(y, columnas) {
    var n = y.length, k = columnas.length, p = k + 1;
    if (n <= p) throw new Error('Se necesitan más meses (' + n + ') que parámetros del modelo (' + p + ').');
    columnas.forEach(function (c) {
      if (c.valores.length !== n) throw new Error('La variable «' + c.id + '» no tiene ' + n + ' valores.');
    });
    var ym = promedio(y);
    var b = [];
    if (k > 0) {
      // Variables estandarizadas para que la producción (~10^5) y los CDD (~10^2) no desequilibren el sistema.
      var med = columnas.map(function (c) { return promedio(c.valores); });
      var de = columnas.map(function (c, j) { return desviacion(c.valores, med[j]) || 1; });
      var Z = columnas.map(function (c, j) { return c.valores.map(function (v) { return (v - med[j]) / de[j]; }); });
      var A = Z.map(function (zi) { return Z.map(function (zj) { var s = 0; for (var t = 0; t < n; t++) s += zi[t] * zj[t]; return s; }); });
      var g = Z.map(function (zi) { var s = 0; for (var t = 0; t < n; t++) s += zi[t] * (y[t] - ym); return s; });
      b = resolver(A, g).map(function (bz, j) { return bz / de[j]; });
      var a = ym - suma(b.map(function (bj, j) { return bj * med[j]; }));
    } else {
      a = ym;
    }
    var pred = y.map(function (_, t) { var s = a; for (var j = 0; j < k; j++) s += b[j] * columnas[j].valores[t]; return s; });
    var resid = y.map(function (v, t) { return v - pred[t]; });
    var sse = suma(resid.map(function (r) { return r * r; }));
    var sst = suma(y.map(function (v) { return (v - ym) * (v - ym); }));
    var cvrmse = 100 * Math.sqrt(sse / (n - p)) / ym;
    var nmbe = 100 * suma(resid) / ((n - p) * ym);
    var coef = { a: a, b: {} };
    columnas.forEach(function (c, j) { coef.b[c.id] = b[j]; });
    return {
      coef: coef,
      registrado: registrar(coef),
      pred: pred, resid: resid,
      r2: sst > 0 ? 1 - sse / sst : 0,
      cvrmse: cvrmse, nmbe: nmbe, n: n, p: p,
      cumpleCv: cvrmse <= UMBRAL.cvrmse,
      cumpleNmbe: Math.abs(nmbe) <= UMBRAL.nmbe,
      cumple: cvrmse <= UMBRAL.cvrmse && Math.abs(nmbe) <= UMBRAL.nmbe
    };
  }

  // La versión 1 de la línea base se registra con 4 cifras significativas por coeficiente.
  function registrar(coef) {
    var r = function (x) { return Number(Number(x).toPrecision(4)); };
    var out = { a: r(coef.a), b: {} };
    Object.keys(coef.b).forEach(function (id) { out.b[id] = r(coef.b[id]); });
    return out;
  }

  function evaluar(coef, valores) {
    var e = coef.a;
    Object.keys(coef.b).forEach(function (id) {
      if (typeof valores[id] !== 'number' || isNaN(valores[id])) throw new Error('Falta el valor de «' + id + '» del mes.');
      e += coef.b[id] * valores[id];
    });
    return e;
  }

  function columnasDe(cliente, ids) {
    return ids.map(function (id) {
      var v = cliente.variables.filter(function (x) { return x.id === id; })[0];
      if (!v) throw new Error('Variable desconocida: ' + id);
      return { id: v.id, valores: v.valores };
    });
  }

  /* Lectura de las facturas: lo que el comercial puede decir solo con las facturas y la producción. */
  function analizarFacturas(cliente) {
    var kwh = cliente.kwh, tar = cliente.tarifa;
    var valor = kwh.map(function (e, i) { return e * tar[i]; });
    var totalKwh = suma(kwh), totalValor = suma(valor);
    var prod = cliente.variables[0].valores;
    var espec = kwh.map(function (e, i) { return e / prod[i]; });
    var me = promedio(espec);
    var imax = kwh.indexOf(Math.max.apply(null, kwh)), imin = kwh.indexOf(Math.min.apply(null, kwh));
    var tmax = Math.max.apply(null, tar), tmin = Math.min.apply(null, tar);
    return {
      valor: valor, totalKwh: totalKwh, totalValor: totalValor,
      promedioMes: totalKwh / kwh.length,
      tarifaPromedio: totalValor / totalKwh, tarifaMax: tmax, tarifaMin: tmin,
      variacionTarifa: 100 * (tmax - tmin) / tmax,
      especifico: espec, especificoPromedio: me,
      variabilidadEspecifico: 100 * desviacion(espec, me) / me,
      mesMayor: imax, mesMenor: imin
    };
  }

  /* Factura ficticia de energía de un mes (la que «lee» el simulador). Determinista: la semilla sale del
     cliente, así la demostración y las pruebas siempre coinciden. Lecturas acumuladas con factor 1,
     reactiva entre el 30 % y el 35 % de la activa, CU repartido en sus componentes y contribución
     del 20 % salvo que el uso sea exento. El valor de la energía es kWh × CU, como en analizarFacturas. */
  var PARTES_CU = [['G', 0.44], ['T', 0.06], ['D', 0.27], ['Cv', 0.09], ['PR', 0.10], ['R', 0.04]];
  function semilla(txt) {
    var h = 2166136261;
    for (var k = 0; k < txt.length; k++) { h ^= txt.charCodeAt(k); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function factura(cliente, i) {
    var d = cliente.factura, h = semilla(cliente.id), s = h;
    var azar = function () { s = (s + 0x6D2B79F5) | 0; var t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    var reactiva = cliente.kwh.map(function (e) { return Math.round(e * (0.30 + 0.05 * azar())); });
    var antA = d.lecturaInicial + suma(cliente.kwh.slice(0, i)), antR = d.lecturaInicialReactiva + suma(reactiva.slice(0, i));
    var kwh = cliente.kwh[i], cu = cliente.tarifa[i];
    var partes = PARTES_CU.map(function (p) { return [p[0], Math.round(cu * p[1])]; });
    partes[0][1] += cu - suma(partes.map(function (p) { return p[1]; })); // el redondeo lo absorbe G
    var valor = kwh * cu, contribucion = valor * d.contribucion / 100;
    var cargoReactiva = Math.max(0, reactiva[i] - 0.5 * kwh) * cu;
    return {
      numero: d.prefijo + '-' + (104200 + (h % 700) * 12 + i),
      anteriorActiva: antA, actualActiva: antA + kwh, kwh: kwh,
      anteriorReactiva: antR, actualReactiva: antR + reactiva[i], kvarh: reactiva[i],
      fp: kwh / Math.sqrt(kwh * kwh + reactiva[i] * reactiva[i]),
      cu: cu, partes: partes, valor: valor, contribucion: contribucion, cargoReactiva: cargoReactiva,
      total: valor + contribucion + cargoReactiva
    };
  }

  /* Prefactibilidad (BPMN parte 1, «¿Hay potencial de ahorro?»). Regla ilustrativa del simulador:
     el potencial es lo que la planta dejaría de consumir si operara todos los meses como en sus
     tres mejores meses, una vez descontado lo que explican la producción y el clima. Hay potencial
     si alcanza el mínimo que VIRIDIA compromete en energía (8 %). Solo estima: no compromete cifras (RN2). */
  function prefactibilidad(cliente, factor) {
    factor = factor || 0.22;
    var ids = cliente.variables.map(function (v) { return v.id; });
    var aj = ajustar(cliente.kwh, columnasDe(cliente, ids));
    var rel = cliente.kwh.map(function (e, i) { return (e - aj.pred[i]) / aj.pred[i]; });
    var orden = rel.map(function (r, i) { return i; }).sort(function (x, y) { return rel[x] - rel[y]; });
    var mejores = orden.slice(0, 3);
    var mejor = promedio(mejores.map(function (i) { return rel[i]; }));
    var objetivo = aj.pred.map(function (p) { return p * (1 + mejor); });
    var exceso = cliente.kwh.map(function (e, i) { return Math.max(0, e - objetivo[i]); });
    var ahorroKwh = suma(exceso);
    var pct = 100 * ahorroKwh / suma(cliente.kwh);
    var pesos = suma(exceso.map(function (x, i) { return x * cliente.tarifa[i]; }));
    var hay = pct >= UMBRAL.potencialMin;
    return {
      ajuste: aj, relativo: rel, mejores: mejores, objetivo: objetivo,
      ahorroKwh: ahorroKwh, pct: pct, pesos: pesos,
      ingresoViridia: pesos * 0.40, tco2e: ahorroKwh / 1000 * factor,
      hayPotencial: hay,
      comprometibleMax: hay ? Math.min(UMBRAL.potencialMax, Math.floor(pct)) : null
    };
  }

  /* Cierre mensual (BPMN «Cierre mensual: cálculo y facturación del ahorro verificado»).
     Devuelve el estado final, los valores y el camino de elementos del BPMN que recorrió. */
  function cierre(o) {
    var camino = ['s_s', 's_con', 's_m1', 's_val', 's_g95'];
    var cliente = ['c_s', 'c_rev', 'c_gw'];
    var r = { camino: camino, caminoCliente: cliente, esperado: null, ahorro: null, pct: null, pesos: 0, factura: 0, cliente: 0, tco2e: 0 };
    var completitud = Number(o.completitud);
    if (isNaN(completitud) || completitud < 0 || completitud > 100) throw new Error('La completitud debe estar entre 0 y 100 %.');
    if (completitud < UMBRAL.completitud) {
      camino.push('s_rec', 's_gdc');
      if (!o.recuperado) {
        camino.push('s_pen', 's_penE');
        cliente.push('c_endN');
        r.estado = 'pendiente';
        return r;
      }
      camino.push('s_m1', 's_val', 's_g95');
      r.recuperado = true;
    }
    camino.push('s_eva', 's_gnr');
    var ajusteNR = Number(o.ajuste) || 0;
    if (ajusteNR !== 0) {
      camino.push('s_doc');
      r.caminoAjuste = ['c_ajS', 'c_aj', 'c_ajE'];
    }
    camino.push('s_m2', 's_cal', 's_emi', 's_gah');
    r.esperado = evaluar(o.coef, o.mes);
    r.ahorro = r.esperado - Number(o.real) + ajusteNR;
    r.pct = 100 * r.ahorro / r.esperado;
    if (r.ahorro > 0) {
      r.pesos = r.ahorro * o.tarifa;
      r.factura = r.pesos * o.participacion;
      r.cliente = r.pesos - r.factura;
      r.tco2e = r.ahorro / 1000 * o.factor;
      camino.push('s_liq', 's_endF');
      cliente.push('c_pay', 'c_endP');
      r.estado = 'factura';
    } else {
      camino.push('s_rvm', 's_endS');
      cliente.push('c_endN');
      r.estado = 'sin_factura';
    }
    return r;
  }

  var Motor = {
    UMBRAL: UMBRAL, ajustar: ajustar, registrar: registrar, evaluar: evaluar,
    columnasDe: columnasDe, analizarFacturas: analizarFacturas, factura: factura,
    prefactibilidad: prefactibilidad, cierre: cierre
  };
  raiz.MotorVIRIDIA = Motor;
  if (typeof module !== 'undefined' && module.exports) module.exports = Motor;
})(typeof window !== 'undefined' ? window : this);
