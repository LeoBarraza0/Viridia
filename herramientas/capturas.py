"""Abre el activo desde el disco (file://, como desde el .zip), recorre las 11 pantallas,
informa errores de consola y guarda capturas de escritorio y celular.

Uso (desde Activo-Digital):  python herramientas/capturas.py [carpeta_salida]
Requiere: pip install playwright  (usa el Microsoft Edge o Chrome instalado; no descarga navegadores).
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = Path(sys.argv[1]) if len(sys.argv) > 1 else RAIZ / ".impeccable" / "review" / "pantallas"
RUTAS = ["inicio", "tablero", "estrategia", "procesos", "simulador", "informacion",
         "aplicaciones", "tecnologia", "transformacion", "trazabilidad", "acerca"]
TAMANOS = {"escritorio": {"width": 1440, "height": 900}, "celular": {"width": 390, "height": 844}}


def main() -> int:
    SALIDA.mkdir(parents=True, exist_ok=True)
    url = (RAIZ / "index.html").as_uri()
    errores = []
    with sync_playwright() as p:
        navegador = None
        for canal in ("msedge", "chrome"):
            try:
                navegador = p.chromium.launch(channel=canal)
                break
            except Exception:  # noqa: BLE001 - se prueba el siguiente navegador instalado
                continue
        if navegador is None:
            print("No hay Edge ni Chrome instalados.")
            return 2
        for nombre, tam in TAMANOS.items():
            ctx = navegador.new_context(viewport=tam, reduced_motion="reduce", device_scale_factor=1)
            pagina = ctx.new_page()
            pagina.on("console", lambda m: m.type == "error" and errores.append(f"[{nombre}] consola: {m.text}"))
            pagina.on("pageerror", lambda e: errores.append(f"[{nombre}] error: {e}"))
            for ruta in RUTAS:
                pagina.goto(f"{url}#/{ruta}")
                pagina.wait_for_timeout(700)
                if ruta == "procesos":
                    try:
                        pagina.wait_for_selector(".djs-container svg", timeout=8000)
                    except Exception:  # noqa: BLE001
                        errores.append(f"[{nombre}] procesos: el visor BPMN no cargó")
                    pagina.wait_for_timeout(500)
                pagina.screenshot(path=str(SALIDA / f"{nombre}-{ruta}.png"), full_page=True)
            ctx.close()
        navegador.close()
    print(f"Capturas en {SALIDA}")
    if errores:
        print("\n".join(sorted(set(errores))))
        return 1
    print("Sin errores de consola en las 11 pantallas.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
