"""Genera los paquetes de prueba del simulador, uno por cliente ilustrativo:
  - 12 facturas en PDF, impresas en Edge con la misma plantilla del sitio (V.facturaHTML). Cada PDF lleva
    sus datos estructurados en los metadatos (/ViridiaFactura, JSON en base64), como el XML que acompaña
    a una factura electrónica: así el simulador las lee sin OCR.
  - historico-facturacion.xlsx: los mismos 12 meses como los exportaría el portal de la comercializadora.
  - operacion.xlsx: producción (o noches, eventos, volumen) y clima de cada mes.
Todo es ficticio y así lo dicen los archivos. Salida: descargas/facturas/<cliente>.zip (se publica) y una
copia suelta en ../Facturas de prueba/ para usarla localmente.
Uso: python herramientas/generar_facturas.py   (necesita playwright, pypdf y openpyxl)"""
import base64
import io
import json
import shutil
import sys
import zipfile
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from playwright.sync_api import sync_playwright
from pypdf import PdfReader, PdfWriter

sys.stdout.reconfigure(encoding="utf-8")
RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "descargas" / "facturas"
SUELTOS = RAIZ.parent / "Facturas de prueba"
COMERCIALIZADORA = "Energía Demo del Caribe S.A. E.S.P. (comercializadora ficticia)"
CSS = ("*{animation:none!important;transition:none!important}"
       "body{background:#fff!important;margin:0}.pdf-factura{width:184mm;margin:0 auto}"
       ".factura-luz{box-shadow:none!important;font-size:9.6pt}")
LEEME = """Paquete de prueba del simulador de VIRIDIA S.A.S. BIC (proyecto académico).
Todo es ficticio: la comercializadora, el cliente, las cuentas y los consumos.

Cómo usarlo: en el sitio, abre Simulador, elige el cliente y suelta este .zip (o los PDF y los Excel)
en la zona de recepción. También puedes editar historico-facturacion.xlsx (consumo o CU de un mes)
y subirlo con operacion.xlsx: el análisis se rehace con tus cifras.
"""
NEGRITA = Font(bold=True)
CABECERA = PatternFill("solid", fgColor="E4ECE4")


def hoja(ws, titulo, subtitulo, meta, cabecera, filas, anchos):
    ws.append([titulo]); ws["A1"].font = Font(bold=True, size=13)
    ws.append([subtitulo]); ws["A2"].font = Font(italic=True, color="4E5C5A")
    ws.append([])
    for clave, valor in meta:
        ws.append([clave, valor]); ws.cell(ws.max_row, 1).font = NEGRITA
    ws.append([])
    ws.append(cabecera)
    for c in ws[ws.max_row]:
        c.font = NEGRITA; c.fill = CABECERA; c.alignment = Alignment(wrap_text=True, vertical="center")
    for fila in filas:
        ws.append(fila)
        for c in ws[ws.max_row][1:]:
            if isinstance(c.value, (int, float)):
                c.number_format = "#,##0.##" if isinstance(c.value, float) and c.value % 1 else "#,##0"
    for i, ancho in enumerate(anchos):
        ws.column_dimensions[chr(65 + i)].width = ancho


def main():
    SALIDA.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        nav = p.chromium.launch(channel="msedge")
        pg = nav.new_page()
        pg.goto((RAIZ / "index.html").as_uri() + "#/simulador")
        pg.wait_for_function("window.V && V.facturaHTML && window.MotorVIRIDIA")
        pg.add_style_tag(content=CSS)
        clientes = pg.evaluate("VIRIDIA_CLIENTES.map(c => ({ id: c.id, nombre: c.nombre, ciudad: c.ciudad, meses: c.meses, variables: c.variables, factura: c.factura }))")
        for c in clientes:
            archivos = {}
            facturas = []
            for i, mes in enumerate(c["meses"]):
                datos = pg.evaluate("""([id, i]) => {
                    const c = VIRIDIA_CLIENTES.find(x => x.id === id), f = MotorVIRIDIA.factura(c, i);
                    document.body.className = '';
                    document.body.innerHTML = '<main class="pdf-factura">' + V.facturaHTML(c, i, false) + '</main>';
                    return Object.assign({ v: 1, comercializadora: 'Energía Demo del Caribe (ficticia)', periodo: c.meses[i], suscriptor: c.nombre, ciudad: c.ciudad,
                      cuenta: c.factura.cuenta, medidor: c.factura.medidor, uso: c.factura.uso, contribucionPct: c.factura.contribucion }, f);
                }""", [c["id"], i])
                pg.evaluate("document.fonts.ready")
                pdf = pg.pdf(format="Letter", print_background=True, margin={"top": "12mm", "bottom": "12mm", "left": "12mm", "right": "12mm"})
                escritor = PdfWriter(clone_from=PdfReader(io.BytesIO(pdf)))
                escritor.add_metadata({
                    "/Title": f"Factura {datos['numero']} · {mes} · {c['nombre']}",
                    "/Author": COMERCIALIZADORA,
                    "/Subject": "Factura ficticia de energía para el simulador de VIRIDIA",
                    "/Creator": "VIRIDIA · herramientas/generar_facturas.py",
                    "/ViridiaFactura": base64.b64encode(json.dumps(datos, ensure_ascii=False).encode("utf-8")).decode("ascii"),
                })
                buf = io.BytesIO(); escritor.write(buf)
                archivos[f"factura-{datos['numero']}-{mes.replace(' ', '-')}.pdf"] = buf.getvalue()
                facturas.append(datos)

            d = c["factura"]
            libro = Workbook(); ws = libro.active; ws.title = "Histórico"
            hoja(ws, COMERCIALIZADORA, "Histórico de facturación exportado del portal · documento ficticio para el simulador de VIRIDIA",
                 [("Suscriptor", c["nombre"]), ("Cuenta", d["cuenta"]), ("Medidor", d["medidor"]), ("Uso", d["uso"]), ("Contribución de solidaridad (%)", d["contribucion"])],
                 ["Periodo", "Factura No.", "Lectura anterior (kWh)", "Lectura actual (kWh)", "Consumo activa (kWh)", "Reactiva (kVArh)", "CU ($/kWh)", "Valor energía ($)", "Contribución ($)", "Total ($)"],
                 [[f["periodo"], f["numero"], f["anteriorActiva"], f["actualActiva"], f["kwh"], f["kvarh"], f["cu"], f["valor"], round(f["contribucion"]), round(f["total"])] for f in facturas],
                 [11, 15, 17, 17, 16, 14, 11, 18, 15, 18])
            buf = io.BytesIO(); libro.save(buf); archivos["historico-facturacion.xlsx"] = buf.getvalue()

            libro = Workbook(); ws = libro.active; ws.title = "Operación"
            hoja(ws, f"{c['nombre']} · datos de operación mensual", "Documento ficticio para el simulador de VIRIDIA",
                 [("Empresa", c["nombre"])] + [(f"Fuente de {v['nombre']}", v["fuente"]) for v in c["variables"]],
                 ["Periodo"] + [f"{v['nombre']} ({v['unidad']})" for v in c["variables"]],
                 [[mes] + [v["valores"][i] for v in c["variables"]] for i, mes in enumerate(c["meses"])],
                 [11] + [24] * len(c["variables"]))
            buf = io.BytesIO(); libro.save(buf); archivos["operacion.xlsx"] = buf.getvalue()
            archivos["LEEME.txt"] = LEEME.encode("utf-8")

            carpeta = f"Facturas {c['nombre']}"
            with zipfile.ZipFile(SALIDA / f"{c['id']}.zip", "w", zipfile.ZIP_DEFLATED) as z:
                for nombre, contenido in archivos.items():
                    z.writestr(f"{carpeta}/{nombre}", contenido)
            destino = SUELTOS / carpeta
            shutil.rmtree(destino, ignore_errors=True); destino.mkdir(parents=True)
            for nombre, contenido in archivos.items():
                (destino / nombre).write_bytes(contenido)
            print(f"{c['id']}: {len(archivos)} archivos · {round((SALIDA / (c['id'] + '.zip')).stat().st_size / 1024)} KB")
        nav.close()


if __name__ == "__main__":
    main()
