"""Convierte los grabados generados (tinta negra sobre papel blanco) en láminas
de tinta clara con fondo transparente, listas para los campos oscuros del sitio.

Uso (desde la carpeta Activo-Digital):
    python herramientas/procesar_laminas.py

Entrada:  herramientas/originales/<nombre>.png   (generadas con Figma AI, ver prompts.json)
Salida:   img/laminas/<nombre>.webp               (RGBA, tinta #D4E9BF)
"""
from pathlib import Path

import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ORIGEN = RAIZ / "herramientas" / "originales"
DESTINO = RAIZ / "img" / "laminas"
TINTA = (212, 233, 191)          # lima pálido: se lee sobre grafito y sobre viridiaVerde
PAPEL, NEGRO = 236.0, 28.0       # niveles: lo más claro que PAPEL es transparente
LADO_MAX = {"portada": 1536, "transformacion": 1400, "simulador": 1400}  # el resto, 960


def a_tinta(ruta: Path) -> Image.Image:
    gris = np.asarray(Image.open(ruta).convert("L"), dtype=np.float32)
    alfa = np.clip((PAPEL - gris) / (PAPEL - NEGRO), 0.0, 1.0) ** 0.85
    alfa[alfa < 0.04] = 0.0                       # limpia el grano del papel
    filas, cols = np.nonzero(alfa > 0.12)
    m = 24                                         # margen alrededor del dibujo
    y0, y1 = max(filas.min() - m, 0), min(filas.max() + m, alfa.shape[0])
    x0, x1 = max(cols.min() - m, 0), min(cols.max() + m, alfa.shape[1])
    alfa = alfa[y0:y1, x0:x1]
    rgba = np.zeros((*alfa.shape, 4), dtype=np.uint8)
    rgba[..., :3] = TINTA
    rgba[..., 3] = (alfa * 255).round().astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


def main() -> None:
    DESTINO.mkdir(parents=True, exist_ok=True)
    for ruta in sorted(ORIGEN.glob("*.png")):
        img = a_tinta(ruta)
        lado = LADO_MAX.get(ruta.stem, 960)
        if max(img.size) > lado:
            img.thumbnail((lado, lado), Image.LANCZOS)
        salida = DESTINO / f"{ruta.stem}.webp"
        img.save(salida, "WEBP", quality=82, method=6)
        print(f"{salida.relative_to(RAIZ)}  {img.size}  {salida.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
