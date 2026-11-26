-- VIRIDIA S.A.S. BIC (empresa ficticia, uso académico) · Taller Corte III
-- Modelo relacional derivado del modelo conceptual en notación de Chen.
-- Dialecto: PostgreSQL. Generado junto con diagramas/mer/MER-2-relacional.pdf.
-- Atributos derivados: pct_reduccion es columna generada; ahorro, tco2e_evitadas y valor_facturado
-- se guardan porque son evidencia que no puede cambiar después de facturar; la duración del contrato
-- no se guarda y la controla la restricción sobre fecha_fin.

CREATE TABLE cliente (
    id_cliente INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nit VARCHAR(15) NOT NULL UNIQUE,
    razon_social VARCHAR(150) NOT NULL,
    sector VARCHAR(40) NOT NULL,
    segmento VARCHAR(12) NOT NULL,
    CONSTRAINT ck_cliente_1 CHECK (sector IN ('agroindustria', 'alimentos y bebidas', 'hoteleria', 'salud', 'infraestructura publica')),
    CONSTRAINT ck_cliente_2 CHECK (segmento IN ('primario', 'secundario', 'terciario'))
);

-- atributo multivaluado CLIENTE.contacto
CREATE TABLE contacto_cliente (
    id_cliente INTEGER NOT NULL,
    contacto VARCHAR(120) NOT NULL,
    medio VARCHAR(6) NOT NULL,
    PRIMARY KEY (id_cliente, contacto),
    CONSTRAINT fk_contacto_cliente_id_cliente FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente) ON DELETE CASCADE,
    CONSTRAINT ck_contacto_cliente_1 CHECK (medio IN ('correo', 'sms'))
);

CREATE TABLE planta (
    id_planta INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    municipio VARCHAR(60) NOT NULL,
    departamento VARCHAR(40) NOT NULL,
    tipo_proceso VARCHAR(40) NOT NULL,
    CONSTRAINT fk_planta_id_cliente FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente)
);

CREATE TABLE contrato (
    id_contrato INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    pct_ahorro_comprometido NUMERIC(5,2) NOT NULL,
    pct_participacion NUMERIC(5,2) NOT NULL DEFAULT 40,
    ahorro_minimo_anual NUMERIC(14,2) NOT NULL,
    estado VARCHAR(12) NOT NULL,
    CONSTRAINT fk_contrato_id_cliente FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente),
    CONSTRAINT ck_contrato_1 CHECK (fecha_fin BETWEEN fecha_inicio + INTERVAL '3 years' AND fecha_inicio + INTERVAL '5 years'),
    CONSTRAINT ck_contrato_2 CHECK (pct_ahorro_comprometido > 0 AND pct_ahorro_comprometido <= 100),
    CONSTRAINT ck_contrato_3 CHECK (pct_participacion > 0 AND pct_participacion < 100),
    CONSTRAINT ck_contrato_4 CHECK (ahorro_minimo_anual >= 0),
    CONSTRAINT ck_contrato_5 CHECK (estado IN ('vigente', 'terminado', 'renovado'))
);

-- relación N:M CONTRATO cubre PLANTA
CREATE TABLE alcance_contrato (
    id_contrato INTEGER NOT NULL,
    id_planta INTEGER NOT NULL,
    fecha_inclusion DATE NOT NULL,
    PRIMARY KEY (id_contrato, id_planta),
    CONSTRAINT fk_alcance_contrato_id_contrato FOREIGN KEY (id_contrato) REFERENCES contrato (id_contrato),
    CONSTRAINT fk_alcance_contrato_id_planta FOREIGN KEY (id_planta) REFERENCES planta (id_planta)
);

CREATE TABLE recurso (
    id_recurso SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    unidad VARCHAR(10) NOT NULL,
    factor_emision NUMERIC(8,4),
    fuente_factor VARCHAR(150),
    CONSTRAINT ck_recurso_1 CHECK (factor_emision >= 0)
);

CREATE TABLE punto_medicion (
    id_punto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_planta INTEGER NOT NULL,
    id_recurso SMALLINT NOT NULL,
    proceso_medido VARCHAR(80) NOT NULL,
    frecuencia_lectura SMALLINT NOT NULL,
    CONSTRAINT fk_punto_medicion_id_planta FOREIGN KEY (id_planta) REFERENCES planta (id_planta),
    CONSTRAINT fk_punto_medicion_id_recurso FOREIGN KEY (id_recurso) REFERENCES recurso (id_recurso),
    CONSTRAINT ck_punto_medicion_1 CHECK (frecuencia_lectura IN (15, 60))
);

CREATE TABLE equipo (
    serial VARCHAR(30) PRIMARY KEY,
    id_planta INTEGER,
    id_punto INTEGER,
    tipo VARCHAR(12) NOT NULL,
    fecha_instalacion DATE,
    estado VARCHAR(16) NOT NULL,
    CONSTRAINT fk_equipo_id_punto FOREIGN KEY (id_punto) REFERENCES punto_medicion (id_punto),
    CONSTRAINT fk_equipo_id_planta FOREIGN KEY (id_planta) REFERENCES planta (id_planta),
    CONSTRAINT ck_equipo_1 CHECK (tipo IN ('medidor', 'caudalimetro', 'sensor', 'pasarela')),
    CONSTRAINT ck_equipo_2 CHECK (estado IN ('en bodega', 'instalado', 'retirado', 'reacondicionado', 'raee')),
    CONSTRAINT ck_equipo_3 CHECK (estado <> 'instalado' OR id_planta IS NOT NULL)
);

-- entidad débil de PUNTO_MEDICION (clave parcial: marca_tiempo)
CREATE TABLE lectura (
    id_punto INTEGER NOT NULL,
    marca_tiempo TIMESTAMPTZ NOT NULL,
    valor NUMERIC(14,4) NOT NULL,
    indicador_calidad VARCHAR(10) NOT NULL,
    PRIMARY KEY (id_punto, marca_tiempo),
    CONSTRAINT fk_lectura_id_punto FOREIGN KEY (id_punto) REFERENCES punto_medicion (id_punto),
    CONSTRAINT ck_lectura_1 CHECK (indicador_calidad IN ('valida', 'atipica', 'corregida'))
);

CREATE TABLE alerta (
    id_alerta INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_punto INTEGER NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    fecha_hora TIMESTAMPTZ NOT NULL,
    estado VARCHAR(10) NOT NULL,
    CONSTRAINT fk_alerta_id_punto FOREIGN KEY (id_punto) REFERENCES punto_medicion (id_punto),
    CONSTRAINT ck_alerta_1 CHECK (tipo IN ('sin_datos_24h', 'desviacion_10pct')),
    CONSTRAINT ck_alerta_2 CHECK (estado IN ('abierta', 'atendida', 'cerrada'))
);

CREATE TABLE variable_operacion (
    id_variable INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_planta INTEGER NOT NULL,
    fecha DATE NOT NULL,
    produccion NUMERIC(14,2),
    cdd NUMERIC(6,2),
    horas_operacion NUMERIC(5,1),
    CONSTRAINT uq_variable_operacion_id_planta_fecha UNIQUE (id_planta, fecha),
    CONSTRAINT fk_variable_operacion_id_planta FOREIGN KEY (id_planta) REFERENCES planta (id_planta),
    CONSTRAINT ck_variable_operacion_1 CHECK (produccion >= 0),
    CONSTRAINT ck_variable_operacion_2 CHECK (cdd >= 0),
    CONSTRAINT ck_variable_operacion_3 CHECK (horas_operacion BETWEEN 0 AND 744)
);

CREATE TABLE linea_base (
    id_linea_base INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_planta INTEGER NOT NULL,
    id_recurso SMALLINT NOT NULL,
    version SMALLINT NOT NULL,
    periodo_referencia DATERANGE NOT NULL,
    cv_rmse NUMERIC(5,2) NOT NULL,
    nmbe NUMERIC(5,2) NOT NULL,
    vigente_desde DATE NOT NULL,
    CONSTRAINT uq_linea_base_id_planta_id_recurso_version UNIQUE (id_planta, id_recurso, version),
    CONSTRAINT fk_linea_base_id_recurso FOREIGN KEY (id_recurso) REFERENCES recurso (id_recurso),
    CONSTRAINT fk_linea_base_id_planta FOREIGN KEY (id_planta) REFERENCES planta (id_planta),
    CONSTRAINT ck_linea_base_1 CHECK (version >= 1),
    CONSTRAINT ck_linea_base_2 CHECK (cv_rmse BETWEEN 0 AND 15),
    CONSTRAINT ck_linea_base_3 CHECK (nmbe BETWEEN -5 AND 5)
);

-- atributo multivaluado LINEA_BASE.coeficiente
CREATE TABLE coeficiente_linea_base (
    id_linea_base INTEGER NOT NULL,
    variable VARCHAR(30) NOT NULL,
    valor NUMERIC(16,6) NOT NULL,
    PRIMARY KEY (id_linea_base, variable),
    CONSTRAINT fk_coeficiente_linea_base_id_linea_base FOREIGN KEY (id_linea_base) REFERENCES linea_base (id_linea_base) ON DELETE CASCADE
);

CREATE TABLE medida_ahorro (
    id_medida INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_contrato INTEGER NOT NULL,
    id_planta INTEGER NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    tipo VARCHAR(10) NOT NULL,
    ahorro_estimado NUMERIC(14,2),
    fecha_implementacion DATE,
    CONSTRAINT fk_medida_ahorro_id_contrato FOREIGN KEY (id_contrato) REFERENCES contrato (id_contrato),
    CONSTRAINT fk_medida_ahorro_id_planta FOREIGN KEY (id_planta) REFERENCES planta (id_planta),
    CONSTRAINT ck_medida_ahorro_1 CHECK (tipo IN ('operativa', 'inversion')),
    CONSTRAINT ck_medida_ahorro_2 CHECK (ahorro_estimado >= 0)
);

CREATE TABLE factura (
    id_factura INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_contrato INTEGER NOT NULL,
    numero_dian VARCHAR(30) NOT NULL UNIQUE,
    periodo DATE NOT NULL,
    ahorro_en_pesos NUMERIC(16,2) NOT NULL,
    valor_facturado NUMERIC(16,2) NOT NULL,
    estado VARCHAR(10) NOT NULL,
    CONSTRAINT uq_factura_id_contrato_periodo UNIQUE (id_contrato, periodo),
    CONSTRAINT fk_factura_id_contrato FOREIGN KEY (id_contrato) REFERENCES contrato (id_contrato),
    CONSTRAINT ck_factura_1 CHECK (ahorro_en_pesos > 0),
    CONSTRAINT ck_factura_2 CHECK (estado IN ('emitida', 'pagada', 'anulada'))
);

CREATE TABLE verificacion (
    id_verificacion INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_contrato INTEGER NOT NULL,
    anio_contractual SMALLINT NOT NULL,
    verificador VARCHAR(120) NOT NULL,
    resultado VARCHAR(12) NOT NULL,
    ruta_reporte VARCHAR(255),
    CONSTRAINT uq_verificacion_id_contrato_anio_contractual UNIQUE (id_contrato, anio_contractual),
    CONSTRAINT fk_verificacion_id_contrato FOREIGN KEY (id_contrato) REFERENCES contrato (id_contrato),
    CONSTRAINT ck_verificacion_1 CHECK (anio_contractual BETWEEN 1 AND 5),
    CONSTRAINT ck_verificacion_2 CHECK (resultado IN ('conforme', 'con ajustes', 'no conforme'))
);

CREATE TABLE calculo_ahorro (
    id_calculo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_contrato INTEGER NOT NULL,
    id_linea_base INTEGER NOT NULL,
    id_factura INTEGER,
    id_verificacion INTEGER,
    periodo DATE NOT NULL,
    completitud_pct NUMERIC(5,2) NOT NULL,
    consumo_ajustado NUMERIC(14,2) NOT NULL,
    consumo_real NUMERIC(14,2) NOT NULL,
    ahorro NUMERIC(14,2) NOT NULL,
    pct_reduccion NUMERIC(6,2) GENERATED ALWAYS AS (ROUND(ahorro * 100.0 / NULLIF(consumo_ajustado, 0), 2)) STORED,
    tco2e_evitadas NUMERIC(12,3),
    CONSTRAINT uq_calculo_ahorro_id_contrato_id_linea_base_peri UNIQUE (id_contrato, id_linea_base, periodo),
    CONSTRAINT fk_calculo_ahorro_id_contrato FOREIGN KEY (id_contrato) REFERENCES contrato (id_contrato),
    CONSTRAINT fk_calculo_ahorro_id_factura FOREIGN KEY (id_factura) REFERENCES factura (id_factura),
    CONSTRAINT fk_calculo_ahorro_id_verificacion FOREIGN KEY (id_verificacion) REFERENCES verificacion (id_verificacion),
    CONSTRAINT fk_calculo_ahorro_id_linea_base FOREIGN KEY (id_linea_base) REFERENCES linea_base (id_linea_base),
    CONSTRAINT ck_calculo_ahorro_1 CHECK (completitud_pct BETWEEN 95 AND 100),
    CONSTRAINT ck_calculo_ahorro_2 CHECK (consumo_ajustado > 0),
    CONSTRAINT ck_calculo_ahorro_3 CHECK (consumo_real >= 0),
    CONSTRAINT ck_calculo_ahorro_4 CHECK (id_factura IS NULL OR ahorro > 0)
);

-- entidad débil de CALCULO_AHORRO (clave parcial: consecutivo)
CREATE TABLE ajuste_no_rutinario (
    id_calculo INTEGER NOT NULL,
    consecutivo SMALLINT NOT NULL,
    causa VARCHAR(200) NOT NULL,
    valor NUMERIC(14,2) NOT NULL,
    aprobado_cliente BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id_calculo, consecutivo),
    CONSTRAINT fk_ajuste_no_rutinario_id_calculo FOREIGN KEY (id_calculo) REFERENCES calculo_ahorro (id_calculo),
    CONSTRAINT ck_ajuste_no_rutinario_1 CHECK (consecutivo >= 1)
);
