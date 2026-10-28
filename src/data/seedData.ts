import { LupItem, CharlaSession, PalletJackReport, RfScannerReport, OperatorItem, AttendanceRecord } from '../types';
import { REAL_OPERATORS, getHistoricalAttendanceForDate } from './attendanceHistory';

export const ARIEL_ONEDRIVE_URL = "https://grupocial-my.sharepoint.com/:f:/g/personal/ariel_mella_cial_cl/IgCSjFleL8vhT7MwWFFgCrB_AV9ndyNbmdY9bhkh0liGtNE";

export const INITIAL_LUPS: LupItem[] = [
  {
    id: 'lup-sso-robot-film',
    code: 'LUP-SSO-004',
    title: 'Manipulación Segura y Operación de Robot de Enfilmar (Robot Film Nº02)',
    category: 'Seguridad SSO',
    summary: 'Procedimiento seguro para la operación, desatasco de film y corte manual del Robot de Enfilmar Nº02, prohibiendo intervenciones eléctricas sin autorización y cortes con el pie.',
    objective: 'Prevenir cortes por roces con cintas de amarre eléctrico, golpes por parachoques en movimiento y atrapamientos mecánicos durante el ajuste o atasco de film en el Robot Nº02.',
    durationMinutes: 5,
    area: 'Inbound & Almacenamiento / Despacho',
    author: 'Prevención de Riesgos CIAL / Administrativo de Operaciones',
    createdBy: 'prevencion@cial.cl',
    createdAt: '2026-10-27T08:15:00Z',
    isSafety: true,
    criticalRisk: 'Corte por amarre plástico, atrapamiento en rodillos y golpe por desplazamiento',
    mandatoryEpp: [
      'Guantes de Seguridad Anticorte',
      'Zapatos de Seguridad con Puntera',
      'Chaleco Reflectante Alta Visibilidad'
    ],
    safetyWarning: '¡PROHIBIDO intervenir componentes internos ni cableados eléctricos sin autorización! Si el sensor se descalibra, avisar de inmediato a Mantención o Jefatura.',
    doPractice: {
      title: 'Operación estándar: conducir de frente, botón verde y corte manual tenso',
      description: 'Posicionar el equipo a la izquierda del pallet, amarrar film a la carga, pulsar botón verde (2 pitidos) y cortar con ambas manos.',
      points: [
        'Conducir siempre desde el frente del equipo y planificar giros (equipo tiene limitación hacia la izquierda).',
        'En caso de atasco: abrir puerta trasera, pasar film entre cilindros con guantes y asegurar con manilla.',
        'Para detener en emergencia: accionar el botón rojo tipo hongo de parada inmediata.'
      ],
      photoUrl: '/lups/robot_film/foto4_operacion_correcta.jpg',
      photoSizeKb: 116
    },
    dontPractice: {
      title: 'Prohibido: ajustar cables sin autorización, patear el film o frenar con empuñadura',
      description: 'Nunca intervenir el cableado interno con cintas de amarre eléctrico ni detener el robot en giro con las manos o pies.',
      points: [
        '❌ NUNCA intervenir pieza amarilla interna ni cableados (riesgo de corte con amarres plásticos).',
        '❌ NUNCA cortar el film con patadas ni tirones con el pie.',
        '❌ PROHIBIDO detener el equipo con botones de empuñadura en pleno giro (riesgo de golpe fuerte con parachoques).'
      ],
      photoUrl: '/lups/robot_film/foto1_ajuste_no_intervenir.jpg',
      photoSizeKb: 123
    },
    keyPoints: [
      'Mantener área despejada antes de iniciar el giro horario.',
      'En caso de atasco de film: abrir compuerta trasera y enhebrar entre cilindros con guantes.',
      'Corte de film estrictamente manual con ambas manos aprovechando la tensión.',
      'Frente a cualquier descalibración de sensor o falla, avisar inmediatamente al supervisor.'
    ],
    photos: [
      {
        url: '/lups/robot_film/foto1_ajuste_no_intervenir.jpg',
        title: '1. Falla / Ajuste Interno: Prohibido Intervenir',
        caption: 'Corte menor ocurrido por roce con cinta de amarre eléctrico al manipular sensor. Prohibido intervenir componentes internos sin autorización.',
        type: 'dont'
      },
      {
        url: '/lups/robot_film/foto2_atasco_compuerta.jpg',
        title: '2. Desatasco Seguro de Film y Parada de Emergencia',
        caption: 'Abrir compuerta trasera, pasar film entre cilindros usando guantes anticorte y asegurar con manilla. Para detener, usar botón rojo.',
        type: 'do'
      },
      {
        url: '/lups/robot_film/foto3_prohibido_patadas.jpg',
        title: '3. Prohibido Cortar con Patadas y Frenar con Empuñadura',
        caption: 'Nunca cortar el film con los pies ni detener el equipo con botones de empuñadura mientras enfila (riesgo de impacto fuerte con parachoques).',
        type: 'dont'
      },
      {
        url: '/lups/robot_film/foto4_operacion_correcta.jpg',
        title: '4. Posicionamiento Correcto y Ciclo de Enfilmado',
        caption: 'Posicionar equipo a la izquierda del pallet, amarrar film a la carga, pulsar botón verde (2 pitidos) y cortar con las manos cuando esté tenso.',
        type: 'do'
      }
    ]
  },
  {
    id: 'lup-cial-01',
    code: 'LUP-DES-01',
    title: 'Estándar de Filmado y Consolidación de Pallets',
    category: 'Calidad & BPM',
    summary: 'Estandarizar el enfilmado superior de cajas y prohibir el uso de pallets rotos o con tacos astillados para evitar aplastamientos y caídas.',
    objective: 'Mejorar la estabilidad de la carga, evitar daños por aplastamiento y mantener un mismo estándar entre turnos: las cajas superiores del consolidado deben ir recubiertas con film stretch sin quedar sueltas, y está estrictamente prohibido usar pallets en mal estado o con partes faltantes.',
    durationMinutes: 5,
    area: 'Despacho / Outbound',
    author: 'Analista de Mejora Continua / Jefe Eficiencia Operacional',
    createdAt: '2026-10-20T08:00:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Cajas bien enfilmadas en consolidación y pallet íntegro',
      description: 'Recubrir las cajas superiores con film stretch tenso y estibar únicamente sobre pallets en perfecto estado estructural.',
      points: [
        'Recubrir las capas superiores con film stretch asegurando que ninguna caja quede suelta ni con holgura.',
        'Inspección visual obligatoria durante la consolidación realizada por los operadores.',
        'Verificación final del supervisor antes de autorizar la carga a la rampla.'
      ],
      photoUrl: '/lups/pallets_y_film/image1-opt.jpg',
      photoSizeKb: 34
    },
    dontPractice: {
      title: 'Cajas sueltas sin film y pallets quebrados aplastando cajas',
      description: 'Dejar cajas superiores sueltas sin enfilmar o consolidar sobre pallets con tacos rajados o partes faltantes.',
      points: [
        '❌ NUNCA dejar cajas o bandejas sueltas en la consolidación sin enfilmar.',
        '❌ NUNCA estibar sobre pallets quebrados que aplastan los productos con el taco.',
        '❌ PROHIBIDO utilizar pallets con partes o tablas faltantes al consolidar.'
      ],
      photoUrl: '/lups/pallets_y_film/image7-opt.jpg',
      photoSizeKb: 23
    },
    keyPoints: [
      'Devolución inmediata de pallets en mal estado detectados desde picking.',
      'Inspección visual obligatoria durante la consolidación realizada por operadores.',
      'Verificación final del supervisor antes de la carga a rampla.'
    ],
    safetyWarning: 'Las cajas mal consolidadas generan mermas por caída durante el transporte o maniobras de descarga en el Zonal.'
  },
  {
    id: 'lup-cial-02',
    code: 'LUP-PCK-01',
    title: 'Buenas Prácticas en el Proceso de Picking (Consumo por Camadas)',
    category: 'Operación de Equipos',
    summary: 'Consumir pallets por camadas completas y retirar de inmediato productos no conformes para erradicar diferencias de inventario y caídas.',
    objective: 'Eliminar prácticas inadecuadas que generan retrasos y mermas: consumir un pallet por completo antes de abrir otro, pickear por camadas y segregar productos con daño mecánico o pérdida de vacío.',
    durationMinutes: 5,
    area: 'Picking / Outbound',
    author: 'Analista de Inventarios / Supervisión Picking',
    createdAt: '2026-10-20T08:30:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Pickeo estricto por camadas y retiro inmediato de no conformes',
      description: 'Agotar la camada completa en forma horizontal y apartar productos con daño o pérdida de vacío a la zona delimitada.',
      points: [
        'Picking se realiza por camadas terminando de consumir por completo un pallet antes de abrir otro.',
        'Respetar el orden secuencial de pallets en la posición de picking.',
        'Retirar y/o botar alusa y retirar pallets vacíos oportunamente para evitar tropiezos.'
      ],
      photoUrl: '/lups/buenas_practica_picking/image5-opt.jpg',
      photoSizeKb: 58
    },
    dontPractice: {
      title: 'Pickeo en pozo/escalera y acumulación de producto dañado',
      description: 'Sacar cajas de camadas inferiores dejando voladizos inestables o dejar productos rotos en la ubicación.',
      points: [
        '❌ NUNCA consumir un pallet nuevo antes de terminar de consumir el pallet en curso.',
        '❌ NUNCA pickear dejando huecos en el centro o efecto escalera con riesgo de derrumbe.',
        '❌ NUNCA dejar productos con daño mecánico o pérdida de vacío en las ubicaciones de picking.'
      ],
      photoUrl: '/lups/buenas_practica_picking/image4-opt.jpg',
      photoSizeKb: 76
    },
    keyPoints: [
      'Respetar pickeo por camadas de producto sin saltarse niveles.',
      'Retirar y/o botar alusa y pallets según aplique manteniendo orden 5S.',
      'Posicionar productos con no conformidades en la debida zona delimitada.'
    ],
    safetyWarning: 'Riesgo de desplome de carga sobre el operador, atrapamiento de film en ruedas de transpaleta y tropiezos en pasillos.'
  },
  {
    id: 'lup-cial-03',
    code: 'LUP-DES-02',
    title: 'Altura Máxima de Armado para Zonales (Límite 2.0 Metros)',
    category: 'Despacho & Zonales',
    summary: 'Estandarizar la altura de pallets a un máximo óptimo de 2.0 metros tomando como guía visual los separadores de andenes.',
    objective: 'Estandarizar el proceso de carga para envíos a Zonales a 2.0 metros máximos, evitando que las cajas choquen con la cortina térmica de congelados dentro de la rampa y facilitando la descarga en destino.',
    durationMinutes: 5,
    area: 'Despacho / Andenes',
    author: 'Francisco Lara / Moisés Cermeño (Mejora Continua CIAL)',
    createdAt: '2026-10-20T09:00:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Pallet nivelado hasta 2.0 metros (Línea de separador de andén)',
      description: 'Armar pallets de estándar (cajas) y bandejas respetando el límite de 2.0m marcado en los separadores de andenes.',
      points: [
        'Tomar como referencia visual permanente los separadores de andenes de despacho.',
        'Garantizar holgura libre para el cierre correcto de la cortina térmica de congelados.',
        'Facilitar una descarga limpia y sin roces al llegar a la cámara de la Zonal.'
      ],
      photoUrl: '/lups/altura_maxima/image5-opt.jpg',
      photoSizeKb: 38
    },
    dontPractice: {
      title: 'Pallet sobredimensionado sobre 2.0 metros',
      description: 'Apilar cajas o bandejas excediendo la altura límite de 2.0m, impactando el techo y cortinas de la rampa.',
      points: [
        '❌ NUNCA sobrepasar los 2.0 metros de altura en envíos a Zonales.',
        '❌ NUNCA forzar la entrada a rampla si las cajas rozan la cortina térmica.',
        '❌ EVITAR armados cónicos o inclinados que comprometan la verticalidad del pallet.'
      ],
      photoUrl: '/lups/altura_maxima/image4-opt.jpg',
      photoSizeKb: 44
    },
    keyPoints: [
      'Aplica tanto para la carga en andén como para las descargas en zonales.',
      'Evita daños en cortinas, evaporadores y estructuras de camiones frigoríficos.',
      'Reduce tiempos muertos y riesgos de maniobra en andenes de recepción de zonales.'
    ],
    safetyWarning: 'El choque de cajas con el techo de la rampla genera rotura de envases y riesgo de aplastamiento al abrir el camión.'
  },
  {
    id: 'lup-cial-04',
    code: 'LUP-REC-01',
    title: 'Almacenamiento y Reposiciones: Observar, Revisar y Capturar Tarja',
    category: 'Calidad / Inocuidad',
    summary: 'Inspección ocular rigurosa antes de capturar tarja con grúa para corroborar SKU, cantidades reales y lote v/s físico.',
    objective: 'Reforzar el principio "Observar, revisar y capturar": verificar que la tarja corresponda exactamente al contenido del pallet antes de ingresar o reponer en rack, eliminando descuadres de inventario.',
    durationMinutes: 5,
    area: 'Recepción & Almacenamiento (Rack Frío)',
    author: 'Operador de Grúa / Jefe de Turno CIAL',
    createdAt: '2026-10-20T09:30:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Chequeo visual completo antes de capturar tarja con RF',
      description: 'Comprobar visualmente el producto físico, cantidad de bultos y etiqueta antes de registrar en el sistema.',
      points: [
        'Efectuar un chequeo visual previo antes de capturar la tarja en el sistema WMS.',
        'Corroborar que las cantidades reales y el SKU coincidan al 100% con la tarja física.',
        'Reportar de inmediato a supervisión cualquier inconsistencia detectada.'
      ],
      photoUrl: '/lups/proceso_de_almacenamiento_-_reposiciones/image1-opt.jpg',
      photoSizeKb: 35
    },
    dontPractice: {
      title: 'Captura de tarja a ciegas sin corroborar contenido físico',
      description: 'Escanear tarjas desde la cabina sin comprobar el producto real o almacenar pallets con rótulos cambiados.',
      points: [
        '❌ NUNCA capturar tarjas sin tener visibilidad directa del material físico.',
        '❌ NUNCA asumir que el conteo está correcto sin verificar camadas y cajas.',
        '❌ PROHIBIDO ingresar pallets al rack si la tarja no coincide con el producto.'
      ],
      photoUrl: '/lups/proceso_de_almacenamiento_-_reposiciones/image2-opt.jpg',
      photoSizeKb: 29
    },
    keyPoints: [
      'Inspección de pallet y material antes de capturar tarja.',
      'Efectuar registro de compromiso de cada operador de grúa horquilla.',
      'Realizar seguimiento por parte de supervisores a pallets declarados con incongruencias.'
    ],
    safetyWarning: 'Errores en la captura de tarjas provocan entregas equivocadas a clientes y pérdidas de trazabilidad sanitaria.'
  },
  {
    id: 'lup-cial-05',
    code: 'LUP-DES-03',
    title: 'Consolidación de Pallets: Etiquetas HU y Timbres Visibles para Zonales',
    category: 'Despacho & Zonales',
    summary: 'Verificar Zonal y timbre en HU, dejando la etiqueta visible y legible en una esquina exterior del pallet consolidado.',
    objective: 'Garantizar la visibilidad inmediata de la Zonal de destino y timbre de control de picking en la HU, evitando pallets extraviados o despachados por error a otra región.',
    durationMinutes: 5,
    area: 'Despacho & Control Picking',
    author: 'Supervisores Despacho / Jefe de Turno CIAL',
    createdAt: '2026-10-20T10:00:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Etiqueta HU en esquina frontal a la vista y legible',
      description: 'Verificar Zonal y timbre en HU; colocarla en una esquina a la vista protegida con film transparente.',
      points: [
        'Se verifica Zonal y timbre en HU durante el control de picking.',
        'Despacho dejará en una esquina a la vista y legible las etiquetas durante la consolidación.',
        'Permitir escaneo instantáneo con pistolas RF desde el andén sin desenfilmar.'
      ],
      photoUrl: '/lups/eitquetas/image2-opt.jpg',
      photoSizeKb: 75
    },
    dontPractice: {
      title: 'Etiqueta desechada, tapada con film negro o no visible',
      description: 'Ocultar la etiqueta bajo capas de film oscuro, dejarla arrugada o botarla al consolidar.',
      points: [
        '❌ NUNCA desechar la etiqueta HU durante el enfilmado del pallet.',
        '❌ NUNCA tapar la etiqueta con cinta opaca o film oscuro.',
        '❌ PROHIBIDO despachar pallets cuya Zonal no sea legible a 2 metros de distancia.'
      ],
      photoUrl: '/lups/eitquetas/image3-opt.jpg',
      photoSizeKb: 74
    },
    keyPoints: [
      'Chequeo conjunto en punto de control picking / despacho.',
      'La etiqueta HU visible previene despachos equivocados a Zonales.',
      'Garantiza la trazabilidad por bulto en caso de reclamo o auditoría de transporte.'
    ],
    safetyWarning: 'Un pallet enviado a una Zonal equivocada (ej: Puerto Montt en lugar de Temuco) implica quiebre de stock en sucursal y sobrecosto de flete refrigerado.'
  },
  {
    id: 'lup-cial-06',
    code: 'LUP-DES-04',
    title: 'Orden de Andén: Segregación Térmica (Refrigerado, Congelado, Variable)',
    category: 'Cadena de Frío',
    summary: 'Estandarizar la disposición en andén agrupando productos Estándar, Variable y Congelado para proteger el frío y optimizar la cubicación.',
    objective: 'Efectuar ordenamiento estandarizado en andén segregando Refrigerado, Congelado y Variable en sus posiciones correspondientes, asegurando un carguío óptimo en rampla y preservando la cadena de frío.',
    durationMinutes: 5,
    area: 'Andenes de Despacho Outbound',
    author: 'Supervisores Despacho / Jefe de Turno CIAL',
    createdAt: '2026-10-20T10:30:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Andén estandarizado y segregado por temperatura y formato',
      description: 'Disponer pallets en andén alineados por Estándar, Variable y Congelado con cajas trabadas y formatos ídem.',
      points: [
        'Inspección regular de pallets y cajas antes de posicionar en andén.',
        'Disponer pallets con SKU de la misma unidad de medida y formato.',
        'Correcto apilamiento de cajas formatos ídem respetando la altura máxima.'
      ],
      photoUrl: '/lups/orden_anden/image2-opt.jpg',
      photoSizeKb: 47
    },
    dontPractice: {
      title: 'Andén desordenado y mezcla de temperaturas sin criterio',
      description: 'Mezclar pallets de congelado con productos variables o refrigerados sin orden de rampla.',
      points: [
        '❌ NUNCA mezclar consolidación de refrigerado y congelado en el mismo carril.',
        '❌ NUNCA dejar pallets atravesados reduciendo la capacidad de cubicación.',
        '❌ EVITAR cargar a rampla en orden inverso al plan de ruta.'
      ],
      photoUrl: '/lups/orden_anden/image1-opt.jpg',
      photoSizeKb: 49
    },
    keyPoints: [
      'Se debe efectuar ordenamiento estandarizado: Estándar, Variable, Congelado.',
      'Previene mal carguío en rampla según temperaturas.',
      'Evita pérdida de cubicación y asegura estabilidad en ruta.'
    ],
    safetyWarning: 'El quiebre de la cadena de frío por mala segregación compromete la inocuidad alimentaria y la certificación San Jorge / CIAL.'
  },
  {
    id: 'lup-cial-07',
    code: 'LUP-STG-01',
    title: 'Disciplina de Staging: Identificación con Cinta Amarilla por Zonales',
    category: 'Mantención Autónoma 5S',
    summary: 'Mantener demarcadas en piso con cinta amarilla las posiciones de Zonales (Puerto Montt, Osorno, Temuco) para un flujo continuo sin cuellos de botella.',
    objective: 'Garantizar el correcto uso del área de staging posicionando pallets estrictamente dentro de los cajones amarillos asignados a cada Zonal según orden de salida, manteniendo despejadas las vías de tránsito.',
    durationMinutes: 5,
    area: 'Zona de Staging / Despacho',
    author: 'Supervisores Despacho / Jefe de Turno CIAL',
    createdAt: '2026-10-20T11:00:00Z',
    oneDriveUrl: ARIEL_ONEDRIVE_URL,
    doPractice: {
      title: 'Pallets dentro de líneas amarillas por Zonal (Pto. Montt, Osorno, Temuco)',
      description: 'Ubicar los pallets dentro de las líneas amarillas demarcadas en piso respetando la prioridad de salida por Zonal.',
      points: [
        'Respetar las marcas en piso con cinta amarilla de posiciones con prioridad.',
        'Agrupar por destino: Puerto Montt, Osorno y Temuco en sus carriles correspondientes.',
        'Mantener vías de circulación de transpaletas libres de obstáculos.'
      ],
      photoUrl: '/lups/orden_staging/image1-opt.jpg',
      photoSizeKb: 55
    },
    dontPractice: {
      title: 'Pallets fuera de demarcación y pasillos de tránsito bloqueados',
      description: 'Dejar pallets sobre las líneas amarillas, invadiendo carriles o bloqueando pasillos peatonales y de transpaletas.',
      points: [
        '❌ NUNCA dejar pallets fuera de las líneas de demarcación en staging.',
        '❌ NUNCA bloquear los pasillos de tránsito ni las puertas de andenes.',
        '❌ PROHIBIDO mezclar pallets de diferentes Zonales en la misma línea de staging.'
      ],
      photoUrl: '/lups/orden_staging/image2-opt.jpg',
      photoSizeKb: 62
    },
    keyPoints: [
      'Demarcación visible en piso con cinta amarilla de alta resistencia.',
      'Prioridad clara por Zonal para agilizar el carguío hacia ramplas.',
      'Disciplina 5S permanente en la zona neurálgica de despacho.'
    ],
    safetyWarning: 'Pallets mal estacionados en staging provocan colisiones de transpaletas y caídas de operadores en maniobras de giro.'
  },
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

export const INITIAL_PALLETS: PalletJackReport[] = [];

export const INITIAL_RFS: RfScannerReport[] = [];


export const INITIAL_OPERATORS: OperatorItem[] = REAL_OPERATORS;

export const INITIAL_ATTENDANCE: AttendanceRecord[] = getHistoricalAttendanceForDate('2026-10-26');
