/* Clientes ilustrativos del simulador. TODOS LOS VALORES SON SUPUESTOS DEL EQUIPO:
   no corresponden a ninguna empresa real. Las series se construyeron para que:
   - la planta de alimentos reproduzca la línea base del ejemplo del documento
     (E = 120.000 + 0,45·P + 900·CDD) y su mes de reporte (570.000 kWh esperados, 495.000 reales);
   - el hotel no cumpla ASHRAE Guideline 14 con dos variables y sí cumpla al agregar la tercera
     («se mide más o se agregan variables»);
   - la embotelladora no tenga potencial suficiente (prospecto descartado).
   «valor» es el cargo de energía activa de cada factura (kWh × tarifa), sin otros conceptos.
   «factura» alimenta las facturas ficticias que lee el simulador (MotorVIRIDIA.factura): la comercializadora,
   las cuentas, los medidores y las lecturas iniciales son inventados. La contribución de solidaridad es del
   20 % para uso comercial; el uso industrial figura como exento. */
window.VIRIDIA_CLIENTES = [
  {
    "id": "alimentos",
    "nombre": "Planta de alimentos",
    "ciudad": "Barranquilla",
    "sector": "Alimentos y bebidas · segmento primario",
    "descripcion": "Procesos térmicos y cadena de frío: calderas, cuartos fríos y aire comprimido.",
    "meses": ["nov 25", "dic 25", "ene 26", "feb 26", "mar 26", "abr 26", "may 26", "jun 26", "jul 26", "ago 26", "sep 26", "oct 26"],
    "kwh": [515372, 548752, 536008, 596126, 457670, 585092, 525443, 666686, 640528, 661724, 643127, 601622],
    "tarifa": [905, 898, 884, 871, 862, 848, 836, 829, 815, 806, 801, 796],
    "variables": [
      {"id": "produccion", "nombre": "Producción", "unidad": "kg", "fuente": "ERP de la planta", "valores": [362000, 348000, 371000, 384000, 402000, 415000, 433000, 389000, 446000, 458000, 420000, 401000]},
      {"id": "cdd", "nombre": "Grados-día de enfriamiento", "unidad": "CDD", "fuente": "Registro climático de la ciudad", "valores": [300, 295, 290, 270, 305, 318, 330, 325, 334, 338, 322, 312]}
    ],
    "modelo": ["produccion", "cdd"],
    "mesReporte": {"produccion": 400000, "cdd": 300, "real": 495000, "completitud": 98.6, "tarifa": 796},
    "factura": {"prefijo": "EDC", "cuenta": "4512 0937", "medidor": "MED-38127", "uso": "No residencial · industrial", "contribucion": 0, "lecturaInicial": 4812350, "lecturaInicialReactiva": 1520440}
  },
  {
    "id": "hotel",
    "nombre": "Hotel con centro de convenciones",
    "ciudad": "Cartagena",
    "sector": "Hoteles y clínicas · segmento secundario",
    "descripcion": "Climatización todo el año, lavandería y salones de eventos.",
    "meses": ["nov 25", "dic 25", "ene 26", "feb 26", "mar 26", "abr 26", "may 26", "jun 26", "jul 26", "ago 26", "sep 26", "oct 26"],
    "kwh": [232986, 211321, 199856, 240070, 326244, 210322, 192478, 275903, 272049, 218636, 251222, 261433],
    "tarifa": [1028, 1019, 1004, 991, 979, 968, 957, 949, 936, 927, 919, 912],
    "variables": [
      {"id": "noches", "nombre": "Noches-habitación ocupadas", "unidad": "noches", "fuente": "Sistema de reservas del hotel", "valores": [3480, 3610, 2950, 2720, 3050, 2610, 2480, 3120, 3550, 3390, 2560, 2840]},
      {"id": "cdd", "nombre": "Grados-día de enfriamiento", "unidad": "CDD", "fuente": "Registro climático de la ciudad", "valores": [305, 300, 292, 276, 310, 322, 336, 330, 338, 341, 326, 315]},
      {"id": "eventos", "nombre": "Horas de eventos en salones", "unidad": "h", "fuente": "Agenda de salones", "valores": [150, 120, 100, 370, 360, 70, 140, 290, 300, 200, 220, 320]}
    ],
    "modelo": ["noches", "cdd"],
    "mesReporte": {"noches": 3200, "cdd": 315, "eventos": 180, "real": 201500, "completitud": 97.2, "tarifa": 912},
    "factura": {"prefijo": "EDC", "cuenta": "7730 1458", "medidor": "MED-51904", "uso": "No residencial · comercial", "contribucion": 20, "lecturaInicial": 2194610, "lecturaInicialReactiva": 702280}
  },
  {
    "id": "bebidas",
    "nombre": "Embotelladora",
    "ciudad": "Santa Marta",
    "sector": "Alimentos y bebidas · segmento primario",
    "descripcion": "Línea de envasado moderna con mantenimiento al día.",
    "meses": ["nov 25", "dic 25", "ene 26", "feb 26", "mar 26", "abr 26", "may 26", "jun 26", "jul 26", "ago 26", "sep 26", "oct 26"],
    "kwh": [424081, 409255, 412453, 403410, 458030, 455154, 452407, 452110, 477853, 508916, 461364, 424358],
    "tarifa": [889, 881, 870, 858, 849, 837, 826, 818, 806, 799, 794, 790],
    "variables": [
      {"id": "litros", "nombre": "Volumen envasado", "unidad": "miles de L", "fuente": "ERP de la planta", "valores": [4610, 4480, 4720, 4390, 4950, 5120, 5380, 5010, 5560, 5490, 5230, 4870]},
      {"id": "cdd", "nombre": "Grados-día de enfriamiento", "unidad": "CDD", "fuente": "Registro climático de la ciudad", "valores": [298, 293, 288, 268, 302, 316, 328, 322, 331, 336, 320, 309]}
    ],
    "modelo": ["litros", "cdd"],
    "mesReporte": {"litros": 5100, "cdd": 310, "real": 440000, "completitud": 99.1, "tarifa": 790},
    "factura": {"prefijo": "EDC", "cuenta": "6021 3376", "medidor": "MED-44610", "uso": "No residencial · industrial", "contribucion": 0, "lecturaInicial": 3967120, "lecturaInicialReactiva": 1288900}
  }
];
