---
name: VIRIDIA · Activo digital de Arquitectura Empresarial
description: Lámina de guía de campo sobre plancha topográfica para recorrer la arquitectura de VIRIDIA S.A.S. BIC
colors:
  verde: "#1B5E3A"
  verde-hondo: "#134A2D"
  verde-claro: "#2C7550"
  lima: "#7FBF4D"
  lima-hondo: "#4F8A26"
  lima-tinta: "#D4E9BF"
  agua: "#2A7B9B"
  agua-hondo: "#1F5F78"
  agua-claro: "#D7EAF1"
  grafito: "#1F2A2E"
  grafito-hondo: "#172124"
  gris: "#6B7A78"
  texto-2: "#4E5C5A"
  niebla: "#F1F5F1"
  niebla-2: "#E4ECE4"
  papel: "#FBFCFA"
  dato-1: "#1E88B4"
  dato-2: "#4F8A26"
  ocre: "#B4741F"
  rojo: "#A3412C"
typography:
  display:
    fontFamily: "Lato, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.4rem + 2.9vw, 4rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  wordmark:
    fontFamily: "Lato, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 2rem + 5.2vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "0.16em"
  headline:
    fontFamily: "Lato, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.65rem, 1.25rem + 1.2vw, 2.35rem)"
    fontWeight: 900
    lineHeight: 1.12
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Lato, Segoe UI, system-ui, sans-serif"
    fontSize: "1.18rem"
    fontWeight: 700
    lineHeight: 1.12
  lede:
    fontFamily: "Lato, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1rem + 0.5vw, 1.45rem)"
    fontWeight: 300
    lineHeight: 1.35
  body:
    fontFamily: "Lato, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, Cascadia Mono, Consolas, monospace"
    fontSize: "0.74rem"
    fontWeight: 600
    letterSpacing: "0.03em"
rounded:
  sm: "3px"
  md: "4px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 3.2vw, 3rem)"
  section: "clamp(2.6rem, 5.5vw, 4.6rem)"
  measure: "68ch"
  container: "1200px"
  rail: "288px"
components:
  button-primary:
    backgroundColor: "{colors.lima}"
    textColor: "{colors.grafito-hondo}"
    rounded: "{rounded.md}"
    padding: "0.7rem 1.25rem"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.lima-tinta}"
  button-solid:
    backgroundColor: "{colors.verde}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "0.7rem 1.25rem"
  button-solid-hover:
    backgroundColor: "{colors.verde-claro}"
  button-quiet:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.grafito}"
    rounded: "{rounded.md}"
    padding: "0.7rem 1.25rem"
  chip-id:
    textColor: "{colors.verde}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.3rem 0.45rem"
  field:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.grafito}"
    rounded: "{rounded.md}"
    height: "44px"
  rail:
    backgroundColor: "{colors.grafito}"
    textColor: "#C9D4D1"
    width: "288px"
  layer-opener:
    backgroundColor: "{colors.verde}"
    textColor: "#FFFFFF"
---

# Design System: VIRIDIA · Activo digital de Arquitectura Empresarial

## Overview

**Creative North Star: "La lámina de campo"**

Cada capa de la arquitectura se presenta como una lámina de una guía de campo botánica impresa sobre una plancha topográfica. Los elementos de la arquitectura (objetivos, capacidades, procesos, entidades, aplicaciones, nodos, brechas, proyectos) son especímenes con su número de catálogo, y la trazabilidad entre ellos se dibuja como la nervadura de una hoja, la misma que aparece en el logo. El marco pertenece al mundo (riel grafito con su vena, campos verdes con curvas de nivel, grabados en tinta lima); la columna de lectura es tranquila, sobre papel niebla.

La densidad es la de un documento técnico que se explora: tablas, matrices y diagramas a escala real, con el detalle en un panel lateral en vez de páginas nuevas. El movimiento explica estado y relación: la savia que recorre una cadena, el pulso de una lectura del medidor a la factura, el camino iluminado de un BPMN. El sistema se diseñó para un salón con proyector y luz encendida y para el celular del docente.

**Key Characteristics:**
- Marco comprometido (grafito y verde) alrededor de una columna de lectura clara.
- Grabados botánico-técnicos en tinta lima pálida sobre campos oscuros, con pie de lámina.
- Identificadores en monoespaciada como números de catálogo: siempre clicables.
- Diagramas como figuras a escala: nodos HTML accesibles sobre aristas SVG.
- Una sola gramática de movimiento: savia que fluye por las relaciones.

## Colors

Paleta completa de cuatro roles tomada de los documentos LaTeX del equipo: verde estructura, lima señal viva, agua datos y grafito tinta, sobre neutros niebla.

### Primary
- **Verde VIRIDIA**: campo de las cabeceras de capa, declaraciones (misión, visión, propuesta), encabezados de tabla, nodos críticos, botón sólido. Es el color que ocupa regiones enteras.
- **Verde hondo**: fondo de las declaraciones y variantes oscuras del campo.

### Secondary
- **Lima**: la señal viva. Nodo activo del riel, botón principal de la portada, estado «cumple», resaltado de lo seleccionado. Nunca como fondo de regiones grandes.
- **Lima hondo**: trazos de savia, barras de la fase 2, contornos de lo encendido.
- **Lima tinta**: color de la tinta de los grabados y de las celdas de relación secundaria.

### Tertiary
- **Agua**: datos y enlaces: objetivos estratégicos, integraciones por eventos, enlaces de texto (agua hondo), compuertas BPMN.

### Neutral
- **Grafito**: tinta de todo el texto, riel de navegación y portada.
- **Texto secundario**: texto de apoyo sobre papel (contraste mayor de 4,5:1 sobre niebla).
- **Niebla y niebla 2**: fondo de la página y rellenos suaves de celdas y controles.
- **Papel**: bandas alternas de lectura y panel de detalle.

### Named Rules
**The One Field Rule.** Solo el verde (cabeceras, declaraciones) y el grafito (riel, portada) ocupan regiones completas; lima y agua son trazo y señal.

**The Validated Series Rule.** Las series de gráficas usan solo dato-1 y dato-2, validadas para daltonismo y contraste; las líneas de referencia (esperado, objetivo) van en grafito, continua o discontinua.

**The Reserved State Rule.** Ocre (pendiente) y rojo (no cumple, sin factura) son estados del proceso y siempre van con su texto; nunca se usan como color de serie ni de decoración.

## Typography

**Display Font:** Lato (con Segoe UI y system-ui)
**Body Font:** Lato
**Label/Mono Font:** IBM Plex Mono (con Cascadia Mono y Consolas)

**Character:** Lato en peso 900 da titulares compactos y firmes, y en 300 una entrada serena; IBM Plex Mono, heredada de la presentación del Corte II, marca lo que es dato: identificadores, cifras de tablas y ecuaciones.

### Hierarchy
- **Wordmark** (900, hasta 6rem, tracking 0.16em): solo la palabra VIRIDIA en la portada y el riel.
- **Display** (900, clamp hasta 4rem, 1.02): el título de cada lámina de capa.
- **Headline** (900, clamp hasta 2.35rem, 1.12): títulos de sección, máximo unos 30 caracteres de ancho.
- **Title** (700, 1.18rem): subtítulos dentro de secciones y nombres en fichas.
- **Lede** (300, clamp hasta 1.45rem): la pregunta que responde cada capa, en lima tinta sobre verde.
- **Body** (400, 1.0625rem, 1.6): lectura a 68ch como máximo.
- **Label** (600, 0.74rem, IBM Plex Mono): identificadores y números de catálogo.

### Named Rules
**The Catalog Mono Rule.** La monoespaciada es solo para datos: identificadores, cifras, ecuaciones y códigos. Etiquetas de formulario, títulos de panel y textos de apoyo van en Lato.

**The No Eyebrow Rule.** Nada va encima de un título: el identificador se escribe en la misma línea que el nombre y los metadatos (periodo, sector, fuente) van debajo.

## Layout

Riel fijo de 288px a la izquierda en escritorio y columna de contenido de hasta 1200px con margen fluido (clamp de 1rem a 3rem). Cada capa abre con una cabecera verde a todo el ancho: título y pregunta a la izquierda, lámina abajo a la derecha y un sumario de anclas en el borde inferior. Las secciones alternan papel niebla y bandas papel con el mismo ritmo vertical (clamp de 2.6rem a 4.6rem), siempre con más aire arriba del título que debajo. Los diagramas conservan su proporción y, por debajo de 820px de ancho, se desplazan horizontalmente dentro de su plancha. Bajo 960px el riel se vuelve un menú deslizable desde una barra superior grafito y las cabeceras apilan la lámina debajo del texto.

## Elevation & Depth

Sistema plano por defecto con una sola sombra ambiental suave para lo que se puede tocar o levantar. La profundidad la dan el contraste de campos (grafito, verde, papel) y los contornos, no las sombras. Lo seleccionado se marca con contorno lima hondo, nunca con halo de color.

### Shadow Vocabulary
- **Ambiente** (`box-shadow: 0 1px 2px rgba(23,33,36,.06), 0 10px 28px -14px rgba(23,33,36,.32)`): planchas de diagramas, fichas, botones al pasar el cursor.
- **Alta** (`box-shadow: 0 2px 6px rgba(23,33,36,.10), 0 24px 60px -24px rgba(23,33,36,.45)`): el panel de detalle y el nodo elegido.

### Named Rules
**The Neutral Light Rule.** Las sombras son neutras (grafito con opacidad) y llevan desplazamiento y desenfoque; ningún halo de color, ni siquiera lima sobre grafito.

## Shapes

Esquinas casi rectas, como láminas impresas: 3px en chips y nodos, 4px en botones, campos y planchas. Las tarjetas con regla superior gruesa (fases, semanas, objetivos) van sin redondeo. Las formas con significado propio son notación: compuertas en rombo, entidades débiles con doble borde, almacenes como cilindro, procesos misionales como cheurones.

## Components

### Buttons
- **Shape:** esquinas suaves (4px), alto mínimo de 46px.
- **Primary:** fondo lima con texto grafito hondo; solo para la acción principal sobre campos oscuros.
- **Solid:** fondo verde con texto blanco; acción principal sobre papel.
- **Quiet:** fondo blanco con borde gris y texto grafito; acciones secundarias.
- **Hover / Focus:** sube 2px con sombra ambiental en 160ms (cubic-bezier(0.16, 1, 0.3, 1)); foco con contorno agua de 2px.

### Chips
- **Style:** identificador en IBM Plex Mono 600 con borde de 1px del color de su tipo: verde (capacidades, aplicaciones), agua (objetivos, integraciones), grafito (reglas, nodos, riesgos), ocre (brechas, hitos), lima hondo (proyectos); entidades con borde discontinuo.
- **State:** al pasar el cursor se rellenan de su color. Todo chip es un enlace a la ficha del elemento.

### Cards / Containers
- **Corner Style:** 4px en planchas; 0 en tarjetas con regla superior.
- **Background:** blanco sobre papel niebla.
- **Shadow Strategy:** ambiente.
- **Border:** 1px grafito al 14%.
- **Internal Padding:** de 0.9rem a 1.2rem.

### Inputs / Fields
- **Style:** fondo blanco, borde grafito al 28%, 4px, alto mínimo de 44px, cifras tabulares.
- **Focus:** contorno verde de 2px con 1px de separación.
- **Error / Disabled:** contorno rojo de 2px y mensaje que nombra el problema y la corrección.

### Navigation
- **Style:** riel grafito con una vena vertical lima al 45%. Cada ruta es un nodo; la activa se rellena de lima y crece; el nombre va en Lato y a la derecha sus identificadores en Plex Mono. En celular, barra grafito con botón de menú y el riel deslizable sobre un velo.

### Lámina de capa (signature)
Cabecera verde con curvas de nivel generadas al vuelo (marching squares con semilla por capa), título display, pregunta en lima tinta, grabado en tinta transparente que aparece con una máscara circular desde su base y pie de lámina en cursiva; entre pantallas la cabecera y la lámina se transforman con View Transitions.

### Nervadura de trazabilidad (signature)
Columnas de especímenes unidas por venas curvas; al elegir un elemento, las venas de sus cadenas se encienden en lima hondo con trazo discontinuo que fluye.

### Diagramas vivos
Nodos HTML (botones) posicionados en porcentaje sobre un SVG de aristas que conserva la proporción; al elegir un nodo, sus vecinos y sus aristas se encienden y el resto baja al 22 %. Toda plancha de diagrama lleva «Pantalla completa». Las vistas ArchiMate usan los colores de capa de la notación atenuados (motivación lila, estrategia ocre, negocio amarillo, aplicación celeste, tecnología verde), el ícono de tipo en la esquina superior derecha y las puntas propias de cada relación; el título de cada banda tapa las líneas que lo cruzan.

### BPMN con la paleta
Tareas con borde verde, subprocesos con borde grueso y fondo lima tinta, compuertas agua, eventos lima hondo, pool del cliente agua claro. Los resaltados (regla en agua, camino del simulador en lima hondo) siempre ganan sobre el color de tipo.

### Factura de energía ficticia
Documento blanco de esquinas casi rectas con banda pizarra (#34495E) y rayo ámbar: datos del suscriptor, lecturas, costo unitario desglosado, conceptos, historial de seis meses, código de barras y el sello «ILUSTRATIVA» en rojo. Al leerla, un barrido agua recorre el documento y los campos extraídos quedan subrayados en agua. Es el único lugar del sitio con la paleta de un tercero, y siempre se declara ficticia.

### Tablas
Encabezado con regla verde de 2px sobre blanco (no bloque relleno) y filas alternas niebla muy claro. Las tablas de consulta larga van en un desplegable con su conteo en el resumen.

## Do's and Don'ts

### Do:
- **Do** abrir cada capa con su lámina verde, su pregunta y su sumario de anclas.
- **Do** escribir el identificador en la misma línea que el nombre y hacerlo clicable hacia su ficha.
- **Do** marcar cada cifra propuesta por el equipo con la P en superíndice y declarar como ilustrativo todo dato de ejemplo.
- **Do** usar dato-1 y dato-2 para series y grafito para líneas de referencia; ofrecer siempre la tabla equivalente.
- **Do** respetar `prefers-reduced-motion`: el estado se sigue viendo, el movimiento desaparece.

### Don't:
- **Don't** poner etiquetas encima de los títulos (sector, periodo, fuente o número de orden).
- **Don't** usar halos o resplandores de color, vidrio esmerilado decorativo ni franjas repetidas.
- **Don't** usar bordes laterales de color de más de 1px en tarjetas, avisos o citas.
- **Don't** usar la monoespaciada para etiquetas o títulos que no son datos.
- **Don't** pintar regiones grandes de lima o agua: son trazo y señal.
