"""Genera img/og-viridia.png (1200×630), la imagen que muestran WhatsApp, Teams o LinkedIn al compartir el enlace.
Toma las curvas de nivel del propio sitio y las pone en la plantilla herramientas/og.html.
Uso (desde Activo-Digital):  python herramientas/generar_og.py
"""
from pathlib import Path

from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent

with sync_playwright() as p:
    navegador = p.chromium.launch(channel="msedge")
    pagina = navegador.new_page(viewport={"width": 1440, "height": 900})
    pagina.goto((RAIZ / "index.html").as_uri() + "#/inicio")
    pagina.wait_for_selector(".portada svg.topo path")
    curvas = pagina.eval_on_selector(".portada svg.topo", "s => [s.getAttribute('viewBox'), s.innerHTML]")
    pagina = navegador.new_page(viewport={"width": 1200, "height": 630})
    pagina.goto((RAIZ / "herramientas" / "og.html").as_uri())
    pagina.eval_on_selector("svg.topo", "(s, c) => { s.setAttribute('viewBox', c[0]); s.setAttribute('preserveAspectRatio', 'xMidYMid slice'); s.innerHTML = c[1]; }", curvas)
    pagina.wait_for_timeout(400)
    pagina.screenshot(path=str(RAIZ / "img" / "og-viridia.png"), clip={"x": 0, "y": 0, "width": 1200, "height": 630})
    navegador.close()
print("img/og-viridia.png generado")
