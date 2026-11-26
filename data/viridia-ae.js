/* VIRIDIA S.A.S. BIC · Activo digital de Arquitectura Empresarial
   FUENTE ÚNICA DE VERDAD. Todo lo que muestra el sitio sale de este objeto.
   Contenido transcrito del documento final (VIRIDIA-AE-FINAL v1.0, noviembre de 2026).
   Es JSON válido envuelto en una asignación para que el sitio abra sin servidor (doble clic).
   Convenciones de texto: {P} = propuesta del equipo (superíndice P, como en el PDF); CO2e se muestra con subíndice.
   Si se cambia un nombre o una cifra aquí, debe cambiarse también en el .tex, y viceversa.
   Comprobación: node tests/verificar.js */
window.VIRIDIA_AE = {
"meta": {
  "empresa": "VIRIDIA S.A.S. BIC",
  "titulo": "Activo digital de Arquitectura Empresarial",
  "documento": "VIRIDIA-AE-FINAL · versión 1.0 · noviembre de 2026",
  "asignatura": "Arquitectura Empresarial",
  "entregable": "Proyecto final. Producto 2: activo digital de Arquitectura Empresarial",
  "universidad": "Universidad Libre · Facultad de Ingeniería",
  "programa": "Ingeniería de Sistemas · VIII semestre",
  "ciudad": "Barranquilla, noviembre de 2026",
  "docente": "Emiro Berrio",
  "equipo": ["Leonardo Alfonso Barraza Cantillo", "Emanuel David Barranco Reales", "Freddy de Jesús Rangel Escobar"],
  "pregunta": "¿Cómo está estructurada la empresa, cómo funciona, qué tecnologías necesita y cómo debe evolucionar para alcanzar sus objetivos estratégicos?",
  "marcos": "TOGAF 9.2 (método ADM y análisis de brechas), ArchiMate 3.2, BPMN 2.0.2, marco de Zachman, IPMVP y ASHRAE Guideline 14",
  "aviso": "VIRIDIA S.A.S. BIC es una compañía ficticia construida por el equipo desde el Taller 1 y no corresponde a ninguna organización existente. Los datos externos provienen de fuentes públicas; las cifras propias se declaran como propuestas o supuestos del equipo.",
  "convencion": "OE1–OE5: objetivos estratégicos. C1–C10: capacidades de negocio. RN1–RN8: reglas de negocio. A1–A10: aplicaciones. I1–I16: integraciones. T1–T16: nodos tecnológicos. R1–R8: riesgos. B1–B14: brechas. P1–P12: proyectos del roadmap. H1–H6: hitos."
},

"identidad": {
  "nombre": "VIRIDIA S.A.S. BIC",
  "eslogan": "Inteligencia que devuelve más de lo que consume",
  "queHace": "VIRIDIA instala medición en la planta del cliente, calcula con inteligencia artificial cuánto debería estar consumiendo, le indica qué cambiar en su operación para gastar menos energía y agua, comprueba el ahorro contra una línea base y cobra solo un porcentaje de lo que el cliente efectivamente ahorró.",
  "resumen": "Compañía colombiana de inteligencia artificial aplicada a la eficiencia de recursos, con sede en Barranquilla. Si no hay ahorro verificado, no hay factura.",
  "clientes": "Sus clientes son plantas de agroindustria, alimentos y bebidas, hoteles y clínicas de la Región Caribe. Tienen la factura mensual, pero no el diagnóstico: no saben qué proceso, en qué turno ni bajo qué condición se generó el sobrecosto. VIRIDIA les aporta ese diagnóstico y responde por el resultado.",
  "origenNombre": "El nombre proviene del latín viridis, que significa verde y, por extensión, vigoroso o lleno de vida, y cierra con las letras IA. Declara así los dos términos que la compañía combina: el recurso natural que busca preservar y la inteligencia artificial con la que lo hace.",
  "logo": "El logotipo integra los tres elementos de la propuesta: el anillo que se cierra sobre sí mismo (economía circular), la hoja (el recurso natural) y la red de nodos sobre su nervadura (la inteligencia artificial).",
  "figura": "Sociedad por acciones simplificada (Ley 1258 de 2008) que adopta voluntariamente la condición de Sociedad de Beneficio e Interés Colectivo (Ley 1901 de 2018): incorpora el compromiso ambiental en su objeto social y reporta cada año su desempeño. La relación con el cliente es simbiótica por diseño: VIRIDIA solo obtiene ingreso cuando el cliente ahorra y el entorno deja de perder.",
  "sector": "Sector de la Inteligencia Artificial, en el segmento de servicios tecnológicos aplicados a la sostenibilidad y la eficiencia de recursos (ClimateTech o GreenTech). Actor del sector terciario cuyo cliente pertenece mayoritariamente al sector secundario (industria manufacturera y agroindustria) y a servicios intensivos en recursos.",
  "problema": "Las organizaciones intensivas en energía y agua de la Región Caribe pagan cada mes por un consumo que no pueden explicar ni anticipar. Disponen de la factura pero no del diagnóstico: no saben qué proceso, en qué momento y bajo qué condición generó el sobrecosto. Gestionan el recurso de manera reactiva, posponen los proyectos de eficiencia por falta de capital y de talento especializado, y cuando los ejecutan carecen de una línea base que permita demostrar el ahorro obtenido.",
  "consecuencias": [
    {"tipo": "Económica", "texto": "Un sobrecosto operativo permanente que se acepta como inevitable, en un país donde la industria aprovecha efectivamente cerca del 55 % de la energía que consume, y en una región cuya tarifa eléctrica se movió más de un 30 % en poco más de un año."},
    {"tipo": "De continuidad", "texto": "Exposición directa a la volatilidad tarifaria, a restricciones de suministro eléctrico y al estrés hídrico, como evidenció el racionamiento de Bogotá entre 2024 y 2025."},
    {"tipo": "Reputacional y comercial", "texto": "Creciente dificultad para responder a los requisitos ambientales de clientes internacionales, cadenas de suministro y financiadores, por ausencia de datos auditables de desempeño."}
  ],
  "datos": [
    {"id": "Dato 1", "titulo": "La IA es hoy parte del problema energético", "cifra": "415 → 945 TWh", "texto": "El consumo eléctrico de los centros de datos se estimó en cerca de 415 TWh en 2024 (1,5 % de la electricidad mundial) y se proyecta que se duplique hasta unos 945 TWh en 2030, creciendo alrededor de 15 % anual; el de servidores acelerados por IA crecería cerca de 30 % anual.", "lectura": "Una empresa de IA con propuesta ecológica debe demostrar un balance neto positivo: ahorrar en sus clientes mucho más de lo que consume. Se traduce en OE2 y OE3.", "fuente": "iea2025"},
    {"id": "Dato 2", "titulo": "Colombia desperdicia la mayor parte de la energía que usa", "cifra": "31 %", "texto": "La eficiencia energética del país es de aproximadamente 31 %: de cada 100 unidades, 69 se pierden. La industria alcanza cerca del 55 % y los procesos térmicos concentran cerca del 88 % de su consumo. El PROURE 2022–2030 estima un potencial de reducción de 1.688 PJ (cerca del 10 % frente al escenario tendencial) y un ahorro en costos industriales de USD 810 a 1.400 millones.", "lectura": "La ineficiencia ya está pagada en la factura: VIRIDIA vende la recuperación de un costo existente, no un gasto adicional.", "fuente": "proure2022"},
    {"id": "Dato 3", "titulo": "La tarifa eléctrica del Caribe es estructuralmente volátil", "cifra": "1.215 → 796 $/kWh", "texto": "En enero de 2024 el costo unitario para los usuarios de Air-e era de 1.215 $/kWh; tras la intervención bajó a cerca de 901 $/kWh en enero de 2025 y a valores del orden de 796 $/kWh (Air-e) y 879 $/kWh (Afinia). MinEnergía reportó reducciones superiores al 28 % en el Caribe frente a un promedio nacional del 16 %.", "lectura": "Lo relevante es el recorrido: una variación superior al 30 % en poco más de un año. Reducir el consumo es la única cobertura que depende del cliente.", "fuente": "caribe2025"},
    {"id": "Dato 4", "titulo": "El riesgo hídrico dejó de ser hipotético", "cifra": "1 año de racionamiento", "texto": "Bogotá entró en racionamiento de agua el 8 de abril de 2024 por El Niño, los incendios forestales y el descenso de los embalses del Sistema Chingaza, que aporta cerca del 70 % del agua potable de la ciudad. La medida se levantó el 12 de abril de 2025.", "lectura": "En el Caribe el estrés hídrico es estructural: el agua es un recurso de primera clase en el portafolio, no un complemento.", "fuente": "bogota2025"}
  ],
  "alcance": "Domicilio en Barranquilla y operación concentrada en la Región Caribe durante el horizonte de la visión: el historial tarifario más alto del país, cargas permanentes de refrigeración y climatización, y una base industrial concentrada en Atlántico, Bolívar, Magdalena, Cesar y Córdoba. El marco nacional acompaña: la Política Nacional de Inteligencia Artificial (CONPES 4144) y el régimen de sociedades BIC.",
  "competencia": "Las consultoras de eficiencia entregan un diagnóstico puntual y se retiran; los fabricantes de medición tienen como incentivo vender hardware; las plataformas internacionales de analítica no están calibradas para la operación del Caribe y trasladan el riesgo al cliente. VIRIDIA ocupa la combinación que ninguno cubre: analítica propia y actualizada, acompañamiento en planta, verificación independiente y remuneración condicionada al resultado.",
  "segmentos": [
    {"segmento": "Primario", "perfil": "Empresas medianas y grandes de agroindustria, alimentos y bebidas del Atlántico, Bolívar, Magdalena, Cesar y Córdoba, con procesos térmicos y cadena de frío intensivos.", "porque": "Los procesos térmicos concentran cerca del 88 % del consumo energético industrial: es donde está el ahorro. La energía pesa de forma directa sobre el costo del producto."},
    {"segmento": "Secundario", "perfil": "Hoteles, clínicas, hospitales y centros comerciales de Barranquilla, Cartagena y Santa Marta.", "porque": "Climatización y consumo hídrico continuos todo el año, sensibilidad a la tarifa y exigencias de certificación ambiental en el turismo."},
    {"segmento": "Terciario", "perfil": "Operadores de infraestructura pública: acueducto y alcantarillado, hospitales públicos y alumbrado de la región.", "porque": "Presión presupuestal, obligaciones de reporte ambiental y necesidad de justificar la inversión ante entes de control."},
    {"segmento": "De expansión", "perfil": "Réplica del modelo en el interior del país hacia el final del horizonte de la visión.", "porque": "Estructura industrial comparable, una vez consolidado el histórico de consumo que da ventaja a la compañía."}
  ],
  "interlocutor": "El interlocutor de compra es el gerente de planta, el jefe de mantenimiento o el responsable de sostenibilidad; el decisor final suele ser la gerencia financiera. La conversación deja de ser ambiental y pasa a ser de flujo de caja.",
  "propuesta": "Convertimos los datos de consumo que su empresa ya genera en ahorro verificado de energía, agua y materiales, sin reemplazar su infraestructura y sin inversión inicial: usted paga una fracción de lo que efectivamente ahorra.",
  "diferenciadores": [
    {"nombre": "Riesgo compartido", "texto": "El contrato es de desempeño: si no hay ahorro verificado, no hay facturación."},
    {"nombre": "Analítica que mejora con el tiempo", "texto": "La línea base se recalcula, se emiten reportes de desviación y predicciones de demanda; la precisión crece con la antigüedad de la relación."},
    {"nombre": "Sin chatarra para el cliente", "texto": "El equipamiento se entrega en comodato y vuelve a VIRIDIA para reacondicionarse o disponerse de forma responsable."},
    {"nombre": "Coherencia demostrable", "texto": "VIRIDIA opera con energía renovable, composta sus residuos orgánicos y publica su propio balance de recursos."},
    {"nombre": "Evidencia utilizable", "texto": "El reporte de medición y verificación sirve ante auditorías, certificaciones y financiadores: el ahorro sirve dos veces."}
  ],
  "compromiso": "VIRIDIA compromete reducciones de entre 8 % y 22 % en consumo energético y entre 10 % y 30 % en consumo hídrico sobre la línea base del cliente, según sector y madurez. La cifra se fija en cada contrato después de la caracterización inicial, nunca antes (RN2).",
  "niveles": [
    {"nivel": "Modelo de negocio", "pregunta": "¿Cómo gana dinero?", "respuesta": "Contrato de desempeño de ahorro compartido: 40 %{P} del ahorro verificado para VIRIDIA y 60 % para el cliente. Sin ahorro no hay factura."},
    {"nivel": "Modelo operativo", "pregunta": "¿Cómo produce el ahorro?", "respuesta": "Mide en planta, construye la línea base, diagnostica dónde está el desperdicio, acompaña los cambios en la operación y verifica el resultado."},
    {"nivel": "Coherencia ambiental", "pregunta": "¿Practica lo que vende?", "respuesta": "Sede propia con energía renovable, compostaje y separación en la fuente. Los equipos de medición se prestan en comodato y vuelven para reacondicionarse."}
  ],
  "queNoEs": [
    {"titulo": "No vende sensores ni equipos", "texto": "Los presta en comodato y siguen siendo suyos."},
    {"titulo": "No vende licencias de software", "texto": "El cliente ve un tablero, pero paga por el ahorro, no por usuario."},
    {"titulo": "No es consultoría por horas", "texto": "No entrega un informe y se va: acompaña la ejecución y responde por el resultado."},
    {"titulo": "No cambia la maquinaria del cliente", "texto": "El ahorro sale de operar mejor lo que ya existe: combustión en calderas, setpoints y deshielo en cuartos fríos, fugas de aire comprimido y de agua, cargas movidas de hora pico a hora valle. Si una medida exige inversión, VIRIDIA la propone con su retorno y la financia el cliente{P}."}
  ],
  "calculo": {
    "intro": "El ahorro no se mide: se calcula. Se compara el consumo real con el que se habría tenido sin la intervención, la línea base, según IPMVP (opción C o B) y la validación estadística de ASHRAE Guideline 14.",
    "pasos": [
      "Periodo de referencia: 12 meses{P} de consumo previos a la intervención, con las variables que lo explican: producción, grados-día de enfriamiento (CDD) y horas de operación.",
      "Modelo de línea base: E base = a + b·Producción + c·CDD. Con datos mensuales se acepta solo si CV(RMSE) ≤ 15 % y NMBE dentro de ±5 %. Si no cumple, se mide más o se agregan variables.",
      "Ahorro de cada mes: la línea base se evalúa con la producción y el clima reales del mes. Ahorro = E ajustada − E real ± ajustes no rutinarios; % de reducción = Ahorro / E ajustada × 100."
    ],
    "ejemplo": {
      "planta": "Planta de alimentos (todos los valores de la planta son supuestos; ejemplo ilustrativo)",
      "a": 120000, "b": 0.45, "c": 900,
      "produccion": 400000, "cdd": 300, "real": 495000,
      "tarifa": 796, "participacion": 0.40, "factor": 0.220,
      "esperado": 570000, "ahorro": 75000, "pct": 13.2,
      "pesos": 59700000, "factura": 23880000, "cliente": 35820000, "tco2e": 16.5
    },
    "nota": "El 13,2 % queda dentro del rango de 8 % a 22 % que VIRIDIA compromete en energía. El factor de 0,220 tCO2e/MWh es el del Sistema Interconectado Nacional 2024 (UPME); la tarifa de 796 $/kWh es la de referencia de Air-e. La tarifa de cada cliente se toma de su propia factura."
  }
},

"estrategia": {
  "mision": "Somos una compañía colombiana de inteligencia artificial que reduce el consumo de energía, agua y materiales en organizaciones intensivas en recursos, convirtiendo sus propios datos de consumo en ahorro medible e impacto ambiental verificable, bajo el mismo estándar sostenible que aplicamos en nuestra operación.",
  "misionElementos": [
    {"elemento": "Quiénes somos", "texto": "Una compañía colombiana de inteligencia artificial, constituida como sociedad de beneficio e interés colectivo."},
    {"elemento": "Qué hacemos", "texto": "Reducimos el consumo de energía, agua y materiales convirtiendo los datos de consumo en decisiones de eficiencia."},
    {"elemento": "Para quién", "texto": "Organizaciones intensivas en recursos: agroindustria, alimentos y bebidas, hotelería, salud e infraestructura pública."},
    {"elemento": "Qué valor entregamos", "texto": "Ahorro medible, impacto ambiental verificable y la coherencia de una compañía que aplica en sí misma lo que propone."}
  ],
  "notaCoherencia": "Incluir la operación propia en la misión impide que la empresa se convierta en un proveedor de software con discurso ambiental: genera un objetivo (OE3) y una capacidad dedicada (C6).",
  "vision": "En 2031 seremos la compañía de referencia en la Región Caribe colombiana en inteligencia artificial para la eficiencia de recursos, reconocidos por demostrar con verificación independiente que la IA puede ahorrar mucho más de lo que consume, y por haber evolucionado de la eficiencia energética e hídrica hacia la gestión integral de recursos bajo economía circular.",
  "visionElementos": [
    {"elemento": "Posición a alcanzar", "texto": "Compañía de referencia en la Región Caribe colombiana, con presencia comercial en los ocho departamentos de la región."},
    {"elemento": "Impacto a generar", "texto": "90 GWh de energía y 2,2 millones de m³ de agua ahorrados de forma acumulada en los clientes, equivalentes a 35.000 toneladas de CO2e evitadas."},
    {"elemento": "Cómo queremos ser reconocidos", "texto": "Como la empresa que demostró con evidencia auditada que la inteligencia artificial puede tener balance ambiental neto positivo."},
    {"elemento": "Hacia dónde evolucionamos", "texto": "De un servicio de eficiencia energética e hídrica hacia una gestión integral de recursos, extendida a materiales y residuos bajo economía circular."}
  ],
  "objetivos": [
    {"id": "OE1", "nombre": "Liderazgo de mercado en IA para eficiencia de recursos", "corto": "Liderazgo de mercado en el Caribe", "verbo": "Consolidar", "enunciado": "Consolidar a VIRIDIA como el proveedor de referencia en la Región Caribe colombiana en inteligencia artificial aplicada a la eficiencia de recursos, alcanzando en 2031 una base de 120 clientes corporativos activos en los sectores foco y presencia comercial en los ocho departamentos de la región.", "meta": "120 clientes activos en 2031"},
    {"id": "OE2", "nombre": "Impacto ambiental verificable en los clientes", "corto": "Impacto verificable en clientes", "verbo": "Demostrar", "enunciado": "Demostrar impacto ambiental verificable en la operación de los clientes, acumulando al 2031 un ahorro de 90 GWh de energía y 2,2 millones de m³ de agua, equivalentes a 35.000 toneladas de CO2e evitadas, bajo verificación independiente anual.", "meta": "90 GWh · 2,2 M m³ · 35.000 tCO2e"},
    {"id": "OE3", "nombre": "Operación propia circular, renovable y de residuo cero", "corto": "Operación propia circular y renovable", "verbo": "Operar", "enunciado": "Operar la compañía como caso demostrativo del modelo que vende, alcanzando antes de 2029 el 100 % de abastecimiento eléctrico con fuentes renovables, cero residuos orgánicos enviados a relleno sanitario y una tasa de recuperación y reincorporación del equipamiento instalado superior al 95 %.", "meta": "100 % renovable antes de 2029"},
    {"id": "OE4", "nombre": "Base de capital de impacto alineada con la misión", "corto": "Capital de impacto alineado a la misión", "verbo": "Asegurar", "enunciado": "Asegurar una base patrimonial de capital paciente y alineado, manteniendo al menos el 70 % de la participación accionaria en manos de inversionistas que suscriban formalmente el pacto de propósito BIC y reporten bajo criterios ESG, sin comprometer el compromiso ambiental estatutario.", "meta": "≥ 70 % del capital con pacto BIC"},
    {"id": "OE5", "nombre": "Capacidad científica y talento propio", "corto": "Capacidad científica y talento propio", "verbo": "Desarrollar", "enunciado": "Desarrollar capacidad científica propia que sostenga la ventaja competitiva, destinando de forma sostenida al menos el 20 % de la nómina a investigación aplicada, protegiendo al menos tres desarrollos propios y manteniendo alianzas activas de I+D con cuatro universidades de la región al 2031.", "meta": "20 % de la nómina en I+D · 3 desarrollos protegidos"}
  ],
  "criterioObjetivos": "Se descartaron enunciados operativos del tipo «instalar medidores en cien plantas» porque describen medios y no resultados. Cada objetivo podría alcanzarse por varias rutas: es la señal de que está en el nivel estratégico.",
  "capacidades": [
    {"id": "C1", "nombre": "Investigación y desarrollo en inteligencia artificial aplicada a recursos", "corto": "I+D en IA aplicada", "oe": {"OE1": "S", "OE5": "P"}, "porque": "Sin capacidad propia de crear, entrenar y mejorar sus modelos, VIRIDIA sería un revendedor de tecnología de terceros: no podría diferenciarse, adaptar el análisis a una planta del Caribe ni sostener sus márgenes. Es la fuente de renovación del servicio."},
    {"id": "C2", "nombre": "Analítica histórica y prospectiva del consumo de recursos", "corto": "Analítica histórica y prospectiva", "oe": {"OE1": "S", "OE2": "P"}, "critica": true, "porque": "Captar, normalizar, custodiar y actualizar periódicamente las series de consumo de cada cliente y convertirlas en líneas base, reportes de desviación y predicciones. Sin una línea base confiable no existe ahorro demostrable y no hay nada que facturar. Es el activo que se acumula con el tiempo."},
    {"id": "C3", "nombre": "Diagnóstico y optimización de la operación del cliente", "corto": "Diagnóstico y optimización", "oe": {"OE1": "P", "OE2": "S"}, "porque": "El hallazgo analítico no ahorra nada por sí solo: hay que traducirlo en cambios de operación (parámetros, secuencias, fugas, cargas) y acompañar su ejecución en planta. Sin esta capacidad la analítica produce informes que nadie ejecuta."},
    {"id": "C4", "nombre": "Medición, verificación y reporte de impacto ambiental", "corto": "Medición y verificación", "oe": {"OE2": "P", "OE4": "S"}, "porque": "Convierte el ahorro en un hecho auditable frente al cliente, el inversionista y el regulador. Sostiene la facturación por desempeño, el reporte anual BIC y la evidencia para las certificaciones del cliente."},
    {"id": "C5", "nombre": "Gestión comercial y contractual por desempeño", "corto": "Gestión comercial por desempeño", "oe": {"OE1": "P", "OE4": "S"}, "porque": "Vender y administrar contratos de ahorro compartido exige dimensionar riesgo, garantías, línea base contractual y flujo de caja: un modelo distinto al de la consultoría por horas."},
    {"id": "C6", "nombre": "Gestión de la operación verde interna", "corto": "Operación verde interna", "oe": {"OE3": "P"}, "porque": "La coherencia entre lo que la empresa vende y lo que practica es parte de la propuesta de valor y condición del estatus BIC: energías renovables, separación en la fuente (Resolución 2184 de 2019) y compostaje."},
    {"id": "C7", "nombre": "Gestión del ciclo de vida circular del equipamiento", "corto": "Ciclo de vida circular", "oe": {"OE2": "S", "OE3": "P"}, "porque": "Los dispositivos se entregan en comodato y retornan: hay que recuperarlos, reacondicionarlos, reutilizarlos y disponer responsablemente de los RAEE. Sin esta capacidad el modelo circular sería una declaración."},
    {"id": "C8", "nombre": "Gestión de capital de impacto y relación con inversionistas ESG", "corto": "Capital de impacto y ESG", "oe": {"OE1": "S", "OE4": "P"}, "porque": "El modelo por desempeño es intensivo en capital de trabajo: la empresa financia el equipamiento y cobra después. Requiere atraer y mantener inversionistas compatibles con el propósito."},
    {"id": "C9", "nombre": "Gobernanza de datos, ética de la IA y cumplimiento normativo", "corto": "Gobernanza de datos y ética", "oe": {"OE2": "S", "OE4": "S", "OE5": "S"}, "porque": "La empresa opera con información sensible de terceros: protección de datos, uso ético de la IA y normativa ambiental y societaria. Un incidente de confidencialidad o un modelo sesgado destruirían la confianza."},
    {"id": "C10", "nombre": "Gestión del talento y del conocimiento verde-digital", "corto": "Talento verde-digital", "oe": {"OE1": "S", "OE5": "P"}, "porque": "El perfil que combina ingeniería de procesos, ciencia de datos y gestión ambiental es escaso en la región: VIRIDIA debe formarlo, retenerlo y documentar el conocimiento."}
  ],
  "lecturaMatriz": "No hay capacidad huérfana (todas las filas tienen relación) ni objetivo desatendido (todas las columnas tienen al menos una relación principal). OE1 y OE2 concentran once de las veinte relaciones; OE3 se sostiene con solo dos capacidades, ambas principales: es el objetivo más expuesto.",
  "critica": {
    "capacidad": "C2",
    "definicion": "Capacidad de captar, normalizar, custodiar y actualizar periódicamente las series históricas de consumo de energía, agua y materiales de cada cliente, y de convertirlas en líneas base confiables, reportes de desviación y predicciones de demanda.",
    "soporta": "OE2, impacto ambiental verificable (principal); OE1, liderazgo de mercado (habilitante).",
    "modos": [
      {"titulo": "Falla de calidad", "texto": "Series con vacíos, unidades inconsistentes o sin control de producción, clima, turnos o paradas producen una línea base errónea: se factura un ahorro que no ocurrió o se deja de facturar uno que sí. En un modelo por desempeño, un error de medición es un error de facturación."},
      {"titulo": "Falla de actualización", "texto": "Si el análisis deja de actualizarse, la degradación es silenciosa: cifras con apariencia normal, cada vez más lejos de la operación real. El cliente lo detecta antes que el proveedor y el daño es de confianza."},
      {"titulo": "Falla de continuidad y de gobernanza", "texto": "Perder, corromper o filtrar el acervo histórico destruye el activo diferencial (no se puede volver a medir el pasado), genera responsabilidad legal (Ley 1581) y elimina el costo de cambio del cliente."}
    ],
    "consecuencia": "Encadenados, estos modos de falla arrastran a tres de los cinco objetivos: sin ahorro demostrable el modelo por desempeño se vuelve inviable, la tesis de inversión de impacto pierde sustento (OE4) y sin capital paciente el modelo circular deja de ser sostenible (OE3).",
    "alternativas": [
      {"id": "C1", "texto": "Su valor solo se materializa a través de C2: un modelo excelente con series deficientes predice mal. Una pausa en I+D degrada la competitividad futura, pero no impide cobrar el mes siguiente; una falla en C2 sí."},
      {"id": "C4", "texto": "Es consecuencia y no causa: verifica contra una línea base que C2 construye. Si C4 falla, la verificación puede reconstruirse o contratarse; si C2 falla, no hay contra qué verificar."}
    ],
    "acumulativo": "C2 es la única capacidad con efecto acumulativo: cada mes de operación añade historia verificada, y en tres o cuatro años ese acervo es un activo que un entrante no puede comprar ni reconstruir.",
    "implicacion": "La tecnología se decide después, en función de lo que la organización debe ser capaz de hacer."
  },
  "motivacion": [
    {"tipo": "Impulsor", "texto": "El costo de la energía y el agua en la industria del Caribe."},
    {"tipo": "Curso de acción", "texto": "El contrato de desempeño por ahorro compartido."},
    {"tipo": "Recurso", "texto": "El histórico de consumo acumulado, que sostiene C2."},
    {"tipo": "Recurso", "texto": "Los equipos en comodato, que sostienen C7."}
  ]
},

"negocio": {
  "gobierno": "Asamblea de accionistas · Junta Directiva · Comité de Impacto BIC (garante estatutario del propósito ambiental)",
  "areas": [
    {"id": "GER", "nombre": "Gerencia General y Estrategia", "funcion": "Define la dirección, asigna recursos entre capacidades y responde ante la Junta por los objetivos estratégicos.", "capacidades": ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"]},
    {"id": "IDI", "nombre": "I+D e Innovación en IA", "funcion": "Investiga, desarrolla y mejora los modelos analíticos propios y adapta el conocimiento internacional al Caribe.", "capacidades": ["C1", "C2"]},
    {"id": "ENT", "nombre": "Entrega de Servicio y Eficiencia Operativa", "funcion": "Ejecuta el servicio en el cliente: caracterización, diagnóstico, acompañamiento en planta y seguimiento del plan de eficiencia.", "capacidades": ["C3", "C4"]},
    {"id": "TEC", "nombre": "Tecnología y Gobierno de Datos", "funcion": "Administra la captura, custodia, calidad y actualización de la información de consumo, y vela por su seguridad.", "capacidades": ["C2", "C9"]},
    {"id": "SOS", "nombre": "Sostenibilidad y Operaciones Verdes", "funcion": "Gestiona la huella propia: autogeneración renovable, compostaje, separación en la fuente y logística inversa del equipamiento.", "capacidades": ["C6", "C7"]},
    {"id": "COM", "nombre": "Comercial y Mercadeo", "funcion": "Origina la demanda; construye y administra los contratos de ahorro compartido y la relación con el cliente.", "capacidades": ["C5"]},
    {"id": "FIN", "nombre": "Finanzas, Inversión y Relación con Socios", "funcion": "Gestiona la tesorería del modelo por desempeño y la relación con inversionistas de impacto y su reporte ESG.", "capacidades": ["C8", "C5"]},
    {"id": "LEG", "nombre": "Legal, Cumplimiento y Ética de la IA", "funcion": "Asegura el cumplimiento normativo, la protección de datos, las obligaciones BIC y el uso ético de la IA.", "capacidades": ["C9"]},
    {"id": "TAL", "nombre": "Talento Humano y Cultura", "funcion": "Atrae, forma y retiene el perfil híbrido que la empresa requiere y sostiene la cultura de coherencia ambiental.", "capacidades": ["C10"]}
  ],
  "criterioAreas": "Nueve áreas para diez capacidades: ninguna capacidad queda sin responsable y ninguna área existe sin una capacidad que justifique su costo. Tecnología (operación diaria del dato) e I+D (conocimiento nuevo) están separadas a propósito.",
  "procesos": [
    {"id": "E1", "tipo": "estrategico", "nombre": "Direccionamiento estratégico y gobierno BIC", "capacidades": ["todas"]},
    {"id": "E2", "tipo": "estrategico", "nombre": "Gestión de la innovación e I+D en IA", "capacidades": ["C1"]},
    {"id": "E3", "tipo": "estrategico", "nombre": "Gestión de capital de impacto e inversionistas", "capacidades": ["C8"]},
    {"id": "M1", "tipo": "misional", "nombre": "Comercializar contratos de desempeño", "capacidades": ["C5"], "fases": [1, 2, 5]},
    {"id": "M2", "tipo": "misional", "nombre": "Incorporar al cliente y construir la línea base", "capacidades": ["C2", "C7"], "fases": [3, 4]},
    {"id": "M3", "tipo": "misional", "nombre": "Diagnosticar y optimizar la operación", "capacidades": ["C3"], "fases": [6, 7]},
    {"id": "M4", "tipo": "misional", "nombre": "Medir, verificar y facturar el ahorro", "capacidades": ["C2", "C4", "C5"], "fases": [8, 9, 10, 11]},
    {"id": "M5", "tipo": "misional", "nombre": "Renovar o cerrar y recuperar equipos", "capacidades": ["C5", "C7"], "fases": [12]},
    {"id": "S1", "tipo": "apoyo", "nombre": "Gobierno de datos y tecnología", "capacidades": ["C2", "C9"]},
    {"id": "S2", "tipo": "apoyo", "nombre": "Activos en comodato y reacondicionamiento", "capacidades": ["C7"]},
    {"id": "S3", "tipo": "apoyo", "nombre": "Gestión financiera y facturación", "capacidades": ["C5", "C8"]},
    {"id": "S4", "tipo": "apoyo", "nombre": "Legal, cumplimiento y ética de la IA", "capacidades": ["C9"]},
    {"id": "S5", "tipo": "apoyo", "nombre": "Talento y conocimiento verde-digital", "capacidades": ["C10"]},
    {"id": "S6", "tipo": "apoyo", "nombre": "Operación verde interna", "capacidades": ["C6"]}
  ],
  "mapaEntrada": "Cliente: consume energía y agua que no puede explicar ni anticipar",
  "mapaSalida": "Cliente: ahorro verificado, reporte MRV y equipos recuperados",
  "notaMapa": "Los principales son los cinco misionales (M1–M5), porque producen el ingreso. Los estratégicos (E1–E3) y los de apoyo (S1–S6) crean las condiciones para que la cadena funcione. E1, E3, S5 y S6 son internos y de baja frecuencia; S1 a S4 aparecen dentro de los BPMN como carriles y actividades de apoyo.",
  "actores": [
    {"nombre": "Asamblea, Junta Directiva y Comité de Impacto BIC", "tipo": "Gobierno", "papel": "Aprueban la estrategia, vigilan el propósito estatutario y reciben el informe BIC anual.", "procesos": ["E1", "E3"]},
    {"nombre": "Gerencia General y Estrategia", "tipo": "Interno", "papel": "Asigna recursos entre capacidades y preside el comité de arquitectura.", "procesos": ["E1"]},
    {"nombre": "Comercial y Mercadeo", "tipo": "Interno", "papel": "Origina clientes, negocia el contrato de desempeño y ofrece la renovación.", "procesos": ["M1", "M5"]},
    {"nombre": "Entrega de Servicio y Eficiencia Operativa", "tipo": "Interno", "papel": "El ingeniero de eficiencia diagnostica y acompaña las medidas en planta; el ingeniero de cuenta emite reportes y alertas.", "procesos": ["M3", "M4"]},
    {"nombre": "Tecnología y Gobierno de Datos", "tipo": "Interno", "papel": "Instala la medición, custodia y valida los datos y opera la plataforma.", "procesos": ["M2", "M4", "S1"]},
    {"nombre": "I+D e Innovación en IA", "tipo": "Interno", "papel": "El científico de datos ajusta y recalcula la línea base y mejora los modelos.", "procesos": ["E2", "M2", "M4"]},
    {"nombre": "Finanzas, Inversión y Relación con Socios", "tipo": "Interno", "papel": "Liquida la participación, factura y reporta a inversionistas.", "procesos": ["M4", "S3", "E3"]},
    {"nombre": "Legal, Cumplimiento y Ética de la IA", "tipo": "Interno", "papel": "Formaliza confidencialidad y comodato, y vela por la Ley 1581 y la ética de la IA.", "procesos": ["M1", "S4"]},
    {"nombre": "Sostenibilidad y Operaciones Verdes", "tipo": "Interno", "papel": "Retira y reacondiciona los equipos y gestiona la huella propia.", "procesos": ["M5", "S2", "S6"]},
    {"nombre": "Talento Humano y Cultura", "tipo": "Interno", "papel": "Forma y retiene el perfil híbrido de ingeniería, datos y ambiente.", "procesos": ["S5"]},
    {"nombre": "Cliente: gerente de planta y jefe de mantenimiento", "tipo": "Externo", "papel": "Da acceso a la planta, consulta el tablero y ejecuta las medidas con el ingeniero.", "procesos": ["M1", "M2", "M3", "M4", "M5"]},
    {"nombre": "Cliente: gerencia financiera", "tipo": "Externo", "papel": "Firma el contrato, revisa el reporte mensual y paga la factura.", "procesos": ["M1", "M4"]},
    {"nombre": "Verificador independiente", "tipo": "Externo", "papel": "Revisa una vez al año la metodología y el ahorro (RN7).", "procesos": ["M4"]},
    {"nombre": "Inversionistas de impacto", "tipo": "Externo", "papel": "Aportan capital paciente y reciben el reporte ESG.", "procesos": ["E3"]},
    {"nombre": "Contratista eléctrico certificado RETIE", "tipo": "Externo", "papel": "Hace las conexiones de los medidores en los tableros del cliente.", "procesos": ["M2"]},
    {"nombre": "Proveedor tecnológico de facturación electrónica", "tipo": "Externo", "papel": "Valida y transmite la factura electrónica ante la DIAN.", "procesos": ["M4", "S3"]},
    {"nombre": "Universidades aliadas", "tipo": "Externo", "papel": "Investigación aplicada conjunta (OE5).", "procesos": ["E2"]}
  ],
  "flujo": [
    {"etapa": "Incorporación", "fases": ["Prefactibilidad con facturas", "Confidencialidad y comodato", "Instalación de medidores", "Periodo de referencia y línea base", "Contrato de desempeño (el porcentaje comprometido se fija aquí, después de medir)", "Diagnóstico", "Implementación de medidas con su personal"], "obtiene": "Línea base firmada y plan de medidas, sin inversión inicial."},
    {"etapa": "Operación", "fases": ["Monitoreo continuo con alertas", "Cierre mensual: cálculo, reporte y, si hubo ahorro, factura", "Recálculo trimestral de la línea base", "Verificación anual por un tercero independiente"], "obtiene": "Ahorro mensual verificado y reporte MRV útil para auditorías."},
    {"etapa": "Cierre", "fases": ["Renovación del contrato, o retiro y reacondicionamiento de los equipos"], "obtiene": "Sin chatarra electrónica en su planta."}
  ],
  "decisiones": "Participación de VIRIDIA en el ahorro verificado: 40 %{P}. Duración del contrato: 3 a 5 años{P}. Periodo de referencia: 12 meses{P}. Si el ahorro anual queda por debajo del mínimo comprometido, el cliente puede terminar sin penalidad y VIRIDIA retira los equipos sin costo{P}. Las medidas que requieren inversión las financia el cliente{P}.",
  "reglas": [
    {"id": "RN1", "texto": "No se factura sin ahorro verificado. Si el ahorro del periodo es ≤ 0, no hay factura.", "origen": "Propuesta de valor, Taller 1"},
    {"id": "RN2", "texto": "El porcentaje de ahorro comprometido se fija después de la caracterización, nunca antes.", "origen": "Compromiso comercial, Taller 1"},
    {"id": "RN3", "texto": "No se calcula ahorro de un periodo con completitud de datos menor del 95 %.", "origen": "Zachman, fila Operación"},
    {"id": "RN4", "texto": "Un medidor que pasa más de 24 horas sin reportar genera alerta de mantenimiento.", "origen": "Zachman, fila Operación"},
    {"id": "RN5", "texto": "Un consumo real fuera de la banda esperada (±10 %) genera alerta de desviación al cliente.", "origen": "Zachman, fila Arquitecto"},
    {"id": "RN6", "texto": "La línea base se recalcula cada trimestre y queda versionada; toda factura se traza a la versión que la originó.", "origen": "Zachman, filas Arquitecto y Diseñador"},
    {"id": "RN7", "texto": "Un tercero independiente verifica el ahorro una vez al año; su reporte alimenta el informe BIC y el reporte ESG.", "origen": "OE2 y OE4, Taller 1"},
    {"id": "RN8", "texto": "Al cerrar el contrato, todo equipo en comodato vuelve a VIRIDIA (meta de recuperación mayor del 95 %).", "origen": "OE3 y C7, Taller 1"}
  ],
  "diagramas": [
    {"id": "bpmn1", "titulo": "Incorporación del cliente", "fases": "Fases 1 a 7", "archivo": "VIRIDIA-BPMN-1-incorporacion.bpmn", "texto": "Empieza en el Cliente, que solicita el servicio y envía sus facturas. Comercial evalúa la prefactibilidad; si no hay potencial, VIRIDIA cierra con un aviso. Si lo hay, Legal formaliza confidencialidad y comodato, Tecnología instala medidores y pasarela (A8) y captura doce meses de referencia (A2), e I+D ajusta la línea base (A3). Si el modelo no cumple ASHRAE Guideline 14, el flujo vuelve a la captura. Solo entonces se negocia el contrato (A6): así se cumple RN2. El enlace B recibe las renovaciones sin repetir instalación ni línea base."},
    {"id": "bpmn2", "titulo": "Operación y cierre del contrato", "fases": "Fases 8 a 12", "texto": "Dos ramas en paralelo. Arriba, el monitoreo continuo con dos eventos de borde que no lo interrumpen: medidor sin datos más de 24 h (RN4) y consumo fuera de la banda de ±10 % (RN5). Abajo, el calendario: cada mes el cierre mensual (subproceso), cada trimestre el recálculo de la línea base (RN6) y cada año el expediente MRV para el verificador, cuyo reporte alimenta el informe BIC y el ESG (RN7). Al terminar el contrato, Comercial ofrece la renovación; si no se renueva, Sostenibilidad retira y reacondiciona los equipos (RN8).", "archivo": "VIRIDIA-BPMN-2-operacion-y-cierre.bpmn"},
    {"id": "bpmn3", "titulo": "Cierre mensual: cálculo y facturación del ahorro verificado", "fases": "Subproceso mensual", "texto": "Donde coinciden C2, C4 y el cobro. Tres caminos y tres fines: si la completitud es menor del 95 % se intenta recuperar del respaldo de 72 h o por lectura manual, y si no se logra el periodo queda pendiente (RN3); si hubo un evento no rutinario, el ajuste se documenta y se acuerda con el cliente; el reporte mensual se envía siempre, y si el ahorro es ≤ 0 no se factura (RN1). Si es positivo, Finanzas liquida el 40 %{P} y emite la factura electrónica.", "archivo": "VIRIDIA-BPMN-3-cierre-mensual.bpmn"}
  ],
  "convenciones": "Pools a la izquierda: Cliente, VIRIDIA (un carril por área) y, cuando participa, el Verificador. Los pools se comunican solo por flujos de mensaje. Los cilindros son aplicaciones del catálogo y los documentos son entidades del MER. La compuerta con X decide (Sí/No), la vacía «Unión» junta caminos y la de + abre ramas en paralelo. Las tres figuras se unen por los enlaces A y B.",
  "actividades": [
    {"k": "bpmn1:v_eval", "nombre": "Evaluar prefactibilidad con facturas históricas", "responsable": "Comercial y Mercadeo", "reglas": ["RN2"], "nota": "Solo estima potencial; no compromete cifras."},
    {"k": "bpmn1:v_gw1", "nombre": "¿Hay potencial de ahorro?", "tipo": "decision", "responsable": "Comercial y Mercadeo", "reglas": [], "nota": "No: fin «Prospecto descartado»."},
    {"k": "bpmn1:v_form", "nombre": "Formalizar confidencialidad y comodato", "responsable": "Legal y Cumplimiento", "reglas": ["RN8"], "nota": "El acta de comodato fija la devolución."},
    {"k": "bpmn1:v_inst", "nombre": "Instalar medidores y pasarela de planta", "responsable": "Tecnología y Datos", "reglas": ["RN8"], "nota": "Serial registrado por punto de medición."},
    {"k": "bpmn1:v_cap", "nombre": "Capturar datos del periodo de referencia (12 meses)", "responsable": "Tecnología y Datos", "reglas": ["RN3"], "nota": "12 meses{P} de lecturas y variables."},
    {"k": "bpmn1:v_adj", "nombre": "Ajustar modelo de línea base", "responsable": "I+D en IA", "reglas": ["RN6"], "nota": "Produce la versión 1."},
    {"k": "bpmn1:v_gw3", "nombre": "¿Cumple ASHRAE Guideline 14?", "tipo": "decision", "responsable": "I+D en IA", "reglas": [], "nota": "No: volver a medir."},
    {"k": "bpmn1:v_neg", "nombre": "Negociar y firmar contrato de desempeño", "responsable": "Comercial, con Finanzas y Legal", "reglas": ["RN2"], "nota": "40 %{P}, 3 a 5 años{P}."},
    {"k": "bpmn1:v_diag", "nombre": "Diagnosticar desperdicio y priorizar medidas", "responsable": "Entrega de Servicio, con I+D", "reglas": [], "nota": "Inversiones las financia el cliente{P}."},
    {"k": "bpmn1:v_acom", "nombre": "Acompañar la implementación de medidas en planta", "responsable": "Entrega de Servicio", "reglas": [], "nota": "Con el personal del cliente."},
    {"k": "bpmn1:c_sol", "nombre": "Solicitar el servicio y enviar las facturas", "responsable": "Cliente", "reglas": [], "nota": "Inicia el proceso de VIRIDIA."},
    {"k": "bpmn1:c_res", "nombre": "Revisar el resultado de prefactibilidad", "responsable": "Cliente", "reglas": ["RN2"], "nota": "Recibe el aviso o la propuesta."},
    {"k": "bpmn1:c_gw", "nombre": "¿Hay propuesta?", "tipo": "decision", "responsable": "Cliente", "reglas": [], "nota": "No: fin «Sin servicio»."},
    {"k": "bpmn1:c_firm", "nombre": "Firmar el comodato y dar acceso a la planta", "responsable": "Cliente", "reglas": ["RN8"], "nota": "El acceso habilita la instalación."},
    {"k": "bpmn1:c_cont", "nombre": "Firmar el contrato de desempeño", "responsable": "Cliente", "reglas": ["RN2"], "nota": "Después de la línea base."},
    {"k": "bpmn1:c_eje", "nombre": "Ejecutar las medidas con el ingeniero", "responsable": "Cliente", "reglas": [], "nota": "Con acompañamiento en planta."},
    {"k": "bpmn2:v_mon", "nombre": "Monitorear consumo y estado de medidores", "responsable": "Tecnología y Datos", "reglas": ["RN4", "RN5"], "nota": "Tarea en bucle mientras el contrato esté vigente."},
    {"k": "bpmn2:b24", "nombre": "Medidor sin datos > 24 h", "tipo": "evento", "responsable": "Tecnología y Datos", "reglas": ["RN4"], "nota": "Evento condicional de borde: no interrumpe el monitoreo."},
    {"k": "bpmn2:bband", "nombre": "Consumo fuera de banda ±10 %", "tipo": "evento", "responsable": "Tecnología y Datos", "reglas": ["RN5"], "nota": "Evento condicional de borde: no interrumpe el monitoreo."},
    {"k": "bpmn2:v_rep", "nombre": "Reparar o reemplazar el medidor", "responsable": "Entrega de Servicio", "reglas": ["RN4"], "nota": "Disparada por el evento de 24 h."},
    {"k": "bpmn2:v_al", "nombre": "Emitir alerta de desviación al cliente", "responsable": "Entrega de Servicio", "reglas": ["RN5"], "nota": "Disparada por la banda de ±10 %."},
    {"k": "bpmn2:v_call", "nombre": "Cierre mensual: cálculo y facturación del ahorro verificado", "responsable": "Finanzas e Inversión", "reglas": ["RN1", "RN3"], "nota": "Actividad de llamada: se detalla en el subproceso de cierre mensual."},
    {"k": "bpmn2:v_gq", "nombre": "¿Fin de trimestre?", "tipo": "decision", "responsable": "Finanzas e Inversión", "reglas": ["RN6"], "nota": "Sí: recalcular la línea base."},
    {"k": "bpmn2:v_rec", "nombre": "Recalcular línea base (nueva versión)", "responsable": "I+D en IA", "reglas": ["RN6"], "nota": "Cada trimestre; la versión anterior se conserva."},
    {"k": "bpmn2:v_ga", "nombre": "¿Fin de año contractual?", "tipo": "decision", "responsable": "Finanzas e Inversión", "reglas": ["RN7"], "nota": "Sí: expediente MRV anual."},
    {"k": "bpmn2:v_mrv", "nombre": "Preparar expediente MRV anual", "responsable": "Entrega de Servicio", "reglas": ["RN7"], "nota": "Se envía al verificador."},
    {"k": "bpmn2:v_cons", "nombre": "Consolidar informe BIC y reporte ESG", "responsable": "Sostenibilidad, con Finanzas", "reglas": ["RN7"], "nota": "Usa el reporte de verificación."},
    {"k": "bpmn2:v_gt", "nombre": "¿Termina el contrato?", "tipo": "decision", "responsable": "Finanzas e Inversión", "reglas": [], "nota": "Plazo o terminación sin penalidad{P}."},
    {"k": "bpmn2:v_of", "nombre": "Ofrecer la renovación al cliente", "responsable": "Comercial y Mercadeo", "reglas": [], "nota": "Espera la respuesta del cliente."},
    {"k": "bpmn2:v_gr", "nombre": "¿Se renueva el contrato?", "tipo": "decision", "responsable": "Comercial y Mercadeo", "reglas": [], "nota": "Sí: enlace B a la negociación."},
    {"k": "bpmn2:v_ret", "nombre": "Retirar y reacondicionar equipos", "responsable": "Sostenibilidad", "reglas": ["RN8"], "nota": "Fin «Contrato cerrado»."},
    {"k": "bpmn2:c_aj", "nombre": "Ajustar la operación según la alerta", "responsable": "Cliente", "reglas": ["RN5"], "nota": "Iniciada por la alerta de desviación."},
    {"k": "bpmn2:c_eval", "nombre": "Decidir sobre la renovación", "responsable": "Cliente", "reglas": [], "nota": "Responde a la oferta de Comercial."},
    {"k": "bpmn2:c_gw", "nombre": "¿Renueva?", "tipo": "decision", "responsable": "Cliente", "reglas": [], "nota": "Sí: enlace B."},
    {"k": "bpmn2:c_dev", "nombre": "Devolver los equipos en comodato", "responsable": "Cliente", "reglas": ["RN8"], "nota": "Fin «Servicio terminado»."},
    {"k": "bpmn2:x_rev", "nombre": "Revisar metodología y ahorro del año; emitir el reporte", "responsable": "Verificador independiente", "reglas": ["RN7"], "nota": "Una vez por año contractual."},
    {"k": "bpmn3:s_con", "nombre": "Consolidar lecturas y variables de operación del mes", "responsable": "Tecnología y Datos", "reglas": ["RN3"], "nota": "Capturar una vez, reutilizar."},
    {"k": "bpmn3:s_val", "nombre": "Validar completitud y calidad de los datos", "responsable": "Tecnología y Datos", "reglas": ["RN3"], "nota": "Unidades, atípicos y vacíos."},
    {"k": "bpmn3:s_g95", "nombre": "¿Completitud ≥ 95 %?", "tipo": "decision", "responsable": "Tecnología y Datos", "reglas": ["RN3"], "nota": "No: camino de recuperación."},
    {"k": "bpmn3:s_rec", "nombre": "Recuperar datos faltantes (respaldo de 72 h o lectura manual)", "responsable": "Tecnología y Datos", "reglas": ["RN3"], "nota": "Respaldo local de 72 h de la pasarela."},
    {"k": "bpmn3:s_gdc", "nombre": "¿Datos completos?", "tipo": "decision", "responsable": "Tecnología y Datos", "reglas": ["RN3"], "nota": "Sí: volver a validar. No: periodo pendiente."},
    {"k": "bpmn3:s_pen", "nombre": "Marcar el periodo como pendiente", "responsable": "Tecnología y Datos", "reglas": ["RN1", "RN3"], "nota": "Fin «Periodo pendiente»."},
    {"k": "bpmn3:s_eva", "nombre": "Evaluar la línea base vigente con las condiciones del mes", "responsable": "Entrega de Servicio", "reglas": ["RN6"], "nota": "Usa la versión vigente."},
    {"k": "bpmn3:s_gnr", "nombre": "¿Hubo evento no rutinario?", "tipo": "decision", "responsable": "Entrega de Servicio", "reglas": [], "nota": "Sí: documentar el ajuste."},
    {"k": "bpmn3:s_doc", "nombre": "Documentar y acordar el ajuste no rutinario", "responsable": "Entrega de Servicio", "reglas": [], "nota": "Requiere aceptación del cliente."},
    {"k": "bpmn3:s_cal", "nombre": "Calcular ahorro, % de reducción y tCO2e", "responsable": "Entrega de Servicio", "reglas": ["RN6"], "nota": "Guarda la versión usada."},
    {"k": "bpmn3:s_emi", "nombre": "Emitir reporte mensual de ahorro", "responsable": "Entrega de Servicio", "reglas": [], "nota": "Se envía haya o no factura."},
    {"k": "bpmn3:s_gah", "nombre": "¿Ahorro > 0?", "tipo": "decision", "responsable": "Entrega de Servicio", "reglas": ["RN1"], "nota": "No: fin «Periodo sin facturación»."},
    {"k": "bpmn3:s_rvm", "nombre": "Revisar medidas de ahorro", "responsable": "Entrega de Servicio", "reglas": ["RN1"], "nota": "Camino sin factura."},
    {"k": "bpmn3:s_liq", "nombre": "Liquidar participación (40 %) y emitir factura electrónica", "responsable": "Finanzas e Inversión", "reglas": ["RN1"], "nota": "Fin «Factura emitida»."},
    {"k": "bpmn3:c_aj", "nombre": "Aceptar el ajuste no rutinario", "responsable": "Cliente", "reglas": [], "nota": "Solo cuando VIRIDIA lo solicita."},
    {"k": "bpmn3:c_rev", "nombre": "Revisar el reporte o el aviso del mes", "responsable": "Cliente", "reglas": ["RN1", "RN3"], "nota": "Llega haya o no factura."},
    {"k": "bpmn3:c_gw", "nombre": "¿Llegó factura?", "tipo": "decision", "responsable": "Cliente", "reglas": ["RN1"], "nota": "No: fin «Sin pago este mes»."},
    {"k": "bpmn3:c_pay", "nombre": "Pagar la factura electrónica", "responsable": "Cliente", "reglas": ["RN1"], "nota": "Fin «Mes conciliado»."}
  ],
  "elementosDatos": {
    "bpmn1:s_a8": {"app": "A8"}, "bpmn1:s_a2": {"app": "A2"}, "bpmn1:s_a3": {"app": "A3"}, "bpmn1:s_a6": {"app": "A6"},
    "bpmn3:do_lec": {"entidad": "LECTURA"}, "bpmn3:do_lb": {"entidad": "LINEA_BASE"}, "bpmn3:do_ca": {"entidad": "CALCULO_AHORRO"}, "bpmn3:do_fac": {"entidad": "FACTURA"}
  }
},

"informacion": {
  "intro": "El modelo de datos responde qué información necesita el proceso. Parte de la fila Diseñador de la Matriz de Zachman: series de tiempo por cliente, planta, punto de medición y recurso, lecturas cada 15 minutos en energía y cada hora en agua, línea base versionada y retención mínima de 10 años.",
  "zonas": [
    {"id": "comercial", "nombre": "Relación comercial"},
    {"id": "calculo", "nombre": "Cálculo del ahorro"},
    {"id": "medicion", "nombre": "Medición física"}
  ],
  "entidades": [
    {"id": "CLIENTE", "tipo": "fuerte", "zona": "comercial", "descripcion": "Empresa que contrata el servicio.", "atributos": "id_cliente (PK), NIT, razón social, sector, segmento"},
    {"id": "CONTACTO_CLIENTE", "tipo": "multivaluado", "zona": "comercial", "descripcion": "Atributo multivaluado de CLIENTE: correos y teléfonos para las alertas.", "atributos": "PK (id_cliente, contacto), medio (correo o SMS)"},
    {"id": "CONTRATO", "tipo": "fuerte", "zona": "comercial", "descripcion": "Contrato de desempeño de ahorro compartido.", "atributos": "porcentaje comprometido, porcentaje de participación (40 %{P}), ahorro mínimo anual, fechas (de 3 a 5 años{P}), estado"},
    {"id": "ALCANCE_CONTRATO", "tipo": "puente", "zona": "comercial", "descripcion": "Tabla puente de la relación N:M: plantas que cubre cada contrato.", "atributos": "PK (id_contrato, id_planta), fecha de inclusión"},
    {"id": "FACTURA", "tipo": "fuerte", "zona": "comercial", "descripcion": "Cobro mensual de la participación sobre el ahorro verificado.", "atributos": "número DIAN, periodo, ahorro en pesos, valor facturado, estado"},
    {"id": "VERIFICACION", "tipo": "fuerte", "zona": "comercial", "descripcion": "Revisión anual del tercero independiente.", "atributos": "año contractual, verificador, resultado, reporte"},
    {"id": "PLANTA", "tipo": "fuerte", "zona": "calculo", "descripcion": "Sede física del cliente donde se mide y se interviene.", "atributos": "id_planta (PK), municipio, departamento, tipo de proceso"},
    {"id": "LINEA_BASE", "tipo": "fuerte", "zona": "calculo", "descripcion": "Modelo de consumo esperado de una planta para un recurso, versionado.", "atributos": "versión, periodo de referencia, CV(RMSE) ≤ 15, NMBE entre −5 y 5, vigente desde"},
    {"id": "COEFICIENTE_LINEA_BASE", "tipo": "multivaluado", "zona": "calculo", "descripcion": "Atributo multivaluado de LINEA_BASE: un coeficiente por variable.", "atributos": "PK (id_linea_base, variable), valor"},
    {"id": "MEDIDA_AHORRO", "tipo": "fuerte", "zona": "calculo", "descripcion": "Cambio operativo o inversión propuesta en una planta.", "atributos": "tipo (operativa o de inversión), ahorro estimado, fecha de implementación"},
    {"id": "CALCULO_AHORRO", "tipo": "fuerte", "zona": "calculo", "descripcion": "Resultado mensual del ahorro de una planta y un recurso.", "atributos": "completitud ≥ 95 %, consumo ajustado y real, ahorro, % de reducción (generado), tCO2e evitadas"},
    {"id": "AJUSTE_NO_RUTINARIO", "tipo": "debil", "zona": "calculo", "descripcion": "Entidad débil de CALCULO_AHORRO: corrección acordada con el cliente.", "atributos": "PK (id_calculo, consecutivo), causa, valor, aprobación del cliente"},
    {"id": "VARIABLE_OPERACION", "tipo": "fuerte", "zona": "calculo", "descripcion": "Variables que explican el consumo: producción, clima, horas de operación.", "atributos": "fecha, producción, CDD, horas de operación"},
    {"id": "RECURSO", "tipo": "fuerte", "zona": "medicion", "descripcion": "Catálogo de recursos medidos: energía eléctrica, agua, gas.", "atributos": "unidad, factor de emisión y su fuente (UPME para el SIN)"},
    {"id": "PUNTO_MEDICION", "tipo": "fuerte", "zona": "medicion", "descripcion": "Proceso o equipo del cliente que se mide (caldera, cuarto frío, compresor).", "atributos": "recurso medido, frecuencia (15 min energía, 60 min agua)"},
    {"id": "LECTURA", "tipo": "debil", "zona": "medicion", "descripcion": "Entidad débil de PUNTO_MEDICION: valor medido en un instante.", "atributos": "PK (id_punto, marca_tiempo), valor, indicador de calidad; retención de 10 años"},
    {"id": "ALERTA", "tipo": "fuerte", "zona": "medicion", "descripcion": "Aviso de medidor sin datos (24 h) o de desviación (±10 %).", "atributos": "tipo, fecha y hora, estado"},
    {"id": "EQUIPO", "tipo": "fuerte", "zona": "medicion", "descripcion": "Medidor, sensor o pasarela de VIRIDIA entregado en comodato.", "atributos": "serial, tipo, fecha de instalación, estado (en bodega, instalado, retirado, reacondicionado, RAEE)"}
  ],
  "relaciones": [
    {"de": "CLIENTE", "verbo": "posee", "a": "PLANTA", "card": "1:N", "impl": "FK PLANTA.id_cliente"},
    {"de": "CLIENTE", "verbo": "firma", "a": "CONTRATO", "card": "1:N", "impl": "FK CONTRATO.id_cliente"},
    {"de": "CONTRATO", "verbo": "cubre", "a": "PLANTA", "card": "N:M", "impl": "Tabla puente ALCANCE_CONTRATO (id_contrato, id_planta), con fecha_inclusion", "via": "ALCANCE_CONTRATO"},
    {"de": "CONTRATO", "verbo": "genera", "a": "FACTURA", "card": "1:N", "impl": "FK FACTURA.id_contrato"},
    {"de": "CONTRATO", "verbo": "se verifica en", "a": "VERIFICACION", "card": "1:N", "impl": "FK VERIFICACION.id_contrato"},
    {"de": "CONTRATO", "verbo": "incluye", "a": "MEDIDA_AHORRO", "card": "1:N", "impl": "FK MEDIDA_AHORRO.id_contrato"},
    {"de": "PLANTA", "verbo": "recibe", "a": "MEDIDA_AHORRO", "card": "1:N", "impl": "FK MEDIDA_AHORRO.id_planta"},
    {"de": "CONTRATO", "verbo": "liquida", "a": "CALCULO_AHORRO", "card": "1:N", "impl": "FK CALCULO_AHORRO.id_contrato"},
    {"de": "FACTURA", "verbo": "se sustenta en", "a": "CALCULO_AHORRO", "card": "1:N", "impl": "FK CALCULO_AHORRO.id_factura (vacía si no se factura)", "rn1": true},
    {"de": "VERIFICACION", "verbo": "valida", "a": "CALCULO_AHORRO", "card": "1:N", "impl": "FK CALCULO_AHORRO.id_verificacion (vacía hasta verificar)"},
    {"de": "CALCULO_AHORRO", "verbo": "se corrige con", "a": "AJUSTE_NO_RUTINARIO", "card": "1:N identif.", "impl": "PK de AJUSTE_NO_RUTINARIO (id_calculo, consecutivo)"},
    {"de": "LINEA_BASE", "verbo": "se usa en", "a": "CALCULO_AHORRO", "card": "1:N", "impl": "FK CALCULO_AHORRO.id_linea_base", "rn1": true},
    {"de": "RECURSO", "verbo": "se modela en", "a": "LINEA_BASE", "card": "1:N", "impl": "FK LINEA_BASE.id_recurso"},
    {"de": "PLANTA", "verbo": "tiene", "a": "LINEA_BASE", "card": "1:N", "impl": "FK LINEA_BASE.id_planta"},
    {"de": "PLANTA", "verbo": "contiene", "a": "PUNTO_MEDICION", "card": "1:N", "impl": "FK PUNTO_MEDICION.id_planta"},
    {"de": "RECURSO", "verbo": "se mide en", "a": "PUNTO_MEDICION", "card": "1:N", "impl": "FK PUNTO_MEDICION.id_recurso"},
    {"de": "PLANTA", "verbo": "registra", "a": "VARIABLE_OPERACION", "card": "1:N", "impl": "FK VARIABLE_OPERACION.id_planta"},
    {"de": "PUNTO_MEDICION", "verbo": "genera", "a": "LECTURA", "card": "1:N identif.", "impl": "PK de LECTURA (id_punto, marca_tiempo)"},
    {"de": "PUNTO_MEDICION", "verbo": "dispara", "a": "ALERTA", "card": "1:N", "impl": "FK ALERTA.id_punto"},
    {"de": "PUNTO_MEDICION", "verbo": "se instrumenta con", "a": "EQUIPO", "card": "1:N", "impl": "FK EQUIPO.id_punto (puede ser vacía)"},
    {"de": "PLANTA", "verbo": "aloja", "a": "EQUIPO", "card": "1:N", "impl": "FK EQUIPO.id_planta (puede ser vacía)"}
  ],
  "multivaluados": [
    {"de": "CLIENTE", "atributo": "contacto", "tabla": "CONTACTO_CLIENTE"},
    {"de": "LINEA_BASE", "atributo": "coeficiente", "tabla": "COEFICIENTE_LINEA_BASE"}
  ],
  "derivados": "De los atributos derivados, el porcentaje de reducción es una columna generada. El ahorro, las toneladas evitadas y el valor facturado se guardan, porque son evidencia que no puede cambiar después de facturar. La duración del contrato no se guarda: la controla una restricción sobre las fechas.",
  "restricciones": [
    {"regla": "RN3", "texto": "Un CALCULO_AHORRO solo existe si la completitud del periodo es de al menos 95 %."},
    {"regla": "RN1", "texto": "Un CALCULO_AHORRO solo se asocia a una FACTURA si su ahorro es positivo."},
    {"regla": "RN6", "texto": "Una LINEA_BASE solo se acepta si cumple ASHRAE Guideline 14 (CV(RMSE) ≤ 15, NMBE entre −5 y 5)."}
  ],
  "decisiones": [
    {"titulo": "Una factura agrupa varios cálculos", "texto": "Un contrato puede cubrir varias plantas y recursos, y cada combinación produce su propio cálculo mensual. CALCULO_AHORRO lleva la FK id_factura, que queda vacía cuando el periodo no se factura (RN1)."},
    {"titulo": "La línea base nunca se sobrescribe", "texto": "Cada recálculo trimestral crea una fila nueva con su versión y su vigente_desde (RN6). El cálculo guarda la FK de la versión exacta que usó."},
    {"titulo": "El equipo tiene ubicación opcional", "texto": "EQUIPO referencia a la planta y al punto de medición con FK que pueden ser nulas: la pasarela está en la planta pero no mide un punto, y un equipo en reacondicionamiento no está en ninguna planta."}
  ],
  "flujoDato": [
    {"paso": "Capturar", "texto": "La pasarela registra la LECTURA cada 15 min (energía) o 1 h (agua) y la guarda 72 h si cae la red."},
    {"paso": "Validar", "texto": "La plataforma de ingesta revisa unidades, atípicos y vacíos, marca el indicador de calidad y mide la completitud (RN3)."},
    {"paso": "Compartir", "texto": "El mismo dato validado lo leen el motor analítico, el módulo MRV y el tablero del cliente. Nadie lo vuelve a digitar."},
    {"paso": "Actualizar", "texto": "Cada trimestre la LINEA_BASE se recalcula como versión nueva (RN6); la lectura original nunca se modifica."}
  ],
  "cadenaRN1": "Toda factura apunta a los cálculos que la sustentan, y cada cálculo apunta a la versión exacta de la línea base con la que se evaluó. Si un cliente o el verificador preguntan por qué se cobró una cifra, la respuesta se obtiene recorriendo esas dos llaves foráneas: qué consumo real se midió, qué consumo esperado dio el modelo vigente, qué ajustes se acordaron y qué versión del modelo se usó. RN1 queda escrita en la estructura de los datos."
},

"aplicaciones": {
  "intro": "Cada aplicación existe porque una actividad del BPMN la necesita y porque alguna entidad del MER necesita un sistema que la cree y la custodie.",
  "capas": [
    {"id": "canales", "nombre": "Usuarios y canales", "pregunta": "Quién usa el sistema y por dónde entra."},
    {"id": "negocio", "nombre": "Aplicaciones de negocio", "pregunta": "Qué sistemas ejecutan el servicio."},
    {"id": "integracion", "nombre": "Integración", "pregunta": "Cómo se comunican: gateway de API, bus de eventos y transferencia controlada de archivos."},
    {"id": "soporte", "nombre": "Sistemas de soporte y externos", "pregunta": "Qué sirve a todos y qué no es de VIRIDIA."},
    {"id": "datos", "nombre": "Datos", "pregunta": "Dónde queda la información."},
    {"id": "infra", "nombre": "Infraestructura tecnológica", "pregunta": "Dónde corre todo."}
  ],
  "apps": [
    {"id": "A1", "nombre": "Pasarela de planta (edge)", "corto": "Pasarela", "capa": "infra", "proposito": "Capturar las lecturas en planta y guardarlas 72 h si se cae la red.", "propietario": "Tecnología y Gobierno de Datos", "datos": ["LECTURA", "PUNTO_MEDICION"], "criticidad": "Alta", "capacidades": ["C2"], "modelo": "Dispositivo propio (borde)", "porqueModelo": "Debe operar sin red; se administra a distancia.", "nodos": ["T2"], "rpo": "0 (respaldo local)", "rto": "48 h", "justRec": "Si la pasarela falla, el técnico la reemplaza en campo; con 7 días de respaldo{P} la falla de red no pierde datos."},
    {"id": "A2", "nombre": "Plataforma de ingesta y series de tiempo", "corto": "Ingesta", "capa": "datos", "proposito": "Recibir, validar y custodiar el histórico de consumo durante 10 años.", "propietario": "Tecnología y Gobierno de Datos", "datos": ["LECTURA", "ALERTA", "VARIABLE_OPERACION", "PUNTO_MEDICION", "RECURSO"], "criticidad": "Crítica", "capacidades": ["C2"], "modelo": "Desarrollo propio sobre PaaS", "porqueModelo": "Realiza C2; las reglas de validación (RN3, RN4) son propias.", "nodos": ["T6", "T8", "T10"], "rpo": "≈ 0 (réplica entre zonas)", "rto": "4 h", "justRec": "Lo ingerido es evidencia irrecuperable; lo no ingerido espera en la pasarela."},
    {"id": "A3", "nombre": "Motor analítico de línea base y predicción", "corto": "Motor", "capa": "negocio", "proposito": "Ajustar y versionar la línea base, pronosticar demanda y detectar desviaciones.", "propietario": "I+D e Innovación en IA", "datos": ["LINEA_BASE", "COEFICIENTE_LINEA_BASE", "LECTURA", "VARIABLE_OPERACION", "ALERTA"], "criticidad": "Crítica", "capacidades": ["C2"], "modelo": "Desarrollo propio sobre PaaS", "porqueModelo": "Es la propiedad intelectual de VIRIDIA (OE5).", "nodos": ["T8", "T9", "T11", "T12"], "rpo": "24 h", "rto": "24 h", "justRec": "Los modelos están versionados en T12; un día sin motor solo retrasa alertas de desviación."},
    {"id": "A4", "nombre": "Módulo de cálculo de ahorro y MRV", "corto": "MRV", "capa": "negocio", "proposito": "Calcular el ahorro mensual, registrar ajustes y armar los reportes y el expediente de verificación.", "propietario": "Entrega de Servicio", "datos": ["CALCULO_AHORRO", "AJUSTE_NO_RUTINARIO", "MEDIDA_AHORRO", "VERIFICACION"], "criticidad": "Crítica", "capacidades": ["C4"], "modelo": "Desarrollo propio sobre PaaS", "porqueModelo": "Realiza C4 y protege RN1; nadie vende este cálculo listo.", "nodos": ["T8", "T11", "T12"], "rpo": "1 h", "rto": "8 h", "justRec": "Si cae durante el cierre, el cierre se corre un día; los cálculos ya emitidos están en T12."},
    {"id": "A5", "nombre": "Portal y tablero del cliente", "corto": "Portal", "capa": "canales", "proposito": "Mostrar al cliente su consumo por proceso y turno, alertas y reportes.", "propietario": "Entrega de Servicio", "datos": ["CALCULO_AHORRO", "ALERTA", "LINEA_BASE"], "criticidad": "Media", "capacidades": ["C3"], "modelo": "Desarrollo propio sobre PaaS", "porqueModelo": "Muestra el ahorro con la lógica de VIRIDIA.", "nodos": ["T4", "T8"], "rpo": "24 h", "rto": "24 h", "justRec": "Procedimiento alterno: el reporte mensual se envía en PDF por correo."},
    {"id": "A6", "nombre": "CRM y gestión de contratos", "corto": "CRM", "capa": "negocio", "proposito": "Gestionar prospectos, contratos de desempeño y su alcance.", "propietario": "Comercial y Mercadeo", "datos": ["CLIENTE", "CONTACTO_CLIENTE", "PLANTA", "CONTRATO", "ALCANCE_CONTRATO"], "criticidad": "Alta", "capacidades": ["C5"], "modelo": "SaaS", "porqueModelo": "Gestión comercial estándar; se sincroniza con T11 por I13 e I14.", "nodos": ["SaaS"], "rpo": "Según el proveedor", "rto": "Según el proveedor", "justRec": "Se exige por contrato un acuerdo de nivel de servicio y una exportación semanal de los datos."},
    {"id": "A7", "nombre": "Facturación por desempeño y ERP contable", "corto": "Facturación", "capa": "negocio", "proposito": "Facturar solo sobre ahorro verificado y llevar la tesorería.", "propietario": "Finanzas, Inversión y Relación con Socios", "datos": ["FACTURA", "CALCULO_AHORRO", "CONTRATO"], "criticidad": "Alta", "capacidades": ["C5", "C8"], "modelo": "Módulo propio (liquidación) más ERP SaaS", "porqueModelo": "La liquidación del 40 %{P} es propia; la contabilidad y la factura electrónica son estándar.", "nodos": ["T8", "SaaS"], "rpo": "Según el proveedor (ERP)", "rto": "Según el proveedor (ERP)", "justRec": "Se exige por contrato un acuerdo de nivel de servicio y una exportación semanal de los datos."},
    {"id": "A8", "nombre": "Gestión de activos en comodato", "corto": "Activos", "capa": "soporte", "proposito": "Llevar inventario, ubicación y ciclo de vida de los equipos.", "propietario": "Sostenibilidad y Operaciones Verdes", "datos": ["EQUIPO", "PUNTO_MEDICION"], "criticidad": "Media", "capacidades": ["C7"], "modelo": "Desarrollo propio sobre PaaS", "porqueModelo": "Debe conocer el punto de medición de cada serial (I11).", "nodos": ["T8", "T11"], "rpo": "24 h", "rto": "72 h", "justRec": "No interviene en el cierre mensual."},
    {"id": "A9", "nombre": "Gestión documental", "corto": "Documental", "capa": "soporte", "proposito": "Custodiar actas, contratos, reportes MRV e informes BIC y ESG.", "propietario": "Legal, Cumplimiento y Ética de la IA", "datos": ["CONTRATO", "VERIFICACION"], "criticidad": "Media", "capacidades": ["C4", "C9"], "modelo": "SaaS", "porqueModelo": "Estándar; los expedientes MRV se copian además a T12.", "nodos": ["SaaS", "T12"], "rpo": "Según el proveedor", "rto": "Según el proveedor", "justRec": "Se exige por contrato un acuerdo de nivel de servicio y una exportación semanal de los datos."},
    {"id": "A10", "nombre": "Identidad y seguridad (IAM)", "corto": "IAM", "capa": "soporte", "proposito": "Controlar el acceso por rol y aislar los datos de cada cliente (Ley 1581 de 2012).", "propietario": "Tecnología y Gobierno de Datos, con Legal", "datos": [], "datosNota": "Usuarios y roles (fuera del MER de negocio)", "criticidad": "Alta", "capacidades": ["C9"], "modelo": "Servicio gestionado", "porqueModelo": "Inicio de sesión único y MFA sin desarrollo propio.", "nodos": ["T13"], "rpo": "1 h", "rto": "1 h", "justRec": "Sin identidad ni integración no funciona ninguna otra aplicación; se mantiene una cuenta de emergencia fuera del IdP."}
  ],
  "externos": [
    {"id": "NOTIF", "nombre": "Servicio de notificaciones (correo y SMS){P}", "capa": "canales", "texto": "Avisa al cliente y al ingeniero de cuenta las alertas de medidor sin datos (RN4) y de desviación (RN5).", "propietario": "Entrega de Servicio"},
    {"id": "DIAN", "nombre": "Proveedor de factura electrónica (DIAN)", "capa": "soporte", "externo": true, "texto": "Valida y transmite la factura electrónica de venta."},
    {"id": "VERIF", "nombre": "Verificador independiente", "capa": "soporte", "externo": true, "texto": "Recibe el expediente MRV anual (I6)."},
    {"id": "ERPCLI", "nombre": "Sistemas del cliente (ERP o MES)", "capa": "soporte", "externo": true, "texto": "Entregan producción, turnos y paradas del mes (I10)."}
  ],
  "mecanismos": [
    {"id": "BUS", "nombre": "Bus de eventos{P}", "forma": "Evento", "texto": "Recibe lecturas y alertas. Un mismo evento lo pueden leer varios consumidores, como el portal y las notificaciones.", "nodo": "T6"},
    {"id": "GW", "nombre": "Gateway de API{P}", "forma": "API", "texto": "Punto único de entrada a las API: verifica la identidad con A10 y registra cada llamada.", "nodo": "T5"},
    {"id": "SFTP", "nombre": "Transferencia controlada de archivos{P}", "forma": "Archivo", "texto": "Entregas por lotes con plantilla validada, fecha y huella digital (I6, I10).", "nodo": "T7"}
  ],
  "integraciones": [
    {"id": "I1", "de": "A1", "a": ["A2"], "forma": "Evento", "via": "BUS", "que": "Lecturas cada 15 min (energía) y 1 h (agua) por red celular cifrada. Si falla la red, la pasarela las retiene 72 h y las reenvía."},
    {"id": "I2", "de": "A2", "a": ["A3"], "forma": "API", "via": "GW", "que": "Series validadas con su indicador de calidad y variables de operación."},
    {"id": "I3", "de": "A3", "a": ["A4"], "forma": "API", "via": "GW", "que": "Versión vigente de la línea base y consumo esperado y real de cada periodo."},
    {"id": "I4", "de": "A4", "a": ["A7"], "forma": "API", "via": "GW", "que": "Cálculo aprobado. Solo se envía si el ahorro es positivo (RN1)."},
    {"id": "I5", "de": "A7", "a": ["DIAN"], "forma": "API", "via": "GW", "que": "Factura electrónica de venta."},
    {"id": "I6", "de": "A4", "a": ["VERIF"], "forma": "Archivo", "via": "SFTP", "que": "Expediente MRV anual: metodología, versiones de línea base, cálculos y ajustes, con huella digital para detectar cambios."},
    {"id": "I7", "de": "A4", "a": ["A5"], "forma": "API", "via": "GW", "que": "Reporte mensual de ahorro."},
    {"id": "I8", "de": "A3", "a": ["A5", "NOTIF"], "forma": "Evento", "via": "BUS", "que": "Alerta de desviación fuera de la banda de ±10 % (RN5)."},
    {"id": "I9", "de": "A2", "a": ["A5", "NOTIF"], "forma": "Evento", "via": "BUS", "que": "Alerta de medidor sin datos durante 24 h (RN4)."},
    {"id": "I10", "de": "ERPCLI", "a": ["A2"], "forma": "Archivo", "via": "SFTP", "que": "Producción, turnos y paradas del mes en plantilla validada."},
    {"id": "I11", "de": "A8", "a": ["A2"], "forma": "API", "via": "GW", "que": "Relación entre serial y punto de medición, y estado del equipo."},
    {"id": "I12", "de": "A6", "a": ["A8"], "forma": "Evento", "via": "BUS", "que": "Contrato terminado: orden de retiro de equipos (RN8)."},
    {"id": "I13", "de": "A6", "a": ["A4"], "forma": "API", "via": "GW", "que": "Condiciones y alcance del contrato."},
    {"id": "I14", "de": "A6", "a": ["A7"], "forma": "API", "via": "GW", "que": "Porcentaje de participación y datos de facturación."},
    {"id": "I15", "de": "A6", "a": ["A9"], "forma": "API", "via": "GW", "que": "Contratos y actas firmadas."},
    {"id": "I16", "de": "A4", "a": ["A9"], "forma": "API", "via": "GW", "que": "Reportes MRV para su custodia."}
  ],
  "decisionesIntegracion": "Las lecturas viajan como eventos porque la pasarela debe seguir funcionando sin red: publica y reenvía cuando vuelve la conexión. El expediente del verificador y la producción del cliente viajan como archivo controlado porque son entregas por lotes entre organizaciones y el archivo deja evidencia fechada. Lo demás son consultas que necesitan respuesta inmediata y van por API, siempre a través del gateway, que verifica la identidad con A10.",
  "almacenes": [
    {"nombre": "Series de tiempo", "apps": ["A2"], "contenido": "LECTURA, ALERTA, VARIABLE_OPERACION, PUNTO_MEDICION, RECURSO"},
    {"nombre": "Modelos de línea base", "apps": ["A3"], "contenido": "LINEA_BASE versionada y COEFICIENTE_LINEA_BASE"},
    {"nombre": "Cálculo y verificación", "apps": ["A4"], "contenido": "CALCULO_AHORRO, AJUSTE_NO_RUTINARIO, MEDIDA_AHORRO, VERIFICACION"},
    {"nombre": "Comercial y facturación", "apps": ["A6", "A7"], "contenido": "CLIENTE, CONTACTO_CLIENTE, PLANTA, CONTRATO, ALCANCE_CONTRATO, FACTURA"},
    {"nombre": "Activos y documentos", "apps": ["A8", "A9"], "contenido": "EQUIPO; contratos, actas y reportes MRV"}
  ],
  "notaAlmacenes": "En todos los almacenes: espacio aislado por cliente, respaldo diario y retención mínima de 10 años.",
  "recorrido": [
    {"n": 1, "elementos": ["T1"], "texto": "El medidor mide."},
    {"n": 2, "elementos": ["A1", "I1", "BUS"], "texto": "La pasarela recoge la lectura cada 15 minutos y la publica en el bus de eventos (I1). Si la red falla, la guarda hasta 72 horas y la envía al volver la conexión."},
    {"n": 3, "elementos": ["A2"], "texto": "La plataforma de ingesta la toma del bus, la valida y la guarda en la base de series de tiempo."},
    {"n": 4, "elementos": ["A3", "I2", "GW"], "texto": "El motor analítico la lee por el gateway (I2) y calcula el consumo esperado con la línea base vigente."},
    {"n": 5, "elementos": ["A4", "I3"], "texto": "En el cierre mensual, el módulo MRV recibe del motor el consumo esperado y el real (I3) y calcula el ahorro."},
    {"n": 6, "elementos": ["A7", "I4"], "texto": "Si el ahorro es positivo, y solo en ese caso, envía el cálculo a facturación (I4, RN1), que liquida el 40 %{P}."},
    {"n": 7, "elementos": ["DIAN", "I5"], "texto": "Facturación emite la factura electrónica por medio del proveedor autorizado ante la DIAN (I5). En paralelo, las alertas (I8, I9) salen por el bus al portal y a las notificaciones."}
  ],
  "crud": {
    "CLIENTE": {"A4": "R", "A5": "R", "A6": "CRU", "A7": "R"},
    "CONTACTO_CLIENTE": {"A6": "CRUD"},
    "PLANTA": {"A2": "R", "A3": "R", "A4": "R", "A5": "R", "A6": "CRU", "A8": "R"},
    "CONTRATO": {"A4": "R", "A5": "R", "A6": "CRU", "A7": "R", "A8": "R", "A9": "R"},
    "ALCANCE_CONTRATO": {"A4": "R", "A6": "CRUD", "A7": "R"},
    "RECURSO": {"A2": "CRU", "A3": "R", "A4": "R"},
    "PUNTO_MEDICION": {"A1": "R", "A2": "CRU", "A3": "R", "A5": "R", "A8": "R"},
    "EQUIPO": {"A2": "R", "A8": "CRU"},
    "LECTURA": {"A1": "CD", "A2": "CRU", "A3": "R", "A4": "R", "A5": "R"},
    "ALERTA": {"A2": "C", "A3": "C", "A5": "RU"},
    "VARIABLE_OPERACION": {"A2": "CRU", "A3": "R", "A4": "R", "A5": "R"},
    "LINEA_BASE": {"A3": "CRU", "A4": "R", "A5": "R"},
    "COEFICIENTE_LINEA_BASE": {"A3": "CR", "A4": "R"},
    "MEDIDA_AHORRO": {"A3": "R", "A4": "CRU", "A5": "R", "A6": "R"},
    "CALCULO_AHORRO": {"A4": "CRU", "A5": "R", "A7": "RU", "A9": "R"},
    "AJUSTE_NO_RUTINARIO": {"A4": "CRU", "A5": "R"},
    "FACTURA": {"A4": "R", "A5": "R", "A6": "R", "A7": "CRU"},
    "VERIFICACION": {"A4": "CRU", "A9": "R"}
  },
  "crudRegistro": {
    "CLIENTE": "A6", "CONTACTO_CLIENTE": "A6", "PLANTA": "A6", "CONTRATO": "A6", "ALCANCE_CONTRATO": "A6",
    "RECURSO": "A2", "PUNTO_MEDICION": "A2", "EQUIPO": "A8", "LECTURA": "A2", "ALERTA": "A2 y A3",
    "VARIABLE_OPERACION": "A2", "LINEA_BASE": "A3", "COEFICIENTE_LINEA_BASE": "A3", "MEDIDA_AHORRO": "A4",
    "CALCULO_AHORRO": "A4", "AJUSTE_NO_RUTINARIO": "A4", "FACTURA": "A7", "VERIFICACION": "A4"
  },
  "notaCrud": "Cada entidad tiene un solo sistema que la crea, con dos excepciones: LECTURA la crea primero la pasarela en su memoria temporal y la elimina (D) solo después de confirmar la entrega, y el registro oficial lo crea la ingesta; ALERTA tiene dos productores porque hay dos tipos (medidor sin datos en la ingesta, desviación en el motor). Nadie elimina lecturas, líneas base, cálculos ni facturas, por la retención de 10 años.",
  "appProc": {
    "M1": {"A6": "P", "A9": "S"},
    "M2": {"A1": "P", "A2": "P", "A3": "P", "A6": "S", "A8": "P", "A9": "S"},
    "M3": {"A3": "P", "A4": "P", "A5": "S"},
    "M4": {"A1": "P", "A2": "P", "A3": "P", "A4": "P", "A5": "P", "A7": "P", "A9": "S"},
    "M5": {"A6": "P", "A8": "P", "A9": "S"},
    "E1": {},
    "E2": {"A2": "S", "A3": "P"},
    "E3": {"A7": "S", "A9": "S"},
    "S1": {"A1": "S", "A2": "P"},
    "S2": {"A8": "P"},
    "S3": {"A6": "S", "A7": "P"},
    "S4": {"A6": "S", "A9": "P"},
    "S5": {},
    "S6": {}
  },
  "notaAppProc": "M4, el proceso que genera el ingreso, es el que más aplicaciones necesita: seis con soporte directo. Las tres críticas (A2, A3 y A4) aparecen en M2, M3 y M4. Tres procesos no tienen aplicación: E1 (los indicadores se consolidan a mano desde A4, A6 y A7), S5 y S6, que realizan C10 y C6: es la brecha B5, que cierra el proyecto P10."
},

"tecnologia": {
  "intro": "Dónde corre todo: infraestructura, redes, servicios de nube y controles de seguridad. Parte de las filas Diseñador, Constructor y Operación de la Matriz de Zachman y resuelve las dos brechas tecnológicas que dejó abiertas el Taller 3: el punto único de falla en la ingesta y la integración, y la ventana de 24 a 72 horas para reparar un medidor.",
  "principios": [
    {"n": 1, "nombre": "El pasado no se vuelve a medir", "texto": "Toda lectura validada se replica y se respalda de inmediato. La pérdida de datos históricos es el riesgo que más protege la arquitectura.", "origen": "C2 crítica"},
    {"n": 2, "nombre": "La planta sigue midiendo aunque no haya red", "texto": "La captura no depende de la conexión: la pasarela guarda y reenvía.", "origen": "RN3, RN4"},
    {"n": 3, "nombre": "Construir lo que diferencia, contratar lo demás", "texto": "Se desarrollan A1 a A5, que realizan C2 y C4. CRM, ERP contable, gestión documental e identidad se contratan como servicio.", "origen": "C2, C4; OE4"},
    {"n": 4, "nombre": "Seguridad y aislamiento por diseño", "texto": "Cada cliente tiene un espacio de datos aislado; toda llamada se autentica; todo dato viaja y se guarda cifrado.", "origen": "C9; Ley 1581"},
    {"n": 5, "nombre": "Evidencia inmutable", "texto": "Lecturas, versiones de línea base, cálculos y expedientes MRV no se sobrescriben y llevan huella digital.", "origen": "RN1, RN6, RN7"},
    {"n": 6, "nombre": "Infraestructura reproducible y portable", "texto": "Toda la infraestructura se declara como código y las aplicaciones corren en contenedores sobre bases de datos estándar, para recrear un ambiente o cambiar de proveedor.", "origen": "Continuidad; R6"}
  ],
  "zonas": [
    {"id": "planta", "nombre": "Planta del cliente"},
    {"id": "conectividad", "nombre": "Conectividad"},
    {"id": "perimetro", "nombre": "Perímetro e integración", "nube": true},
    {"id": "computo", "nombre": "Cómputo", "nube": true},
    {"id": "datos", "nombre": "Datos", "nube": true},
    {"id": "seguridad", "nombre": "Seguridad y operación", "nube": true},
    {"id": "externos", "nombre": "Externos"},
    {"id": "saas", "nombre": "Servicios contratados (SaaS)"},
    {"id": "secundaria", "nombre": "Región secundaria"},
    {"id": "sede", "nombre": "Sede Barranquilla"}
  ],
  "nube": "Nube pública · región principal en Latinoamérica · tres zonas de disponibilidad. Cada nodo existe en tres ambientes separados: desarrollo, pruebas y producción.",
  "nodos": [
    {"id": "T1", "nombre": "Medidores, caudalímetros y sensores", "zona": "planta", "funcion": "Medir energía, agua y temperatura por proceso.", "aloja": [], "alojaTexto": "Fuente de LECTURA", "propietario": "Entrega de Servicio", "criticidad": "Alta", "detalle": "Medidores de energía clase 0,5S, caudalímetros con incertidumbre de hasta 2 % y sensores de temperatura, entregados en comodato."},
    {"id": "T2", "nombre": "Pasarela industrial de planta", "zona": "planta", "funcion": "Leer los medidores, guardar y reenviar si cae la red.", "aloja": ["A1", "I1"], "propietario": "Tecnología", "criticidad": "Crítica", "detalle": "Aloja A1. Respaldo local de 72 h; 7 días desde P7{P}. Certificado propio por equipo. Lee los medidores por Modbus o pulsos."},
    {"id": "T3", "nombre": "Red celular 4G con doble SIM", "zona": "conectividad", "funcion": "Enlazar la pasarela con la nube por canal cifrado.", "aloja": ["I1"], "propietario": "Tecnología", "criticidad": "Alta", "detalle": "MQTT sobre TLS mutuo, con segunda SIM de respaldo."},
    {"id": "T4", "nombre": "WAF y CDN", "zona": "perimetro", "funcion": "Filtrar ataques web y acelerar el portal.", "aloja": ["A5"], "propietario": "Tecnología", "criticidad": "Alta", "detalle": "Protege el portal A5."},
    {"id": "T5", "nombre": "Gateway de API", "zona": "perimetro", "funcion": "Punto único de entrada a las API; verifica identidad con T13.", "aloja": ["I2", "I3", "I4", "I5", "I7", "I11", "I13", "I14", "I15", "I16"], "propietario": "Tecnología", "criticidad": "Crítica", "detalle": "Las aplicaciones y los servicios contratados entran por el gateway."},
    {"id": "T6", "nombre": "Bus de eventos con entrada MQTT", "zona": "perimetro", "funcion": "Recibir lecturas y alertas y repartirlas a varios consumidores.", "aloja": ["I1", "I8", "I9", "I12"], "propietario": "Tecnología", "criticidad": "Crítica", "detalle": "Las pasarelas publican por MQTT con certificado propio."},
    {"id": "T7", "nombre": "Transferencia controlada de archivos", "zona": "perimetro", "funcion": "Recibir y entregar lotes con plantilla, fecha y huella digital.", "aloja": ["I6", "I10"], "propietario": "Tecnología, con Legal", "criticidad": "Alta", "detalle": "SFTP con huella digital."},
    {"id": "T8", "nombre": "Clúster de contenedores gestionado", "zona": "computo", "funcion": "Ejecutar las aplicaciones propias en tres zonas.", "aloja": ["A2", "A3", "A4", "A5", "A8", "A7"], "alojaTexto": "A2, A3 (inferencia), A4, A5, A8 y el módulo de liquidación de A7", "propietario": "Tecnología", "criticidad": "Crítica", "detalle": "Multi-zona: repartido en tres zonas de disponibilidad."},
    {"id": "T9", "nombre": "Cómputo analítico por lotes", "zona": "computo", "funcion": "Entrenar y recalcular líneas base.", "aloja": ["A3"], "propietario": "I+D en IA", "criticidad": "Alta", "detalle": "Se enciende solo en el entrenamiento y el recálculo trimestral."},
    {"id": "T10", "nombre": "Base de series de tiempo", "zona": "datos", "funcion": "Custodiar lecturas y variables de operación por cliente.", "aloja": ["A2", "A3"], "propietario": "Tecnología", "criticidad": "Crítica", "detalle": "PostgreSQL con extensión de series de tiempo. LECTURA y VARIABLE_OPERACION. Espacio aislado por cliente."},
    {"id": "T11", "nombre": "Base relacional PostgreSQL", "zona": "datos", "funcion": "Custodiar el resto del MER con réplica entre zonas.", "aloja": ["A3", "A4", "A8", "A7"], "propietario": "Tecnología", "criticidad": "Crítica", "detalle": "PostgreSQL gestionada con réplica síncrona entre zonas: líneas base, cálculos, activos."},
    {"id": "T12", "nombre": "Almacenamiento de objetos inmutable", "zona": "datos", "funcion": "Guardar expedientes MRV, modelos y respaldos durante 10 años.", "aloja": ["A3", "A4", "A9"], "propietario": "Tecnología", "criticidad": "Alta", "detalle": "Expedientes MRV, modelos versionados y respaldos (10 años)."},
    {"id": "T13", "nombre": "Identidad (IdP con MFA) y KMS", "zona": "seguridad", "funcion": "Autenticar personas y servicios; administrar llaves por cliente.", "aloja": ["A10"], "propietario": "Tecnología, con Legal", "criticidad": "Alta", "detalle": "Realiza A10. Cifra T10, T11 y T12 con llaves por cliente."},
    {"id": "T14", "nombre": "Registro, monitoreo y alertas", "zona": "seguridad", "funcion": "Auditar cada acceso y vigilar la disponibilidad.", "aloja": [], "alojaTexto": "Todas", "propietario": "Tecnología", "criticidad": "Alta", "detalle": "Registro de auditoría de cada llamada, alertas de disponibilidad y de seguridad."},
    {"id": "T15", "nombre": "Región secundaria de recuperación", "zona": "secundaria", "funcion": "Restaurar la operación si falla la región principal.", "aloja": [], "alojaTexto": "T10, T11, T12", "propietario": "Tecnología", "criticidad": "Alta", "detalle": "Copia de respaldos y réplica asíncrona de T10 y T11."},
    {"id": "T16", "nombre": "Red de la sede Barranquilla", "zona": "sede", "funcion": "Conectar al personal y al laboratorio con la nube.", "aloja": [], "alojaTexto": "Usuarios internos", "propietario": "Tecnología", "criticidad": "Media", "detalle": "Doble proveedor de Internet, firewall con VPN a la nube, VLAN por área y Wi-Fi corporativo e invitados. Personal, laboratorio de reacondicionamiento y medición propia (OE3)."}
  ],
  "conexiones": [
    {"de": "T1", "a": "T2", "tipo": "sync", "etiqueta": "Modbus / pulsos"},
    {"de": "T2", "a": "T3", "tipo": "evento", "etiqueta": "Lecturas"},
    {"de": "T3", "a": "T6", "tipo": "evento", "etiqueta": "MQTT sobre TLS"},
    {"de": "ERPCLI", "a": "T7", "tipo": "archivo", "etiqueta": "SFTP del cliente (I10)"},
    {"de": "T7", "a": "VERIF", "tipo": "archivo", "etiqueta": "Expediente MRV (I6)"},
    {"de": "T5", "a": "T8", "tipo": "sync"},
    {"de": "T6", "a": "T8", "tipo": "evento"},
    {"de": "T8", "a": "T10", "tipo": "sync"},
    {"de": "T8", "a": "T11", "tipo": "sync"},
    {"de": "T9", "a": "T12", "tipo": "sync"},
    {"de": "T5", "a": "SAAS", "tipo": "sync"},
    {"de": "SAAS", "a": "DIAN", "tipo": "sync"},
    {"de": "T12", "a": "T15", "tipo": "archivo", "etiqueta": "Réplica y respaldo"},
    {"de": "T16", "a": "T13", "tipo": "sync", "etiqueta": "VPN sitio a nube"}
  ],
  "zonasNube": "La región principal se organiza en cuatro zonas lógicas: el perímetro e integración es la única puerta de entrada; el cómputo ejecuta las aplicaciones propias en contenedores repartidos en tres zonas de disponibilidad, más un servicio por lotes para el entrenamiento de modelos; los datos se separan por naturaleza (series de tiempo, relacional e inmutable); y la zona de seguridad y operación da identidad, llaves de cifrado y registro de auditoría a todas las demás.",
  "proveedor": {
    "texto": "El documento no fija una marca: la arquitectura usa servicios genéricos que ofrecen los proveedores principales con región en Sudamérica. La selección es la primera actividad del proyecto P2, con cinco criterios ponderados{P}.",
    "criterios": [
      {"criterio": "Región con tres zonas de disponibilidad en Latinoamérica", "peso": 30},
      {"criterio": "Servicios gestionados de PostgreSQL, contenedores y MQTT", "peso": 25},
      {"criterio": "Costo a 3 años para 8 y 45 clientes", "peso": 20},
      {"criterio": "Certificaciones de seguridad (ISO/IEC 27001) y cláusulas de tratamiento de datos", "peso": 15},
      {"criterio": "Facilidad de salida", "peso": 10}
    ]
  },
  "sede": {
    "texto": "La sede aloja al personal, el laboratorio de reacondicionamiento y la autogeneración renovable propia (OE3). Ninguna aplicación de negocio corre en la sede: el personal trabaja contra la nube. Si la red falla, se trabaja desde la red celular o desde casa con la misma VPN.",
    "equipos": [
      {"id": "isp1", "nombre": "Proveedor 1", "texto": "Fibra óptica (principal)"},
      {"id": "isp2", "nombre": "Proveedor 2", "texto": "Radio o 4G (respaldo)"},
      {"id": "fw", "nombre": "Firewall de nueva generación", "texto": "VPN sitio a nube, filtrado y conmutación automática"},
      {"id": "sw", "nombre": "Switch de núcleo capa 3", "texto": "Enrutamiento entre VLAN con listas de acceso"}
    ],
    "vlans": [
      {"id": "VLAN 10", "nombre": "Gerencia y administración", "quien": "Gerencia, Comercial, Finanzas, Legal y Talento", "regla": "Internet y servicios SaaS; a la nube solo por el portal interno con MFA."},
      {"id": "VLAN 20", "nombre": "Tecnología, I+D y datos", "quien": "Tecnología, I+D y analistas de datos", "regla": "Acceso administrativo a la nube solo por VPN y con cuenta privilegiada temporal."},
      {"id": "VLAN 30", "nombre": "Laboratorio de reacondicionamiento", "quien": "Laboratorio de reacondicionamiento", "regla": "Aislada: los equipos en prueba solo hablan con un entorno de pruebas del bus, nunca con producción."},
      {"id": "VLAN 40", "nombre": "Energía e IoT de la sede", "quien": "Inversor solar, medidores y sensores de la sede", "regla": "Solo salida hacia la plataforma: la sede se mide con la misma tecnología que vende (OE3, C6)."},
      {"id": "VLAN 50", "nombre": "Invitados (solo Internet)", "quien": "Visitantes", "regla": "Solo Internet, sin acceso a ninguna otra VLAN."}
    ]
  },
  "seguridad": [
    {"capa": "Identidad", "controles": "Inicio de sesión único con MFA para todo el personal; acceso por rol y mínimo privilegio; cuentas privilegiadas temporales y registradas; cada pasarela y cada servicio con identidad propia.", "protege": "Acceso indebido; C9", "nodos": ["T13", "T5"]},
    {"capa": "Datos", "controles": "Cifrado en reposo con llaves por cliente en T13; cifrado en tránsito con TLS 1.2 o superior; espacio aislado por cliente en T10; lecturas y expedientes inmutables con huella digital; minimización de datos personales (solo contactos y usuarios).", "protege": "Confidencialidad entre clientes; integridad de RN1 y RN6", "nodos": ["T10", "T11", "T12", "T13"]},
    {"capa": "Red", "controles": "Zonas separadas en la nube con reglas explícitas entre ellas; WAF frente al portal; MQTT con TLS mutuo desde las pasarelas; VPN para administración; VLAN en la sede.", "protege": "Ataques externos y movimiento lateral", "nodos": ["T3", "T4", "T6", "T16"]},
    {"capa": "Borde", "controles": "Pasarela en gabinete sellado; certificado único por equipo, revocable desde A8; actualizaciones firmadas; puertos locales deshabilitados.", "protege": "Manipulación de lecturas en planta", "nodos": ["T1", "T2"]},
    {"capa": "Operación", "controles": "Registro de auditoría de cada llamada (T14); alertas de seguridad; parches mensuales; prueba de penetración anual; respaldos inmutables probados cada trimestre.", "protege": "Incidentes y ransomware", "nodos": ["T14", "T12", "T15"]},
    {"capa": "Cumplimiento", "controles": "Política de tratamiento de datos; autorización de los titulares; evaluación de la transferencia internacional cuando la región de la nube esté fuera de Colombia (Ley 1581, art. 26); cláusulas de confidencialidad en cada contrato; lineamientos de ética de la IA.", "protege": "Ley 1581; obligaciones BIC; C9", "nodos": []}
  ],
  "datosPersonales": "Las lecturas de una planta industrial son datos de la empresa cliente, protegidos por confidencialidad contractual. Los datos personales son pocos: los contactos para las alertas (CONTACTO_CLIENTE) y los usuarios de las aplicaciones. La medida principal frente a la Ley 1581 es la minimización.",
  "continuidad": [
    {"nivel": "Redundancia local", "texto": "T5, T6, T8, T10 y T11 operan repartidos en tres zonas de disponibilidad: la caída de un centro de datos no detiene el servicio."},
    {"nivel": "Recuperación regional", "texto": "Los respaldos y una réplica asíncrona de las bases de datos viajan a la región secundaria (T15)."},
    {"nivel": "Amortiguación en el borde", "texto": "La pasarela retiene las lecturas mientras la nube no responde."}
  ],
  "rpoRtoNota": "RPO: cuántos datos se pueden perder como máximo. RTO: cuánto puede tardar en volver. Los valores salen del calendario del negocio: el cierre mensual se hace en los primeros días hábiles, así que un sistema que solo participa en el cierre tolera horas de caída, mientras que una lectura perdida no se puede recuperar. Todos son propuestas del equipo{P}.",
  "brechaVentana": "La ventana entre la alerta de las 24 horas (RN4) y el fin del respaldo de 72 horas se cierra con dos medidas de P7: ampliar el respaldo local de la pasarela a 7 días{P} y fijar un tiempo de atención en campo de 48 horas{P}. Con ambas, una falla atendida a tiempo nunca deja el periodo por debajo del 95 % de completitud (RN3).",
  "riesgos": [
    {"id": "R1", "riesgo": "Caída de la ingesta o de la integración durante el cierre mensual", "p": 3, "i": 5, "inherente": 15, "control": "Multi-zona, región secundaria, RTO de 4 h y 1 h (P7)", "residual": 5, "dueno": "Tecnología"},
    {"id": "R2", "riesgo": "Pérdida de lecturas por falla prolongada de la red en planta", "p": 3, "i": 4, "inherente": 12, "control": "Segunda SIM, respaldo de 7 días, atención en 48 h (P7)", "residual": 4, "dueno": "Tecnología y Entrega"},
    {"id": "R3", "riesgo": "Acceso de un cliente o un tercero a datos de otro cliente", "p": 2, "i": 5, "inherente": 10, "control": "Aislamiento por cliente, llaves por cliente, MFA, prueba de penetración", "residual": 5, "dueno": "Tecnología y Legal"},
    {"id": "R4", "riesgo": "Alteración de lecturas, líneas base o cálculos ya facturados", "p": 2, "i": 5, "inherente": 10, "control": "Inmutabilidad, huella digital, auditoría, versionado (RN6)", "residual": 4, "dueno": "Entrega de Servicio"},
    {"id": "R5", "riesgo": "Ransomware en los equipos de la sede", "p": 3, "i": 3, "inherente": 9, "control": "VLAN, respaldos inmutables, protección de equipos, formación", "residual": 4, "dueno": "Tecnología"},
    {"id": "R6", "riesgo": "Dependencia excesiva de un proveedor de nube", "p": 3, "i": 3, "inherente": 9, "control": "Contenedores, PostgreSQL estándar, infraestructura como código, plan de salida", "residual": 6, "dueno": "Gerencia y Tecnología"},
    {"id": "R7", "riesgo": "Manipulación física de la pasarela en planta", "p": 2, "i": 3, "inherente": 6, "control": "Gabinete sellado, certificado revocable, alerta de 24 h (RN4)", "residual": 3, "dueno": "Entrega de Servicio"},
    {"id": "R8", "riesgo": "Transferencia internacional de datos personales sin garantías", "p": 2, "i": 4, "inherente": 8, "control": "Minimización, evaluación según art. 26 de la Ley 1581, cláusulas con el proveedor", "residual": 4, "dueno": "Legal"}
  ],
  "notaRiesgos": "Escala de 1 a 5 para la probabilidad (P) y el impacto (I). Inherente = P × I antes de los controles; residual = valoración esperada después de aplicarlos. Alto: 12 o más; medio: 6 a 11; bajo: 5 o menos. Valoración del equipo{P}."
},

"tobe": {
  "intro": "Las capas descritas por separado se juntan en un solo estado objetivo. En el método ADM de TOGAF es el resultado conjunto de las fases B, C y D, que después se contrasta con el estado actual para encontrar las brechas.",
  "capas": [
    {"capa": "Estrategia", "estado": "Referente del Caribe en IA para la eficiencia de recursos, con 120 clientes, 90 GWh y 2,2 millones de m³ ahorrados y 35.000 tCO2e evitadas, todo verificado por un tercero.", "decision": "Cobrar solo por ahorro verificado: el ingreso y el impacto son la misma cifra.", "objetivos": ["OE1", "OE2"]},
    {"capa": "Negocio", "estado": "Catorce procesos; un ciclo de servicio estándar con puesta en marcha de 4 a 6 semanas por cliente y cierre mensual con reglas explícitas (RN1–RN8).", "decision": "El porcentaje comprometido se fija después de medir (RN2) y sin ahorro no hay factura (RN1).", "objetivos": ["OE1", "OE2"]},
    {"capa": "Información", "estado": "Un solo modelo de datos de quince entidades; cada entidad con un único sistema que la crea; histórico de 10 años inmutable.", "decision": "La línea base no se actualiza, se versiona; la factura apunta a la versión que la sustenta (RN6).", "objetivos": ["OE2", "OE4"]},
    {"capa": "Aplicaciones", "estado": "Diez aplicaciones integradas por API, eventos o archivos controlados, nunca punto a punto.", "decision": "Tres aplicaciones críticas (A2, A3, A4) realizan C2 y C4; lo demás se contrata.", "objetivos": ["OE2", "OE5"]},
    {"capa": "Tecnología", "estado": "Borde resiliente en planta, nube pública multi-zona con región de recuperación, seguridad por diseño y sede segmentada.", "decision": "Lo que se ingiere no se puede perder: réplica entre zonas, respaldo regional y 7 días de respaldo en el borde.", "objetivos": ["OE2", "OE3"]}
  ],
  "vistaIntegrada": "La vista ArchiMate 3.2 junta las cuatro capas: arriba C2 y C4, las capacidades que el resto realiza; debajo, quién usa las aplicaciones; en el centro, el catálogo y las integraciones con los objetos de datos del MER; abajo, los nodos de tecnología. Las flechas de realización que suben desde las aplicaciones hasta C2 y C4 son la prueba gráfica de que la tecnología se eligió en función de las capacidades.",
  "principios": [
    {"id": "PA1", "nombre": "La capacidad manda sobre la herramienta", "justificacion": "La estrategia define qué debe saber hacer la empresa; la tecnología es un medio.", "implicacion": "Toda aplicación o nodo nuevo debe nombrar la capacidad que realiza."},
    {"id": "PA2", "nombre": "Sin evidencia no hay factura", "justificacion": "El modelo de ingresos depende de que el cliente acepte la cifra de ahorro.", "implicacion": "Las reglas RN1, RN3 y RN6 se implementan en el proceso, en los datos y en las aplicaciones a la vez."},
    {"id": "PA3", "nombre": "Capturar una vez, reutilizar siempre", "justificacion": "Cada copia manual del dato es una oportunidad de error y de disputa.", "implicacion": "Cada entidad tiene un solo sistema que la crea; las demás aplicaciones la leen por integración."},
    {"id": "PA4", "nombre": "El histórico es el activo", "justificacion": "El histórico de consumo es lo que un competidor no puede comprar.", "implicacion": "Retención de 10 años, inmutabilidad, réplica y respaldo regional."},
    {"id": "PA5", "nombre": "Integración por contrato, nunca punto a punto", "justificacion": "Las conexiones directas multiplican los puntos de falla y de control.", "implicacion": "Toda integración pasa por el gateway, el bus o la transferencia de archivos, con identidad verificada."},
    {"id": "PA6", "nombre": "Practicar lo que se vende", "justificacion": "La coherencia ambiental es parte de la propuesta de valor y del estatus BIC.", "implicacion": "La sede se mide con la misma plataforma; los equipos vuelven y se reacondicionan."}
  ],
  "cambios": [
    {"desde": "La factura mensual", "hacia": "Lecturas cada 15 minutos por proceso", "porque": "Sin saber qué proceso, en qué turno y bajo qué condición se consume, no hay diagnóstico ni medidas.", "sostiene": "C2, C3; OE2"},
    {"desde": "Comparar con el año anterior", "hacia": "Comparar con una línea base ajustada", "porque": "Es la única forma de separar el efecto de la producción y el clima del efecto de las medidas (IPMVP, ASHRAE 14).", "sostiene": "C2, C4; OE2"},
    {"desde": "Informes sueltos", "hacia": "Un expediente MRV verificable", "porque": "El verificador, el inversionista y el informe BIC necesitan la misma evidencia trazable.", "sostiene": "C4, C8; OE2, OE4"},
    {"desde": "Cobrar honorarios", "hacia": "Cobrar un porcentaje del ahorro", "porque": "Elimina la barrera de inversión del cliente y alinea el ingreso con el impacto.", "sostiene": "C5; OE1"},
    {"desde": "Hojas de cálculo", "hacia": "Una plataforma con sistema de registro único", "porque": "Con más de unos pocos clientes, la conciliación manual no escala ni deja auditoría.", "sostiene": "C2, C9; OE1"},
    {"desde": "Archivos en carpetas compartidas", "hacia": "Nube multi-zona con recuperación regional", "porque": "La pérdida del histórico destruiría el activo diferencial y la facturación.", "sostiene": "C2; OE2, OE4"},
    {"desde": "Equipos vendidos", "hacia": "Equipos en comodato con ciclo de vida", "porque": "El cliente no acumula chatarra electrónica y VIRIDIA reutiliza el equipo.", "sostiene": "C7; OE3"}
  ]
},

"transformacion": {
  "intro": "El análisis de brechas compara el estado actual (As-Is) con el objetivo (To-Be) y lista lo que hay que crear, mejorar o eliminar. Es la técnica que TOGAF usa entre las fases de arquitectura y la planeación de la migración.",
  "asisCliente": "El cliente gestiona su consumo con la factura mensual del comercializador, que llega hasta treinta días después del hecho y no dice qué proceso, en qué turno ni bajo qué condición se consumió. Copia esa cifra en hojas de cálculo, la compara con el mes anterior o con el del año pasado y revisa a mano los picos. Cuando ejecuta una medida de eficiencia no tiene línea base para demostrar cuánto ahorró, y el programa de eficiencia pierde presupuesto.",
  "asisViridiaNota": "Punto de arranque de la propia empresa, al final de 2026, con los primeros pilotos que prevé la Matriz de Zachman. Supuesto del equipo{P}: el servicio funciona, pero depende de los fundadores, de hojas de cálculo y de procedimientos que no están escritos.",
  "asisViridia": [
    {"capa": "Negocio", "hoy": "Tres pilotos atendidos caso a caso por los fundadores. Sin procedimiento escrito de incorporación; contratos redactados uno por uno; el ahorro de cada mes se calcula a mano.", "consecuencia": "No escala más allá de unos pocos clientes; el resultado depende de quién lo calcula."},
    {"capa": "Información", "hoy": "Facturas escaneadas, archivos CSV descargados del portal del fabricante de los medidores y una hoja de cálculo por cliente. La línea base vive en un cuaderno de análisis sin versiones.", "consecuencia": "No hay una sola fuente de verdad; una factura no se puede rastrear hasta la línea base que la originó."},
    {"capa": "Aplicaciones", "hoy": "Ofimática en la nube, correo electrónico, un software contable genérico y el portal del fabricante de los medidores. Ninguna integración entre ellos.", "consecuencia": "Cada dato se digita varias veces; los reportes se arman a mano."},
    {"capa": "Tecnología", "hoy": "Medidores con descarga manual o por el portal del fabricante; portátiles del equipo; red de oficina sin segmentar; carpetas compartidas como único respaldo; cuentas compartidas.", "consecuencia": "Riesgo de perder el histórico y de exponer datos de un cliente a otro."}
  ],
  "brechas": [
    {"id": "B1", "capa": "Negocio", "desde": "Incorporación caso a caso", "hacia": "Ciclo estándar (BPMN parte 1) con puesta en marcha de 4 a 6 semanas", "accion": "Crear", "afecta": ["C3", "C5", "OE1"], "prioridad": "Alta", "proyectos": ["P1", "P3"], "esfuerzo": 3.4, "impacto": 8.3},
    {"id": "B2", "capa": "Negocio", "desde": "Cierre mensual a mano", "hacia": "Subproceso con controles automáticos de RN1, RN3 y RN6", "accion": "Crear", "afecta": ["C2", "C4", "OE2"], "prioridad": "Alta", "proyectos": ["P3"], "esfuerzo": 6.0, "impacto": 9.1},
    {"id": "B3", "capa": "Negocio", "desde": "Producción del cliente entregada cuando puede", "hacia": "Fecha de entrega en el contrato y plantilla validada (I10)", "accion": "Mejorar", "afecta": ["C2", "OE2"], "prioridad": "Alta", "proyectos": ["P4", "P7"], "esfuerzo": 1.4, "impacto": 7.2},
    {"id": "B4", "capa": "Negocio", "desde": "Sin verificador ni proceso de reporte", "hacia": "Verificación anual contratada e informe BIC y ESG (RN7)", "accion": "Crear", "afecta": ["C4", "C8", "OE2", "OE4"], "prioridad": "Media", "proyectos": ["P9"], "esfuerzo": 3.6, "impacto": 5.0},
    {"id": "B5", "capa": "Negocio", "desde": "Talento (S5) y operación verde (S6) sin soporte ni indicadores", "hacia": "Procesos definidos y servicios contratados", "accion": "Crear", "afecta": ["C6", "C10", "OE3", "OE5"], "prioridad": "Baja", "proyectos": ["P10"], "esfuerzo": 2.0, "impacto": 2.4},
    {"id": "B6", "capa": "Información", "desde": "Hojas de cálculo por cliente y línea base sin versiones", "hacia": "MER único, series de tiempo y línea base versionada", "accion": "Crear; eliminar hojas", "afecta": ["C2", "OE2"], "prioridad": "Alta", "proyectos": ["P2", "P3"], "esfuerzo": 7.2, "impacto": 8.1},
    {"id": "B7", "capa": "Información", "desde": "Sin dueños, reglas de calidad ni retención", "hacia": "Gobierno de datos con un sistema de registro por entidad, 10 años de retención y política de tratamiento", "accion": "Crear", "afecta": ["C9", "OE2", "OE4"], "prioridad": "Alta", "proyectos": ["P1"], "esfuerzo": 3.0, "impacto": 6.7},
    {"id": "B8", "capa": "Aplicaciones", "desde": "Sin plataforma propia", "hacia": "A1 a A4 construidas y en operación", "accion": "Crear", "afecta": ["C2", "C4", "OE2"], "prioridad": "Alta", "proyectos": ["P2", "P3"], "esfuerzo": 9.0, "impacto": 8.45},
    {"id": "B9", "capa": "Aplicaciones", "desde": "Datos que viajan por correo", "hacia": "Capa de integración completa (gateway, bus y transferencia de archivos)", "accion": "Crear; eliminar correo", "afecta": ["C2", "OE1"], "prioridad": "Media", "proyectos": ["P7"], "esfuerzo": 7.1, "impacto": 5.0},
    {"id": "B10", "capa": "Aplicaciones", "desde": "Reportes en PDF por correo", "hacia": "Portal del cliente con alertas (A5)", "accion": "Crear", "afecta": ["C3", "OE1"], "prioridad": "Media", "proyectos": ["P6"], "esfuerzo": 5.7, "impacto": 4.3},
    {"id": "B11", "capa": "Aplicaciones", "desde": "Inventario de equipos en hoja de cálculo", "hacia": "Gestión de activos con trazabilidad serial–punto y logística inversa (A8)", "accion": "Mejorar", "afecta": ["C7", "OE3"], "prioridad": "Media", "proyectos": ["P8"], "esfuerzo": 4.6, "impacto": 3.6},
    {"id": "B12", "capa": "Tecnología", "desde": "Carpetas compartidas como único respaldo y punto único de falla en la ingesta", "hacia": "Ambientes separados, multi-zona y región de recuperación", "accion": "Crear", "afecta": ["C2", "OE2", "OE4"], "prioridad": "Alta", "proyectos": ["P2", "P7"], "esfuerzo": 8.3, "impacto": 7.0},
    {"id": "B13", "capa": "Tecnología", "desde": "Ventana de 48 h entre la alerta (24 h) y la pérdida de datos (72 h)", "hacia": "7 días de respaldo local y atención en 48 h", "accion": "Mejorar", "afecta": ["C2", "OE2"], "prioridad": "Alta", "proyectos": ["P7"], "esfuerzo": 1.8, "impacto": 8.7},
    {"id": "B14", "capa": "Tecnología", "desde": "Cuentas compartidas y red plana", "hacia": "Identidad con MFA, acceso por rol y VLAN en la sede", "accion": "Crear; eliminar cuentas compartidas", "afecta": ["C9", "OE2"], "prioridad": "Alta", "proyectos": ["P5"], "esfuerzo": 4.3, "impacto": 7.4}
  ],
  "brechasTaller3": ["B12", "B13", "B3", "B5"],
  "priorizacion": "Cada brecha se valoró con dos criterios de 0 a 10{P}: el impacto sobre la capacidad crítica C2 y sobre OE1 y OE2, y el esfuerzo (tiempo, costo y dependencias).",
  "cuadrantes": [
    {"id": "rapidas", "nombre": "Ganancias rápidas", "texto": "Cuestan poco y protegen mucho: se cierran en los primeros meses, casi todas con decisiones, cláusulas contractuales y servicios contratados."},
    {"id": "estructurales", "nombre": "Proyectos estructurales", "texto": "La construcción de la plataforma que realiza C2 y C4; empiezan en paralelo porque de ellos depende la primera factura por ahorro verificado."},
    {"id": "complementos", "nombre": "Complementos", "texto": "Impacto medio o bajo y esfuerzo moderado. B5 es la única de prioridad baja, pero tiene una fecha fija: OE3 exige 100 % de energía renovable propia antes de 2029."},
    {"id": "escala", "nombre": "Cuando haya escala", "texto": "Se cierran cuando la base de clientes crece y el trabajo manual deja de ser viable."}
  ],
  "gestionCambio": [
    {"frente": "Migración de los pilotos", "texto": "Los datos históricos de los tres pilotos se cargan con las reglas de validación de A2 y sus líneas base se vuelven a ajustar como versión 1. Desde ese momento se dejan las hojas de cálculo: dos fuentes en paralelo más de un cierre crearían dos verdades."},
    {"frente": "Personas de VIRIDIA", "texto": "Los ingenieros pasan de calcular el ahorro a revisarlo, y los analistas, de digitar datos a vigilar su calidad. Talento Humano forma a cada perfil antes de que entre en operación su aplicación (C10)."},
    {"frente": "Personas del cliente", "texto": "El ahorro depende de que los operarios ejecuten las medidas. El ingeniero acompaña en planta y el tablero (A5) muestra al jefe de mantenimiento el efecto de cada medida por turno."}
  ],
  "criterios": [
    {"nombre": "Primero lo que sostiene C2", "texto": "La plataforma de datos y la línea base van antes que el portal o la automatización comercial (PA1, PA2)."},
    {"nombre": "Ganancias rápidas al comienzo", "texto": "Las brechas de alto impacto y bajo esfuerzo se cierran en los primeros meses."},
    {"nombre": "Construir antes de escalar", "texto": "Ninguna fase de crecimiento comercial empieza sin que la anterior haya pasado su criterio de salida."},
    {"nombre": "Respetar las fechas estratégicas", "texto": "OE3 fija el 100 % de energía renovable propia antes de 2029, y OE1 fija 8, 45 y 120 clientes al cierre de 2027, 2029 y 2031."}
  ],
  "fases": [
    {"id": "F1", "n": 1, "nombre": "Fundación y pilotos", "periodo": "Dic. 2026 – dic. 2027", "enfoque": "Gobierno de datos, seguridad base, plataforma mínima (A1–A4, A10) y sistemas contratados (A6, A7, A9). Agroindustria y alimentos en Atlántico y Bolívar.", "meta": "8 clientes; primera factura trazable a su línea base.", "ini": 0, "fin": 3},
    {"id": "F2", "n": 2, "nombre": "Escalamiento regional", "periodo": "2028 – 2029", "enfoque": "Portal, integración completa, alta disponibilidad y recuperación, activos en comodato, verificación anual y operación verde. Entrada de hoteles y clínicas y del resto de departamentos.", "meta": "45 clientes; sede 100 % renovable antes de 2029.", "ini": 3, "fin": 7},
    {"id": "F3", "n": 3, "nombre": "Consolidación", "periodo": "2030 – 2031", "enfoque": "Analítica avanzada y propiedad intelectual; infraestructura pública y extensión a materiales y residuos.", "meta": "120 clientes y metas de impacto de la Visión 2031.", "ini": 7, "fin": 11}
  ],
  "semestres": ["2026-S2", "2027-S1", "2027-S2", "2028-S1", "2028-S2", "2029-S1", "2029-S2", "2030-S1", "2030-S2", "2031-S1", "2031-S2"],
  "proyectos": [
    {"id": "P1", "fase": 1, "nombre": "Oficina de arquitectura y gobierno de datos", "actividades": "Comité de arquitectura; dueño y sistema de registro por entidad; reglas de calidad y retención; política de tratamiento de datos; procedimiento estándar de incorporación.", "responsable": "Gerencia General; Tecnología, con Legal", "depende": [], "cierra": ["B1", "B7"], "periodo": "Dic. 2026 – jun. 2027", "ini": 0, "fin": 2},
    {"id": "P2", "fase": 1, "nombre": "Plataforma de medición y datos", "actividades": "Selección del proveedor de nube; ambientes separados con infraestructura como código; pasarela A1; ingesta A2 con series de tiempo; respaldo diario; inventario básico de equipos; migración de los pilotos.", "responsable": "Tecnología y Gobierno de Datos", "depende": ["P1", "P5"], "cierra": ["B6", "B8", "B12"], "periodo": "Dic. 2026 – dic. 2027", "ini": 0, "fin": 3},
    {"id": "P3", "fase": 1, "nombre": "Motor de línea base y módulo MRV", "actividades": "Motor A3 con validación ASHRAE 14 y versionado; módulo A4 con controles de RN1 y RN3; reporte mensual; pruebas de aceptación con datos históricos de los pilotos.", "responsable": "I+D en IA; Entrega de Servicio", "depende": ["P2"], "cierra": ["B1", "B2", "B6", "B8"], "periodo": "Ene. – dic. 2027", "ini": 1, "fin": 3},
    {"id": "P4", "fase": 1, "nombre": "Sistemas comerciales, financieros y documentales", "actividades": "CRM (A6), ERP contable con factura electrónica (A7) y gestión documental (A9) contratados; contrato tipo con fecha de entrega de la producción.", "responsable": "Comercial; Finanzas; Legal", "depende": ["P1"], "cierra": ["B3"], "periodo": "Ene. – jun. 2027", "ini": 1, "fin": 2},
    {"id": "P5", "fase": 1, "nombre": "Seguridad base", "actividades": "Identidad con MFA (A10); eliminación de cuentas compartidas; red de la sede con VLAN y firewall; VPN a la nube.", "responsable": "Tecnología, con Legal", "depende": [], "cierra": ["B14"], "periodo": "Dic. 2026 – jun. 2027", "ini": 0, "fin": 2},
    {"id": "P6", "fase": 2, "nombre": "Portal y notificaciones del cliente", "actividades": "Portal A5 con consumo por proceso y turno; alertas por correo y SMS; WAF.", "responsable": "Entrega de Servicio, con Tecnología", "depende": ["P3"], "cierra": ["B10"], "periodo": "2028", "ini": 3, "fin": 5},
    {"id": "P7", "fase": 2, "nombre": "Alta disponibilidad, recuperación e integración", "actividades": "Despliegue multi-zona; región secundaria y prueba de recuperación; capa de integración completa (I1–I16); respaldo de 7 días en pasarelas; atención en campo en 48 h.", "responsable": "Tecnología y Gobierno de Datos", "depende": ["P2"], "cierra": ["B3", "B9", "B12", "B13"], "periodo": "Ene. 2028 – jun. 2029", "ini": 3, "fin": 6},
    {"id": "P8", "fase": 2, "nombre": "Activos en comodato y logística inversa", "actividades": "A8 con trazabilidad serial–punto; orden de retiro automática (I12); laboratorio de reacondicionamiento y disposición RAEE.", "responsable": "Sostenibilidad y Operaciones Verdes", "depende": ["P2", "P4"], "cierra": ["B11"], "periodo": "2028 – 2029", "ini": 3, "fin": 7},
    {"id": "P9", "fase": 2, "nombre": "Verificación independiente y reporte BIC y ESG", "actividades": "Contrato marco con el verificador; expediente MRV automático (I6); informe BIC y reporte ESG desde datos verificados.", "responsable": "Entrega de Servicio; Sostenibilidad, con Finanzas", "depende": ["P3"], "cierra": ["B4"], "periodo": "2028", "ini": 3, "fin": 5},
    {"id": "P10", "fase": 2, "nombre": "Operación verde y talento", "actividades": "Autogeneración solar de la sede medida con la propia plataforma; compostaje y separación en la fuente; servicio de gestión del talento y formación.", "responsable": "Sostenibilidad; Talento Humano", "depende": ["P1"], "cierra": ["B5"], "periodo": "2028", "ini": 3, "fin": 5},
    {"id": "P11", "fase": 3, "nombre": "Analítica avanzada y propiedad intelectual", "actividades": "Modelos por sector y condición climática entrenados con el histórico acumulado; protección de tres desarrollos propios; alianzas con cuatro universidades.", "responsable": "I+D en IA, con Legal", "depende": ["P3"], "cierra": [], "cierraNota": "OE5", "periodo": "2030 – 2031", "ini": 7, "fin": 11},
    {"id": "P12", "fase": 3, "nombre": "Expansión y gestión integral de recursos", "actividades": "Infraestructura pública; preparación para el interior del país; extensión del modelo a materiales y residuos.", "responsable": "Comercial; Gerencia General", "depende": ["P7", "P9"], "cierra": [], "cierraNota": "Visión 2031", "periodo": "2030 – 2031", "ini": 7, "fin": 11}
  ],
  "notaProyectos": "Los diez primeros proyectos cierran las brechas. P11 y P12 no cierran brechas del As-Is: realizan la evolución de la Visión 2031, de la eficiencia energética e hídrica hacia la gestión integral de recursos. Todas las fechas son estimaciones del equipo{P}.",
  "hitos": [
    {"id": "H1", "fecha": "Junio de 2027", "pos": 2, "logro": "Plataforma mínima en producción y pilotos migrados.", "evidencia": "Primer cierre mensual de los pilotos con datos de A2; hojas de cálculo retiradas."},
    {"id": "H2", "fecha": "Diciembre de 2027", "pos": 3, "logro": "Primera factura por ahorro verificado emitida desde A4 y A7; 8 clientes activos (OE1).", "evidencia": "Factura rastreable hasta la versión de la línea base que la originó."},
    {"id": "H3", "fecha": "Junio de 2028", "pos": 4, "logro": "Primera verificación independiente anual y primer informe BIC con datos verificados (OE2, OE4).", "evidencia": "Reporte del verificador sin hallazgos mayores."},
    {"id": "H4", "fecha": "Diciembre de 2028", "pos": 5, "logro": "Sede 100 % renovable (OE3) y recuperación ante desastres probada.", "evidencia": "Medición propia en la VLAN 40; acta de la prueba de recuperación."},
    {"id": "H5", "fecha": "Diciembre de 2029", "pos": 7, "logro": "45 clientes activos, con hoteles, clínicas y los demás departamentos (OE1).", "evidencia": "Registro de contratos en A6."},
    {"id": "H6", "fecha": "Diciembre de 2031", "pos": 11, "logro": "120 clientes; 90 GWh y 2,2 millones de m³ ahorrados; 35.000 tCO2e evitadas; tres desarrollos protegidos (OE1, OE2, OE5).", "evidencia": "Expedientes MRV acumulados y verificados; registros de propiedad intelectual."}
  ],
  "puestaEnMarcha": [
    {"semanas": "Semanas 1 y 2", "nombre": "Caracterización", "texto": "Prefactibilidad, confidencialidad y comodato (BPMN parte 1). Se reciben 12 meses{P} de facturas y registros históricos de producción."},
    {"semanas": "Semana 3", "nombre": "Instalación", "texto": "Medidores, sensores y pasarela; registro de seriales en A8."},
    {"semanas": "Semanas 4 y 5", "nombre": "Contraste de datos", "texto": "Las lecturas de los medidores se comparan con los registros históricos para validar que describen la misma operación."},
    {"semanas": "Semana 6", "nombre": "Línea base inicial", "texto": "Se ajusta la versión 1 con los 12 meses históricos y se valida con ASHRAE Guideline 14; se firma el contrato y se habilita la facturación."}
  ],
  "notaPuesta": "El periodo de referencia se construye con la historia que el cliente ya tiene; los medidores no la reemplazan: la contrastan y, con lecturas cada 15 minutos, afinan la línea base en cada recálculo trimestral (RN6).",
  "gobierno": "El comité de arquitectura que crea P1, presidido por la Gerencia General y con Tecnología, I+D, Entrega de Servicio y Finanzas, revisa el avance cada trimestre y aprueba cualquier cambio de alcance con el principio PA1: ninguna aplicación ni nodo entra al roadmap sin nombrar la capacidad que realiza.",
  "criteriosSalida": [
    {"paso": "De la fase 1 a la 2", "texto": "H2 cumplido; ningún incidente de pérdida de datos; al menos el 95 % de los periodos mensuales con completitud igual o superior al 95 % (RN3){P}."},
    {"paso": "De la fase 2 a la 3", "texto": "H4 y H5 cumplidos; dos verificaciones anuales sin hallazgos mayores; disponibilidad mensual de A2 igual o superior al 99,5 %{P}."}
  ]
},

"trazabilidad": [
  {"actividad": "Evaluar prefactibilidad con facturas históricas", "act": "bpmn1:v_eval", "entidades": ["CLIENTE", "PLANTA"], "apps": ["A6"], "nodos": ["SaaS"], "capacidades": ["C5"], "objetivos": ["OE1"], "proyectos": ["P4"]},
  {"actividad": "Formalizar confidencialidad y comodato", "act": "bpmn1:v_form", "entidades": ["CONTRATO", "EQUIPO"], "apps": ["A6", "A9"], "nodos": ["SaaS"], "capacidades": ["C7", "C9"], "objetivos": ["OE3", "OE4"], "proyectos": ["P4"]},
  {"actividad": "Instalar medidores y pasarela de planta", "act": "bpmn1:v_inst", "entidades": ["EQUIPO", "PUNTO_MEDICION"], "apps": ["A1", "A8"], "nodos": ["T1", "T2", "T8"], "capacidades": ["C2", "C7"], "objetivos": ["OE2", "OE3"], "proyectos": ["P2", "P8"]},
  {"actividad": "Capturar datos del periodo de referencia", "act": "bpmn1:v_cap", "entidades": ["LECTURA", "VARIABLE_OPERACION"], "apps": ["A1", "A2"], "nodos": ["T2", "T3", "T6", "T10"], "capacidades": ["C2"], "objetivos": ["OE2"], "proyectos": ["P2"]},
  {"actividad": "Ajustar modelo de línea base", "act": "bpmn1:v_adj", "entidades": ["LINEA_BASE"], "apps": ["A3"], "nodos": ["T9", "T11"], "capacidades": ["C2", "C1"], "objetivos": ["OE2", "OE5"], "proyectos": ["P3"]},
  {"actividad": "Negociar y firmar contrato de desempeño", "act": "bpmn1:v_neg", "entidades": ["CONTRATO", "ALCANCE_CONTRATO"], "apps": ["A6", "A9"], "nodos": ["SaaS", "T11"], "capacidades": ["C5"], "objetivos": ["OE1", "OE4"], "proyectos": ["P4"]},
  {"actividad": "Diagnosticar desperdicio y priorizar medidas", "act": "bpmn1:v_diag", "entidades": ["MEDIDA_AHORRO"], "apps": ["A3", "A4"], "nodos": ["T8", "T11"], "capacidades": ["C3"], "objetivos": ["OE1", "OE2"], "proyectos": ["P3"]},
  {"actividad": "Acompañar la implementación de medidas", "act": "bpmn1:v_acom", "entidades": ["MEDIDA_AHORRO"], "apps": ["A4", "A5"], "nodos": ["T4", "T8"], "capacidades": ["C3"], "objetivos": ["OE1"], "proyectos": ["P3", "P6"]},
  {"actividad": "Monitorear consumo y estado de medidores", "act": "bpmn2:v_mon", "entidades": ["LECTURA", "ALERTA"], "apps": ["A2", "A3", "A5"], "nodos": ["T6", "T8", "T10"], "capacidades": ["C2"], "objetivos": ["OE2"], "proyectos": ["P2", "P6"]},
  {"actividad": "Validar completitud y calidad de los datos", "act": "bpmn3:s_val", "entidades": ["LECTURA"], "apps": ["A2"], "nodos": ["T8", "T10"], "capacidades": ["C2", "C9"], "objetivos": ["OE2"], "proyectos": ["P2"]},
  {"actividad": "Calcular ahorro, % de reducción y tCO2e", "act": "bpmn3:s_cal", "entidades": ["CALCULO_AHORRO", "AJUSTE_NO_RUTINARIO"], "apps": ["A4"], "nodos": ["T8", "T11"], "capacidades": ["C4"], "objetivos": ["OE2"], "proyectos": ["P3"]},
  {"actividad": "Liquidar participación y emitir factura", "act": "bpmn3:s_liq", "entidades": ["FACTURA"], "apps": ["A7"], "nodos": ["T5", "T8", "SaaS"], "capacidades": ["C5", "C8"], "objetivos": ["OE1", "OE4"], "proyectos": ["P3", "P4"]},
  {"actividad": "Recalcular línea base (nueva versión)", "act": "bpmn2:v_rec", "entidades": ["LINEA_BASE"], "apps": ["A3"], "nodos": ["T9", "T11", "T12"], "capacidades": ["C2"], "objetivos": ["OE2"], "proyectos": ["P3", "P11"]},
  {"actividad": "Preparar expediente MRV anual", "act": "bpmn2:v_mrv", "entidades": ["VERIFICACION", "CALCULO_AHORRO"], "apps": ["A4", "A9"], "nodos": ["T7", "T12"], "capacidades": ["C4"], "objetivos": ["OE2"], "proyectos": ["P9"]},
  {"actividad": "Consolidar informe BIC y reporte ESG", "act": "bpmn2:v_cons", "entidades": ["VERIFICACION"], "apps": ["A7", "A9"], "nodos": ["T12", "SaaS"], "capacidades": ["C4", "C8"], "objetivos": ["OE2", "OE4"], "proyectos": ["P9"]},
  {"actividad": "Retirar y reacondicionar equipos", "act": "bpmn2:v_ret", "entidades": ["EQUIPO"], "apps": ["A8"], "nodos": ["T8", "T16"], "capacidades": ["C7"], "objetivos": ["OE3"], "proyectos": ["P8"]},
  {"actividad": "Medir el consumo de la propia sede (S6)", "act": null, "entidades": ["LECTURA"], "apps": ["A2"], "nodos": ["T10", "T16"], "capacidades": ["C6"], "objetivos": ["OE3"], "proyectos": ["P10"]}
],
"notaTrazabilidad": "Leída al revés, la tabla es una prueba de consistencia: aparecen los cinco objetivos; nueve de las diez capacidades tienen al menos una actividad (C10, el talento, es un proceso interno, S5, y el roadmap la cubre con P10); la medición de la sede cierra el vacío que el Taller 3 dejó en C6. Las diez aplicaciones y los dieciséis nodos aparecen al menos una vez, si se cuenta que A10, T13 y T14 sirven a todas las filas.",

"conclusiones": {
  "respuestas": [
    {"pregunta": "Cómo está estructurada la empresa", "texto": "Una sociedad BIC con nueve áreas, cada una responsable de una o más de las diez capacidades, que se derivan de cinco objetivos estratégicos. Ningún área existe sin una capacidad que justifique su costo. El centro de gravedad es C2: el activo que se acumula con el tiempo y sostiene el modelo de ingresos."},
    {"pregunta": "Cómo funciona", "texto": "Cinco procesos misionales convierten una necesidad que el cliente no puede explicar en ahorro verificado. Todas las decisiones que pueden detener el flujo protegen la cifra de ahorro: el modelo que no cumple ASHRAE no deja firmar, el periodo incompleto no se liquida y el ahorro nulo no se factura. El MER lleva esas reglas a los datos."},
    {"pregunta": "Qué tecnologías necesita", "texto": "Poca tecnología propia, muy bien hecha. Las cuatro aplicaciones que realizan C2 y C4 (A1 a A4) se construyen sobre plataforma gestionada; el resto se contrata. Todo se ordena alrededor de un solo riesgo, la pérdida del histórico: redundancia multi-zona, respaldo regional, evidencia inmutable y siete días de respaldo en el borde."},
    {"pregunta": "Cómo debe evolucionar", "texto": "Desde un arranque con pilotos y hojas de cálculo, VIRIDIA cierra catorce brechas con doce proyectos en tres fases: primero la cadena de evidencia y las ganancias rápidas; después portal, integración completa y verificación anual; al final propiedad intelectual y extensión a materiales y residuos. Cada fase tiene un criterio de salida."}
  ],
  "valor": [
    {"titulo": "Hizo visible el riesgo que más importa", "texto": "La pérdida del histórico de consumo arrastra a tres de los cinco objetivos."},
    {"titulo": "Convirtió reglas comerciales en restricciones verificables", "texto": "«No se factura sin ahorro verificado» está en una compuerta del BPMN, en una llave foránea y una restricción del modelo relacional, en una integración que solo se dispara con ahorro positivo y en un control de inmutabilidad."},
    {"titulo": "Dio un criterio para decir que no", "texto": "El principio PA1 permite rechazar tecnología que no realiza ninguna capacidad."},
    {"titulo": "Ordenó la inversión en el tiempo", "texto": "El análisis de brechas y el roadmap dicen qué construir primero con un capital escaso y paciente."}
  ],
  "kpis": [
    {"indicador": "Clientes corporativos activos", "meta": "8 (2027), 45 (2029), 120 (2031)", "objetivo": "OE1", "fuente": "A6"},
    {"indicador": "Reducción de consumo por cliente", "meta": "8 a 22 % en energía; 10 a 30 % en agua", "objetivo": "OE1, OE2", "fuente": "A4 (CALCULO_AHORRO)"},
    {"indicador": "Energía y agua ahorradas, acumuladas y verificadas", "meta": "90 GWh y 2,2 millones de m³ a 2031", "objetivo": "OE2", "fuente": "A4, VERIFICACION"},
    {"indicador": "Emisiones evitadas", "meta": "35.000 tCO2e a 2031", "objetivo": "OE2", "fuente": "A4"},
    {"indicador": "Facturas rastreables hasta su línea base", "meta": "100 %", "objetivo": "OE2, OE4", "fuente": "A4, A7"},
    {"indicador": "Periodos con completitud de datos de 95 % o más", "meta": "95 % o más de los periodos{P}", "objetivo": "OE2", "fuente": "A2"},
    {"indicador": "Puntos de medición reportando", "meta": "99 % o más (Matriz de Zachman)", "objetivo": "OE2", "fuente": "A2, T14"},
    {"indicador": "Disponibilidad mensual de la ingesta (A2)", "meta": "99,5 % o más{P}", "objetivo": "OE2", "fuente": "T14"},
    {"indicador": "Equipos en comodato recuperados al cierre del contrato", "meta": "Más del 95 %", "objetivo": "OE3", "fuente": "A8"},
    {"indicador": "Energía renovable en la sede", "meta": "100 % antes de 2029", "objetivo": "OE3", "fuente": "A2 (VLAN 40)"},
    {"indicador": "Participación accionaria con pacto de propósito BIC", "meta": "70 % o más", "objetivo": "OE4", "fuente": "Finanzas"},
    {"indicador": "Nómina dedicada a investigación aplicada; desarrollos protegidos", "meta": "20 % o más; 3 a 2031", "objetivo": "OE5", "fuente": "Talento Humano; Legal"}
  ],
  "limitaciones": "VIRIDIA es una empresa ficticia: esto es un diseño y no la descripción de una operación real. El As-Is de VIRIDIA, los objetivos de recuperación, la valoración de riesgos y brechas y las fechas del roadmap son propuestas del equipo y tendrían que contrastarse con cotizaciones, un piloto real y la selección del proveedor de nube. Las cifras de mercado y los factores de emisión se citan de fuentes primarias y deben actualizarse cuando cambien."
},

"declaracionIA": {
  "documento": {
    "herramienta": "Claude (Anthropic), mediante Claude Code, como herramienta de apoyo durante el semestre y en el documento final.",
    "proposito": "Exploración de ideas, búsqueda y organización de fuentes públicas, propuesta inicial de la estructura de los diagramas, generación del código TikZ y de los archivos BPMN y draw.io, asistencia en la redacción y la revisión de estilo, consolidación del documento final y redacción preliminar de las secciones nuevas.",
    "equipo": "Son del equipo la empresa y su estrategia (Taller 1), las reglas de negocio, los procesos modelados y los valores propuestos en el Corte III (participación del 40 %, contratos de 3 a 5 años, periodo de referencia de 12 meses).",
    "validacion": "Los datos externos se contrastaron con las fuentes primarias de las Referencias. Las cifras propias se marcan como propuestas del equipo y los valores de los ejemplos se declaran ilustrativos."
  },
  "activo": {
    "herramientas": "Claude (Anthropic), mediante Claude Code, para el código del sitio (HTML, CSS y JavaScript), la transcripción del documento final al archivo de datos, el motor del simulador, las texturas generadas por código y las pruebas automáticas. El generador de imágenes de Figma (modelo gpt-image-2.5-flare) para las ocho láminas de grabado; los prompts están en herramientas/prompts.json.",
    "proposito": "Construir el activo digital que el plan del proyecto final describe: once pantallas, el simulador del proceso de análisis de facturas, cierre mensual y facturación, y la publicación en GitHub Pages.",
    "equipo": "El contenido de la arquitectura es el del documento final del equipo. El equipo definió en su plan de trabajo las pantallas, el simulador y la forma de publicación, y eligió el estilo de las ilustraciones.",
    "validacion": "Una prueba automática (tests/verificar.js) comprueba que el simulador reproduce el ejemplo de cálculo del documento y que todos los identificadores son coherentes entre capas. Los clientes del simulador son datos ilustrativos."
  }
},

"referencias": [
  {"id": "togaf", "texto": "The Open Group. The TOGAF Standard, Version 9.2. The Open Group, 2018."},
  {"id": "archimate", "texto": "The Open Group. ArchiMate 3.2 Specification. The Open Group, 2022."},
  {"id": "bpmn", "texto": "Object Management Group. Business Process Model and Notation (BPMN), Version 2.0.2. OMG, 2014.", "url": "https://www.omg.org/spec/BPMN/2.0.2/"},
  {"id": "zachman", "texto": "Zachman, J. A. A framework for information systems architecture. IBM Systems Journal, 26(3), 276–292, 1987."},
  {"id": "berrio", "texto": "Berrio, E. Arquitectura de Negocio y Sistemas de Información. Presentación de la Unidad 2, Arquitectura Empresarial. Universidad Libre, 2026."},
  {"id": "ipmvp", "texto": "Efficiency Valuation Organization (EVO). International Performance Measurement and Verification Protocol (IPMVP): Core Concepts. EVO 10000-1:2022."},
  {"id": "ashrae14", "texto": "ASHRAE. Guideline 14-2014: Measurement of Energy, Demand, and Water Savings. Atlanta: ASHRAE, 2014."},
  {"id": "nist145", "texto": "Mell, P.; Grance, T. The NIST Definition of Cloud Computing. NIST SP 800-145, 2011."},
  {"id": "nist80034", "texto": "Swanson, M. et al. Contingency Planning Guide for Federal Information Systems. NIST SP 800-34 Rev. 1, 2010."},
  {"id": "iso27001", "texto": "ISO. ISO/IEC 27001:2022. Information security management systems. Requirements. Ginebra: ISO, 2022."},
  {"id": "iea2025", "texto": "International Energy Agency. Energy and AI. Energy demand from AI. París: IEA, 2025.", "url": "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai"},
  {"id": "proure2022", "texto": "UPME. Plan de Acción Indicativo PROURE 2022–2030. Ministerio de Minas y Energía.", "url": "https://www1.upme.gov.co/DemandayEficiencia/Documents/PROURE/Documento_PROURE_2022-2030_v4.pdf"},
  {"id": "upme085", "texto": "UPME. Resolución 000085 del 23 de febrero de 2026: factor de emisión del SIN del año 2024. Diario Oficial 53.409.", "url": "https://docs.upme.gov.co/Normatividad/085_2026.pdf"},
  {"id": "caribe2025", "texto": "El Tiempo. A menos de un año de la intervención de Air-e, la CREG reporta reducción en tarifas de energía. 2025.", "url": "https://www.eltiempo.com/colombia/barranquilla/a-menos-de-un-ano-de-la-intervencion-de-air-e-creg-reporta-reduccion-en-tarifas-de-energia-3432444"},
  {"id": "minenergia2025", "texto": "Ministerio de Minas y Energía. Las tarifas de energía bajan más del 16 % en todo el país y por encima del 28 % en el Caribe colombiano.", "url": "https://www.minenergia.gov.co/es/sala-de-prensa/noticias-index/las-tarifas-de-energia-bajan-mas-del-16-en-todo-el-pais-y-por-encima-del-28-en-el-caribe-colombiano/"},
  {"id": "bogota2025", "texto": "Alcaldía Mayor de Bogotá. Niveles de agua del Sistema Chingaza. Junio de 2025.", "url": "https://bogota.gov.co/mi-ciudad/habitat/niveles-de-agua-del-sistema-chingaza-llegan-al-70-en-junio-2025"},
  {"id": "semana2024", "texto": "Revista Semana. Así vivió Bogotá el racionamiento de agua más largo de 2024.", "url": "https://www.semana.com/sostenible/medio-ambiente/articulo/asi-vivio-bogota-el-racionamiento-de-agua-mas-largo-de-2024-estos-fueron-los-hechos-que-marcaron-la-crisis/202600/"},
  {"id": "conpes4144", "texto": "Departamento Nacional de Planeación. Documento CONPES 4144. Política Nacional de Inteligencia Artificial. 14 de febrero de 2025.", "url": "https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf"},
  {"id": "ley1258", "texto": "Congreso de la República de Colombia. Ley 1258 de 2008 (Sociedad por Acciones Simplificada)."},
  {"id": "bic1901", "texto": "Congreso de la República de Colombia. Ley 1901 de 2018 (Sociedades BIC); Decreto 2046 de 2019.", "url": "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=86982"},
  {"id": "ley1581", "texto": "Congreso de la República de Colombia. Ley 1581 de 2012, régimen general de protección de datos personales."},
  {"id": "res2184", "texto": "MinAmbiente y MinVivienda. Resolución 2184 de 2019: código de colores para la separación de residuos en la fuente."},
  {"id": "taller1", "texto": "Barraza Cantillo, L. A.; Barranco Reales, E. D.; Rangel Escobar, F. de J. VIRIDIA S.A.S. BIC. Documento de Estrategia Organizacional (Taller 1) y Matriz de Zachman. Universidad Libre, 2026."},
  {"id": "taller3", "texto": "Barraza Cantillo, L. A.; Barranco Reales, E. D.; Rangel Escobar, F. de J. VIRIDIA S.A.S. BIC. Procesos, Datos y Aplicaciones (Taller 3). Universidad Libre, 2026."}
]
};
