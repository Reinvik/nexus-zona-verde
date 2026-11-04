// =========================================================================
// TEXTO PREDICTIVO PARA JEFATURAS, SUPERVISORES Y PREVENCIONISTAS (CD CIAL)
// =========================================================================

export interface ResponsibleLeader {
  name: string;
  role: 'jefatura' | 'supervisor' | 'prevencion' | 'operador_lider';
  roleLabel: string;
  area: string;
  email?: string;
}

export const PREDICTIVE_RESPONSIBLES: ResponsibleLeader[] = [
  // Jefaturas
  {
    name: 'Ariel Mella',
    role: 'jefatura',
    roleLabel: 'Jefatura Operaciones & CD',
    area: 'Jefatura CD / Planta 2',
    email: 'ariel.mella@cial.cl'
  },
  {
    name: 'Carlos Venegas',
    role: 'jefatura',
    roleLabel: 'Jefatura Logística & CD',
    area: 'Logística & Despacho',
    email: 'carlos.venegas@cial.cl'
  },
  {
    name: 'Francisco Lara',
    role: 'jefatura',
    roleLabel: 'Jefe de Turno',
    area: 'Operaciones CD',
    email: 'francisco.lara@cial.cl'
  },
  {
    name: 'Euro Velásquez',
    role: 'jefatura',
    roleLabel: 'Jefe de Turno',
    area: 'Operaciones CD',
    email: 'euro.velasquez@cial.cl'
  },

  // Supervisores
  {
    name: 'Walter Sánchez',
    role: 'supervisor',
    roleLabel: 'Supervisor Despacho & Andenes',
    area: 'Despacho & Andenes',
    email: 'walter.sanchez@cial.cl'
  },
  {
    name: 'Mayckell Pereira',
    role: 'supervisor',
    roleLabel: 'Supervisor Encajado & Picking',
    area: 'Picking / Encajado',
    email: 'mayckell.pereira@cial.cl'
  },
  {
    name: 'Claudio Sepúlveda',
    role: 'supervisor',
    roleLabel: 'Supervisor Picking Frío',
    area: 'Cámaras Frigoríficas',
    email: 'claudio.sepulveda@cial.cl'
  },
  {
    name: 'Cristian Hernández',
    role: 'supervisor',
    roleLabel: 'Supervisor Recepción Inbound',
    area: 'Recepción & Inbound',
    email: 'cristian.hernandez@cial.cl'
  },
  {
    name: 'Bryan Mariño',
    role: 'supervisor',
    roleLabel: 'Supervisor de Turno',
    area: 'Operaciones CD',
    email: 'bryan.marino@cial.cl'
  },

  // Prevención de Riesgos SSO
  {
    name: 'Mariana Vega',
    role: 'prevencion',
    roleLabel: 'Prevencionista SSO',
    area: 'Seguridad y Salud Ocupacional',
    email: 'mariana.vega@cial.cl'
  },
  {
    name: 'Fernando Albornoz',
    role: 'prevencion',
    roleLabel: 'Prevencionista SSO',
    area: 'Seguridad y Salud Ocupacional',
    email: 'ext.fernando.albornoz@cial.cl'
  },
  {
    name: 'Prevención de Riesgos CD',
    role: 'prevencion',
    roleLabel: 'Equipo Prevención SSO',
    area: 'Seguridad y Salud Ocupacional',
    email: 'prevencion@cial.cl'
  },

  // Líderes Operacionales / Facilitadores
  {
    name: 'Juan Pérez (Líder Operador)',
    role: 'operador_lider',
    roleLabel: 'Líder Operacional',
    area: 'Picking / Andenes'
  },
  {
    name: 'Mario Sepúlveda',
    role: 'operador_lider',
    roleLabel: 'Líder Operacional',
    area: 'Despacho'
  }
];

export const PREDICTIVE_OBSERVATIONS = {
  // Charlas 5 Minutos y Charlas Semanales SSO
  charla: [
    'Se refuerza procedimiento seguro y uso estricto de EPP obligatorio en andenes y cámaras.',
    'Se enfatiza la prohibición de intervenir componentes eléctricos del robot enfilmador sin autorización.',
    'Turno revisa riesgos críticos de atrapamiento, corte por zunchos y contacto visual con operadores de grúa.',
    'Se realiza inspección pre-uso de transpaletas manuales: chequear freno de mano y fugas hidráulicas.',
    'Charla de Prevención SSO: postura ergonómica en picking y manipulación manual de cajas de embutidos.',
    'Personal toma conocimiento y firma acta digital de compromiso de seguridad del turno.',
    'Turno 100% conforme con las medidas de control. No se reportan incidentes ni condiciones inseguras.',
    'Se repasan lecciones aprendidas del casi-accidente en cruce peatonal de andenes de despacho.'
  ],

  // Puertas Seccionales de Andenes
  andenDoor: [
    'Sensor fotoeléctrico inferior descalibrado; cortina no desciende automáticamente.',
    'Cortina seccional trabada a media altura; requiere ajuste de resortes de torsión.',
    'Panel inferior abollado por impacto leve de transpaleta; sella con dificultad.',
    'Botonera de mando manual con pulsador de subida con falso contacto.',
    'Goma de sellado perimetral inferior desgastada; permite paso de aire caliente a andén.',
    'Operativa al 100%; apertura suave y sensores de seguridad probados conforme.'
  ],

  // Rejas de Seguridad de Andenes
  andenGate: [
    'Traba mecánica lateral trabada con desgaste; requiere lubricación y ajuste.',
    'Reja perimetral desrielada por golpe de carga; no corre libremente por la guía.',
    'Pasador de seguridad roto; no permite bloqueo de andén en espera de camión.',
    'Bisagra superior con holgura excesiva; roza con el marco metálico.',
    'Cadena y candado de bloqueo de andén operativos en posición segura.',
    'Operativa al 100%; traba y deslizamiento en perfecto estado.'
  ],

  // Rampas Niveladoras de Andén
  andenLeveler: [
    'Fuga visible de aceite hidráulico en cilindro principal; rampa pierde presión.',
    'Labio abatible de rampa deformado; no asienta plano sobre la cama del camión.',
    'Falla en botonera electrohidráulica; motor no responde al presionar botón de levante.',
    'Desnivel de 3 cm entre rampa y piso de andén al descender; riesgo de tropiezo.',
    'Resortes de compensación vencidos; requiere revisión por servicio técnico.',
    'Nivelador electrohidráulico 100% operativo y seguro para tránsito de transpaletas.'
  ],

  // Transpaletas Manuales
  palletJack: [
    'Pérdida paulatina de presión en cilindro hidráulico; horquillas descienden bajo carga.',
    'Freno de mano inoperante; gatillo de empuñadura suelto y no frena en pendiente (Crítico).',
    'Rodillo tándem delantero trabado por desprendimiento de banda de poliuretano.',
    'Chasis abollado/deformado con roce continuo en piso de andén al avanzar.',
    'Horquilla izquierda doblada; carga de pallet queda desnivelada al elevar.',
    'Timón con juego excesivo en pasador base; no retorna a posición vertical.',
    'Fuga abundante de aceite hidráulico por retén de vástago al bombear.',
    'Equipo operativo reparado y probado con carga de 2.500 kg conforme.'
  ],

  // Checklist de Grúas y Transpaletas Eléctricas
  gruaChecklist: [
    'Equipo 100% operativo con batería cargada y niveles de electrolito conformes.',
    'Alarma de retroceso y baliza destellante azul funcionando correctamente.',
    'Freno de hombre muerto en timón y botón anti-atrapamiento probados OK.',
    'Bocina inoperante; se envía aviso inmediato a jefatura y mantención técnica.',
    'Rueda motriz con desprendimiento de poliuretano; vibración severa al avanzar.',
    'Fisura en mástil de levante; equipo queda inmovilizado y rotulado fuera de servicio.'
  ],

  // Pistolas de Radiofrecuencia RF
  rfScanner: [
    'Gatillo de escaneo trabado físicamente; no activa el haz de lectura láser.',
    'Pantalla táctil quebrada en esquina inferior; no registra toques en teclado virtual.',
    'Batería no retiene carga; equipo se apaga a los 10 minutos de uso en andén.',
    'Pérdida constante de señal Wi-Fi al ingresar a cámaras de frío de planta.',
    'Lente de lectura rayado; lectura de código de barras lenta o errática.',
    'Error de sesión en sistema WMS/SAP; requiere reinicio forzado de fábrica.'
  ],

  // Asistencia / Novedades de Personal
  attendanceNotes: [
    'Feriado legal anual aprobado por Jefatura de Turno.',
    'Licencia médica presentada y validada en portal de RRHH CIAL.',
    'Capacitación obligatoria SSO: Curso de Manejo Seguro de Cargas.',
    'Permiso administrativo autorizado previamente por supervisor.',
    'Ingreso atrasado por problemas de transporte; compensa minutos al cierre de turno.',
    'Relevo operacional autorizado entre andenes de despacho.'
  ]
};
