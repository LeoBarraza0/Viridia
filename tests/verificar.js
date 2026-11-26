/* Prueba de coherencia del activo digital. Uso: node tests/verificar.js
   1) El motor reproduce el ejemplo de cálculo del documento final y respeta RN1 y RN3.
   2) Los clientes ilustrativos se comportan como se declara (cumple / no cumple / descartado).
   3) Todos los identificadores del archivo de datos son coherentes entre capas y con el PDF.
   Sale con código 1 si algo falla (GitHub Actions no publica en ese caso). */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const raiz = path.join(__dirname, '..');
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['data/viridia-ae.js', 'data/clientes-ejemplo.js', 'js/motor.js']) {
  vm.runInContext(fs.readFileSync(path.join(raiz, f), 'utf8'), ctx, { filename: f });
}
const D = ctx.window.VIRIDIA_AE;
const CLIENTES = ctx.window.VIRIDIA_CLIENTES;
const M = ctx.window.MotorVIRIDIA;

let ok = 0;
const fallas = [];
function prueba(nombre, fn) {
  try { fn(); ok++; } catch (e) { fallas.push(nombre + '\n    ' + e.message); }
}
const cerca = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a} ≠ ${b}`);
const ids = (arr) => new Set(arr.map((x) => x.id));
const sub = (a, b, msg) => { for (const x of a) assert.ok(b.has(x), `${msg}: ${x} no existe`); };

/* ---------- 1. Motor contra el documento ---------- */
const ej = D.identidad.calculo.ejemplo;
const base = { a: ej.a, b: { produccion: ej.b, cdd: ej.c } };
const mesEj = { produccion: ej.produccion, cdd: ej.cdd };
const cierreEj = (extra) => M.cierre(Object.assign({ coef: base, mes: mesEj, real: ej.real, completitud: 98, ajuste: 0, participacion: ej.participacion, tarifa: ej.tarifa, factor: ej.factor }, extra));

prueba('Ejemplo del PDF (§1.10): 570.000 kWh, 75.000 kWh, 13,2 %, $59,7 M, $23,9 M, $35,8 M, 16,5 tCO2e', () => {
  const r = cierreEj({});
  assert.strictEqual(r.estado, 'factura');
  cerca(r.esperado, ej.esperado, 1e-6, 'esperado');
  cerca(r.ahorro, ej.ahorro, 1e-6, 'ahorro');
  cerca(Math.round(r.pct * 10) / 10, ej.pct, 1e-9, '% de reducción');
  cerca(r.pesos, ej.pesos, 1e-3, 'ahorro en pesos');
  cerca(r.factura, ej.factura, 1e-3, 'factura VIRIDIA');
  cerca(r.cliente, ej.cliente, 1e-3, 'lo que conserva el cliente');
  cerca(r.tco2e, ej.tco2e, 1e-9, 'tCO2e evitadas');
  assert.deepStrictEqual([...r.camino.slice(-2)], ['s_liq', 's_endF']); // copia: el arreglo viene de otro contexto vm
});
prueba('RN3: completitud de 94,9 % sin recuperar → periodo pendiente, no se calcula ahorro', () => {
  const r = cierreEj({ completitud: 94.9, recuperado: false });
  assert.strictEqual(r.estado, 'pendiente');
  assert.strictEqual(r.ahorro, null);
  assert.ok(r.camino.includes('s_pen') && !r.camino.includes('s_cal'));
});
prueba('RN3: 95 % exacto sí permite calcular', () => assert.strictEqual(cierreEj({ completitud: 95 }).estado, 'factura'));
prueba('RN3: datos recuperados del respaldo de 72 h → vuelve a validar y continúa', () => {
  const r = cierreEj({ completitud: 90, recuperado: true });
  assert.strictEqual(r.estado, 'factura');
  assert.strictEqual(r.camino.filter((x) => x === 's_val').length, 2);
});
prueba('RN1: ahorro negativo → reporte sin factura', () => {
  const r = cierreEj({ real: 585000 });
  assert.strictEqual(r.estado, 'sin_factura');
  assert.strictEqual(r.factura, 0);
  assert.ok(r.camino.includes('s_emi') && r.camino.includes('s_rvm'));
});
prueba('RN1: ahorro exactamente 0 → no se factura', () => assert.strictEqual(cierreEj({ real: 570000 }).estado, 'sin_factura'));
prueba('Ajuste no rutinario de +20.000 kWh se suma al ahorro y pasa por «Documentar y acordar»', () => {
  const r = cierreEj({ ajuste: 20000 });
  cerca(r.ahorro, 95000, 1e-6, 'ahorro con ajuste');
  assert.ok(r.camino.includes('s_doc'));
});
prueba('El modelo pide más meses que parámetros', () => {
  assert.throws(() => M.ajustar([1, 2, 3], [{ id: 'x', valores: [1, 2, 3] }, { id: 'y', valores: [3, 1, 2] }]));
});

/* ---------- 2. Clientes ilustrativos ---------- */
const cli = Object.fromEntries(CLIENTES.map((c) => [c.id, c]));
prueba('Planta de alimentos: la línea base registrada es la del PDF (120.000 + 0,45·P + 900·CDD) y cumple ASHRAE 14', () => {
  const c = cli.alimentos;
  const aj = M.ajustar(c.kwh, M.columnasDe(c, c.modelo));
  assert.deepStrictEqual(JSON.parse(JSON.stringify(aj.registrado)), { a: 120000, b: { produccion: 0.45, cdd: 900 } });
  assert.ok(aj.cumple, `CV(RMSE) ${aj.cvrmse.toFixed(2)} %`);
  const r = M.cierre({ coef: aj.registrado, mes: c.mesReporte, real: c.mesReporte.real, completitud: c.mesReporte.completitud, ajuste: 0, participacion: 0.4, tarifa: c.mesReporte.tarifa, factor: 0.22 });
  cerca(r.esperado, 570000, 1e-6, 'esperado del mes de reporte');
});
prueba('Planta de alimentos: hay potencial de ahorro (≥ 8 %)', () => {
  const p = M.prefactibilidad(cli.alimentos);
  assert.ok(p.hayPotencial && p.pct >= 8 && p.pct <= 22, `potencial ${p.pct.toFixed(1)} %`);
});
prueba('Hotel: con dos variables no cumple ASHRAE 14; al agregar la tercera sí', () => {
  const c = cli.hotel;
  const dos = M.ajustar(c.kwh, M.columnasDe(c, ['noches', 'cdd']));
  const tres = M.ajustar(c.kwh, M.columnasDe(c, ['noches', 'cdd', 'eventos']));
  assert.ok(!dos.cumple, `con dos variables CV(RMSE) ${dos.cvrmse.toFixed(2)} %`);
  assert.ok(tres.cumple, `con tres variables CV(RMSE) ${tres.cvrmse.toFixed(2)} %`);
  assert.ok(M.prefactibilidad(c).hayPotencial);
});
prueba('Embotelladora: sin potencial suficiente → prospecto descartado', () => {
  const p = M.prefactibilidad(cli.bebidas);
  assert.ok(!p.hayPotencial, `potencial ${p.pct.toFixed(1)} %`);
});
prueba('Cada cliente tiene 12 meses completos en todas sus series', () => {
  for (const c of CLIENTES) {
    assert.strictEqual(c.kwh.length, 12, c.id);
    assert.strictEqual(c.tarifa.length, 12, c.id);
    c.variables.forEach((v) => assert.strictEqual(v.valores.length, 12, `${c.id}.${v.id}`));
    c.modelo.forEach((id) => assert.ok(c.variables.some((v) => v.id === id), `${c.id}: modelo usa ${id}`));
  }
});

/* ---------- 3. Coherencia de identificadores ---------- */
const OE = ids(D.estrategia.objetivos);
const C = ids(D.estrategia.capacidades);
const PROC = ids(D.negocio.procesos);
const RN = ids(D.negocio.reglas);
const ENT = ids(D.informacion.entidades);
const A = ids(D.aplicaciones.apps);
const EXT = ids(D.aplicaciones.externos);
const MEC = ids(D.aplicaciones.mecanismos);
const I = ids(D.aplicaciones.integraciones);
const T = ids(D.tecnologia.nodos);
const R = ids(D.tecnologia.riesgos);
const B = ids(D.transformacion.brechas);
const P = ids(D.transformacion.proyectos);
const ACT = new Set(D.negocio.actividades.map((a) => a.k));

prueba('Cantidades del PDF: 5 OE, 10 C, 14 procesos, 8 RN, 18 tablas (15 entidades), 21 relaciones, 10 A, 16 I, 16 T, 8 R, 14 B, 12 P, 6 H, 17 filas de trazabilidad', () => {
  const n = { OE: OE.size, C: C.size, PROC: PROC.size, RN: RN.size, TABLAS: ENT.size, R: R.size, B: B.size, P: P.size, A: A.size, I: I.size, T: T.size };
  assert.deepStrictEqual(n, { OE: 5, C: 10, PROC: 14, RN: 8, TABLAS: 18, R: 8, B: 14, P: 12, A: 10, I: 16, T: 16 });
  assert.strictEqual(D.informacion.entidades.filter((e) => e.tipo === 'fuerte' || e.tipo === 'debil').length, 15);
  assert.strictEqual(D.informacion.entidades.filter((e) => e.tipo === 'debil').length, 2);
  assert.strictEqual(D.informacion.relaciones.length, 21);
  assert.strictEqual(D.informacion.relaciones.filter((r) => r.card === 'N:M').length, 1);
  assert.strictEqual(D.transformacion.hitos.length, 6);
  assert.strictEqual(D.trazabilidad.length, 17);
  const tipos = D.negocio.procesos.reduce((m, p) => (m[p.tipo] = (m[p.tipo] || 0) + 1, m), {});
  assert.deepStrictEqual(tipos, { estrategico: 3, misional: 5, apoyo: 6 });
});
prueba('Matriz de cobertura: totales 6/5/2/4/3 = 20, sin capacidad huérfana ni objetivo sin relación principal', () => {
  const tot = { OE1: 0, OE2: 0, OE3: 0, OE4: 0, OE5: 0 };
  const principal = new Set();
  for (const c of D.estrategia.capacidades) {
    assert.ok(Object.keys(c.oe).length > 0, `${c.id} huérfana`);
    for (const [oe, tipo] of Object.entries(c.oe)) {
      assert.ok(OE.has(oe) && (tipo === 'P' || tipo === 'S'), `${c.id}→${oe}`);
      tot[oe]++;
      if (tipo === 'P') principal.add(oe);
    }
  }
  assert.deepStrictEqual(tot, { OE1: 6, OE2: 5, OE3: 2, OE4: 4, OE5: 3 });
  assert.strictEqual(principal.size, 5);
});
prueba('Procesos, áreas y actores apuntan a capacidades y procesos existentes', () => {
  for (const p of D.negocio.procesos) p.capacidades.forEach((c) => assert.ok(c === 'todas' || C.has(c), `${p.id}: ${c}`));
  for (const a of D.negocio.areas) sub(a.capacidades, C, a.id);
  for (const a of D.negocio.actores) sub(a.procesos, PROC, a.nombre);
  const cubiertas = new Set(D.negocio.areas.filter((a) => a.id !== 'GER').flatMap((a) => a.capacidades));
  assert.strictEqual(cubiertas.size, 10, 'cada capacidad tiene al menos un área responsable');
});
prueba('Actividades BPMN: claves únicas, reglas existentes, elementos de datos válidos', () => {
  assert.strictEqual(ACT.size, D.negocio.actividades.length, 'claves repetidas');
  for (const a of D.negocio.actividades) {
    assert.ok(/^bpmn[123]:/.test(a.k), a.k);
    sub(a.reglas, RN, a.k);
  }
  for (const [k, v] of Object.entries(D.negocio.elementosDatos)) {
    if (v.app) assert.ok(A.has(v.app), k);
    if (v.entidad) assert.ok(ENT.has(v.entidad), k);
  }
  for (const r of RN) assert.ok(D.negocio.actividades.some((a) => a.reglas.includes(r)), `ninguna actividad aplica ${r}`);
});
prueba('MER: relaciones entre entidades existentes; cada entidad la usa al menos una aplicación', () => {
  for (const r of D.informacion.relaciones) assert.ok(ENT.has(r.de) && ENT.has(r.a), `${r.de} ${r.verbo} ${r.a}`);
  const usadas = new Set(D.aplicaciones.apps.flatMap((a) => a.datos));
  for (const e of ENT) assert.ok(usadas.has(e) || D.aplicaciones.crud[e], `${e} sin aplicación`);
});
prueba('CRUD: un solo sistema de registro por entidad (excepciones del PDF: LECTURA y ALERTA) y coherente con el catálogo', () => {
  for (const [ent, fila] of Object.entries(D.aplicaciones.crud)) {
    assert.ok(ENT.has(ent), ent);
    sub(Object.keys(fila), A, ent);
    const creadores = Object.keys(fila).filter((app) => fila[app].includes('C'));
    const esperado = ent === 'LECTURA' || ent === 'ALERTA' ? 2 : 1;
    assert.strictEqual(creadores.length, esperado, `${ent}: creadores ${creadores}`);
  }
  assert.strictEqual(Object.keys(D.aplicaciones.crud).length, 18);
  for (const app of D.aplicaciones.apps) {
    for (const e of app.datos) assert.ok(D.aplicaciones.crud[e] && D.aplicaciones.crud[e][app.id], `${app.id} usa ${e} pero no aparece en la matriz CRUD`);
  }
});
prueba('Integraciones: origen, destino y vía existen; cada aplicación tiene las integraciones del catálogo', () => {
  const extremos = new Set([...A, ...EXT]);
  for (const i of D.aplicaciones.integraciones) {
    assert.ok(extremos.has(i.de), `${i.id} de ${i.de}`);
    sub(i.a, extremos, i.id);
    assert.ok(MEC.has(i.via), `${i.id} vía ${i.via}`);
  }
  const catalogo = { A1: 'I1', A2: 'I1 I2 I9 I10 I11', A3: 'I2 I3 I8', A4: 'I3 I4 I6 I7 I13 I16', A5: 'I7 I8 I9', A6: 'I12 I13 I14 I15', A7: 'I4 I5 I14', A8: 'I11 I12', A9: 'I15 I16' };
  for (const [app, lista] of Object.entries(catalogo)) {
    const derivadas = D.aplicaciones.integraciones.filter((i) => i.de === app || i.a.includes(app)).map((i) => i.id).join(' ');
    assert.strictEqual(derivadas, lista, app);
  }
});
prueba('Nodos: T5, T6 y T7 transportan exactamente las integraciones de su mecanismo; lo alojado existe', () => {
  const porVia = (via) => D.aplicaciones.integraciones.filter((i) => i.via === via).map((i) => i.id).join(' ');
  const nodo = (id) => D.tecnologia.nodos.find((n) => n.id === id);
  assert.strictEqual(nodo('T5').aloja.join(' '), porVia('GW'));
  assert.strictEqual(nodo('T6').aloja.join(' '), porVia('BUS'));
  assert.strictEqual(nodo('T7').aloja.join(' '), porVia('SFTP'));
  const alojables = new Set([...A, ...I]);
  for (const n of D.tecnologia.nodos) sub(n.aloja, alojables, n.id);
  for (const app of D.aplicaciones.apps) app.nodos.forEach((x) => assert.ok(x === 'SaaS' || T.has(x), `${app.id}: ${x}`));
  for (const s of D.tecnologia.seguridad) sub(s.nodos, T, s.capa);
});
prueba('Riesgos: nivel inherente = P × I', () => {
  for (const r of D.tecnologia.riesgos) assert.strictEqual(r.inherente, r.p * r.i, r.id);
});
prueba('Brechas y proyectos se cierran en ambos sentidos; dependencias y fases válidas', () => {
  for (const b of D.transformacion.brechas) {
    for (const x of b.afecta) assert.ok(C.has(x) || OE.has(x), `${b.id} afecta ${x}`);
    for (const p of b.proyectos) {
      const pr = D.transformacion.proyectos.find((y) => y.id === p);
      assert.ok(pr && pr.cierra.includes(b.id), `${b.id} dice que la cierra ${p}, pero ${p} no la lista`);
    }
  }
  for (const p of D.transformacion.proyectos) {
    sub(p.depende, P, p.id);
    for (const b of p.cierra) assert.ok(D.transformacion.brechas.find((x) => x.id === b).proyectos.includes(p.id), `${p.id} cierra ${b}, pero ${b} no lo lista`);
    const f = D.transformacion.fases[p.fase - 1];
    assert.ok(p.ini >= f.ini && p.fin <= f.fin + 1 && p.ini < p.fin, `${p.id} fuera de su fase`);
  }
  assert.strictEqual(D.transformacion.proyectos.filter((p) => p.cierra.length).length, 10, 'los diez primeros cierran brechas');
});
prueba('Trazabilidad: todo existe; los 5 OE aparecen; 9 de 10 capacidades (C10 lo cubre P10); A10, T13 y T14 sirven a todas', () => {
  const nodos = new Set([...T, 'SaaS']);
  for (const f of D.trazabilidad) {
    sub(f.entidades, ENT, f.actividad); sub(f.apps, A, f.actividad); sub(f.nodos, nodos, f.actividad);
    sub(f.capacidades, C, f.actividad); sub(f.objetivos, OE, f.actividad); sub(f.proyectos, P, f.actividad);
    if (f.act) assert.ok(ACT.has(f.act), `${f.actividad}: ${f.act}`);
  }
  const en = (campo) => new Set(D.trazabilidad.flatMap((f) => f[campo]));
  assert.strictEqual(en('objetivos').size, 5);
  const caps = en('capacidades');
  assert.strictEqual(caps.size, 9);
  assert.ok(!caps.has('C10'));
  assert.ok(D.transformacion.proyectos.find((p) => p.id === 'P10').cierra.includes('B5'));
  const apps = en('apps'); apps.add('A10');
  assert.strictEqual(apps.size, 10);
  const ns = en('nodos'); ns.delete('SaaS'); ns.add('T13'); ns.add('T14');
  // T15 no aparece en ninguna fila: respalda a T10, T11 y T12 (nota para el .tex: el PDF afirma que aparecen los 16).
  assert.ok(!ns.has('T15') && ['T10', 'T11', 'T12'].every((t) => ns.has(t)));
  assert.strictEqual(ns.size, 15);
});

/* ---------- 4. Facturas ficticias que lee el simulador ---------- */
prueba('Facturas ficticias: lecturas, CU, valor y contribución cuadran con lo que analiza el motor', () => {
  for (const c of CLIENTES) {
    const f = M.analizarFacturas(c);
    let anterior = null;
    c.kwh.forEach((kwh, i) => {
      const x = M.factura(c, i), y = M.factura(c, i);
      assert.deepStrictEqual(JSON.stringify(x), JSON.stringify(y), `${c.id} ${i}: no es determinista`);
      assert.strictEqual(x.actualActiva - x.anteriorActiva, kwh, `${c.id} ${i}: lecturas ≠ consumo`);
      if (anterior !== null) assert.strictEqual(x.anteriorActiva, anterior, `${c.id} ${i}: la lectura anterior no continúa la del mes previo`);
      anterior = x.actualActiva;
      assert.strictEqual(x.partes.reduce((s, p) => s + p[1], 0), c.tarifa[i], `${c.id} ${i}: componentes ≠ CU`);
      assert.strictEqual(x.valor, f.valor[i], `${c.id} ${i}: valor ≠ kWh × tarifa`);
      cerca(x.contribucion, x.valor * c.factura.contribucion / 100, 1e-6, `${c.id} ${i}: contribución`);
      assert.ok(x.fp > 0.9 && x.fp < 1, `${c.id} ${i}: factor de potencia ${x.fp}`);
      cerca(x.total, x.valor + x.contribucion + x.cargoReactiva, 1e-6, `${c.id} ${i}: total`);
    });
  }
  assert.strictEqual(CLIENTES.find((c) => c.id === 'hotel').factura.contribucion, 20);
});

/* ---------- Resultado ---------- */
const total = ok + fallas.length;
if (fallas.length) {
  console.error(`✗ ${fallas.length} de ${total} comprobaciones fallaron:\n`);
  fallas.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`✓ ${ok} comprobaciones superadas: el simulador reproduce el PDF y los identificadores son coherentes.`);
