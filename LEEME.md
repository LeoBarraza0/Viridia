# VIRIDIA S.A.S. BIC: activo digital de Arquitectura Empresarial (Producto 2)

Portal web interactivo que recorre las seis capas del documento final (identidad y estrategia, procesos, información, aplicaciones, tecnología y transformación) con los mismos identificadores y cifras del PDF, más un simulador del servicio: de las facturas del cliente a la factura por ahorro verificado.

**Enlace publicado:** pendiente. Ver «Publicar en GitHub Pages».

## Abrirlo sin internet

Doble clic en `index.html`. Funciona en Edge, Chrome y Firefox sin servidor y sin conexión: las librerías, las fuentes y los datos van dentro de la carpeta. Es el respaldo para la sustentación si falla la red. Ese respaldo también va en `../VIRIDIA-Activo-Digital.zip`.

## Publicar en GitHub Pages

1. En GitHub, crear un repositorio público, por ejemplo `viridia-ae`.
2. Subir **el contenido de esta carpeta** (no la carpeta) a la raíz del repositorio, incluida la carpeta oculta `.github`. Con Git:

   ```powershell
   git init
   git add .
   git commit -m "Activo digital de Arquitectura Empresarial de VIRIDIA"
   git branch -M main
   git remote add origin https://github.com/<usuario>/viridia-ae.git
   git push -u origin main
   ```

3. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. El flujo `.github/workflows/publicar.yml` corre la prueba de coherencia y, si pasa, publica. En un par de minutos el sitio queda en `https://<usuario>.github.io/viridia-ae/`.
5. Probar el enlace en otro equipo y en una ventana de incógnito, fuera de la red de la universidad (checklist del plan, §8).

Si prefieren no usar Actions, también sirve **Source: Deploy from a branch → main → / (root)**. En ese caso se publican también las carpetas de trabajo (`herramientas/`, `tests/`), cosa que no causa problemas.

### Después de publicar

1. Poner el enlace en el documento final: en `../Documento/VIRIDIA-AE-Final.tex`, línea 149, cambiar `\newcommand{\enlaceactivo}{...}` por `\newcommand{\enlaceactivo}{\url{https://<usuario>.github.io/viridia-ae/}}` y recompilar con `compilar.ps1`.
2. Copiar al sitio el PDF recompilado: `node herramientas/empaquetar.js`, y volver a subir los cambios.

## Pantallas

| Pantalla | Qué muestra | Interacción | Capa |
|---|---|---|---|
| Nuestra empresa | Logo, eslogan, qué hace, problema, cuatro datos con fuente, ejemplo de cálculo, propuesta de valor, segmentos, qué no es | Botones a la arquitectura y al simulador | Identidad |
| Tablero | Inventario de las doce colecciones (OE, C, procesos, RN, entidades, A, I, T, R, B, P, H), cadena de evidencia y coherencia calculada en vivo | Cada identificador abre su ficha; «Recorrer la cadena» | Todas |
| Estrategia | Misión, Visión 2031, OE1–OE5, C1–C10, matriz de cobertura, cadena de alineación, C2 crítica, vista ArchiMate de motivación interactiva | Un objetivo ilumina sus capacidades en el mapa, la matriz y la vista ArchiMate; mostrar las relaciones de soporte | Estrategia |
| Procesos | Organigrama, mapa de 14 procesos, flujo de un cliente, los 3 BPMN en el visor bpmn-js con la paleta de VIRIDIA, RN1–RN8, actores | «Reproducir el flujo»: una ficha recorre el ciclo completo y salta sola entre los tres diagramas (enlace A, subproceso del cierre mensual, regreso y enlace B), con los mensajes entre participantes y las ramas paralelas; ficha breve al pasar el cursor; clic en una tarea: responsable, reglas y trazabilidad; resaltar una regla; pantalla completa | Negocio |
| Simulador | 12 facturas ficticias de energía que se leen y analizan, línea base con ASHRAE 14, contrato (RN2) y cierre mensual (RN3, RN1) | Tres clientes; recepción de los archivos del cliente (.zip, PDF, Excel o CSV, arrastrándolos); lectura animada de las facturas; impresión en PDF; escenarios; camino iluminado sobre el BPMN | Negocio e información |
| Información | MER de 18 tablas y 21 relaciones, flujo del dato, cadena de RN1, matriz CRUD, diccionario | Clic en una tabla: atributos, relaciones y CRUD; «Seguir la cadena de RN1» | Información |
| Aplicaciones | Vista por capas, I1–I16, catálogo A1–A10, matriz aplicación × proceso | Clic en una aplicación ilumina sus integraciones; «Reproducir el recorrido» 1 a 7 | Aplicaciones |
| Tecnología | Despliegue T1–T16, principios, modelo de servicio, topología de la red de la sede, seguridad, RPO/RTO, riesgos R1–R8 | Clic en un nodo: qué aloja y sus controles; clic en una VLAN: su regla de acceso | Tecnología |
| Transformación | To-Be, vista integrada ArchiMate interactiva, principios PA1–PA6, As-Is frente a To-Be capa por capa, B1–B14 con priorización, roadmap P1–P12 con hitos H1–H6, puesta en marcha | Resaltar una capa, recorrer una lectura de la planta a la factura, filtros de brechas, clic en una fase o un proyecto | Transformación |
| Trazabilidad | La tabla de punta a punta dibujada como nervadura, y la prueba de consistencia | Pasar el cursor sobre un elemento muestra sus cadenas; elegirlo las deja encendidas | Coherencia entre capas |
| Acerca de | Equipo, declaración de uso de IA, descargas, fuentes y créditos | Descarga del PDF, los `.bpmn`, el SQL y los datos en JSON | — |

En todas las pantallas: buscador global (`Ctrl K` o `/`) por identificador o palabra, ficha breve al pasar sobre un identificador, capa anterior y siguiente con botones o con las flechas ← →, y pantalla completa en cada diagrama (útil con proyector).

## Recorrido sugerido para la sustentación (8 a 10 minutos)

1. **Nuestra empresa** (1 min): la frase de qué hace VIRIDIA y el ejemplo «sin ahorro verificado no hay factura».
2. **Tablero** (30 s): pulsar «Recorrer la cadena» para mostrar el hilo de punta a punta.
3. **Estrategia** (1 min): tocar OE2 y mostrar cómo se iluminan C2, C3, C4, C7 y C9; señalar C2 como crítica.
4. **Procesos** (1,5 min): abrir el BPMN parte 1 y pulsar «Reproducir el flujo»: la ficha recorre las tres partes del ciclo (unos dos minutos; «Detener» la corta). Luego tocar «Evaluar prefactibilidad» y resaltar RN2.
5. **Simulador** (2,5 min): planta de alimentos: soltar el paquete `alimentos.zip` en la zona de recepción y pulsar «Leer y analizar las facturas» (las 12 facturas ficticias se leen una por una y se cruzan con la producción y el clima) → potencial de 14,4 % → línea base que cumple ASHRAE 14 → contrato → cierre mensual con la factura de $ 23,9 M y su traza a la línea base v1. Luego «Datos incompletos» (RN3) y «Sin ahorro» (RN1). Si sobra tiempo: el hotel, que no cumple ASHRAE hasta agregar la tercera variable.
6. **Información y Aplicaciones** (1,5 min): «Seguir la cadena de RN1» en el MER y «Reproducir el recorrido» en la vista por capas.
7. **Tecnología y Transformación** (1,5 min): un nodo crítico (T2 o T10), «Recorrer una lectura» en la vista integrada ArchiMate y la fase 1 del roadmap con las brechas que cierra.
8. **Trazabilidad** (30 s): elegir OE3 y mostrar que todas las cadenas llegan a un proyecto.

## El simulador

- **Recepción de archivos**: el simulador recibe el paquete .zip del cliente, sus facturas en PDF, el histórico de facturación en Excel, el Excel de operación (producción y clima) o un CSV. Los lee en el navegador, sin librerías ni servidor: reconoce la cuenta y, si es la de un cliente de ejemplo, completa lo que falte con sus datos. Si se edita el Excel del histórico (por ejemplo, el consumo de un mes) el análisis se rehace con esas cifras. Los paquetes de prueba están en `descargas/facturas/` (uno por cliente) y sueltos en `../Facturas de prueba/`; «Usar las facturas de ejemplo» salta la carga.
- **Facturas ficticias**: cada cliente trae 12 facturas de energía de una comercializadora inventada («Energía Demo del Caribe», con sello «ILUSTRATIVA»). Las genera `MotorVIRIDIA.factura` a partir de los consumos supuestos: lecturas acumuladas con factor 1, energía reactiva y factor de potencia, costo unitario repartido en G, T, D, Cv, PR y R, contribución del 20 % (exenta para uso industrial) y total. «Leer y analizar las facturas» las recorre una a una, extrae consumo, costo unitario, valor de la energía y factor de potencia, y luego las cruza con la producción y el clima. «Imprimir o guardar en PDF» saca las 12, una por página.
- **Prefactibilidad** (BPMN parte 1, «¿Hay potencial de ahorro?»): con lo extraído de las facturas, ajusta qué parte del consumo explican la producción y el clima y estima el potencial como lo que la planta dejaría de consumir si operara siempre como en sus tres mejores meses. Hay potencial si llega al 8 % que VIRIDIA compromete como mínimo. Es una regla ilustrativa del simulador y así se declara en pantalla.
- **Línea base** (IPMVP, ASHRAE Guideline 14): regresión por mínimos cuadrados con las variables elegidas. Se acepta si CV(RMSE) ≤ 15 % y NMBE dentro de ±5 %. Los coeficientes se registran con cuatro cifras significativas (versión 1).
- **Contrato** (RN2): el porcentaje comprometido se fija aquí, entre 8 % y el potencial estimado.
- **Cierre mensual**: sigue el BPMN del subproceso, con RN3 (completitud ≥ 95 %, recuperación del respaldo de 72 h) y RN1 (sin ahorro positivo no hay factura).
- **Clientes**: los tres son supuestos del equipo (`data/clientes-ejemplo.js`). La planta de alimentos reproduce exactamente el ejemplo del documento (570.000 kWh esperados, 75.000 kWh de ahorro, 13,2 %, $ 59,7 M, factura de $ 23,9 M, 16,5 tCO₂e).
- **CSV propio**: botón «Plantilla» para descargar el formato (`mes;kwh;tarifa;` y una columna por variable, separado por punto y coma). Con un CSV no hay facturas que leer: el análisis aparece de inmediato.

## Cómo está construido

Sitio estático en HTML, CSS y JavaScript, sin compilación ni servidor. El papel de backend lo cumplen tres piezas:

- `data/viridia-ae.js`: **fuente única de verdad.** Es JSON envuelto en una asignación para que abra con doble clic. Todo lo que muestra el sitio sale de aquí.
- `js/motor.js`: el motor de cálculo (facturas ficticias, regresión, ASHRAE 14, prefactibilidad, cierre mensual). Son funciones puras, sin interfaz.
- `tests/verificar.js`: 25 comprobaciones. El motor reproduce el ejemplo del PDF y respeta RN1 y RN3; los clientes se comportan como se declara; las facturas ficticias cuadran (lecturas, costo unitario, valor y contribución) con lo que analiza el motor; y todos los identificadores son coherentes entre capas (matriz de cobertura 6/5/2/4/3 = 20, un solo sistema de registro por tabla, brechas ↔ proyectos, integraciones ↔ catálogo, nodos ↔ mecanismos y trazabilidad). Se corre con `node tests/verificar.js` y GitHub Actions no publica si falla.

Los diagramas (MER, vista por capas, despliegue, red de la sede y las dos vistas ArchiMate) son nodos HTML sobre un SVG de aristas (`js/diagrama.js`), con la notación ArchiMate 3.2: colores de capa, íconos de tipo y puntas de realización, agregación, composición, asignación, servicio, flujo y acceso. Las vistas ArchiMate conservan la composición de las exportaciones de Archi del documento; las imágenes originales siguen enlazadas debajo de cada vista.

```
Activo-Digital/
├── index.html             entrada (riel, panel de detalle, scripts)
├── css/viridia.css        identidad visual: paleta del .tex, Lato e IBM Plex Mono
├── data/                  viridia-ae.js (fuente única) y clientes-ejemplo.js (simulador)
├── js/                    nucleo.js (enrutador, fichas, curvas de nivel), diagrama.js, motor.js,
│                          bpmn-xml.js (generado) y vistas/ (una por pantalla)
├── img/                   láminas de grabado, vistas ArchiMate, favicon e imagen para compartir
├── fonts/  vendor/        Lato, IBM Plex Mono y bpmn-js 18.30.0, locales
├── descargas/             PDF final, los 3 .bpmn, el SQL y los MER en A3
├── tests/verificar.js     prueba de coherencia
├── herramientas/          scripts de mantenimiento y originales de las ilustraciones (no se publican)
└── .github/workflows/     publicación en GitHub Pages
```

## Mantenimiento

| Si cambia… | Hacer |
|---|---|
| Un nombre o una cifra del documento | Cambiarlo también en `data/viridia-ae.js` y correr `node tests/verificar.js` |
| El PDF, un `.bpmn`, el SQL o una vista ArchiMate | `node herramientas/empaquetar.js` |
| Una ilustración | Reemplazar el original en `herramientas/originales/` y correr `python herramientas/procesar_laminas.py` |
| La imagen para compartir | `python herramientas/generar_og.py` |
| Los clientes de ejemplo o la plantilla de la factura | `python herramientas/generar_facturas.py` rehace los paquetes de prueba (12 PDF con sus datos en los metadatos, histórico y operación en Excel) |
| Cualquier pantalla | `python herramientas/capturas.py` abre las 11 pantallas en Edge o Chrome, informa errores y guarda capturas (sirven para un anexo del PDF) |

Los scripts de Python necesitan `pip install playwright pillow numpy pypdf openpyxl`. Usan el Edge o el Chrome ya instalados.

## Pendientes del equipo

1. **Publicar** y poner el enlace en el `.tex` (ver arriba).
2. **Revisar la declaración de uso de IA del activo** (pantalla «Acerca de», en `data/viridia-ae.js`, `declaracionIA.activo`) y ajustarla a lo que el equipo hizo de verdad, igual que la del documento.
3. **Una precisión para el PDF.** La conclusión dice que «los dieciséis nodos aparecen al menos una vez» en la tabla de trazabilidad, pero T15 (región secundaria) no aparece en ninguna fila. El activo lo explica así: T15 respalda a T10, T11 y T12. Conviene agregar esa frase en el `.tex`.
4. **Una diferencia de nombre en el PDF.** M4 se llama «Medir, verificar y facturar el ahorro» en el mapa de procesos y «Monitorear, verificar y facturar el ahorro» en la matriz aplicación × proceso. El activo usa el del mapa.

## Créditos

- Ilustraciones: ocho grabados generados con el generador de imágenes de Figma (gpt-image-2.5-flare) y convertidos en tinta transparente. Los prompts están en `herramientas/prompts.json` y la procedencia va incrustada junto a cada imagen.
- bpmn-js © camunda Services GmbH, licencia bpmn.io (el logo de bpmn.io debe quedar visible en el visor). Lato e IBM Plex Mono, bajo SIL Open Font License.
- VIRIDIA S.A.S. BIC es una compañía ficticia de uso académico.
