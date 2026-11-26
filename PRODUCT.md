# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated ("Evalúa y aplica lo mejor"): static HTML, CSS and vanilla JavaScript with no build step. Classic scripts only, so the site opens by double-clicking `index.html` from the backup `.zip` (no `fetch` of local files, no ES modules) and publishes as-is on GitHub Pages. Libraries and fonts are vendored locally; the site makes no runtime network requests. The user confirmed the simulation can be static: every calculation runs in the browser.

## Users

- **Primary:** the course professor (Emiro Berrio) grading the final project of *Arquitectura Empresarial* (Universidad Libre, VIII semester), on a classroom projector during the oral defense and later on a laptop or phone through the published link.
- **Secondary:** the three team members (Leonardo Barraza, Emanuel Barranco, Freddy Rangel), who must be able to present and explain any screen, and classmates watching the defense.
- *Inferred:* sessions are short and guided (an 8 to 10 minute demo), then free exploration by the grader.

## Product Purpose

The digital Enterprise Architecture asset (Product 2 of the final project) for VIRIDIA S.A.S. BIC, a fictitious Caribbean ClimateTech company that installs metering in client plants, computes a baseline with AI, and charges only a share of verified savings. The asset lets a visitor walk the six architecture layers (identity and strategy, business processes, information, applications, technology, transformation) and see how they trace into each other. Success: the grader finds every layer the assignment requires within seconds, sees the same identifiers and figures as the PDF (Product 1), and understands the business mechanism by running the simulation.

## Positioning

Not a brochure: the asset demonstrates the business mechanism. The simulator walks the real process from the client's historical utility bills (prefeasibility and savings potential) through the regression baseline validated with ASHRAE Guideline 14, the contract (RN2), and the monthly close where RN3 (data completeness of at least 95 %) and RN1 (no invoice without verified savings) decide the outcome, and it reproduces the worked example in the PDF.

## Operating Context

- Shown live in class on a projector, then opened by the professor from the link in the PDF (`\enlaceactivo`) and from the delivery platform.
- Must survive a failed network: GitHub Pages link, plus a `.zip` that runs locally, plus the PDF.
- Companion files: `../Documento/VIRIDIA-AE-Final.pdf` (71 pages) and its editable diagrams (`.bpmn`, `.drawio`, `.sql`, `.archimate`).

## Capabilities and Constraints

- Eleven screens from the project plan §4.2: Inicio, Tablero, Estrategia, Procesos (three BPMN diagrams with bpmn-js), Simulador, Información (ER model with CRUD), Aplicaciones, Tecnología, Transformación (As-Is/To-Be, gaps, roadmap), Trazabilidad, Acerca de.
- One source of truth: `data/viridia-ae.js` holds every layer with the PDF's identifiers (OE1–OE5, C1–C10, E1–E3/M1–M5/S1–S6, RN1–RN8, A1–A10, I1–I16, T1–T16, R1–R8, B1–B14, P1–P12, H1–H6). Names, identifiers and figures must match the PDF.
- Figures decided by the team carry the superscript **P** ("propuesta del equipo"), as in the PDF. Worked-example values are illustrative.
- The user asked for modern animations.
- Spanish (Colombia) only.

## Brand Commitments

- Name VIRIDIA S.A.S. BIC; tagline «Inteligencia que devuelve más de lo que consume».
- Palette from the LaTeX documents: viridiaVerde `#1B5E3A`, viridiaLima `#7FBF4D`, viridiaGrafito `#1F2A2E`, viridiaGris `#6B7A78`, viridiaNiebla `#F1F5F1`, viridiaAgua `#2A7B9B`.
- Type from the Corte II presentation: Lato (300–900) and IBM Plex Mono for identifiers and figures.
- Logo: ring that closes on itself (circular economy), leaf (natural resource) and a node network on its veins (AI). SVG version from the Corte II presentation.
- Illustration style chosen by the user: botanical-technical engraving.

## Evidence on Hand

- All content comes from `../Documento/VIRIDIA-AE-Final.tex` (v1.0, November 2026) and its tables; the BPMN files in `../Documento/anexos/`.
- Market data cite their primary sources (IEA, UPME/PROURE, Air-e/CREG, MinEnergía, Alcaldía de Bogotá). The calculation example and simulator clients are illustrative and must be labeled as such.
- There are no real customers, testimonials or measurements: VIRIDIA is fictitious and the site says so.

## Product Principles

1. Same truth as the PDF: one data file, same identifiers, same figures.
2. Show the mechanism working instead of describing it.
3. Every element traces to a capability and an objective.
4. The grader finds any required layer within seconds.
5. Honest labels: propuestas del equipo and illustrative data are marked where they appear.

## Accessibility & Inclusion

*Inferred:* legible on a washed-out classroom projector (high contrast, large type) and on a phone; keyboard operable; `prefers-reduced-motion` respected.
