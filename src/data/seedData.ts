import { LupItem, CharlaSession, PalletJackReport, RfScannerReport } from '../types';

export const ARIEL_ONEDRIVE_URL = "https://grupocial-my.sharepoint.com/:f:/g/personal/ariel_mella_cial_cl/IgCSjFleL8vhT7MwWFFgCrB_AV9ndyNbmdY9bhkh0liGtNE";

export const INITIAL_LUPS: LupItem[] = [
  {
    id: 'lup-1',
    code: 'LUP-SSO-001',
    title: 'Operación Segura de Transpaleta Manual en Andenes y Pendientes',
    category: 'Seguridad SSO',
    summary: 'Aprender la postura ergonómica correcta al tirar la transpaleta y evitar atrapamientos en pendientes o desniveles de andén.',
    objective: 'Prevenir lesiones lumbares, atropellos en pies y caídas de carga durante el traslado entre nave y camión.',
    durationMinutes: 5,
    area: 'Andenes de Despacho & Recepción',
    author: 'Ariel Mella / Prevención de Riesgos CIAL',
    createdAt: '2026-10-15T08:00:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Tirar con cuerpo de costado y mirar hacia el avance',
      description: 'Sujetar el timón con ambas manos o una mano firme al costado, manteniendo siempre la vista despejada en el sentido del avance.',
      points: [
        'En pendientes o bajadas: colocarse SIEMPRE detrás de la transpaleta (la carga desciende primero).',
        'Zapatos de seguridad bien abrochados y pies alejados de las ruedas directrices.',
        'Detener la marcha soltando lentamente la palanca a posición neutral.'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60',
      photoSizeKb: 48
    },
    dontPractice: {
      title: 'Caminar de espaldas tirando de frente hacia el cuerpo',
      description: 'Tirar de la transpaleta caminando de espaldas sin visibilidad o colocarse delante de la carga al bajar una rampa.',
      points: [
        '❌ NUNCA bajar una rampa colocándose delante de la transpaleta (riesgo de aplastamiento).',
        '❌ NUNCA transportar pasajeros ni subirse sobre las horquillas como patineta.',
        '❌ NUNCA sobrepasar la capacidad de carga nominal (máx 2.000 kg).'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=60',
      photoSizeKb: 52
    },
    keyPoints: [
      'Visualizar siempre la ruta antes de iniciar el movimiento.',
      'En rampas, la transpaleta siempre va cuesta abajo respecto al operador.',
      'Si el piso tiene humedad o escarcha de frío, reducir la velocidad a la mitad.'
    ],
    safetyWarning: '¡Riesgo crítico de atrapamiento podálico en desnivel de plancha niveladora de andén!'
  },
  {
    id: 'lup-2',
    code: 'LUP-FRIO-002',
    title: 'Cuidado y Cierre Hermético de Cortinas Rápidas y Esclusas de Frío',
    category: 'Cadena de Frío',
    summary: 'Procedimiento estándar para cruzar las puertas frigoríficas sin romper los sensores ni permitir pérdida térmica en Cámara P2.',
    objective: 'Garantizar que la temperatura del CD se mantenga en rango (-18°C a 0°C) y evitar condensación que genere piso resbaloso.',
    durationMinutes: 5,
    area: 'Cámaras Frigoríficas Planta 2',
    author: 'Ariel Mella / Calidad & Frío CIAL',
    createdAt: '2026-10-16T09:30:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Pulsar tirador o esperar apertura total del sensor',
      description: 'Avanzar únicamente cuando la cortina rápida o puerta corredera haya completado el 100% de su apertura vertical.',
      points: [
        'Esperar la luz verde del semáforo de esclusa antes de ingresar con pallet.',
        'Avisar de inmediato a mantención si la lona se sale de su guía lateral.',
        'Cerrar manualmente la puerta peatonal tras pasar.'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60',
      photoSizeKb: 45
    },
    dontPractice: {
      title: 'Forzar paso con horquillas elevadas o golpear los bordes',
      description: 'Apurar el paso cuando la lona aún está subiendo, golpeando el sensor fotoeléctrico inferior con las horquillas.',
      points: [
        '❌ NUNCA trabar las cortinas con cajas o pallets para dejarlas abiertas.',
        '❌ NUNCA ingresar con la transpaleta a media altura rozando la lona térmica.',
        '❌ NUNCA dejar ambas puertas de la esclusa abiertas al mismo tiempo.'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=60',
      photoSizeKb: 50
    },
    keyPoints: [
      '1 minuto con la puerta abierta equivale a 20 minutos de escarcha en el evaporador.',
      'Si hay hielo en el umbral, limpiarlo con espátula de goma para evitar resbalones.',
      'Reportar cualquier falla de sensor en el módulo de Zona Verde.'
    ],
    safetyWarning: 'La condensación de frío genera placas de hielo invisible (hielo negro) altamente resbaladizo.'
  },
  {
    id: 'lup-3',
    code: 'LUP-MAQ-003',
    title: 'Cuidado y Preservación de Pistolas RF Zebra / Honeywell',
    category: 'Operación de Equipos',
    summary: 'Buenas prácticas para evitar roturas de pantalla táctil, desgaste prematuro de gatillos y caídas de señal SAP.',
    objective: 'Aumentar la disponibilidad de terminales de radiofrecuencia y evitar paradas en el picking y despacho.',
    durationMinutes: 5,
    area: 'Todas las áreas operacionales',
    author: 'Ariel Mella / Operaciones CIAL',
    createdAt: '2026-10-17T11:00:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Uso obligatorio de funda protectora con correa de muñeca',
      description: 'Asegurar la correa a la muñeca o al arnés del chaleco antes de iniciar el turno de picking o auditoría.',
      points: [
        'Presionar el gatillo con fuerza moderada; no se requiere fuerza excesiva para activar el láser.',
        'Depositar la pistola en el pedestal de carga al finalizar el turno o colación.',
        'Limpiar el cristal del lector con paño de microfibra seco si se empaña por el cambio térmico.'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1580982327559-c1202864eb05?w=600&auto=format&fit=crop&q=60',
      photoSizeKb: 42
    },
    dontPractice: {
      title: 'Dejar la pistola suelta sobre pallets o transportarla en bolsillos',
      description: 'Apoyar la pistola sobre cajas en altura o dejarla suelta en la transpaleta donde pueda caer al suelo.',
      points: [
        '❌ NUNCA golpear la pantalla con bolígrafos, clavos o llaves (usar dedos limpios o stylus de goma).',
        '❌ NUNCA tirar del gatillo mientras el equipo se encuentra trabado.',
        '❌ NUNCA guardar la pistola en lockers personales al término del turno.'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=60',
      photoSizeKb: 46
    },
    keyPoints: [
      'El cristal del lector rayado reduce la velocidad de lectura en un 60%.',
      'Si la batería está hinchada o dura menos de 2 horas, reportarla inmediatamente.',
      'Toda pistola con falla debe ser registrada en la app Zona Verde para activar al proveedor.'
    ],
    safetyWarning: 'Una pistola en mal estado paraliza el despacho de camiones y retrasa la salida a ruta.'
  },
  {
    id: 'lup-4',
    code: 'LUP-BPM-004',
    title: 'Estándar 5S en Andenes de Despacho: Pallets Plásticos vs Madera',
    category: 'Mantención Autónoma 5S',
    summary: 'Segregación correcta de pallets, retiro de film plástico y despeje de zonas de seguridad en andén.',
    objective: 'Mantener andenes despejados, libres de astillas o clavos, y optimizar el flujo de carga a camiones.',
    durationMinutes: 5,
    area: 'Andenes 1 al 12',
    author: 'Ariel Mella / Excelencia Operacional CIAL',
    createdAt: '2026-10-18T14:00:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Apilamiento uniforme y retiro inmediato de restos de film',
      description: 'Apilar pallets en torres de máximo 15 unidades, perfectamente alineadas en la zona demarcada con líneas amarillas.',
      points: [
        'Separar estrictamente pallets plásticos (cámara limpia) de pallets de madera CHEP/nacional.',
        'Depositar restos de plástico film en los contenedores de reciclaje asignados.',
        'Dejar pasillo peatonal de 1.20 metros totalmente libre de obstáculos.'
      ]
    },
    dontPractice: {
      title: 'Torres torcidas o pallets abandonados frente a salidas de emergencia',
      description: 'Dejar pallets inclinados con clavos salidos o atravesados en las rampas de escape.',
      points: [
        '❌ NUNCA superar las 15 unidades de altura por torre de pallet.',
        '❌ NUNCA dejar trozos de madera o clavos en el piso del andén (riesgo de pinchar ruedas de transpaleta).',
        '❌ NUNCA bloquear extintores ni tableros eléctricos con mercadería.'
      ]
    },
    keyPoints: [
      'El orden del andén define la velocidad de carga del camión.',
      'Un piso limpio previene el 90% de los daños en las ruedas de transpaletas.',
      'La seguridad comienza con el estándar 5S en cada andén.'
    ],
    safetyWarning: 'Pallets mal apilados pueden derrumbarse causando accidentes graves a los operadores.'
  },
  {
    id: 'lup-5',
    code: 'LUP-SSO-005',
    title: 'Ergonomía en el Levante Manual de Cajas de Productos CIAL',
    category: 'Seguridad SSO',
    summary: 'Técnica de levantamiento con piernas flectadas y carga pegada al cuerpo para cajas de 15 a 25 kg.',
    objective: 'Cero lumbagos o sobreesfuerzos en el personal de bodega y despacho.',
    durationMinutes: 5,
    area: 'Picking & Despacho',
    author: 'Ariel Mella / Prevención SSO CIAL',
    createdAt: '2026-10-19T07:30:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Flectar rodillas, espalda recta y carga al centro del pecho',
      description: 'Aproximarse a la caja, abrir las piernas al ancho de hombros y empujar la fuerza con las piernas.',
      points: [
        'Pegar la caja al pecho antes de iniciar el movimiento de subida.',
        'Girar con los pies y el cuerpo completo, NUNCA rotar solo la cintura.',
        'Pedir ayuda entre dos operadores si el bulto supera los 25 kg.'
      ]
    },
    dontPractice: {
      title: 'Doblar la cintura con las piernas estiradas',
      description: 'Levantar la caja desde el suelo manteniendo las piernas rígidas y arqueando la columna.',
      points: [
        '❌ NUNCA levantar peso con la espalda curvada hacia adelante.',
        '❌ NUNCA realizar movimientos bruscos o tirones al tomar la carga.',
        '❌ NUNCA levantar cargas pesadas con piso húmedo o sin guantes de agarre.'
      ]
    },
    keyPoints: [
      'Tus piernas son 4 veces más fuertes que tu espalda; úsalas.',
      'Planifica dónde vas a apoyar la caja antes de levantarla.',
      'Realiza pausas activas y elongaciones al inicio del turno.'
    ],
    safetyWarning: 'El sobreesfuerzo lumbar es la principal causa de ausentismo en centros de distribución.'
  }
];

export const INITIAL_CHARLAS: CharlaSession[] = [
  {
    id: 'charla-1',
    lupId: 'lup-1',
    lupCode: 'LUP-SSO-001',
    lupTitle: 'Operación Segura de Transpaleta Manual en Andenes y Pendientes',
    facilitator: 'Juan Pérez (Líder Operador)',
    supervisor: 'Carlos Venegas',
    shift: 'Turno 1 (Mañana 07:00 - 15:00)',
    shiftId: 'manana',
    area: 'Andenes de Despacho 1 al 6',
    date: '2026-10-22',
    time: '07:15',
    durationSeconds: 310,
    attendeesCount: 9,
    attendeesNotes: 'Equipo de Despacho Zonal Andenes 1 al 6.',
    keyAgreements: 'Se acuerda retirar de circulación las transpaletas que pierdan aceite antes de iniciar la carga de las 08:30.',
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=60',
    photoSizeKb: 48,
    createdAt: '2026-10-22T07:22:00Z'
  },
  {
    id: 'charla-2',
    lupId: 'lup-3',
    lupCode: 'LUP-MAQ-003',
    lupTitle: 'Cuidado y Preservación de Pistolas RF Zebra / Honeywell',
    facilitator: 'Rodrigo Morales',
    supervisor: 'Rodrigo Morales',
    shift: 'Turno 2 (Tarde 15:00 - 23:00)',
    shiftId: 'tarde',
    area: 'Cámara Frigorífica P2',
    date: '2026-10-21',
    time: '15:10',
    durationSeconds: 295,
    attendeesCount: 7,
    attendeesNotes: 'Operadores de picking cámara baja temperatura.',
    keyAgreements: 'Uso estricto de paño seco para limpiar escáner al salir de cámara. Dejar en base de carga al cambio de turno.',
    photoUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=60',
    photoSizeKb: 52,
    createdAt: '2026-10-21T15:18:00Z'
  },
  {
    id: 'charla-3',
    lupId: 'lup-2',
    lupCode: 'LUP-FRIO-002',
    lupTitle: 'Cuidado y Cierre Hermético de Cortinas Rápidas y Esclusas de Frío',
    facilitator: 'Esteban Valdés',
    supervisor: 'Cristian Castro',
    shift: 'Turno 3 (Noche 23:00 - 07:00)',
    shiftId: 'noche',
    area: 'Esclusa Central Frío',
    date: '2026-10-21',
    time: '23:15',
    durationSeconds: 300,
    attendeesCount: 8,
    attendeesNotes: 'Personal de reposición nocturna y congelados.',
    keyAgreements: 'No bloquear los sensores fotoeléctricos con bultos y verificar luz verde de paso.',
    photoUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60',
    photoSizeKb: 44,
    createdAt: '2026-10-21T23:22:00Z'
  },
  {
    id: 'charla-4',
    lupId: 'lup-4',
    lupCode: 'LUP-BPM-004',
    lupTitle: 'Estándar 5S en Andenes de Despacho: Pallets Plásticos vs Madera',
    facilitator: 'Mario Sepúlveda',
    supervisor: 'Carlos Venegas',
    shift: 'Turno 1 (Mañana 07:00 - 15:00)',
    shiftId: 'manana',
    area: 'Recepción e Inbound',
    date: '2026-10-21',
    time: '07:20',
    durationSeconds: 300,
    attendeesCount: 11,
    attendeesNotes: 'Personal de recepción de camiones y patio.',
    keyAgreements: 'Despejar pasillo 3 y limitar torres a 15 pallets como máximo.',
    photoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=60',
    photoSizeKb: 55,
    createdAt: '2026-10-21T07:28:00Z'
  }
];

export const INITIAL_PALLETS: PalletJackReport[] = [
  {
    id: 'pal-1',
    code: 'TM-04',
    brand: 'Jungheinrich AM 22',
    reportedAt: '2026-10-21T09:15:00Z',
    reportedBy: 'Juan Pérez (Operador Despacho)',
    shift: 'Turno 1 (Mañana 07:00 - 15:00)',
    area: 'Andén 3 - Despacho Sur',
    problemType: 'fuga_hidraulica',
    problemTitle: 'Fuga de aceite en pistón hidráulico',
    problemDescription: 'Gotea aceite hidráulico por la base del pistón al levantar más de 800 kg. Deja manchas en el piso de andén.',
    severity: 'critica',
    status: 'en_taller',
    providerName: 'Servicio Hidráulico Valparaíso SpA',
    sentToProviderAt: '2026-10-21T14:30:00Z',
    estimatedReturnAt: '2026-10-23T12:00:00Z',
    repairCost: 45000,
    technicianNotes: 'Cambio de empaquetaduras y retén principal del cilindro.'
  },
  {
    id: 'pal-2',
    code: 'TM-11',
    brand: 'BT Lifter L2300',
    reportedAt: '2026-10-20T16:45:00Z',
    reportedBy: 'Cristian Castro (Bodega Frío)',
    shift: 'Turno 2 (Tarde 15:00 - 23:00)',
    area: 'Cámara 2 Frío Planta 2',
    problemType: 'rueda_trabada',
    problemTitle: 'Rodamiento de rueda delantera trabado',
    problemDescription: 'Rueda tandem delantera derecha bloqueada con film plástico enredado y rodamiento roto.',
    severity: 'moderada',
    status: 'reparada',
    providerName: 'Servicio Hidráulico Valparaíso SpA',
    sentToProviderAt: '2026-10-21T08:00:00Z',
    returnedAt: '2026-10-22T08:00:00Z',
    repairCost: 28000,
    technicianNotes: 'Ruedas de poliuretano reemplazadas y lubricación de eje completa.'
  },
  {
    id: 'pal-3',
    code: 'TM-07',
    brand: 'Noblelift AC25',
    reportedAt: '2026-10-22T06:30:00Z',
    reportedBy: 'Héctor Tapia (Recepción)',
    shift: 'Turno 1 (Mañana 07:00 - 15:00)',
    area: 'Andén 8 - Inbound',
    problemType: 'no_eleva',
    problemTitle: 'No mantiene la elevación con peso',
    problemDescription: 'Al bombear sube pero al colocar pallet con cajas se desinfla lentamente en menos de 10 segundos.',
    severity: 'critica',
    status: 'pendiente',
    providerName: 'Servicio Hidráulico Valparaíso SpA',
    technicianNotes: 'Pendiente de retiro por móvil de proveedor hoy a las 11:00 hrs.'
  },
  {
    id: 'pal-4',
    code: 'TM-19',
    brand: 'Crown PTH 50',
    reportedAt: '2026-10-18T10:00:00Z',
    reportedBy: 'Gonzalo Silva',
    shift: 'Turno 1 (Mañana 07:00 - 15:00)',
    area: 'Almacenamiento Racks',
    problemType: 'timon_danado',
    problemTitle: 'Cadena de válvula en timón cortada',
    problemDescription: 'El timón no acciona la válvula de descarga porque la cadenilla interior se cortó por fatiga.',
    severity: 'moderada',
    status: 'reparada',
    providerName: 'Servicio Hidráulico Valparaíso SpA',
    sentToProviderAt: '2026-10-18T14:00:00Z',
    returnedAt: '2026-10-19T17:30:00Z',
    repairCost: 22000,
    technicianNotes: 'Cadena y resorte de timón reemplazados con repuesto original.'
  }
];

export const INITIAL_RFS: RfScannerReport[] = [
  {
    id: 'rf-1',
    code: 'RF-04',
    model: 'Zebra TC26 Android',
    serialNumber: 'ZBR-220914-04',
    reportedAt: '2026-10-21T18:00:00Z',
    reportedBy: 'Manuel Fuentes (Picking)',
    shift: 'Turno 2 (Tarde 15:00 - 23:00)',
    area: 'Cámara Frío P2',
    problemType: 'gatillo_trabado',
    problemTitle: 'Gatillo pistola trabado / no dispara láser',
    problemDescription: 'El gatillo plástico del pistol grip se quedó hundido y no rebota. No permite escanear códigos de barras.',
    severity: 'critica',
    status: 'en_taller',
    providerName: 'Soporte Hardware TI CIAL / Partner Zebra',
    sentToProviderAt: '2026-10-22T08:00:00Z',
    estimatedReturnAt: '2026-10-23T15:00:00Z',
    technicianNotes: 'Reemplazo de switch interno de gatillo pistol grip.'
  },
  {
    id: 'rf-2',
    code: 'RF-12',
    model: 'Zebra MC3300 Gun',
    serialNumber: 'ZBR-MC-8812',
    reportedAt: '2026-10-20T10:15:00Z',
    reportedBy: 'Claudio Miranda (Despacho)',
    shift: 'Turno 1 (Mañana 07:00 - 15:00)',
    area: 'Andén 5',
    problemType: 'bateria_danada',
    problemTitle: 'Batería no retiene carga (se apaga a los 30 min)',
    problemDescription: 'Indica 100% de carga en la base pero al ingresar a la cámara de frío se apaga en menos de 20 minutos.',
    severity: 'moderada',
    status: 'reparada',
    providerName: 'Soporte Hardware TI CIAL / Partner Zebra',
    sentToProviderAt: '2026-10-20T14:00:00Z',
    returnedAt: '2026-10-21T16:00:00Z',
    technicianNotes: 'Batería extendida de frío reemplazada por unidad nueva certificada.'
  },
  {
    id: 'rf-3',
    code: 'RF-19',
    model: 'Zebra TC26 Android',
    serialNumber: 'ZBR-220914-19',
    reportedAt: '2026-10-22T07:45:00Z',
    reportedBy: 'Sebastián Lagos (Recepción)',
    shift: 'Turno 1 (Mañana 07:00 - 15:00)',
    area: 'Patio Inbound',
    problemType: 'laser_sucio',
    problemTitle: 'Cristal de lector astillado por caída',
    problemDescription: 'Sufrió caída desde nivel de andén. El cristal protector del escáner tiene una fisura y no lee códigos pequeños.',
    severity: 'critica',
    status: 'pendiente',
    providerName: 'Soporte Hardware TI CIAL / Partner Zebra',
    technicianNotes: 'Equipo apartado en oficina de turno para entrega a soporte técnico.'
  }
];
